---
layout: default
title: Load Balancing Concepts
parent: Review Architecture/Scale Plan
grand_parent: System Planning
nav_order: 3
---

# Load Balancing Concepts
{:.no_toc}

## Goal
{:.no_toc}

The goal of this page is to understand what the term "Load Balancing" can be in the context of a Qlik site.

## Table of Contents
{:.no_toc}

* TOC
{:toc}

-------------------------

## Load Balancing

When it comes to load balancing within the scope of Qlik, there are three general areas that are applicable:

1. Load balancing across Qlik proxies
  - Third-party network load balancer required
    - E.g. F5 BigIP, NGINX, Netscaler, AWS ALB, Azure Application Gateway, etc
    - Requires support for websockets and sticky sessions
  - Required for Qlik Proxy resilience
2. Load balancing across Qlik Engines
  - Native to Qlik at the proxy level
    - Pure round robin
  - Option to plug in custom load balancer
3. Load balancing rules for applications
  - Native capability allows for "pinning" of applications to specific engines

For documentation/examples around load balancing rules, please refer to [Creating load balancing rules with custom properties](https://help.qlik.com/en-US/sense-admin/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/create-load-balancing-rules-with-custom-properties.htm).

**Tags**

#architecture

#load_balancing

#scale

&nbsp;