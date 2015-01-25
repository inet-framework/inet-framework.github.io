---
layout: page
title: Getting Started
underMenu: Contributing
---

If you'd like to contribute code to the INET Framework, this page exists to help you get started.

INET is developed using the *git* revision control system, with the repository hosted at GitHub ([details](Repository.html)).

<div class="alert alert-info">
{% capture tmp %}
**New to git?** Read about it on its [web site](http://git-scm.com),
from the [GitHub help](https://help.github.com/articles/good-resources-for-learning-git-and-github/),
or [try it hands-on in a terminal](http://try.github.com/).
{% endcapture %} {{ tmp | markdownify }}
</div>

We recommend the following workflow:

1.  Create an account on GitHub, and fork the INET project to create your
    own version. Clone the new repository to your computer.

2.  Create a new topic branch for your changes, by branching either `master` (stable)
    or `integration` (development).

    <div class="alert alert-warning">
    <b>Note:</b> It is NOT safe to start off from an existing topic branch.
    Topic branches should be considered a private playing field of the person
    who created them, and may be deleted, rebased, or their history rewritten
    at any time. If a topic (or attic) branch looks interesting to you, contact
    the person who works in that branch -- don't assume anything without asking.
    </div>

3.  Commit your changes into your topic branch.

    *  We recommend that you pull from the INET repository from time to time,
       and rebase your topic branch to the tip of the `master` (or `integration`) branch.
    *  Try to keep to the coding conventions of the INET Framework. If you implement
       a new component, you can take inspiration from existing parts of the framework.
    *  If you have questions or something to discuss, don't hesitate to post to the mailing list.

4.  When you are ready to submit your changes, contact us via email, or send us
    a pull request on GitHub. If the original branch (`master` or `integration`) has
    moved on in the meantime, you should rebase your topic branch on top of it.

Pages under the *Development* menu give you general guidance on other topics.

