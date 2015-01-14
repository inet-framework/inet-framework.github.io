---
layout: default
title: INET Framework
underMenu: Home
---

<header>
<div class="jumbotron" style="background-image: url('images/minecraft-background2.jpg'); background-size: 100% 100%;">
  <div class="container">
    <br><br><br>
    <h1>INET Framework</h1>
    <p>
      INET Framework is an open-source communication networks simulation package for 
      the <a href="http://omnetpp.org" target="_blank">OMNeT++</a> simulation environment,
      providing models for diverse wired, wireless and mobile networks.
    </p>
    <p><a class="btn btn-primary btn-lg" href="Documentation.html">Learn more</a></p>
  </div>
</div>
</header>

<div class="container">

<div class="panel panel-primary">
  <div class="panel-heading">
    <h3 class="panel-title">Get Involved!</h3>
  </div>
  <div class="panel-body">
    <p>INET is a community project. If you'd like to help, there are various ways you can [contribute][3] 
    to its progress. We are also currently looking for [Community Managers][4] and [Component Experts][5]. 
    It is a good start to sign up for the [mailing list][6].
    </p>
  </div>
</div>

<hr>

<b>Get involved!</b> INET is a community project. If you'd like to help, there are various 
ways you can [contribute][3] to its progress. We are also currently looking for 
[Community Managers][4] and [Component Experts][5]. It is a good start to sign up for the [mailing list][6].

<hr>

<h3>News</h3>

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%B %-d, %Y" }})
    <p>{{ post.excerpt }}</p>
  </li>
{% endfor %}
</ul>

</div>


