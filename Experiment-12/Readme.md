# Experiment 12 — Container Orchestration using Kubernetes

> **Name:** Daksh Mehrotra  
> **Lab:** Experiment 12  
> **Topic:** Study and Analyse Container Orchestration using Kubernetes  
> **Cluster Tools Used:** k3d (local), kubeadm (multi-VM via Multipass)  
> **Platform:** macOS M1 Pro  

---

## Objective

- Understand why Kubernetes is used over Docker Swarm  
- Learn core Kubernetes concepts (Pod, Deployment, Service, ReplicaSet)  
- Deploy, expose, scale, and self-heal a WordPress application  
- Deploy and manage an Apache web server through its full lifecycle  
- Set up a real multi-node Kubernetes cluster using kubeadm  
- Perform advanced operations: rolling updates, rollbacks, metrics, namespaces, ConfigMaps  

---

## Table of Contents

1. [Why Kubernetes over Docker Swarm](#1-why-kubernetes-over-docker-swarm)
2. [Core Kubernetes Concepts](#2-core-kubernetes-concepts)
3. [Part A — WordPress Deployment (Tasks 1–5)](#3-part-a--wordpress-deployment-tasks-15)
4. [Part B — Apache Web App Practical](#4-part-b--apache-web-app-practical)
5. [Part C — Swarm vs Kubernetes Comparison](#5-part-c--swarm-vs-kubernetes-comparison)
6. [Part D — Real Cluster with kubeadm](#6-part-d--real-cluster-with-kubeadm)
7. [Bonus — Advanced Operations](#7-bonus--advanced-operations)
8. [Commands Cheat Sheet](#8-commands-cheat-sheet)
9. [Key Learnings](#9-key-learnings)
10. [Conclusion](#10-conclusion)

---

## 1. Why Kubernetes over Docker Swarm

| Reason | Explanation |
|--------|-------------|
| Industry standard | Most companies use Kubernetes in production |
| Powerful scheduling | Automatically decides which node runs your app |
| Large ecosystem | Rich tooling — monitoring, logging, CI/CD integrations |
| Cloud-native support | Native support on AWS (EKS), GCP (GKE), Azure (AKS) |
| Auto-scaling | Horizontal Pod Autoscaler scales pods based on load |
| Self-healing | Automatically replaces failed or deleted pods |

---

## 2. Core Kubernetes Concepts

| Docker Concept | Kubernetes Equivalent | What it Means |
|---------------|----------------------|---------------|
| Container | **Pod** | Smallest deployable unit — wraps one or more containers |
| Compose service | **Deployment** | Describes desired state — image, replicas, update strategy |
| Load balancing | **Service** | Stable network endpoint to expose pods internally or externally |
| Scaling | **ReplicaSet** | Ensures N pod copies always run; managed by Deployment |
| Environment config | **ConfigMap** | Stores non-sensitive config key-value pairs |
| Isolation | **Namespace** | Logical cluster partition for environment separation |

---

## 3. Part A — WordPress Deployment (Tasks 1–5)

### Task 1: Create a Deployment

**File: `wordpress-deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
spec:
  replicas: 2
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
      - name: wordpress
        image: wordpress:latest
        ports:
        - containerPort: 80
```

```bash
kubectl apply -f wordpress-deployment.yaml
```

**What happens:** Kubernetes creates 2 pods running WordPress.

---

### Task 2: Expose as a Service

**File: `wordpress-service.yaml`**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-service
spec:
  type: NodePort
  selector:
    app: wordpress
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30007
```

```bash
kubectl apply -f wordpress-service.yaml
```

**Access in browser:**
```bash
kubectl port-forward service/wordpress-service 8080:80
# Open: http://localhost:8080
```

---

### Task 3: Verify Everything

```bash
kubectl get pods
kubectl get svc
kubectl get all
```

**Expected pods output:**
```
NAME                         READY   STATUS    RESTARTS   AGE
wordpress-xxxxx-yyyyy        1/1     Running   0          1m
wordpress-xxxxx-zzzzz        1/1     Running   0          1m
```

**Expected service output:**
```
NAME                TYPE       CLUSTER-IP     PORT(S)        AGE
wordpress-service   NodePort   10.43.x.x      80:30007/TCP   1m
```

---

### Task 4: Scale the Deployment

```bash
kubectl scale deployment wordpress --replicas=4
kubectl get pods
```

You will now see 4 running pods. More replicas = better performance under high traffic.

---

### Task 5: Self-Healing Demonstration

```bash
# Get pod names
kubectl get pods

# Delete one pod
kubectl delete pod <pod-name>

# Immediately check again
kubectl get pods
```

**Result:** The deleted pod is automatically recreated. Kubernetes always maintains the desired replica count.

---

## 4. Part B — Apache Web App Practical

A complete lifecycle demonstration of an Apache (`httpd`) container in Kubernetes.

### Step 1: Create a Pod
```bash
kubectl run apache-pod --image=httpd
kubectl get pods
kubectl describe pod apache-pod
```

### Step 2: Port Forward and Access
```bash
kubectl port-forward pod/apache-pod 8081:80
# Open: http://localhost:8081 → "It works!"
```

### Step 3: Delete Pod and Create Deployment
```bash
kubectl delete pod apache-pod
kubectl create deployment apache --image=httpd
kubectl get deployments
kubectl get pods
```

### Step 4: Expose the Deployment
```bash
kubectl expose deployment apache --port=80 --type=NodePort
kubectl port-forward service/apache 8082:80
# Open: http://localhost:8082
```

### Step 5: Scale
```bash
kubectl scale deployment apache --replicas=2
kubectl get pods
```

### Step 6: Break and Fix (Debug Practice)
```bash
# Break it
kubectl set image deployment/apache httpd=wrongimage
kubectl get pods
# Error: ErrImagePull

# Fix it
kubectl set image deployment/apache httpd=httpd
kubectl get pods
# Back to Running
```

### Step 7: Modify Live Container Content
```bash
kubectl exec -it <pod-name> -- /bin/bash
echo "Hello from Kubernetes" > /usr/local/apache2/htdocs/index.html
exit
# Refresh browser → updated content visible
```

### Step 8: Test Self-Healing
```bash
kubectl delete pod <pod-name>
kubectl get pods
# New pod automatically created
```

### Step 9: Cleanup
```bash
kubectl delete deployment apache
kubectl delete service apache
```

---

## 5. Part C — Swarm vs Kubernetes Comparison

| Feature | Docker Swarm | Kubernetes |
|---------|-------------|------------|
| Setup complexity | Very easy | More complex |
| Scaling | Basic manual scaling | Advanced + auto-scaling |
| Self-healing | Basic | Full, production-grade |
| Ecosystem | Small | Massive (monitoring, logging, CI/CD) |
| Cloud support | Limited | Native on all major clouds |
| Industry adoption | Rare | Standard everywhere |
| Networking | Simple overlay | Advanced (CNI plugins, Calico, Flannel) |
| Config management | Limited | ConfigMaps + Secrets |

**Verdict:** Kubernetes is the industry standard. Learn it.

---

## 6. Part D — Real Cluster with kubeadm

Setting up a production-style multi-node Kubernetes cluster using 3 Ubuntu VMs via Multipass on macOS M1 Pro.

### Lab Environment

| Node | Role | CPU | RAM | Disk |
|------|------|-----|-----|------|
| master | Control Plane | 2 | 2GB | 10GB |
| worker1 | Worker | 2 | 2GB | 10GB |
| worker2 | Worker | 2 | 2GB | 10GB |

### Step 1: Create VMs with Multipass

```bash
multipass launch --name master  --cpus 2 --memory 2G --disk 10G
multipass launch --name worker1 --cpus 2 --memory 2G --disk 10G
multipass launch --name worker2 --cpus 2 --memory 2G --disk 10G
multipass list
```

### Step 2: Install kubeadm on ALL 3 Nodes

Shell into each node and run:
```bash
multipass shell master   # Tab 1
multipass shell worker1  # Tab 2
multipass shell worker2  # Tab 3
```

Run this on all 3:
```bash
sudo swapoff -a
sudo apt-get update -y
sudo apt-get install -y apt-transport-https ca-certificates curl gpg containerd
sudo mkdir -p /etc/apt/keyrings /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
sudo systemctl restart containerd && sudo systemctl enable containerd
sudo modprobe overlay && sudo modprobe br_netfilter
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
sudo sysctl --system
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | \
  sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | \
  sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update -y
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
kubeadm version
```

### Step 3: Initialize Control Plane (MASTER ONLY)

```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16
```

Configure kubectl access:
```bash
mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### Step 4: Install Calico Network Plugin (MASTER ONLY)

```bash
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# Wait 2 minutes then verify
kubectl get pods -n kube-system
```

### Step 5: Join Worker Nodes

Run the join command shown after `kubeadm init` on both worker nodes:
```bash
sudo kubeadm join <MASTER_IP>:6443 --token <TOKEN> \
    --discovery-token-ca-cert-hash sha256:<HASH>
```

### Step 6: Verify Full Cluster (MASTER)

```bash
kubectl get nodes
kubectl get nodes -o wide
kubectl cluster-info
kubectl get all --all-namespaces
```

**Expected output:**
```
NAME      STATUS   ROLES           AGE   VERSION
master    Ready    control-plane   5m    v1.29.x
worker1   Ready    <none>          2m    v1.29.x
worker2   Ready    <none>          2m    v1.29.x
```

---

## 7. Bonus — Advanced Operations

### Rolling Update + Rollback

```bash
# Rolling update to specific version
kubectl set image deployment/wordpress wordpress=wordpress:6.4
kubectl rollout status deployment/wordpress
kubectl rollout history deployment/wordpress

# Simulate bad update
kubectl set image deployment/wordpress wordpress=wordpress:BADTAG
kubectl get pods
# Pods show ErrImagePull

# Rollback to previous good version
kubectl rollout undo deployment/wordpress
kubectl rollout status deployment/wordpress
kubectl get pods
```

**Why it matters:** Zero-downtime updates and instant rollback are core production skills.

---

### Metrics Server (Resource Monitoring)

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

kubectl patch deployment metrics-server -n kube-system \
  --type='json' \
  -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'

# Wait 60 seconds
kubectl top nodes
kubectl top pods
```

---

### ConfigMap (Environment Configuration)

```bash
kubectl create configmap wordpress-config \
  --from-literal=WORDPRESS_DB_HOST=localhost \
  --from-literal=WORDPRESS_DEBUG=true

kubectl get configmap
kubectl describe configmap wordpress-config
```

---

### Namespaces (Environment Isolation)

```bash
kubectl create namespace production

kubectl create deployment apache-prod \
  --image=httpd \
  --namespace=production

kubectl get pods --namespace=production
kubectl get pods --all-namespaces
```

---

### Events and Describe (Deep Diagnostics)

```bash
kubectl describe deployment wordpress
kubectl describe pod <pod-name>
kubectl describe service wordpress-service
kubectl get events --sort-by='.lastTimestamp'
```

---

### Export YAML (Reverse Engineer Configs)

```bash
kubectl get deployment wordpress -o yaml > wordpress-exported.yaml
kubectl get service wordpress-service -o yaml > service-exported.yaml
cat wordpress-exported.yaml
```

---

### Final Cleanup

```bash
kubectl delete deployment wordpress apache-prod
kubectl delete service wordpress-service
kubectl delete namespace production
kubectl get all
```

---

## 8. Commands Cheat Sheet

| Goal | Command |
|------|---------|
| Apply a YAML file | `kubectl apply -f file.yaml` |
| See all pods | `kubectl get pods` |
| See all services | `kubectl get svc` |
| See all resources | `kubectl get all` |
| Scale a deployment | `kubectl scale deployment <name> --replicas=N` |
| Delete a pod | `kubectl delete pod <pod-name>` |
| See all nodes | `kubectl get nodes` |
| Describe a resource | `kubectl describe <type> <name>` |
| Rolling update | `kubectl set image deployment/<name> <container>=<image>` |
| Check rollout status | `kubectl rollout status deployment/<name>` |
| Rollback | `kubectl rollout undo deployment/<name>` |
| View rollout history | `kubectl rollout history deployment/<name>` |
| Create ConfigMap | `kubectl create configmap <name> --from-literal=KEY=VAL` |
| Create namespace | `kubectl create namespace <name>` |
| View pod logs | `kubectl logs <pod-name>` |
| Exec into container | `kubectl exec -it <pod-name> -- /bin/bash` |
| Resource usage | `kubectl top nodes / kubectl top pods` |
| Export as YAML | `kubectl get <type> <name> -o yaml` |
| View events | `kubectl get events --sort-by='.lastTimestamp'` |
| Cluster info | `kubectl cluster-info` |

---
## Screenshots
<img width="1440" height="405" alt="Screenshot 2026-03-25 at 11 20 35 AM" src="https://github.com/user-attachments/assets/638cab7d-efeb-423a-93ab-4585ae534c77" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 21 26 AM" src="https://github.com/user-attachments/assets/10a8c031-81e2-4c5b-bc7e-24b07cab6308" />
<img width="1440" height="84" alt="Screenshot 2026-03-25 at 11 23 00 AM" src="https://github.com/user-attachments/assets/07bee9ac-6466-4eb7-b187-08558f0e9134" />
<img width="1431" height="744" alt="Screenshot 2026-03-25 at 11 23 23 AM" src="https://github.com/user-attachments/assets/06cb797f-bfc2-44d1-8531-cd48629016ca" />
<img width="1440" height="199" alt="Screenshot 2026-03-25 at 11 28 12 AM" src="https://github.com/user-attachments/assets/774ca3d2-bc3c-45a4-9a9b-e7254d13d000" />
<img width="1435" height="83" alt="Screenshot 2026-03-25 at 11 29 22 AM" src="https://github.com/user-attachments/assets/b59a63ac-dd32-45f1-b6ed-f3c6771547ae" />
<img width="1440" height="191" alt="Screenshot 2026-03-25 at 11 29 44 AM" src="https://github.com/user-attachments/assets/1cd51bce-906d-48ba-96e2-ef0f8d110e41" />
<img width="1440" height="264" alt="Screenshot 2026-03-25 at 11 30 49 AM" src="https://github.com/user-attachments/assets/54680771-66b3-4754-a834-48896a00e041" />
<img width="1430" height="783" alt="Screenshot 2026-03-25 at 11 30 57 AM" src="https://github.com/user-attachments/assets/667c9664-c563-4f55-abc3-7daf956ccbad" />
<img width="1440" height="111" alt="Screenshot 2026-03-25 at 11 31 19 AM" src="https://github.com/user-attachments/assets/e525ebc0-394c-47e5-af94-c35b320d35d0" />
<img width="1440" height="280" alt="Screenshot 2026-03-25 at 11 33 16 AM" src="https://github.com/user-attachments/assets/8a581eeb-aa39-45c5-8e72-b603c0330fdc" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 34 08 AM" src="https://github.com/user-attachments/assets/2b055ec7-dd43-4bb8-9c23-8891771e3ab1" />
<img width="1440" height="140" alt="Screenshot 2026-03-25 at 11 35 16 AM" src="https://github.com/user-attachments/assets/3be6d56a-a47e-43e6-8828-e39146b9ab96" />
<img width="1413" height="764" alt="Screenshot 2026-03-25 at 11 36 34 AM" src="https://github.com/user-attachments/assets/0b85e80a-042c-45e7-a918-2c70bc62dafc" />
<img width="1440" height="138" alt="Screenshot 2026-03-25 at 11 37 42 AM" src="https://github.com/user-attachments/assets/b63730f8-9f9f-4ac1-85f9-c339068f5ce9" />
<img width="1440" height="144" alt="Screenshot 2026-03-25 at 11 38 54 AM" src="https://github.com/user-attachments/assets/fecdf2f1-c773-4bce-a7c7-f76c2db97e0d" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 43 35 AM" src="https://github.com/user-attachments/assets/1d9770f7-6d99-495b-9435-7edfd2574c3a" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 44 58 AM" src="https://github.com/user-attachments/assets/7ea38e30-e0d1-4b94-be90-8473cf419eff" />
<img width="1440" height="105" alt="Screenshot 2026-03-25 at 11 45 24 AM" src="https://github.com/user-attachments/assets/61ba3b27-002c-4160-ac3b-b6becd611071" />
<img width="1440" height="282" alt="Screenshot 2026-03-25 at 11 47 18 AM" src="https://github.com/user-attachments/assets/959ed1c3-599a-46ce-a2cd-20b66a9b8251" />
<img width="1440" height="647" alt="Screenshot 2026-04-25 at 3 22 01 PM" src="https://github.com/user-attachments/assets/17bc8dbe-8486-4d45-bcf6-6d37f7195981" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 22 15 PM" src="https://github.com/user-attachments/assets/f44546a4-39f4-440e-aae6-cfd008630f66" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 22 42 PM" src="https://github.com/user-attachments/assets/2439424e-6e2e-4787-a225-37fbb60f71d8" />
<img width="1440" height="353" alt="Screenshot 2026-04-25 at 3 23 00 PM" src="https://github.com/user-attachments/assets/46ec5380-5fde-4091-96fd-89c1b12b2060" />
<img width="1440" height="161" alt="Screenshot 2026-04-25 at 3 23 33 PM" src="https://github.com/user-attachments/assets/f68c934a-f414-40a1-8091-b882af2a7c33" />
<img width="1428" height="805" alt="Screenshot 2026-04-25 at 3 23 41 PM" src="https://github.com/user-attachments/assets/e75463ad-6fcf-45cc-968a-8d9225c6ea21" />
<img width="1436" height="791" alt="Screenshot 2026-04-25 at 3 23 53 PM" src="https://github.com/user-attachments/assets/50c4add6-37bf-45a4-9aee-37694891f27b" />
<img width="1433" height="66" alt="Screenshot 2026-04-25 at 3 24 54 PM" src="https://github.com/user-attachments/assets/bb00fc98-d652-403b-b632-571abbb979c1" />
<img width="1440" height="156" alt="Screenshot 2026-04-25 at 3 25 20 PM" src="https://github.com/user-attachments/assets/3c7b38a1-cda4-4081-87fb-c4112d814a3a" />
<img width="1440" height="281" alt="Screenshot 2026-04-25 at 3 25 56 PM" src="https://github.com/user-attachments/assets/49f2f1cc-82c8-486d-9693-da9edb4c960e" />
<img width="1439" height="157" alt="Screenshot 2026-04-25 at 3 26 41 PM" src="https://github.com/user-attachments/assets/1f0f25ce-7e7d-403b-ae7f-510b76523223" />
<img width="1439" height="797" alt="Screenshot 2026-04-25 at 3 27 02 PM" src="https://github.com/user-attachments/assets/1c00a1dd-3daa-48fd-be5a-061c8694cdf3" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 27 41 PM" src="https://github.com/user-attachments/assets/2f20ea73-f05a-44aa-8b38-70150f974acf" />
<img width="1440" height="368" alt="Screenshot 2026-04-25 at 3 27 55 PM" src="https://github.com/user-attachments/assets/1d40aee3-4838-45cb-b965-6b88d29d1797" />
<img width="1440" height="740" alt="Screenshot 2026-04-25 at 3 29 16 PM" src="https://github.com/user-attachments/assets/44250313-d059-4439-8b23-1b49e9853c0d" />
<img width="1440" height="111" alt="Screenshot 2026-04-25 at 3 29 53 PM" src="https://github.com/user-attachments/assets/daac02e7-b4a3-406c-b8c5-0849a88a75b7" />
<img width="1440" height="507" alt="Screenshot 2026-04-25 at 3 30 43 PM" src="https://github.com/user-attachments/assets/879a261a-f4f1-4fc0-a8a2-f527bddb522f" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 31 11 PM" src="https://github.com/user-attachments/assets/44cbfefb-0bc8-48cb-9920-2071f5b4dac4" />
<img width="1440" height="451" alt="Screenshot 2026-04-25 at 3 32 31 PM" src="https://github.com/user-attachments/assets/aab854b8-abd1-4d1a-a69a-da0f02d825a9" />
<img width="1440" height="651" alt="Screenshot 2026-04-25 at 3 42 19 PM" src="https://github.com/user-attachments/assets/4f0942d3-43b2-4672-aff4-e4ab9cc30dd0" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 43 21 PM" src="https://github.com/user-attachments/assets/5373c143-07d4-4552-8a43-489d683cb1b3" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 43 31 PM" src="https://github.com/user-attachments/assets/e087ca37-21c8-4a39-b7e8-dd83803ec02b" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 44 28 PM" src="https://github.com/user-attachments/assets/328be17c-4aac-4be4-968a-469e9d444c7f" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 46 01 PM" src="https://github.com/user-attachments/assets/d465927f-baba-4b8f-9578-f0ac890d9f3a" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 46 39 PM" src="https://github.com/user-attachments/assets/71c7f8e5-bbc0-4a29-add3-239b63e97474" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 47 07 PM" src="https://github.com/user-attachments/assets/859505cd-3594-4472-bf52-ae3dc612cf41" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 48 09 PM" src="https://github.com/user-attachments/assets/03106f26-3af8-4887-9188-d1bb40421c4d" />
<img width="1440" height="900" alt="Screenshot 2026-04-25 at 3 48 26 PM" src="https://github.com/user-attachments/assets/53423c12-3f8f-4b5b-be68-3123781072c4" />
<img width="1437" height="569" alt="Screenshot 2026-04-25 at 3 48 44 PM" src="https://github.com/user-attachments/assets/0a097eef-de01-44a2-9d09-ac8f795a610c" />
<img width="1434" height="197" alt="Screenshot 2026-04-25 at 3 49 51 PM" src="https://github.com/user-attachments/assets/0a77df18-34c3-4edc-b289-e8c49339b863" />
<img width="1433" height="706" alt="Screenshot 2026-04-25 at 3 50 15 PM" src="https://github.com/user-attachments/assets/579bc19f-68e4-4d25-930d-cefd634e7428" />
<img width="1440" height="312" alt="Screenshot 2026-04-25 at 3 50 36 PM" src="https://github.com/user-attachments/assets/d019aa91-22c1-486a-8700-405535887b42" />











---
## 9. Key Learnings

- **Pods are temporary** — always use Deployments for real workloads; they self-heal
- **Kubernetes is self-healing by design** — deleted or crashed pods are automatically replaced
- **Scaling is one command** — `kubectl scale` handles it instantly
- **Rollbacks are instant** — `kubectl rollout undo` recovers a bad deployment in seconds
- **Namespaces enable isolation** — separate dev, staging, production in the same cluster
- **ConfigMaps decouple config from code** — change config without rebuilding the image
- **kubeadm enables real cluster setup** — closer to production than minikube or k3d
- **Debugging tools are essential** — `describe`, `logs`, `events`, and `get` are your best friends
- **Services expose internal apps** — NodePort for external, ClusterIP for internal
- **Port-forward is perfect for local dev** — no public exposure needed during development

---

## 10. Conclusion

This experiment gave a real-world, end-to-end understanding of Kubernetes far beyond theory.

Starting from basic concepts, I deployed WordPress using proper YAML manifests, exposed it through a Service, scaled it horizontally, and demonstrated self-healing. The Apache practical covered the full application lifecycle — from raw pod to managed deployment with debugging and live content modification.

Part D elevated the experiment to a production-style setup: three Ubuntu VMs joined into a real kubeadm cluster with a proper control plane, Calico networking, and worker nodes — the same architecture used in real companies.

The bonus operations — rolling updates, rollbacks, metrics, namespaces, ConfigMaps, and YAML exports — show production-readiness beyond what the lab sheet required.

**Biggest takeaways:**
- Kubernetes is not just a container runner — it is a full platform for managing application lifecycle
- Self-healing, scaling, and rollbacks make it genuinely production-grade
- The gap between theory and hands-on understanding is enormous — this lab closed that gap

---

## Tool Comparison

| Tool | Best For |
|------|----------|
| k3d | Quick local learning on laptop |
| Minikube | Single-node cluster testing |
| kubeadm | Real production-style multi-node cluster |

---

*Experiment 12 — Kubernetes Container Orchestration | macOS M1 Pro*

