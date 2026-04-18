<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Containerization & DevOps — Daksh Mehrotra</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060910;
  --bg2:#0d1117;
  --bg3:#161b22;
  --bg4:#1c2128;
  --border:rgba(255,255,255,0.06);
  --border2:rgba(255,255,255,0.12);
  --border3:rgba(255,255,255,0.2);
  --text:#f0f6fc;
  --muted:#7d8590;
  --muted2:#adbac7;
  --blue:#79c0ff;
  --green:#56d364;
  --purple:#d2a8ff;
  --orange:#ffa657;
  --red:#ff7b72;
  --teal:#39d353;
  --cyan:#76e3ea;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;overflow-x:hidden}

/* ─── CANVAS BG ─── */
#bg-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.4}

/* ─── HERO ─── */
.hero{
  position:relative;z-index:1;
  min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:80px 24px 60px;text-align:center;
  overflow:hidden;
}
.hero-aurora{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 120% 60% at 10% 20%, rgba(121,192,255,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 80% 50% at 90% 80%, rgba(210,168,255,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(86,211,100,0.05) 0%, transparent 50%);
}
.hero-lines{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%);
}
.hero-inner{position:relative;z-index:1;max-width:900px;margin:0 auto}

.status-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(86,211,100,0.08);
  border:1px solid rgba(86,211,100,0.25);
  color:var(--green);font-size:12px;font-weight:600;
  padding:6px 16px;border-radius:100px;
  margin-bottom:32px;letter-spacing:0.5px;text-transform:uppercase;
}
.status-dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(86,211,100,0.4)}50%{opacity:0.5;box-shadow:0 0 0 4px rgba(86,211,100,0)}}

.hero-eyebrow{
  font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;
  color:var(--muted);margin-bottom:20px;
}

.hero-title{
  font-size:clamp(40px,7vw,80px);
  font-weight:800;line-height:1.05;letter-spacing:-2px;
  margin-bottom:24px;
}
.hero-title .line1{display:block;color:var(--text)}
.hero-title .line2{
  display:block;
  background:linear-gradient(135deg,var(--blue) 0%,var(--purple) 50%,var(--orange) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  background-size:200% auto;
  animation:shimmer 4s linear infinite;
}
@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}

.hero-sub{
  font-size:17px;color:var(--muted2);max-width:560px;margin:0 auto 40px;
  line-height:1.7;
}

.hero-chips{
  display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:48px;
}
.chip{
  display:flex;align-items:center;gap:8px;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--border2);
  border-radius:10px;padding:8px 16px;
  font-size:13px;color:var(--muted2);
  backdrop-filter:blur(8px);
}
.chip-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-right:2px}
.chip strong{color:var(--text);font-weight:600}

.hero-stats{display:flex;justify-content:center;gap:0;flex-wrap:wrap}
.stat-item{
  padding:20px 40px;
  border-right:1px solid var(--border);
  text-align:center;
}
.stat-item:last-child{border-right:none}
.stat-val{
  font-size:36px;font-weight:800;letter-spacing:-1px;
  background:linear-gradient(135deg,var(--text),var(--muted2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.stat-lbl{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:4px}

.scroll-hint{
  position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:8px;
  color:var(--muted);font-size:11px;letter-spacing:1px;text-transform:uppercase;
  animation:float 3s ease-in-out infinite;
}
@keyframes float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
.scroll-arrow{width:20px;height:20px;border-right:1.5px solid var(--muted);border-bottom:1.5px solid var(--muted);transform:rotate(45deg);margin-top:-4px}

/* ─── MAIN ─── */
main{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:80px 24px 100px}

/* ─── SECTION ─── */
.section{margin-bottom:80px}
.section-label{
  display:flex;align-items:center;gap:16px;margin-bottom:40px;
}
.section-label-line{flex:1;height:1px;background:linear-gradient(90deg,var(--border2),transparent)}
.section-label-text{
  display:flex;align-items:center;gap:10px;white-space:nowrap;
}
.section-icon-wrap{
  width:36px;height:36px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:16px;border:1px solid var(--border2);
  background:rgba(255,255,255,0.03);
}
.section-name{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted2)}
.section-count{
  font-size:11px;color:var(--muted);
  background:rgba(255,255,255,0.05);
  border:1px solid var(--border);
  padding:2px 10px;border-radius:100px;
}

/* ─── EXPERIMENT CARDS ─── */
.exp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}

.exp-card{
  position:relative;
  background:rgba(13,17,23,0.8);
  border:1px solid var(--border);
  border-radius:20px;
  padding:28px;
  text-decoration:none;color:inherit;
  display:flex;flex-direction:column;
  overflow:hidden;
  transition:border-color 0.3s,transform 0.3s;
  cursor:pointer;
  transform-style:preserve-3d;
  will-change:transform;
  backdrop-filter:blur(12px);
}
.exp-card::before{
  content:'';position:absolute;inset:0;border-radius:20px;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.04) 0%,transparent 60%);
  opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:0;
}
.exp-card:hover::before{opacity:1}
.exp-card:hover{border-color:var(--border2);transform:translateY(-4px)}

