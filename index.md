---
layout: default
title: INET Framework
underMenu: Home
frontpage: true
redirect_from: /index.php/
---

<header>
<div class="jumbotron" style="background-image: url('images/minecraft-background2.jpg'); background-size: 100% 100%;">
  <div class="container">
    <br><br><br>
    <h1>INET Framework</h1>
    <p>
      INET Framework is an open-source communication networks simulation package for
      <a href="http://omnetpp.org" target="_blank">OMNeT++</a>,
      providing models for various wired, wireless and mobile networks.
    </p>
    <p><a class="btn btn-primary btn-lg" href="Introduction.html">Learn more</a></p>
  </div>
</div>
</header>

<div class="container">
  <div class="row">

      <div class="col-md-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Learn INET</h3>
          </div>
          <div class="panel-body">
            <h4>Getting Started</h4>
            <p>Learn how to get INET up and running, and how to implement your simulations.</p>
            <ul style="padding-left: 15px">
              <li><a href="GettingStarted.html">Getting Started with INET</a></li>
              <li><a href="Tutorials.html">Tutorials</a></li>
            </ul>
            <hr>
            <h4>Documentation</h4>
            <ul style="padding-left: 15px">
              <li><a href="Protocols.html">Model Catalog</a></li>
              <li><a href="http://inet.omnetpp.org/doc/INET">INET Reference</a></li>
            </ul>
          </div>
        </div>

        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">News</h3>
          </div>
          <div class="panel-body">
            <!-- counter is a hack, see http://stackoverflow.com/questions/13568052/filter-or-group-a-collection-in-liquid -->
            {% assign counter = '' %}
            {% for post in site.posts %}
              {% if post.category == "news" and counter.size < 3 %}
              <a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%b %-d, %Y" }})</small><br/>
              {% capture counter %}{{ counter | append:'.' }}{% endcapture %}
              {% endif %}
            {% endfor %}
              <a href="/News.html">More...</a>
          </div>
        </div>

      </div>


      <div class="col-md-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Get Involved</h3>
          </div>
          <div class="panel-body">
            <h4>Volunteers Needed</h4>
            <ul style="padding-left: 15px">
              <li><a href="ComponentExperts.html">Component Experts</a><br>Bring your expertise to the table.</li>
              <li><a href="CommunityCoordinators.html">Community Coordinators</a><br>Help us build a stronger community around INET.</li>
            </ul>
            <hr>
            <h4>Topics To Work On</h4>
            <p>Contribute to INET while getting your degree, or in your free time.</p>
            <ul style="padding-left: 15px">
              <li><a href="ThesisIdeas.html">Topics suitable as MSc projects</a></li>
              <li><a href="ContributionIdeas.html">Contribution Ideas</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div class="col-md-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Development</h3>
          </div>
          <div class="panel-body">
           <h4>Plans</h4>
           <p>Check out <a href="Plans.html">our plans</a> for the next versions of INET.</p>
           <hr>
           <h4>Progress</h4>
           {% assign counter = '' %}
           {% for post in site.posts %}
             {% if post.category == "progress" and counter.size < 3 %}
             <a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%b %-d, %Y" }})</small><br/>
             {{ post.excerpt }}
             {% capture counter %}{{ counter | append:'.' }}{% endcapture %}
             {% endif %}
           {% endfor %}
             <a href="/Progress.html">More...</a>
          </div>
        </div>

      </div>
  </div>

</div>

