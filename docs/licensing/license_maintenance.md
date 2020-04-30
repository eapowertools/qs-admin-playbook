---
layout: default
title: License Maintenance
nav_order: 1
parent: Licensing
---

# License Maintenance
{:.no_toc}

**Cadence** <span class="label cadence">Monthly</span>

**Sites** <span class="label all">all</span>

|                                  		                  | Initial | Recurring |
|---------------------------------------------------------|---------|-----------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 20 min | 10 min    |

Benefits:

  - Ensure all licenses can be leveraged
  - Ensure desired users have access 

## Goal
{:.no_toc}
The goal of this activity is to keep up with general license maintenance, specifically focusing on the following exercises:

1. Remove license allocations for inactive users
2. Consider/review license allocations for users that are being denied access

## Table of Contents
{:.no_toc}

* TOC
{:toc}

-------------------------

## License Monitor

This page leverages the **License Monitor**. Please refer to the [License Monitor](../tooling/license_monitor.md) page for an overview and relevant documentation links.

### Confirm License Monitor is Operational

Navigate to the **Monitoring apps** and select the **Details** button (info icon) on the **License Monitor** application. Confirm that the application's data is up-to-date.

![license_monitor_operational.png](images/license_monitor_operational.png)

If the **License Monitor** is not up-to-date, please refer to the [License Monitor Documentation](../tooling/license_monitor.md#documentation) for configuration details and troubleshooting steps.

-------------------------


## Removing License Allocations for Inactive Users

To check for inactive users, go to the QMC and select the **Users** section.

![Optimize_Audit_License_Allocations_QMC_Users.png](images/Optimize_Audit_License_Allocations_QMC_Users.png)

Select the filter icon above the **Inactive** column and select `Yes`. The list of users will be filtered to those who are inactive. 

![Optimize_Audit_License_Allocations_QMC_Users_Inactive.png](images/Optimize_Audit_License_Allocations_QMC_Users_Inactive.png)

A user is marked inactive when a configured **User Directory Connector (UDC)** can no longer can find the user in the 3rd party user directory (AD, LDAP etc...).  Such users are candidates for license dealloaction if they have left the company or moved to a department or group that no longer has access--the latter comes into play when there is an LDAP filter on the UDC.

To remove a license allocation, go to the QMC and select **License Management**

![Analyze_Audit_License_Allocations_QMC_License_Management.png](images/Analyze_Audit_License_Allocations_QMC_License_Management.png)

The license allocation will be present under **Professional access allocations** or **Analyzer access allocations**. Check both sections to find the inactive users.

![Optimize_Audit_License_Allocations_QMC_License_Allocations.png](images/Optimize_Audit_License_Allocations_QMC_License_Allocations.png)

To deallocate a user, select the user from the appropriate allocation screen and select **Deallocate** at the bottom of the screen.

![Optimize_Audit_License_Allocations_QMC_License_Deallocation.png](images/Optimize_Audit_License_Allocations_QMC_License_Deallocation.png)

If a **License Rule** is present to allocate licenses to users automatically, check if the license rule should be updated. 

![Optimize_Audit_License_Allocations_QMC_License_Rule_Change.png](images/Optimize_Audit_License_Allocations_QMC_License_Rule_Change.png)

## Check for License Denials

From the Hub select the **Monitoring apps** stream and then select the **License Monitor** application.

![Analyze_Audit_License_Allocations_QMC_MonitoringApps_LicenseMonitor.png](images/Analyze_Audit_License_Allocations_QMC_MonitoringApps_LicenseMonitor.png)

Select the **User Detail** sheet.

![Optimize_License_Allocations_HUB_License_Monitor_Open_UserDetail_Sheet.png](images/Optimize_License_Allocations_HUB_License_Monitor_Open_UserDetail_Sheet.png)

At the top, select the **Date** filter pane and select the most recent dates.  On the right, the **Denied Access** object will show a list of users who have been denied access. These users are candidates for being allocated a new license.

![Analyze_Audit_License_Allocations_HUB_License_Monitor_Denials.png](images/Analyze_Audit_License_Allocations_HUB_License_Monitor_Denials.png)

When users are getting a denied access, it means that they have successfully authenticated to Qlik Sense and have been identified, but they have not yet been allocated a license. It may be because of a misconfiguration in the current license allocation rule, or it may be because a new group is interested in using the platform and that group is not yet configured in the allocation rule, as they were not anticipated.

If a **User Directory Connector** is in use, then more information about the denied user can be determined by accessing the QMC and going to the **User** section. 

![Optimize_Audit_License_Allocations_QMC_Users.png](images/Optimize_Audit_License_Allocations_QMC_Users.png)

Click the **info** icon next to the user to bring up a pop-up set of additional properties. 

![Optimize_Audit_License_Allocations_QMC_Users_Info.png](images/Optimize_Audit_License_Allocations_QMC_Users_Info.png)

When a user directory connector is used, typically a group (i.e. AD Group) will be presented for additional information.

Depending on what is found out about the user, the follow-up action is either to simply allocate a license to the single user, or to update the licence **allocation rules** from the **License Management** section of the QMC.

To allocate a single license, go to the QMC and select the **License Management** section.

![Analyze_Audit_License_Allocations_QMC_License_Management.png](images/Analyze_Audit_License_Allocations_QMC_License_Management.png)

Depending on the level of capability required, select **Professional Allocations** or **Analyzer Allocations**.

![Optimize_Audit_License_Allocations_QMC_License_Allocations.png](images/Optimize_Audit_License_Allocations_QMC_License_Allocations.png)

Next, select **Allocate** at the bottom, select the same user that was denied, and select **Allocate**.

![Optimize_Audit_License_Allocations_QMC_License_Allocation.png](images/Optimize_Audit_License_Allocations_QMC_License_Allocation.png)

Optionally, a license rule can be created or updated to automatically allow new users acces from the **License Management** screen.  Select **Professional access rules** or **Analyzer access rules**. 

![Optimize_Audit_License_Allocations_QMC_License_Rule_Change.png](images/Optimize_Audit_License_Allocations_QMC_License_Rule_Change.png)

For more information on access rules consult the Qlik Sense help:

- [Qlik Help - Create Professional Access Rule](https://help.qlik.com/en-US/sense-admin/February2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/create-professional-access-rule.htm)
- [Qlik Help - Create Analyzer Access Rule](https://help.qlik.com/en-US/sense-admin/February2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/create-analyzer-access-rule.htm)

**Tags**

#monthly

#licensing

#license

#users

#license_monitor

&nbsp;
