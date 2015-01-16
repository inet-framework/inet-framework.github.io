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

      </div>


      <div class="col-md-4">
<!--
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
            <h3 class="panel-title">Project Coordinators Needed!</h3>
          </div>
          <div class="panel-body">
            <p>Come here if you are a Project Coordinator@!!!!!! <a href="CommunityManagers.html">Look!!</a></p>
          </div>
        </div>
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Thesis / Project Ideas</h3>
          </div>
          <div class="panel-body">
			<ul>
			  <li>Implement new TCP congestion control algorithms, e.g. Vegas, Cubic, Westwood or others</li>
			  <li>Expand on SimuLTE, e.g. add control plane protocols and functionality</li>
			  <li>Expand MPLS support in INET, e.g. with control plane functionality</li>
			  <li>Implement the Bluetooth lower layers</li>
			  <li>Implement the H.323 and SIP protocols</li>
			  <li>Implement new ad-hoc routing protocols</li>
			  <li>Implement new group mobility models</li>
			  <li>&lt;your idea here, please email us&gt;</li>
			</ul>

            <p></p>
          </div>
        </div>

      </div>

      <div class="col-md-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Progress</h3>
          </div>
          <div class="panel-body">
            <p>Dec 9, 2014:<br>We are working in the integration branch towards INET-3.0...</p>
			<ul>
			  <li>Set up a Coverity account for detecting defects via static code analysis</li>
			  <li>Introducing C++11 features in the code (nullptr, auto, in-class member initializers)</li>
			  <li>Working on the manual</li>
			  <li>Merged the PIM/IGMPv3 topic branch into integration</li>
			</ul>            
          </div>
        </div>
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Plans</h3>
          </div>
          <div class="panel-body">
            <p>Thesere our plans@!!!!!!</p>
			<ul>
			  <li>Set up a Coverity account for detecting defects via static code analysis</li>
			  <li>Introducing C++11 features in the code (nullptr, auto, in-class member initializers)</li>
			  <li>Working on the manual</li>
			  <li>Merged the PIM/IGMPv3 topic branch into integration</li>
			</ul>            
          </div>
        </div>

      </div>
  </div>

  <div class="row">
    <h3>News</h3>
    <ul>
    {% for post in site.posts %}
      {% if post.category == "news" %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%B %-d, %Y" }})
        <p>{{ post.excerpt }}</p>
      </li>
      {% endif %}
    {% endfor %}
    </ul>
  </div>

</div>

