---
layout: default
title: Check for New/Modified Security Rules
nav_order: 2
grand_parent: Asset Management
parent: Security Rules
---

# Check for New/Modified Security Rules <i class="fas fa-file-code fa-xs" title="API | Script Optional"></i>*
{:.no_toc}

<span class="label dev">development</span><span class="label prod">production</span>

|                                  		                    | Initial   | Recurring  |
|---------------------------------------------------------|-----------|------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 5 min     | 5 min     |

Benefits:

  - Increase awareness
  - Increase reaction times
  
-------------------------

## Goal
{:.no_toc}
Ensuring that security rules are tightly managed and governed is arguably the most important aspect of managing a Qlik site from an administrator's perspective. This area is critical to ensuring the right people have access to the appropriate resources, and have the appropriate privileges to act on those resources. It is important to see if new rules are being created, and it is also very important to check rules that have recently been modified. This section will cover both.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## QMC - Security Rules

In the QMC, select **Security Rules**:

[![check_new_rules_native_1.png](images/check_new_rules_native_1.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/security_rules/images/check_new_rules_native_1.png)

In the upper right hand side of the screen, select the **Column selector**, and then select the **Created**, **Last Modified**, and **Modified by** columns.

[![check_new_rules_native_2.png](images/check_new_rules_native_2.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/security_rules/images/check_new_rules_native_2.png)

Now select the filter icon for the **Created** column, and then select the filter of **Last seven days**, or the desired range.

[![check_new_rules_native_3.png](images/check_new_rules_native_3.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/security_rules/images/check_new_rules_native_3.png)

Lastly, review the resulting table and view any new streams. Repeat this process for the **Last modified** column, reviewing what security rules were modified and by whom.

-------------------------

## Get List of New/Modified Security Rules (Qlik CLI) <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i>

The below script snippet requires the [Qlik CLI](../../tooling/qlik_cli.md).

The script will bring back any security rules with a **Created Date** or **Modified Date** that is greater than or equal to x days old. The script will then store the output into a desired location in either csv or json format.

### Script
```powershell
# Function to collect security rules that were created or modified in the last x days

################
## Parameters ##
################

# Assumes default credentials are used for the Qlik CLI Connection

# machine name
$computerName = '<machine-name>'
# leave empty if windows auth is on default VP
$virtualProxyPrefix = '/default'
# set the number of days back for the app created date
$daysBack = 7
# directory for the output file
$filePath = 'C:\'
# desired filename of the output file
$fileName = 'output'
# desired format of the output file (can be 'json' or 'csv')
$outputFormat = 'json'

################
##### Main #####
################

# set the output file path
$outFile = ($filePath + $fileName + '.' + $outputFormat)

# set the date to the current time minus $daysback
$date = (Get-Date -date $(Get-Date).AddDays(-$daysBack) -UFormat '+%Y-%m-%dT%H:%M:%S.000Z').ToString()

# set the computer name for the Qlik connection call
$computerNameFull = ($computerName + $virtualProxyPrefix).ToString()

# connect to Qlik
Connect-Qlik -ComputerName $computerNameFull -UseDefaultCredentials -TrustAllCerts

# check the output format
# get all security rules that were modified or created >= $date
# output results to $outfile
If ($outputFormat.ToLower() -eq 'csv') {
  Get-QlikRule -filter "(createdDate ge '$date' or modifiedDate ge '$date') and category eq 'Security'" -full | ConvertTo-Csv -NoTypeInformation | Set-Content $outFile
  }  Else {
  Get-QlikRule -filter "(createdDate ge '$date' or modifiedDate ge '$date') and category eq 'Security'" -full | ConvertTo-Json | Set-Content $outFile
}
```
{:.snippet}

## Backup Security Rules

Given the Qlik CLI script above, that script could actually be modified to pull security rules (by removing the filter) on a scheduled basis and store them out to separate files at a desired cadence, so that if an administrator wanted to "roll back" changes, they could. Refer to an example here: [Qlik Support - Exporting and Importing Security Rules](https://support.qlik.com/articles/000040012).

**Tags**

#weekly

#asset_management

#security_rules

&nbsp;
