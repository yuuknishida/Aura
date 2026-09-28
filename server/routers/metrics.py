import uuid
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Cookie, Response, BackgroundTasks, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from db.database import get_db, SessionLocal
from models.chat import Chat
from models.metrics import Metrics
from schemas.chat import ChatMessage, ChatRequest, ChatResponse, MessageRole
from schemas.metrics import SystemMetric, SystemMetricsResponse, MetricType
from services.metrics import _read_cpu_metric, _read_diskIO_metric, _read_gpu_metric, _read_network_metric, _read_ram_metric, _read_temp_metric, _read_memory_metric

metrics_router = APIRouter(
    prefix="/metrics",
    tags=["metrics"]
)

CHAT_PAGE_METRICS_TYPES = [    
    "cpu",
    "ram",
    "network_recv",
    "network_sent",
    "disk_read",
    "disk_write",
    "memory_total",
    "memory_used",
    "memory_available",
    "gpu_memory",
    "gpu_usage",
    "cpu_temp",
    "gpu_temp",
]

def _row(label: str, metric_type: MetricType, value: float, unit: str) -> Metrics:
    return Metrics(
        label=label,
        type=metric_type,
        value=value,
        unit=unit
    )

def _to_schema(row: Metrics) -> SystemMetric:
    return SystemMetric(
        label=row.label,
        metric_type=row.type,
        value=row.value,
        unit=row.unit
    )

@metrics_router.get("/", response_model=SystemMetricsResponse)
def get_metrics(db: Session = Depends(get_db)):
    latest: List[Metrics] = []
    for label in CHAT_PAGE_METRICS_TYPES:
        row = (
            db.query(Metrics)
            .filter(Metrics.label == label)
            .order_by(desc(Metrics.id))
            .first()
        )
        if row:
            latest.append(row)

    if not latest:
        raise HTTPException(status_code=404, detail="No metrics available")

    return SystemMetricsResponse(
        metrics=[_to_schema(row) for row in latest], 
        timestamp=datetime.now(timezone.utc),
    )

@metrics_router.post("/", response_model=SystemMetricsResponse, status_code=status.HTTP_201_CREATED)
async def post_metric(db: Session = Depends(get_db)):
    metrics = []
    # Metric data
    cpu = _read_cpu_metric()
    ram = _read_ram_metric()
    recv_network, sent_network = _read_network_metric()
    read_diskIO, write_diskIO = _read_diskIO_metric()
    cpu_temp, gpu_temp = _read_temp_metric()
    total_memory, used_memory, available_memory = _read_memory_metric()

    rows = [
        _row("cpu", MetricType.cpu, cpu, "%"),
        _row("ram", MetricType.ram, ram, "%"),
        _row("network_recv", MetricType.network, recv_network, "MB/s"),
        _row("network_sent", MetricType.network, sent_network, "MB/s"),
        _row("disk_read", MetricType.disk_io, read_diskIO, "MB/s"),
        _row("disk_write", MetricType.disk_io, write_diskIO, "MB/s"),
        _row("memory_total", MetricType.memory, total_memory, "MB"),
        _row("memory_used", MetricType.memory, used_memory, "MB"),
        _row("memory_available", MetricType.memory, available_memory, "MB"),
        _row("cpu_temp", MetricType.temp, cpu_temp, "°C"),
        _row("gpu_temp", MetricType.temp, gpu_temp, "°C"),
    ]

    try:
        gpu_memory, gpu_usage = _read_gpu_metric()
        rows.append(_row("gpu_memory", MetricType.gpu, gpu_memory, "MB"))
        rows.append(_row("gpu_usage", MetricType.gpu, gpu_usage, "%"))
    except (TypeError, ValueError):
        pass

    db.add_all(rows)
    db.commit()

    return SystemMetricsResponse(
        metrics=[_to_schema(row) for row in rows],
        timestamp=datetime.now(timezone.utc)
    )