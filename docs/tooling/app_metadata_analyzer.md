---
layout: default
title: App Metadata Analyzer
nav_order: 1
parent: Tooling Appendix
---

# App Metadata Analyzer
{:.no_toc}

<span class="label dev">development</span><span class="label prod">production</span>

| <i class="far fa-clock fa-sm"></i> **Estimated Configuration Time**   | 5 min  |

## Table of Contents
{:.no_toc}

* TOC
{:toc}

-------------------------

## About

**_The App Metadata Analyzer is now a supported application that is shipped with Qlik Sense as of the September 2019 release._**

The App Metadata Analyzer iterates over every application metadata endpoint along with several other QRS calls (Nodes, Apps, Proxies, LB audit), ultimately providing a comprehensive dashboard to analyze your application metadata server-wide.

This allows you to have a holistic view of the makeup of all of your Qlik applications, enabling you to have awareness at a granular level of the types of applications in your organization. This application is 100% native to Qlik without any installer, and is easy to configure within the Qlik Sense Enterprise environment as the app takes advantage of the existing 'monitor_apps_REST_app' connection to drive all of the REST calls.
 
As of the Qlik Sense June 2018 release, a new application level metadata endpoint is available. Data is populated for this endpoint per app post-reload in a June 2018+ environment. You can view this application metadata within your own June 2018+ environment at:

`http(s)://<server>/api/v1/apps/<GUID>/data/metadata`
 
where `<server>` is your Qlik Sense Enterprise server and `<GUID>` is the application ID. Note that the application does not need to be lifted into RAM for the metadata to be accessed.

Data from this endpoint is derived as part of the app reload process, and therefore does not include any object or expression related metadata. 

**The data from the endpoint includes:**

- server metadata including number of server cores, total server RAM
- reload time
- app RAM base footprint
- field metadata including cardinality, tags, total count, RAM size
- table metadata including fields, rows, key fields, RAM size

<details>

```json
{
    "reload_meta": {
        "cpu_time_spent_ms": 12696,
        "hardware": {
            "logical_cores": 4,
            "total_memory": 13018009600
        }
    },
    "static_byte_size": 252583030,
    "fields": [
        {
            "name": "$Field",
            "src_tables": [],
            "is_system": true,
            "is_hidden": true,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 239,
            "total_count": 244,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": false,
            "comment": "",
            "tags": [
                "$ascii",
                "$text",
                "$hidden",
                "$system",
                "$key"
            ],
            "byte_size": 6208
        },
        {
            "name": "$Table",
            "src_tables": [],
            "is_system": true,
            "is_hidden": true,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 7,
            "total_count": 244,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": false,
            "comment": "",
            "tags": [
                "$ascii",
                "$text",
                "$hidden",
                "$system",
                "$key"
            ],
            "byte_size": 110
        },
        {
            "name": "$Rows",
            "src_tables": [],
            "is_system": true,
            "is_hidden": true,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 5,
            "total_count": 7,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": true,
            "comment": "",
            "tags": [
                "$numeric",
                "$integer",
                "$hidden",
                "$system"
            ],
            "byte_size": 70
        },
        {
            "name": "$Fields",
            "src_tables": [],
            "is_system": true,
            "is_hidden": true,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 5,
            "total_count": 7,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": true,
            "comment": "",
            "tags": [
                "$numeric",
                "$integer",
                "$hidden",
                "$system"
            ],
            "byte_size": 59
        },
        {
            "name": "$FieldNo",
            "src_tables": [],
            "is_system": true,
            "is_hidden": true,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 114,
            "total_count": 244,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": true,
            "comment": "",
            "tags": [
                "$numeric",
                "$integer",
                "$hidden",
                "$system"
            ],
            "byte_size": 1374
        },
        {
            "name": "$Info",
            "src_tables": [],
            "is_system": true,
            "is_hidden": true,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 1,
            "total_count": 239,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": false,
            "comment": "",
            "tags": [
                "$ascii",
                "$text",
                "$hidden",
                "$system"
            ],
            "byte_size": 6
        },
        {
            "name": "Game URL",
            "src_tables": [
                "Plays"
            ],
            "is_system": false,
            "is_hidden": false,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 2298,
            "total_count": 343045,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": false,
            "comment": "",
            "tags": [
                "$ascii",
                "$text"
            ],
            "byte_size": 174648
        },
        {
            "name": "GameID",
            "src_tables": [
                "Plays",
                "Link",
                "FinalScores",
                "GamePassStats",
                "PlayerPassStats"
            ],
            "is_system": false,
            "is_hidden": false,
            "is_semantic": false,
            "distinct_only": true,
            "cardinal": 2304,
            "total_count": 0,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": true,
            "comment": "",
            "tags": [
                "$numeric",
                "$integer",
                "$key"
            ],
            "byte_size": 46080
        },
        {
            "name": "PlayerPassStats.yacEPA_Drop",
            "src_tables": [
                "PlayerPassStats"
            ],
            "is_system": false,
            "is_hidden": false,
            "is_semantic": false,
            "distinct_only": false,
            "cardinal": 5270,
            "total_count": 5492,
            "is_locked": false,
            "always_one_selected": false,
            "is_numeric": true,
            "comment": "",
            "tags": [
                "$numeric"
            ],
            "byte_size": 171202
        }
    ],
    "has_section_access": false
}

```  
{:.snippet}
</details>

-------------------------

## Demo & Analysis

For a demo video and information on the benefits of the application, see: [Analyze App Metadata Analyzer](../asset_management/apps/analyze_app_metadata_analyzer.md).

-------------------------

## Where to get it

The application can be found in `%ProgramData%\Qlik\Sense\Repository\DefaultApps` on the Qlik Sense Enterprise Server and is titled _App Metadata Analyzer.qvf_ (**Note** Qlik Sense Enterprise September 2019 or newer versions). It is however encouraged to download the latest copy of the app from [Qlik Community - Sense App Metadata Analyzer](https://community.qlik.com/t5/Qlik-Monitoring-Administration/Sense-App-Metadata-Analyzer/gpm-p/1592163) to receive the latest updates and bug fixes.

Either copy of the app can be implemented on a Qlik Sense Enterprise site which is June 2018 or newer.

-------------------------

## Screenshots

![sense_app_metadata_analyzer_dashboard.png](images/sense_app_metadata_analyzer_dashboard.png)

![sense_app_metadata_analyzer_threshold.png](images/sense_app_metadata_analyzer_threshold.png)

![sense_app_metadata_analyzer_app_analysis.png](images/sense_app_metadata_analyzer_app_analysis.png)

![sense_app_metadata_analyzer_app_availability.png](images/sense_app_metadata_analyzer_app_availability.png)

-------------------------

## Documentation

[App Metadata Analyzer - Qlik Help](https://help.qlik.com/en-US/sense-admin/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Monitoring_QSEoW/app-metadata-analyzer-app.htm)

**Tags**

#tooling

#apps

&nbsp;
