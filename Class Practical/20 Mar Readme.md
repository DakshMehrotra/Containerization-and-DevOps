## Docker & Portainer Setup (Mac M1) – Practical
## Objective
To explore Docker container management, understand Minikube limitations on Mac M1, and successfully deploy and manage containers using Portainer.
## Tools & Technologies Used
- Docker Desktop
- Homebrew
- kubectl
- Minikube
- Portainer (Container Management UI)

## Kubernetes Context Check
- kubectl config get-contexts
- kubectl config current-context
Active context: k3d-mycluster
Minikube context not found

### Minikube Setup Issue (Mac M1)
Command Used
- minikube start

### Errors Observed
- Running amd64 binary on M1 system
- VirtualBox not supported on macOS 13+
- VT-x/AMD-v virtualization not enabled
### Reason
- Mac M1 uses ARM architecture
- VirtualBox + Minikube not compatible by default

### Suggested Fix (Conceptual)
- minikube start --driver=docker

## Docker Container Management
Check Running Containers
- docker ps


## Portainer Setup
1. Create Volume
- docker volume create portainer_data

2. Run Portainer Container
- docker run -d -p 8000:8000 -p 9443:9443 \
--name portainer \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data \
portainer/portainer-ce:lts

3. Verify Container
- docker ps
Portainer container running successfully

## Access Portainer
- https://localhost:9443

## Initial Setup
- Create admin user
- Set password (minimum 12 characters)
- Select Local Docker Environment

## Dashboard Observations
- Containers: Running & Stopped containers visible
- Images: All pulled Docker images listed
- Volumes & Networks displayed
- Real-time monitoring available

## Features Observed
- GUI-based container management
- Easy start/stop containers
- Volume & network management
- Stack (Docker Compose) support
- Logs and container inspection

## Errors Faced & Fixes
1. Wrong kubectl command
- kubectl config get contexts -> wrong
- kubectl config get-contexts -> right

2. Minikube not starting
Architecture mismatch (amd64 vs arm64)
Virtualization issue
Solution: Use Docker driver or prefer k3d

3. Portainer HTTPS warning
Browser shows "Not Secure"
Reason: Self-signed certificate (expected behavior)

## Screenshot
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 26 41 PM" src="https://github.com/user-attachments/assets/e8a248f9-49fb-472b-a8e4-c9f50958dc4a" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 26 45 PM" src="https://github.com/user-attachments/assets/f5806376-a733-4d81-b2e3-7e3335f99529" />
<img width="1440" height="374" alt="Screenshot 2026-03-20 at 12 31 54 PM" src="https://github.com/user-attachments/assets/bb7a85a3-405f-44c9-8791-b84ffb7b20b4" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 32 49 PM" src="https://github.com/user-attachments/assets/e12a5b28-c0ae-43f3-b9f1-60f7d6f3b8c0" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 38 09 PM" src="https://github.com/user-attachments/assets/447166e3-15e3-47fd-93be-e1270e9d2e41" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 38 22 PM" src="https://github.com/user-attachments/assets/9240f28b-ffc8-4d9d-8d90-0cc53c2ff521" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 44 16 PM" src="https://github.com/user-attachments/assets/e3943a09-1a4c-410c-b405-4c7f7f43f1a0" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 44 34 PM" src="https://github.com/user-attachments/assets/bb89012c-1965-48a8-b1ef-5b52c00f51e6" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 44 46 PM" src="https://github.com/user-attachments/assets/8859c3ad-be70-4206-bae3-2c8dbce3ccd8" />
<img width="1440" height="900" alt="Screenshot 2026-03-20 at 12 44 54 PM" src="https://github.com/user-attachments/assets/81d8503e-b25a-4ab1-990c-437de27c9ecf" />


## Result
- Docker environment successfully verified
- Portainer container deployed and running
- Web UI accessed via https://localhost:9443
- Containers, images, volumes, and networks managed via GUI

## Conclusion
This practical demonstrated:
- Limitations of Minikube on Mac M1
- Docker container management
- Deployment of Portainer for GUI-based management
- Real-time monitoring of containers
- Portainer simplifies Docker operations and provides an efficient interface for container orchestration.

