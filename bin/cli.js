#!/usr/bin/env node

const scanner = require("../lib/scanner");
const path = require("path");
const chalk = require("chalk");

async function run() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error(chalk.red("Usage: baseline-scanner <path>"));
    process.exit(1);
  }
  const target = args[0];
  try {
    const results = await scanner.scanPath(target);
    if (results.length === 0) {
      console.log(chalk.green("✅ No non‑Baseline features found!"));
      process.exit(0);
    } else {
      console.log(chalk.yellow(`⚠ Found ${results.length} potential non‑Baseline usages:`));
      for (let r of results) {
        console.log(`${chalk.cyan(r.file)}:${r.line} — ${chalk.bold(r.feature)} — ${r.message}`);
      }
      process.exit(2);
    }
  } catch (err) {
    console.error(chalk.red("Error during scan:"), err);
    process.exit(1);
  }
}

run();
