---
layout: default
title: Remove/Quarantine Unused Apps
parent: Apps
grand_parent: Asset Management
nav_order: 6
---

# Remove/Quarantine Unused Apps
{:.no_toc}

**Cadence** <span class="label cadence">Quarterly</span>

**Sites** <span class="label dev">development</span><span class="label prod">production</span>

|                                  		          | Initial | Recurring |
|---------------------------------------------------------|---------|-----------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 30 Min  | 5 min     |

Benefits:

  - Reduce Maintenance
  - Increase Performance
  
-------------------------

## Goal
{:.no_toc}
The goal of this procedure is to remove unnecessary (unused) applications from a Qlik site. This increases overall site performance, decreases clutter, and will focus users to what is pertinent.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## Operations Monitor

This page leverages the **Operations Monitor**. Please refer to the [Operations Monitor](../../tooling/operations_monitor.md) page for an overview and relevant documentation links.

### Confirm Operations Monitor is Operational

Navigate to the **Monitoring apps** and select the **Details** button (info icon) on the **Operations Monitor** application. Confirm that the application's data is up-to-date.

![ops_monitor_operational.png](images/ops_monitor_operational.png)

If the **Operations Monitor** is not up-to-date, please refer to the [Operations Monitor Documentation](../../tooling/operations_monitor.md#documentation) for configuration details and troubleshooting steps.

-------------------------

## Process

Open the **Operations Monitor** App, and select the **Apps** sheet.

![quarantine_unused_apps_native_1.png](images/quarantine_unused_apps_native_1.png)

In the **App Details** table object, sort by **Last Accessed** field and scroll to old dates or null dates.

![quarantine_unused_apps_native_7.png](images/quarantine_unused_apps_native_7.png)

{::options parse_block_html="true" /}
<div class="card">
<div class="card-header">
<i class="fas fa-exclamation-circle fa-sm"></i> Note
</div>
<div class="card-body">
<p>While it is not possible to select apps which have not been accessed since this value is null, it is possible to select all apps which have been accessed by entering <code>*</code> in the <b>Last Accessed</b> column and then selecting excluded in the <b>ID</b> column.<br /><br />
	<img src="images/quarantine_unused_apps-null.png">
</p>
</div>
</div>

### Priority 1
    
Look for applications that are **Published** but have not been accessed. This can be quickly filtered to by selecting **Unpublished** from the **Stream** column, and then by selecting **Select alternative** to view all published applications.
	  
![quarantine_unused_apps_native_2.png](images/quarantine_unused_apps_native_2.png)

![quarantine_unused_apps_native_3.png](images/quarantine_unused_apps_native_3.png)
	  
![quarantine_unused_apps_native_8.png](images/quarantine_unused_apps_native_8.png)
	  
### Priority 2
    
Look for applications that are **Published** and have not been used for a long time.
          
![quarantine_unused_apps_native_4.png](images/quarantine_unused_apps_native_4.png)
	  
### Priority 3	
    
Look for **Unpublished** applications that have not been used for a long time. Clear selections in the **Stream** field, and then select `Unpublished` from the same field.
          
![quarantine_unused_apps_native_5.png](images/quarantine_unused_apps_native_5.png)
	  
![quarantine_unused_apps_native_6.png](images/quarantine_unused_apps_native_6.png)

-------------------------

## Actions
    
1. If the stream **Quarantine** doesn't already exist, this is a good time to create it. Ideally, the stream should be walled off to only Content Admins or the like, where they can review the applications with their respective owners.

2. Contact the application owners to let them know that their applications are being relocated to the **Quarantine** stream.	

3. Move the applications from Priorities 1, 2, and 3 to the **Quarantine** stream.

4. Any applications that have been in the **Quarantine** stream for X number of days can be removed (corporate policy on how long they should be kept.) It is considered a best practice to export them without data, at a minimum--potentially exported with data if the intent is to archive them.
	    

**Tags**
  
#quarterly

#asset_management

#apps

#operations_monitor

&nbsp;