.exp-card-glow{
  position:absolute;top:-60px;right:-60px;
  width:160px;height:160px;border-radius:50%;
  opacity:0.06;pointer-events:none;
  transition:opacity 0.3s;
}
.exp-card:hover .exp-card-glow{opacity:0.12}

.exp-top-bar{
  position:absolute;top:0;left:0;right:0;height:2px;
  border-radius:20px 20px 0 0;
  opacity:0.6;
  transition:opacity 0.3s;
}
.exp-card:hover .exp-top-bar{opacity:1}

.exp-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;position:relative;z-index:1}
.exp-num{
  font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  margin-bottom:6px;opacity:0.7;
}
.exp-icon-ring{
  width:44px;height:44px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  font-size:20px;
  border:1px solid var(--border2);
  background:rgba(255,255,255,0.04);
  flex-shrink:0;
}
.exp-card h3{
  font-size:16px;font-weight:700;color:var(--text);
  line-height:1.35;margin-bottom:10px;
  position:relative;z-index:1;
}
.exp-card p{
  font-size:13px;color:var(--muted);line-height:1.65;
  flex:1;margin-bottom:20px;position:relative;z-index:1;
}
.exp-footer{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1}
.exp-tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{
  font-size:11px;font-weight:600;
  padding:3px 9px;border-radius:6px;border:1px solid;
  letter-spacing:0.3px;
}
.exp-arrow{
  width:32px;height:32px;border-radius:8px;
  border:1px solid var(--border2);
  display:flex;align-items:center;justify-content:center;
  color:var(--muted);font-size:14px;flex-shrink:0;
  transition:all 0.2s;
}
.exp-card:hover .exp-arrow{
  background:rgba(255,255,255,0.08);
  color:var(--text);border-color:var(--border3);
  transform:translate(2px,-2px);
}

/* color variants */
.c-blue .exp-num,.c-blue .exp-card-glow{color:var(--blue)}
.c-blue .exp-card-glow{background:var(--blue)}
.c-blue .exp-top-bar{background:linear-gradient(90deg,var(--blue),var(--purple))}
.c-blue .exp-icon-ring{background:rgba(121,192,255,0.08);border-color:rgba(121,192,255,0.2)}

.c-purple .exp-num{color:var(--purple)}
.c-purple .exp-card-glow{background:var(--purple)}
.c-purple .exp-top-bar{background:linear-gradient(90deg,var(--purple),var(--orange))}
.c-purple .exp-icon-ring{background:rgba(210,168,255,0.08);border-color:rgba(210,168,255,0.2)}

.c-green .exp-num{color:var(--green)}
.c-green .exp-card-glow{background:var(--green)}
.c-green .exp-top-bar{background:linear-gradient(90deg,var(--green),var(--cyan))}
.c-green .exp-icon-ring{background:rgba(86,211,100,0.08);border-color:rgba(86,211,100,0.2)}

