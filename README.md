# Baseline Scanner

Baseline Scanner is a CLI tool (and optionally plugin) that scans your web code and warns when it detects usage of web features that are *not* part of the Baseline (i.e. features that may not yet be stable or universally supported by browsers).

## Features

- Parse JavaScript files and detect usage of Web APIs  
- Cross‑reference against Baseline data  
- Output warnings with file, line number, feature name  
- Provide links to documentation and alternatives  
- Future extension: ESLint plugin

## Installation 

Install Dependencies 

```bash
npm install 

chmod +x bin/cli.js

npm link

node bin/cli.js path/to/code

```

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







