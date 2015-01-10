---
layout: page
title: Submitting Code
underMenu: Development
---

When you have changes that you'd like to be included in the INET Framework, here is the process:

1.  Prepare your changes (see checklist below)
2.  Submit your changes. You can send a pull request on GitHub, or send patches via email.
3.  Your changes will be reviewed (see details below)
4.  When the issues found during review have been resolved, your changes will be merged by the core team

**Checklist for the patch or pull request**

*   should apply on top of the target branch, usually *master* or *integration*. 
    If the target branch has moved on in the meantime, rebase your topic branch on top of it
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

The semantic review will be performed by [experts][1] of the affected component, and will include:

*   assessing that the given feature is worthwhile to include in the INET codebase
*   checking the correctness and standards compliance of the implementation

The technical review will be done by the core team:

*   code must adhere to the coding conventions and follow the INET architecture
*   documentation should exists (or has been updated)
*   tests should exist (or have been updated)
*   small changes like updating ChangeLogs, AUTHORS and .oppfeatures, and adding smoke/fingerprint tests can be left to the core team

 [1]: ComponentExperts.html

