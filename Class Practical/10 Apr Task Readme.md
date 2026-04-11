# Task FastAPI CI/CD Pipeline — Docker + GitHub Actions

> **Assignment:** Dockerize a Python FastAPI server, automate build & push to Docker Hub using GitHub Actions  
> **Student:** Daksh Mehrotra | **SAP ID:** 500125960  
> **Course:** Containerization & DevOps Lab

---

##  What This Project Does

Every time code is pushed to this repository, GitHub Actions automatically:
1. Builds a Docker image of the FastAPI app
2. Pushes it to Docker Hub — zero manual steps

```
git push  →  GitHub Actions  →  Docker Build  →  Docker Hub  
```

---

##  Project Structure

```
fastapi-cicd/
├── main.py                          # FastAPI application
├── requirements.txt                 # Python dependencies
├── Dockerfile                       # Container definition
├── .gitignore                       # Ignores .env
├── .env                             # Local secrets (never committed)
└── .github/
    └── workflows/
        └── DockerBuild.yml          # GitHub Actions CI/CD pipeline
```

---

##  Stack

| Tool | Purpose |
|------|---------|
| **FastAPI** | Python web framework |
| **Docker** | Containerization |
| **GitHub Actions** | CI/CD automation |
| **Docker Hub** | Container image registry |
| **Ubuntu (linux/amd64)** | Base image |

---

##  File Breakdown

### `main.py`
```python
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return dict(name="Daksh Mehrotra", sapid="500125960", Location="Dehradun")

@app.get("/{data}")
def read_data(data):
    return dict(hi=data, Location="Dehradun")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True)
```

### `Dockerfile`
```dockerfile
FROM --platform=linux/amd64 ubuntu

RUN apt update -y
RUN apt install python3 python3-pip pipenv -y

WORKDIR /app
COPY . /app/

RUN pipenv install -r requirements.txt

EXPOSE 80

CMD pipenv run python3 ./main.py
```

> `--platform=linux/amd64` is specified for compatibility with GitHub Actions runners (Mac M1 build environment).

### `.github/workflows/DockerBuild.yml`
```yaml
name: Docker image build

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Login to DockerHub
        run: |
          echo ${{ secrets.DOCKERTOKEN }} | docker login -u "daksh24" --password-stdin

      - name: Build Docker Image
        run: |
          docker build -t daksh24/fastapi-app:v0.1 .

      - name: Push Docker Image
        run: |
          docker push daksh24/fastapi-app:v0.1
```

---

##  Secret Configuration

A Docker Hub personal access token is stored as a GitHub Actions secret:

| Secret Name | Description |
|-------------|-------------|
| `DOCKERTOKEN` | Docker Hub access token (Read & Write) |

**To add:** `Repo → Settings → Secrets and variables → Actions → New repository secret`

---

##  Running Locally

Pull and run the latest image from Docker Hub:

```bash
docker pull daksh24/fastapi-app:v0.1
docker run --rm -p 8070:80 daksh24/fastapi-app:v0.1
```

Open in browser:
```
http://localhost:8070
```

Expected response:
```json
{
  "name": "Daksh Mehrotra",
  "sapid": "500125960",
  "Location": "Dehradun"
}
```

---

##  CI/CD Verification Checklist

| Step | Description | Result |
|------|-------------|--------|
| Code pushed to GitHub | Triggers workflow automatically | Yes |
| GitHub Actions workflow runs | Build job executes on `ubuntu-latest` | Yes |
| Docker image built | `daksh24/fastapi-app:v0.1` created | Yes |
| Image pushed to Docker Hub | Available publicly on registry | Yes |
| Container runs locally | API responds on `localhost:8070` | Yes |
| SAP ID in response | `500125960` visible in JSON output | Yes |

---

##  CI/CD Pipeline Flow

