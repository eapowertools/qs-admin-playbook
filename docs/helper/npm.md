---
layout: default
title: 404
nav_exclude: true
---

# NPM

If Qlik Sense Server is installed, which means that the Node.js standalone installer has *not* been downloaded, NPM will need to be downloaded and installed. If the Node.js installer has already been run, this process can be skipped.

First, the latest version of NPM must be downloaded from [here](https://github.com/npm/npm/releases). The release tagged **Latest release** with a green tag is the likely the desired version. Scroll down to **Downloads** and click on **Source code (zip)**.

1. Once the source code has been downloaded, unzip the file and navigate into the `npm-<version>/bin` folder.  
2. **Copy** the three npm files (`npm`, `npm.cmd`, nad `npm-cli.js`) in to `C:\Program Files\Qlik\Sense\ServiceDispatcher\Node`.  
3. Create a folder called `node_modules` in `C:\Program Files\Qlik\Sense\ServiceDispatcher\Node`. Admin rights are required.  
4. Rename the downloaded and extracted `npm-<version>` folder to `npm`, then **move** the entire `npm` folder into `node_modules`. The end result should be: `C:\Program Files\Qlik\Sense\ServiceDispatcher\Node\node_modules\npm\`. The npm folder should have all the root files from the downloaded source.  

Following, add the `Node` folder to the Windows _Path_.

1. Open the `Control Panel` and select `System`.
2. Select the `Advanced system settings` on the left.
3. Click the `Environment Variables...` button.
4. Under `System Variables`, select `Path`, then click `Edit`.
5. Add the following folder location `C:\Program Files\Qlik\Sense\ServiceDispatcher\Node\`. _Note that every path in the environment variable should be separated by a single semicolon, so there should be one before and one after the folder location._
6. Restart all cmd prompts to ensure the environmental variables are the latest.

Test that npm is working by opening a new Windows cmd prompt and typing in `npm` and hitting enter.
