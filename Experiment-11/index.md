## Experiment 11 — Docker Orchestration
### Docker Compose → Docker Swarm

---

## Overview

This experiment demonstrates **container orchestration** by migrating a multi-container WordPress + MySQL application from Docker Compose (single-host) to Docker Swarm (orchestrated cluster), exploring scaling, self-healing, and load balancing.

---

## Tech Stack

| Component | Tool / Image |
|-----------|-------------|
| Orchestration | Docker Swarm |
| App | WordPress `latest` |
| Database | MySQL `8.0` |
| Compose Version | `3.9` |
| Platform | Mac M1 (ARM64) |

---

## Project Structure

```
experiment11/
└── docker-compose.yml      # Stack definition (WordPress + MySQL)
```

---

## Tasks Completed

### Task 1 — Environment Cleanup
Stopped any pre-existing containers from Experiment 6 and verified a clean state.

```bash
docker compose down -v
docker ps
```

---

### Task 2 — Initialize Docker Swarm
Enabled Swarm mode, making the local machine a **manager node**.

```bash
docker swarm init
docker node ls
docker node inspect self --pretty
docker info | grep -i swarm
```

> Node promoted to **Leader** status with `Active` availability.

---

### Task 3 — Deploy Stack
Deployed the WordPress + MySQL application as a **Swarm stack** using the same Compose file.

```bash
docker stack deploy -c docker-compose.yml wpstack
docker stack ls
docker service ls
docker stack services wpstack
```

> Swarm created an overlay network and launched managed services — not raw containers.

---

### Task 4 — Verify Deployment
Inspected services, tasks, networks, and logs to confirm successful orchestration.

```bash
docker service ls
docker service ps wpstack_wordpress
docker service ps wpstack_db
docker service inspect wpstack_wordpress --pretty
docker network inspect wpstack_default
docker service logs wpstack_wordpress
```

---

### Task 5 — Access WordPress
Confirmed application accessibility at `http://localhost:8080` and completed the WordPress installation.

```bash
docker ps | grep wordpress
docker service inspect wpstack_wordpress --format '{{json .Endpoint.Ports}}'
```

> WordPress setup screen loaded and installation completed successfully.

---

### Task 6 — Scaling
Demonstrated Swarm's built-in horizontal scaling — scaled WordPress from **1 → 3 → 5 → 3** replicas with a single command.

```bash
docker service scale wpstack_wordpress=3
docker service ls
docker service ps wpstack_wordpress
docker ps | grep wordpress | wc -l
docker stats --no-stream
docker service inspect --format '{{.Endpoint.VirtualIPs}}' wpstack_wordpress
```

> Swarm's internal load balancer distributed traffic across all replicas on the same port — no conflicts.

---

### Task 7 — Self-Healing
Simulated a container crash by force-killing a running WordPress container. Swarm automatically detected and replaced it.

```bash
docker kill $(docker ps | grep "wpstack_wordpress" | head -1 | awk '{print $1}')
docker service ps wpstack_wordpress
sleep 5 && docker service ps wpstack_wordpress
docker ps | grep wordpress | wc -l
docker service ps wpstack_wordpress --no-trunc
```

> Failed container showed `Shutdown` state. Swarm spawned a replacement — replica count stayed at 3 with **zero manual intervention**.

---

### Task 8 — Cleanup
Removed the entire stack, pruned volumes, networks, and containers.

```bash
docker stack rm wpstack
docker service ls
docker volume prune -f
docker network prune -f
docker system prune -f
docker system df
```

---

### Bonus — Leave Swarm + Rolling Updates

```bash
# Rolling update demonstration
docker service update --update-parallelism 1 --update-delay 5s --image wordpress:latest wpstack_wordpress

# Swarm join tokens
docker swarm join-token worker
docker swarm join-token manager
docker swarm join-token --rotate worker

# Leave Swarm
docker swarm leave --force
```

---

## Key Observations

### Docker Compose vs Docker Swarm

| Feature | Docker Compose | Docker Swarm |
|---------|:--------------:|:------------:|
| Scope | Single host | Multi-node cluster |
| Scaling | Basic (`--scale`) | `docker service scale` |
| Load Balancing | ✗ | ✓ Built-in VIP |
| Self-Healing | ✗ | ✓ Automatic |
| Rolling Updates | ✗ | ✓ Zero downtime |
| Service Discovery | Container names | DNS + VIP |

