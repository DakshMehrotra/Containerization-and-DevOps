#  Experiment 9 – Ansible Automation with Docker

> **Course**: DevOps / Cloud Computing Lab  
> **Objective**: Learn Ansible for automated server configuration management using Docker containers as managed nodes on macOS (Apple M1)

---

##  Table of Contents

- [Theory](#-theory)
- [Architecture Overview](#-architecture-overview)
- [Prerequisites](#-prerequisites)
- [Part A – Setup & SSH Configuration](#-part-a--setup--ssh-configuration)
- [Part B – Ansible with Docker Servers](#-part-b--ansible-with-docker-servers)
- [Playbooks](#-playbooks)
- [Verification](#-verification)
- [Optional Part C – Local nginx Install](#-optional-part-c--local-nginx-install)
- [Cleanup](#-cleanup)
- [Key Concepts Summary](#-key-concepts-summary)
- [References](#-references)

---

##  Theory

### What is Ansible?

Ansible is an open-source **automation tool** for:
- **Configuration Management** – Ensure servers are in a desired state
- **Application Deployment** – Push code and configs consistently
- **Orchestration** – Coordinate multi-server workflows

It follows an **agentless** architecture using SSH (Linux) or WinRM (Windows), and uses human-readable YAML-based **playbooks** to define tasks.

### How Ansible Works

```
Control Node (your Mac)
        │
        │  SSH (no agent needed)
        ▼
  ┌─────────────────────────────────────┐
  │         Managed Nodes               │
  │  server1  server2  server3  server4 │
  │ (Docker containers / EC2 / VMs)     │
  └─────────────────────────────────────┘
```

### Key Components

| Component | Description |
|:----------|:------------|
| **Control Node** | Machine with Ansible installed (your Mac) |
| **Managed Nodes** | Target servers — no Ansible agent needed |
| **Inventory** | `inventory.ini` — lists all managed nodes |
| **Playbook** | YAML file containing automation steps |
| **Task** | Individual action in a playbook |
| **Module** | Built-in functionality (`apt`, `copy`, `command`, etc.) |
| **Role** | Reusable, pre-defined automation scripts |

### Why Ansible?

| Feature | Benefit |
|:--------|:--------|
| **Agentless** | Uses SSH — no software needed on servers |
| **Idempotent** | Run playbooks multiple times safely |
| **Declarative** | Describe desired state, not the steps |
| **Push-based** | Control node initiates all changes |
| **YAML Syntax** | Human-readable, easy to learn |

---

##  Architecture Overview

```
                     ┌─────────────────────────────────────┐
                     │        Mac M1 (Control Node)         │
                     │                                      │
                     │  Ansible + SSH Private Key           │
                     │  inventory.ini  playbook1.yml        │
                     └───────────────┬─────────────────────┘
                                     │ SSH (port 22)
                    ┌────────────────┼────────────────┐
                    ▼                ▼                 ▼
           ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
           │   server1    │ │   server2    │ │  server3/4   │
           │ ubuntu-server│ │ ubuntu-server│ │ubuntu-server │
           │ Docker cont. │ │ Docker cont. │ │ Docker cont. │
           └──────────────┘ └──────────────┘ └──────────────┘
           172.17.0.x      172.17.0.x        172.17.0.x
```

---

##  Prerequisites

- macOS (Apple M1 / M2)
- Docker Desktop installed and running
- Terminal (zsh/bash)

---

##  Part A – Setup & SSH Configuration

### Step 1: Install Ansible

```bash
# Install via Homebrew (recommended for Mac M1)
brew install ansible

# Verify installation
ansible --version
```

**Expected output:**
```
ansible [core 2.x.x]
  ...
  python version = 3.x.x
```


---

### Step 2: Generate SSH Key Pair

```bash
# Generate RSA 4096-bit key pair
ssh-keygen -t rsa -b 4096
# Press Enter for all prompts (use default path, no passphrase)

# Create working directory
mkdir -p ~/ansible-exp9 && cd ~/ansible-exp9

# Copy keys to project directory (needed for Dockerfile)
cp ~/.ssh/id_rsa.pub .
cp ~/.ssh/id_rsa .

# Verify
ls -la
```

**Key placement guide:**

| File | Location | Purpose |
|:-----|:---------|:--------|
| `id_rsa` (Private) | Your Mac (`~/.ssh/id_rsa`) | Used by Ansible/SSH to authenticate |
| `id_rsa.pub` (Public) | Docker container (`~/.ssh/authorized_keys`) | Grants access to matching private key |

---

### Step 3: Create the Dockerfile

```bash
cd ~/ansible-exp9
```

Create `Dockerfile`:

```dockerfile
FROM ubuntu

RUN apt update -y
RUN apt install -y python3 python3-pip openssh-server
RUN mkdir -p /var/run/sshd

# Configure SSH
RUN mkdir -p /run/sshd && \
    echo 'root:password' | chpasswd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config && \
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config

# Setup SSH directory and permissions
RUN mkdir -p /root/.ssh && \
    chmod 700 /root/.ssh

# Copy SSH keys
COPY id_rsa /root/.ssh/id_rsa
COPY id_rsa.pub /root/.ssh/authorized_keys

# Set proper permissions
RUN chmod 600 /root/.ssh/id_rsa && \
    chmod 644 /root/.ssh/authorized_keys

# Fix PAM for SSH login
RUN sed -i 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' /etc/pam.d/sshd

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

---

### Step 4: Build Docker Image

```bash
# Build the custom ubuntu-server image
docker build -t ubuntu-server .

# Verify image was created
docker images | grep ubuntu-server
```

---

### Step 5: Test SSH with Single Container

```bash
# Start a test container
docker run -d --rm -p 2222:22 --name ssh-test-server ubuntu-server

# Get container IP
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ssh-test-server

# Test SSH login with key (no password should be prompted)
ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -p 2222 root@localhost

# Once logged in, verify
whoami
hostname

# Exit and stop
exit
docker stop ssh-test-server
```

---

##  Part B – Ansible with Docker Servers

### Step 6: Launch 4 Server Containers

```bash
for i in {1..4}; do
  echo -e "\nCreating server${i}\n"
  docker run -d --rm -p 220${i}:22 --name server${i} ubuntu-server
  echo -e "IP of server${i} is $(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' server${i})"
done

# Verify all 4 are running
docker ps
```
---

### Step 7: Create Ansible Inventory

```bash
# Auto-generate inventory.ini with container IPs
echo "[servers]" > inventory.ini
for i in {1..4}; do
  docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' server${i} >> inventory.ini
done

# Add Ansible connection variables
cat << EOF >> inventory.ini

[servers:vars]
ansible_user=root
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_python_interpreter=/usr/bin/python3
EOF

# Review the inventory
cat inventory.ini
```

**Expected `inventory.ini`:**
```ini
[servers]
172.17.0.3
172.17.0.4
172.17.0.5
172.17.0.6

[servers:vars]
ansible_user=root
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_python_interpreter=/usr/bin/python3
```

---

### Step 8: Test Ansible Connectivity (Ping All)

```bash
# Disable host key checking (important on Mac!)
export ANSIBLE_HOST_KEY_CHECKING=False

# Ping all servers
ansible all -i inventory.ini -m ping
```

**Expected output:**
```json
172.17.0.3 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
172.17.0.4 | SUCCESS => { ... }
172.17.0.5 | SUCCESS => { ... }
172.17.0.6 | SUCCESS => { ... }
```


For verbose output (useful for debugging):
```bash
ansible all -i inventory.ini -m ping -vvv
```

---

##  Playbooks

### Playbook 1: Update + Install Packages + Create File

Create `update.yml`:

```yaml
---
- name: Update and configure servers
  hosts: all
  become: yes

  tasks:
    - name: Update apt packages
      apt:
        update_cache: yes
        upgrade: dist

    - name: Install required packages
      apt:
        name: ["vim", "htop", "wget"]
        state: present

    - name: Create test file
      copy:
        dest: /root/ansible_test.txt
        content: "Configured by Ansible on {{ inventory_hostname }}"
```

### Playbook 2: Full Configuration with System Info

Create `playbook1.yml`:

```yaml
---
- name: Configure multiple servers
  hosts: servers
  become: yes

  tasks:
    - name: Update apt package index
      apt:
        update_cache: yes

    - name: Install Python 3 (latest)
      apt:
        name: python3
        state: latest

    - name: Create test file with content
      copy:
        dest: /root/test_file.txt
        content: |
          This is a test file created by Ansible
          Server name: {{ inventory_hostname }}
          Current date: {{ ansible_date_time.date }}

    - name: Display system information
      command: uname -a
      register: uname_output

    - name: Show disk space
      command: df -h
      register: disk_space

    - name: Print results
      debug:
        msg:
          - "System info: {{ uname_output.stdout }}"
          - "Disk space: {{ disk_space.stdout_lines }}"
```

---

### Step 9: Run the Playbook

```bash
# Run update.yml
ansible-playbook -i inventory.ini update.yml

# Run playbook1.yml
ansible-playbook -i inventory.ini playbook1.yml
```

**Sample PLAY RECAP:**
```
PLAY RECAP ************************************************************
172.17.0.3    : ok=6  changed=4  unreachable=0  failed=0  skipped=0
172.17.0.4    : ok=6  changed=4  unreachable=0  failed=0  skipped=0
172.17.0.5    : ok=6  changed=4  unreachable=0  failed=0  skipped=0
172.17.0.6    : ok=6  changed=4  unreachable=0  failed=0  skipped=0
```

---

##  Verification

### Step 10: Verify Changes on All Servers

```bash
# Check test file via Ansible
ansible all -i inventory.ini -m command -a "cat /root/test_file.txt"

# Manually verify via Docker exec
for i in {1..4}; do
  echo "--- server${i} ---"
  docker exec server${i} cat /root/test_file.txt
done

# Verify installed packages
ansible all -i inventory.ini -m command -a "which vim htop wget"
```

---

### Bonus: Ad-hoc Ansible Commands

```bash
# Check uptime on all servers
ansible all -i inventory.ini -m command -a "uptime"

# Check OS info
ansible all -i inventory.ini -m command -a "uname -a"

# List available modules
ansible-doc -l | head -20

# View specific module docs
ansible-doc apt
ansible-doc copy

# Search for AWS modules
ansible-doc -l | grep aws
```

---

##  Optional Part C – Local nginx Install

### Create local inventory and playbook

```bash
# Create local inventory
cat << EOF > local_inventory.ini
[local]
localhost ansible_connection=local
EOF

# Create nginx playbook
cat << EOF > install_nginx.yml
---
- name: Install Nginx on localhost
  hosts: local
  become: yes
  tasks:
    - name: Install nginx package
      apt:
        name: nginx
        state: present
EOF

# Run it (on Linux/WSL; skip on Mac as apt is not native)
ansible-playbook -i local_inventory.ini install_nginx.yml
```

---

### Using Ansible Vault (for secrets)

```bash
# Create an encrypted secrets file
ansible-vault create secrets.yml

# View encrypted file
ansible-vault view secrets.yml

# Use with playbook
ansible-playbook -i inventory.ini playbook1.yml --ask-vault-pass
```

---

### Install Ansible Collections

```bash
# Install a collection from Ansible Galaxy
ansible-galaxy collection install community.general

# List installed collections
ansible-galaxy collection list
```

---

##  Cleanup

```bash
# Stop and remove all server containers
for i in {1..4}; do
  docker stop server${i}
done

# Remove project keys (optional)
rm ~/ansible-exp9/id_rsa ~/ansible-exp9/id_rsa.pub

# Remove docker image (optional)
docker rmi ubuntu-server
```

---

##  Mac M1 – Common Issues & Fixes

| Issue | Cause | Fix |
|:------|:------|:----|
| SSH fingerprint prompt blocks Ansible | First-time SSH | `export ANSIBLE_HOST_KEY_CHECKING=False` |
| Docker pull fails (platform mismatch) | ARM64 vs AMD64 | Add `--platform linux/amd64` to `docker build` |
| `pip install ansible` fails | System Python conflict | Use `brew install ansible` instead |
| Permission denied on `id_rsa` | Wrong file permissions | `chmod 600 ~/.ssh/id_rsa` |
| Ansible can't find Python on nodes | Wrong interpreter path | Set `ansible_python_interpreter=/usr/bin/python3` in inventory |

---

##  Key Concepts Summary

### Ansible Workflow

```
1. SSH Keys → 2. Build Image → 3. Launch Containers
      ↓
4. Create Inventory → 5. Test Ping → 6. Write Playbook
      ↓
7. Run Playbook → 8. Verify → 9. Cleanup
```

### Idempotency Demo

Running the same playbook twice:
- First run: `changed=4` (packages installed, file created)
- Second run: `changed=0` (already in desired state — no changes made)

This is idempotency: **safe to run multiple times**.

---

##  References

- [Official Ansible Website](https://www.ansible.com)
- [Ansible Documentation](https://docs.ansible.com)
- [Ansible Tutorial – Spacelift](https://spacelift.io/blog/ansible-tutorial)
- [Ansible Tower (GUI)](https://ansible.github.io/lightbulb/decks/intro-to-ansible-tower.html)
- [Ansible Tower Tutorial – GeeksforGeeks](https://www.geeksforgeeks.org/devops/ansible-tower/)

---

##  Screenshots Checklist

- `ansible --version`
-  SSH key generation output
- `cat Dockerfile`
- `docker build` success output
-  SSH login into test container
-  4 containers running (`docker ps`)
-  `cat inventory.ini`
-  Ansible ping — all 4 servers SUCCESS
- `cat playbook1.yml`
-  Playbook run output (PLAY RECAP)
-  Verification — `cat /root/test_file.txt` on all servers
-  Ad-hoc command output
-  Containers stopped (cleanup)

<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 27 50 AM" src="https://github.com/user-attachments/assets/dfb15e1a-55e5-4fa6-97f0-67c0c2787bc4" />
<img width="1440" height="170" alt="Screenshot 2026-04-11 at 9 15 07 AM" src="https://github.com/user-attachments/assets/e1713afe-9476-4d1e-9b95-8be79a6623fd" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 32 20 AM" src="https://github.com/user-attachments/assets/e355e23d-487e-454a-b5e3-132f1b3842be" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 32 26 AM" src="https://github.com/user-attachments/assets/2c47e8ea-06b6-4c7d-bb17-4174fab60c24" />
<img width="1440" height="414" alt="Screenshot 2026-04-11 at 8 33 11 AM" src="https://github.com/user-attachments/assets/1f919f84-ae56-48b9-976b-3169e0484c3a" />
<img width="1440" height="805" alt="Screenshot 2026-04-11 at 8 36 09 AM" src="https://github.com/user-attachments/assets/d67a47a4-e666-4121-9109-b811689a7390" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 36 34 AM" src="https://github.com/user-attachments/assets/c86e8d70-6b0f-4429-ae46-a538b6d4b1f7" />
<img width="1440" height="830" alt="Screenshot 2026-04-11 at 8 37 33 AM" src="https://github.com/user-attachments/assets/6efc0e0b-c921-4b2c-a877-4cb17ae60439" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 39 58 AM" src="https://github.com/user-attachments/assets/e7d7f60a-59b9-4353-b687-b7eb6e390c36" />
<img width="1434" height="450" alt="Screenshot 2026-04-11 at 8 40 42 AM" src="https://github.com/user-attachments/assets/30134ad3-16e7-4696-b736-364b1a0bb1dc" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 41 11 AM" src="https://github.com/user-attachments/assets/182d5bd6-9c23-4ec3-8d87-dcd9b9231a63" />
<img width="1440" height="365" alt="Screenshot 2026-04-11 at 8 41 48 AM" src="https://github.com/user-attachments/assets/c9f79f33-c72d-4cbe-b6db-c03a94ea791a" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 44 21 AM" src="https://github.com/user-attachments/assets/4479ab61-4fae-48ae-a41a-5ec1095c085c" />
<img width="1440" height="304" alt="Screenshot 2026-04-11 at 8 44 39 AM" src="https://github.com/user-attachments/assets/e7840e66-0b81-4f06-87c0-e9d20de44c17" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 45 30 AM" src="https://github.com/user-attachments/assets/a3e8b7c5-05aa-45ce-bfaa-b618faff8e8e" />
<img width="1440" height="190" alt="Screenshot 2026-04-11 at 8 46 48 AM" src="https://github.com/user-attachments/assets/69f9f5b1-4bf4-4e26-a8d9-a5ffdd9d9b3b" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 47 26 AM" src="https://github.com/user-attachments/assets/38d37a4a-4de3-4fa1-8e5b-1326428d40fe" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 47 31 AM" src="https://github.com/user-attachments/assets/bf8af1b6-deb6-418d-81a3-79c4e7a3f882" />
<img width="1440" height="573" alt="Screenshot 2026-04-11 at 8 48 45 AM" src="https://github.com/user-attachments/assets/710ff224-9473-4fd2-b616-091807d2fed6" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 49 37 AM" src="https://github.com/user-attachments/assets/e7080aa8-24aa-46a8-9476-7449524026eb" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 49 43 AM" src="https://github.com/user-attachments/assets/0c8866e4-eb72-44a1-90d3-d687a3a821c5" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 49 46 AM" src="https://github.com/user-attachments/assets/f7319687-fe18-4982-aba3-8c533762f5c2" />
<img width="1440" height="900" alt="Screenshot 2026-04-11 at 8 51 32 AM" src="https://github.com/user-attachments/assets/14aa7b11-3c70-4a36-ac70-0b5af2ec8f5c" />
<img width="1440" height="121" alt="Screenshot 2026-04-11 at 8 51 52 AM" src="https://github.com/user-attachments/assets/d8d8e8a5-f486-4112-be83-5a3136bc1202" />


---

## Result
The experiment was successfully completed. Using Ansible as a configuration management and automation tool, a control node (Mac M1) was configured to manage 4 Docker containers acting as remote servers. SSH key-based authentication was established between the control node and all managed nodes. An Ansible inventory file was created listing all target servers, and connectivity was verified using the ansible ping module — all 4 servers returned SUCCESS. Two YAML-based playbooks were written and executed, which automatically updated apt packages, installed software packages (vim, htop, wget), created configuration files with dynamic content using Ansible variables, and collected system information across all servers simultaneously — without logging into any server manually.

---

## Learning Outcomes
After completing this experiment, students are able to:
- Understand the architecture of Ansible — including the roles of the control node, managed nodes, inventory, modules, tasks, and playbooks, and how they work together in an agentless, SSH-based automation model.
- Set up SSH key-based authentication between a control machine and multiple remote servers, and understand why this is essential for automated, passwordless server management.
- Write and interpret Ansible inventory files (inventory.ini) to define and group managed nodes with connection variables.
- Write YAML-based Ansible playbooks to automate real-world tasks such as package installation, file creation, and system information gathering across multiple servers.
- Use Ansible modules such as apt, copy, command, and debug to perform common system administration tasks declaratively.
- Demonstrate idempotency — understanding that running the same playbook multiple times produces the same result without unintended side effects, which is a critical property for reliable infrastructure automation.
- Execute ad-hoc Ansible commands for quick, one-off tasks without writing a full playbook.
- Use Docker containers as simulated servers to practice multi-node infrastructure management in a local environment without requiring real cloud VMs.
- Recognize the practical value of Infrastructure as Code (IaC) — how version-controlled, declarative configuration files eliminate configuration drift and enable consistent, repeatable deployments at scale.

---
*Experiment 9 | Ansible Automation | DevOps Lab*
