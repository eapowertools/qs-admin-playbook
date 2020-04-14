---
layout: default
title: Check for New/Modified Custom Properties
nav_order: 1
parent: Custom Properties
grand_parent: Asset Management
---

# Check for New/Modified Custom Properties <i class="fas fa-file-code fa-xs" title="API | Script Optional"></i>*
{:.no_toc}

<span class="label dev">development</span><span class="label prod">production</span>

|                                  		                      | Initial   | Recurring  |
|-----------------------------------------------------------|-----------|------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**     | 5 min     | 5 min      |

Benefits:

  - Increase awareness
  - Increase reaction times
  
-------------------------

## Goal
{:.no_toc}
Regularly checking for new/modified custom properties allows the administrator to track what/how users are controlling security and management across the Qlik environment.

Some of the outcomes:
  - Discover new custom properties so that their usage can be identified (e.g. through contacting the creator).
  - Identify modified custom properties so that their expanded usage can be identified and tracked.
  - Regulate the amount of custom property value options, as there can be performance impacts if there are many.
  - Identify whether individual custom properties are being leveraged for security rules or for management/automation purposes.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## QMC - Custom Properties

In the QMC, select **Custom Properties**:

[![check_new_custom_properties_native_1.png](images/check_new_custom_properties_native_1.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_1.png)

In the upper right hand side of the screen, select the **Column selector**, and then select the **Created**, **Last modified**, and **Modified by** columns.

[![check_new_custom_properties_native_2.png](images/check_new_custom_properties_native_2.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_2.png)

Now select the filter icon for the **Created** column, and then select the filter of **Last seven days**, or the desired range.

[![check_new_custom_properties_native_3.png](images/check_new_custom_properties_native_3.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_3.png)

Take the time to review the results and potentially reach out to their creators if they are brand new custom properties. Ensure that the same steps above are followed to filter on **Last modified** as well.

Next, it is encouraged to select the custom property and view its values and its applicable resources.

[![check_new_custom_properties_native_4.png](images/check_new_custom_properties_native_4.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_4.png)

Lastly, it is simple to check if the custom property is being used in any security rules. Navigate to the **Security Rules** section in the QMC.

[![check_new_custom_properties_native_sec.png](images/check_new_custom_properties_native_sec.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_sec.png)

In the upper right hand side of the screen, select the **Column selector**, and then select the **Conditions** column.

[![check_new_custom_properties_native_5.png](images/check_new_custom_properties_native_5.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_5.png)

Now select the filter icon for the **Conditions** column, and then enter the name of the custom property, prepended by the **@** symbol, which denotes the use of a custom property in a security rule, e.g. _@Department_.

[![check_new_custom_properties_native_6.png](images/check_new_custom_properties_native_6.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_6.png)

If any security rules are using this rule, they will be visible, so the rule can then be explored to confirm whether it is enabled or disabled.

[![check_new_custom_properties_native_7.png](images/check_new_custom_properties_native_7.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/custom_properties/images/check_new_custom_properties_native_7.png)

-------------------------

## Get List of New/Modified Custom Properties (Qlik CLI) <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i>

The below script snippet requires the [Qlik CLI](../../tooling/qlik_cli.md).

The script will bring back any custom properties that have been created or modified within the las x days. The script will then store the output into a desired location in either csv or json format.

### Script
```powershell
# Function to collect custom properties that were created or modified in the last x days

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
# get all custom properties that are created/modified >= $date
# output results to $outfile
If ($outputFormat.ToLower() -eq 'csv') {
  Get-QlikCustomProperty -filter "createdDate ge '$date' or modifiedDate ge '$date'" -full | ConvertTo-Csv -NoTypeInformation | Set-Content $outFile
  }  Else {
  Get-QlikCustomProperty -filter "createdDate ge '$date' or modifiedDate ge '$date'" -full | ConvertTo-Json | Set-Content $outFile
}
```
{:.snippet}

**Tags**

#weekly

#custom_properties

&nbsp;
