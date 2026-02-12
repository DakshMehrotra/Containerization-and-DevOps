## Docker Volumes, Bind Mounts, tmpfs & MySQL Persistence

## Objective
The objective of this experiment is to:
- Understand Docker storage mechanisms
- Create and manage Docker volumes
- Persist database data using MySQL with Docker volumes
- Use Bind Mounts for live file sharing
- Use tmpfs mounts for temporary in-memory storage
- Inspect Docker volumes and verify persistence

## System Configuration
- Operating System: macOS (Docker Desktop – Linux backend)
- Docker Version: 29.1.3
- Storage Driver: overlayfs
- Volume Driver: local

### Part 1: Verifying Docker Setup
Command Used
- docker info
### Explanation
- Displays Docker client and server details
- Confirms Docker is running properly
- Shows storage driver, running containers, and volumes

### Part 2: Creating a Docker Volume
Command Used
- docker volume create myvolume
### Explanation
- Creates a named Docker volume
- Volume is managed by Docker and stored inside /var/lib/docker/volumes
Verify Volume
- docker volume ls

### Part 3: Running MySQL with Docker Volume (Data Persistence)
Initial MySQL Container Run
- docker run -d \
--name mysql-container \
--mount source=myvolume,target=/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root123 \
mysql

### Explanation
- Runs MySQL container in detached mode
- Mounts myvolume to /var/lib/mysql
- Database data is stored persistently
- Even if the container is deleted, data remains

### Part 4: Container Lifecycle Management
Check Containers
- docker ps -a
Stop and Remove Container
docker stop mysql-container
docker rm mysql-container
Re-run MySQL with Same Volume
- docker run -d \
--name mysql-container \
--mount source=myvolume,target=/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root123 \
mysql

## Observation
- MySQL data persists
- Volume reuse confirmed
- Demonstrates stateful containers

### Part 5: Inspecting Docker Volume
Command Used
- docker volume inspect myvolume

### Explanation
Shows:
Volume creation time
Mount point
Driver type
Confirms physical storage location:
- /var/lib/docker/volumes/myvolume/_data

### Part 6: Bind Mount with NGINX (Live File Sharing)
Command Used
- docker run -d \
--name nginx-bindMount-short \
-v "$(pwd)/html:/usr/share/nginx/html" \
nginx

### Explanation
Uses Bind Mount
Host directory files are directly accessible inside container
Any change in host files reflects instantly in NGINX

Use Case
Web development
Live file editing
Debugging

### Part 7: tmpfs Mount (In-Memory Storage)
Command Used
- docker run -d \
--name temp-container \
--mount type=tmpfs,target=/app/cache \
nginx

### Explanation
tmpfs stores data only in RAM
Data is lost when container stops
Faster I/O
Ideal for:
Cache
Temporary files
Sensitive data

## Comparison of Docker Storage Types

| Feature           | Volume    | Bind Mount  | tmpfs     |
| ----------------- | --------- | ----------- | --------- |
| Managed by Docker | Yes       | No          | No        |
| Persistent        | Yes       | Yes         | No        |
| Host Dependency   | No        | Yes         | No        |
| Performance       | Good      | Good        | Very High |
| Security          | High      | Medium      | Very High |
| Use Case          | Databases | Development | Cache     |

## Observations
- Docker volumes persist data even after container deletion
- MySQL database data remains intact using volumes
- Bind mounts allow real-time host-container file sync
- tmpfs is fastest but non-persistent
- Volume inspection confirms Docker-managed storage

## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 10 20 46 AM" src="https://github.com/user-attachments/assets/3016b83b-e5de-4d5b-b8da-42f732a9e92d" />
<img width="1440" height="185" alt="Screenshot 2026-02-12 at 10 20 53 AM" src="https://github.com/user-attachments/assets/7045536e-6ad4-4713-a926-a408b7ed1094" />
<img width="1440" height="337" alt="Screenshot 2026-02-12 at 10 22 30 AM" src="https://github.com/user-attachments/assets/8c72b7fb-ccfb-421a-9919-9119b21e7496" />
<img width="1440" height="336" alt="Screenshot 2026-02-12 at 10 29 18 AM" src="https://github.com/user-attachments/assets/52524a0e-ee05-46a8-b74f-d16cefd11c00" />
<img width="1440" height="210" alt="Screenshot 2026-02-12 at 10 32 01 AM" src="https://github.com/user-attachments/assets/bf3fcdff-beff-466e-ac97-0b1b51eb7d11" />
<img width="810" height="193" alt="Screenshot 2026-02-12 at 10 40 01 AM" src="https://github.com/user-attachments/assets/8bfc88b5-d595-4dae-849d-dcfedab16646" />


## Result
- Successfully created and managed Docker volumes
- Implemented MySQL persistent storage
- Demonstrated bind mount functionality
- Used tmpfs for temporary in-memory storage
- Verified volume mount points and behavior

## Final Conclusion
- This practical successfully demonstrates Docker’s flexible storage options. Docker volumes are the recommended solution for persistent application data, bind mounts are ideal for development environments, and tmpfs mounts provide high-speed temporary storage. Understanding these concepts is essential for building scalable and production-ready containerized applications.
