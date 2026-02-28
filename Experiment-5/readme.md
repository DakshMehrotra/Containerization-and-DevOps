# Docker Networking, Volumes & Environment Variables Lab
## Experiment 5 – Containerization & DevOps
This experiment demonstrates Docker networking modes, container communication, persistent storage using volumes, environment variable management, and container monitoring techniques.
## Dated - 28 Feb 2026
## Objective
- To understand and implement:
- Docker default and custom networking
- Inter-container communication
- Host and none network modes
- Docker volumes for persistent storage
- Environment variable handling (-e, --env-file, Dockerfile ENV)
- Runtime override behavior
- Container monitoring and inspection tools

## Technologies Used
- Docker Desktop (Mac M1 – ARM64 compatible)
- Python 3.9 (Slim image)
- Flask
- PostgreSQL
- Nginx
- Alpine Linux

## Project Structure
env-lab/
│── app.py
│── requirements.txt
│── Dockerfile
│── .env

## Part 1 – Docker Networking
Default Networks
- docker network ls
- Default networks:
- bridge
- host
- none

Custom Bridge Network
- docker network create my-network
- docker network inspect my-network

Container Communication (DNS Resolution)
- docker run -d --name web1 --network my-network nginx
- docker run -d --name web2 --network my-network nginx
- docker exec web1 curl http://web2
- Containers communicate using container names via Docker's built-in DNS.

Host Network Mode
- docker run -d --name host-app --network host nginx

Note:
On macOS, host networking behaves differently because Docker runs inside a VM.
None Network Mode
- docker run -d --name isolated-app --network none alpine sleep 3600
- Only loopback interface is available.

## Part 2 – Docker Volumes & Multi-Container App
Create Named Volume
- docker volume create pgdata
Run PostgreSQL with Volume
- docker run -d \
--name postgres-db \
--network app-network \
-e POSTGRES_PASSWORD=secret \
-v pgdata:/var/lib/postgresql/data \
postgres:15
This ensures data persistence beyond container lifecycle.

Run Web Container
- docker run -d \
--name web-app \
--network app-network \
-p 8080:80 \
nginx
Access via:
http://localhost:8080

## Part 3 – Environment Variables
Flask Application (app.py)
Reads:
- DATABASE_HOST
- DEBUG
- API_KEY
- PORT
- Endpoint:
- /config
Returns JSON configuration details.

### Method 1 – Using -e
- docker run -d \
--name flask-app \
-p 5000:5000 \
-e DATABASE_HOST=prod-db \
-e DEBUG=true \
-e API_KEY=secret123 \
flask-env-app

### Method 2 – Using --env-file
- Create .env:
- DATABASE_HOST=localhost-db
- DEBUG=false
- API_KEY=envfilekey123
- PORT=5000
Run:
- docker run -d \
--name flask-app2 \
--env-file .env \
-p 5000:5000 \
flask-env-app

### Method 3 – Runtime Override
- docker run -d \
--name flask-app3 \
--env-file .env \
-e DEBUG=true \
-e DATABASE_HOST=override-db \
-p 5000:5000 \
flask-env-app

### Environment Variable Priority
CLI -e
--env-file
Dockerfile ENV
Application default value

## Part 4 – Monitoring & Debugging
Real-time Stats
- docker stats
- Displays:
- CPU usage
- Memory usage
- Network I/O
- Block I/O
View Logs
- docker logs <container-name>
Inspect Container
- docker inspect <container-name>
Shows:
- Environment variables
- Network settings
- Mount points

View Running Processes
- docker top <container-name>
Docker Events
- docker events

Displays real-time container lifecycle events.
## Cleanup
- docker rm -f <container>
- docker volume rm pgdata
- docker network rm app-network
- docker image rm flask-env-app

## Key Concepts Learned
- Container networking isolation
- DNS-based service discovery
- Persistent storage using volumes
- Secure environment configuration
- Runtime environment override
- Resource monitoring and debugging
- Docker architecture differences (macOS vs Linux)

## Screenshots

