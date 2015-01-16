---
layout: page
title: Contributing
underMenu: Contributing
generateToC: true
---

<!--
  NOTE: The "capture" trick is used to resolve several Markdown accidents:
  - conflict of '[1]' links that occur in multiple included documents
  - '##' is not resolved immediately after a '------' line
-->


{% capture tmp %}{% include Contrib-WhyContribute.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Contrib-HowCanYouHelp.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Contrib-ThesisIdeas.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Contrib-DevelopmentTopics.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Contrib-GettingStarted.md %}{% endcapture %}{{ tmp | markdownify }}


