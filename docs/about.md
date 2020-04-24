---
layout: default
title: About
nav_order: 8
permalink: docs/about
---

# About
{: .no_toc }

The _Qlik Sense Admin Playbook_ is designed and intended to be a repository of best practices for a Qlik Administrator to reference. It is maintained by the Americas Enterprise Architecture team at Qlik. The Playbook covers many activities and exercises that help to maintain a high-performing and easily manageable site.

{::options parse_block_html="true" /}
<div class="card">
<div class="card-header-warning">
<i class="fas fa-exclamation-triangle fa-sm"></i> Word of Caution
</div>
<div class="card-body">
<p>The goal of this repository is to outline best practices and reference example work-flows or tooling which can be used. It is not intended that the actions be completed verbatim, as they will need to be interpreted/customized as per the needs of each individual organization. Do not go through any exercise in the Playbook blindly--ensure that each has been thorougly reviewed and tested before they are attempted, as some of the exercises physically remove assets and alter site configuration.
<br><br>
**The Admin Playbook is not supported by Qlik**, but rather is maintained by Qlik employees.
</p>
</div>
</div>

{::options parse_block_html="true" /}
<div class="card">
<div class="card-header-support">
<i class="fas fa-hands-helping fa-sm"></i> Site Support
</div>
<div class="card-body">
<p>If there are requests for additional enhancements of the site, including additional documentation or coverage, or if something isn't working as expected, please submit an issue on GitHub [here](https://github.com/eapowertools/qs-admin-playbook/issues).</p>
</div>
</div>


## Playbook Lifecycle

The cadence of the activities shown on the Playbook itself are common, yet they will not fit every organization, or might fit an organization for a period, and then shift. It is encouraged to work through the Playbook at the recommended starting cadence and adapt the Playbook of each organization's deployment. Some activities may be more or less useful / relevant for an organization, so review the outcomes and make appropriate adjustments. There is no "one size fits all" solution, as every organization has different needs and faces challenges that evolve over time.

### Customization

Give that the Playbook doesn't currently support customization via the web interface, a Qlik Application has been created that can load in a csv of the Playbook's itinerary, and can be customized within Qlik--linking live back to the site.

Find the Playbook qvf and associated xlsx [here](https://github.com/eapowertools/qs-admin-playbook/tree/master/attachments/custom_app).

## Icons Used Throughout the Site

### Tooling <i class="fas fa-tools fa-xs"></i>

This icon is used to denote that the section either requires or is a tool that has been created that is not directly supported by Qlik. Many of them are simply qvf files with minimal configuration, but others involve custom installers, etc. Documentation is provided for all tools referenced, and all repositories, at the time that this was written, are currently active and supported by their owners--many of whom work for Qlik.

{::options parse_block_html="true" /}
<div class="card">
<div class="card-header-support">
<i class="fas fa-tools fa-xs"></i> Tooling Support
</div>
<div class="card-body">
<p>Many of the actions and exercises within these best practices involve third-party tools, and those tools are not directly supported by Qlik. For support for these tools, add an issue to the tool's GitHub page (e.g. the [issues page for the Telemetry Dashboard](https://github.com/eapowertools/qs-telemetry-dashboard/issues)). </p>
</div>
</div>

### Script <i class="fas fa-file-code fa-xs" title="API | Requires Script"></i> 

This icon denotes that the section offers a solution that _could_ be achieved with script, marked by the asterisk, or a section that requires script. The vast majority of the sections offer solutions that can be automated with scripts, but in most cases, it is not required. The script icon frequently is found on sections where solutions involving the [Qlik Cli](tooling/qlik_cli.md) are offered. Other times, the icon may denote the use of the command line, Engine API, or otherwise.

