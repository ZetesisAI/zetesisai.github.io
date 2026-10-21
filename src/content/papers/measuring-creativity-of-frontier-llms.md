---
title: "Measuring the Creativity of Frontier LLMs in Automated Research"
abstract: "Frontier LLMs are increasingly capable of conducting automated research, yet their creativity in this setting has not been systematically evaluated. We propose a set of metrics to evaluate creativity along the two dimensions of valueness and novelty. Valueness assesses whether each proposed idea is useful, while novelty is evaluated from three perspectives: whether the same idea has appeared before (Exact-Match P-Novelty), whether the modified variable or variable combination has been explored before (Variable-level P-Novelty), which reflects the breadth of research-space exploration, and whether the proposed idea is explicitly attributed to external knowledge in the model's reasoning (H-Novelty). Our evaluation shows that the models achieve relatively similar Valueness and Exact-Match P-Novelty scores, while differing substantially in Variable-level P-Novelty. H-Novelty is also consistently high among the models for which it can be evaluated. Notably, further correlation and idea-level performance analyses reveal a strong positive correlation between Variable-level P-Novelty and research performance."
pubDate: 2026-10-20
authors: ["ZetesisAI Team"]
tags: ["Automated Research", "Creativity", "Evaluation"]
---


## 1. Introduction

