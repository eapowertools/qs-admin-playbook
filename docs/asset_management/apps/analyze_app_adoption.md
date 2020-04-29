---
layout: default
title: Analyze App Adoption
parent: Apps
grand_parent: Asset Management
nav_order: 1
---

# Analyze App Adoption
{:.no_toc}

**Cadence** <span class="label cadence">Quarterly</span>

**Sites** <span class="label prod">production</span>

|                                  		                    | Initial | Recurring  |
|---------------------------------------------------------|---------|------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 25 Min  | 10 min     |

Benefits:

  - Understand adoption
  - Better understand user-base
  - Identify top and bottom applications by adoption
  
-------------------------

## Goal
{:.no_toc}
At it simplest, the goal of this page is to identify the top five and bottom five applications by two metrics:
  
  - Total sessions by application
  - Total distinct users by application
  
It is also important to identify any visible trends of usage -- is usage trending up or down, or are there consistent spikes? In addition, it is helpful to characterize these applications, e.g. _highly used yet only by a few inidividuals_, _widely used but infrequently accessed_, etc. To visualize these areas, two additional charts will be built.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## Suggested Prerequisites

- [Remove/Quarantine Unused Apps](remove_quarantine_unused_apps.md)

-------------------------

## Operations Monitor

This page leverages the **Operations Monitor**. Please refer to the [Operations Monitor](../../tooling/operations_monitor.md) page for an overview and relevant documentation links.

### Confirm Operations Monitor is Operational

Navigate to the **Monitoring apps** and select the **Details** button (info icon) on the **Operations Monitor** application. Confirm that the application's data is up-to-date.

![ops_monitor_operational.png](images/ops_monitor_operational.png)

If the **Operations Monitor** is not up-to-date, please refer to the [Operations Monitor Documentation](../../tooling/operations_monitor.md#documentation) for configuration details and troubleshooting steps.

-------------------------

## User & Session Metrics

Navigate to the **Monitoring apps** stream and open up the **Operations Monitor** application.

![app_adoption_17.png](images/app_adoption_17.png)

Select the **Session Details** sheet.

![app_adoption_19.png](images/app_adoption_19.png)

Next, assuming this process is taking place quarterly, select the latest three full months.

![app_adoption_20.png](images/app_adoption_20.png)

Following, sort the **Sessions** column of the **App Session Summary** table descending to view the applications with the greatest number of sessions.

![app_adoption_21.png](images/app_adoption_21.png)

Now, to see the applications with the greatest number of distinct users, sort the **Users** column **descending**.

![app_adoption_22.png](images/app_adoption_22.png)

In this case, three of the applications overlap, but notice that one of them was heavily used only by a single user. It is important to recognize and weigh the application's importance by considering both metrics. Is it because the application is only relevant to one person, or is it only known to that person, or is that person not aware of a newer application? These are just some questions one might want to consider asking.

Repeat the same process above for the bottom five applications, by sorting both the **Sessions** and **Users** column **descending** one by one and recording and then comparing the results.

## Application/Session Activity Breakdown

The metrics above are valuable for discerning which applications are used the most, but now consider the following questions:

- What is the breakdown of each user's usage within each app?
- Is the session usage relatively evenly distributed, or is it condensed to only a few users?
- What is the percentange of an application's usage against other applications? For instance, what percentage do the top five applications take up of the entire environment?

A new chart can be created to easily visualize session usage and users to answer all of the above questions.

Duplicate the **Session Details** sheet, and clear some real estate on the dashboard to make room for a new chart object.

![app_adoption_1.png](images/app_adoption_1.png)

Drag and drop the **Mekko chart** (available as of the **November 2019** release) and select **Add dimension**. Then, select the **Session App Name** field.

![app_adoption_2.png](images/app_adoption_2.png)

Next, add the second dimension of **UserId**.

![app_adoption_3.png](images/app_adoption_3.png)

Now, select **Add measure**, and add **Sessions**.

![app_adoption_4.png](images/app_adoption_4.png)

In the properties panel, expand the **Session App Name** panel and set the **Limitation** to **Fixed number**. Next, set the **Top** to `6`. The `6` allows for the top five applications to show, along with the **Others** faux dimension. Ensure that **Show others** is toggled on.

![app_adoption_5.png](images/app_adoption_5.png)

Following, select the **UserId** dimension, and do the same as above except now set the **Top** to `11`.

![app_adoption_6.png](images/app_adoption_6.png)

Navigate down to the sorting section, and expand **Session App Name**. Untoggle the default sorting (Auto), toggle on **Sort by expression**, select **Descending**, and then enter `Sum([Session Count])` as the expression value.

![app_adoption_7.png](images/app_adoption_7.png)

Repeat the same process for the **UserId** sorting.

![app_adoption_8.png](images/app_adoption_8.png)

Ensure that the sort order is:

  1. Session App Name
  2. UserId
  3. Sessions
  
Next, move down to the **Colors and legend** section under **Appearance**. Toggle off **Show legend** to give the chart some exra space.

![app_adoption_9.png](images/app_adoption_9.png)

Lastly, view the completed chart. One can quickly spot:

  - Who the predominant consumers of the top five applications are (if the distribution is less even)
  - The distribution of sessions by user (even or condensed to several)
  - The percentage of distribution of sessions relative to others
  - The percentage of all sessions of the top five applications against all others
  
![app_adoption_23.png](images/app_adoption_23.png)

By clicking in on the top five applications specifically (after noting the higher-level metric regarding overall usage), it can make the detail a bit easier to consume.

![app_adoption_10.png](images/app_adoption_10.png)

## Application Usage Trending

After identifying the top five applications, it is important to see in which direction their usage is trending, if any. To do so, a new chart can be created.

First, create some room on the duplicated **Session Details** sheet. In this case, the details table has been removed, as it is not relevant to this analysis. 

Select the **Combo chart**, and insert it. Then, select the **Date** as the dimension.

![app_adoption_11.png](images/app_adoption_11.png)

Select **Add measure**, and insert the **Sessions** measure.

![app_adoption_12.png](images/app_adoption_12.png)

Under **Measures**, select **Sessions**, and change the type to **Line**.

![app_adoption_13.png](images/app_adoption_13.png)

While remaining in the editing pane, under **Height**, select **Add**. Next, click the **fx** button.

![app_adoption_14.png](images/app_adoption_14.png)

Insert the expression `count({<[Session Count]={1}>} DISTINCT UserId)`. Name the measure **Users**, and ensure it is of type **Line**.

![app_adoption_15.png](images/app_adoption_15.png)

View the the completed chart. It is easy to spot when there are many distinct users with few sessions each, or when there are only a few users with many sessions. Ensure that each of the top five applications are selected one by one (as well as the bottom five) so that the trends can be viewed individually.

![app_adoption_16.png](images/app_adoption_16.png)

**Tags**

#quarterly

#asset_management

#apps

#operations_monitor

&nbsp;
