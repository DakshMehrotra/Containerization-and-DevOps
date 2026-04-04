# Lab Experiment 7: CI/CD Pipeline using Jenkins, GitHub and Docker Hub

![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Jenkins-blue) ![Docker](https://img.shields.io/badge/Container-Docker-blue) ![GitHub](https://img.shields.io/badge/Source-GitHub-black) ![Status](https://img.shields.io/badge/Status-Complete-green)

## Aim
To design and implement a complete CI/CD pipeline using **Jenkins**, integrating source code from **GitHub**, and building & pushing Docker images to **Docker Hub** automatically on every code push.

---

## Workflow
```
Developer → git push → GitHub → Webhook → Jenkins → Docker Build → Docker Hub
```

---

## Project Structure
```
my-app/
├── app.py              # Flask web application
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker image build instructions
└── Jenkinsfile         # Jenkins pipeline definition
```

---

## Application Code

### `app.py`
```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from CI/CD Pipeline!"

app.run(host="0.0.0.0", port=80)
```

### `requirements.txt`
```
flask
```

### `Dockerfile`
```dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

EXPOSE 80
CMD ["python", "app.py"]
```

### `Jenkinsfile`
```groovy
pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-dockerhub-username/myapp"
    }

    stages {

        stage('Clone Source') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/my-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_TOKEN')]) {
                    sh 'echo $DOCKER_TOKEN | docker login -u your-dockerhub-username --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_NAME:latest'
            }
        }
    }
}
```

---

## Setup Instructions

### Prerequisites
- Docker Desktop installed (Apple Silicon / ARM64 for Mac M1)
- GitHub account
- Docker Hub account
- ngrok account (for webhook)

---

### Step 1: Jenkins Setup using Docker

Since this runs on **Mac M1 (ARM64)**, a custom Jenkins image with Docker CLI is required.

**Dockerfile for Jenkins (ARM64):**
```dockerfile
FROM jenkins/jenkins:lts

USER root

RUN apt-get update -y && \
    apt-get install -y curl ca-certificates gnupg && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=arm64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update -y && \
    apt-get install -y docker-ce-cli && \
    groupadd -f docker && \
    usermod -aG docker jenkins

USER jenkins
```

**Build and Run Jenkins:**
```bash
# Build ARM64 Jenkins image
docker build --platform linux/arm64 -t jenkins-arm64 .

# Run Jenkins container
docker run -d \
  --name jenkins \
  --platform linux/arm64 \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -u root \
  jenkins-arm64

# Fix Docker socket permissions
docker exec -it --user root jenkins chmod 666 /var/run/docker.sock

# Create symlink so Jenkins pipeline can find Docker
docker exec -it --user root jenkins ln -sf /usr/bin/docker /usr/local/bin/docker
```

**Get Jenkins unlock password:**
```bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Access Jenkins at: `http://localhost:8080`

---

### Step 2: Jenkins Configuration

1. Unlock Jenkins with the password from above
2. Install suggested plugins
3. Create admin user

**Add Docker Hub Credentials:**
```
Manage Jenkins → Credentials → (global) → Add Credentials
  Kind: Secret text
  ID: dockerhub-token
  Secret: <your Docker Hub access token>
```

**Create Pipeline Job:**
```
New Item → Pipeline → Name: ci-cd-pipeline
  Definition: Pipeline script from SCM
  SCM: Git
  Repository URL: https://github.com/your-username/my-app.git
  Branch: */main
  Script Path: Jenkinsfile
  
Build Triggers:  GitHub hook trigger for GITScm polling
```

---

### Step 3: GitHub Webhook Setup

**Install ngrok:**
```bash
brew install ngrok
ngrok config add-authtoken YOUR_NGROK_TOKEN
ngrok http 8080
```

Copy the forwarding URL (e.g., `https://xxxx.ngrok-free.app`)

**Add Webhook in GitHub:**
```
Repository → Settings → Webhooks → Add webhook
  Payload URL: https://xxxx.ngrok-free.app/github-webhook/
  Content type: application/json
  Events: Just the push event
```

---

## Pipeline Stages

| Stage | Description | Status |
|-------|-------------|--------|
| Checkout SCM | Jenkins fetches Jenkinsfile from GitHub | Done |
| Clone Source | Pulls latest application code | Done |
| Build Docker Image | Builds image using Dockerfile | Done |
| Login to Docker Hub | Authenticates using stored token | Done |
| Push to Docker Hub | Pushes image to Docker Hub registry | Done |

---

## Testing the Pipeline

**Manual trigger:**
- Jenkins Dashboard → `ci-cd-pipeline` → **Build Now**

**Automatic trigger via webhook:**
```bash
echo "# update" >> README.md
git add .
git commit -m "Trigger pipeline"
git push
```
Jenkins will automatically start a new build on every `git push`.

---

## Key Concepts

### Why Docker in CI/CD?
Docker ensures **consistent builds** across any environment — the same image runs identically on developer machines, CI servers, and production.

### Why store credentials in Jenkins?
**Security** — hardcoding passwords in code is dangerous. Jenkins credentials store encrypts secrets and injects them temporarily at runtime using `withCredentials`.

### Role of Same Host Agent
Jenkins runs inside Docker with the host Docker socket (`/var/run/docker.sock`) mounted. This allows Jenkins to **directly control the host Docker daemon** and build/push images without needing a separate agent.

### What is a Webhook?
A webhook is an **automatic HTTP notification** sent by GitHub to Jenkins whenever a `git push` happens, enabling fully automated CI/CD without manual intervention.

---

## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 25 42 AM" src="https://github.com/user-attachments/assets/7727c121-089b-49c1-8573-d84629b0d03f" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 25 53 AM" src="https://github.com/user-attachments/assets/7d85626a-962b-4abe-bcfc-3eff9bc12c92" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 26 01 AM" src="https://github.com/user-attachments/assets/446e92f4-2e8b-40d1-add2-45e111a52a23" />
<img width="1437" height="190" alt="Screenshot 2026-04-01 at 11 32 24 AM" src="https://github.com/user-attachments/assets/9c19609a-4ab4-4e84-9a7b-e84a503362f7" />
<img width="642" height="413" alt="Screenshot 2026-04-01 at 11 32 35 AM" src="https://github.com/user-attachments/assets/d5ff7815-c36f-4a01-a805-001f672b86c1" />
<img width="1431" height="387" alt="Screenshot 2026-04-01 at 11 32 54 AM" src="https://github.com/user-attachments/assets/81ccfb01-1fc6-4bff-89af-90dc8038de62" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 33 46 AM" src="https://github.com/user-attachments/assets/c5f4d650-7f82-4ca8-b772-c7e7a6feb9ef" />
<img width="970" height="729" alt="Screenshot 2026-04-01 at 11 35 31 AM" src="https://github.com/user-attachments/assets/e2616f26-037a-45bb-8ef1-496c1dc555f9" />
<img width="1020" height="790" alt="Screenshot 2026-04-01 at 11 37 09 AM" src="https://github.com/user-attachments/assets/add4fb18-d85b-41a2-88f7-2375178db46f" />
<img width="1045" height="776" alt="Screenshot 2026-04-01 at 11 42 28 AM" src="https://github.com/user-attachments/assets/0579002c-6e21-4218-a7c6-f191dd5f13af" />
<img width="1023" height="770" alt="Screenshot 2026-04-01 at 11 42 41 AM" src="https://github.com/user-attachments/assets/42da9439-6f8a-417f-9f60-f0de4832d42f" />
<img width="1440" height="900" alt="Screenshot 2026-04-01 at 11 42 50 AM" src="https://github.com/user-attachments/assets/7ccc1b71-1ab3-4002-97ac-22e318543054" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 39 36 AM" src="https://github.com/user-attachments/assets/db0f5db9-1e3e-47f9-aac9-d311e73d9689" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 39 42 AM" src="https://github.com/user-attachments/assets/35f3df26-454a-4b47-89c0-b710a5ae6ab3" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 39 48 AM" src="https://github.com/user-attachments/assets/0a6fb812-3778-4dff-98cd-bafe58fca445" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 39 52 AM" src="https://github.com/user-attachments/assets/f18c0940-3047-47fb-b9e6-b5ce82b7612b" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 41 57 AM" src="https://github.com/user-attachments/assets/11ffafed-2b06-4d50-ac3a-9c915e8f6c4d" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 44 15 AM" src="https://github.com/user-attachments/assets/23ecfc78-4eed-464d-8d45-a836fcb6e0e1" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 45 55 AM" src="https://github.com/user-attachments/assets/0d46661d-bb94-4d49-b59c-b90d6651ed0a" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 46 30 AM" src="https://github.com/user-attachments/assets/cab04f16-dbc5-4a19-a842-8ace455e507f" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 8 48 22 AM" src="https://github.com/user-attachments/assets/60081c48-f8c1-40bf-af6c-4e03d968ffec" />
<img width="1440" height="811" alt="Screenshot 2026-04-04 at 8 50 27 AM" src="https://github.com/user-attachments/assets/9a30f5be-9745-486d-8af1-26ff3ab79c92" />
<img width="1440" height="821" alt="Screenshot 2026-04-04 at 8 51 47 AM" src="https://github.com/user-attachments/assets/14e2044d-1c94-4ebd-91cf-c3a215044638" />
<img width="1173" height="316" alt="Screenshot 2026-04-04 at 8 52 12 AM" src="https://github.com/user-attachments/assets/43b2a74e-2443-4b26-a0bd-7dac7f965bcc" />
<img width="1171" height="629" alt="Screenshot 2026-04-04 at 8 52 50 AM" src="https://github.com/user-attachments/assets/69cad90b-34e9-4461-b9b8-4a9891cd78bf" />
<img width="1440" height="805" alt="Screenshot 2026-04-04 at 8 53 23 AM" src="https://github.com/user-attachments/assets/75acd5e5-773e-4531-a33f-de98bd922996" />
<img width="1438" height="770" alt="Screenshot 2026-04-04 at 8 55 20 AM" src="https://github.com/user-attachments/assets/860cc2f4-a907-44f5-8ddc-eca23cc9239a" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 9 00 39 AM" src="https://github.com/user-attachments/assets/d38be0c0-3482-4548-8a72-dbd522fca08f" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 9 01 05 AM" src="https://github.com/user-attachments/assets/7fddad09-a909-4bb0-8271-59930d222db9" />
<img width="1438" height="890" alt="Screenshot 2026-04-04 at 9 05 15 AM" src="https://github.com/user-attachments/assets/12229eae-96d6-4e30-aff9-67b64824e785" />
<img width="554" height="627" alt="Screenshot 2026-04-04 at 9 24 22 AM" src="https://github.com/user-attachments/assets/871fe69a-ff2e-49ef-9351-c3ed37326c71" />
<img width="548" height="524" alt="Screenshot 2026-04-04 at 9 32 07 AM" src="https://github.com/user-attachments/assets/973c14fb-d8d0-4912-98db-9e88af8f117d" />
<img width="1440" height="815" alt="Screenshot 2026-04-04 at 9 33 48 AM" src="https://github.com/user-attachments/assets/cc1601ff-14b1-49a1-9651-2585159d23dd" />
<img width="1440" height="807" alt="Screenshot 2026-04-04 at 9 34 27 AM" src="https://github.com/user-attachments/assets/2b968ef5-fdbb-44a1-a098-a622b27d22ed" />
<img width="1440" height="245" alt="Screenshot 2026-04-04 at 10 07 12 AM" src="https://github.com/user-attachments/assets/c55f93d2-48a1-4289-bc3a-4b5522c2ca2b" />
<img width="1440" height="900" alt="Screenshot 2026-04-04 at 10 20 15 AM" src="https://github.com/user-attachments/assets/87337458-0070-45ab-b9fc-fa19e9ed2603" />
<img width="1440" height="809" alt="Screenshot 2026-04-04 at 10 22 54 AM" src="https://github.com/user-attachments/assets/f9b69d52-c57b-4912-a79a-fd6626255cd5" />
<img width="1438" height="812" alt="Screenshot 2026-04-04 at 10 25 57 AM" src="https://github.com/user-attachments/assets/e1379c58-2c28-422d-8260-645293cbbfeb" />
<img width="1431" height="253" alt="Screenshot 2026-04-04 at 10 55 42 AM" src="https://github.com/user-attachments/assets/c33b74ab-2845-42c6-96e2-8b2d35c23308" />
<img width="1437" height="810" alt="Screenshot 2026-04-04 at 9 54 27 AM" src="https://github.com/user-attachments/assets/3e8d96b2-5ce0-444e-8e61-cad2389e8c74" />
<img width="1440" height="810" alt="Screenshot 2026-04-04 at 9 54 15 AM" src="https://github.com/user-attachments/assets/12fe85ef-fee9-438a-887a-1e776efee79b" />

---

## Result
Successfully implemented a complete CI/CD pipeline where:
- Source code and pipeline definition are maintained in **GitHub**
- Jenkins **automatically detects changes** via webhook
- Docker image is **built on host agent** using mounted Docker socket
- Image is **securely pushed** to Docker Hub using stored credentials

---

## Observations
- Jenkins GUI simplifies CI/CD pipeline management
- GitHub acts as both source repository and pipeline definition store
- Docker ensures consistent and reproducible builds
- Webhook enables fully automated build and deployment
- Mac M1 (ARM64) requires a custom Jenkins image with native Docker CLI

---

*Lab Experiment 7 — Containerization and DevOps*

