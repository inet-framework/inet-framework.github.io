# Submitting Code 

*   [Repository][1] 
*   [Bug Tracker][2] 
*   [Mailing List][3] 
*   [Coding Conventions][4] 
*   [Documenting][5] 
*   [Test Suite][6] 
*   [Submitting Code][7] 
*   [Plans][8] 
*   [Progress][9] 

When you have changes that you'd like to be included in the INET Framework, here is the process: 

1.  Prepare your changes (see checklist below) 
2.  Submit your changes. You can send a pull request on GitHub, or send patches via email. 
3.  Your changes will be reviewed (see details below) 
4.  When the issues found during review have been resolved, your changes will be merged by the core team 

**Checklist for the patch or pull request** 

*   should apply on top of the target branch, usually *master* or *integration*. If the target branch has moved on in the meantime, rebase your topic branch on top of it 
*   adhere to the coding convention 
*   have separate commits for 
    *   formatting and documentation changes 
    *   refactoring operations 
    *   bug fixes 
    *   new code 
*   have meaningful commit messages that helps one understand your changes 
*   existing tests (esp. fingerprint tests) should pass 
*   if you added new functionality, create tests for it 

**Code review** 

There will be two reviews: semantic and technical review. 

The semantic review will be performed by [experts][10] of the affected component, and will include: 

*   assessing that the given feature is worthwhile to include in the INET codebase 
*   checking the correctness and standards compliance of the implementation 

The technical review will be done by the core team: 

*   code must adhere to the coding conventions and follow the INET architecture 
*   documentation should exists (or has been updated) 
*   tests should exist (or have been updated) 
*   small changes like updating ChangeLogs, AUTHORS and .oppfeatures, and adding smoke/fingerprint tests can be left to the core team

 [1]: http://localhost:/web/inet/index.php?n=Main.Development
 [2]: http://localhost:/web/inet/index.php?n=Main.BugTracker
 [3]: http://localhost:/web/inet/index.php?n=Main.MailingList
 [4]: http://localhost:/web/inet/index.php?n=Main.CodingConventions
 [5]: http://localhost:/web/inet/index.php?n=Main.DocumentationGuidelines
 [6]: http://localhost:/web/inet/index.php?n=Main.TestSuite
 [7]: http://localhost:/web/inet/index.php?n=Main.SubmittingCode
 [8]: http://localhost:/web/inet/index.php?n=Main.Plans
 [9]: http://localhost:/web/inet/index.php?n=Main.OngoingWork
 [10]: http://localhost:/web/inet/index.php?n=Main.ComponentExperts