<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 32 47 AM" src="https://github.com/user-attachments/assets/fe318a59-757f-4040-b690-a0a7e95b8118" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 33 45 AM" src="https://github.com/user-attachments/assets/77231214-121c-474a-b15c-69937c859fa2" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 34 04 AM" src="https://github.com/user-attachments/assets/6df4433b-8e4a-4099-b2c5-8e06428fbc77" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 35 36 AM" src="https://github.com/user-attachments/assets/56a1a5b9-21f2-48eb-bfa2-16f57e30c1c4" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 37 43 AM" src="https://github.com/user-attachments/assets/4d64f8d8-7f0b-44b0-86d1-d1d2f1d8674c" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 38 00 AM" src="https://github.com/user-attachments/assets/199eb854-6c60-4010-8be9-dbe54ede605c" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 38 17 AM" src="https://github.com/user-attachments/assets/4b2589f6-03f0-43c6-961c-abf8382d4a9f" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 38 28 AM" src="https://github.com/user-attachments/assets/9c9f94f9-9c0d-41e2-bea2-dbe136e27656" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 38 58 AM" src="https://github.com/user-attachments/assets/1d46f1e1-ee30-4af1-ade6-e2fbc839b83e" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 39 00 AM" src="https://github.com/user-attachments/assets/abe388d5-efe5-4d7e-bb97-ff40a9d33673" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 39 03 AM" src="https://github.com/user-attachments/assets/2946393a-51da-4551-878b-83a56be2935b" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 39 06 AM" src="https://github.com/user-attachments/assets/c0803f24-e3c8-4ba9-b0b8-d0e63f00c0a4" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 39 08 AM" src="https://github.com/user-attachments/assets/70479959-7706-4881-acfb-b8c6dc31a252" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 39 18 AM" src="https://github.com/user-attachments/assets/c6d68765-d32d-4fec-8726-20701ce437ad" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 39 25 AM" src="https://github.com/user-attachments/assets/7c0366ef-1cc4-4b49-84cc-b3b934382a3a" />
<img width="1440" height="295" alt="Screenshot 2026-02-28 at 8 41 07 AM" src="https://github.com/user-attachments/assets/eaefc4f4-1439-47d5-9efd-aec45c4ba86b" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 41 26 AM" src="https://github.com/user-attachments/assets/deb6aba6-7b5d-48db-b895-635af4946174" />
<img width="1440" height="672" alt="Screenshot 2026-02-28 at 8 43 56 AM" src="https://github.com/user-attachments/assets/4de5495d-8df0-4b92-adf9-fd2fe2eb4b5e" />
<img width="1440" height="176" alt="Screenshot 2026-02-28 at 8 45 06 AM" src="https://github.com/user-attachments/assets/c02de570-b17d-496d-9c0a-f206bc978af7" />
<img width="1440" height="322" alt="Screenshot 2026-02-28 at 8 46 19 AM" src="https://github.com/user-attachments/assets/770745e9-933a-4f82-a7d0-fd642e3d95ea" />
<img width="1440" height="492" alt="Screenshot 2026-02-28 at 8 46 52 AM" src="https://github.com/user-attachments/assets/af25718b-5249-4d40-a820-cbd4b1f0b41a" />
<img width="1440" height="281" alt="Screenshot 2026-02-28 at 8 47 48 AM" src="https://github.com/user-attachments/assets/a91cd20b-af84-45eb-8615-81174d1f2bb5" />
<img width="1437" height="452" alt="Screenshot 2026-02-28 at 8 48 26 AM" src="https://github.com/user-attachments/assets/f859f135-76b6-4488-a00f-848413b3a58c" />
<img width="1440" height="312" alt="Screenshot 2026-02-28 at 8 50 41 AM" src="https://github.com/user-attachments/assets/8e77138c-4fde-4db7-acee-8a4c0d84e692" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 50 50 AM" src="https://github.com/user-attachments/assets/e8fcbe48-342d-46e6-843d-9528d040b253" />
<img width="1439" height="227" alt="Screenshot 2026-02-28 at 8 52 47 AM" src="https://github.com/user-attachments/assets/53c802cd-6203-437a-bfb8-baac287540b3" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 52 54 AM" src="https://github.com/user-attachments/assets/eb3abda7-fc13-40af-8ff6-1bbadf28b7bf" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 53 08 AM" src="https://github.com/user-attachments/assets/9e50c0e4-3e62-4e2c-ae6e-41af225c78ce" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 53 50 AM" src="https://github.com/user-attachments/assets/8aec214a-0a24-4130-ba39-16651e1f02bc" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 8 54 05 AM" src="https://github.com/user-attachments/assets/6a0ee3ec-aae3-4715-a61b-19e07188a94f" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 02 37 AM" src="https://github.com/user-attachments/assets/eab504ab-1068-4c6d-91c8-d47d5eab1030" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 04 19 AM" src="https://github.com/user-attachments/assets/95b10061-70c5-4599-ae00-9a1a77cb66d2" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 04 29 AM" src="https://github.com/user-attachments/assets/35dbecf0-4731-44db-8705-5ffd16397c3b" />
<img width="1440" height="455" alt="Screenshot 2026-02-28 at 9 05 16 AM" src="https://github.com/user-attachments/assets/78e05cea-928c-4a38-ad85-98141ad24548" />
<img width="1440" height="416" alt="Screenshot 2026-02-28 at 9 07 51 AM" src="https://github.com/user-attachments/assets/20cceabd-c436-4b2e-b516-cf22507233cc" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 07 56 AM" src="https://github.com/user-attachments/assets/82b0916b-c330-421c-9438-26a90131006d" />
<img width="1440" height="323" alt="Screenshot 2026-02-28 at 9 08 27 AM" src="https://github.com/user-attachments/assets/8f742cbb-0947-425e-b9d9-ae1b93e9f3e5" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 09 57 AM" src="https://github.com/user-attachments/assets/1793c7f6-e5c8-4c30-a7e9-7d8bc8585203" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 11 39 AM" src="https://github.com/user-attachments/assets/40eaff51-f6d1-4c27-a61f-323484b7e382" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 13 14 AM" src="https://github.com/user-attachments/assets/b0300823-94fa-4271-a064-3406253393f4" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 15 22 AM" src="https://github.com/user-attachments/assets/debfcc49-771b-41cb-813a-fcf4d71223d2" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 17 07 AM" src="https://github.com/user-attachments/assets/0dcbd776-9f9b-4368-a69f-df35e0a4852b" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 17 14 AM" src="https://github.com/user-attachments/assets/60bf0212-8fb5-4056-ae64-0835881099ba" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 17 16 AM" src="https://github.com/user-attachments/assets/33d62a4d-0944-4aa0-a65f-857462a8a5e6" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 17 19 AM" src="https://github.com/user-attachments/assets/6d69cce6-12be-4306-8bd7-55e90f35db33" />
<img width="1152" height="211" alt="Screenshot 2026-02-28 at 9 17 53 AM" src="https://github.com/user-attachments/assets/9c8e348e-19e0-4598-b1c0-bf9ac8f2617e" />
<img width="1440" height="900" alt="Screenshot 2026-02-28 at 9 18 37 AM" src="https://github.com/user-attachments/assets/ba9614a2-d2b0-409c-841f-4de6783814a3" />
<img width="1440" height="545" alt="Screenshot 2026-02-28 at 9 20 11 AM" src="https://github.com/user-attachments/assets/bf9834d2-63b7-4fe2-9bdb-a0b379a5cdb1" />


## Result
The experiment demonstrated a practical understanding of:
- Docker networking architecture
- Persistent storage management
- Secure configuration handling using environment variables
- Runtime configuration override
- Container monitoring and debugging tools
The implementation validates correct container orchestration principles and production-ready configuration practices.

## Conclusion
- Successfully implemented and tested:
- Docker networking modes
- Inter-container communication
- Volume persistence
- Environment variable management
- Runtime overrides
- Container monitoring tools
This experiment demonstrates practical understanding of Docker container lifecycle management, networking architecture, and production-level configuration handling.
