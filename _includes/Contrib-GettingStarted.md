## Getting Started

If you'd like to contribute code to the INET Framework, this page exists to help you get started.

INET is developed using the [git][5] revision control system, with the repository hosted at [Github][6] ([details][7]).

**NOTE:** It is essential that you get at least some moderate knowledge of how `git` is working. There are numerous tutorials for `git` on the net. You may start with the [slides of the INET@github talk][8] from the 2009 OMNeT++ Workshop. This presentation details how INET is hosted and describes the basic commands you will need to manage your repository.

We recommend the following workflow:

*   Create an account on GitHub, and fork the INET project to create your own version. Clone the new repository to your computer.

*   Decide whether you want to base your work on the stable branch (`master`) or on the development branch (`integration`).

*   Create a new git branch (off `master` or `integration`) for your changes.

    **Note:** It is **not** safe to start off from an existing topic branch. (Topic branches should be considered a private playing field of the person who created them, and may be deleted, rebased, or their history rewritten at any time. If a topic (or attic) branch looks interesting to you, contact the person who works in that branch -- don't assume anything without asking.)



*   While programming, try to keep to the coding conventions of the INET Framework. If you implement a new component, you can take inspiration from existing parts of the framework.

*   If you want to keep up with the development in the INET repository (recommended), you may want to pull the changes periodically and rebase your current topic branch.

*   If you have questions or something to discuss, don't hesitate to post to the mailing list.

*   To submit your changes, you can write an email, or send us a pull request on GitHub. If the original branch (`master` or `integration`) has moved on in the meantime, you should rebase your topic branch on top of it.

The [Development][9] page gives you general guidance on other topics.

 [5]: http://git-scm.com
 [6]: http://www.github.com
 [7]: Repository.html
 [8]: http://www.omnet-workshop.org/2009/docs/andras-varga.pdf
 [9]: Development.html