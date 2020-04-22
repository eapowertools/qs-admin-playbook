---
layout: default
title: Architecture 101
parent: Review Architecture/Scale Plan
grand_parent: System Planning
nav_order: 1
---

# Architecture 101 (Components, Terminology)
{:.no_toc}

## Goal
{:.no_toc}

The goal of this page is to understand the basic terminology and components/services of a site.

## Table of Contents
{:.no_toc}

* TOC
{:toc}

-------------------------

## Architectural Components

There are a variety of components used by Qlik Sense Enterprise. This table will outline them as comprehension of the components is necessary for deciding on an architecture.

| Name                            | Description  |
|---------------------------------|---|
| Qlik Sense Hub                  | Drag and drop development, analysis, and self-service environment.  |
| Qlik Sense Management Console   | Centralized management of all aspects of a Qlik Sense deployment.  |
| Qlik Sense Proxy (QPS)          | Entry point into Qlik Sense for users and administrators. Manages Authentication (last mile), manages sessions / license provisioning, able to load balance across engines. |
| Qlik Sense Engine (QES)         | In-memory, associative data indexing engine. Used for reloads and app consumption.  |
| Qlik Sense Scheduler (QSS)      | Scheduling engine for application reloads from data sources.  |
| Qlik Sense Repository (QRS)     | Centralized storage of deployment information.  |
| Qlik Sense Repository Database  | A PostgreSQL database which persists metadata relating to the Qlik site.  |
| Qlik Sense Applications (.QVF)  | Centralized storage of Applications before loading into memory, as part of a centralized SMB file share.  |

For additional documentation regarding the Qlik services, please refer to [Services](https://help.qlik.com/en-US/sense-admin/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Services.htm).

-------------------------

## Terminology

With Qlik Sense Enterprise architecture, a **site** is used to refer to a potentially distributed cluster of nodes. All members of this site share the same QMC and use the same license key.

A **node** refers to a specific server and is often referred to by its purpose, i.e. Engine node.

![architecture-1.png](images/architecture-1.png)


**Tags**

#architecture

#scale

&nbsp;
