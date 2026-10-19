---
title: "Toward Deterministic Coordination in Multi-Agent Language Systems"
abstract: "Multi-agent systems built on large language models are powerful but notoriously hard to reproduce. We formalize agent collaboration as a constrained state machine, show that a small set of transition invariants is sufficient to bound divergence between runs, and report preliminary results on long-horizon software tasks. This is a placeholder abstract."
pubDate: 2026-10-12
authors: ["Zetesis AI Research"]
tags: ["Multi-Agent Systems", "Reproducibility"]
links:
  code: "https://github.com/ZetesisAI"
---

## 1. Introduction

Language-model agents that cooperate on a task can solve problems no single call can. The same flexibility makes them hard to study: two runs from the same prompt can take very different paths, so it is hard to tell a real improvement from noise.

We treat a team of agents as a system whose state $s_t \in \mathcal{S}$ changes through a transition function

$$
s_{t+1} = \delta(s_t, a_t), \qquad a_t \sim \pi_\theta(\cdot \mid s_t),
$$

where $\pi_\theta$ is the joint policy of the agents. Our goal is to bound how far two runs can drift apart.

## 2. Bounding divergence

Let $d(\cdot,\cdot)$ be a metric on $\mathcal{S}$. We say the system is *$\varepsilon$-stable* if, for any two runs that start in the same state,

$$
\mathbb{E}\left[ d\big(s_T^{(1)}, s_T^{(2)}\big) \right] \le \varepsilon \, T.
$$

**Proposition 1.** If every transition satisfies the invariants $I_1, \dots, I_k$ and each invariant reduces branching by a factor of at least $\gamma > 1$, the expected number of distinct trajectories of length $T$ is $O\!\left(b^T / \gamma^{kT}\right)$, where $b$ is the unconstrained branching factor.

## 3. Preliminary results

| Setting | Task success | Run-to-run agreement |
|---|---|---|
| Free-form prompting | 71.2% | 38.5% |
| State machine (ours) | 74.9% | 91.3% |

*All numbers are placeholders.*

## 4. Conclusion

Constraining *how* agents talk to each other, not *what* they say, makes multi-agent systems measurably more reproducible while keeping their ability to solve problems.
