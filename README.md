# Baseline Scanner 🛡️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![GitHub stars](https://img.shields.io/github/stars/bunnykisss/Baseline-Scanner)](https://github.com/bunnykisss/Baseline-Scanner/stargazers)  
[![Issues](https://img.shields.io/github/issues-raw/bunnykisss/Baseline-Scanner)](https://github.com/bunnykisss/Baseline-Scanner/issues)  

> A CLI tool to detect non‑Baseline web features in your codebase  

---

## 🚀 What is Baseline Scanner?

Web development is evolving fast, and not every browser supports every new API or feature. Baseline Scanner helps you maintain compatibility and reliability by detecting usage of web APIs that lie *outside* the defined “Baseline” — warning you about potentially unstable or unsupported code early in development.

---

## ✨ Features

- Parses JavaScript / TypeScript files and scans for Web API usage  
- Cross-references usages against a Baseline database  
- Reports filename, line number, and the feature name  
- Provides documentation links and suggestions for alternatives  
- (Planned) ESLint / Babel plugin integration  
- (Planned) GitHub Action / CI integration  

---

## 🛠️ Installation & Usage

```bash
# Clone the repo
git clone https://github.com/bunnykisss/Baseline-Scanner.git
cd Baseline-Scanner

# Install dependencies
npm install

# Make the CLI executable (if needed)
chmod +x bin/cli.js
npm link

# Run on a project
baseline-scanner path/to/your/code
# or
node bin/cli.js path/to/your/code


Exaple usage 
```bash
node bin/cli.js test/sample2.js
```
```bash
Scanning: test/sample2.js (0.1 KB)
⚠ Found 1 potential non‑Baseline usages:
test/sample2.js:2 — navigator.share — Not in Baseline
```
Cheers!






