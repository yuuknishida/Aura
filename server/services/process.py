import psutil

def get_all_processes():
    processes = []
    for process in psutil.process_iter():
        try:
            pid = process.pid
            name = process.name()
            cpu_percent = process.cpu_percent(interval=None)
            memory_mb_s = process.memory_info().rss / (1024 * 1024)
            status = process.status()
    
            process_dict = {
                'pid': pid,
                'name': name,
                'cpu_percent': cpu_percent,
                'memory_mb': round(memory_mb_s, 2),
                'status': status
            }
            processes.append(process_dict)

        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue
        
    return processes