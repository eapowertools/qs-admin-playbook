---
layout: default
title: Tooling Appendix
has_children: true
nav_order: 7
permalink: docs/tooling_appendix
---
# Tooling Appendix

This section is intended to provide a high-level overview of the tools that the Playbook references. The Playbook does not house exhaustive documentation/instructions for each tool, but will provide an outline of what the tool does and direct to the relevant docs/downloads.

------


| Name                                                                   | Description                                                    |  Category           | Distribution Method | Format          | Source                                                                 | Supported By                                | Complexity |
|------------------------------------------------------------------------|----------------------------------------------------------------|---------------------|---------------------|-----------------|------------------------------------------------------------------------|---------------------------------------------|------------|
| [License Monitor](./tooling/license_monitor.html)                      | Qlik app to monitor license usage                              | Asset Management    | Native - Installed  | QVF             | N/A, Installed                                                         | Qlik                                        | Low        |
| [Operations Monitor](./tooling/operations_monitor.html)                | Qlik app to monitor performance, reloads, sessions, and more   | Asset Management    | Native - Installed  | QVF             | N/A, Installed                                                         | Qlik                                        | Low        |
| [App Metadata Analyzer](./tooling/app_metadata_analyzer.md)            | Qlik app to inspect data model metadata                        | Asset Management    | Native - Hidden     | QVF             | C:\ProgramData\Qlik\&nbsp;<br>Sense\Repository\DefaultApps             | Qlik                                        | Low        |
| [Reload Monitor](./tooling/reloads_monitor.html)                       | Qlik app to monitor reloads                                    | Asset Management    | Native - Hidden     | QVF             | C:\ProgramData\Qlik\&nbsp;<br>Sense\Repository\DefaultApps             | Qlik                                        | Low        |
| [Data Connection Analyzer](./tooling/data_connection_analyzer.html)    | Qlik app to map apps <> data connections                       | Asset Management    | 3rd Party           | QVF             | [Github](https://github.com/eapowertools/qs-data-connection-analyzer)  | Americas Enterprise Architecture Team, Qlik | Low        |
| [QVD Monitor](./tooling/qvd_monitor.html)                              | Qlik app to monitor QVDs                                       | Asset Management    | 3rd Party           | QVF             | [Github](https://github.com/eapowertools/qs-qvd-monitor)               | Americas Enterprise Architecture Team, Qlik | Low        |
| [Security Rules Analyzer]()                                            | Qlik app to flag non-performant security rules                 | Asset Management    | 3rd Party           | QVF             | [Github](https://github.com/eapowertools/qs-security-rule-analyzer)    | Americas Enterprise Architecture Team, Qlik | Low        |
| [Telemetry Dashboard](./tooling/telemetry_dashboard.html)              | Qlik app to monitor granular performance metrics in Qlik apps  | Performance         | 3rd Party           | QVF + Application | [Github](https://github.com/eapowertools/qs-telemetry-dashboard)       | Americas Enterprise Architecture Team, Qlik | Medium     |
| [Extension Usage Dashboard](./tooling/extension_usage_dashboard.html)  | Qlik app to map apps <> extensions                             | Asset Management    | 3rd Party           | QVF + Application | [Github](https://github.com/eapowertools/qs-extension-usage-dashboard) | Americas Enterprise Architecture Team, Qlik | Low        |
| [Qlik CLI](./tooling/qlik_cli.html)                                    | PowerShell library to automation                               | Automation          | 3rd Party           | PowerShell      | [Github](https://github.com/ahaydon/Qlik-Cli)                          | Adam Haydon, Qlik                           | Medium     |
| [Cache Warming](./tooling/cache_warming.md)                            | Programmatic tools to cache Qlik apps                          | Performance         | 3rd Party           | Application     | Various (see article)                                                  | Various                                     | Medium     |

------

{: .no_toc }

