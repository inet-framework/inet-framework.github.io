# Documentation Guidelines 

*   [Repository][1] 
*   [Bug Tracker][2] 
*   [Mailing List][3] 
*   [Coding Conventions][4] 
*   [Documenting][5] 
*   [Test Suite][6] 
*   [Submitting Code][7] 
*   [Plans][8] 
*   [Progress][9] 

We maintain documentation in the following forms: 

*   **INET Framework Manual** is meant to provide an overview about the components and architecture of the framework 
*   **INET Reference**, built from NED and C++ source, provides cross-linked, browsable reference information about the modules and classes of the implementation 

The following auxiliary files are managed by the core INET maintainers: 

*   **ChangeLogs**. Every source folder contains a `ChangeLog` file in a fixed format. ChangeLogs exist so that users can get a high level overview of the history of that component. It is usually derived from the git log by heavy editing for conciseness and clarity, e.g. by combining a series of related commit messages into a single change summary. (The git log is often too detailed and contains too much "noise" for end-user consumption.) 
*   **WHATSNEW** (in the project root directory) is updated before each release, and contains a summary of changes in the whole framework. 
*   **AUTHORS** (in the project root directory) records the names of those who contributed to the project. The [Contributors][10] page should always contain a mirror of this file. 

### The Manual

Technically: 

*   Sources are in the repository under `[doc/src/manual][11]`, in LaTeX. 
*   PDF and/or HTML built by the release manager for each release 

Content and level of details: 

*   The purpose of the Manual is to provide introductory and overview information for newcomers, and give a high-level overview of the architecture and important internal APIs for contributors. 
*   High-level information about every implemented protocol model or component, potentially including practical advice on how to use them or combine them with other models 
*   High-level overview of internal interfaces, such as cross-layer communication 

However, it should not: 

*   Be as detailed as to duplicate information in the Reference 
*   Attempt to teach or describe the protocol itself (that's not the job of the manual) 

### The Reference

We use Doxygen and the OMNeT++ IDE (*Project -> Generate NED Documentation*) to generate hyperlinked documentation from source code. The following rules help us achieve that the generated documentation is useful and looks good. 

NED documentation: 

*   We use explicit hyperlinks, i.e. the tilde notation is necessary to create a hyperlink to other modules. Examples: `the ~TCP module` (hyperlinks the TCP module), but: `the TCP protocol` (no hyperlink). 
*   NED comments document the external interface: purpose, standards compliance, parametrization, gates, etc. 
*   Provide a reference to the protocol specification, and also describe what parts of the specification are implemented and what parts are missing. 

C++ documentation: 

*   Of the many syntaxes Doxygen allows, use the //\** *|/ one. @brief lines are usually not needed. 
*   Class comments should be about the *implementation* of the given protocol (as NED already documents the purpose and external interface). When the implementation is straightforward, "Please see the NED file for details" is a perfectly fine comment. 
*   Only public methods should be documented. Don't use /\** *|/ comments for private data members, private methods, etc. (We recommend //-comments instead.)

 [1]: http://localhost:/web/inet/index.php?n=Main.Development
 [2]: http://localhost:/web/inet/index.php?n=Main.BugTracker
 [3]: http://localhost:/web/inet/index.php?n=Main.MailingList
 [4]: http://localhost:/web/inet/index.php?n=Main.CodingConventions
 [5]: http://localhost:/web/inet/index.php?n=Main.DocumentationGuidelines
 [6]: http://localhost:/web/inet/index.php?n=Main.TestSuite
 [7]: http://localhost:/web/inet/index.php?n=Main.SubmittingCode
 [8]: http://localhost:/web/inet/index.php?n=Main.Plans
 [9]: http://localhost:/web/inet/index.php?n=Main.OngoingWork
 [10]: http://localhost:/web/inet/index.php?n=Main.Contributors
 [11]: https://github.com/inet-framework/inet/tree/integration/doc/src/manual