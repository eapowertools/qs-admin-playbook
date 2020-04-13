---
layout: default
title: Archive Old Archived Logs
nav_order: 1
parent: Backup & Archiving
---

# Archive Old Archived Logs <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i>
{: .no_toc }

<span class="label all">all</span>

|                                  		                      | Initial    | Recurring   |
|-----------------------------------------------------------|------------|-------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**     | 30 min     | 15 min      |

Benefits:

  - Reduce storage costs
  - Simplify troubleshooting
  
-------------------------

## Goal
{:.no_toc}
The goal for this activity is to purge or archive old logs from a Qlik Sense Enterprise deployment. This allows the administrator to reduce the storage costs of their Qlik Sense deployment and increase troubleshooting effectiveness by reducing number of logs which need to be searched / parsed / etc.

When completing this activity, the administrator needs to confirm whether the log files for their Qlik deployment **must** be retained for compliance purposes. The answer to this will determine whether the cleanup process focuses on *archiving* or *purging* old logs. This can include local laws, contractual obligations (e.g. an ELA with Qlik), or business standards like PCI, etc.

Insofar as the administrator is permitted to archive or purge log files, the administrator then needs to determine how far back they intend to use those log files for Qlik apps which monitor their Qlik Sense Enterprise site. For example, if the administrator needs to report on license usage yearly in as part of an internal busines review, then they will need to retain their logs for at least 1 year.

## Table of Contents
{:.no_toc}

* TOC
{:toc}

## Default consumption period for Monitoring Apps

In order to come to a decision on what retention period is appropriate, an initial barier is the bundled monitoring apps which come with every Qlik Sense Enterprise deployment. If the administrator needs to use those tools to answer specific adoption / utilization questions, then the requisite log files which are used as sources for the monitoring apps need to be present.

| Tool                           | Volume of Data     | Primary data source     |
| -------------                  | -------------      | -------------           |
| Operations Monitor             | 3 Months           | log files on disk       |
| License Monitor                | 12 Months          | log files on disk       |
| Log Monitor                    | 7 Days             | log files on disk       |
| Reloads Monitor                | 12 Months          | log files on disk       |
| Sessions Monitor               | 12 Months          | log files on disk       |
| Sense Performance Analyzer     | 7 Days             | Centralized Logging Database |
| App Metadata Analyzer          | N/A                | APIs                    |

## Practical retention periods

Practically for most organizations, retention periods will vary between tiers of their Qlik deployment (if applicable) with production tiers retaining logs longer than non-production tiers. In general the minumum retention period which makes sense would be:

- **Production**: 18 months
- **Development**: 6 months
- **Sandbox**: 1-2 months

Again this is a baseline, will need to be adjusted for the legal, contractual, and compliance standards the organization has.

## Script for Archiving / Purging <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i>

**cacheinitializer_deploy.log**

```powershell
# Specify the age threshold which is desired
# e.g. 60 would move all logs older than 60 days
$days = "60"

# Usage https://technet.microsoft.com/en-us/library/cc733145(v=ws.11).aspx
# /e applies to files and subdirectories in the path
# /mov moves the files
$option1 = "/mov"
$option2 = "/e"

# Path of Qlik Sense Logs, typically the Archived Logs
$source = "C:\QlikShare\ArchivedLogs"

# Path of where the log files should be moved
$dest = "C:\OldLogs"

# Remove logs y/n
$removelogs = "n"

#Checking to see if the $dest path exists, else create it
if(!(Test-Path -Path $dest )){
    New-Item -ItemType directory -Path $dest
}

# Passing the current directory for log creation
# Start core robocopy call
$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
& robocopy $source $dest $option1 $option2 /MINAGE:$days /LOG:$scriptDir\robolog.log /MT

# Deletes files if $removelogs = y
If ($removelogs -eq 'y') {Remove-Item $dest -Force -Recurse}
Else {"Files moved"}
```
{:.snippet}

**Tags**

#quarterly

#backup_and_archiving

#logs

#archive

&nbsp;
