## Docker Swarm & Advanced Networking Lab
## Bridge | Custom Network | Overlay | Macvlan | Service Scaling

## Objective
This lab focused on understanding advanced Docker networking concepts including:
- Custom bridge networks
- Inter-container communication
- Docker Swarm initialization
- Overlay networks
- Service creation & scaling
- Macvlan networking
- Port conflicts & troubleshooting

## System Configuration
- Operating System: macOS (Docker Desktop – Linux backend)
- Docker Version: 29.1.3
- Swarm Mode: Enabled
- Network Drivers Used: bridge, overlay, macvlan

## Part 1: Custom Bridge Network & Container Communication

### Steps Performed:
Created custom bridge network:
- docker network create my_app_net
  
Ran two containers inside same network:
- docker run -d --name web --network my_app_net nginx
- docker run -d --name utils --network my_app_net alpine sleep 3600

Verified communication using:
- docker exec utils ping web
- docker exec utils wget -qO- http://web

## Observation
- Containers successfully communicated using container names
- Docker’s built-in DNS resolved web automatically
- Demonstrated isolation + name-based resolution in user-defined bridge networks

## Part 2: Docker Swarm Initialization
Initialized Swarm:
- docker swarm init --advertise-addr 127.0.0.1

### Result:
- Node became Swarm Manager
- Swarm mode activated
- Token generated for worker/manager nodes

## Part 3: Overlay Network & Standalone Containers
Created overlay network:
- docker network create -d overlay --attachable my_overlay
Launched containers inside overlay:
- docker run -dit --name app1 --network my_overlay busybox sh
- docker run -dit --name app2 --network my_overlay busybox sh

Verified connectivity:
- docker exec app1 ping app2

## Observation
- Containers successfully communicated
- Overlay network enabled cross-node style networking (even though single-node setup)

## Part 4: Docker Services & Scaling
Created service:
- docker service create --name web -p 8080:80 nginx
Scaled service:
- docker service scale web=4
Verified:
- docker service ls
- docker service ps web
## Observation
- Service scaled to 4 replicas
- Swarm maintained desired state automatically
- Load-balanced traffic on port 8080
Accessed via:
- http://localhost:8080

## Part 5: Overlay Production Network
Created production overlay network:
- docker network create -d overlay prod_net
Used for scalable service deployments.

## Part 6: Macvlan Network (Advanced Networking)
Created macvlan network:
- docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  my_macvlan
Ran container with custom IP:
- docker run -d \
  --name web-macvlan \
  --network my_macvlan \
  --ip 192.168.1.100 \
  nginx
Tested using:
- curl 192.168.1.100

## Important Observations
- macOS host could not directly access macvlan container (expected behavior)
- Port 8080 conflict error occurred:
- bind: address already in use
- Docker prevents port reuse if already occupied
- Active endpoints prevent network removal

## Networking Drivers Comparison
| Driver  | Scope | Use Case                     | Notes               |
| ------- | ----- | ---------------------------- | ------------------- |
| Bridge  | Local | Default container networking | Simple & isolated   |
| Overlay | Swarm | Multi-host communication     | Used for services   |
| Macvlan | Local | Direct LAN IP assignment     | Advanced setup      |
| Host    | Local | No isolation                 | Shares host network |

## Outcomes 
- Custom bridge networks provide automatic DNS resolution
- Swarm mode enables clustering & service orchestration
- Overlay networks support scalable distributed apps
- Services maintain desired replica count automatically
- Macvlan assigns real LAN IPs but has host-access limitations
- Port conflicts must be resolved before reusing ports
- Docker networking enforces isolation & structured communication

## Screenshots 
<img width="1440" height="900" alt="Screenshot 2026-02-20 at 12 18 38 PM" src="https://github.com/user-attachments/assets/bcd39982-eba2-46b0-b368-5665bd77beaa" />
<img width="1440" height="248" alt="Screenshot 2026-02-20 at 12 20 23 PM" src="https://github.com/user-attachments/assets/deac8d07-cda8-456d-a01d-40fdf94dd215" />
<img width="1440" height="900" alt="Screenshot 2026-02-20 at 12 21 22 PM" src="https://github.com/user-attachments/assets/8681de54-c7f9-4d42-bc30-66a5eba0ec48" />
<img width="1440" height="900" alt="Screenshot 2026-02-20 at 12 21 25 PM" src="https://github.com/user-attachments/assets/451ecdf3-dee3-42d0-a9bc-44e978a0696c" />
<img width="1440" height="105" alt="Screenshot 2026-02-20 at 12 21 35 PM" src="https://github.com/user-attachments/assets/b155ed6c-f566-495d-a418-67d3a2d7ef6e" />
<img width="1440" height="900" alt="Screenshot 2026-02-20 at 12 28 48 PM" src="https://github.com/user-attachments/assets/a832f52f-14ee-439c-824b-80ff603493e8" />
<img width="1440" height="171" alt="Screenshot 2026-02-20 at 12 29 19 PM" src="https://github.com/user-attachments/assets/a259f5e0-19fe-465e-81da-17ecb6364acb" />
<img width="1440" height="402" alt="Screenshot 2026-02-20 at 12 29 34 PM" src="https://github.com/user-attachments/assets/dbb3a39c-5aa3-476b-b95f-72fedc46dd49" />
<img width="1440" height="204" alt="Screenshot 2026-02-20 at 12 31 07 PM" src="https://github.com/user-attachments/assets/af55773e-42e2-4c9e-ba16-d0b73d4b4ddd" />
<img width="1440" height="42" alt="Screenshot 2026-02-20 at 12 31 35 PM" src="https://github.com/user-attachments/assets/0b234e09-e99d-4c46-88ea-efb4c10121af" />
<img width="1440" height="489" alt="Screenshot 2026-02-20 at 12 32 24 PM" src="https://github.com/user-attachments/assets/9a0b1047-f871-4a59-85a3-d0ed92cd0ccb" />
<img width="1440" height="900" alt="Screenshot 2026-02-20 at 12 34 11 PM" src="https://github.com/user-attachments/assets/4338c6e2-60ae-48da-bbbe-622ffd9c37e3" />
<img width="1440" height="166" alt="Screenshot 2026-02-20 at 12 41 09 PM" src="https://github.com/user-attachments/assets/414319ac-157b-49e9-bbc6-9ebfa4528b99" />
<img width="1440" height="900" alt="Screenshot 2026-02-20 at 12 42 04 PM" src="https://github.com/user-attachments/assets/da84fc8c-399d-4114-99fe-2c00b9a527a7" />


## Final Result
- Successfully demonstrated:
- Custom bridge networking
- Inter-container communication
- Docker Swarm initialization
- Overlay networking
- Service creation & scaling (4 replicas)
- Production-style overlay network
- Macvlan advanced networking
- Troubleshooting port conflicts & endpoint issues

## Final Conclusion
- This lab provides hands-on experience with Docker networking from basic to advanced levels. It covers standalone container communication, Swarm orchestration, scalable services, and enterprise-level networking concepts like overlay and macvlan.
