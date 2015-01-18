---
layout: page
title: Recent Progress
underMenu: Development
---

<div>

{% for post in site.posts %}
  {% if post.category == "progress" %}
    <h3>{{ post.title }} <small>({{ post.date | date: "%B %-d, %Y" }})</small></h3>
    {{ post.content }}
  {% endif %}
{% endfor %}

</div>
