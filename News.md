---
layout: page
title: News
underMenu: Home
---

<div>
{% for post in site.posts %}
  <h3><a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%B %-d, %Y" }})</small></h3>
  <p>{{ post.excerpt | remove: "<p>" | remove: "</p>" }}<br><a href="{{ post.url }}">More</a></p>
{% endfor %}
</div>
