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
      <a class="btn btn-primary" style="margin-top: 1em" href="Introduction.html">Learn more</a>
      <a class="btn btn-primary" style="margin-top: 1em" href="inet-showcases/">Example simulations</a>
    </p>
  </div>
</div>
</header>

<div class="container">
  <div class="row">

      <div class="col-md-4">
        <h3>Learn INET</h3>
        <h4>Getting Started</h4>
        <p>Learn how to get INET up and running, and how to implement your simulations.</p>
        <ul style="padding-left: 15px">
          <li><a href="GettingStarted.html">Getting Started with INET</a></li>
          <li><a href="inet-showcases">Browse the Showcases</a></li>
          <li><a href="inet-tutorials">Study the Tutorials<br>
            <img src="images/wireless-tutorial.gif" width="150"/></a>
          </li>
        </ul>

        <h4>Documentation</h4>
        <ul style="padding-left: 15px">
          <li><a href="Protocols.html">Model Catalog</a></li>
          <li><a href="http://inet.omnetpp.org/doc/INET">INET Reference</a></li>
        </ul>
      </div>


      <div class="col-md-4">
        <h3>News</h3>
        {% for post in site.posts limit:15 %}
            <a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%b %-d, %Y" }})</small><br/>
        {% endfor %}
        <a href="/News.html">More...</a>
     </div>

      <div class="col-md-4">
        <h3>Development</h3>
        <p>INET is developed by the OMNeT++ core team for the community, and
        with contributions from the community, on <a href="Repository.html">GitHub</a>.</p>
        <p>Check out <a href="Plans.html">our plans</a> for the next versions of INET.</p>

        <h4>Contribute</h4>
        <p>INET is open source, and its future largely depends on where the user community wants
        to take it.</p>

        <p>Ways you can help:</p>
        <ul style="padding-left: 15px">
          <li>Report bugs, submit pull requests</li>
          <li>Contribute <a href="inet-showcases/">example simulations</a> or <a href="ContributionIdeas.html">models</a></li>
          <li>Be a <a href="ComponentAdvisors.html">Component Advisor</a> or 
             <a href="CommunityCoordinators.html">Community Coordinator</a>
          </li>
        </ul>

      </div>
  </div>

</div>