Scientific research is inherently a long-horizon iterative process involving idea generation, experimentation, evaluation, and analysis. Since the speed of this iterative process is constrained by human researchers, frontier LLMs are increasingly moving beyond assisting human researchers toward conducting research autonomously [[7](#ref-7), [9](#ref-9), [17](#ref-17)]. As these models become capable of conducting automated research, an important question arises: *how creative are they?* This question is critical because idea generation is a central component of scientific research, and effective research requires ideas that are both novel and valuable, which are regarded in cognitive science as the two jointly necessary components of creativity [[3](#ref-3)].

However, existing work has not systematically evaluated creativity in this setting [[14](#ref-14), [16](#ref-16)]. To address this gap, we propose a set of metrics that evaluate the creativity of LLM-based research agents along the two dimensions of valueness and novelty. Valueness assesses whether each proposed idea is useful, while novelty assesses whether it is new under different criteria. For novelty, we consider three criteria. The first determines whether the same idea has appeared in previous iterations, where two ideas are considered the same if they modify the same variable(s) to the same post-modification value(s). This criterion corresponds to Exact-Match P-Novelty. The second determines whether the modified variable or variable combination has been explored before, regardless of the specific values assigned to them. This criterion corresponds to Variable-level P-Novelty. The third determines whether the model explicitly attributes the proposed idea to specific external knowledge or references in its reasoning. This criterion corresponds to H-Novelty.

Our evaluation shows that the models achieve relatively similar scores on Valueness and Exact-Match P-Novelty, while differing substantially in Variable-level P-Novelty, which reflects the breadth of research-space exploration. H-Novelty is also consistently high among the models for which it can be evaluated. Further correlation and idea-level performance analyses show that Variable-level P-Novelty is the creativity dimension most strongly associated with research performance.

## 2. Related Work

### 2.1 Automated Research Systems

Recent automated-research systems increasingly place agents in closed propose–execute–evaluate loops. Karpathy's autoresearch provides a minimal instance of this paradigm, autonomously modifying and evaluating an LLM training program under a fixed compute budget [[7](#ref-7)]. AlphaEvolve combines LLM-based program generation with evolutionary search to discover both deployable optimizations and new algorithms [[9](#ref-9)], while Google's AI co-scientist extends iterative search to scientific hypothesis generation, including proposals that have been experimentally validated [[6](#ref-6)]. Recent work has further demonstrated the potential of autonomous research systems in optimization and frontier mathematical discovery [[13](#ref-13), [11](#ref-11), [2](#ref-2)].

### 2.2 Creativity and Research Idea Generation

Creativity is commonly understood as requiring both originality and effectiveness [[14](#ref-14)]. In scientific ideation, LLM-generated research ideas have been judged more novel than human-generated ideas, though slightly less feasible [[16](#ref-16)], while generative AI has been shown to enhance individual creativity at the expense of collective diversity [[5](#ref-5)]. Recent work further suggests that analogical reasoning can mitigate mode collapse and improve novelty and diversity [[15](#ref-15)]. Beyond these empirical measures, a recent position paper argues that genuine scientific invention requires an abductive jump from observations to novel explanatory hypotheses rather than induction or deduction alone [[19](#ref-19)].

## 3. Creativity Metrics

In this section, we first review how creativity is characterized in cognitive science, then describe the automated research setting, and finally introduce our proposed creativity metrics.

### 3.1 Creativity: Novelty and Valueness

In cognitive science, creativity is commonly characterized by two jointly necessary components: novelty and valueness [[3](#ref-3)]. Novelty concerns whether an idea departs from existing knowledge or established patterns, whereas valueness concerns whether it is useful. Novelty can be defined relative to either the creator's previous ideas or the whole of human history, corresponding to psychological novelty (P-novelty) and historical novelty (H-novelty), respectively.

### 3.2 Automated Research Setting

We consider an iterative automated research setting following the general autoresearch paradigm. The process starts from an initial research baseline. At each iteration, the model proposes a research idea together with the corresponding code modification. The proposed modification is applied to the current baseline and then evaluated. If the modification improves the current baseline, it is *kept* and incorporated into the baseline for subsequent iterations. Otherwise, it is *discarded*, and the previous baseline is retained. This process is repeated iteratively.

### 3.3 Metrics

**Valueness.** We define Valueness as the proportion of iterations with a *kept* modification:

$$
V = \frac{1}{N}\sum_{i=1}^{N} v_i,
$$

where $v_i \in \{0,1\}$, with $v_i=1$ for a *kept* modification and $v_i=0$ for a *discarded* modification.

**P-Novelty.** We define P-Novelty as the fraction of research iterations that propose ideas novel with respect to all preceding iterations:

$$
P = \frac{1}{N}\sum_{i=1}^{N} n_i,
$$

where $n_i \in \{0,1\}$, with $n_i=1$ if the idea proposed at iteration $i$ is novel relative to all preceding ideas, and $n_i=0$ otherwise. We evaluate P-Novelty at two levels of granularity: *Exact-Match P-Novelty* and *Variable-level P-Novelty*.

For *Exact-Match P-Novelty*, an idea is characterized by the variable(s) modified and their post-modification values. Two ideas are considered the same if they modify the same variable(s) to the same value(s), regardless of their pre-modification values. Let $M_i$ denote the resulting set of variable–value pairs at iteration $i$. We define

$$
n_i =
\begin{cases}
1, & M_i \neq M_j,\ \forall j<i,\\
0, & \text{otherwise}.
\end{cases}
$$

Thus, an idea is novel if the same modification has not appeared in any preceding iteration. For *Variable-level P-Novelty*, we use a coarser criterion and consider only the variable or combination of variables being modified, regardless of their post-modification values.

**H-Novelty.** We define H-Novelty as the fraction of knowledge-departing ideas among all research iterations. For each iteration, we examine the reasoning trace and classify the proposed idea as either *knowledge-following* or *knowledge-departing*. We classify the proposed idea as *knowledge-following* if the model explicitly states in its reasoning that the idea is based on a specific setting or conclusion from an existing project, paper, repository, or other external reference, and the proposed change remains within the scope supported by that reference. Otherwise, the idea is considered *knowledge-departing*. Formally,

$$
H = \frac{1}{N}\sum_{i=1}^{N} h_i,
$$

where $h_i=1$ for a knowledge-departing idea and $h_i=0$ for a knowledge-following idea.

## 4. Experiments

### 4.1 Setup

**Agent Setup.** We use Codex CLI as the agent framework with six models: GLM-5.2 [[18](#ref-18)], Kimi K3 [[8](#ref-8)], Qwen3.7-Max [[12](#ref-12)], Claude Opus 4.8 [[1](#ref-1)], GPT-5.5 [[10](#ref-10)], and DeepSeek V4 Pro [[4](#ref-4)]. We enable thinking with `max` reasoning effort, using `xhigh` for GPT, and follow the developers' recommended inference settings, referring to Hugging Face model cards where available.

**Datasets.** We adopt the research task and data provided by Karpathy's autoresearch project [[7](#ref-7)], running each model for 100 iterations.

**Experimental Hardware.** All evaluations are conducted on a single NVIDIA A100 GPU.

### 4.2 Evaluation Method

We implement an automated evaluation to compute the proposed creativity metrics for each model. For Valueness, each iteration explicitly records whether the proposed modification is kept or discarded, allowing us to compute the metric deterministically by exact matching against the recorded decisions. For the three novelty metrics, we design prompts based on the corresponding novelty criteria and use GPT-5.6-Sol with high reasoning effort for evaluation. We manually verify the resulting judgments to ensure reliability. Because raw reasoning traces are unavailable for Claude Opus 4.8 and GPT-5.5, we do not evaluate H-Novelty for these two models.

### 4.3 Main Results

<figure>

| Model | $V$ | $P_{\mathrm{E}}$ | $P_{\mathrm{V}}$ | $H$ |
|---|---:|---:|---:|---:|
| Claude Opus 4.8 | 0.24 | 0.91 | 0.40 | – |
| DeepSeek V4 Pro | 0.23 | 0.84 | 0.31 | 0.94 |
| GLM-5.2 | 0.23 | 0.90 | 0.39 | 0.85 |
| GPT-5.5 | 0.28 | 0.96 | 0.22 | – |
| Kimi K3 | 0.22 | 0.96 | **0.48** | 0.90 |
| Qwen3.7-Max | 0.24 | 0.96 | 0.42 | 0.90 |

<figcaption><strong>Table 1.</strong> Creativity metrics for the six models after 100 research iterations per model. <em>V</em> is Valueness, <em>P</em><sub>E</sub> is Exact-Match P-Novelty, <em>P</em><sub>V</sub> is Variable-level P-Novelty, and <em>H</em> is H-Novelty.</figcaption>
</figure>

Table 1 presents the creativity evaluation results. Valueness varies relatively little across models, ranging from 0.22 to 0.28, while Exact-Match P-Novelty is consistently high, ranging from 0.84 to 0.96, indicating that most proposed ideas are novel at the fine-grained modification level. In contrast, Variable-level P-Novelty shows substantially greater variation across models, ranging from 0.22 to 0.48, with Kimi K3 achieving the highest score and GPT-5.5 the lowest. H-Novelty is also generally high among the four models for which it can be evaluated, ranging from 0.85 to 0.94. Overall, the clearest difference across models lies in Variable-level P-Novelty, which reflects the breadth of research-space exploration.

### 4.4 Which Dimensions of Creativity Matter for Performance?

<figure>
<img src="/papers/creativity-progress.png" alt="Running-best validation BPB over 100 research iterations for each of the six models" />
<figcaption><strong>Figure 1.</strong> Running-best validation BPB (lower is better) over the 100 research iterations for each model. All models start from the common baseline of 0.993123. Models in the legend are ordered from top to bottom by their final improvement, from best to worst. We define final improvement as the common baseline BPB minus the final running-best validation BPB, so larger values indicate better performance.</figcaption>
</figure>

<figure>

| Metric | $r$ | $p$-value |
|---|---:|---:|
| Valueness | $-0.632$ | 0.178 |
| Exact-Match P-Novelty | 0.269 | 0.607 |
| Variable-level P-Novelty | **0.788** | 0.063 |
| H-Novelty | $-0.591$ | 0.409 |

<figcaption><strong>Table 2.</strong> Correlation between creativity metrics and final BPB improvement.</figcaption>
</figure>

Figure 1 shows the running-best validation BPB over 100 iterations. We define final improvement as the common baseline BPB minus the final running-best validation BPB (higher is better). To investigate which dimensions of creativity are important for research performance, we compute the Pearson correlation between each creativity metric and final improvement, as reported in Table 2. We observe that Variable-level P-Novelty exhibits the strongest positive correlation with final improvement ($r=0.788$), suggesting that broader research-space exploration is associated with greater performance improvement.

To further examine this relationship, we categorize the proposed ideas according to their P-Novelty and analyze their contributions to performance improvement. Variable-level novel ideas constitute 37.0% of all iterations but account for 62.8% of the total improvement. Moreover, among kept ideas, their average BPB gain is approximately three times that of ideas that are Exact-Match novel but not Variable-level novel (0.001362 versus 0.000449). These results further suggest that broader research-space exploration is associated with larger performance gains.

### 4.5 Variable-Level Selection Patterns

<figure>

| Model | Continue | Return | Longest |
|---|---:|---:|---:|
| Claude Opus 4.8 | 21 | 39 | 4 |
| DeepSeek V4 Pro | 9 | 60 | 4 |
| GLM-5.2 | 24 | 37 | 4 |
| GPT-5.5 | 64 | 14 | 13 |
| Kimi K3 | 16 | 36 | 5 |
| Qwen3.7-Max | 22 | 36 | 3 |

<figcaption><strong>Table 3.</strong> Variable-level idea generation patterns over 100 iterations. <em>Continue</em> counts proposals that modify the same set of variables as the preceding iteration; <em>Return</em> counts proposals that revisit a previously explored variable set after switching away; <em>Longest</em> denotes the maximum number of consecutive proposals modifying the same variable set.</figcaption>
</figure>

We examine how models generate ideas across research directions over 100 iterations. Table 3 summarizes the resulting variable-level idea-generation patterns. GPT-5.5 and DeepSeek V4 Pro both exhibit low Variable-level P-Novelty, but through markedly different search patterns: GPT-5.5 predominantly continues the current variable set, whereas DeepSeek V4 Pro frequently returns to previously explored sets after switching away. In contrast, Kimi K3 continues to introduce new variable sets throughout the run, while most other models increasingly concentrate on previously explored directions in later iterations. Together with the positive association between Variable-level P-Novelty and research performance, these observations further highlight the potential importance of sustained exploration of new research directions.

## 5. Conclusion

In this work, we study the creativity of frontier LLMs in automated research by proposing metrics for valueness and novelty under different criteria. Evaluating six frontier models on Karpathy's autoresearch task, we find relatively similar Valueness and Exact-Match P-Novelty across models, with similarly high H-Novelty among the four evaluable models. In contrast, Variable-level P-Novelty varies substantially, reflecting differences in research-space exploration. Further analysis shows that this dimension has the strongest positive association with research performance, suggesting that effective automated research may require exploring new regions of the research space rather than merely generating different ideas.

## Limitations

Our evaluation is currently limited to a single automated research setting, Karpathy's autoresearch task, and we do not directly test whether increasing research-space exploration leads to better performance. Future work will evaluate the proposed metrics across a broader range of automated research tasks and investigate exploration mechanisms that explicitly encourage the discovery of new research directions, allowing us to study whether broader exploration can causally improve research performance.

## References

<ol class="references">
<li id="ref-1">Anthropic. 2026a. <a href="https://www.anthropic.com/news/claude-opus-4-8">Introducing Claude Opus 4.8</a>.</li>
<li id="ref-2">Anthropic. 2026b. <a href="https://www.anthropic.com/research/riemann-zeta">Learning more about Claude's mathematical capabilities</a>. Anthropic Research. Accessed 2026-08-18.</li>
<li id="ref-3">Margaret A. Boden. 2004. <em>The Creative Mind: Myths and Mechanisms</em>, 2nd edition. Routledge.</li>
<li id="ref-4">DeepSeek-AI. 2026. <a href="https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro">DeepSeek-V4-Pro</a>. Hugging Face model card.</li>
<li id="ref-5">Anil R. Doshi and Oliver P. Hauser. 2024. <a href="https://doi.org/10.1126/sciadv.adn5290">Generative AI enhances individual creativity but reduces the collective diversity of novel content</a>. <em>Science Advances</em>, 10(28):eadn5290.</li>
<li id="ref-6">Juraj Gottweis, Wei-Hung Weng, Alexander Daryin, Tao Tu, Anil Palepu, et al. 2025. <a href="https://arxiv.org/abs/2502.18864">Towards an AI co-scientist</a>. <em>arXiv preprint arXiv:2502.18864</em>.</li>
<li id="ref-7">Andrej Karpathy. 2026. <a href="https://github.com/karpathy/autoresearch">autoresearch: AI agents running research on single-GPU LLM training automatically</a>. GitHub repository. Accessed 2026-08-17.</li>
<li id="ref-8">Moonshot AI. 2026. <a href="https://huggingface.co/moonshotai/Kimi-K3">Kimi K3</a>. Hugging Face model card.</li>
<li id="ref-9">Alexander Novikov, Ngân Vũ, Marvin Eisenberger, Emilien Dupont, Po-Sen Huang, Adam Zsolt Wagner, Sergey Shirobokov, Borislav Kozlovskii, Francisco J. R. Ruiz, Abbas Mehrabian, M. Pawan Kumar, Abigail See, Swarat Chaudhuri, George Holland, Alex Davies, Sebastian Nowozin, Pushmeet Kohli, and Matej Balog. 2025. <a href="https://arxiv.org/abs/2506.13131">AlphaEvolve: A coding agent for scientific and algorithmic discovery</a>. <em>arXiv preprint arXiv:2506.13131</em>.</li>
<li id="ref-10">OpenAI. 2026a. <a href="https://openai.com/index/introducing-gpt-5-5/">Introducing GPT-5.5</a>.</li>
<li id="ref-11">OpenAI. 2026b. An OpenAI model has disproved a central conjecture in discrete geometry. OpenAI Research. Published May 20, 2026.</li>
<li id="ref-12">Qwen Team. 2026. <a href="https://qwen.ai/apiplatform">Qwen API Platform</a>.</li>
<li id="ref-13">Recursive. 2026. First steps toward automated AI research. Published June 11, 2026.</li>
<li id="ref-14">Mark A. Runco and Garrett J. Jaeger. 2012. <a href="https://doi.org/10.1080/10400419.2012.650092">The standard definition of creativity</a>. <em>Creativity Research Journal</em>, 24(1):92–96.</li>
<li id="ref-15">Andrew Shen, Shaul Druckmann, and James Zou. 2026. <a href="https://arxiv.org/abs/2605.11258">Unlocking LLM creativity in science through analogical reasoning</a>. <em>arXiv preprint arXiv:2605.11258</em>.</li>
<li id="ref-16">Chenglei Si, Diyi Yang, and Tatsunori Hashimoto. 2025. <a href="https://openreview.net/forum?id=M23dTGWCZy">Can LLMs generate novel research ideas? A large-scale human study with 100+ NLP researchers</a>. In <em>The Thirteenth International Conference on Learning Representations</em>.</li>
<li id="ref-17">Zhangchen Xu, Junda Chen, Yue Huang, Dongfu Jiang, Jiefeng Chen, Hang Hua, Zijian Wu, Zheyuan Liu, Zexue He, Lichi Li, Shizhe Diao, Jiaxin Pei, Jinsung Yoon, Hao Zhang, Mengdi Wang, Radha Poovendran, Misha Sra, Alex Pentland, and Zichen Chen. 2026. <a href="https://arxiv.org/abs/2606.05080">AutoLab: Can frontier models solve long-horizon auto research and engineering tasks?</a> <em>arXiv preprint arXiv:2606.05080</em>.</li>
<li id="ref-18">Z.ai. 2026. <a href="https://huggingface.co/zai-org/GLM-5.2">GLM-5.2</a>. Hugging Face model card.</li>
<li id="ref-19">Tom Zahavy. 2026. <a href="https://openreview.net/forum?id=klU4737opt">Position: LLMs can't jump</a>. In <em>International Conference on Machine Learning</em>. Position paper.</li>
</ol>
