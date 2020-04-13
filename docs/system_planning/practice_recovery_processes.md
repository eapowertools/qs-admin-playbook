---
layout: default
title: Practice Recovery Processes
nav_order: 4
parent: System Planning
---

# Practice Recovery Processes
{: .no_toc }

<span class="label prod">production</span>

|                                  		                    | Initial    | Recurring  |
|---------------------------------------------------------|----------- |------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 120 min    | 40 min     |

Benefits:

  - Ensure readiness
  
-------------------------

## Goal
{:.no_toc}
The goal of this activity is for the Qlik administrator to practice the previously developed [Disaster Recovery Plan](plan_disaster_recovery.md). This allows the administrator to test and provide feedback to the plan. Successful execution of the plan allows the organization to have confidence that their Qlik site is resilient based on their Recovery Time Objective.

The steps outlined in this activity are intended to be examples of how to recover a Qlik site. The specific steps required **will** vary by site so customization of these steps on a per-site basis by the Qlik administrator will be required.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## Pre-reqs

To successfully, the organization needs to have some mechanism of recovery. This can be as simple as snapshots of VMs or Cloud instances or as complex as a hot mirrored environment. This activty assumes that there is some recovery mechanism in place already.

## Steps (Simple)

In this example, we will do a simple recovery of a Qlik site. This would typically leverage snapshots of the VM or Cloud instance.

- Ensure that a snapshot exists
- Shut down the VM / Cloud instance
- Restore Snapshot
  - In a real DR scenario, the Qlik administrator would likely restore this VM to a new VM cluster (on prem) or instance region (cloud)
- Start the VM / OS
- Access Qlik Sense Enterprise QMC / Hub
- Verify:
  - Key apps can be opened (reference [Analyze App Adoption](../asset_management/apps/analyze_app_adoption.md) for guidance)
  - Key reload tasks execute successfully (reference [Analyze Tasks](../asset_management/tasks/analyze_tasks.md) for guidance)
  - Customized Authentication mechanisms work
  - Customized integrations work (e.g. portals, automation tasks)

Insofar as the VM retains the same server name, the backup should initialize successfully. If the hostname is changed then refer to [this Qlik Support article](https://support.qlik.com/articles/000014456) for guidance.

## Steps (Advanced)

In this example, we will do an advanced recovery from scratch.

- Go through manual recovery process (reference [this Qlik Support article](https://support.qlik.com/articles/000041283) and [this help.qlik.com article](https://help.qlik.com/en-US/sense-admin/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Restoring-a-site.htm))
- Start the VM / OS
- Access Qlik Sense Enterprise QMC / Hub
- Verify:
  - Key apps can be opened (reference [Analyze App Adoption](..\asset_management\apps\analyze_app_adoption.md) for guidance)
  - Key reload tasks execute successfully (reference [Analyze Tasks](..\asset_management\tasks\analyze_tasks.md) for guidance)
  - Customized Authentication mechanisms work
  - Customized integrations work (e.g. portals, automation tasks)

## Feedback Loop

After completing the recovery process, it is expected that the actual list of steps which are required will (a) be longer and (b) be customized on a per-environment basis. The Qlik administrator should document any additional steps which are required and integrate this into internal documentation for their Qlik deployment. As sites become more complex (e.g. multi-nodes, integrations), the dependencies for a site will grow so repeating this recovery process at least yearly is ideal in order to ensure accuracy of the internally documented processes.

**Tags**

#yearly

#system_planning

#recovery

&nbsp;