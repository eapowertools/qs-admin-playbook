---
layout: default
title: Remove Unused Data Connections
parent: Data Connections
grand_parent: Asset Management
nav_order: 3
---

# Remove Unused Data Connections <i class="fas fa-tools fa-xs" title="Tooling | Pre-Built Solutions"></i> <i class="fas fa-file-code fa-xs" title="API | Script Optional"></i>*
{:.no_toc}

<span class="label dev">development</span><span class="label prod">production</span>

|                                  		          | Initial   | Recurring  |
|---------------------------------------------------------|-----------|------------|
| <i class="far fa-clock fa-sm"></i> **Estimated Time**   | 1/2 day   | 30 min     |

Benefits:

  - Decrease data connection security rule evaluation time (increase performance)
  - Decrease maintenance
  - Increase focus
  - Eliminate redundancy
  
-------------------------

## Goal
{:.no_toc}
Removing unused connections on a regular basis decreases clutter, improves performance, and creates a better user experience. The goal of this section is to leave only the data connections that are necessary for analysis.

## Table of Contents
{:.no_toc}

* TOC
{:toc}
-------------------------

## Data Connection Usage

Data connections are a bit of a difficult entity to map to associated resources, as they are not directly mapped in the QRS to the apps that are using them. Data connections are evaluated in the script, and leveraged at the time of reload. 

