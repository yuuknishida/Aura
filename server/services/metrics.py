from server.app import app
import os
import time
import psutil
import GPUtil

@app.get("/metrics/")
async def get_metrics():
    metrics = {}

    metrics["CPU"] = psutil.cpu_percent(interval=None)

    ram = psutil.virtual_memory()
    metrics["RAM"] = ram.percent

    disk = psutil.disk_usage('/')
    metrics["DISK"] = disk.percent

    network = psutil.net_io_counters()
    metrics["NETWORK_SENT_MB"]     = round(network.bytes_sent / (1024**2), 2)
    metrics["NETWORK_RECEIVED_MB"] = round(network.bytes_recv / (1024**2), 2)

    metrics['TEMP'] = {}
    if hasattr(psutil, "sensors_temperatures"):
        temps = psutil.sensors_battery()
        for name, entries in temps.items():
            if entries:
                metrics['TEMP'][name] = f"{entries[0].current}°C"
    else:
        metrics['TEMP'] = "Not supported on this OS"

    gpus = GPUtil.getGPUs()
    metrics['GPU'] = []
    for gpu in gpus:
        metrics['GPU'] = round(gpu.load * 100, 2)

    return metrics