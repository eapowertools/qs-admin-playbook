---
layout: default
title: Review Node Health
parent: System Spot Check
nav_order: 2
---

# Spot-Check: Node Health
{:.no_toc}

**Cadence** <span class="label cadence">Daily</span>

**Sites** <span class="label prod">production</span>


|                                  		                    | Initial | Recurring  |
|---------------------------------------------------------|---------|------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 1 min   | 1 min      |

Benefits:

  - Increase stability
  - Increase awareness
  
-------------------------

## Goal
{:.no_toc}
The goal for this spot-check is to be aware of the health of the node(s) in a Qlik Sense Enterprise deployment. Unexpectedly off-line nodes should be brought online. Nodes where service(s) have unexpectedly restarted should be investigated.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## Services up? QMC - Nodes

In the QMC, select **Nodes**:

[![nodes-1.png](images/nodes-1.png)](https://raw.githubusercontent.com/eapowertools/qs-admin-playbook/master/docs/system_spot_check/images/nodes-1.png)

Inside of the **Nodes** section review the available node(s) in the Qlik Sense Enterprise deployment to ensure that the expected number of services are running:

[![nodes-2.png](images/nodes-2.png)](https://raw.githubusercontent.com/eapowertools/qs-admin-playbook/master/docs/system_spot_check/images/nodes-2.png)

An environment where a node is entirely down or some subset of services are not available will display in this section of the QMC:

[![nodes-3.png](images/nodes-3.png)](https://raw.githubusercontent.com/eapowertools/qs-admin-playbook/master/docs/system_spot_check/images/nodes-3.png)

An administrator should attempt to start / restart the down services.

-------------------------

## Services unexpectedly restarted? QMC - Nodes

In the QMC, select **Nodes**:

[![nodes-1.png](images/nodes-1.png)](https://raw.githubusercontent.com/eapowertools/qs-admin-playbook/master/docs/system_spot_check/images/nodes-1.png)

Inside of the **Nodes** section select the **i** icon to bring up an informational modal for uptime of the node's enabled services:

[![nodes-4.png](images/nodes-4.png)](https://raw.githubusercontent.com/eapowertools/qs-admin-playbook/master/docs/system_spot_check/images/nodes-4.png)

This section will detail the uptime of each enabled service. Services with unexpected uptimes (e.g. the **engine** and **proxy** services in this example) should be investigated.

**Tags**

#daily

#spot_check

&nbsp;