### Progression Path

```
docker run  →  Docker Compose  →  Docker Swarm  →  Kubernetes
  Single        Multi-container    Orchestration    Advanced
 container      (single host)        (basic)       at scale
```

---

## Mac M1 Note

`mysql:5.7` has no ARM64 build. Replaced with `mysql:8.0` which supports Apple Silicon natively.

---

## Quick Reference

```bash
docker swarm init                                        # Enable Swarm
docker stack deploy -c docker-compose.yml <name>        # Deploy stack
docker service ls                                        # List services
docker service scale <name>=<n>                         # Scale service
docker service ps <service>                             # View tasks
docker service logs -f <service>                        # Follow logs
docker service update --image <img> <service>           # Rolling update
docker stack rm <name>                                  # Remove stack
docker swarm leave --force                              # Exit Swarm
```

---
## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 8 54 31 AM" src="https://github.com/user-attachments/assets/51d4e5ce-2bf7-4372-bd7f-aea0bcc4b70a" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 8 56 21 AM" src="https://github.com/user-attachments/assets/de7bc977-5363-4fee-a698-56d15e9c7ae5" />
<img width="1433" height="251" alt="Screenshot 2026-04-25 at 8 58 35 AM" src="https://github.com/user-attachments/assets/0a8651b2-cd31-4a42-b5ca-ee117ec9e682" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 8 59 32 AM" src="https://github.com/user-attachments/assets/0725a828-d217-4c05-901d-503a2db7d46d" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 8 59 50 AM" src="https://github.com/user-attachments/assets/e9028aa8-3d2c-47d3-93eb-35674e6aa34a" />
<img width="1440" height="730" alt="Screenshot 2026-04-25 at 9 00 31 AM" src="https://github.com/user-attachments/assets/f3ce01d1-4c26-4b95-aa69-f1acbad03a27" />
<img width="1440" height="251" alt="Screenshot 2026-04-25 at 9 01 27 AM" src="https://github.com/user-attachments/assets/e8eb6b93-f62d-41aa-98c4-854cc7012c17" />
<img width="1433" height="900" alt="Screenshot 2026-04-25 at 9 03 39 AM" src="https://github.com/user-attachments/assets/57cdfa77-65a4-4ca9-9c46-8737343f44d8" />
<img width="1439" height="277" alt="Screenshot 2026-04-25 at 9 04 19 AM" src="https://github.com/user-attachments/assets/52518aec-4363-4510-9748-44daca8ae816" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 04 45 AM" src="https://github.com/user-attachments/assets/ce5346b5-799c-4249-aeea-d2fadc1087c5" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 05 06 AM" src="https://github.com/user-attachments/assets/f0e843da-2323-4f7b-88ee-adbea9692e79" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 05 35 AM" src="https://github.com/user-attachments/assets/7c326898-c384-465d-8920-d6d9d903cacf" />
<img width="1439" height="644" alt="Screenshot 2026-04-25 at 9 05 42 AM" src="https://github.com/user-attachments/assets/0997b46c-55ba-418c-9992-bc5217e11d8d" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 12 48 AM" src="https://github.com/user-attachments/assets/48ccfbf1-432b-4574-afea-11c3b11b42f5" />
<img width="1437" height="803" alt="Screenshot 2026-04-25 at 9 12 57 AM" src="https://github.com/user-attachments/assets/861a01c3-6f23-4c53-b592-e71dc2907637" />
<img width="1418" height="819" alt="Screenshot 2026-04-25 at 9 13 08 AM" src="https://github.com/user-attachments/assets/21388352-e0e5-4d37-a23c-b52169ef8d1f" />
<img width="1417" height="782" alt="Screenshot 2026-04-25 at 9 15 15 AM" src="https://github.com/user-attachments/assets/55e36de2-c2d4-41fd-8a12-08e67c749558" />
<img width="1440" height="826" alt="Screenshot 2026-04-25 at 9 15 33 AM" src="https://github.com/user-attachments/assets/4ec1904a-6d30-4c11-bb80-939f0f64b72d" />
<img width="1440" height="525" alt="Screenshot 2026-04-25 at 9 16 32 AM" src="https://github.com/user-attachments/assets/730cf9a8-1110-4dc4-a843-1344f3bc6132" />
<img width="1440" height="592" alt="Screenshot 2026-04-25 at 9 17 39 AM" src="https://github.com/user-attachments/assets/9d7cb14b-c619-42f5-9291-77ef9f6132b5" />
<img width="1440" height="314" alt="Screenshot 2026-04-25 at 9 17 59 AM" src="https://github.com/user-attachments/assets/b756e6fe-a138-46fc-abb3-2c5307cba8b7" />
<img width="1440" height="536" alt="Screenshot 2026-04-25 at 9 18 21 AM" src="https://github.com/user-attachments/assets/25a670ef-62c7-4f80-872d-d42e4e19061a" />
<img width="1440" height="431" alt="Screenshot 2026-04-25 at 9 19 32 AM" src="https://github.com/user-attachments/assets/8c337be3-2c9a-4de9-b761-fecce4084363" />
<img width="1440" height="562" alt="Screenshot 2026-04-25 at 9 19 48 AM" src="https://github.com/user-attachments/assets/bbfa69cb-f183-4639-99b6-a6718c556e6f" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 21 48 AM" src="https://github.com/user-attachments/assets/2d1d5767-a884-47d9-aecd-30d6a37e1dcc" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 21 53 AM" src="https://github.com/user-attachments/assets/8376d342-0bb1-4148-8419-dd9b38495aa0" />
<img width="1440" height="614" alt="Screenshot 2026-04-25 at 9 22 04 AM" src="https://github.com/user-attachments/assets/28415b9b-e2bd-41d0-8abf-90e1dac1373a" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 22 55 AM" src="https://github.com/user-attachments/assets/73a53068-c972-49df-862e-0f77a302498c" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 03 AM" src="https://github.com/user-attachments/assets/85356162-8498-4809-b856-e0fc4987369e" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 09 AM" src="https://github.com/user-attachments/assets/61affd33-f101-4b35-9ab3-a1baacdeaaf8" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 17 AM" src="https://github.com/user-attachments/assets/97027855-7c88-4a9d-b9c1-1bcdaa05f4b0" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 27 AM" src="https://github.com/user-attachments/assets/b2b1642c-6b67-4a94-af3a-b768426a94df" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 31 AM" src="https://github.com/user-attachments/assets/9c261d03-4998-4592-a2b6-8b800c41d9a8" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 36 AM" src="https://github.com/user-attachments/assets/8451a247-0a72-4eba-b9db-0a15514d6927" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 41 AM" src="https://github.com/user-attachments/assets/c28bc5ca-8592-45fc-9c5a-b5c941565a84" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 23 45 AM" src="https://github.com/user-attachments/assets/4c492291-e26c-458e-8bd6-78b10091d3e6" />
<img width="1440" height="574" alt="Screenshot 2026-04-25 at 9 24 24 AM" src="https://github.com/user-attachments/assets/963200c7-1116-47eb-8d5d-bbadda508fc9" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 29 20 AM" src="https://github.com/user-attachments/assets/1883fdaa-5635-4272-8637-8a0baa2c20d3" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 29 43 AM" src="https://github.com/user-attachments/assets/08d23dc5-3211-4a86-9bd4-90f6cb22db24" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 29 47 AM" src="https://github.com/user-attachments/assets/871b2795-5bd0-4eb6-9f10-f4306523a678" />
<img width="1440" height="199" alt="Screenshot 2026-04-25 at 9 30 08 AM" src="https://github.com/user-attachments/assets/c0102e2d-e789-4943-88bd-37224c110b80" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 30 27 AM" src="https://github.com/user-attachments/assets/82b8571a-eaa3-4280-acc4-989daa669e41" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 31 01 AM" src="https://github.com/user-attachments/assets/a95d4a0f-2ddf-4f3c-aa0c-42606afe4772" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 31 08 AM" src="https://github.com/user-attachments/assets/6ee12b50-cdc1-4fec-ac00-781993e61f8f" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 31 31 AM" src="https://github.com/user-attachments/assets/5d181eee-5e7e-475c-9485-4cf966202fcc" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 31 43 AM" src="https://github.com/user-attachments/assets/72e38bce-60c8-4c0a-a8f7-d3fda2c47c9e" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 32 01 AM" src="https://github.com/user-attachments/assets/5ed684b9-2364-414d-aa84-506f52c83c3a" />
<img width="1436" height="364" alt="Screenshot 2026-04-25 at 9 32 30 AM" src="https://github.com/user-attachments/assets/b5270614-2473-460d-abbb-8680982f7817" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 32 40 AM" src="https://github.com/user-attachments/assets/d85b5406-a738-40f7-a450-b61607b6b5d3" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 32 56 AM" src="https://github.com/user-attachments/assets/1048bfd4-a82a-4bb4-a8f6-09f56927fb46" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 33 13 AM" src="https://github.com/user-attachments/assets/59310aae-31f6-49c8-8a3d-73eae097aaec" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 33 33 AM" src="https://github.com/user-attachments/assets/091cfd28-bb8b-432a-8f30-7846a56bb5a7" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 9 34 02 AM" src="https://github.com/user-attachments/assets/47f24bb8-8d91-4e14-be9c-a5003dc2f1b9" />

