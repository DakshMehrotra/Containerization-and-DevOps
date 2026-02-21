## Experiment 4 - Containerization using Dockerfile, .dockerignore, Tagging & Publishing

## Dated
- 21st Feb 2026


## Objective
This experiment demonstrates:
- Writing a Dockerfile
- Using .dockerignore
- Building Docker images
- Running and managing containers
- Multi-stage builds
- Publishing images to Docker Hub
- Containerizing both Flask (Python) and Node.js applications

## Part 1 – Flask Application (Python)
Project Structure

my-flask-app/
│── app.py
│── requirements.txt
│── Dockerfile
│── .dockerignore

### app.py

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Docker!"

@app.route('/health')
def health():
    return "OK"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

### requirements.txt
Flask==2.3.3

### Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]

### .dockerignore
__pycache__/
*.pyc
.env
.venv
.git/
.DS_Store

### Why .dockerignore?
- Reduces image size
- Improves build speed
- Prevents sensitive files from being copied

### Build Image
- docker build -t my-flask-app:1.0 .
### Run Container
- docker run -d -p 5001:5000 --name flask-container my-flask-app:1.0
### Open in browser:
- http://localhost:5001

- Multi-stage Build (Optimized Image)
### Stage 1
FROM python:3.9-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir -r requirements.txt

### Stage 2
FROM python:3.9-slim
WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY app.py .
RUN useradd -m -u 1000 appuser
USER appuser
EXPOSE 5000
CMD ["python", "app.py"]

## Benefits:
- Smaller image
- Improved security
- Separation of build and runtime

### Publishing to Docker Hub
Login:
- docker login
Tag:
- docker tag my-flask-app:1.0 <your-username>/my-flask-app:1.0
Push:
- docker push <your-username>/my-flask-app:1.0
Pull:
- docker pull <your-username>/my-flask-app:1.0

## Part 2 – Node.js Application
Project Structure
my-node-app/
│── app.js
│── package.json
│── Dockerfile

### app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js Docker!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

### package.json
{
  "name": "node-docker-app",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}

### Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY app.js .

EXPOSE 3000

CMD ["node", "app.js"]


### Build Image
- docker build -t my-node-app .

### Run Container
- docker run -d -p 3000:3000 --name node-container my-node-app
Open:
- http://localhost:3000


## Outcomes 
- Difference between Image and Container
- Port mapping (-p host:container)
- Docker layering and caching
- Multi-stage builds
- Image tagging and versioning
- Publishing to Docker Hub
- Debugging container issues

## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 32 35 AM" src="https://github.com/user-attachments/assets/fe27dd38-5af4-4f96-8287-045712d37173" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 32 37 AM" src="https://github.com/user-attachments/assets/6a2fab18-e6cd-4a91-81fd-8c3b943dee89" />
<img width="1439" height="83" alt="Screenshot 2026-02-21 at 8 45 11 AM" src="https://github.com/user-attachments/assets/ca29590d-eac4-4ea5-af4f-3a99233478db" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 46 20 AM" src="https://github.com/user-attachments/assets/18bf432c-2a79-49ad-90bd-af68bf5e02a8" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 48 02 AM" src="https://github.com/user-attachments/assets/2c2be64e-847d-4018-aa3f-e1fd7694f22b" />
<img width="1440" height="126" alt="Screenshot 2026-02-21 at 8 48 17 AM" src="https://github.com/user-attachments/assets/55700b0d-96ce-4e56-b34b-4cc4615eaf11" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 48 36 AM" src="https://github.com/user-attachments/assets/03f145c9-2544-4d3b-8031-b0ee6d0444f8" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 49 44 AM" src="https://github.com/user-attachments/assets/3fbc18d4-10bd-43de-9d8b-e2d88c344874" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 51 45 AM" src="https://github.com/user-attachments/assets/f6b48025-03b4-41ff-a3db-5f7e0f3c39ca" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 51 48 AM" src="https://github.com/user-attachments/assets/d0d9121f-402a-44b0-805c-16fbba155969" />
<img width="1440" height="377" alt="Screenshot 2026-02-21 at 8 53 43 AM" src="https://github.com/user-attachments/assets/bc1f18ed-854a-4194-a351-192553f1cc99" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 55 33 AM" src="https://github.com/user-attachments/assets/c44c360f-4e3e-4666-83f3-5545e099f09c" />
<img width="1440" height="57" alt="Screenshot 2026-02-21 at 8 56 41 AM" src="https://github.com/user-attachments/assets/95684d84-674b-4ecc-ac43-a93e0a3abff1" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 56 44 AM" src="https://github.com/user-attachments/assets/415561de-0911-4e5b-8a89-8546aac0d394" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 8 57 16 AM" src="https://github.com/user-attachments/assets/cff78e3d-9c15-44e6-a278-51c6e9879ee4" />
<img width="1440" height="111" alt="Screenshot 2026-02-21 at 8 57 28 AM" src="https://github.com/user-attachments/assets/f92fe4b0-1597-46a2-a079-f9d6e7139920" />
<img width="1440" height="195" alt="Screenshot 2026-02-21 at 8 58 15 AM" src="https://github.com/user-attachments/assets/6eb52ecf-b83c-4407-86a4-c9f5810e3da2" />
<img width="1440" height="564" alt="Screenshot 2026-02-21 at 8 59 08 AM" src="https://github.com/user-attachments/assets/327f8e02-3861-4024-98dd-349ea676c4d4" />
<img width="1439" height="576" alt="Screenshot 2026-02-21 at 9 02 31 AM" src="https://github.com/user-attachments/assets/a99134c9-a80b-4e82-90b2-42f277810b68" />
<img width="1440" height="118" alt="Screenshot 2026-02-21 at 9 03 32 AM" src="https://github.com/user-attachments/assets/55a80970-97a2-4ccd-9809-4dccda2048c8" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 9 04 56 AM" src="https://github.com/user-attachments/assets/55fc9657-e411-407a-a92e-65e1b9846fbd" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 9 05 29 AM" src="https://github.com/user-attachments/assets/c9e09704-cd96-4ca4-a9e3-6d26e037a11f" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 9 06 23 AM" src="https://github.com/user-attachments/assets/be1fe7c0-0e15-4d3e-af99-620076c27572" />
<img width="1440" height="280" alt="Screenshot 2026-02-21 at 9 06 44 AM" src="https://github.com/user-attachments/assets/daffcd2f-391e-4959-bb16-8c501e5f929f" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 9 07 29 AM" src="https://github.com/user-attachments/assets/df547c00-5e4b-4d18-83e1-defd3b08d9ed" />
<img width="1440" height="650" alt="Screenshot 2026-02-21 at 9 14 59 AM" src="https://github.com/user-attachments/assets/1c51a8ca-a1f2-49d9-bf8f-0e8fd8a7c31f" />
<img width="1440" height="58" alt="Screenshot 2026-02-21 at 9 15 11 AM" src="https://github.com/user-attachments/assets/0679c02b-5c29-49a0-b77b-8a72b0dd8462" />
<img width="1440" height="189" alt="Screenshot 2026-02-21 at 9 19 09 AM" src="https://github.com/user-attachments/assets/81f310b7-9a87-4657-88f0-6567ab492b68" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 9 20 34 AM" src="https://github.com/user-attachments/assets/b7b591c9-5457-45d4-93ed-76ccc6b83a6b" />
<img width="1440" height="394" alt="Screenshot 2026-02-21 at 9 23 36 AM" src="https://github.com/user-attachments/assets/7ef6abaf-1381-4ca7-b773-bc2a672e4498" />
<img width="1440" height="776" alt="Screenshot 2026-02-21 at 9 53 46 AM" src="https://github.com/user-attachments/assets/12095d41-7369-4b99-ac42-b2885dd9dd47" />
<img width="1440" height="449" alt="Screenshot 2026-02-21 at 9 53 51 AM" src="https://github.com/user-attachments/assets/10801802-fbeb-4f13-ae99-152d3d31ae7f" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 9 54 15 AM" src="https://github.com/user-attachments/assets/306bbd35-0597-408c-bf23-281a0c9b7dbd" />




## Result
The experiment was successfully completed by containerizing both a Python Flask application and a Node.js Express application using Docker.
The following outcomes were achieved:
- Docker images were built successfully using custom Dockerfile.
- .dockerignore was implemented to optimize image size and security.
- Containers were executed with proper port mapping.
- Multi-stage build was implemented to optimize production image size.
- Docker images were successfully tagged and published to Docker Hub.
- The published image was pulled and executed successfully from Docker Hub.
- Both applications were accessible via browser:
- Flask App → http://localhost:5001
- Node App → http://localhost:3000
- The Docker workflow from build → run → tag → push → pull → run was validated successfully.


## Conclusion
This experiment provided practical understanding of Docker-based containerization and image management.
Through this lab, the following key concepts were understood and implemented:
- Dockerfile Creation
- Learned how to define base images, working directories, dependency installation, and runtime commands.
- Use of .dockerignore
- Understood how excluding unnecessary files improves build performance and enhances security.
- Image Building and Tagging
- Gained knowledge of Docker image layering, version tagging, and naming conventions.
- Container Execution and Port Mapping
- Learned how host-to-container port mapping enables application accessibility.
- Multi-stage Builds
- Implemented multi-stage Dockerfile to reduce final image size and improve production security.
- Docker Hub Integration
- Successfully published and retrieved container images from Docker Hub, demonstrating real-world deployment workflow.
- Debugging and Troubleshooting
- Resolved issues related to:
- Port conflicts
- Container exit behavior
- Missing application files
- Dependency installation errors
Overall, the experiment strengthened practical knowledge of containerization, DevOps workflows, and Docker-based deployment strategies, which are essential skills in modern software development and cloud-native application deployment.
