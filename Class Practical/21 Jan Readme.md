## Docker Setup, Verification, and Running Ubuntu Container on macOS**

---

## Objectives
- Install Docker successfully on macOS  
- Verify Docker installation and version  
- Run Docker's default test container (`hello-world`)  
- Understand package manager differences between macOS and Ubuntu  
- Pull and run an Ubuntu container interactively  
- Perform package update inside the running container  

---

## Software and Tools Required

| Tool / Software | Description |
|---------------|-------------|
| Docker Desktop | Container runtime environment |
| Terminal (zsh) | Command line interface on macOS |
| Ubuntu Image   | Linux container used for practice |
| Homebrew       | macOS package manager |

---

## Steps Performed 

---

### **Step 1: Verify Docker Installation**

The first step was to ensure Docker is correctly installed on the system.
- docker -v

### Step 2: Run Docker Test Container
Docker provides a default verification container called hello-world.
- docker run hello-world

### Step 3: Understanding Package Manager Difference
Attempted to run:
- sudo apt update

### Step 4: Updating macOS Packages Using Homebrew
Homebrew update command:
- brew update

### Step 5: Running an Ubuntu Container Interactively
To use Linux commands like apt, we launched an Ubuntu container:
- docker run -it ubuntu bash

### Step 6: Updating Ubuntu Packages Inside Container
Inside the Ubuntu container, executed:
- apt update

## Screenshots

<img width="1440" height="900" alt="Screenshot 2026-01-21 at 11 32 55 AM" src="https://github.com/user-attachments/assets/43fac2a9-9e30-4111-adab-6323a6ec79f0" />
<img width="1440" height="900" alt="Screenshot 2026-01-21 at 11 50 01 AM" src="https://github.com/user-attachments/assets/db49c914-aa89-4a47-a895-e4ea5fed0a00" />
<img width="1440" height="900" alt="Screenshot 2026-01-21 at 11 50 50 AM" src="https://github.com/user-attachments/assets/788810dc-12ed-497e-a598-25a741c677e3" />
<img width="1440" height="900" alt="Screenshot 2026-01-21 at 11 55 46 AM" src="https://github.com/user-attachments/assets/42e460c7-bb36-4d14-9e59-3f8301bd863e" />
<img width="1440" height="900" alt="Screenshot 2026-01-21 at 11 57 43 AM" src="https://github.com/user-attachments/assets/7dbc7acf-1e2a-4844-a23a-0d19fd25bec7" />

## Results
- Docker was installed and verified successfully.
- The hello-world container executed properly.
- Ubuntu container was launched interactively.
- Linux package update (apt update) was successfully performed inside Docker.
- This proves Docker is functioning correctly and containers can be used to run Linux environments within macOS.

## Conclusion
- This lab provided hands-on experience with Docker installation, testing, and container execution.
- By running Ubuntu inside Docker, we were able to perform Linux-based operations even on macOS.
- Docker is an essential tool for modern development, cloud deployment, and virtualization due to its lightweight and efficient container-based architecture.
