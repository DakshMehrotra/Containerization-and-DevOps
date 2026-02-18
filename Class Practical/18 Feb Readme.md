## Docker Networking Practical – Bridge, Custom Network & Host Mode

## Objective
#### This project demonstrates:
- Inspecting default Docker network
- Creating a custom bridge network
- Running containers inside custom network
- Container-to-container communication
- Inspecting container networking details
- Using host network mode
- Verifying port usage on macOS

## Stepwise Solution :
### Step 1 : Verify Docker Installation
- open -a docker
- docker info
#### This confirms:
- Docker Engine version
- Storage driver
- Default bridge network
- System architecture (arm64)
- Memory & CPU allocation

### Step 2 : List Available Networks
- docker network ls

Default networks:
| Network | Driver | Scope |
| ------- | ------ | ----- |
| bridge  | bridge | local |
| host    | host   | local |
| none    | null   | local |

### Step 3 : Inspect Default Bridge Network
- docker network inspect bridge

#### Key observations:
- Subnet: 172.17.0.0/16
- Gateway: 172.17.0.1
- Driver: bridge
- IPv6: Disabled
This is Docker’s default network for containers.

### Step 4 : Create Custom Bridge Network
- docker network create my_bridge

Verify:
- docker network inspect my_bridge
#### Key configuration:
- Subnet: 172.18.0.0/16
- Gateway: 172.18.0.1
- Driver: bridge
This network allows isolated container communication.

### Step 5 : Run Containers in Custom Network
Run Nginx Container
- docker run -dit --name container1 --network my_bridge nginx

Run BusyBox Container
- docker run -dit --name container2 --network my_bridge busybox

### Step 6 : Test Container-to-Container Communication
From container2:
- docker exec -it container2 ping container1

Result:
- Ping successful
- container1 resolved via internal DNS
- IP example: 172.18.0.2

This proves:
- Docker provides internal DNS
- Containers communicate using names (not IP)

### Step 7 : Inspect Container Network Details
- docker inspect container1
- docker inspect container2

Important fields:
- "NetworkMode": "my_bridge",
- "IPAddress": "172.18.0.x",
- "Gateway": "172.18.0.1"

This confirms:
- Containers are attached to custom bridge
- Each container has unique internal IP

### Step 8 : Run Container in Host Network Mode
- docker run -d --network host nginx
In host mode:
- Container shares host network stack
- No separate IP
No port mapping required
⚠️ On macOS, host networking behaves differently because Docker runs inside a VM.

### Step 9 : Check Port Usage (macOS)
- ss command is not available on macOS.
- Instead use: lsof -i :80

This checks which process is using port 80.

## Key Concepts Demonstrated
### Default Bridge Network
- Automatically created
- Containers get IP from 172.17.0.0/16
  
### Custom Bridge Network
- User-defined
- Better isolation
- Automatic DNS resolution
- Recommended for production setups
  
### Host Network
- Shares host network stack
- No isolation
- No port mapping
- Mostly useful on Linux
  
## Outcomes
- How Docker networking works internally
- Difference between default bridge and custom bridge
- How Docker assigns IP addresses
- How containers resolve names via embedded DNS
- How to inspect networks and containers
- How host networking behaves on macOS

## Cleanup Commands
- docker stop container1 container2
- docker rm container1 container2
- docker network rm my_bridge

## Screenshots 
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 26 26 AM" src="https://github.com/user-attachments/assets/67c98f43-a84b-47f8-a7a5-59f4dd613ed5" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 26 31 AM" src="https://github.com/user-attachments/assets/91bda363-1940-4010-a0b0-0e5225088f0c" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 26 38 AM" src="https://github.com/user-attachments/assets/db59bcd5-2473-4073-8d14-4a53b544556c" />
<img width="1440" height="711" alt="Screenshot 2026-02-18 at 11 28 02 AM" src="https://github.com/user-attachments/assets/d41db233-ccff-4f03-b9fe-f645a9d4110e" />
<img width="1440" height="697" alt="Screenshot 2026-02-18 at 11 28 08 AM" src="https://github.com/user-attachments/assets/a6c7832c-8dad-449d-aa6a-dba9164850fb" />
<img width="1440" height="167" alt="Screenshot 2026-02-18 at 11 30 37 AM" src="https://github.com/user-attachments/assets/267f3a1a-ce83-4cd1-a18b-e5d0e6eb7645" />
<img width="1440" height="619" alt="Screenshot 2026-02-18 at 11 32 01 AM" src="https://github.com/user-attachments/assets/4049f0c6-4e29-413b-9a76-301d8a23c612" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 32 17 AM" src="https://github.com/user-attachments/assets/80b6fd41-d530-42ec-b882-71417ceb5195" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 42 21 AM" src="https://github.com/user-attachments/assets/db9b14bf-b1c3-4f77-86e4-1303cbff98cd" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 42 35 AM" src="https://github.com/user-attachments/assets/391a2721-10f8-4f64-b665-939875e32452" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 42 41 AM" src="https://github.com/user-attachments/assets/7877790e-0dbf-4239-8994-aa5cdcd298aa" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 42 45 AM" src="https://github.com/user-attachments/assets/f504734a-058d-4c01-a499-1ec8b960174d" />
<img width="1440" height="654" alt="Screenshot 2026-02-18 at 11 44 14 AM" src="https://github.com/user-attachments/assets/608fda80-6634-433e-a903-715156379461" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 44 34 AM" src="https://github.com/user-attachments/assets/f0aa6502-ec2a-4c76-a23b-8d6e30a094a0" />
<img width="1440" height="900" alt="Screenshot 2026-02-18 at 11 44 40 AM" src="https://github.com/user-attachments/assets/dd3e2c98-12bc-46f3-b550-1d0f2ed68f6c" />
<img width="1440" height="44" alt="Screenshot 2026-02-18 at 11 50 27 AM" src="https://github.com/user-attachments/assets/28420ef0-b97f-45cb-94a1-0681655b29c8" />
<img width="1440" height="201" alt="Screenshot 2026-02-18 at 11 51 16 AM" src="https://github.com/user-attachments/assets/ea2692eb-6fdb-465c-8a8d-ad9584a66523" />

## Conclusion
This practical demonstrates core Docker networking concepts including:
- Bridge networking
- Custom network isolation
- Container DNS resolution
- Host network mode
- Network inspection & debugging

This forms the foundation for:
- Multi-container applications
- Microservices communication
- Docker Compose networking
- Kubernetes networking basics
