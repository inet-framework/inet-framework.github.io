---
layout: page
title: Installing INET
underMenu: Documentation
---

<div class="alert alert-warning">
<p><b>Prerequisite:</b> Download and install OMNeT++ from <a href="http://omnetpp.org" target="_blank">omnetpp.org</a>.</p>
</div>

## Automatic Installation

Recent versions of the OMNeT++ IDE can download and install INET (the latest stable version) for you.

How does it work?

1. Open the OMNeT++ IDE (`omnetpp`)
2. Go to the workbench (dismiss the Welcome screen). The first time you do this, a prompt will ask if you want to install INET. 
3. Keep the boxes checked and proceed.

If you skipped this step (opened the workbench but skipped installing INET), nothing is lost:

1. Go to *Help -> Install Simulation Models*. 
2. A dialog will appear with the available simulation models. Currently only INET is listed there, simply select it and follow the prompts.

Both ways, the IDE will download, unzip, and automatically build INET from the sources.

## Manual Installation

You'll need manual installation if you downloaded an INET version other than 
the latest stable one, or you have cloned the INET git repository to the local filesystem. 
The only "tricky" part is how to import the project into the workspace.

1. Download the INET sources
2. Unpack it into the directory of your choice: `tar xvfz inet-<version>.tgz`
3. Start the OMNeT++ IDE, and import the project via *File -> Import -> Existing Projects to the Workspace*. A project named `INET` should appear.
4. Build with *Project -> Build*, or hit <kbd>Ctrl+B</kbd>
5. Now you should be able to launch example simulations. 

Please also read the `INSTALLATION` file in the INET sources, as it may contain additional information.

