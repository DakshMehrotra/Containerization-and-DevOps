# Docker Code – Git & GitHub SSH Setup

**Date:** April 7, 2026  
**GitHub:** [DakshMehrotra](https://github.com/DakshMehrotra)  
**Repository:** `Docker-code-7-apr-` (Private)

---

## Overview

This project documents the end-to-end process of setting up Git version control and GitHub SSH authentication on a Mac, creating a local repository, working with branches, and pushing code to a remote GitHub repository.

---

## What Was Done

### 1. Git Configuration
Configured global Git identity used for all commits:

```bash
git config --global user.name "Daksh Mehrotra"
git config --global user.email "mehrotradaksh2005@gmail.com"
```

### 2. SSH Key Generation
Generated a new ED25519 SSH key pair for GitHub authentication:

```bash
ssh-keygen -t ed25519 -C "mehrotradaksh2005@gmail.com"
```

Key saved at: `~/.ssh/id_ed25519`

### 3. SSH Agent Setup
Started the SSH agent and added the private key:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 4. Adding SSH Key to GitHub
Copied the public key and added it to GitHub under **Settings → SSH and GPG Keys**:

```bash
cat ~/.ssh/id_ed25519.pub
```

Key name on GitHub: `mehrotradaksh2005@gmail.com`  
Type: Authentication Key (Read/Write)

### 5. Verified SSH Connection
Tested the SSH connection to GitHub:

```bash
ssh -T git@github.com
# Output: Hi DakshMehrotra! You've successfully authenticated...
```

### 6. Local Repository Initialization
Initialized a local Git repository and made the first commit:

```bash
git init
echo "# demo001" >> README.md
git add README.md
git commit -m "first commit"
git branch -M main
```

### 7. Feature Branch Workflow
Created and worked on a feature branch:

```bash
git checkout -b feature-branch
git add .
git commit -m "Initial commit for experiment 3"
```

Files committed:
- `Docker code`
- `Docker code.pub`

### 8. Remote Repository
Connected to the remote GitHub repository:

```bash
git remote add origin git@github.com:DakshMehrotra/Docker-code-7-apr-.git
git push -u origin main
```

---

## Repository Structure

```
Docker code/
├── README.md          # Project documentation
├── Docker code        # SSH private key (for learning purposes)
└── Docker code.pub    # SSH public key (for learning purposes)
```

---

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Primary branch with initial README |
| `feature-branch` | Adds authentication features |

---

## Issues Encountered & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| `Permission denied (publickey)` | SSH key not added to GitHub | Added public key via GitHub Settings |
| `ERROR: Repository not found` | Wrong remote URL (used placeholder) | Updated remote URL to correct repo |
| `No such file or directory` on `id_rsa` | No RSA key existed | Generated ED25519 key instead |
| Passphrase mismatch during keygen | Typo on second entry | Re-entered matching passphrases |

---

## Key Commands Reference

```bash
# Check git config
git config --list

# Check SSH connection
ssh -T git@github.com

# View public key
cat ~/.ssh/id_ed25519.pub

# Check repo status
git status

# Stage and commit
git add .
git commit -m "your message"

# Push to remote
git push origin <branch-name>
```

---
## Screenshot
<img width="1440" height="410" alt="Screenshot 2026-04-07 at 3 42 46 PM" src="https://github.com/user-attachments/assets/c14f8948-3928-42af-9ebd-af4631e25957" />
<img width="1440" height="510" alt="Screenshot 2026-04-07 at 3 44 24 PM" src="https://github.com/user-attachments/assets/65271451-459f-4c7e-9028-dde1fe141bdb" />
<img width="1440" height="355" alt="Screenshot 2026-04-07 at 3 48 05 PM" src="https://github.com/user-attachments/assets/2c62d788-0d7d-4413-8909-109b1e6c5bfd" />
<img width="1440" height="177" alt="Screenshot 2026-04-07 at 3 48 45 PM" src="https://github.com/user-attachments/assets/3ccdd0d8-fd8a-4259-8cd8-b156dc31155f" />
<img width="1438" height="789" alt="Screenshot 2026-04-07 at 3 50 31 PM" src="https://github.com/user-attachments/assets/1378958b-5eaf-4c6c-a1b1-914602c05fa5" />
<img width="1440" height="58" alt="Screenshot 2026-04-07 at 3 50 50 PM" src="https://github.com/user-attachments/assets/dddb3e73-6afe-4870-958a-d9a96c95d704" />
<img width="1440" height="528" alt="Screenshot 2026-04-07 at 3 51 33 PM" src="https://github.com/user-attachments/assets/67e3fb11-5649-4982-b08f-6ceccf66c364" />
<img width="1439" height="356" alt="Screenshot 2026-04-07 at 3 54 20 PM" src="https://github.com/user-attachments/assets/05d94739-7321-46ee-8b02-895545c5775c" />
<img width="1440" height="807" alt="Screenshot 2026-04-07 at 3 55 19 PM" src="https://github.com/user-attachments/assets/8243a353-54c6-45f4-bbef-266ccdd15d1c" />

---

## Notes

- The repository is set to **Private** on GitHub.
- SSH authentication was used instead of HTTPS for secure, password-free pushes.
- The `feature-branch` contains authentication feature work (Experiment 3).