.c-orange .exp-num{color:var(--orange)}
.c-orange .exp-card-glow{background:var(--orange)}
.c-orange .exp-top-bar{background:linear-gradient(90deg,var(--orange),var(--red))}
.c-orange .exp-icon-ring{background:rgba(255,166,87,0.08);border-color:rgba(255,166,87,0.2)}

.c-red .exp-num{color:var(--red)}
.c-red .exp-card-glow{background:var(--red)}
.c-red .exp-top-bar{background:linear-gradient(90deg,var(--red),var(--purple))}
.c-red .exp-icon-ring{background:rgba(255,123,114,0.08);border-color:rgba(255,123,114,0.2)}

.c-cyan .exp-num{color:var(--cyan)}
.c-cyan .exp-card-glow{background:var(--cyan)}
.c-cyan .exp-top-bar{background:linear-gradient(90deg,var(--cyan),var(--blue))}
.c-cyan .exp-icon-ring{background:rgba(118,227,234,0.08);border-color:rgba(118,227,234,0.2)}

.tag-blue{background:rgba(121,192,255,0.1);color:#79c0ff;border-color:rgba(121,192,255,0.2)}
.tag-purple{background:rgba(210,168,255,0.1);color:#d2a8ff;border-color:rgba(210,168,255,0.2)}
.tag-green{background:rgba(86,211,100,0.1);color:#56d364;border-color:rgba(86,211,100,0.2)}
.tag-orange{background:rgba(255,166,87,0.1);color:#ffa657;border-color:rgba(255,166,87,0.2)}
.tag-red{background:rgba(255,123,114,0.1);color:#ff7b72;border-color:rgba(255,123,114,0.2)}
.tag-cyan{background:rgba(118,227,234,0.1);color:#76e3ea;border-color:rgba(118,227,234,0.2)}
.tag-gray{background:rgba(125,133,144,0.1);color:#adbac7;border-color:rgba(125,133,144,0.2)}

/* ─── ASSIGNMENT CARDS ─── */
.assign-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:20px}
.assign-card{
  position:relative;
  background:rgba(13,17,23,0.8);
  border:1px solid var(--border);
  border-radius:20px;
  padding:32px;
  text-decoration:none;color:inherit;
  display:flex;flex-direction:column;
  overflow:hidden;
  backdrop-filter:blur(12px);
  transition:border-color 0.3s,transform 0.3s;
}
.assign-card:hover{border-color:rgba(255,166,87,0.3);transform:translateY(-4px)}
.assign-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#ffa657,#ff7b72);opacity:0.7}

/* ─── PRACTICAL LIST ─── */
.month-group{margin-bottom:32px}
.month-label{
  display:flex;align-items:center;gap:12px;margin-bottom:16px;
}
.month-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.month-name{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted2)}
.month-line{flex:1;height:1px;background:var(--border)}

.practical-row{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;
}
.practical-card{
  background:rgba(13,17,23,0.6);
  border:1px solid var(--border);
  border-radius:12px;
  padding:14px 16px;
  text-decoration:none;color:inherit;
  display:flex;align-items:center;gap:12px;
  transition:border-color 0.2s,background 0.2s,transform 0.15s;
  backdrop-filter:blur(8px);
}
.practical-card:hover{
  background:rgba(28,33,40,0.9);
  transform:translateY(-2px);
}
.p-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.p-date{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px}
.p-title{font-size:12px;color:var(--text);font-weight:500;line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.p-arrow{margin-left:auto;color:var(--muted);font-size:13px;opacity:0;transition:opacity 0.2s;flex-shrink:0}
.practical-card:hover .p-arrow{opacity:1}

/* ─── TECH WALL ─── */
.tech-wall{
  display:flex;flex-wrap:wrap;gap:10px;
}
.tech-pill{
  display:flex;align-items:center;gap:8px;
  background:rgba(255,255,255,0.03);
  border:1px solid var(--border);
  border-radius:10px;
  padding:8px 14px;font-size:13px;color:var(--muted2);
  transition:border-color 0.2s,color 0.2s,background 0.2s;cursor:default;
}
.tech-pill:hover{border-color:var(--border3);color:var(--text);background:rgba(255,255,255,0.06)}
.tech-pill-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}

/* ─── FOOTER ─── */
footer{
  position:relative;z-index:1;
  border-top:1px solid var(--border);
  padding:48px 24px;text-align:center;
}
.footer-inner{max-width:600px;margin:0 auto}
.footer-logo{
  font-size:24px;font-weight:800;letter-spacing:-0.5px;
  background:linear-gradient(135deg,var(--blue),var(--purple));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:12px;
}
footer p{font-size:13px;color:var(--muted);margin-bottom:20px}
.footer-link{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(255,255,255,0.05);
  border:1px solid var(--border2);
  color:var(--muted2);text-decoration:none;
  padding:10px 24px;border-radius:10px;font-size:13px;font-weight:500;
  transition:all 0.2s;
}
.footer-link:hover{border-color:var(--border3);color:var(--text);background:rgba(255,255,255,0.08)}

@media(max-width:700px){
  .hero-title{font-size:36px;letter-spacing:-1px}
  .stat-item{padding:16px 20px}
  main{padding:48px 16px 60px}
  .exp-grid,.assign-grid{grid-template-columns:1fr}
  .practical-row{grid-template-columns:1fr}
}
</style>
</head>
<body>

<canvas id="bg-canvas"></canvas>

<!-- ─── HERO ─── -->
<section class="hero">
  <div class="hero-aurora"></div>
  <div class="hero-lines"></div>
  <div class="hero-inner">

    <div class="status-badge">
      <span class="status-dot"></span>
      Academic Submission · B.Tech 2024–25
    </div>

    <p class="hero-eyebrow">Containerization &amp; DevOps</p>

    <h1 class="hero-title">
      <span class="line1">Lab Repository</span>
      <span class="line2">Daksh Mehrotra</span>
    </h1>

    <p class="hero-sub">
      Complete coursework documentation — from Docker fundamentals to Kubernetes orchestration, CI/CD pipelines, Ansible automation, and beyond.
    </p>

    <div class="hero-chips">
      <div class="chip"><span class="chip-label">SAP</span><strong>500125960</strong></div>
      <div class="chip"><span class="chip-label">Roll</span><strong>R2142231932</strong></div>
      <div class="chip"><span class="chip-label">Batch</span><strong>2 CCVT</strong></div>
      <div class="chip"><span class="chip-label">Program</span><strong>B.Tech CSE</strong></div>
    </div>

    <div class="hero-stats">
      <div class="stat-item"><div class="stat-val">10</div><div class="stat-lbl">Experiments</div></div>
      <div class="stat-item"><div class="stat-val">2</div><div class="stat-lbl">Assignments</div></div>
      <div class="stat-item"><div class="stat-val">28+</div><div class="stat-lbl">Practicals</div></div>
      <div class="stat-item"><div class="stat-val">15+</div><div class="stat-lbl">Technologies</div></div>
    </div>

  </div>
  <div class="scroll-hint"><span>Scroll</span><div class="scroll-arrow"></div></div>
</section>

<!-- ─── MAIN ─── -->
<main>

  <!-- ═══ EXPERIMENTS ═══ -->
  <div class="section">
    <div class="section-label">
      <div class="section-label-line"></div>
      <div class="section-label-text">
        <div class="section-icon-wrap">🧪</div>
        <span class="section-name">Lab Experiments</span>
        <span class="section-count">10 total</span>
      </div>
      <div class="section-label-line"></div>
    </div>

    <div class="exp-grid">

      <a class="exp-card c-blue" href="./Experiment-1/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 01</div>
            <h3>Virtual Machines vs Containers</h3>
          </div>
          <div class="exp-icon-ring">🖥️</div>
        </div>
        <p>Side-by-side infrastructure comparison. Provisioned Ubuntu VMs using Vagrant + VirtualBox, then replicated the same service with Docker — demonstrating architectural differences in isolation, startup time, and resource usage.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-blue">Vagrant</span>
            <span class="tag tag-blue">VirtualBox</span>
            <span class="tag tag-gray">Docker</span>
            <span class="tag tag-gray">Nginx</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-purple" href="./Experiment-2/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 02</div>
            <h3>Docker Installation &amp; Container Lifecycle</h3>
          </div>
          <div class="exp-icon-ring">🐳</div>
        </div>
        <p>Hands-on Docker fundamentals — pulling images, running containers with port mapping, verifying services in-browser, diagnosing and resolving port conflicts, and mastering the full start/stop/remove lifecycle.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-purple">Docker CLI</span>
            <span class="tag tag-gray">Port Mapping</span>
            <span class="tag tag-gray">Lifecycle</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-green" href="./Experiment-3/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 03</div>
            <h3>Custom Docker Images — Ubuntu &amp; Alpine</h3>
          </div>
          <div class="exp-icon-ring">📦</div>
        </div>
        <p>Built custom Nginx images from two base OS flavours. Official Nginx on :8080, Ubuntu-based on :8081, Alpine-based on :8082. Size benchmarked Alpine at a fraction of Ubuntu — real insight into lightweight container optimization.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-green">Dockerfile</span>
            <span class="tag tag-cyan">Alpine</span>
            <span class="tag tag-gray">Ubuntu</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-orange" href="./Experiment-4/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 04</div>
            <h3>Dockerfile, .dockerignore &amp; Docker Hub</h3>
          </div>
          <div class="exp-icon-ring">🚀</div>
        </div>
        <p>Full containerization pipeline for Python Flask (:5001) and Node.js Express (:3000). Implemented .dockerignore for security, multi-stage builds for size reduction, then tagged and published to Docker Hub — end-to-end validated.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-orange">Flask</span>
            <span class="tag tag-green">Node.js</span>
            <span class="tag tag-blue">Docker Hub</span>
            <span class="tag tag-purple">Multi-stage</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-cyan" href="./Experiment-5/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 05</div>
            <h3>Networking, Volumes &amp; Env Variables</h3>
          </div>
          <div class="exp-icon-ring">🌐</div>
        </div>
        <p>Deep-dive into Docker's production config primitives — networking architecture, named volume persistence, secure secret injection via environment variables, runtime overrides, and container debugging with inspect and logs.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-cyan">Networking</span>
            <span class="tag tag-purple">Volumes</span>
            <span class="tag tag-green">Env Vars</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-blue" href="./Experiment-6/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 06</div>
            <h3>Docker Run vs Docker Compose</h3>
          </div>
          <div class="exp-icon-ring">⚙️</div>
        </div>
        <p>Converted multi-command docker run workflows into clean YAML Compose files. Built both single and multi-container apps, explored orchestration primitives, and understood when Compose genuinely replaces manual wiring.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-blue">Docker Compose</span>
            <span class="tag tag-gray">YAML</span>
            <span class="tag tag-green">Orchestration</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-red" href="./Experiment-7/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 07</div>
            <h3>CI/CD Pipeline — Jenkins + GitHub + Docker</h3>
          </div>
          <div class="exp-icon-ring">🔄</div>
        </div>
        <p>Built a fully automated pipeline: GitHub webhook triggers Jenkins on every push → Docker build → push to Docker Hub. Required a custom Jenkins ARM64 image with native Docker CLI to run on Mac M1.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-red">Jenkins</span>
            <span class="tag tag-gray">Webhooks</span>
            <span class="tag tag-orange">ARM64</span>
            <span class="tag tag-blue">CI/CD</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-purple" href="./Experiment-9/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 09</div>
            <h3>Ansible Automation with Docker</h3>
          </div>
          <div class="exp-icon-ring">🤖</div>
        </div>
        <p>Configured control node + Docker-simulated managed nodes with SSH key auth. Wrote idempotent playbooks using apt, copy, command, debug modules. Demonstrated IaC principles — same playbook, identical outcome every run.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-red">Ansible</span>
            <span class="tag tag-gray">SSH</span>
            <span class="tag tag-green">IaC</span>
            <span class="tag tag-purple">Playbooks</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

      <a class="exp-card c-green" href="./Experiment-10/">
        <div class="exp-card-glow"></div>
        <div class="exp-top-bar"></div>
        <div class="exp-header">
          <div>
            <div class="exp-num">Experiment 10</div>
            <h3>SonarQube: Continuous Code Quality</h3>
          </div>
          <div class="exp-icon-ring">🔍</div>
        </div>
        <p>Static analysis pipeline — SonarQube server + Maven scanner caught divide-by-zero and SQL injection without running the code. Quality Gate wired into Jenkins to block bad code from reaching production. Technical debt quantified in hours.</p>
        <div class="exp-footer">
          <div class="exp-tags">
            <span class="tag tag-blue">SonarQube</span>
            <span class="tag tag-orange">Maven</span>
            <span class="tag tag-green">Quality Gate</span>
          </div>
          <div class="exp-arrow">↗</div>
        </div>
      </a>

    </div>
  </div>

  <!-- ═══ ASSIGNMENTS ═══ -->
  <div class="section">
    <div class="section-label">
      <div class="section-label-line"></div>
      <div class="section-label-text">
        <div class="section-icon-wrap">📝</div>
        <span class="section-name">Assignments</span>
        <span class="section-count">2 total</span>
      </div>
      <div class="section-label-line"></div>
    </div>

    <div class="assign-grid">

      <a class="assign-card" href="./Assignment-1/" style="text-decoration:none;color:inherit">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
          <div>
            <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--orange);margin-bottom:6px">Assignment 01</div>
            <h3 style="font-size:18px;font-weight:700;color:var(--text)">Containerized Web App + PostgreSQL via IPVLAN</h3>
          </div>
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(255,166,87,0.08);border:1px solid rgba(255,166,87,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🗄️</div>
        </div>
        <p style="font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:24px">
          Orchestrated a web application with PostgreSQL using Docker Compose. Configured a custom IPVLAN network for direct physical network integration, persistent volumes for database durability, and complete service isolation.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <span class="tag tag-orange">PostgreSQL</span>
          <span class="tag tag-orange">IPVLAN</span>
          <span class="tag tag-blue">Docker Compose</span>
          <span class="tag tag-purple">Volumes</span>
        </div>
      </a>

      <a class="assign-card" href="./Assignment-2/" style="text-decoration:none;color:inherit">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
          <div>
            <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--orange);margin-bottom:6px">Assignment 02</div>
            <h3 style="font-size:18px;font-weight:700;color:var(--text)">DevOps Team Culture &amp; Collaboration</h3>
          </div>
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(255,166,87,0.08);border:1px solid rgba(255,166,87,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">📊</div>
        </div>
        <p style="font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:24px">
          Presentation on why the classic Dev vs Ops silo model fails. Covered team topologies, DORA metrics as quantified proof, and Netflix as the real-world case study. Core thesis: DevOps is a culture shift, not a toolset.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <span class="tag tag-orange">Culture</span>
          <span class="tag tag-orange">DORA Metrics</span>
          <span class="tag tag-gray">Team Topologies</span>
          <span class="tag tag-gray">Netflix Case</span>
        </div>
      </a>

    </div>
  </div>

  <!-- ═══ CLASS PRACTICALS ═══ -->
  <div class="section">
    <div class="section-label">
      <div class="section-label-line"></div>
      <div class="section-label-text">
        <div class="section-icon-wrap">💻</div>
        <span class="section-name">Class Practicals</span>
        <span class="section-count">28 sessions</span>
      </div>
      <div class="section-label-line"></div>
    </div>

    <!-- January -->
    <div class="month-group">
      <div class="month-label">
        <div class="month-dot" style="background:var(--green)"></div>
        <span class="month-name">January</span>
        <div class="month-line"></div>
      </div>
      <div class="practical-row">
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/21%20Jan%20Readme.md">
          <div class="p-dot" style="background:var(--green)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--green)">21 Jan</div>
            <div class="p-title">DevOps Fundamentals &amp; Setup</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/22%20Jan%20Readme.md">
          <div class="p-dot" style="background:var(--green)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--green)">22 Jan</div>
            <div class="p-title">Docker Basics &amp; Container Management</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/23%20Jan%20Readme.md">
          <div class="p-dot" style="background:var(--green)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--green)">23 Jan</div>
            <div class="p-title">Docker Networking &amp; Multi-Container Basics</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Jan%20Readme.md">
          <div class="p-dot" style="background:var(--green)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--green)">27 Jan</div>
            <div class="p-title">Docker Volumes &amp; Persistent Storage</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/28%20Jan%20Readme.md">
          <div class="p-dot" style="background:var(--green)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--green)">28 Jan</div>
            <div class="p-title">Docker Compose &amp; Multi-Service Deployment</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/30%20Jan%20Readme.md">
          <div class="p-dot" style="background:var(--green)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--green)">30 Jan</div>
            <div class="p-title">Dockerfile Creation &amp; Image Building</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
      </div>
    </div>

    <!-- February -->
    <div class="month-group">
      <div class="month-label">
        <div class="month-dot" style="background:var(--blue)"></div>
        <span class="month-name">February</span>
        <div class="month-line"></div>
      </div>
      <div class="practical-row">
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/3%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">3 Feb</div>
            <div class="p-title">Docker Installation &amp; Nginx Deployment</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/4%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">4 Feb</div>
            <div class="p-title">Docker Engine Config &amp; Remote API</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/5%20Feb(Class%20Test)%20Readme.md" style="border-color:rgba(255,166,87,0.2)">
          <div class="p-dot" style="background:var(--orange)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--orange)">5 Feb · Test</div>
            <div class="p-title">Containerize Python SAP ID App</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">6 Feb</div>
            <div class="p-title">Python App via Docker Volume Mount</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Assignment%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">6 Feb Assign.</div>
            <div class="p-title">C App via Docker Volume Mount</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">10 Feb</div>
            <div class="p-title">C App Containerization &amp; Optimization</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Assignment%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">10 Feb Assign.</div>
            <div class="p-title">Multi-Stage Build for Java App</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">11 Feb</div>
            <div class="p-title">Volume Management &amp; Data Persistence</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Assignment%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">11 Feb Assign.</div>
            <div class="p-title">Volume Backup, Restore &amp; TAR Archives</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/12%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">12 Feb</div>
            <div class="p-title">Volumes, Bind Mounts, tmpfs &amp; MySQL</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/18%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">18 Feb</div>
            <div class="p-title">Bridge, Custom Network &amp; Container Comms</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/20%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">20 Feb</div>
            <div class="p-title">Docker Swarm, Overlay &amp; Macvlan</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/25%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">25 Feb</div>
            <div class="p-title">Docker Compose — Nginx &amp; WordPress</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/26%20Feb%20Readme.md">
          <div class="p-dot" style="background:var(--blue)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--blue)">26 Feb</div>
            <div class="p-title">Scaling Services with Docker Compose</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
      </div>
    </div>

    <!-- March -->
    <div class="month-group">
      <div class="month-label">
        <div class="month-dot" style="background:var(--purple)"></div>
        <span class="month-name">March</span>
        <div class="month-line"></div>
      </div>
      <div class="practical-row">
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/18%20Mar%20Readme.md">
          <div class="p-dot" style="background:var(--purple)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--purple)">18 Mar</div>
            <div class="p-title">Kubernetes Setup via k3d (Mac M1)</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/19%20Mar%20readme.md">
          <div class="p-dot" style="background:var(--purple)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--purple)">19 Mar</div>
            <div class="p-title">Kubernetes Deployment &amp; Service Exposure</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/20%20Mar%20Readme.md">
          <div class="p-dot" style="background:var(--purple)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--purple)">20 Mar</div>
            <div class="p-title">Docker &amp; Portainer GUI Setup</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/25%20Mar%20Task%20Readme.md">
          <div class="p-dot" style="background:var(--purple)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--purple)">25 Mar</div>
            <div class="p-title">Apache Web App on Kubernetes</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Mar%20Task%20Readme.md">
          <div class="p-dot" style="background:var(--purple)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--purple)">27 Mar</div>
            <div class="p-title">Imperative vs Declarative Deployment</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
      </div>
    </div>

    <!-- April -->
    <div class="month-group">
      <div class="month-label">
        <div class="month-dot" style="background:var(--red)"></div>
        <span class="month-name">April</span>
        <div class="month-line"></div>
      </div>
      <div class="practical-row">
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/1%20Apr%20Readme.md">
          <div class="p-dot" style="background:var(--red)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--red)">1 Apr</div>
            <div class="p-title">Jenkins on Docker (Apple Silicon)</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/7%20Apr%20Readme.md">
          <div class="p-dot" style="background:var(--red)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--red)">7 Apr</div>
            <div class="p-title">Git &amp; GitHub SSH Authentication Setup</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/9%20Apr%20Readme.md">
          <div class="p-dot" style="background:var(--red)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--red)">9 Apr</div>
            <div class="p-title">Git Practical — Branching &amp; Merging</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
        <a class="practical-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Apr%20Task%20Readme.md">
          <div class="p-dot" style="background:var(--red)"></div>
          <div style="flex:1;min-width:0">
            <div class="p-date" style="color:var(--red)">10 Apr</div>
            <div class="p-title">FastAPI + GitHub Actions + Docker Hub CD</div>
          </div>
          <div class="p-arrow">↗</div>
        </a>
      </div>
    </div>
  </div>

  <!-- ═══ TECHNOLOGIES ═══ -->
  <div class="section">
    <div class="section-label">
      <div class="section-label-line"></div>
      <div class="section-label-text">
        <div class="section-icon-wrap">🏷️</div>
        <span class="section-name">Technologies Covered</span>
      </div>
      <div class="section-label-line"></div>
    </div>
    <div class="tech-wall">
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--blue)"></div>Docker</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--blue)"></div>Docker Compose</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--blue)"></div>Docker Hub</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--blue)"></div>Docker Swarm</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--purple)"></div>Kubernetes (k3d)</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--purple)"></div>Portainer</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--red)"></div>Jenkins</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--red)"></div>GitHub Actions</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--orange)"></div>Ansible</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--green)"></div>SonarQube</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--green)"></div>Nginx</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--cyan)"></div>Alpine Linux</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--cyan)"></div>Vagrant</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--cyan)"></div>VirtualBox</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--orange)"></div>PostgreSQL</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--orange)"></div>Flask</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--green)"></div>Node.js</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--green)"></div>FastAPI</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--orange)"></div>Maven</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--purple)"></div>Multi-stage Build</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--blue)"></div>Overlay Network</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--blue)"></div>Macvlan / IPVLAN</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--red)"></div>SSH Key Auth</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--red)"></div>Git</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--orange)"></div>CI/CD</div>
      <div class="tech-pill"><div class="tech-pill-dot" style="background:var(--green)"></div>IaC</div>
    </div>
  </div>

