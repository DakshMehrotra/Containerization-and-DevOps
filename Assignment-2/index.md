# DevOps Team & Collaborations
**Topic #18 | School of Computer Science**
- Daksh Mehrotra (500125960)
- Nakul Yadav (500121882)
---

## What This Is

A presentation assignment on how DevOps teams are actually structured, how they communicate, and why the old Dev vs Ops silo model is a disaster. We cover everything from the theory side (team models, roles, DORA metrics) to real-world proof (Netflix case study).

---

## What's Covered

| # | Slide | What it's about |
|---|-------|-----------------|
| 1 | The Problem | Dev/Ops silos — the blame culture, slow releases, frequent outages |
| 2 | DevOps Teams Defined | Core definition, shared ownership, speed + stability, data-driven culture |
| 3 | Team Structure Models | Embedded, Shared Platform, Centre of Excellence |
| 4 | CI/CD Pipeline | How Plan → Code → Build → Test → Deploy → Monitor actually flows |
| 5 | Key Roles | Dev, QA, DevOps/Platform Eng, SRE, Security, PO/Scrum Master |
| 6 | Staying Aligned | Standups, ChatOps, blameless post-mortems, Kanban, shared on-call |
| 7 | Netflix Case Study | 2008 monolith crisis → 800+ microservices → 500+ deploys/day |
| 8 | Tools | GitHub, Slack, Jira, Jenkins, Docker/K8s, Grafana/Datadog |
| 9 | DORA Metrics | Deployment Frequency, Lead Time, MTTR, Change Failure Rate |
| 10 | Q&A | Blame culture, DevOps vs traditional IT, "you build it you run it" |

---

## The Core Argument

DevOps isn't a tool or a job title — it's a culture shift. The old model had Dev throwing code over a wall to Ops, Ops blaming Dev when prod broke, and everyone miserable. DevOps tears down that wall through shared ownership, automation, and obsessive communication.

The Netflix story is the best proof: they went from a single DB corruption taking down the entire platform for 3 days (2008) to 500+ deployments per day with 99.99% uptime. Not magic — just full-cycle developer teams, Chaos Monkey, and "you build it, you run it."

---

## Key Metrics (DORA Framework)

| Metric | Elite Team Target |
|--------|------------------|
| Deployment Frequency | Multiple times/day |
| Lead Time for Changes | < 1 hour |
| Mean Time to Restore | < 1 hour |
| Change Failure Rate | 0–15% |

*Source: DORA State of DevOps Report 2023 — data from 36,000+ professionals*

---

## References

- [DORA State of DevOps Report 2023](https://cloud.google.com/devops/state-of-devops) — Google Cloud
- [Team Topologies](https://teamtopologies.com) — Skelton & Pais (2019)
- [Full Cycle Developers at Netflix](https://netflixtechblog.com) — Netflix Tech Blog
- [The DevOps Handbook](https://itrevolution.com/the-devops-handbook) — Kim, Humble, Debois, Willis
- [Atlassian DevOps Guide](https://atlassian.com/devops)

---

## Contributions

| Name | Role |
|------|------|
| Daksh Mehrotra | Presenter & Researcher — Netflix case study, DORA metrics, design coordination |
| Nakul Yadav | Presenter & Researcher — Team models, toolchain analysis, Q&A prep |

50/50 split across research, content, and delivery.
