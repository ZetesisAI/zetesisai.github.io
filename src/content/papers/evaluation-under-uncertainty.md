---
title: "Evaluating Agents Under Uncertainty: Confidence Intervals for Benchmark Claims"
abstract: "Benchmark leaderboards often report single numbers without any measure of variance. We propose a lightweight protocol based on bootstrap resampling and paired comparisons that turns agent evaluation results into statistically grounded claims. This is a placeholder abstract."
pubDate: 2026-09-20
authors: ["Zetesis AI Research"]
tags: ["Evaluation", "Statistics"]
---

## 1. Motivation

A two-point gain on a benchmark of a few hundred tasks is often within run-to-run noise. Without error bars, the community cannot tell progress from luck.

## 2. Method

Given per-task scores $x_1, \dots, x_n$, we estimate the mean $\hat\mu = \frac{1}{n}\sum_{i=1}^{n} x_i$ and build a $(1-\alpha)$ bootstrap confidence interval from $B$ resamples:

$$
\mathrm{CI}_{1-\alpha} = \left[\hat\mu^{*}_{(\alpha/2)},\; \hat\mu^{*}_{(1-\alpha/2)}\right].
$$

To compare two systems $A$ and $B$ on the same tasks, we use the paired difference $\Delta_i = x_i^{A} - x_i^{B}$, which removes the shared task difficulty from the variance.

## 3. Recommendations

1. Report the number of tasks and seeds alongside every score.
2. Prefer paired comparisons when systems share a task set.
3. Treat differences whose interval contains $0$ as inconclusive.
