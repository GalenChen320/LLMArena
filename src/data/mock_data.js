// Mock data for LLMArena

export const models = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", released: "2024-05" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", released: "2024-06" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", released: "2024-03" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google", released: "2024-02" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", released: "2024-12" },
  { id: "llama-3.1-405b", name: "Llama 3.1 405B", provider: "Meta", released: "2024-07" },
  { id: "qwen-2.5-72b", name: "Qwen 2.5 72B", provider: "Alibaba", released: "2024-09" },
  { id: "mistral-large-2", name: "Mistral Large 2", provider: "Mistral AI", released: "2024-07" },
  { id: "command-r-plus", name: "Command R+", provider: "Cohere", released: "2024-04" },
  { id: "yi-large", name: "Yi-Large", provider: "01.AI", released: "2024-05" },
  { id: "grok-2", name: "Grok-2", provider: "xAI", released: "2024-08" },
  { id: "phi-3-medium", name: "Phi-3 Medium", provider: "Microsoft", released: "2024-04" },
];

export const benchmarks = [
  {
    id: "mmlu",
    name: "MMLU",
    category: "Knowledge",
    description: "Massive Multitask Language Understanding — 57 subjects across STEM, humanities, social sciences",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "humaneval",
    name: "HumanEval",
    category: "Coding",
    description: "Code generation benchmark — 164 Python programming problems",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "mbpp",
    name: "MBPP",
    category: "Coding",
    description: "Mostly Basic Python Programming — 974 crowd-sourced tasks",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "gsm8k",
    name: "GSM8K",
    category: "Math",
    description: "Grade School Math 8K — 8,500 multi-step math word problems",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "math",
    name: "MATH",
    category: "Math",
    description: "Competition mathematics problems from AMC, AIME, etc.",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "arc-c",
    name: "ARC-Challenge",
    category: "Reasoning",
    description: "AI2 Reasoning Challenge — hard science questions requiring complex reasoning",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "hellaswag",
    name: "HellaSwag",
    category: "Reasoning",
    description: "Commonsense NLI — can the model predict the most plausible continuation?",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "truthfulqa",
    name: "TruthfulQA",
    category: "Safety",
    description: "Measures model tendency to generate truthful answers vs common misconceptions",
    maxScore: 100,
    unit: "%",
  },
  {
    id: "mt-bench",
    name: "MT-Bench",
    category: "Chat",
    description: "Multi-turn conversation benchmark judged by GPT-4",
    maxScore: 10,
    unit: "pts",
  },
  {
    id: "alpaca-eval",
    name: "AlpacaEval 2.0",
    category: "Chat",
    description: "Instruction-following evaluation with LLM-as-judge",
    maxScore: 100,
    unit: "%",
  },
];

// scores[modelId][benchmarkId] = score
export const scores = {
  "gpt-4o": {
    mmlu: 88.7, humaneval: 90.2, mbpp: 88.1, gsm8k: 95.8, math: 76.6,
    "arc-c": 96.7, hellaswag: 95.3, truthfulqa: 64.3, "mt-bench": 9.3, "alpaca-eval": 57.5,
  },
  "claude-3.5-sonnet": {
    mmlu: 88.3, humaneval: 92.0, mbpp: 90.5, gsm8k: 96.4, math: 78.3,
    "arc-c": 95.8, hellaswag: 89.0, truthfulqa: 66.1, "mt-bench": 9.4, "alpaca-eval": 60.4,
  },
  "claude-3-opus": {
    mmlu: 86.8, humaneval: 84.9, mbpp: 86.2, gsm8k: 95.0, math: 73.1,
    "arc-c": 96.4, hellaswag: 95.4, truthfulqa: 65.0, "mt-bench": 9.0, "alpaca-eval": 55.0,
  },
  "gemini-1.5-pro": {
    mmlu: 85.9, humaneval: 84.1, mbpp: 84.8, gsm8k: 91.2, math: 67.7,
    "arc-c": 94.2, hellaswag: 92.5, truthfulqa: 60.2, "mt-bench": 8.9, "alpaca-eval": 52.8,
  },
  "deepseek-v3": {
    mmlu: 88.5, humaneval: 89.1, mbpp: 87.4, gsm8k: 94.6, math: 80.9,
    "arc-c": 95.1, hellaswag: 93.8, truthfulqa: 62.8, "mt-bench": 9.1, "alpaca-eval": 56.2,
  },
  "llama-3.1-405b": {
    mmlu: 87.3, humaneval: 89.0, mbpp: 87.3, gsm8k: 96.8, math: 73.8,
    "arc-c": 93.0, hellaswag: 89.2, truthfulqa: 58.5, "mt-bench": 8.5, "alpaca-eval": 50.3,
  },
  "qwen-2.5-72b": {
    mmlu: 86.1, humaneval: 86.4, mbpp: 85.0, gsm8k: 93.1, math: 72.6,
    "arc-c": 94.8, hellaswag: 91.7, truthfulqa: 61.3, "mt-bench": 8.7, "alpaca-eval": 51.6,
  },
  "mistral-large-2": {
    mmlu: 84.0, humaneval: 83.0, mbpp: 82.5, gsm8k: 91.5, math: 65.0,
    "arc-c": 92.1, hellaswag: 90.3, truthfulqa: 59.0, "mt-bench": 8.4, "alpaca-eval": 48.7,
  },
  "command-r-plus": {
    mmlu: 75.7, humaneval: 75.0, mbpp: 73.2, gsm8k: 83.4, math: 53.8,
    "arc-c": 88.5, hellaswag: 85.6, truthfulqa: 55.2, "mt-bench": 7.8, "alpaca-eval": 42.1,
  },
  "yi-large": {
    mmlu: 82.5, humaneval: 80.3, mbpp: 79.8, gsm8k: 89.7, math: 62.1,
    "arc-c": 91.0, hellaswag: 88.4, truthfulqa: 57.8, "mt-bench": 8.1, "alpaca-eval": 46.5,
  },
  "grok-2": {
    mmlu: 87.5, humaneval: 88.2, mbpp: 86.7, gsm8k: 93.8, math: 75.2,
    "arc-c": 94.5, hellaswag: 92.0, truthfulqa: 63.5, "mt-bench": 9.0, "alpaca-eval": 54.8,
  },
  "phi-3-medium": {
    mmlu: 78.2, humaneval: 72.5, mbpp: 71.8, gsm8k: 87.6, math: 55.3,
    "arc-c": 87.2, hellaswag: 83.1, truthfulqa: 52.1, "mt-bench": 7.5, "alpaca-eval": 40.2,
  },
};

export const categories = [...new Set(benchmarks.map((b) => b.category))];
