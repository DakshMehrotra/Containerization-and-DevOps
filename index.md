<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Containerization & DevOps — Daksh Mehrotra</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#020408;
  --bg2:#060d14;
  --bg3:#0a1520;
  --bg4:#0e1d2a;
  --border:rgba(0,212,255,0.08);
  --border2:rgba(0,212,255,0.18);
  --border3:rgba(0,212,255,0.35);
  --text:#e2f4ff;
  --muted:#5a8a9f;
  --muted2:#8ab4c8;
  --cyan:#00d4ff;
  --cyan2:#00a8d4;
  --green:#00ff88;
  --green2:#00cc6a;
  --purple:#b44fff;
  --orange:#ff8c00;
  --red:#ff4060;
  --yellow:#ffd700;
  --white:#ffffff;
}
html{scroll-behavior:smooth}
body{
  background:var(--bg);color:var(--text);
  font-family:'Courier New',Courier,monospace;
  font-size:14px;line-height:1.6;overflow-x:hidden;
}

/* ── SCANLINES OVERLAY ── */
body::after{
  content:'';position:fixed;inset:0;z-index:9999;pointer-events:none;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px);
}

/* ── CANVAS ── */
#matrix-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.07}
#circuit-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.15}

/* ── HERO ── */
.hero{
  position:relative;z-index:1;
  min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:60px 24px 80px;text-align:center;
  overflow:hidden;
}
.hero-glow{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 60% 50% at 50% 40%,rgba(0,212,255,0.06) 0%,transparent 70%),
    radial-gradient(ellipse 40% 30% at 20% 80%,rgba(0,255,136,0.04) 0%,transparent 60%),
    radial-gradient(ellipse 40% 30% at 80% 10%,rgba(180,79,255,0.04) 0%,transparent 60%);
}

/* terminal window */
.terminal-window{
  width:100%;max-width:720px;
  border:1px solid var(--border2);border-radius:8px;
  background:rgba(6,13,20,0.95);
  margin-bottom:40px;
  overflow:hidden;
  box-shadow:0 0 40px rgba(0,212,255,0.08),0 0 80px rgba(0,212,255,0.04);
}
.terminal-bar{
  display:flex;align-items:center;gap:8px;
  padding:10px 16px;
  background:rgba(0,212,255,0.05);
  border-bottom:1px solid var(--border);
}
.t-dot{width:12px;height:12px;border-radius:50%}
.terminal-title{flex:1;text-align:center;font-size:11px;color:var(--muted);letter-spacing:1px}
.terminal-body{padding:20px;text-align:left;font-size:13px;line-height:1.9}
.t-line{display:flex;gap:8px;align-items:flex-start;margin-bottom:2px}
.t-prompt{color:var(--green);flex-shrink:0}
.t-cmd{color:var(--cyan)}
.t-out{color:var(--muted2);padding-left:16px}
.t-val{color:var(--yellow)}
.t-comment{color:rgba(90,138,159,0.6)}
.cursor{display:inline-block;width:8px;height:14px;background:var(--cyan);animation:blink-cursor 1s steps(1) infinite;vertical-align:middle}
@keyframes blink-cursor{0%,49%{opacity:1}50%,100%{opacity:0}}

.hero-eyebrow{
  font-size:11px;letter-spacing:4px;text-transform:uppercase;
  color:var(--cyan);margin-bottom:16px;
  text-shadow:0 0 20px rgba(0,212,255,0.5);
}

.hero-title{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  font-size:clamp(36px,6vw,72px);
  font-weight:900;line-height:1.05;letter-spacing:-2px;
  margin-bottom:8px;
}
.hero-title .w1{
  display:block;
  background:linear-gradient(90deg,var(--cyan),var(--white) 40%,var(--cyan));
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shine 4s linear infinite;
}
.hero-title .w2{
  display:block;
  background:linear-gradient(90deg,var(--green),var(--cyan) 50%,var(--purple));
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shine 3s linear infinite reverse;
}
@keyframes shine{0%{background-position:0% center}100%{background-position:200% center}}

.hero-sub{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  font-size:15px;color:var(--muted2);max-width:560px;margin:20px auto 36px;line-height:1.7;
}

/* glitch badge */
.glitch-badge{
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(0,212,255,0.05);
  border:1px solid var(--border2);
  padding:8px 20px;border-radius:4px;
  font-size:11px;color:var(--cyan);letter-spacing:2px;text-transform:uppercase;
  margin-bottom:40px;position:relative;overflow:hidden;
}
.glitch-badge::before{
  content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(0,212,255,0.12),transparent);
  animation:sweep 3s ease-in-out infinite;
}
@keyframes sweep{0%{left:-100%}100%{left:150%}}
.live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);
  box-shadow:0 0 0 0 rgba(0,255,136,0.4);animation:ripple 2s infinite}
@keyframes ripple{0%{box-shadow:0 0 0 0 rgba(0,255,136,0.4)}70%{box-shadow:0 0 0 8px rgba(0,255,136,0)}100%{box-shadow:0 0 0 0 rgba(0,255,136,0)}}

/* stats HUD */
.hud{
  display:flex;justify-content:center;flex-wrap:wrap;gap:0;
  border:1px solid var(--border2);border-radius:6px;
  overflow:hidden;background:rgba(0,212,255,0.03);
  max-width:600px;margin:0 auto;
}
.hud-cell{
  padding:18px 36px;text-align:center;
  border-right:1px solid var(--border);
  position:relative;
}
.hud-cell:last-child{border-right:none}
.hud-cell::before{
  content:attr(data-label);
  display:block;font-size:9px;color:var(--cyan);
  letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;
}
.hud-val{
  font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:30px;font-weight:900;letter-spacing:-1px;
  color:var(--white);text-shadow:0 0 20px rgba(0,212,255,0.4);
}
.hud-unit{font-size:12px;color:var(--cyan);margin-left:2px}

