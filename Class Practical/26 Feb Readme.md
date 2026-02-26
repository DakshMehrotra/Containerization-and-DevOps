## Scaling Services using Docker Compose
## Objective
- To deploy a multi-container WordPress application using Docker Compose and scale the WordPress service using the --scale option.
## System Details
- Docker Version: 29.1.3
- OS/Arch: darwin/arm64
- Docker Desktop: Running

## Steps 
### Step 1: docker-compose.yml Configuration
docker-compose.yml
version: '3.8'

services:

  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppass
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - wordpress-network

  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppass
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp_content:/var/www/html/wp-content
    depends_on:
      - mysql
    networks:
      - wordpress-network

volumes:
  mysql_data:
  wp_content:

networks:
  wordpress-network:

### Step 2: Running the Services
▶ Start Services Normally
- docker compose up -d
- Containers created:
- mysql
- wordpress

### Step 3: Scaling WordPress Service
▶ Scale WordPress to 3 Instances
- docker compose up -d --scale wordpress=3
## Issue Faced
1. Custom Container Name Problem
Initially, scaling failed because:
- Docker requires each container to have a unique name

## Cause:
- Container_name: wordpress was defined.
- Scaling creates multiple containers.
- Docker cannot assign the same container name to multiple instances.

## Solution:
- Removed container_name from wordpress service.

2. Port Binding Error
## Error received:
- Bind for 0.0.0.0:8080 failed: port is already allocated
## Cause:
- Multiple WordPress containers tried to use port 8080.
- Only one container can bind to a host port.
## Solution:
- Only one instance should expose port 8080.
OR
- Remove port mapping when scaling without load balancer.

### Step 4: Verifying Containers
- docker ps
- Output showed:
- wordpress-1
- wordpress-2
- wordpress-3
- mysql
- Each WordPress container running independently.

### Step 5: Checking Networks
- docker network ls
- Custom network created automatically:
- containercodes26feb_wordpress-network

### Step 6: Checking Volumes
- docker volume ls
- Volumes created:
- mysql_data
- wp_content
- These volumes ensure persistent storage.

### Step 7: Stopping the Services
- docker compose down
This removed:
- All containers
- Network
(Volumes remain unless removed manually)

## Observations
Docker Compose automatically created:
- Network
- Volumes
- Multiple container instances
- Scaling works only when:
- No fixed container_name is defined
- No conflicting port bindings exist
- Each scaled container gets auto-generated names:
projectname-service-1
projectname-service-2
projectname-service-3

## Concepts Learned
- Service scaling using --scale
- Why container_name must not be used while scaling
- Port binding limitations
- Automatic container naming by Docker Compose
- Volume persistence
- Custom bridge networks

## Screenshots
<img width="709" height="315" alt="Screenshot 2026-02-26 at 10 22 14 AM" src="https://github.com/user-attachments/assets/b596bf69-e75d-4add-9343-1a6760197b68" />
<img width="1440" height="900" alt="Screenshot 2026-02-26 at 10 22 27 AM" src="https://github.com/user-attachments/assets/8dd9188a-7d43-40de-87e6-2cc9163d1bce" />
<img width="1440" height="253" alt="Screenshot 2026-02-26 at 10 24 46 AM" src="https://github.com/user-attachments/assets/696dd4a9-e58d-4cfe-88ac-9c1f0ed19c6d" />
<img width="1440" height="308" alt="Screenshot 2026-02-26 at 10 25 01 AM" src="https://github.com/user-attachments/assets/70a11638-0f85-4d7d-b911-014bd7becabb" />
<img width="1437" height="498" alt="Screenshot 2026-02-26 at 10 56 12 AM" src="https://github.com/user-attachments/assets/7b6ea7b6-1578-41f0-9e83-1a632795f68a" />
<img width="1440" height="133" alt="Screenshot 2026-02-26 at 10 56 22 AM" src="https://github.com/user-attachments/assets/807513c8-6189-46da-8177-ff8add51326b" />
<img width="1440" height="900" alt="Screenshot 2026-02-26 at 1 34 25 PM" src="https://github.com/user-attachments/assets/41de07eb-a89b-4162-9311-5eb05aa020cb" />
<img width="1440" height="900" alt="Screenshot 2026-02-26 at 1 34 29 PM" src="https://github.com/user-attachments/assets/aa01f961-f1ca-4183-9790-319334623c4d" />
<img width="1440" height="900" alt="Screenshot 2026-02-26 at 1 34 32 PM" src="https://github.com/user-attachments/assets/444e30e9-972b-4ae3-bbd5-f24847b38639" />


## Result
- The WordPress service was successfully scaled to 3 instances using:
- docker compose up -d --scale wordpress=3
- Multiple WordPress containers were created and connected to a single MySQL database via a custom bridge network.

## Conclusion
- This experiment demonstrated how Docker Compose can scale services easily using the --scale flag.
- It also highlighted important practical constraints:
- Each container must have a unique name.
- Only one container can bind to a specific host port.
- Scaling backend services usually requires a load balancer.
- Docker Compose simplifies multi-container orchestration and service replication, making it useful for real-world distributed application deployment.
