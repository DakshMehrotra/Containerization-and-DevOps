# Git Practical 

**Repository:** `Docker-code-7-apr`  
**Platform:** macOS (zsh) | Git + GitHub

---

## What We Covered

This practical session walked through core Git workflows: cloning a remote repo, making commits, working with branches, and understanding how Git tracks changes.

---

## 1. Setup & Cloning

```bash
open -a docker                    # Open Docker (environment setup)
git clone https://github.com/DakshMehrotra/Docker-code-7-apr-.git
cd Docker-code-7-apr-
git branch -a                     # View all branches (local + remote)
```

---

## 2. Basic Commits

```bash
# Create a file and commit it
echo test2 > test2.txt
git add . && git commit -m "test2"

# View commit history
git log --oneline
git log --oneline --graph
```

> **Note:** Running `git add .` and `git commit` as a background job (`[1] 6030`) with `&` can cause a `.git/index.lock` error if both run simultaneously. Run them as separate commands or use `&&` (sequential) safely.

---

## 3. Renaming Branches

```bash
# Rename current branch from 'main' to 'master'
git branch -M master

# Create a new branch called 'main' (without switching)
git branch main

# Switch between branches
git switch main       # modern syntax
git checkout main     # classic syntax
git checkout master
```

---

## 4. Modifying Files & Staging

```bash
# Overwrite file content
echo test3secondline > test3.txt

# Check the diff before staging
git diff

# Stage and commit
git add test3.txt
git commit -m "test3 modified"
```

**Understanding `git status` output:**
- `Changes to be committed` — file is staged (green)
- `Changes not staged for commit` — file is modified but not staged (red)

---

## 5. Branching & Feature Work

```bash
# Create a feature branch
git branch featureA

# Switch to it
git checkout featureA

# Do work and commit
echo "dummy feature " > feature.txt
git add .
git commit -m "feature added"

# Verify with log
git log --oneline --graph
```

**Key observation:** After creating `featureA` from `master`, both branches pointed to the same commit (`b0923ba`). After committing on `featureA`, the branch diverged.

---

## 6. Merging

```bash
# While on featureA, attempt to merge featureA into itself
git merge featureA
# Output: Already up to date.
```

To merge `featureA` back into `master`:
```bash
git checkout master
git merge featureA
```

---

## 7. Branch Summary

By the end of the session, the repo had three branches:

| Branch   | Description                          |
|----------|--------------------------------------|
| `master` | Main working branch (renamed from `main`) |
| `main`   | Secondary branch created for practice |
| `featureA` | Feature branch with `feature.txt` commit |

---
## Screenshots
<img width="1440" height="497" alt="Screenshot 2026-04-09 at 10 23 33 AM" src="https://github.com/user-attachments/assets/4626662e-16a5-4a3e-892f-71e44196efca" />
<img width="1440" height="612" alt="Screenshot 2026-04-09 at 10 25 11 AM" src="https://github.com/user-attachments/assets/cb22521e-5672-49fd-a83c-ae8f4b93f759" />
<img width="1440" height="224" alt="Screenshot 2026-04-09 at 10 26 15 AM" src="https://github.com/user-attachments/assets/d074dac5-cf99-4c2b-8167-83f745d5b2e4" />
<img width="1427" height="242" alt="Screenshot 2026-04-09 at 10 28 17 AM" src="https://github.com/user-attachments/assets/9c239534-9638-447f-b197-ac06e5f29410" />
<img width="1440" height="380" alt="Screenshot 2026-04-09 at 10 31 02 AM" src="https://github.com/user-attachments/assets/c252be2d-a7e8-4f44-b0ec-4799db7ea04c" />
<img width="1440" height="275" alt="Screenshot 2026-04-09 at 10 32 41 AM" src="https://github.com/user-attachments/assets/16fdeb45-03f0-48fa-8444-b7d107f9fef6" />
<img width="1440" height="291" alt="Screenshot 2026-04-09 at 10 34 32 AM" src="https://github.com/user-attachments/assets/056b250a-44a8-429c-821b-a53ca3cce74d" />
<img width="1440" height="139" alt="Screenshot 2026-04-09 at 10 43 54 AM" src="https://github.com/user-attachments/assets/de30c1fc-a719-4253-bb6a-adbf02e4a734" />
<img width="1440" height="538" alt="Screenshot 2026-04-09 at 10 48 57 AM" src="https://github.com/user-attachments/assets/7df0b3bb-c65c-46cd-aaa4-1d9503413fad" />
<img width="1440" height="531" alt="Screenshot 2026-04-09 at 10 51 13 AM" src="https://github.com/user-attachments/assets/4740cc42-41f5-4863-8d7a-f0738626d813" />
<img width="1440" height="763" alt="Screenshot 2026-04-09 at 10 56 52 AM" src="https://github.com/user-attachments/assets/bf526024-410c-4cf8-83bc-62898a4262e6" />





---

## 8. Common Mistakes & Fixes

| Mistake | Fix |
|--------|-----|
| `got checkout main` | Typo — use `git checkout main` |
| `git brnach` | Typo — use `git branch` |
| `index.lock` error | Delete the lock file: `rm .git/index.lock` |
| `pathspec 'branch-name' did not match` | Branch doesn't exist — create it first with `git branch <name>` or `git checkout -b <name>` |

---

## Quick Reference

```bash
git branch              # List local branches
git branch <name>       # Create a new branch
git checkout <name>     # Switch to a branch
git checkout -b <name>  # Create and switch in one step
git branch -M <name>    # Rename current branch
git branch -D <name>    # Force delete a branch
git log --oneline --graph  # Visual commit history
git diff                # See unstaged changes
git status              # Working tree status
```
