---
layout: default
title: Users
parent: Review/Update Capacity Plan
grand_parent: System Planning
nav_order: 2
---

# Capacity Plan: Users <i class="fas fa-dolly-flatbed fa-xs" title="Shipped | Native Capability"></i>
{:.no_toc}

## Goal
{:.no_toc}

The goal of this exercise is to identify user activity over a period of time since this exercise was last ran to identify variances in usage and anticipate future growth.

There are a number of metrics that should be focused on, including the following:

- Peak Concurrency
- Active Users 1+ Sessions
- Active Users 5+ Sessions

## Table of Contents
{:.no_toc}

* TOC
{:toc}

-------------------------

## Operations Monitor

Please refer to the [Operations Monitor](../../tooling/operations_monitor.md) page for an overview and relevant documentation links.

-------------------------

## User Activity

### Confirm License Monitor is Operational

Navigate to the **Monitoring apps** stream and open up the **Operations Monitor** application.

[![capacity_planning_users_1.png](images/capacity_planning_users_1.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_1.png)

First and foremost, it is essential to confirm that the **Operations Monitor** is operational and up to date. Ensure that it is by selecting the _Show app information_ button, and then viewing the _Data last loaded_ section of the application's description. Alternatively, one could also check the task status in the QMC.

[![capacity_planning_users_2.png](images/capacity_planning_users_2.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_2.png)

### Gather Metrics

Select the _Session Overview_ sheet.

[![capacity_planning_users_11.png](images/capacity_planning_users_11.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_11.png)

Now, assuming this capacity plan exercise is in fact being executed quarterly, select the last three months of session data. This can easily be achieved by selecting the target months in the _User and App Count Trend_ chart in the bottom right. The _Latest Activity Measure_ field that always has one selected does not apply to this area, and only applies to sheet usage--so it can be ignored.

[![capacity_planning_users_12.png](images/capacity_planning_users_12.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_12.png)

While remaining on this sheet, take note of the _Max Concurrent Users_ KPI. This is the _Peak Concurrency_ KPI mentioned above, and is critical to help plan for growth from an architecture perspective.

[![capacity_planning_users_14.png](images/capacity_planning_users_14.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_14.png)

Following, select the _Session Details_ sheet.

[![capacity_planning_users_3.png](images/capacity_planning_users_3.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_3.png)

Next, be sure to review the _App Session Summary_ object as well as the _User Session Summary_ objects as they display valuable information, such as how many individual sessions users have had, and against what applications. These are very useful metrics both for overall user usage and adoption, and will impact the [Applications](applications.md) section of the capacity plan.

[![capacity_planning_users_4.png](images/capacity_planning_users_4.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_4.png)

That being said, two additional metrics that are not available by default on the sheet should be added:

  - The total number of distinct users that have had at least _1_ session over the last _x_ days
  - The total number of distinct users that have had _5_ or more sessions over the last _x_ days
  
These two metrics will help to identify and bucket how many active and semi-active users exist in the environment, and then will help with a license optimization exercise, which can be found here: [Optimize License Allocations](../../licensing/optimize_license_allocations.md).

To add these two metrics, start by duplicating the sheet.

[![capacity_planning_users_5.png](images/capacity_planning_users_5.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_5.png)

Following, find space for two KPI objects. For example, shrink down the _User Session Summary_ table, and insert two KPI objects above it.

[![capacity_planning_users_6.png](images/capacity_planning_users_6.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_6.png)

Next, select the first KPI and add the measure:

`Count({<[User Name]={"=Sum([Session Count])>0"}>}DISTINCT [User Name])`

[![capacity_planning_users_7.png](images/capacity_planning_users_7.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_7.png)

[![capacity_planning_users_8.png](images/capacity_planning_users_8.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_8.png)

Name this KPI: _Active Users: 1+ Sessions_

Next, repeat the process above for adding the following expression to the second KPI:

`Count({<[User Name]={"=Sum([Session Count])>=5"}>}DISTINCT [User Name])`

Name this KPI: _Active Users: 5+ Sessions_

[![capacity_planning_users_9.png](images/capacity_planning_users_9.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/system_planning/review_update_capacity_plan/images/capacity_planning_users_9.png)

## Example Takeaway

An example output from this site could looks like the following: 

| Peak Concurrency | Total Users | Active Users 1+ Sessions | Active Users 5+ Sessions |
|------------------|-------------|--------------------------|--------------------------|
| 2                | 10          | 7                        | 4                        |

* Note that the _Licenses Allocated Unused_ metric found [here](/licenses.md) is calculated on 30 days, not 90, as the above chart shows. Take this into consideration in the capacity plan.

**Tags**

#capacity_plan

#users

&nbsp;