```
Developer pushes code
        ↓
GitHub detects push event
        ↓
GitHub Actions runner starts (ubuntu-latest)
        ↓
Repository is checked out
        ↓
Docker login using DOCKERTOKEN secret
        ↓
Docker image built (linux/amd64)
        ↓
Image pushed to Docker Hub
        ↓
docker pull + docker run locally
        ↓
Verified at http://localhost:8070 
```

---

##  Docker Hub Image

```
daksh24/fastapi-app:v0.1
```

🔗 [View on Docker Hub](https://hub.docker.com/r/daksh24/fastapi-app)

---

## Screenshot
<img width="1440" height="374" alt="Screenshot 2026-04-11 at 5 24 29 PM" src="https://github.com/user-attachments/assets/df2248a8-23fd-4c67-a8c5-43952b293cdc" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 24 36 PM" src="https://github.com/user-attachments/assets/fec0a049-a6a2-4aad-9b30-815ade866853" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 24 56 PM" src="https://github.com/user-attachments/assets/656d1e1c-196d-4f71-a3d9-651d3555c332" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 25 16 PM" src="https://github.com/user-attachments/assets/66908a9d-cafe-4d80-a657-f6383874fd6f" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 29 07 PM" src="https://github.com/user-attachments/assets/1d3bbaa7-4473-47b4-9700-3d31921c2441" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 30 32 PM" src="https://github.com/user-attachments/assets/cb2011d9-9391-4c23-8189-b18a702a686e" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 31 15 PM" src="https://github.com/user-attachments/assets/9254aa03-2171-4a8a-9729-966a09248d3d" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 6 00 43 PM" src="https://github.com/user-attachments/assets/04ab3a75-446f-48a9-9d3f-4353ae114ba8" />
<img width="1440" height="790" alt="Screenshot 2026-04-11 at 6 00 51 PM" src="https://github.com/user-attachments/assets/7a001584-fc01-4be6-a99f-9698bfaba591" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 6 01 43 PM" src="https://github.com/user-attachments/assets/1d349a4d-a5b3-4b12-9ec7-eafe4efa0f02" />
<img width="1435" height="261" alt="Screenshot 2026-04-11 at 5 39 24 PM" src="https://github.com/user-attachments/assets/c5a49446-b105-43b1-98de-70b0489ba30f" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 5 51 53 PM" src="https://github.com/user-attachments/assets/4d03a165-3dde-45a1-9c16-32d6c0c11ed8" />
<img width="1440" height="423" alt="Screenshot 2026-04-11 at 6 03 55 PM" src="https://github.com/user-attachments/assets/a832590a-b530-4a23-a51a-987e5a4bff22" />
<img width="1430" height="453" alt="Screenshot 2026-04-11 at 6 04 47 PM" src="https://github.com/user-attachments/assets/4e82fd89-3a38-48e6-a57e-0c7a27e25dc2" />
<img width="1440" height="510" alt="Screenshot 2026-04-11 at 6 06 32 PM" src="https://github.com/user-attachments/assets/95ea14dc-ffd5-4e7a-81f3-fbfd5eedabbe" />
<img width="1440" height="814" alt="Screenshot 2026-04-11 at 6 07 45 PM" src="https://github.com/user-attachments/assets/652797db-97d5-4937-88b6-b84cb53e09cb" />
<img width="1440" height="509" alt="Screenshot 2026-04-11 at 6 10 05 PM" src="https://github.com/user-attachments/assets/473d9795-9adb-4e66-a8e9-24ebc7cb6624" />
<img width="1440" height="817" alt="Screenshot 2026-04-11 at 6 10 39 PM" src="https://github.com/user-attachments/assets/7d527846-9b56-4a9a-84ef-7b559cbd2584" />




---

##  Notes

- The `--platform=linux/amd64` flag in the Dockerfile is required when building on Apple Silicon (M1/M2) Mac to ensure compatibility with x86-based CI runners
- The `.env` file is listed in `.gitignore` and is never pushed to the repository
- The `DOCKERTOKEN` secret is stored securely in GitHub and never exposed in workflow logs
