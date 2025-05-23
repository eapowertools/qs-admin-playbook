---
layout: no_toc_layout
title: Tooling Appendix
has_children: true
nav_order: 7
permalink: docs/tooling_appendix.html
---
# Tooling Appendix

This section is intended to provide a high-level overview of the tools that the Playbook references. The Playbook does not house exhaustive documentation/instructions for each tool, but will provide an outline of what the tool does and direct to the relevant docs/downloads.

------


| Name                                                                   | Description                                                    |  Category           | Distribution Method | Format          | Source                                                                 | Supported By                                  |
|------------------------------------------------------------------------|----------------------------------------------------------------|---------------------|---------------------|-----------------|------------------------------------------------------------------------|-----------------------------------------------|
| [License Monitor](./tooling/license_monitor.md)                      | Qlik app to monitor license usage                              | Asset Management    | Native - Installed  | QVF             | N/A, Installed                                                         | Qlik                                          |
| [Operations Monitor](./tooling/operations_monitor.md)                | Qlik app to monitor performance, reloads, sessions, and more   | Asset Management    | Native - Installed  | QVF             | N/A, Installed                                                         | Qlik                                          |
| [App Metadata Analyzer](./tooling/app_metadata_analyzer.md)            | Qlik app to inspect data model metadata                        | Asset Management    | Native - Hidden     | QVF             | C:\ProgramData\Qlik\&nbsp;<br>Sense\Repository\DefaultApps             | Qlik                                          |
| [Reload Monitor](./tooling/reloads_monitor.md)                       | Qlik app to monitor reloads                                    | Asset Management    | Native - Hidden     | QVF             | C:\ProgramData\Qlik\&nbsp;<br>Sense\Repository\DefaultApps             | Qlik                                          |
| [Data Connection Analyzer](./tooling/data_connection_analyzer.md)    | Qlik app to map apps <> data connections                       | Asset Management    | 3rd Party           | QVF             | [Github](https://github.com/eapowertools/qs-data-connection-analyzer)  | Americas Enterprise Architecture Team, Qlik   |
| [QVD Monitor](./tooling/qvd_monitor.md)                              | Qlik app to monitor QVDs                                       | Asset Management    | 3rd Party           | QVF             | [Github](https://github.com/eapowertools/qs-qvd-monitor)               | Americas Enterprise Architecture Team, Qlik   |
| [Security Rules Analyzer](./tooling/security_rule_analyzer.md)                                            | Qlik app to flag non-performant security rules                 | Asset Management    | 3rd Party           | QVF             | [Github](https://github.com/eapowertools/qs-security-rule-analyzer)    | Americas Enterprise Architecture Team, Qlik   |
| [Telemetry Dashboard](./tooling/telemetry_dashboard.md)              | Qlik app to monitor granular performance metrics in Qlik apps  | Performance         | 3rd Party           | QVF + Application | [Github](https://github.com/eapowertools/qs-telemetry-dashboard)       | Americas Enterprise Architecture Team, Qlik |
| [Extension Usage Dashboard](./tooling/extension_usage_dashboard.md)  | Qlik app to map apps <> extensions                             | Asset Management    | 3rd Party           | QVF + Application | [Github](https://github.com/eapowertools/qs-extension-usage-dashboard) | Americas Enterprise Architecture Team, Qlik |
| [Qlik CLI for Windows](./tooling/qlik_cli.md)                                    | PowerShell library to automation                               | Automation          | 3rd Party           | PowerShell      | [Github](https://github.com/ahaydon/Qlik-Cli-Windows)                          | Adam Haydon, Qlik                             |
| [Cache Warming](./tooling/cache_warming.md)                            | Programmatic tools to cache Qlik apps                          | Performance         | 3rd Party           | Application     | Various (see article)                                                  | Various                                       |

{: .no_toc }