---

## Results
 
### Task-wise Outcomes
 
| Task | Description | Result |
|------|-------------|--------|
| Task 1 | Stop old containers & verify clean state |  No conflicts found |
| Task 2 | Initialize Docker Swarm |  Node became `Leader` manager |
| Task 3 | Deploy WordPress + MySQL as a stack |  2 services created with overlay network |
| Task 4 | Verify deployment via inspect & logs | Both services running `1/1` replicas |
| Task 5 | Access WordPress at `localhost:8080` | Installation page loaded & completed |
| Task 6 | Scale WordPress to 3, then 5, then 3 replicas | Scaled instantly, load balanced via VIP |
| Task 7 | Kill a container — observe self-healing | Swarm replaced it within ~5 seconds |
| Task 8 | Remove stack & clean up all resources | All services, networks removed cleanly |
| Bonus | Rolling update + join tokens + leave Swarm | All commands executed successfully |
 
---
 
### Observed Behaviours
 
**Scaling**
- Scaling from 1 → 3 replicas took under 10 seconds
- All 3 WordPress containers shared port `8080` via Swarm's internal Virtual IP load balancer — no port conflicts, unlike plain Docker Compose
- `docker ps | grep wordpress | wc -l` confirmed exact replica count at all times
**Self-Healing**
- Force-killing a container with `docker kill` triggered immediate Swarm response
- Within ~5 seconds, `docker service ps wpstack_wordpress` showed the old container as `Shutdown / Failed` and a new one as `Running`
- Replica count never dropped below 3 — the desired state was maintained automatically without any manual command
**Rolling Updates**
- `docker service update` updated containers one at a time (`--update-parallelism 1`) with a 5-second delay between each
- The WordPress service remained accessible throughout the update — zero downtime
**Network Isolation**
- Swarm automatically created an overlay network `wpstack_default`
- Services communicated via DNS names (`db`, `wordpress`) within the overlay — no hardcoded IPs needed
---
 
