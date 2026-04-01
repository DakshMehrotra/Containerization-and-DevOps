# Jenkins on Docker (Mac M1/M2 Compatible)

A step-by-step guide to setting up Jenkins using Docker Compose on macOS with Apple Silicon (ARM architecture), including platform compatibility handling and CI/CD server configuration.

---

## Project Overview

This project demonstrates how to containerize Jenkins using Docker Compose on a Mac (ARM architecture), handle platform compatibility issues, and successfully launch a fully functional CI/CD server.

---

## Tech Stack

- Docker
- Docker Compose
- Jenkins (LTS)
- macOS (Apple Silicon - ARM64)

---

## Key Concepts Covered

- Containerization using Docker
- Multi-platform image handling (amd64 vs arm64)
- Port binding and conflict resolution
- Persistent volumes in Docker
- Jenkins initial setup and configuration

---

## Project Structure

```
jenkins-docker/
└── docker-compose.yml
```

---

## Setup Instructions

### 1. Start Docker

```bash
open -a docker
```

### 2. Create Project Directory

```bash
mkdir jenkins-docker
cd jenkins-docker
```

### 3. Create docker-compose.yml

```yaml
services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins-server
    platform: linux/amd64
    ports:
      - "8081:8080"
      - "50001:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
    restart: always

volumes:
  jenkins_home:
```

### 4. Run Jenkins

```bash
docker compose up -d
```

### 5. Access Jenkins

Open in browser:

```
http://localhost:8081
```

### 6. Unlock Jenkins

Get the admin password:

```bash
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
```

Paste it into the Jenkins UI to unlock.

### 7. Install Plugins

Select **Install Suggested Plugins** when prompted.

### 8. Create Admin User

Fill in the following details when prompted:

- Username
- Password
- Email

---

## Result

After completing the setup:

- Jenkins Dashboard is running and accessible at `http://localhost:8081`
- The Jenkins server is containerized and isolated via Docker
- Data is persisted using a named Docker volume (`jenkins_home`), meaning Jenkins configuration, jobs, and credentials survive container restarts
- The setup is fully functional on Apple Silicon (M1/M2) Macs using the `linux/amd64` platform flag with Docker's emulation layer
- Jenkins is ready to configure CI/CD pipelines, integrate with version control, and automate builds

---

## Issues Faced and Fixes

### 1. Platform Mismatch

**Error:**
```
linux/amd64 does not match linux/arm64/v8
```

**Fix:** Add the `platform` directive in `docker-compose.yml`:
```yaml
platform: linux/amd64
```

---

### 2. Port Already Allocated

**Error:**
```
Bind for 0.0.0.0:8080 failed
```

**Fix:** Map to an alternate host port:
```yaml
ports:
  - "8081:8080"
```

---

### 3. Container Not Running

**Fix:**
```bash
docker compose down -v
docker compose up -d
```

---

## Verification Commands

```bash
# Check running containers
docker ps

# View Jenkins logs
docker logs jenkins-server
```

---

## Screenshot
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 25 42 AM" src="https://github.com/user-attachments/assets/6002d740-4440-4603-bce5-0b245a44bb93" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 25 53 AM" src="https://github.com/user-attachments/assets/b2f652fe-8798-42f8-afca-3413eb363cd6" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 26 01 AM" src="https://github.com/user-attachments/assets/c68e59d8-2116-42f9-8737-7c9369866134" />
<img width="1437" height="190" alt="Screenshot 2026-04-01 at 11 32 24 AM" src="https://github.com/user-attachments/assets/2c8c1283-7d1b-4d59-9280-e6ee3bead983" />
<img width="642" height="413" alt="Screenshot 2026-04-01 at 11 32 35 AM" src="https://github.com/user-attachments/assets/25ba7778-8aa6-4f8d-86b0-ef68f0063d74" />
<img width="1431" height="387" alt="Screenshot 2026-04-01 at 11 32 54 AM" src="https://github.com/user-attachments/assets/8113a621-c52b-4ee1-9132-4c707b8a2f19" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 33 46 AM" src="https://github.com/user-attachments/assets/1d7ae600-9e70-41e7-a546-9635efe09679" />
<img width="970" height="729" alt="Screenshot 2026-04-01 at 11 35 31 AM" src="https://github.com/user-attachments/assets/c4a9e38a-bde0-4bff-8084-ae7c08ca7b22" />
<img width="1020" height="790" alt="Screenshot 2026-04-01 at 11 37 09 AM" src="https://github.com/user-attachments/assets/4657b84e-638e-4c95-931b-a9a5e1c4fbc6" />
<img width="1045" height="776" alt="Screenshot 2026-04-01 at 11 42 28 AM" src="https://github.com/user-attachments/assets/73f5ff94-7f6c-4081-9597-e81b3ed84a79" />
<img width="1023" height="770" alt="Screenshot 2026-04-01 at 11 42 41 AM" src="https://github.com/user-attachments/assets/8e5038b8-b618-4f69-bce4-3d25138c8e77" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 42 50 AM" src="https://github.com/user-attachments/assets/f69c56b3-1183-44c8-ac82-05900c3fe1c8" />


---

## Learnings

- Docker images may not natively support ARM architecture; the `platform` flag enables emulation
- Port conflicts are common in local development setups and can be resolved by remapping host ports
- Named volumes ensure Jenkins data persistence across container lifecycles
- Jenkins initial setup is straightforward, but debugging container and networking issues requires familiarity with Docker fundamentals

---

## Conclusion

This project successfully demonstrates the deployment of Jenkins inside a Docker container on Apple Silicon hardware. By leveraging Docker's multi-platform support and Docker Compose for service orchestration, a production-ready Jenkins CI/CD server was configured with minimal infrastructure overhead.

The setup provides a reproducible, portable environment that can be shared across teams without dependency on a dedicated server or cloud VM. With persistent storage via Docker volumes and automated container restarts, this approach is reliable for local development and can serve as a foundation for more advanced CI/CD pipelines.

---

## Future Scope

- Add CI/CD pipeline configuration (Jenkinsfile)
- Integrate GitHub Webhooks for automated trigger builds
- Add Docker build automation inside Jenkins
- Deploy Jenkins to a cloud environment using the same Compose configuration


---
