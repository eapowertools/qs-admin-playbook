---
layout: default
title: Review Data Exports
nav_order: 1
parent: Audit
---

# Review Data Exports <i class="fas fa-dolly-flatbed fa-xs" title="Shipped | Native Capability"></i> 
{: .no_toc }

**Cadence** <span class="label cadence">Monthly</span>

**Sites** <span class="label prod">production</span>

|                                  		                      | Initial    | Recurring   |
|-----------------------------------------------------------|------------|-------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**     | 30 min     | 15 min      |

Benefits:

  - Understand user behavior
  - Increase analysis within Qlik
  
-------------------------

## Goal
{:.no_toc}
The goal for this activity is to review the Operations Monitor in Qlik Sense Enterprise to review what user(s) are exporting data to Excel. Exports to Excel are expensive for the Qlik Engine since it needs to:

- Construct a duplicative hypercube of the requested data
- Calculate the aggregates (if needed, e.g. pivot tables)
- Explode the hypercube from memory and dump it to disk
- Notify the browser that there is a file ready for download
- Deliver that stream across the network to the end user

For the majority of use cases, bulk exports to Excel signal that dashboards need to be better optimized to meet the work-flow needs of the user base. The action from this activity is for the administrator to consult with the app's owner / developer and potentially the end user(s) to discuss the data needs that they have and how the Qlik app can better support them. Alternatively an upgrade to Qlik Sense Enterprise June 2019 is warranted to enable the [Copy value to clipboard functionality](https://help.qlik.com/en-US/sense/June2019/Content/Sense_Helpsites/WhatsNew/What-is-new-June2019.htm){:target="_blank"} which allows a user to copy just a cell value from Qlik.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## Operations Monitor

This page leverages the **Operations Monitor**. Please refer to the [Operations Monitor](../../tooling/operations_monitor.md) page for an overview and relevant documentation links.

### Confirm Operations Monitor is Operational

Navigate to the **Monitoring apps** and select the **Details** button (info icon) on the **Operations Monitor** application. Confirm that the application's data is up-to-date.

![ops_monitor_operational.png](../asset_management/apps/images/ops_monitor_operational.png)

If the **Operations Monitor** is not up-to-date, please refer to the [Operations Monitor Documentation](../../tooling/operations_monitor.md#documentation) for configuration details and troubleshooting steps.

-------------------------

### Review Operations Monitor <i class="fas fa-dolly-flatbed fa-xs" title="Shipped | Native Capability"></i> 

Open up the **Operations Monitor** application and navigate to the **Export Overview** sheet:

![export-1.png](images/export-1.png)

Inside the app review the **Users Exporting** table for a list of users who have exported data to Excel (1) and review the **Export Details** table for the applications where the exports originated from (2).

![export-2.png](images/export-2.png)

**Tags**

#monthly

#audit

#operations_monitor

&nbsp;
