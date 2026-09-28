import datetime
from typing import List, Optional

from pydantic import BaseModel
from enum import Enum


class MetricType(str, Enum):
    cpu = "cpu"
    ram = "ram"
    network = "network"
    disk_io = "disk_io"
    memory = "memory"
    gpu = "gpu"
    temp = "temp"

class SystemMetric(BaseModel):
    label: str
    metric_type: MetricType
    value: Optional[float] = None
    unit: str   # "%", "MB/s", "°C"


class SystemMetricsResponse(BaseModel):
    metrics: List[SystemMetric]
    timestamp: datetime.datetime