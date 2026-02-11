## Volume Backup, Restore & Inspection Using Tar and Named Volumes
## Objective
The objective of this practical is to:
- Understand advanced Docker volume management
- Perform volume data backup using tar archive
- Restore volume data from backup
- Inspect Docker volume metadata
- Understand Docker volume mountpoints
- Implement real-world production backup workflow

## Technologies Used
- Docker Desktop
- Docker CLI
- Ubuntu Container
- Alpine Container
- Linux TAR Utility
- Named Docker Volumes
- Bind Mount Backup Directory

## Key Concepts Covered
- Docker Volume Lifecycle
- Volume Backup Strategy
- Volume Restore Strategy
- Data Persistence Beyond Containers
- Volume Metadata Inspection
- Production Storage Recovery Workflow

## Steps
### Step 1 — Verify Docker Environment
- docker --version
- docker info
- docker volume ls
Verified Docker Engine
Verified Storage Driver
Verified Existing Volumes

### Step 2 — Create New Volume
- docker volume create firstvol
Volume successfully created

### Step 3 — Run Container and Store Data in Volume
- docker run -it --name voltest -v firstvol:/data ubuntu bash
Inside container:
- cd /data
- echo "Hello Daksh Volume Test" > file1.txt
- echo "Backup Experiment Data" > file2.txt
Data written to Docker volume

### Step 4 — Remove Container (Volume Persists)
- docker rm voltest
Container removed
Volume still exists

### Step 5 — Create Backup Directory on Host
- mkdir backup

### Step 6 — Backup Volume Data Using TAR
- docker run --rm \
-v firstvol:/volume \
-v $(pwd)/backup:/backup \
alpine \
tar czf /backup/my_volume_backup.tar.gz -C /volume .

Volume data backed up to host system

### Step 7 — Verify Backup File
- ls backup
Output:
- my_volume_backup.tar.gz

### Step 8 — Remove Volume (Simulating Data Loss Scenario)
- docker volume rm firstvol

### Step 9 — Recreate Volume
- docker volume create firstvol

### Step 10 — Restore Volume From Backup
- docker run --rm \
-v firstvol:/volume \
-v $(pwd)/backup:/backup \
alpine \
tar xzf /backup/my_volume_backup.tar.gz -C /volume

Volume restored successfully

### Step 11 — Verify Restored Data
- docker run -it --rm -v firstvol:/home/app ubuntu bash

Inside container:
- cd /home/app
- cat file1.txt
- cat file2.txt

Output:
Hello Daksh Volume Test
Backup Experiment Data

Data successfully restored

### Step 12 — Inspect Volume Metadata
- docker volume inspect firstvol

Key Output:
Mountpoint: /var/lib/docker/volumes/firstvol/_data
Driver: local
Scope: local

### Step 13 — Check Backup Size
- du -h backup
Verified backup storage size

## Obeservation
| Operation       | Result     |
| --------------- | ---------- |
| Volume Backup   | Successful |
| Volume Deletion | Successful |
| Volume Restore  | Successful |
| Data Integrity  | Maintained |

## Screenshot
Screenshots show:
- Docker environment verification
- Volume creation
- Data writing inside volume
- Backup creation using TAR
- Volume deletion
- Volume restoration
- Data verification after restore
- Volume inspection output


<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 09 12 AM" src="https://github.com/user-attachments/assets/24984317-392e-419f-94d8-dcd82bc6ff20" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 09 18 AM" src="https://github.com/user-attachments/assets/023eab86-c8fd-468e-a353-15891e4edaab" />
<img width="1439" height="202" alt="Screenshot 2026-02-12 at 12 10 36 AM" src="https://github.com/user-attachments/assets/4d410799-ec1b-44d5-9f2d-3625931cc13f" />
<img width="1440" height="199" alt="Screenshot 2026-02-12 at 12 10 58 AM" src="https://github.com/user-attachments/assets/ba0db17d-bcd8-4bed-a1d5-3935c6ecacda" />
<img width="1440" height="272" alt="Screenshot 2026-02-12 at 12 11 22 AM" src="https://github.com/user-attachments/assets/3779ab89-a1bf-40e7-be88-a735efba1547" />
<img width="1440" height="195" alt="Screenshot 2026-02-12 at 12 11 44 AM" src="https://github.com/user-attachments/assets/ca67b03d-95c4-43e6-96bc-b3e1b97cf615" />
<img width="1440" height="256" alt="Screenshot 2026-02-12 at 12 12 07 AM" src="https://github.com/user-attachments/assets/a32547c3-403b-46b9-b4d0-769e640ed230" />
<img width="1440" height="296" alt="Screenshot 2026-02-12 at 12 12 27 AM" src="https://github.com/user-attachments/assets/cb8647e4-e369-4b96-bdf5-c9325a82d413" />


## Learning Outcomes
After this practical, I learned:
- How production systems backup container storage
- How Docker volumes can be safely archived
- How disaster recovery is implemented in containers
- Importance of external storage backups
- How Docker volume metadata helps debugging storage issues

## Result
- Successfully implemented advanced Docker storage workflow including:
- Volume backup
- Volume restore
- Volume inspection
- Data recovery simulation

## Conclusion
- This practical demonstrated real-world container storage backup and recovery workflows using Docker volumes and tar-based archival. These techniques are widely used in production systems for database backup, disaster recovery, and data migration scenarios.
