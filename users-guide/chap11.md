---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap10.html">Prev</a> &#8226; <a href="chap12.html">Next</a> &#8226; <a href="toc.html#toc_11">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:adhoc-routing"></a>11 Ad Hoc Routing<a class="headerlink" href="#cha:adhoc-routing" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:adhocrouting:overview"></a>11.1 Overview<a class="headerlink" href="#sec:adhocrouting:overview" title="Permalink to this headline">&para;</a></h2>

<p>In ad hoc networks, nodes are not familiar with the topology of
their networks. Instead, they have to discover it: typically,
a new node announces its presence and listens for announcements
broadcast by its neighbors. Each node learns about others nearby
and how to reach them, and may announce that it too can reach them.
The difficulty of routing may be compounded by the fact that
nodes may be mobile, which results in a changing topology.

<p>Ad hoc routing protocols fall in two broad categories: proactive
and reactive. <i>Proactive</i> or <i>table-driven</i> protocols
maintain fresh lists of destinations and their routes by periodically
distributing routing tables throughout the network.
<i>Reactive</i> or <i>on-demand</i> protocols find a route on demand
by flooding the network with Route Request packets.

<p>The INET Framework contains the implementation of several ad hoc routing
protocols including AODV, DSDV, DYMO and GPSR.

<p>The easiest way to add routing to an ad hoc network is to use the
<tt>ManetRouter</tt> NED type for nodes. <tt>ManetRouter</tt>
contains a submodule named <tt>routing</tt> whose type is a parameter,
so it can be configured to be an AODV router, a DYMO router, or a
router of any other supported routing protocol. For example, you
can configure <tt>ManetRouter</tt> nodes in the network to use
AODV with the following ini file line:

<pre><code data-language="ini">**.routingProtocolType = "Aodv"</code></pre><p>
There are also NED types called <tt>AodvRouter</tt>, <tt>DymoRouter</tt>,
<tt>DsvRouter</tt>, <tt>GpsrRouter</tt>, which are all
<tt>ManetRouter</tt>s with the routing protocol submodule type
set appropriately.

<p>
<h2><a name="sec:adhocrouting:aodv"></a>11.2 AODV<a class="headerlink" href="#sec:adhocrouting:aodv" title="Permalink to this headline">&para;</a></h2>

<p>AODV (Ad hoc On-Demand Distance Vector Routing) is a routing protocol
for mobile ad hoc networks and other wireless ad hoc networks.
It offers quick adaptation to dynamic link conditions, low processing and
memory overhead, low network utilization, and determines unicast
routes to destinations within the ad hoc network.

<p>The <tt>Aodv</tt> module type implements AODV, based on RFC 3561.

<p><tt>AodvRouter</tt> is a <tt>ManetRouter</tt> with the routing module type
set to <tt>Aodv</tt>.

<p>
<h2><a name="sec:adhocrouting:dsdv"></a>11.3 DSDV<a class="headerlink" href="#sec:adhocrouting:dsdv" title="Permalink to this headline">&para;</a></h2>

<p>DSDV (Destination-Sequenced Distance-Vector Routing) is a table-driven
routing scheme for ad hoc mobile networks based on the Bellman-Ford algorithm.

<p>The <tt>Dsdv</tt> module type implements DSDV. It is currently a partial
implementation.

<p><tt>DsdvRouter</tt> is a <tt>ManetRouter</tt> with the routing module type
set to <tt>Dsdv</tt>.

<p>
<h2><a name="sec:adhocrouting:dymo"></a>11.4 DYMO<a class="headerlink" href="#sec:adhocrouting:dymo" title="Permalink to this headline">&para;</a></h2>

<p>The DYMO (Dynamic MANET On-demand) routing protocol is successor to the
AODV routing protocol. DYMO can work as both a pro-active and as a reactive
routing protocol, i.e. routes can be discovered just when they are needed.

<p>The <tt>Dymo</tt> module type implements DYMO, based on the IETF draft
<i>draft-ietf-manet-dymo-24</i>.

<p><tt>DymoRouter</tt> is a <tt>ManetRouter</tt> with the routing module type
set to <tt>Dymo</tt>.

<p>
<h2><a name="sec:adhocrouting:gpsr"></a>11.5 GPSR<a class="headerlink" href="#sec:adhocrouting:gpsr" title="Permalink to this headline">&para;</a></h2>

<p>GPSR (Greedy Perimeter Stateless Routing) is a routing protocol for
mobile wireless networks that uses the geographic positions of nodes
to make packet forwarding decisions.

<p>The <tt>Gpsr</tt> module type implements GPSR, based
on the paper &#8220;GPSR: Greedy Perimeter Stateless Routing for Wireless
Networks&#8221; by Brad Karp and H. T. Kung, 2000. The implementation
supports both GG and RNG planarization algorithms.

<p><tt>GpsrRouter</tt> is a <tt>ManetRouter</tt> with the routing module type
set to <tt>Gpsr</tt>.

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap10.html">Prev</a> &#8226; <a href="chap12.html">Next</a> &#8226; <a href="toc.html#toc_11">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
