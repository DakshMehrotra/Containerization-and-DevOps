## Kubernetes Setup using k3d (Mac M1) – Practical
## Objective
To set up a local Kubernetes cluster using k3d, deploy an application using Nginx, and expose it via a service.
## Tools & Technologies Used
- Docker Desktop
- Homebrew
- kubectl
- k3d
- Multipass (for VM setup)
- Kubernetes (k3s)

## Installation Steps
1. Install kubectl
- brew install kubectl
- kubectl version --client

2. Install Multipass
- brew install --cask multipass
- multipass version

3. Launch VM (for k3s)
- multipass launch --name k3sServer --cpus 2 --memory 2G --disk 10G
- multipass list
- multipass shell k3sServer

4. Install k3s inside VM
- curl -sfL https://get.k3s.io | sh -
- sudo kubectl get nodes

5. Install k3d (Local Kubernetes Cluster)
- brew install k3d
- k3d version

6. Create Cluster
- k3d cluster create mycluster

7. Verify Cluster
- kubectl get nodes

## Deployment Steps

8. Create Nginx Deployment
- kubectl create deployment nginx --image=nginx
- kubectl get pods

9. Expose Deployment
- kubectl expose deployment nginx --type=NodePort --port=80
- kubectl get svc

10. Scale Deployment
- kubectl scale deployment web --replicas=3

## Verification Commands
- kubectl get pods
- kubectl get services
- kubectl describe pod nginx
- kubectl logs nginx

## Output Observations
- Cluster successfully created using k3d
- Node status: Ready
- Pods created and running successfully
- Nginx deployed and exposed via NodePort
- Scaling worked (multiple replicas created)

## Screenshot 
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 11 28 52 AM" src="https://github.com/user-attachments/assets/bdd9f622-99e3-4cdf-a42a-8f1d4feb6440" />
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 11 28 58 AM" src="https://github.com/user-attachments/assets/a414fd1e-3263-4de8-8184-5fdb55473504" />
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 11 30 56 AM" src="https://github.com/user-attachments/assets/075e1f8e-fbcf-43dc-b631-2ee1d962fa3f" />
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 11 37 29 AM" src="https://github.com/user-attachments/assets/fe94d633-618a-4757-8acd-aad5feda6e74" />
<img width="1440" height="277" alt="Screenshot 2026-03-18 at 11 41 38 AM" src="https://github.com/user-attachments/assets/51090dfd-9e61-43cc-9802-34951692b3c4" />
<img width="1440" height="111" alt="Screenshot 2026-03-18 at 11 53 56 AM" src="https://github.com/user-attachments/assets/85a07d56-3dd7-499c-a6ab-63baa55e2019" />
<img width="1440" height="161" alt="Screenshot 2026-03-18 at 11 54 33 AM" src="https://github.com/user-attachments/assets/3fa498a4-c09d-4e3f-b690-8bdfa0de71ec" />
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 11 55 19 AM" src="https://github.com/user-attachments/assets/0729ea47-47cd-4a42-aacb-b281d8b4787d" />
<img width="1440" height="768" alt="Screenshot 2026-03-18 at 11 56 03 AM" src="https://github.com/user-attachments/assets/d2fdab0b-6307-40fe-8d5c-6b8167b1bd34" />
<img width="1439" height="366" alt="Screenshot 2026-03-18 at 11 57 03 AM" src="https://github.com/user-attachments/assets/d4ab5c57-1f8c-4309-ae4c-a3ccb3b59e7e" />
<img width="1440" height="798" alt="Screenshot 2026-03-18 at 11 57 58 AM" src="https://github.com/user-attachments/assets/0ff871c6-c295-4bb8-a29b-508198e36c80" />
<img width="1440" height="305" alt="Screenshot 2026-03-18 at 11 59 28 AM" src="https://github.com/user-attachments/assets/30679c67-7e9e-4e66-bfb4-ebf638a809d8" />
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 12 00 04 PM" src="https://github.com/user-attachments/assets/bcbd594b-2cd7-4a4a-b96a-c4b39ca5d8da" />
<img width="1440" height="420" alt="Screenshot 2026-03-18 at 12 00 26 PM" src="https://github.com/user-attachments/assets/eed855fb-f783-449a-83a8-319c48432914" />
<img width="1440" height="900" alt="Screenshot 2026-03-18 at 12 01 03 PM" src="https://github.com/user-attachments/assets/b19fca0a-df1a-4625-9b1f-5e18c5d7860e" />

## Result 
The Kubernetes environment was successfully set up on Mac M1 using Docker, k3d, and kubectl.
The following outcomes were achieved:
- A local Kubernetes cluster (mycluster) was created using k3d.
- The cluster node status was verified using kubectl get nodes and was in Ready state.
- An Nginx deployment was successfully created in the cluster.
- Pods were automatically generated and managed by the deployment.
- The deployment was exposed using a NodePort service.
- The deployment was scaled to multiple replicas, demonstrating Kubernetes scaling capability.
- Pod logs and details were verified using kubectl logs and kubectl describe.
- All Kubernetes components worked correctly and the application was successfully deployed and managed inside the cluster.

## Conclusion
Successfully:
- Set up Kubernetes locally using k3d
- Deployed an application (Nginx)
- Exposed it via service
- Scaled the deployment
This practical demonstrates basic Kubernetes operations including cluster setup, deployment, scaling, and service exposure.