.scroll-pulse{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:6px;
  color:var(--muted);font-size:10px;letter-spacing:2px;text-transform:uppercase;
}
.scroll-chevrons{display:flex;flex-direction:column;gap:2px;align-items:center}
.ch{
  width:14px;height:14px;border-right:1.5px solid;border-bottom:1.5px solid;
  transform:rotate(45deg);
}
.ch:nth-child(1){border-color:rgba(0,212,255,0.2);animation:fade-ch 1.5s 0s infinite}
.ch:nth-child(2){border-color:rgba(0,212,255,0.5);animation:fade-ch 1.5s 0.15s infinite}
.ch:nth-child(3){border-color:rgba(0,212,255,0.8);animation:fade-ch 1.5s 0.3s infinite}
@keyframes fade-ch{0%,100%{opacity:0.3}50%{opacity:1}}

/* ── MAIN ── */
main{position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:80px 24px 100px}

/* ── SECTION HEADER ── */
.sec-head{
  display:flex;align-items:center;gap:16px;
  margin-bottom:36px;
}
.sec-head-left{
  display:flex;align-items:center;gap:12px;flex-shrink:0;
}
.sec-number{
  font-size:9px;color:var(--cyan);letter-spacing:2px;
  border:1px solid var(--border2);padding:3px 8px;border-radius:2px;
}
.sec-name{
  font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:20px;font-weight:800;color:var(--white);letter-spacing:-0.3px;
}
.sec-name span{color:var(--cyan)}
.sec-line{flex:1;height:1px;background:linear-gradient(90deg,var(--border2),transparent)}
.sec-count{
  font-size:10px;color:var(--cyan);letter-spacing:1px;
  border:1px solid var(--border);padding:3px 10px;border-radius:20px;
  background:rgba(0,212,255,0.04);flex-shrink:0;
}

/* ── EXP CARDS ── */
.exp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px}

.exp-card{
  position:relative;
  background:rgba(6,13,20,0.9);
  border:1px solid var(--border);
  border-radius:6px;padding:0;
  text-decoration:none;color:inherit;
  display:flex;flex-direction:column;
  overflow:hidden;
  transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s;
  cursor:pointer;
  transform-style:preserve-3d;
}
.exp-card:hover{
  border-color:var(--card-accent,var(--cyan));
  box-shadow:0 0 30px rgba(var(--card-glow,0,212,255),0.12),0 0 60px rgba(var(--card-glow,0,212,255),0.06);
  transform:translateY(-4px);
}

/* accent bar */
.exp-bar{height:2px;background:var(--card-accent,var(--cyan));opacity:0.7;transition:opacity 0.3s}
.exp-card:hover .exp-bar{opacity:1}

/* card inner */
.exp-inner{padding:24px;flex:1;display:flex;flex-direction:column}

.exp-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.exp-num-badge{
  font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--card-accent,var(--cyan));
  border:1px solid currentColor;padding:3px 10px;border-radius:2px;
  opacity:0.8;
}
.exp-icon{
  width:40px;height:40px;border-radius:6px;
  border:1px solid var(--border2);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;
  background:rgba(0,212,255,0.04);
  transition:background 0.3s;
}
.exp-card:hover .exp-icon{background:rgba(0,212,255,0.08)}

.exp-card h3{
  font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:15px;font-weight:700;color:var(--white);
  line-height:1.35;margin-bottom:10px;
}
.exp-card p{
  font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:12.5px;color:var(--muted2);line-height:1.65;
  flex:1;margin-bottom:20px;
}

/* code snippet */
.exp-snippet{
  background:rgba(0,0,0,0.4);border:1px solid var(--border);
  border-radius:4px;padding:10px 14px;margin-bottom:18px;
  font-size:11px;color:var(--green);line-height:1.6;
  overflow:hidden;
}
.exp-snippet .ps{color:var(--cyan);margin-right:6px}
.exp-snippet .cmd{color:var(--yellow)}
.exp-snippet .flag{color:var(--purple)}
.exp-snippet .arg{color:var(--muted2)}

