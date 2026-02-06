### Title  
**Creating Custom Docker Images using Commit and Performing Image Backup & Restore**

---

## Objective of the Experiment  

- Verify Docker daemon running properly  
- Inspect Docker system configuration  
- Run Docker test container successfully  
- Create a custom container with Java installed  
- Convert a container into a reusable Docker image (`docker commit`)  
- Save Docker image as a `.tar` archive (`docker save`)  
- Remove and restore images using (`docker rmi`, `docker load`)  
- Inspect image layers and history  

---

## Tools and Technologies Used  

| Component | Purpose |
|----------|---------|
| Docker Desktop | Container runtime engine |
| Ubuntu Container | Base Linux environment |
| OpenJDK 17 | Java Development Kit |
| Docker Commit | Creating custom images |
| Docker Save/Load | Backup & Restore images |
| Terminal (zsh) | Command execution |

---

---

# Step-by-Step Execution

---

### Step 1: Starting Docker Desktop**

Docker was started using:
- open -a Docker

### Step 2: Checking Docker System Information
System and runtime details were verified using:
- docker info
This displays:
- Number of containers
- Images available
- Storage driver
- Architecture (aarch64 / ARM64)
- Kernel version

### Step 3: Verifying Docker Version
Docker client/server version checked with:
- docker version

### Step 4: Running Hello-World Test Container
Docker functionality confirmed using:
- docker run hello-world

### Step 5: Listing All Containers
To view all active and exited containers:
- docker ps -a

### Step 6: Committing Container into a Custom Image
Initially, commit failed due to uppercase repository name:
- docker commit Java myrepo/java-img

Error:
repository name must be lowercase

Correct command used:
- docker commit java myrepo/java-img
A new custom image was successfully created.

### Step 7: Running the Committed Image
The committed image was executed:
- docker run -it myrepo/java-img

### Step 8: Saving Docker Image as Backup (.tar Archive)
Attempt to save with incorrect tag failed:
- docker save -o java-app.tar myrepo/java-img

### Step 9: Checking Archive File Size
The tar file information was verified using:
- stat java-app.tar
- du -h java-app.tar

### Step 10: Removing Docker Image
Image was removed using:
- docker rmi myrepo/java-img

### Step 11: Restoring Image using Docker Load
The saved tar archive was restored using:
- docker load -i java-app.tar

### Step 12: Inspecting Image History
To view layers and build history:
- docker history myrepo/java-img

### Screenshot 
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 44 43 PM" src="https://github.com/user-attachments/assets/891807ca-e9ca-4827-896c-06d87ffb0d64" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 44 46 PM" src="https://github.com/user-attachments/assets/4cb2a9ff-5df2-463c-b629-f761437bb678" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 44 51 PM" src="https://github.com/user-attachments/assets/3dfc81c8-499a-427b-9b41-dbb4b0da29e6" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 44 54 PM" src="https://github.com/user-attachments/assets/bb52c1e4-0154-4de7-9ce1-2fc504df74a0" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 44 58 PM" src="https://github.com/user-attachments/assets/2fed2644-1b90-4721-ba5d-958803ff545f" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 45 01 PM" src="https://github.com/user-attachments/assets/f70a612f-9699-4148-9790-1c4a0cdf28e5" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 45 04 PM" src="https://github.com/user-attachments/assets/14c6597a-7d95-4a96-abb9-9e3d2aeff40d" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 45 09 PM" src="https://github.com/user-attachments/assets/7f2ddfcf-f0e0-4f4b-9cb3-9dfe62ac2435" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 58 43 PM" src="https://github.com/user-attachments/assets/3f01d894-4949-486f-848e-46f7f5aff62f" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 3 58 46 PM" src="https://github.com/user-attachments/assets/2f160d7d-9afe-4bb1-93c5-c243cb9b7eb5" />
<img width="1440" height="900" alt="Screenshot 2026-01-27 at 7 42 05 PM" src="https://github.com/user-attachments/assets/3f0ac9e0-6856-4598-95db-c7859914abea" />



### Results
- Docker system verified successfully.
- Java container converted into a reusable image.
- Image backup was created using docker save.
- Image was deleted and restored successfully using docker load.
- Complete Docker image lifecycle management achieved.


### Conclusion
- This lab demonstrated advanced Docker functionality beyond container execution.
I have successfully:
- Created custom images from containers
- Exported Docker images into archive backups
- Restored images anytime without rebuilding
- Managed complete lifecycle of Docker images and containers
- Docker provides powerful tools for portability, deployment, and system recovery.
