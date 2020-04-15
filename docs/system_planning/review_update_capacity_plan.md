---
layout: no_toc_layout
title: Review/Update Capacity Plan
has_children: true
nav_order: 1
parent: System Planning
---

# Review/Update Capacity Plan
{: .no_toc }

**Cadence** <span class="label cadence">Quarterly</span>

**Sites** <span class="label prod">production</span>

|                                  		                      | Initial    | Recurring   |
|-----------------------------------------------------------|------------|-------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**     | 1/2 day     | 2 hrs      |

Benefits:

  - Plan for growth
  - Anticipate user/architectural events
  
-------------------------

## Goal
{:.no_toc}

This page is intended to act as an example of what a high-level capacity plan could look like. It is assumed that the organization would build one themselves with some of the below considerations in mind, or would work with Qlik's Services organization to have one defined/executed.

It's important for stakeholders, budgetholders, and Qlik deployment owners to have advance notice when addition resources will be needed. This exercise helps an administrator prepare for those requests and demonstrate the need. 

Specific areas:
- Document current state and expected state of several asset groups, which helps for planning.
- Document and justify the actions that are needed for capacity/architecture changes.

-------------------------

## Capacity Planning Process

There are four primary pillars that this process covers--review each process below for details:

*   ### [Licenses](review_update_capacity_plan/licenses.md)
    {: .no_toc }
*   ### [Users](review_update_capacity_plan/users.md)
    {: .no_toc }
*   ### [System](review_update_capacity_plan/system.md)
    {: .no_toc }
*   ### [Applications](review_update_capacity_plan/applications.md)
    {: .no_toc }

-------------------------

## Capacity Planning Example

The below is a high-level mockup of what a capacity plan's output could look like, including the four points from the Capacity Planning Process. For details on how to locate/calculate these metrics, please refer to the associated process item above.

**ACME Corp**


### Licenses
{:.no_toc}

|                  | Licenses | Licenses Allocated | Licenses Allocated Unused | Licenses Remaining |
|------------------|----------|--------------------|---------------------------|--------------------|
| **Professional** | 50       | 44                 | 2                         | 6                  |
| **Analyzer**     | 200      | 180                | 15                        | 20                 |

**Actions**

1. Analyze the allocated licenses for possible re-assignment.
2. Review unused licenses.
3. Notify appropriate stakeholders that additional licenses will be needed in the near future.

### Users
{:.no_toc}

| Peak Concurrency | Total Users | Active Users 1+ Sessions | Active Users 5+ Sessions |
|------------------|-------------|--------------------------|--------------------------|
| 43               | 224         | 207                      | 176                      |

\* Activity based off last 3 months, assuming quarterly planning.

**Actions**

1. Review system specs to see how it is performing with the above currently, and how it could scale.

### System
{:.no_toc}

| Engine CPU | Engine RAM |  Batch Window | Avg Intra-day Reloads per Day |
|------------|------------|---------------|-------------------------------|
| Good       | Good       | Good          | 354                           |

| 	         | Max Concurrent Users Per Engine |
|------------|---------------------------------|
| Engine 1   | 43			                   |
| Engine 2   | 40			                   |

| 	         | Intra-day Reloads per Engine | End-User Facing |
|------------|------------------------------|-----------------|
| Engine 1   | 386			                | Yes	          |
| Engine 2   | 214			                | Yes 	          |

**Actions**

1. Going to begin offloading intra-day reloads to an isolated scheduler.

### Application
{:.no_toc}

| Candidates for "App Pinning" | Candidates for Data Model Optimization | ODAG Apps | Qlik NPrinting Apps | Qlik InsightBot Apps |
|------------------------------|----------------------------------------|-----------|---------------------|----------------------|
| 2                            | 3                                      | 1         | 0                   | 0                    |

**Actions**

1. Identified three applications for optimization and two applications for app pinning.

2. Review [Architecture/Scale Plan](review_architecture_scale_plan.md) to see if app pinning is possible with the current architectural footprint, or if it would require an architectural event, e.g. horizontally scaling (adding another proxy/engine node).

3. Review where ODAG reloads are being processed, and if they need to be offloaded to a dedicated scheduler if not already, or if more cores are required for additional concurrent reloads.

4. If NPrinting or InsightBot were in use, it would be good to validate if there were dedicated applications for each of these components that were silo'ed off from end users. I.e., there is a duplicated, stripped down version of a production app for use with either NPrinting or InsightBot.

**Tags**

#quarterly

#system_planning

#capacity_plan

&nbsp;