</main>

<footer>
  <div class="footer-inner">
    <div class="footer-logo">Daksh Mehrotra</div>
    <p>Containerization &amp; DevOps Lab · SAP 500125960 · Roll R2142231932 · Batch 2 CCVT · B.Tech</p>
    <a class="footer-link" href="https://github.com/DakshMehrotra/Containerization-and-DevOps" target="_blank">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      View on GitHub
    </a>
  </div>
</footer>

<script>
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
function rand(a,b){return a+Math.random()*(b-a)}
for(let i=0;i<60;i++){particles.push({x:rand(0,1)*1,y:rand(0,1)*1,vx:rand(-0.0001,0.0001),vy:rand(-0.0002,-0.00005),r:rand(1,2.5),a:rand(0.1,0.5)})}
function draw(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.y<0)p.y=1;if(p.x<0)p.x=1;if(p.x>1)p.x=0;
    ctx.beginPath();
    ctx.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(121,192,255,${p.a})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

document.querySelectorAll('.exp-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    const cx=r.width/2,cy=r.height/2;
    const rx=(y-cy)/cy*6,ry=-(x-cx)/cx*6;
    card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    card.style.setProperty('--mx',`${(x/r.width*100).toFixed(1)}%`);
    card.style.setProperty('--my',`${(y/r.height*100).toFixed(1)}%`);
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
  });
});
</script>
</body>
</html>