.exp-footer{display:flex;align-items:center;justify-content:space-between}
.exp-tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{
  font-size:10px;font-weight:700;letter-spacing:0.5px;
  padding:3px 9px;border-radius:3px;border:1px solid;font-family:inherit;
}
.tag-cyan{background:rgba(0,212,255,0.07);color:#00d4ff;border-color:rgba(0,212,255,0.2)}
.tag-green{background:rgba(0,255,136,0.07);color:#00ff88;border-color:rgba(0,255,136,0.2)}
.tag-purple{background:rgba(180,79,255,0.07);color:#b44fff;border-color:rgba(180,79,255,0.2)}
.tag-orange{background:rgba(255,140,0,0.07);color:#ff8c00;border-color:rgba(255,140,0,0.2)}
.tag-red{background:rgba(255,64,96,0.07);color:#ff4060;border-color:rgba(255,64,96,0.2)}
.tag-yellow{background:rgba(255,215,0,0.07);color:#ffd700;border-color:rgba(255,215,0,0.2)}
.tag-gray{background:rgba(90,138,159,0.07);color:#8ab4c8;border-color:rgba(90,138,159,0.2)}

.exp-link-btn{
  display:flex;align-items:center;gap:6px;
  font-size:10px;color:var(--card-accent,var(--cyan));
  letter-spacing:1px;text-transform:uppercase;
  border:1px solid currentColor;padding:5px 12px;border-radius:3px;
  opacity:0;flex-shrink:0;
  transition:opacity 0.2s,background 0.2s;
}
.exp-card:hover .exp-link-btn{opacity:1}
.exp-link-btn:hover{background:rgba(0,212,255,0.1)}

/* card color variants */
.cv-cyan{--card-accent:#00d4ff;--card-glow:0,212,255}
.cv-green{--card-accent:#00ff88;--card-glow:0,255,136}
.cv-purple{--card-accent:#b44fff;--card-glow:180,79,255}
.cv-orange{--card-accent:#ff8c00;--card-glow:255,140,0}
.cv-red{--card-accent:#ff4060;--card-glow:255,64,96}
.cv-yellow{--card-accent:#ffd700;--card-glow:255,215,0}

/* ── ASSIGN ── */
.assign-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(460px,1fr));gap:16px}
.assign-card{
  position:relative;background:rgba(6,13,20,0.9);
  border:1px solid rgba(255,140,0,0.15);border-radius:6px;
  padding:0;text-decoration:none;color:inherit;overflow:hidden;
  transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s;
}
.assign-card:hover{
  border-color:rgba(255,140,0,0.4);transform:translateY(-4px);
  box-shadow:0 0 30px rgba(255,140,0,0.1);
}
.assign-inner{padding:28px}

/* ── PRACTICALS ── */
.month-block{margin-bottom:40px}
.month-head{
  display:flex;align-items:center;gap:12px;margin-bottom:16px;
}
.month-hex{
  width:32px;height:32px;display:flex;align-items:center;justify-content:center;
  position:relative;flex-shrink:0;
}
.month-hex::before{
  content:'';position:absolute;inset:0;
  clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  background:var(--m-color,var(--cyan));opacity:0.15;
}
.month-hex-txt{font-size:10px;font-weight:700;color:var(--m-color,var(--cyan));position:relative;z-index:1}
.month-title{font-size:11px;font-weight:700;letter-spacing:3px;color:var(--m-color,var(--cyan));text-transform:uppercase}
.month-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--m-color,var(--cyan)),transparent);opacity:0.2}

.p-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.p-card{
  background:rgba(6,13,20,0.7);border:1px solid var(--border);
  border-radius:4px;padding:12px 14px;
  text-decoration:none;color:inherit;
  display:flex;align-items:flex-start;gap:10px;
  transition:border-color 0.2s,background 0.2s,transform 0.15s;
  position:relative;overflow:hidden;
}
.p-card:hover{border-color:var(--m-color,var(--cyan));background:rgba(0,212,255,0.03);transform:translateY(-1px)}
.p-card::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:2px;
  background:var(--m-color,var(--cyan));opacity:0;transition:opacity 0.2s;
}
.p-card:hover::before{opacity:1}
.p-num{
  font-size:9px;color:var(--m-color,var(--cyan));letter-spacing:1px;
  margin-bottom:3px;font-weight:700;text-transform:uppercase;
}
.p-ttl{
  font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:12px;color:var(--text);font-weight:500;line-height:1.4;
}
.p-dot-col{width:6px;height:6px;border-radius:50%;background:var(--m-color,var(--cyan));margin-top:5px;flex-shrink:0;opacity:0.6}
.p-arr{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:12px;color:var(--muted);opacity:0;transition:opacity 0.2s}
.p-card:hover .p-arr{opacity:1}

/* ── TECH MATRIX ── */
.tech-matrix{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;
}
.tech-item{
  background:rgba(0,0,0,0.4);border:1px solid var(--border);
  border-radius:4px;padding:10px 14px;
  display:flex;align-items:center;gap:8px;
  transition:border-color 0.2s,background 0.2s;cursor:default;
  position:relative;overflow:hidden;
}
.tech-item:hover{border-color:var(--t-col,var(--cyan));background:rgba(0,212,255,0.04)}
.tech-item::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
  background:var(--t-col,var(--cyan));opacity:0;transition:opacity 0.2s;
}
.tech-item:hover::after{opacity:0.5}
.tech-dot{width:5px;height:5px;border-radius:50%;background:var(--t-col,var(--cyan));flex-shrink:0}
.tech-name{font-size:11px;font-weight:700;color:var(--text);letter-spacing:0.3px}

/* ── FOOTER ── */
footer{
  position:relative;z-index:1;
  border-top:1px solid var(--border);padding:48px 24px;
}
.footer-inner{max-width:900px;margin:0 auto}
.footer-term{
  background:rgba(6,13,20,0.9);border:1px solid var(--border2);
  border-radius:6px;padding:24px;margin-bottom:24px;
  font-size:12px;line-height:2;
}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.footer-copy{font-size:11px;color:var(--muted);letter-spacing:0.5px}
.footer-link{
  display:inline-flex;align-items:center;gap:8px;
  color:var(--cyan);text-decoration:none;font-size:11px;letter-spacing:1px;text-transform:uppercase;
  border:1px solid var(--border2);padding:8px 20px;border-radius:3px;
  transition:all 0.2s;background:rgba(0,212,255,0.03);
}
.footer-link:hover{background:rgba(0,212,255,0.08);border-color:var(--cyan)}

@media(max-width:700px){
  .hero-title{font-size:34px;letter-spacing:-1px}
  .hud-cell{padding:14px 20px}
  main{padding:48px 16px 60px}
  .exp-grid,.assign-grid,.tech-matrix{grid-template-columns:1fr}
  .p-grid{grid-template-columns:1fr}
  .terminal-window{display:none}
}
</style>
</head>
<body>

<canvas id="matrix-canvas"></canvas>
<canvas id="circuit-canvas"></canvas>

<!-- ═══════════ HERO ═══════════ -->
<section class="hero">
<div class="hero-glow"></div>

<div class="terminal-window">
  <div class="terminal-bar">
    <div class="t-dot" style="background:#ff5f57"></div>
    <div class="t-dot" style="background:#ffbd2e"></div>
    <div class="t-dot" style="background:#28ca42"></div>
    <span class="terminal-title">daksh@devops-lab ~ bash</span>
  </div>
  <div class="terminal-body">
    <div class="t-line"><span class="t-prompt">daksh@lab:~$</span><span class="t-cmd"> cat student_info.json</span></div>
    <div class="t-line"><span class="t-out">{ <span class="t-val">"name"</span>: <span class="t-val">"Daksh Mehrotra"</span>, <span class="t-val">"sap"</span>: <span class="t-val">"500125960"</span> }</span></div>
    <div class="t-line"><span class="t-out">{ <span class="t-val">"roll"</span>: <span class="t-val">"R2142231932"</span>, <span class="t-val">"batch"</span>: <span class="t-val">"2 CCVT"</span> }</span></div>
    <div class="t-line" style="margin-top:8px"><span class="t-prompt">daksh@lab:~$</span><span class="t-cmd"> docker ps -a | grep lab</span></div>
    <div class="t-line"><span class="t-out" style="color:var(--green)">✔ experiments: <span class="t-val">12 RUNNING</span> &nbsp;|&nbsp; practicals: <span class="t-val">28 COMPLETED</span></span></div>
    <div class="t-line" style="margin-top:8px"><span class="t-prompt">daksh@lab:~$</span><span class="t-cmd"> kubectl get all --namespace=devops-lab</span></div>
    <div class="t-line"><span class="t-out">STATUS: <span style="color:var(--green)">All systems operational</span> &nbsp;<span class="t-comment">// academic year 2024-25</span></span></div>
    <div class="t-line" style="margin-top:8px"><span class="t-prompt">daksh@lab:~$</span><span class="cursor"></span></div>
  </div>
</div>

<p class="hero-eyebrow">// Containerization &amp; DevOps — Lab Repository</p>
<h1 class="hero-title">
  <span class="w1">CONTAINERIZATION</span>
  <span class="w2">&amp; DEVOPS LAB</span>
</h1>
<p class="hero-sub">Complete academic documentation of Docker, Kubernetes, CI/CD pipelines, Infrastructure as Code, and modern DevOps toolchains — built, tested, and deployed.</p>

<div class="glitch-badge">
  <span class="live-dot"></span>
  Academic Submission · B.Tech · 2024–25
</div>

<div class="hud">
  <div class="hud-cell" data-label="Experiments"><span class="hud-val">12</span></div>
  <div class="hud-cell" data-label="Assignments"><span class="hud-val">02</span></div>
  <div class="hud-cell" data-label="Practicals"><span class="hud-val">28<span class="hud-unit">+</span></span></div>
  <div class="hud-cell" data-label="Technologies"><span class="hud-val">15<span class="hud-unit">+</span></span></div>
</div>

<div class="scroll-pulse">
  <span>Scroll</span>
  <div class="scroll-chevrons"><div class="ch"></div><div class="ch"></div><div class="ch"></div></div>
</div>
</section>

<!-- ═══════════ MAIN ═══════════ -->
<main>

<!-- ───── EXPERIMENTS ───── -->
<div class="sec-head">
  <div class="sec-head-left">
    <span class="sec-number">01</span>
    <span class="sec-name">Lab <span>Experiments</span></span>
  </div>
  <div class="sec-line"></div>
  <span class="sec-count">12 modules</span>
</div>

<div class="exp-grid" style="margin-bottom:80px">

  <a class="exp-card cv-cyan" href="./Experiment-1/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-01</span>
        <div class="exp-icon">🖥️</div>
      </div>
      <h3>Virtual Machines vs Containers</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">vagrant</span> <span class="flag">up</span> <span class="arg">--provider virtualbox</span></div>
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">run</span> <span class="arg">-p 80:80 nginx:alpine</span></div>
      </div>
      <p>Infrastructure showdown — provisioned Ubuntu VMs via Vagrant + VirtualBox and replicated identical services with Docker. Measured isolation, boot time, and resource delta between both paradigms.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-cyan">Vagrant</span><span class="tag tag-cyan">VirtualBox</span><span class="tag tag-gray">Nginx</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-green" href="./Experiment-2/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-02</span>
        <div class="exp-icon">🐳</div>
      </div>
      <h3>Docker Installation &amp; Container Lifecycle</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">pull</span> <span class="arg">nginx</span> <span class="arg">&amp;&amp; docker run -d -p 8080:80</span></div>
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">stop</span> <span class="arg">$(docker ps -q)</span> <span class="arg">&amp;&amp; docker rm</span></div>
      </div>
      <p>Mastered Docker fundamentals — pulling images, port-mapped deployments, diagnosing port conflicts, and the full container start → stop → remove lifecycle from CLI.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-green">Docker CLI</span><span class="tag tag-gray">Port Mapping</span><span class="tag tag-gray">Lifecycle</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-purple" href="./Experiment-3/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-03</span>
        <div class="exp-icon">📦</div>
      </div>
      <h3>Custom Docker Images — Ubuntu &amp; Alpine</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">build</span> <span class="arg">-t nginx-ubuntu:500125960 .</span></div>
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">build</span> <span class="arg">-t nginx-alpine:500125960 -f</span> <span class="arg">Dockerfile.alpine .</span></div>
      </div>
      <p>Built custom Nginx images on both Ubuntu 22.04 and Alpine Linux base. Ran three containers simultaneously on :8080, :8081, :8082 — Alpine came in 90% smaller than Ubuntu.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-purple">Dockerfile</span><span class="tag tag-cyan">Alpine</span><span class="tag tag-gray">Ubuntu</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-orange" href="./Experiment-4/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-04</span>
        <div class="exp-icon">🚀</div>
      </div>
      <h3>Dockerfile, .dockerignore &amp; Docker Hub Push</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">build</span> <span class="arg">--no-cache -t flask-app:prod .</span></div>
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">push</span> <span class="arg">dakshmehrotra/flask-app:prod</span></div>
      </div>
      <p>Full containerization pipeline: Flask (:5001) + Node.js (:3000). Implemented .dockerignore for security hardening, multi-stage builds to shrink image size, published both to Docker Hub and validated the pull cycle.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-orange">Flask</span><span class="tag tag-green">Node.js</span><span class="tag tag-cyan">Docker Hub</span><span class="tag tag-purple">Multi-stage</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-cyan" href="./Experiment-5/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-05</span>
        <div class="exp-icon">🌐</div>
      </div>
      <h3>Docker Networking, Volumes &amp; Env Variables</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">network create</span> <span class="arg">--driver bridge app-net</span></div>
        <div><span class="ps">$</span><span class="cmd">docker</span> <span class="flag">run</span> <span class="arg">-e DB_PASS=secret -v data:/app/db</span></div>
      </div>
      <p>Production config deep-dive — bridge networking, named volume persistence, secret injection via env vars, runtime overrides, and container inspection + log debugging toolchain.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-cyan">Networking</span><span class="tag tag-purple">Volumes</span><span class="tag tag-green">Env Vars</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-green" href="./Experiment-6/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-06</span>
        <div class="exp-icon">⚙️</div>
      </div>
      <h3>Docker Run vs Docker Compose</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">docker compose</span> <span class="flag">up</span> <span class="arg">-d --build</span></div>
        <div><span class="ps">$</span><span class="cmd">docker compose</span> <span class="flag">ps</span> <span class="arg">| grep running</span></div>
      </div>
      <p>Converted multi-command run workflows into clean YAML Compose definitions. Built single and multi-container apps, explored service dependency ordering and understand when Compose replaces manual container wiring.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-green">Docker Compose</span><span class="tag tag-gray">YAML</span><span class="tag tag-cyan">Orchestration</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-red" href="./Experiment-7/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-07</span>
        <div class="exp-icon">🔄</div>
      </div>
      <h3>CI/CD Pipeline — Jenkins + GitHub + Docker Hub</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">git</span> <span class="flag">push</span> <span class="arg">origin main</span> <span class="t-comment"># triggers webhook</span></div>
        <div style="color:var(--green)">→ Jenkins build #42 started → Docker push → PASS ✓</div>
      </div>
      <p>Fully automated pipeline: GitHub webhook → Jenkins → Docker build → push to Docker Hub. Required a custom ARM64 Jenkins image with embedded Docker CLI to run natively on Mac M1 Apple Silicon.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-red">Jenkins</span><span class="tag tag-gray">Webhooks</span><span class="tag tag-orange">ARM64</span><span class="tag tag-cyan">CI/CD</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-purple" href="./Experiment-9/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-09</span>
        <div class="exp-icon">🤖</div>
      </div>
      <h3>Ansible Automation with Docker</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">ansible-playbook</span> <span class="flag">-i</span> <span class="arg">inventory deploy.yml</span></div>
        <div style="color:var(--green)">PLAY RECAP: ok=12 changed=4 unreachable=0 failed=0</div>
      </div>
      <p>Configured control node + Docker-simulated managed nodes via SSH key auth. Wrote idempotent playbooks using apt, copy, command, debug modules. IaC in practice — same playbook, identical result, every run.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-red">Ansible</span><span class="tag tag-gray">SSH</span><span class="tag tag-green">IaC</span><span class="tag tag-purple">Playbooks</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-yellow" href="./Experiment-10/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-10</span>
        <div class="exp-icon">🔍</div>
      </div>
      <h3>SonarQube: Continuous Code Quality</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">mvn</span> <span class="flag">sonar:sonar</span> <span class="arg">-Dsonar.host.url=http://localhost:9000</span></div>
        <div style="color:var(--red)">⚠ BUGS: divide-by-zero, SQL injection → GATE: FAIL</div>
      </div>
      <p>Static analysis pipeline wired into Jenkins with Quality Gate enforcement. SonarQube caught divide-by-zero and SQL injection by reading code — no execution needed. Technical debt quantified at ~2 hrs. Fix → rescan → gate turns green.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-yellow">SonarQube</span><span class="tag tag-orange">Maven</span><span class="tag tag-green">Quality Gate</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <a class="exp-card cv-cyan" href="./Experiment-11/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-11</span>
        <div class="exp-icon">🐝</div>
      </div>
      <h3>Docker Orchestration — Compose → Swarm</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">docker stack deploy</span> <span class="flag">-c</span> <span class="arg">docker-compose.yml wpstack</span></div>
        <div><span class="ps">$</span><span class="cmd">docker service scale</span> <span class="arg">wpstack_wordpress=5</span> <span class="t-comment"># instant ✓</span></div>
      </div>
      <p>Migrated a WordPress + MySQL stack from Docker Compose to Docker Swarm. Demonstrated production-grade orchestration: auto-scaling 1→5 replicas, self-healing after force-killed containers, rolling updates with zero downtime, and overlay networking across the cluster.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-cyan">Docker Swarm</span><span class="tag tag-green">Self-Healing</span><span class="tag tag-purple">Overlay Net</span><span class="tag tag-gray">Rolling Update</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

  <!-- ── NEW: EXP-12 ── -->
  <a class="exp-card cv-purple" href="./Experiment-12/">
    <div class="exp-bar"></div>
    <div class="exp-inner">
      <div class="exp-meta">
        <span class="exp-num-badge">EXP-12</span>
        <div class="exp-icon">☸️</div>
      </div>
      <h3>Container Orchestration using Kubernetes</h3>
      <div class="exp-snippet">
        <div><span class="ps">$</span><span class="cmd">kubectl apply</span> <span class="flag">-f</span> <span class="arg">wordpress-deployment.yaml</span></div>
        <div><span class="ps">$</span><span class="cmd">kubectl scale</span> <span class="arg">deployment wordpress</span> <span class="flag">--replicas=4</span> <span class="t-comment"># ✓</span></div>
      </div>
      <p>Full Kubernetes lifecycle — deployed WordPress via YAML manifests, exposed with NodePort Service, scaled to 4 replicas, demonstrated self-healing, rolling updates, and rollbacks. Built a real 3-node cluster using kubeadm on Ubuntu VMs via Multipass on M1 Mac.</p>
      <div class="exp-footer">
        <div class="exp-tags">
          <span class="tag tag-purple">Kubernetes</span><span class="tag tag-cyan">kubeadm</span><span class="tag tag-green">Self-Healing</span><span class="tag tag-gray">Calico</span>
        </div>
        <span class="exp-link-btn">Open ↗</span>
      </div>
    </div>
  </a>

</div>

<!-- ───── ASSIGNMENTS ───── -->
<div class="sec-head">
  <div class="sec-head-left">
    <span class="sec-number">02</span>
    <span class="sec-name">Lab <span>Assignments</span></span>
  </div>
  <div class="sec-line"></div>
  <span class="sec-count">2 modules</span>
</div>

<div class="assign-grid" style="margin-bottom:80px">

  <a class="assign-card" href="./Assignment-1/" style="text-decoration:none;color:inherit">
    <div style="height:2px;background:linear-gradient(90deg,#ff8c00,#ff4060);opacity:0.8"></div>
    <div class="assign-inner">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
        <span style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--orange);border:1px solid rgba(255,140,0,0.3);padding:3px 10px;border-radius:2px">ASSIGN-01</span>
        <div style="font-size:22px">🗄️</div>
      </div>
      <h3 style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:16px;font-weight:700;color:var(--white);margin-bottom:10px;line-height:1.3">Containerized Web App + PostgreSQL via IPVLAN</h3>
      <div class="exp-snippet" style="margin-bottom:14px">
        <div><span class="ps">$</span><span class="cmd">docker compose</span> <span class="flag">up</span> <span class="arg">-d --build</span> <span class="t-comment"># ipvlan config</span></div>
        <div style="color:var(--green)">Network: ipvlan mode l2 | subnet 192.168.1.0/24</div>
      </div>
      <p style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;color:var(--muted2);line-height:1.65;margin-bottom:18px">Orchestrated a full-stack application with PostgreSQL using Docker Compose. Configured a custom IPVLAN network for direct physical network integration, named volumes for database durability, and complete service isolation.</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        <span class="tag tag-orange">PostgreSQL</span><span class="tag tag-orange">IPVLAN</span><span class="tag tag-cyan">Docker Compose</span><span class="tag tag-purple">Named Volumes</span>
      </div>
    </div>
  </a>

  <a class="assign-card" href="./Assignment-2/" style="text-decoration:none;color:inherit">
    <div style="height:2px;background:linear-gradient(90deg,#ff8c00,#ff4060);opacity:0.8"></div>
    <div class="assign-inner">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
        <span style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--orange);border:1px solid rgba(255,140,0,0.3);padding:3px 10px;border-radius:2px">ASSIGN-02</span>
        <div style="font-size:22px">📊</div>
      </div>
      <h3 style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:16px;font-weight:700;color:var(--white);margin-bottom:10px;line-height:1.3">DevOps Team Culture &amp; Collaboration</h3>
      <div class="exp-snippet" style="margin-bottom:14px">
        <div style="color:var(--muted2)"><span class="t-comment">// slide deck analysis</span></div>
        <div><span style="color:var(--yellow)">DORA Metrics</span> <span class="t-comment">→</span> <span style="color:var(--green)">deployment_freq: 4/day | MTTR: 1hr</span></div>
      </div>
      <p style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;color:var(--muted2);line-height:1.65;margin-bottom:18px">Presentation dissecting why Dev vs Ops silos fail. Covered team topologies, DORA metrics as quantifiable proof, and Netflix as a real-world case study. Core argument: DevOps is a culture shift — not a toolset.</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        <span class="tag tag-orange">Culture</span><span class="tag tag-yellow">DORA Metrics</span><span class="tag tag-gray">Team Topologies</span><span class="tag tag-gray">Netflix Case</span>
      </div>
    </div>
  </a>

</div>

<!-- ───── PRACTICALS ───── -->
<div class="sec-head">
  <div class="sec-head-left">
    <span class="sec-number">03</span>
    <span class="sec-name">Class <span>Practicals</span></span>
  </div>
  <div class="sec-line"></div>
  <span class="sec-count">28 sessions</span>
</div>

<!-- JAN -->
<div class="month-block" style="--m-color:#00ff88">
  <div class="month-head">
    <div class="month-hex"><span class="month-hex-txt">JAN</span></div>
    <span class="month-title">January</span>
    <div class="month-rule"></div>
  </div>
  <div class="p-grid">
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/21%20Jan%20Readme.md" style="--m-color:#00ff88">
      <div class="p-dot-col"></div><div><div class="p-num">21 JAN</div><div class="p-ttl">DevOps Fundamentals &amp; Setup</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/22%20Jan%20Readme.md" style="--m-color:#00ff88">
      <div class="p-dot-col"></div><div><div class="p-num">22 JAN</div><div class="p-ttl">Docker Basics &amp; Container Management</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/23%20Jan%20Readme.md" style="--m-color:#00ff88">
      <div class="p-dot-col"></div><div><div class="p-num">23 JAN</div><div class="p-ttl">Networking &amp; Multi-Container Basics</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Jan%20Readme.md" style="--m-color:#00ff88">
      <div class="p-dot-col"></div><div><div class="p-num">27 JAN</div><div class="p-ttl">Docker Volumes &amp; Persistent Storage</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/28%20Jan%20Readme.md" style="--m-color:#00ff88">
      <div class="p-dot-col"></div><div><div class="p-num">28 JAN</div><div class="p-ttl">Docker Compose &amp; Multi-Service Deploy</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/30%20Jan%20Readme.md" style="--m-color:#00ff88">
      <div class="p-dot-col"></div><div><div class="p-num">30 JAN</div><div class="p-ttl">Dockerfile Creation &amp; Image Building</div></div><div class="p-arr">↗</div>
    </a>
  </div>
</div>

<!-- FEB -->
<div class="month-block" style="--m-color:#00d4ff">
  <div class="month-head">
    <div class="month-hex"><span class="month-hex-txt">FEB</span></div>
    <span class="month-title">February</span>
    <div class="month-rule"></div>
  </div>
  <div class="p-grid">
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/3%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">3 FEB</div><div class="p-ttl">Docker Installation &amp; Nginx Deployment</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/4%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">4 FEB</div><div class="p-ttl">Docker Engine Config &amp; Remote API</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/5%20Feb(Class%20Test)%20Readme.md" style="--m-color:#ffd700;border-color:rgba(255,215,0,0.15)">
      <div class="p-dot-col" style="background:#ffd700"></div><div><div class="p-num" style="color:#ffd700">5 FEB · CLASS TEST</div><div class="p-ttl">Containerize Python SAP ID App</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">6 FEB</div><div class="p-ttl">Python App via Docker Volume Mount</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Assignment%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">6 FEB ASSIGN</div><div class="p-ttl">C App via Docker Volume Mount</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">10 FEB</div><div class="p-ttl">C App Containerization &amp; Optimization</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Assignment%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">10 FEB ASSIGN</div><div class="p-ttl">Multi-Stage Build for Java App</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">11 FEB</div><div class="p-ttl">Volume Management &amp; Data Persistence</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Assignment%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">11 FEB ASSIGN</div><div class="p-ttl">Volume Backup, Restore &amp; TAR Archives</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/12%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">12 FEB</div><div class="p-ttl">Volumes, Bind Mounts, tmpfs &amp; MySQL</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/18%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">18 FEB</div><div class="p-ttl">Bridge, Custom Network &amp; Container Comms</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/20%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">20 FEB</div><div class="p-ttl">Docker Swarm, Overlay &amp; Macvlan</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/25%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">25 FEB</div><div class="p-ttl">Docker Compose — Nginx &amp; WordPress Stack</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/26%20Feb%20Readme.md" style="--m-color:#00d4ff">
      <div class="p-dot-col"></div><div><div class="p-num">26 FEB</div><div class="p-ttl">Scaling Services with Docker Compose</div></div><div class="p-arr">↗</div>
    </a>
  </div>
</div>

<!-- MAR -->
<div class="month-block" style="--m-color:#b44fff">
  <div class="month-head">
    <div class="month-hex"><span class="month-hex-txt">MAR</span></div>
    <span class="month-title">March</span>
    <div class="month-rule"></div>
  </div>
  <div class="p-grid">
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/18%20Mar%20Readme.md" style="--m-color:#b44fff">
      <div class="p-dot-col"></div><div><div class="p-num">18 MAR</div><div class="p-ttl">Kubernetes Setup via k3d (Mac M1)</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/19%20Mar%20readme.md" style="--m-color:#b44fff">
      <div class="p-dot-col"></div><div><div class="p-num">19 MAR</div><div class="p-ttl">Kubernetes Deployment &amp; Service Exposure</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/20%20Mar%20Readme.md" style="--m-color:#b44fff">
      <div class="p-dot-col"></div><div><div class="p-num">20 MAR</div><div class="p-ttl">Docker &amp; Portainer GUI Management</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/25%20Mar%20Task%20Readme.md" style="--m-color:#b44fff">
      <div class="p-dot-col"></div><div><div class="p-num">25 MAR</div><div class="p-ttl">Apache Web App on Kubernetes</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Mar%20Task%20Readme.md" style="--m-color:#b44fff">
      <div class="p-dot-col"></div><div><div class="p-num">27 MAR</div><div class="p-ttl">Imperative vs Declarative Deployment</div></div><div class="p-arr">↗</div>
    </a>
  </div>
</div>

<!-- APR -->
<div class="month-block" style="--m-color:#ff4060">
  <div class="month-head">
    <div class="month-hex"><span class="month-hex-txt">APR</span></div>
    <span class="month-title">April</span>
    <div class="month-rule"></div>
  </div>
  <div class="p-grid">
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/1%20Apr%20Readme.md" style="--m-color:#ff4060">
      <div class="p-dot-col"></div><div><div class="p-num">1 APR</div><div class="p-ttl">Jenkins on Docker (Apple Silicon)</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/7%20Apr%20Readme.md" style="--m-color:#ff4060">
      <div class="p-dot-col"></div><div><div class="p-num">7 APR</div><div class="p-ttl">Git &amp; GitHub SSH Authentication Setup</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/9%20Apr%20Readme.md" style="--m-color:#ff4060">
      <div class="p-dot-col"></div><div><div class="p-num">9 APR</div><div class="p-ttl">Git Practical — Branching &amp; Merging</div></div><div class="p-arr">↗</div>
    </a>
    <a class="p-card" href="https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Apr%20Task%20Readme.md" style="--m-color:#ff4060">
      <div class="p-dot-col"></div><div><div class="p-num">10 APR</div><div class="p-ttl">FastAPI + GitHub Actions + Docker Hub CD</div></div><div class="p-arr">↗</div>
    </a>
  </div>
</div>

<!-- ───── TECH MATRIX ───── -->
<div class="sec-head" style="margin-top:80px">
  <div class="sec-head-left">
    <span class="sec-number">04</span>
    <span class="sec-name">Tech <span>Stack</span></span>
  </div>
  <div class="sec-line"></div>
</div>

<div class="tech-matrix">
  <div class="tech-item" style="--t-col:#00d4ff"><div class="tech-dot"></div><span class="tech-name">Docker</span></div>
  <div class="tech-item" style="--t-col:#00d4ff"><div class="tech-dot"></div><span class="tech-name">Docker Compose</span></div>
  <div class="tech-item" style="--t-col:#00d4ff"><div class="tech-dot"></div><span class="tech-name">Docker Hub</span></div>
  <div class="tech-item" style="--t-col:#00d4ff"><div class="tech-dot"></div><span class="tech-name">Docker Swarm</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Kubernetes</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">k3d / kubectl</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">kubeadm</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Multipass</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Calico CNI</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Portainer</span></div>
  <div class="tech-item" style="--t-col:#ff4060"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Jenkins</span></div>
  <div class="tech-item" style="--t-col:#ff4060"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">GitHub Actions</span></div>
  <div class="tech-item" style="--t-col:#ff8c00"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Ansible</span></div>
  <div class="tech-item" style="--t-col:#ffd700"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">SonarQube</span></div>
  <div class="tech-item" style="--t-col:#00ff88"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Nginx</span></div>
  <div class="tech-item" style="--t-col:#00ff88"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Alpine Linux</span></div>
  <div class="tech-item" style="--t-col:#8ab4c8"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Vagrant</span></div>
  <div class="tech-item" style="--t-col:#8ab4c8"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">VirtualBox</span></div>
  <div class="tech-item" style="--t-col:#ff8c00"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">PostgreSQL</span></div>
  <div class="tech-item" style="--t-col:#00ff88"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Flask</span></div>
  <div class="tech-item" style="--t-col:#00ff88"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Node.js / Express</span></div>
  <div class="tech-item" style="--t-col:#00ff88"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">FastAPI</span></div>
  <div class="tech-item" style="--t-col:#ff8c00"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Maven</span></div>
  <div class="tech-item" style="--t-col:#b44fff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Multi-stage Build</span></div>
  <div class="tech-item" style="--t-col:#00d4ff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Overlay Network</span></div>
  <div class="tech-item" style="--t-col:#00d4ff"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">IPVLAN / Macvlan</span></div>
  <div class="tech-item" style="--t-col:#ff4060"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">SSH Key Auth</span></div>
  <div class="tech-item" style="--t-col:#ff4060"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">Git</span></div>
  <div class="tech-item" style="--t-col:#ffd700"><div class="tech-dot" style="background:var(--t-col)"></div><span class="tech-name">IaC</span></div>
</div>

</main>

<!-- ═══════════ FOOTER ═══════════ -->
<footer>
<div class="footer-inner">
  <div class="footer-term">
    <div style="color:var(--muted);margin-bottom:8px;font-size:10px;letter-spacing:1px">// repository metadata</div>
    <div><span style="color:var(--cyan)">author</span><span style="color:var(--muted)">:</span> <span style="color:var(--yellow)">"Daksh Mehrotra"</span></div>
    <div><span style="color:var(--cyan)">sap_id</span><span style="color:var(--muted)">:</span> <span style="color:var(--green)">"500125960"</span> &nbsp;<span style="color:var(--cyan)">roll</span><span style="color:var(--muted)">:</span> <span style="color:var(--green)">"R2142231932"</span></div>
    <div><span style="color:var(--cyan)">batch</span><span style="color:var(--muted)">:</span> <span style="color:var(--yellow)">"2 CCVT"</span> &nbsp;<span style="color:var(--cyan)">program</span><span style="color:var(--muted)">:</span> <span style="color:var(--yellow)">"B.Tech CSE"</span></div>
    <div><span style="color:var(--cyan)">subject</span><span style="color:var(--muted)">:</span> <span style="color:var(--purple)">"Containerization and DevOps"</span></div>
    <div><span style="color:var(--cyan)">status</span><span style="color:var(--muted)">:</span> <span style="color:var(--green)">"academic_submission"</span> &nbsp;<span style="color:var(--muted)">// AY 2024-25</span></div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2025 Daksh Mehrotra · Academic Repository · All experiments documented</span>
    <a class="footer-link" href="https://github.com/DakshMehrotra/Containerization-and-DevOps" target="_blank">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      View on GitHub
    </a>
  </div>
</div>
</footer>

<script>
/* ── MATRIX RAIN ── */
(function(){
  const c=document.getElementById('matrix-canvas');
  const ctx=c.getContext('2d');
  let W,H,cols,drops;
  const chars='01アイウエオカキクケコサシスセソタチツテトナニヌネノ><{}[]|∑∫∞∂ABCDEF'.split('');
  function init(){
    W=c.width=window.innerWidth;H=c.height=window.innerHeight;
    cols=Math.floor(W/18);drops=Array(cols).fill(0).map(()=>-Math.random()*H/14);
  }
  init();window.addEventListener('resize',init);
  function draw(){
    ctx.fillStyle='rgba(2,4,8,0.05)';ctx.fillRect(0,0,W,H);
    ctx.font='13px Courier New';
    drops.forEach((y,i)=>{
      const ch=chars[Math.floor(Math.random()*chars.length)];
      const x=i*18;
      ctx.fillStyle=y<2?'rgba(180,255,220,0.9)':'rgba(0,212,100,0.55)';
      ctx.fillText(ch,x,y*14);
      if(y*14>H&&Math.random()>0.975)drops[i]=0;
      drops[i]+=0.4+Math.random()*0.3;
    });
  }
  setInterval(draw,60);
})();

/* ── CIRCUIT LINES ── */
(function(){
  const c=document.getElementById('circuit-canvas');
  const ctx=c.getContext('2d');
  let W,H;
  function init(){W=c.width=window.innerWidth;H=c.height=window.innerHeight}
  init();window.addEventListener('resize',init);
  const nodes=[];
  for(let i=0;i<18;i++){nodes.push({x:Math.random()*1,y:Math.random()*1,vx:(Math.random()-0.5)*0.0003,vy:(Math.random()-0.5)*0.0003})}
  function draw(){
    ctx.clearRect(0,0,W,H);
    nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>1)n.vx*=-1;if(n.y<0||n.y>1)n.vy*=-1});
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<0.22){
          const alpha=(1-d/0.22)*0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x*W,nodes[i].y*H);
          ctx.lineTo(nodes[j].x*W,nodes[j].y*H);
          ctx.strokeStyle=`rgba(0,212,255,${alpha})`;
          ctx.lineWidth=0.5;ctx.stroke();
          ctx.beginPath();ctx.arc(nodes[i].x*W,nodes[i].y*H,2,0,Math.PI*2);
          ctx.fillStyle=`rgba(0,212,255,${alpha*1.5})`;ctx.fill();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 3D TILT ── */
document.querySelectorAll('.exp-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    const rx=(y-r.height/2)/r.height*10;
    const ry=-(x-r.width/2)/r.width*10;
    card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform=''});
});

/* ── COUNT-UP ANIMATION ── */
document.querySelectorAll('.hud-val').forEach(el=>{
  const target=parseInt(el.textContent);
  if(isNaN(target))return;
  let current=0;
  const unit=el.querySelector('.hud-unit');
  const unitTxt=unit?unit.outerHTML:'';
  const step=Math.ceil(target/30);
  const iv=setInterval(()=>{
    current=Math.min(current+step,target);
    el.innerHTML=String(current).padStart(2,'0')+unitTxt;
    if(current>=target)clearInterval(iv);
  },40);
});
</script>
</body>
</html>
