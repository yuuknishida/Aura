from typing import List
from enum import Enum
import datetime
from pydantic import BaseModel

class LogLevel(str, Enum):
    ok = "ok"
    info = "info"
    warn = "warn"
    danger = "danger"

class LogEntry(BaseModel):
    timestamp: datetime
    level: LogLevel
    message: str
    source: str     # e.g. chrome

class LogResponse(BaseModel):
    logs: List[LogEntry]