---
layout: default
title: INET Framework
underMenu: Home
frontpage: true
redirect_from: /index.php/
---

<header>
<div class="jumbotron" style="background-image: url('images/bg.svg'); background-repeat: repeat">
  <div class="container">
    <div style="height: 10px"></div>
    <h1 style="color: #014872; font-size: 48px">INET Framework</h1>
    <p style="color: #014872; font-size: 20px">
      An open-source OMNeT++ model suite for wired, wireless and mobile networks.<br>
      INET evolves via feedback and contributions from the user community.<br>
      <a class="btn btn-primary" style="margin-top: 1em" href="Introduction.html">What is INET?</a>
      <a class="btn btn-danger" style="margin-top: 1em" href="https://inet.omnetpp.org/docs/users-guide/">User's Guide</a>
      <a class="btn btn-primary" style="margin-top: 1em" href="https://inet.omnetpp.org/docs/showcases/">Example simulations</a>
    </p>
  </div>
</div>
</header>

<div class="container">
  <div class="row">

      <div class="col-md-4">
        <h3>News</h3>
        <!-- counter is a hack, see http://stackoverflow.com/questions/13568052/filter-or-group-a-collection-in-liquid -->
        <ul style="padding-left: 15px">
        {% assign counter = '' %}
        {% for post in site.posts %}
          {% if post.category == "news" and counter.size < 8 %}
            <li><a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%b %-d, %Y" }})</small><br/></li>
            {% capture counter %}{{ counter | append:'.' }}{% endcapture %}
          {% endif %}
        {% endfor %}
        </ul>
        <a href="/News.html">More...</a>
      </div>

      <div class="col-md-4">
        <h3>Learn INET</h3>
        <h4>Getting Started</h4>
        <p>Learn how to get INET up and running, and how to implement your simulations.</p>
        <ul style="padding-left: 15px">
          <li><a href="GettingStarted.html">Getting Started with INET</a></li>
          <li><a href="https://inet.omnetpp.org/docs/showcases">Browse the Showcases</a></li>
          <li><a href="https://inet.omnetpp.org/docs/tutorials">Study the Tutorials</a></li>
        </ul>

        <h4>Documentation</h4>
        <ul style="padding-left: 15px">
          <li><a href="https://inet.omnetpp.org/docs/users-guide/">INET User's Guide</a></li>
          <li><a href="https://inet.omnetpp.org/docs/developers-guide/">INET Developer's Guide</a></li>
          <li><a href="https://omnetpp.org/doc/inet/api-current/neddoc/">INET Reference</a></li>
          <li><a href="Protocols.html">Model Catalog</a></li>
        </ul>
      </div>


      <div class="col-md-4">
        <h3>Get Involved</h3>
        <h4>Contribute</h4>
        <p>INET is open source, and its future largely depends on where the user community wants
        to take it. <a href="WhyContribute.html">Be part of the success!</a></p>

        <h4>Volunteers Needed</h4>
        <ul style="padding-left: 15px">
          <li><a href="ComponentAdvisors.html">Component Advisors</a><br>Bring your expertise to the table.</li>
          <li><a href="CommunityCoordinators.html">Community Coordinators</a><br>Help us build a stronger community around INET.</li>
        </ul>

        <h4>Topics To Work On</h4>
        <p>Contribute to INET while getting your degree, or in your free time.
        <a href="ContributionIdeas.html">Some ideas you can look at.</a></p>
     </div>
<!--
      <div class="col-md-4">
        <h3>Development</h3>
        <h4>Plans</h4>
        <p>Check out <a href="Plans.html">our plans</a> for the next versions of INET.</p>

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
-->
  </div>

</div>
