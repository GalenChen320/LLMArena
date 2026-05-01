# LLMArena ⚔️

A leaderboard for comparing LLM performance across various benchmarks.

## Features

- 🏆 Interactive leaderboard with sortable rankings
- 📊 Radar & bar chart visualizations
- 🏷️ Filter by benchmark category (Knowledge, Coding, Math, Reasoning, Safety, Chat)
- 👁️ Toggle individual models on/off
- 📱 Fully responsive design

## Benchmarks

| Benchmark | Category | Description |
|-----------|----------|-------------|
| MMLU | Knowledge | 57 subjects across STEM, humanities, social sciences |
| HumanEval | Coding | 164 Python programming problems |
| MBPP | Coding | 974 crowd-sourced Python tasks |
| GSM8K | Math | 8,500 multi-step math word problems |
| MATH | Math | Competition mathematics (AMC, AIME) |
| ARC-Challenge | Reasoning | Complex science reasoning questions |
| HellaSwag | Reasoning | Commonsense natural language inference |
| TruthfulQA | Safety | Truthfulness vs common misconceptions |
| MT-Bench | Chat | Multi-turn conversation (GPT-4 judged) |
| AlpacaEval 2.0 | Chat | Instruction-following (LLM-as-judge) |

## Models

Currently tracking 12 models from 10 providers including OpenAI, Anthropic, Google, DeepSeek, Meta, Alibaba, Mistral AI, Cohere, 01.AI, xAI, and Microsoft.

> ⚠️ **Note:** All scores are simulated for demonstration purposes.

## Development

No build step required — just open `index.html` or serve with any static file server:

```bash
python -m http.server 8000
```

## License

MIT
