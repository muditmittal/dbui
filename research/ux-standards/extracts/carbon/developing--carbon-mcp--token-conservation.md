---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/developing/carbon-mcp/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Token conservation is the practice of reducing unnecessary context and overly
long responses so AI workflows stays fast and cost-aware without losing quality.

  Overview
  Why token conservation is important
  How Carbon MCP helps

## Overview

Tokens are the small units of text an AI model reads and generates. A user
prompt or tool result is broken into tokens before the model can work with it.

In practical terms, token usage usually comes from retrieved context and
generated output. More tokens usually means more cost, and it often means more
latency as well.

## Why token conservation is important

Token conservation is not about making prompts vague or withholding necessary
context. It is about sending the right context at the right time.

This becomes especially important when product teams move from experimentation
to a real implementation strategy. Conserving tokens helps lower operating cost
and keeps interactions more responsive.

## How Carbon MCP helps

We have introduced several patterns in Carbon MCP and in the guidance on this
site to reduce avoidable token usage.

- The
  [carbon-builder skill](/developing/carbon-mcp/onboarding-and-setup/#step-4:-adding-the-carbon-builder-skill)
  is designed to lazy-load only the Carbon guidance needed for the current task,
  rather than injecting the full guidance into every request.
- The guidance encourages multi-step tool use where each step returns only the
  information needed for that moment, rather than a large block of unrelated
  content.
- Our prompt templates explicitly ask the model not to restate or summarize tool
  output after the needed context has been retrieved.
- The sample prompts ask for exact files and a clear stop condition, which helps
  reduce unnecessary narration and extra turns.
- Structured retrieval also helps the model avoid repeat searches and broad
  context dumps that would otherwise increase token use.

These patterns matter because token cost is shaped by both retrieval and
response behavior. Keeping each step narrow usually leads to lower cost and more
predictable output.
