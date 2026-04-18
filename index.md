<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Containerization & DevOps — Daksh Mehrotra</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d1117;
    --bg2: #161b22;
    --bg3: #1c2128;
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --text: #e6edf3;
    --muted: #8b949e;
    --accent: #58a6ff;
    --accent2: #3fb950;
    --accent3: #f0883e;
    --accent4: #bc8cff;
    --accent5: #ff7b72;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
  }

  .hero {
    position: relative;
    overflow: hidden;
    padding: 80px 24px 60px;
    text-align: center;
    border-bottom: 1px solid var(--border);
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(88,166,255,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 110%, rgba(188,140,255,0.10) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 80%);
    pointer-events: none;
  }

  .hero-inner { position: relative; max-width: 860px; margin: 0 auto; }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(63,185,80,0.12);
    border: 1px solid rgba(63,185,80,0.3);
    color: var(--accent2);
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 20px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .hero-badge::before {
    content: '';
    width: 7px; height: 7px;
    background: var(--accent2);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .hero h1 {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin-bottom: 16px;
    color: var(--text);
  }

  .hero h1 span { color: var(--accent); }

  .hero p {
    color: var(--muted);
    font-size: 16px;
    max-width: 540px;
    margin: 0 auto 28px;
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 32px;
  }

  .meta-chip {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 13px;
    color: var(--muted);
  }

  .meta-chip strong { color: var(--text); font-weight: 500; }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
  }

  .stat { text-align: center; }
  .stat-number { font-size: 28px; font-weight: 700; color: var(--accent); }
  .stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

  main { max-width: 1080px; margin: 0 auto; padding: 48px 24px 80px; }

  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    margin-top: 52px;
  }

  .section-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text);
  }

  .section-count {
    margin-left: auto;
    font-size: 12px;
    color: var(--muted);
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 2px 10px;
    border-radius: 20px;
  }

  .divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 20px;
  }

  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }

  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    display: block;
    transition: border-color 0.2s, transform 0.15s, background 0.2s;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .card:hover {
    border-color: var(--border2);
    background: var(--bg3);
    transform: translateY(-2px);
  }

  .card:hover::before { opacity: 1; }

  .card-exp::before { background: linear-gradient(90deg, #58a6ff, #bc8cff); }
  .card-assign::before { background: linear-gradient(90deg, #f0883e, #ff7b72); }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }

  .card-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .card-icon-exp { background: rgba(88,166,255,0.12); }
  .card-icon-assign { background: rgba(240,136,62,0.12); }

  .card-num {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 3px;
  }

  .card-num-exp { color: var(--accent); }
  .card-num-assign { color: var(--accent3); }

  .card h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    line-height: 1.4;
  }

  .card-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.55;
    margin-bottom: 14px;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 5px;
    font-weight: 500;
    border: 1px solid;
  }

  .tag-blue { background: rgba(88,166,255,0.1); color: #58a6ff; border-color: rgba(88,166,255,0.2); }
  .tag-green { background: rgba(63,185,80,0.1); color: #3fb950; border-color: rgba(63,185,80,0.2); }
  .tag-orange { background: rgba(240,136,62,0.1); color: #f0883e; border-color: rgba(240,136,62,0.2); }
  .tag-purple { background: rgba(188,140,255,0.1); color: #bc8cff; border-color: rgba(188,140,255,0.2); }
  .tag-red { background: rgba(255,123,114,0.1); color: #ff7b72; border-color: rgba(255,123,114,0.2); }

  .card-arrow {
    position: absolute;
    top: 18px; right: 18px;
    color: var(--muted);
    font-size: 16px;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
  }

  .card:hover .card-arrow { opacity: 1; transform: translate(2px, -2px); }

  .list-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }

  .list-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
  }

  .list-card:hover {
    border-color: rgba(63,185,80,0.4);
    background: var(--bg3);
    transform: translateY(-1px);
  }

  .list-card-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent2);
    flex-shrink: 0;
  }

  .list-card-content { flex: 1; min-width: 0; }

  .list-card-date {
    font-size: 11px;
    color: var(--accent2);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .list-card-title {
    font-size: 13px;
    color: var(--text);
    font-weight: 500;
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-card-arrow {
    font-size: 14px;
    color: var(--muted);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .list-card:hover .list-card-arrow { opacity: 1; }

  .topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .topic-pill {
    background: var(--bg2);
    border: 1px solid var(--border);
    color: var(--muted);
    font-size: 12px;
    padding: 5px 12px;
    border-radius: 20px;
    transition: border-color 0.2s, color 0.2s;
  }

  .topic-pill:hover { border-color: var(--accent); color: var(--accent); cursor: default; }

  footer {
    border-top: 1px solid var(--border);
    padding: 32px 24px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
  }

  footer a { color: var(--accent); text-decoration: none; }
  footer a:hover { text-decoration: underline; }

  @media (max-width: 600px) {
    .hero { padding: 60px 16px 40px; }
    .hero-stats { gap: 24px; }
    main { padding: 32px 16px 60px; }
    .cards, .list-cards { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<header class="hero">
  <div class="hero-grid"></div>
  <div class="hero-inner">
    <div class="hero-badge">B.Tech Academic Submission</div>
    <h1>Containerization &amp; <span>DevOps</span><br>Lab Repository</h1>
    <p>All coursework, lab experiments, class practicals, and assignments — documented end-to-end with commands, outputs, and observations.</p>

    <div class="hero-meta">
      <div class="meta-chip"><strong>Daksh Mehrotra</strong></div>
      <div class="meta-chip">SAP: <strong>500125960</strong></div>
      <div class="meta-chip">Roll: <strong>R2142231932</strong></div>
      <div class="meta-chip">Batch: <strong>2 CCVT</strong></div>
    </div>

    <div class="hero-stats">
      <div class="stat">
        <div class="stat-number">10</div>
        <div class="stat-label">Experiments</div>
      </div>
      <div class="stat">
        <div class="stat-number">2</div>
        <div class="stat-label">Assignments</div>
      </div>
      <div class="stat">
        <div class="stat-number">28+</div>
        <div class="stat-label">Class Practicals</div>
      </div>
    </div>
  </div>
</header>

<main>

  <div class="section-header">
    <div class="section-icon" style="background:rgba(88,166,255,0.12)">🧪</div>
    <span class="section-title">Lab Experiments</span>
    <span class="section-count">10 experiments</span>
  </div>
  <div class="divider"></div>

  <div class="cards">

    <a class="card card-exp" href="./Experiment-1/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🖥️</div>
        <div>
          <div class="card-num card-num-exp">Experiment 1</div>
          <h3>Virtual Machines vs Containers</h3>
        </div>
      </div>
      <p class="card-desc">Infrastructure comparison using Ubuntu, VirtualBox, Vagrant, Docker &amp; Nginx. Covers VM provisioning vs containerized deployment.</p>
      <div class="card-tags">
        <span class="tag tag-blue">Vagrant</span>
        <span class="tag tag-blue">VirtualBox</span>
        <span class="tag tag-blue">Docker</span>
        <span class="tag tag-blue">Nginx</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-2/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🐳</div>
        <div>
          <div class="card-num card-num-exp">Experiment 2</div>
          <h3>Docker Installation &amp; Container Lifecycle</h3>
        </div>
      </div>
      <p class="card-desc">Pulling images, running containers with port mapping, resolving conflicts, and full start/stop/remove lifecycle management.</p>
      <div class="card-tags">
        <span class="tag tag-blue">Docker CLI</span>
        <span class="tag tag-blue">Port Mapping</span>
        <span class="tag tag-blue">Lifecycle</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-3/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">📦</div>
        <div>
          <div class="card-num card-num-exp">Experiment 3</div>
          <h3>Custom Docker Images — Ubuntu &amp; Alpine NGINX</h3>
        </div>
      </div>
      <p class="card-desc">Building custom images from Ubuntu 22.04 and Alpine Linux. Three containers on ports 8080, 8081, 8082 with size comparison.</p>
      <div class="card-tags">
        <span class="tag tag-blue">Dockerfile</span>
        <span class="tag tag-green">Alpine</span>
        <span class="tag tag-blue">Ubuntu</span>
        <span class="tag tag-blue">Nginx</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-4/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🚀</div>
        <div>
          <div class="card-num card-num-exp">Experiment 4</div>
          <h3>Dockerfile, .dockerignore, Tagging &amp; Docker Hub</h3>
        </div>
      </div>
      <p class="card-desc">Containerized Flask (port 5001) and Node.js (port 3000). Multi-stage build, .dockerignore, publish and pull from Docker Hub.</p>
      <div class="card-tags">
        <span class="tag tag-orange">Flask</span>
        <span class="tag tag-green">Node.js</span>
        <span class="tag tag-blue">Docker Hub</span>
        <span class="tag tag-purple">Multi-stage</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-5/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🌐</div>
        <div>
          <div class="card-num card-num-exp">Experiment 5</div>
          <h3>Docker Networking, Volumes &amp; Env Variables</h3>
        </div>
      </div>
      <p class="card-desc">Networking architecture, persistent volumes, env variable injection, runtime overrides, and container monitoring and debugging.</p>
      <div class="card-tags">
        <span class="tag tag-blue">Networking</span>
        <span class="tag tag-purple">Volumes</span>
        <span class="tag tag-green">Env Vars</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-6/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">⚙️</div>
        <div>
          <div class="card-num card-num-exp">Experiment 6</div>
          <h3>Docker Run vs Docker Compose</h3>
        </div>
      </div>
      <p class="card-desc">Single and multi-container apps, YAML orchestration, converting run commands to Compose, and container orchestration basics.</p>
      <div class="card-tags">
        <span class="tag tag-blue">Docker Compose</span>
        <span class="tag tag-blue">YAML</span>
        <span class="tag tag-green">Orchestration</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-7/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🔄</div>
        <div>
          <div class="card-num card-num-exp">Experiment 7</div>
          <h3>CI/CD Pipeline — Jenkins, GitHub &amp; Docker Hub</h3>
        </div>
      </div>
      <p class="card-desc">Jenkins GUI pipeline, GitHub webhooks, automated Docker builds. Custom Jenkins image for Mac M1 ARM64 with native Docker CLI.</p>
      <div class="card-tags">
        <span class="tag tag-red">Jenkins</span>
        <span class="tag tag-blue">GitHub</span>
        <span class="tag tag-blue">CI/CD</span>
        <span class="tag tag-orange">ARM64</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-9/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🤖</div>
        <div>
          <div class="card-num card-num-exp">Experiment 9</div>
          <h3>Ansible Automation with Docker</h3>
        </div>
      </div>
      <p class="card-desc">Agentless SSH automation, control/managed node architecture, idempotent playbooks, ad-hoc commands, and IaC with Docker as VMs.</p>
      <div class="card-tags">
        <span class="tag tag-red">Ansible</span>
        <span class="tag tag-blue">SSH</span>
        <span class="tag tag-green">IaC</span>
        <span class="tag tag-purple">Playbooks</span>
      </div>
    </a>

    <a class="card card-exp" href="./Experiment-10/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-exp">🔍</div>
        <div>
          <div class="card-num card-num-exp">Experiment 10</div>
          <h3>SonarQube: Continuous Code Quality</h3>
        </div>
      </div>
      <p class="card-desc">Static analysis, Quality Gates in Jenkins pipeline, technical debt measurement, fix-and-rescan cycle. Caught divide-by-zero and SQL injection.</p>
      <div class="card-tags">
        <span class="tag tag-blue">SonarQube</span>
        <span class="tag tag-red">Jenkins</span>
        <span class="tag tag-orange">Maven</span>
        <span class="tag tag-green">Quality Gate</span>
      </div>
    </a>

  </div>


  <div class="section-header">
    <div class="section-icon" style="background:rgba(240,136,62,0.12)">📝</div>
    <span class="section-title">Assignments</span>
    <span class="section-count">2 assignments</span>
  </div>
  <div class="divider"></div>

  <div class="cards">

    <a class="card card-assign" href="./Assignment-1/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-assign">🗄️</div>
        <div>
          <div class="card-num card-num-assign">Assignment 1</div>
          <h3>Containerized Web App with PostgreSQL &amp; IPVLAN</h3>
        </div>
      </div>
      <p class="card-desc">Docker Compose orchestration with PostgreSQL, custom IPVLAN networking, persistent volumes, and isolated container communication.</p>
      <div class="card-tags">
        <span class="tag tag-orange">PostgreSQL</span>
        <span class="tag tag-orange">IPVLAN</span>
        <span class="tag tag-orange">Docker Compose</span>
        <span class="tag tag-purple">Volumes</span>
      </div>
    </a>

    <a class="card card-assign" href="./Assignment-2/">
      <span class="card-arrow">↗</span>
      <div class="card-header">
        <div class="card-icon card-icon-assign">📊</div>
        <div>
          <div class="card-num card-num-assign">Assignment 2</div>
          <h3>DevOps Team &amp; Collaboration Presentation</h3>
        </div>
      </div>
      <p class="card-desc">Dev vs Ops silos, team models, DORA metrics, Netflix case study. DevOps as a culture shift, not a toolset.</p>
      <div class="card-tags">
        <span class="tag tag-orange">Culture</span>
        <span class="tag tag-orange">DORA Metrics</span>
        <span class="tag tag-orange">Team Models</span>
      </div>
    </a>

  </div>


  <div class="section-header">
    <div class="section-icon" style="background:rgba(63,185,80,0.12)">💻</div>
    <span class="section-title">Class Practicals</span>
    <span class="section-count">28 sessions</span>
  </div>
  <div class="divider"></div>

  <div class="list-cards">

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/21%20Jan%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">21 Jan</div>
        <div class="list-card-title">DevOps Fundamentals &amp; Setup</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/22%20Jan%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">22 Jan</div>
        <div class="list-card-title">Docker Basics &amp; Container Management</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/23%20Jan%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">23 Jan</div>
        <div class="list-card-title">Docker Networking &amp; Multi-Container Basics</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Jan%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">27 Jan</div>
        <div class="list-card-title">Docker Volumes &amp; Persistent Storage</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/28%20Jan%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">28 Jan</div>
        <div class="list-card-title">Docker Compose &amp; Multi-Service Deployment</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/30%20Jan%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">30 Jan</div>
        <div class="list-card-title">Dockerfile Creation &amp; Image Building</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/3%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">3 Feb</div>
        <div class="list-card-title">Docker Installation &amp; Nginx Deployment</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/4%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">4 Feb</div>
        <div class="list-card-title">Docker Engine Config &amp; Remote API</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/5%20Feb(Class%20Test)%20Readme.md">
      <div class="list-card-dot" style="background:#f0883e"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#f0883e">5 Feb — Class Test</div>
        <div class="list-card-title">Containerize Python SAP ID App</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">6 Feb</div>
        <div class="list-card-title">Python App with Docker Volume Mount</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Assignment%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">6 Feb Assignment</div>
        <div class="list-card-title">C App with Docker Volume Mount</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">10 Feb</div>
        <div class="list-card-title">C App Containerization &amp; Optimization</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Assignment%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">10 Feb Assignment</div>
        <div class="list-card-title">Multi-Stage Build for Java App</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">11 Feb</div>
        <div class="list-card-title">Volume Management &amp; Data Persistence</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Assignment%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">11 Feb Assignment</div>
        <div class="list-card-title">Volume Backup, Restore &amp; TAR</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/12%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">12 Feb</div>
        <div class="list-card-title">Volumes, Bind Mounts, tmpfs &amp; MySQL</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/18%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">18 Feb</div>
        <div class="list-card-title">Bridge, Custom Network &amp; Container Comms</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/20%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">20 Feb</div>
        <div class="list-card-title">Docker Swarm, Overlay &amp; Macvlan</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/25%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">25 Feb</div>
        <div class="list-card-title">Docker Compose — Nginx &amp; WordPress</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/26%20Feb%20Readme.md">
      <div class="list-card-dot"></div>
      <div class="list-card-content">
        <div class="list-card-date">26 Feb</div>
        <div class="list-card-title">Scaling Services with Docker Compose</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/18%20Mar%20Readme.md">
      <div class="list-card-dot" style="background:#bc8cff"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#bc8cff">18 Mar</div>
        <div class="list-card-title">Kubernetes Setup using k3d (Mac M1)</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/19%20Mar%20readme.md">
      <div class="list-card-dot" style="background:#bc8cff"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#bc8cff">19 Mar</div>
        <div class="list-card-title">Kubernetes Deployment &amp; Service Exposure</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/20%20Mar%20Readme.md">
      <div class="list-card-dot" style="background:#bc8cff"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#bc8cff">20 Mar</div>
        <div class="list-card-title">Docker &amp; Portainer Setup (Mac M1)</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/25%20Mar%20Task%20Readme.md">
      <div class="list-card-dot" style="background:#bc8cff"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#bc8cff">25 Mar</div>
        <div class="list-card-title">Apache Web App on Kubernetes</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Mar%20Task%20Readme.md">
      <div class="list-card-dot" style="background:#bc8cff"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#bc8cff">27 Mar</div>
        <div class="list-card-title">Imperative vs Declarative Deployment</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/1%20Apr%20Readme.md">
      <div class="list-card-dot" style="background:#ff7b72"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#ff7b72">1 Apr</div>
        <div class="list-card-title">Jenkins on Docker</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/7%20Apr%20Readme.md">
      <div class="list-card-dot" style="background:#ff7b72"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#ff7b72">7 Apr</div>
        <div class="list-card-title">Git &amp; GitHub SSH Setup</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/9%20Apr%20Readme.md">
      <div class="list-card-dot" style="background:#ff7b72"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#ff7b72">9 Apr</div>
        <div class="list-card-title">Git Practical — Branching &amp; Merging</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

    <a class="list-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Apr%20Task%20Readme.md">
      <div class="list-card-dot" style="background:#ff7b72"></div>
      <div class="list-card-content">
        <div class="list-card-date" style="color:#ff7b72">10 Apr</div>
        <div class="list-card-title">FastAPI + GitHub Actions + Docker Hub CD</div>
      </div>
      <span class="list-card-arrow">↗</span>
    </a>

  </div>


  <div class="section-header" style="margin-top: 52px">
    <div class="section-icon" style="background:rgba(188,140,255,0.12)">🏷️</div>
    <span class="section-title">Technologies Covered</span>
  </div>
  <div class="divider"></div>
  <div class="topics">
    <span class="topic-pill">Docker</span>
    <span class="topic-pill">Docker Compose</span>
    <span class="topic-pill">Dockerfile</span>
    <span class="topic-pill">Docker Hub</span>
    <span class="topic-pill">Docker Swarm</span>
    <span class="topic-pill">Kubernetes (k3d)</span>
    <span class="topic-pill">Jenkins</span>
    <span class="topic-pill">GitHub Actions</span>
    <span class="topic-pill">Ansible</span>
    <span class="topic-pill">SonarQube</span>
    <span class="topic-pill">Nginx</span>
    <span class="topic-pill">Alpine Linux</span>
    <span class="topic-pill">Vagrant</span>
    <span class="topic-pill">VirtualBox</span>
    <span class="topic-pill">Portainer</span>
    <span class="topic-pill">PostgreSQL</span>
    <span class="topic-pill">Flask</span>
    <span class="topic-pill">Node.js</span>
    <span class="topic-pill">FastAPI</span>
    <span class="topic-pill">Maven</span>
    <span class="topic-pill">Multi-stage Build</span>
    <span class="topic-pill">IPVLAN</span>
    <span class="topic-pill">Overlay Network</span>
    <span class="topic-pill">Macvlan</span>
    <span class="topic-pill">SSH Key Auth</span>
    <span class="topic-pill">CI/CD</span>
    <span class="topic-pill">IaC</span>
    <span class="topic-pill">Git</span>
  </div>

</main>

<footer>
  <p>Containerization &amp; DevOps Lab &middot; Daksh Mehrotra &middot; SAP 500125960 &middot; B.Tech 2 CCVT</p>
  <p style="margin-top: 8px;">
    <a href="https://github.com/DakshMehrotra/Containerization-and-DevOps" target="_blank">View on GitHub ↗</a>
  </p>
</footer>

</body>
</html>
