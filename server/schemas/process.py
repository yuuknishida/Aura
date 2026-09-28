from enum import Enum
from typing import List
from pydantic import BaseModel, ConfigDict

class ProcessStatus(str, Enum):
    running = "running"
    sleeping = "sleeping"
    disk_sleep = "disk-sleep"
    stopped = "stopped"
    tracing_stop = "tracing-stop"
    zombie = "zombie"
    dead = "dead"
    wake_kill = "wake-kill"
    waking = "waking"
    idle = "idle"
    locked = "locked"
    waiting = "waiting"
    suspended = "suspended"

class ProcessInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    pid: int
    name: str
    cpu_percent: float
    memory_mb: float
    status: ProcessStatus

class ProcessResponse(BaseModel):
    processes: List[ProcessInfo]
    active_count: int

class KillProcessRequest(BaseModel):
    pid: int