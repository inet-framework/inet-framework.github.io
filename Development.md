---
layout: page
title: Development
underMenu: Development
generateToC: true
---

<!-- 
  NOTE: The "capture" trick is used to resolve several Markdown accidents: 
  - conflict of '[1]' links that occur in multiple included documents
  - '##' is not resolved immediately after a '------' line
-->


{% capture tmp %}{% include Devel-Repository.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Devel-BugTracker.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Devel-MailingList.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Devel-CodingConventions.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Devel-DocumentationGuidelines.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Devel-TestSuite.md %}{% endcapture %}{{ tmp | markdownify }}
------
{% capture tmp %}{% include Devel-SubmittingCode.md %}{% endcapture %}{{ tmp | markdownify }}
