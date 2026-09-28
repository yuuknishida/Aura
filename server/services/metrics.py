import subprocess as sp
import psutil
import time
from sqlalchemy.orm import Session

from db.database import SessionLocal
from models.metrics import Metrics

POLL_INTERVAL_SECONDS = 5

def _read_gpu_metric():
    gpu_memory_cmd = r'(((Get-Counter "\GPU Process Memory(*)\Local Usage").CounterSamples | where CookedValue).CookedValue | measure -sum).sum'

    gpu_usage_cmd = r'(((Get-Counter "\GPU Engine(*engtype_3D)\Utilization Percentage").CounterSamples | where CookedValue).CookedValue | measure -sum).sum'

    try:
        mem_result = sp.run(['powershell', '-Command', gpu_memory_cmd], capture_output=True).stdout.decode("ascii")
        usage_result = sp.run(['powershell', '-Command', gpu_usage_cmd], capture_output=True).stdout.decode("ascii")

        mem_result = round(mem_result/1e6, 1)
        usage_result = round(usage_result, 2)

        return mem_result, usage_result

    except (sp.CalledProcessError, ValueError):
        return "Error retrieving GPU data"

def _read_cpu_metric():
    cpu_percent = psutil.cpu_percent(interval=1.0)
    return cpu_percent

def _read_ram_metric():
    mem_info = psutil.virtual_memory()
    ram_percent = mem_info.percent
    return ram_percent

def _read_diskIO_metric(interval=1.0):
    io_before = psutil.disk_io_counters()
    bytes_read_before = io_before.read_bytes
    bytes_write_before = io_before.write_bytes

    time.sleep(interval)

    io_after = psutil.disk_io_counters()
    bytes_read_after = io_after.read_bytes
    bytes_write_after = io_after.write_bytes

    read_diff = bytes_read_after - bytes_read_before
    write_diff = bytes_write_after - bytes_write_before

    read_mbs = (read_diff / (1024 * 1024)) / interval
    write_mbs = (write_diff / (1024 * 1024)) / interval

    return read_mbs, write_mbs

def _read_network_metric():
    net_io_start = psutil.net_io_counters()
    start_time = time.time()

    time.sleep(1)

    net_io_end = psutil.net_io_counters()
    end_time = time.time()

    elapsed_time = end_time - start_time

    bytes_sent = net_io_end.bytes_sent - net_io_start.bytes_sent
    bytes_recv = net_io_end.bytes_recv - net_io_start.bytes_recv

    mb_sent_per_sec = (bytes_sent / elapsed_time) / (1024 * 1024)
    mb_recv_per_sec = (bytes_recv / elapsed_time) / (1024 * 1024)

    return mb_recv_per_sec, mb_sent_per_sec

def _read_temp_metric():
    try:
        result = sp.run(
            [
                "powershell",
                "-Command",
                "Get-CimInstance -Namespace root/wmi "
                "-ClassName MSAcpi_ThermalZoneTemperature | "
                "Select-Object -ExpandProperty CurrentTemperature"
            ],
            capture_output=True,
            text=True,
            check=True,
        )

        temperatures = []

        for line in result.stdout.splitlines():
            line = line.strip()

            if line.isdigit():
                celsius = (int(line) / 10) - 273.15
                temperatures.append(celsius)

        if temperatures:
            return temperatures[0], None

        return None, None

    except (sp.CalledProcessError, ValueError):
        return None, None

def _read_memory_metric():
    mem = psutil.virtual_memory()

    total_mb = mem.total / (1024 * 1024)
    used_mb = mem.used / (1024 * 1024)
    available_mb = mem.available / (1024 * 1024)

    return total_mb, used_mb, available_mb