## Conclusion
 
This experiment successfully demonstrated the transition from basic multi-container management using **Docker Compose** to production-grade **container orchestration using Docker Swarm**.
 
The core limitations of Docker Compose — manual scaling, no fault tolerance, and single-host restriction — were directly addressed by Swarm's orchestration layer. By deploying the same `docker-compose.yml` file as a Swarm stack, we achieved:
 
- **Automatic scaling** with a single command, managed by an internal load balancer
- **Self-healing** that required zero operator intervention when a container failed
- **Rolling updates** that kept the application live during image refreshes
- **Overlay networking** that enabled secure service-to-service communication across potential multi-node clusters
The experiment also highlighted the practical trade-offs in the orchestration spectrum. Docker Compose remains the ideal tool for local development due to its simplicity, while Docker Swarm bridges the gap toward production with manageable complexity. For large-scale deployments requiring advanced features like auto-scaling, fine-grained resource management, and cross-cloud federation, **Kubernetes** remains the industry standard next step.
 
In summary, Docker Swarm demonstrated that orchestration is not just about running containers — it is about maintaining a **desired state** reliably, automatically, and at scale, regardless of individual container failures.
 
> *"Compose defines the application. Swarm runs it reliably."*
 
---
 
*Experiment 11 | Docker Orchestration | Mac M1 (ARM64)*
 
