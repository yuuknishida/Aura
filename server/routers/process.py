from fastapi import APIRouter, Depends, status, HTTPException
import psutil
from db.database import get_db
from models.process import Process
from schemas.process import ProcessResponse, ProcessInfo
from sqlalchemy.orm import Session
from services.process import get_all_processes

process_router = APIRouter(
    prefix="/processes",
    tags=["processes"]
)

def acquire_processes(db: Session):
    try:        
        processes = get_all_processes()
    except psutil.Error as exc:
        raise HTTPException(status_code=500, detail=f"Could not read processes: {exc}")

    db.query(Process).delete()
    db.add_all(
        Process(
            pid=p["pid"],
            name=p["name"],
            status=p["status"],
            cpu_percent=p["cpu_percent"],
            memory_mb=p["memory_mb"]
        )
        for p in processes
    )
    db.commit()

    rows = db.query(Process).all()
    processes_validated = [ProcessInfo.model_validate(row) for row in rows]

    return ProcessResponse(
        processes=processes_validated,
        active_count=sum(1 for process in processes_validated if process.status == "running"),
    )

@process_router.get("/all", response_model=ProcessResponse)
def get_processes(db: Session = Depends(get_db)):
    return acquire_processes(db)

@process_router.delete("/{pid}", status_code=status.HTTP_204_NO_CONTENT)
def delete_process(pid: int, db: Session = Depends(get_db)):
    row = db.query(Process).filter(Process.pid == pid).first()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Process with pid {pid} not found"
        )

    try:
        process = psutil.Process(pid)
        process.terminate()
        process.wait(timeout=3)
    except psutil.NoSuchProcess:
        pass
    except psutil.AccessDenied:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Not permitted to terminate pid {pid}"
        )
    except psutil.TimeoutExpired:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Process {pid} did not terminate"
        )

    db.delete(row)
    db.commit()

    return None