---
layout: default
title: Qlik CLI for Windows
nav_order: 7
parent: Tooling Appendix
---

# Qlik CLI for Windows <i class="fas fa-tools fa-xs" title="Tooling | Pre-Built Solutions"></i> <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i> 
{:.no_toc}

<span class="label dev">development</span><span class="label prod">production</span>

|<i class="far fa-clock fa-sm"></i> **Estimated Configuration Time**   | 15 min  |

## Table of Contents
{:.no_toc}

* TOC
{:toc}

-------------------------

## About <i class="fas fa-tools fa-xs" title="Tooling | Pre-Built Solutions"></i> <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i>

Qlik CLI for Windows is a PowerShell module that provides a command line interface for managing a Qlik Sense environment. The module provides a set of commands for viewing and editing configuration settings, as well as managing tasks and other features available through the APIs.

This is a widely used module in the Qlik ecosystem, by services internally to Qlik, partners, and customers worldwide.

-------------------------

## Where to get it

The Qlik CLI for Windows can be found here: [Qlik CLI for Windows](https://github.com/ahaydon/Qlik-Cli).

-------------------------

## Documentation

For documentation, please visit the Wiki for the repository here: [Qlik CLI for Windows Wiki](https://github.com/ahaydon/Qlik-Cli/wiki).

-------------------------

## Example Script <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i>

The below is a simple example of the Qlik CLI for Windows importing an app into a Qlik environment and publishing it to a stream.

```powershell
Import-QlikApp -file .\filename.qvf -name ExampleApp -upload | Publish-QlikApp -stream ExampleStream
```
{:.snippet}

**Tags**

#tooling

#cli

&nbsp;