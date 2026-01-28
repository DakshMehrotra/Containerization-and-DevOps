#  Experiment 1: VM vs Containers using Ubuntu & Nginx

##  Objective
The objective of this experiment is to understand, implement, and compare:
- Virtual Machines using VirtualBox and Vagrant
- Containers using Docker
by deploying an Nginx web server in both environments and observing resource utilization.

---

##  System Requirements
### Hardware
- 64-bit system with virtualization enabled
- Minimum 4 GB RAM (8 GB recommended)
- Internet connection

### Software
- Windows OS
- Oracle VirtualBox
- Vagrant
- Ubuntu (Vagrant box)
- Docker Engine

---

##  Part A: Virtual Machine Setup using Vagrant

###  Step 1: Verify Vagrant Installation
```
vagrant --version
```

###  Step 2: Create Project Directory
```
mkdir vm-lab
cd vm-lab
```

###  Step 3: Initialize Vagrant with Ubuntu Box
```
vagrant init ubuntu/jammy64
```

###  Step 4: Start the Virtual Machine
```
vagrant up
```

###  Step 5: Access the VM via SSH
```
vagrant ssh
```

---

##  Install Nginx inside VM
```
sudo apt update
sudo apt install -y nginx
sudo systemctl start nginx
```

###  Verify Nginx
```
curl localhost
```

---

##  Resource Observation (VM)
```
free -h
htop
systemd-analyze
```

---

##  Part B: Container Setup using Docker (inside VM)

###  Step 1: Install Docker
```
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker vagrant
```

Re-login to apply permissions:
```
exit
vagrant ssh
```

###  Verify Docker
```
docker --version
```

---

##  Run Nginx Container
```
docker run -d -p 8080:80 --name nginx-container nginx
```

###  Verify Nginx Container
```
curl localhost:8080
```

---

##  Resource Observation (Container)
```
docker stats
free -h
```

---

##  Cleanup Commands
```
docker stop nginx-container
docker rm nginx-container
exit
vagrant halt


##  Comparison Summary

| Parameter | Virtual Machine | Container |
|---------|----------------|-----------|
| Boot Time | High | Very Low |
| RAM Usage | High | Low |
| CPU Overhead | Higher | Minimal |
| Disk Usage | Larger | Smaller |
| Isolation | Strong | Moderate |


```

## Screenshots
<img width="533" height="395" alt="Screenshot 2026-01-27 at 11 54 13 PM" src="https://github.com/user-attachments/assets/7a8fecf5-adf0-40b3-978a-b33a857ae03a" />

<img width="518" height="383" alt="Screenshot 2026-01-27 at 11 54 00 PM" src="https://github.com/user-attachments/assets/bf020e71-4cd8-4f74-a24e-f13976fe8905" />

<img width="535" height="395" alt="Screenshot 2026-01-27 at 11 53 50 PM" src="https://github.com/user-attachments/assets/123f8d01-812a-4024-bd10-951f7b3177ec" />

<img width="528" height="395" alt="Screenshot 2026-01-27 at 11 53 36 PM" src="https://github.com/user-attachments/assets/399438b5-256f-425c-b329-e6e239ee7708" />

<img width="463" height="260" alt="Screenshot 2026-01-27 at 11 53 18 PM" src="https://github.com/user-attachments/assets/4b24dc32-ec6b-4e16-a677-4a7d37942102" />

<img width="532" height="347" alt="Screenshot 2026-01-27 at 11 53 07 PM" src="https://github.com/user-attachments/assets/74fa49ae-89f1-4c73-8e14-aff8a549418c" />

<img width="541" height="435" alt="Screenshot 2026-01-27 at 11 55 28 PM" src="https://github.com/user-attachments/assets/ddac019b-a561-485d-9448-73aab8d5b907" />

<img width="552" height="484" alt="Screenshot 2026-01-27 at 11 55 20 PM" src="https://github.com/user-attachments/assets/fb31ca76-ca08-489b-93af-2755cf3e2ca7" />

<img width="462" height="463" alt="Screenshot 2026-01-27 at 11 55 11 PM" src="https://github.com/user-attachments/assets/18edd5a4-c9ea-4015-89e0-c32478295afb" />

<img width="543" height="410" alt="Screenshot 2026-01-27 at 11 54 58 PM" src="https://github.com/user-attachments/assets/0cac7bfb-7b5d-4bb6-b55e-a6299a2cf090" />

<img width="538" height="377" alt="Screenshot 2026-01-27 at 11 54 42 PM" src="https://github.com/user-attachments/assets/574dee0e-487f-4539-8c7f-18b49bb2d71b" />

<img width="534" height="386" alt="Screenshot 2026-01-27 at 11 54 34 PM" src="https://github.com/user-attachments/assets/79c70720-d02d-4864-8faf-2eb5b6b36bb4" />

<img width="537" height="385" alt="Screenshot 2026-01-27 at 11 54 25 PM" src="https://github.com/user-attachments/assets/292c98d4-aeb0-49f5-b691-bb8612d743ba" />

<img width="834" height="701" alt="Screenshot 2026-01-27 at 11 56 08 PM" src="https://github.com/user-attachments/assets/94f69beb-715c-40ca-9e8e-d734635e1faf" />

<img width="543" height="488" alt="Screenshot 2026-01-27 at 11 56 01 PM" src="https://github.com/user-attachments/assets/d78c4624-4423-4585-b4d2-6adf010c598a" />

<img width="538" height="541" alt="Screenshot 2026-01-27 at 11 55 53 PM" src="https://github.com/user-attachments/assets/e6e2b8a4-fd5b-46aa-a030-6b9d873a6038" />

<img width="541" height="441" alt="Screenshot 2026-01-27 at 11 55 45 PM" src="https://github.com/user-attachments/assets/79478043-66a8-4740-82b8-c6b3a94f8f9a" />

<img width="532" height="439" alt="Screenshot 2026-01-27 at 11 55 37 PM" src="https://github.com/user-attachments/assets/bf333d81-dd76-4b0c-b764-6c0f763f31ac" />

---

## Results
This experiment demonstrates that containers are significantly more lightweight and resource-efficient compared to virtual machines. While virtual machines provide stronger isolation and a complete OS-level abstraction, containers are faster, more scalable, and better suited for modern DevOps workflows.

---

## Conclusion
Virtual Machines and Containers both have their place in modern infrastructure. However, containers are preferred in cloud-native and DevOps environments due to their speed, efficiency, and portability.
