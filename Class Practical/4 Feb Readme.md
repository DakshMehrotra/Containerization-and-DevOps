## Docker Engine Configuration & API Access (Remote Daemon)

## Objective
The objective of this practical is to:
- Verify Docker installation and running status
- Configure Docker Engine using daemon.json
- Enable Docker Remote API communication
- Test Docker daemon connectivity through UNIX socket
- Run a sample container (hello-world) to confirm setup

## Tools & Technologies Used
- Docker Desktop v29.1.3
- macOS ARM64
- Docker CLI
- Docker Engine Settings
- Pico Editor
- Remote Docker API Testing using CURL

## Steps
### Step 1: Starting Docker Desktop
Docker must be running before executing any commands.
- open -a Docker

### Step 2: Checking Docker Installation Info
To verify client and server configurations:
- docker info

Output confirms:
- Docker Engine running successfully
- Containers and images available
- Architecture: aarch64 (ARM64)
- Storage Driver: overlayfs

### Step 3: Checking Docker Version
- docker --version

Output:
- Docker version 29.1.3

### Step 4: Listing Active Containers
- docker ps
Since no containers were running:
- CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES

### Step 5: Verifying Docker Daemon Socket
Docker communicates internally using a UNIX socket.
- ls -l /var/run/docker.sock
Output confirms socket exists:
- /var/run/docker.sock -> /Users/dakshmehrotra/.docker/run/docker.sock

### Step 6: Testing Docker Daemon API Connectivity
Ping Test
- curl --unix-socket /var/run/docker.sock http://localhost/_ping
Output:
- OK

Version API Test
- curl --unix-socket /var/run/docker.sock http://localhost/version
This returns JSON output confirming:
- Engine Version
- API Version
- Platform details

### Step 7: Accessing Container List via Docker API
Running Containers JSON
- curl --unix-socket /var/run/docker.sock \
- http://localhost/v1.52/containers/json
Output:
- []

All Containers (Including Stopped)
- curl --unix-socket /var/run/docker.sock \
"http://localhost/v1.52/containers/json?all=true"

### Step 8: Editing Docker Engine Configuration
Docker Engine is configured using:
- /etc/docker/daemon.json
Using Pico editor:
- sudo pico /etc/docker/daemon.json
- Configuration Added:
{
  "hosts": [
    "unix:///var/run/docker.sock",
    "tcp://0.0.0.0:2375"
  ]
}
This enables Docker to listen on:
- UNIX Socket (default)
- TCP Port 2375 (Remote API)

### Step 9: Configuring Docker Engine via Docker Desktop
- Docker Desktop → Settings → Docker Engine
The same configuration was applied:
"hosts": [
  "unix:///var/run/docker.sock",
  "tcp://0.0.0.0:2375"

### Step 10: Running Hello World Container
To confirm everything works correctly:
- docker run hello-world
Output:
- Hello from Docker!
This message shows that your installation appears to be working correctly.
Docker successfully:
- Contacted daemon
- Pulled image from Docker Hub
- Created a container
- Executed and displayed output

## Screenshots Included
This practical includes proof of:
- Docker info output
- Docker daemon socket validation
- CURL API ping response
- Engine JSON modification
- Docker Desktop Engine UI
- Successful container execution


<img width="1440" height="900" alt="Screenshot 2026-02-04 at 11 20 49 AM" src="https://github.com/user-attachments/assets/075ef536-f62e-4d3b-89fa-5b7860023d3d" />
<img width="1440" height="900" alt="Screenshot 2026-02-04 at 11 32 57 AM" src="https://github.com/user-attachments/assets/327de235-45ab-4eec-bd56-de860abf66b3" />
<img width="1440" height="685" alt="Screenshot 2026-02-04 at 11 45 31 AM" src="https://github.com/user-attachments/assets/12388e7c-40a9-4329-b741-0c9da93dd514" />
<img width="1440" height="900" alt="Screenshot 2026-02-04 at 11 45 38 AM" src="https://github.com/user-attachments/assets/4d7f7035-efac-4198-a99a-9a5d47336ece" />
<img width="1440" height="336" alt="Screenshot 2026-02-04 at 11 45 44 AM" src="https://github.com/user-attachments/assets/c913c7e1-45d1-4d54-8444-90482de3a3c7" />
<img width="1440" height="900" alt="Screenshot 2026-02-04 at 11 56 45 AM" src="https://github.com/user-attachments/assets/0a362678-330e-45e7-96d8-d6b2642529a1" />



## Result
Docker Engine was successfully configured and tested.
Achievements:
- Docker installation verified
- Docker daemon socket confirmed
- Remote API tested using CURL
- Docker Engine JSON configuration updated
- Hello-world container executed successfully

## Conclusion
This practical provided hands-on understanding of:
- Docker daemon working architecture
- Client-server communication via UNIX socket
- Remote Docker Engine API access
- Engine-level configuration using daemon.json
- Successful container deployment verification
