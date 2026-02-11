## Volume Management & Data Persistence Using Named Volumes and Bind Mounts

## Objective
The objective of this practical is to:
- Understand Docker storage architecture
- Implement Named Volumes for persistent container storage
- Implement Bind Mounts for host ↔ container file sharing
- Test data persistence across container lifecycle
- Understand runtime storage vs container writable layer
- Perform real-world container storage workflow testing

## Technologies Used
- Docker Desktop
- Docker CLI
- Ubuntu Base Image
- Linux File System Commands
- Docker Volume Driver (local)
- Bind Mount File Mapping

## Key Concepts Covered
- Docker Storage Drivers
- Named Volumes
- Bind Mounts
- Container Data Persistence
- Temporary Containers (--rm)
- Runtime Data Injection
- Container File System Structure

## Steps:
### Step 1 — Verify Docker Environment
- docker info
- docker images
Verified Docker Engine
Verified Storage Driver (overlayfs)
Verified Available Images

### Step 2 — Create Named Docker Volume
- docker volume create daksh500125960volume
Named volume successfully created

### Step 3 — Verify Volume Creation
- docker volume ls
Observed:
local   daksh500125960volume

### Step 4 — Run Container Using Named Volume
- docker run -it --name test -v daksh500125960volume:/home/app ubuntu /bin/bash
Volume mounted to /home/app inside container

### Step 5 — Create File Inside Container Volume
Inside container:
-  cd /home/app
- echo "sapid500125960" > sapid.txt
- ls
File successfully created inside volume

## Step 6 — Verify Persistence
Exit container and re-run container using same volume → Data still exists.
Confirms volume persistence beyond container lifecycle

### Step 7 — Bind Mount Implementation (Host ↔ Container)
- Create Host Directory
- mkdir test
Run Container with Bind Mount
- docker run -it --rm -v $(pwd)/test:/home/app ubuntu /bin/bash
Host directory mapped to container path

### Step 8 — Create File Inside Bind Mount
Inside container:
- cd /home/app
- echo 500125960 > sapid.txt
- exit

### Step 9 — Verify File on Host
- cd test
- cat sapid.txt

Output:
- 500125960
Confirms real-time host ↔ container file sharing

## Observations:

| Feature            | Named Volume | Bind Mount |
| ------------------ | ------------ | ---------- |
| Managed by Docker  | Yes          | No         |
| Direct Host Access | No           | Yes        |
| Production Safe    | Yes          | Depends    |
| Easy Backup        | Yes          | Manual     |

## Screenshots:
Screenshots show:
- Docker info output
- Docker image verification
- Volume creation
- Volume listing
- Container execution using volume
- File creation inside container
- Bind mount execution
- Host file verification

<img width="1440" height="900" alt="Screenshot 2026-02-11 at 11 35 01 AM" src="https://github.com/user-attachments/assets/c7a58597-c7f8-49a2-9006-96fa9b158e49" />
<img width="1440" height="900" alt="Screenshot 2026-02-11 at 11 35 04 AM" src="https://github.com/user-attachments/assets/11dc3075-7c7d-4da2-9ba8-918f36feeb0e" />
<img width="1440" height="900" alt="Screenshot 2026-02-11 at 11 35 04 AM 1" src="https://github.com/user-attachments/assets/91ab87fd-efb9-4445-a160-6c7cdd3c05fd" />
<img width="1440" height="900" alt="Screenshot 2026-02-11 at 11 41 08 AM" src="https://github.com/user-attachments/assets/7ad45212-f844-4e3a-be4b-7c01cecc9971" />
<img width="1440" height="252" alt="Screenshot 2026-02-11 at 11 43 47 AM" src="https://github.com/user-attachments/assets/6c1732b9-aad1-4d0d-9730-75afcbf095dd" />
<img width="1440" height="502" alt="Screenshot 2026-02-11 at 11 44 54 AM" src="https://github.com/user-attachments/assets/9ec8a3c0-e220-4f46-b837-f9d6c5ee3353" />
<img width="1440" height="59" alt="Screenshot 2026-02-11 at 11 50 45 AM" src="https://github.com/user-attachments/assets/f9adc29a-0cf0-45c9-8267-72b344f5aa4f" />
<img width="1440" height="234" alt="Screenshot 2026-02-11 at 11 55 20 AM" src="https://github.com/user-attachments/assets/f00955e7-171e-4a5b-897b-6ba7d1f39343" />
<img width="1440" height="77" alt="Screenshot 2026-02-11 at 11 55 43 AM" src="https://github.com/user-attachments/assets/b0800a84-9079-4690-8b93-5b6af88adc2a" />



## Learning Outcomes
After this practical, I learned:
- How Docker volumes store persistent data
- Difference between Named Volumes and Bind Mounts
- How container data survives container deletion
- How host ↔ container file sharing works
- Real-world container storage best practices
- How production containers manage persistent storage

## Result
Successfully implemented Docker storage using:
- Named Volumes for persistent container-managed storage
- Bind Mounts for direct host-container file sharing
- Verified data persistence across container lifecycle

## Conclusion
- This practical demonstrated real-world Docker storage implementation using named volumes and bind mounts. These techniques are widely used in production systems for database storage, logging systems, application data persistence, and development workflows.
