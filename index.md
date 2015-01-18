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
  <div class="row">

      <div class="col-md-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Learn INET</h3>
          </div>
          <div class="panel-body">
            <h4>Getting Started</h4>
            <p>Learn how to get INET up and running, and how to implement your simulations.</p>
            <ul>
              <li><a href="#">Getting Started</a></li>
            </ul>
            <h4>Documentation</h4>
            <ul>
              <li><a href="Status.html">Available Protocols</a></li>
              <li><a href="http://inet.omnetpp.org/doc/INET">INET Reference</a></li>
              <li>INET Framework Manual (in preparation)</li>
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
<!-- TODO: into the Learn More page!
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Get Involved!</h3>
          </div>
          <div class="panel-body">
            <p>INET is a community project. If you'd like to help, there are various ways you can [contribute][3]
            to its progress. <a href="#">More...</a>
            <!-- We are also currently looking for [Community Managers][4] and [Component Experts][5].
            It is a good start to sign up for the [mailing list][6]. - ->
            </p>
          </div>
        </div>
-->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Get Involved</h3>
          </div>
          <div class="panel-body">
            <h4>Volunteers Needed</h4>
            <ul style="padding-left: 15px">
              <li><a href="CommunityManagers.html">Project Coordinators</a>. Explanation lorem impsum doolor sit amet. Lorem impsum doolor sit amet.</li>
              <li><a href="ComponentExperts.html">Component Experts</a>. Explanation lorem impsum doolor sit amet. Lorem impsum doolor sit amet.</li>
            </ul>
            <hr>
            <h4>Topics To Work On</h4>
            <ul style="padding-left: 15px">
              <li><a href="ProjectIdeas.html">Topics suitable as MSc projects</a>. Lorem impsum doolor sit amet.</li>
              <li><a href="DevelopmentTopics.html">Development Topics</a>. Lorem impsum doolor sit amet.</li>
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
           <p>Plans for the next versions are available <a href="Plans.html">here</a>.</p>
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