There are two primary options for mapping data connections:
- The `lineage` endpoint of an application
  - Accessible via the [Qlik Engine REST API](https://help.qlik.com/en-US/sense-developer/APIs/QIXAPI/index.html?page=8) lineage endpoint, available as of the June 2019 release
  - Accessible via the [Qlik Engine API](https://help.qlik.com/en-US/sense-developer/Subsystems/EngineAPI/Content/Sense_EngineAPI/introducing-engine-API.htm)
- Parsing of evaluated script logs, as demonstrated by the [Data Connection Analyzer](../../tooling/data_connection_analyzer.md)

Pros and cons of the `lineage` option:

| Pros                                                                | Cons                                                                                                                                                                                    |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Simple to iterate over (the RESTful option) from a Qlik load script | Returns fully evaluated folder paths, so that they cannot be properly mapped back to their respective lib:// connections--ultimately not allowing the mapping of any Folder connections |
| Quick and efficient                                                 | Can be difficult to parse the result                                                                                                                                                    |
| Includes INLINE and AUTOGENERATE loads                              | Does not include any history -- only most recent reload                                                                                                                                 |
|                                                                     | Does not offer insight what user used them when                                                                                                                                         |
|                                                                     | Does not offer insight into how many times they were used                                                                                                                               |
|                                                                     |                                                                                                                                                                                         |
|                                                                     |                                                                                                                                                                                         |
|                                                                     |                                                                                                                                                                                         |
|                                                                     |                                                                                                                                                                                         |

Pros and cons of the [Data Connection Analyzer](../../tooling/data_connection_analyzer.md) option:

| Pros                                                                           | Cons                                                                                           |
|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Robust logic to handle all data connection types, including Folder connections | Can take many hours to run the first time, as it can parse thousands of logs                   |
| Has the ability to capture logs from all time                                  | Can potentially produce false positives for unused data connections (see app docs for details) |
| Can be used for comprehensive audit                                            |                                                                                                |
| Tracks what users used what connections when                                   |                                                                                                |
| Tracks how many time data connections have been run                            |                                                                                                |
| Tracks the source of the reload: Hub, Scheduler, or ODAG (api)                 |                                                                                                |
|                                                                                |                                                                                                |
|                                                                                |                                                                                                |
|                                                                                |                                                                                                |

-------------------------

## Unused Data Connections <i class="fas fa-tools fa-xs" title="Tooling | Pre-Built Solutions"></i>

To capture unused data connections, either of the two options from the **Data Connection Usage** section above may be employeed. _If using the `lineage` option, the resulting connections will need to be mapped back to the existing connections in the QRS. Please note the issue with that endpoint and Folder type connections, documented above._

In this section, we will use the [Data Connection Analyzer](../../tooling/data_connection_analyzer.md).

There are two sheets that should be focused on within that application:
- _Used Connections That Have Not Been Used Within 90 Days_
  - This sheet illustrates connections that were at one point active, but sometime over the last 90 days, they have fallen inactive--meaning, there are currently no applications that leverage them. This variable is configurable in the load script, and should be set according to corporate policy.
  `SET vNumDaysForUsedDataConnectionToBeConsideredUnused = 90;`
  
  [![unused_data_connections_native_1.png](images/unused_data_connections_native_1.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/data_connections/images/unused_data_connections_native_1.png)

- _Unused Connection Analysis_
  - This sheet shows connections that have been used, by the only apps that ever used them have been deleted, as well as connections that have never been used.

  [![unused_data_connections_native_2.png](images/unused_data_connections_native_2.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/data_connections/images/unused_data_connections_native_2.png)

-------------------------

## Suggested Actions

It is suggested that data connections be deleted _manually_, and that all data connections are validated for usage by the owner before deletion. The Data Connection Analyzer is largely accurate, but should not be treated as 100% so--validation must be done with the users. It is also suggested to first "quarantine" the data connections before deleting them. 

### Suggested Quarantine Method

An example of "Quarantining" a data connection can be done by following these steps:

1. Rename the data connection by prepending `QUARANTINED - ` to its name. For example, `My Data Connection (directory_owner)` becomes `QUARANTINED - My Data Connection (directory_owner)`

2. Change the owner of the data connection to `sa_repository`

3. Create a custom property named `QuarantinedDataConnection` where the value of `true` is applied to any quarantined connection.

4. Modify any existing customized security rules on data connections, leveraging the `QuarantinedDataConnection` custom property to negate them. For example, `((user.group="YourGroup"))` becomes `((user.group="YourGroup" and resource.@QuarantinedDataConnection.Empty()))`.
	
These name change ensures that the data connection cannot be read in an application's script by the scheduler, and owner change confirms that the original owner of the user can no longer read the connection via the default security rule `OwnerRead`, and the security rule modifications ensure that the users cannot read the data connections by some other custom data connection rules if they have a value in the `QuarantinedDataConnection` custom property.

[![unused_data_connections_native_3.png](images/unused_data_connections_native_3.png)](https://raw.githubusercontent.com/qs-admin-guide/qs-admin-playbook/master/docs/asset_management/data_connections/images/unused_data_connections_native_3.png)

### Priority

1. Connections that have never been used, especially connections that were not created recently. Recently created connections that have never been used simply may not have been used yet--so those should not be removed. Otherwise, these connections are purely clutter, that more than likely were once used for testing connectivity.

2. Connections that were used by applications where the applications have now been deleted. These are more than likely deprecated data sources.

3. Used data connections that haven't been used in "x" days. 

### Data Connection Backup

It might not be the worst idea to take a snapshot of all data connections before removal, in case one needs to be recreated. Data connections are not typically difficult to configure, but it is nice to have to reference in case.

-------------------------

### Scripts to Manage Unused Data Connections <i class="fas fa-file-code fa-xs" title="API | Script Optional"></i>

**It is highly recommended to delete data connections manually, after validating with their respective owners. Please refer to the _Suggestions_ section above. The scripts below show how data connections can be backed up and programmatically flagged. The flagging (adding of a custom property value) allows for the administrator to temporarily "quarantine" the connections pre-removal.**

#### Script to Backup All Data Connections

```powershell
# Script to backup data connections to json

# Parameters
# Assumes default credentials are used for the Qlik CLI Connection

$computerName = '<machine-name>'
# leave empty if windows auth is on default VP
$virtualProxyPrefix = '/default'
# directory for the output file
$outFilePath = 'C:\'
# desired filename of the output file
$outFileName = 'flagged_unused_connections'

################
##### Main #####
################

# set the output file path
$outFile = ($outFilePath + $outFileName + '.json')

# set the computer name for the Qlik connection call
$computerNameFull = ($computerName + $virtualProxyPrefix).ToString()

# connect to Qlik
Connect-Qlik -ComputerName $computerNameFull -UseDefaultCredentials -TrustAllCerts

# GET all data connection's full JSON elements and write them to a file
Get-QlikDataConnection -raw -full | ConvertTo-Json | Set-Content $outFile
```
{:.snippet}

#### Script to Add Custom Property value to Data Connections from an Excel Export

It is assumed that the **Data Connection ID** column has been added to a table in the **Data Connection Analyzer** and exported to Excel. This file is then referenced in the below script.

```powershell
# Script to import data connection ids from excel and add a custom property value to them, 
# as well as optionally change name and ownership.

# If the custom property doesn't exist, it will be created.
# Assumes the ImportExcel module: `Install-Module -Name ImportExcel`.

# GUID validation code referenced from: 
# 	https://pscustomobject.github.io/powershell/functions/PowerShell-Validate-Guid-copy/

# Parameters 
# Assumes default credentials are used for the Qlik CLI Connection

$computerName = '<machine-name>'
# leave empty if windows auth is on default VP
$virtualProxyPrefix = '/default'
# fully qualified path to excel file with data connection ids
$inputXlsxPath = '<fully qualified directory>\<filename>.xlsx'
# column number of data connection id column in Excel file
$dataConnectionIdColumnNumber = '12'
# name of the custom property to put on unused data connections--if it doesn't exist it will be created
$customPropertyName = 'QuarantinedDataConnection'
# 1 for true and 0 for false
$changeOwner = 1
# 1 for true and 0 for false
$changeName = 1
# directory for the output file
$outFilePath = 'C:\'
# desired filename of the output file
$outFileName = 'flagged_unused_connections'
 
################
##### Main #####
################

# set the output file path
$outFile = ($outFilePath + $outFileName + '.csv')

# set the computer name for the Qlik connection call
$computerNameFull = ($computerName + $virtualProxyPrefix).ToString()

# if the output file already exists, remove it
if (Test-Path $outFile) 
{
  Remove-Item $outFile
}

# function to validate GUIDs
function Test-IsGuid
{
	[OutputType([bool])]
	param
	(
		[Parameter(Mandatory = $true)]
		[string]$ObjectGuid
	)
	
	[regex]$guidRegex = '(?im)^[{(]?[0-9A-F]{8}[-]?(?:[0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?$'
	return $ObjectGuid -match $guidRegex
}

# import data connection ids from excel
$data = Import-Excel $inputXlsxPath -DataOnly -StartColumn $dataConnectionIdColumnNumber `
 -EndColumn $($dataConnectionIdColumnNumber + 1)

# validate GUIDs and only use those (handles nulls/choosing wrong column)
$dataConnectionIds = $data | foreach { $_.psobject.Properties } | where Value -is string `
| foreach { If(Test-IsGuid -ObjectGuid $_.Value) {$_.Value} }

# connect to Qlik
Connect-Qlik -ComputerName $computerNameFull -UseDefaultCredentials -TrustAllCerts

# GET the sa_repository user
$sa_repository = Get-QlikUser -filter "userId eq 'sa_repository' and userDirectory eq 'INTERNAL'"

# GET the custom property to use for unused data connections
$dataConnectionCustomProperty = Get-QlikCustomProperty -filter "name eq '$customPropertyName'" -raw

# GET the id of the custom property
$dataConnectionCustomPropertyId = $dataConnectionCustomProperty.id

# if the custom property doesn't exist, create it ($customPropertyName)
if (!$dataConnectionCustomProperty) {
	$dataConnectionCustomProperty = New-QlikCustomProperty -name "$customPropertyName" `
	-objectType "DataConnection" -choiceValues "true" -raw
}

# for each data connection id
foreach ($dataConnection in $dataConnectionIds) {

	# GET the existing data connection's full JSON
	$resp = Get-QlikDataConnection -id $dataConnection -raw

	# store the current name of the data connection
	$dataConnectionName = $resp.name

	# get the current custom properties assigned to the data connection, if any
	$currentCustomProperties = $resp.customProperties

	# set a flag to check if the custom property already is assigned to the data connection
	$dataConnectionPropAlreadyThere = $false

	# for each custom property in the data connection's current custom propertys
	foreach ($customProperty in $currentCustomProperties) {

		# if the custom property is already there, set the flag to "true"
		if ($customProperty.definition.id -eq $dataConnectionCustomPropertyId) {
			$dataConnectionPropAlreadyThere = $true
			break
		}
	}

	# if the custom property isn't already there, 
	# create the JSON element for it and add it to the array
	if (!$dataConnectionPropAlreadyThere) {

		$newCustomProp = @{
			value = "true"
			definition = @{
				id = "$dataConnectionCustomPropertyId"
			}
		}

		$resp.customProperties += $newCustomProp
	}

	# change the name of the data connection, set by the $changeName flag
	if ($changeName) {$resp.name = $('QUARANTINED - ' `
		+ $resp.name.Replace('QUARANTINED - ',''))}

	# change the owner of the data connection, set by the $changeOwner flag
	if ($changeOwner) {$resp.owner = $sa_repository}

	# convert the response to JSON
	$resp = $resp | ConvertTo-Json -depth 10

	# PUT the new data connection
	Invoke-QlikPut -path /qrs/dataconnection/$dataConnection -body $resp

	# logging
	'PUT: ' + $dataConnectionName + ',' + $dataConnection
	Add-Content -Path $outFile -Value $($dataConnectionName + ',' + $dataConnection)
}
```
{:.snippet}

**Tags**

#monthly

#asset_management

#data_connections

&nbsp;
