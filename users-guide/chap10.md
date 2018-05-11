---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap9.html">Prev</a> &#8226; <a href="chap11.html">Next</a> &#8226; <a href="toc.html#toc_10">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:routing"></a>10 Internet Routing<a class="headerlink" href="#cha:routing" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:routing:overview"></a>10.1 Overview<a class="headerlink" href="#sec:routing:overview" title="Permalink to this headline">&para;</a></h2>

<p>INET Framework has models for several internet routing protocols, including
RIP, OSPF and BGP.

<p>The easiest way to add routing to a network is to use the <tt>Router</tt>
NED type for routers. <tt>Router</tt> contains a conditional instance
for each of the above protocols. These submodules can be enabled by
setting the <tt>hasRIP</tt>, <tt>hasOSPF</tt> and/or <tt>hasBGP</tt> parameters to
<tt>true</tt>.

<p>Example:

<pre><code data-language="ini">**.hasRIP = true</code></pre><p>
There are also NED types called <tt>RipRouter</tt>, <tt>OspfRouter</tt>,
<tt>BgpRouter</tt>, which are all <tt>Router</tt>s with appropriate
routing protocol enabled.

<p><h2><a name="sec:routing:rip"></a>10.2 RIP<a class="headerlink" href="#sec:routing:rip" title="Permalink to this headline">&para;</a></h2>

<p>RIP (Routing Information Protocol) is a distance-vector routing protocol
which employs the hop count as a routing metric. RIP prevents routing loops
by implementing a limit on the number of hops allowed in a path from source
to destination.

<p>The <tt>Rip</tt> module implements distance vector routing as
specified in RFC 2453 (RIPv2) and RFC 2080 (RIPng). Per-interface
configuration can be specified in an XML file.

<p><tt>RipRouter</tt> is a <tt>Router</tt> with the RIP protocol enabled.

<p>
<h2><a name="sec:routing:ospf"></a>10.3 OSPF<a class="headerlink" href="#sec:routing:ospf" title="Permalink to this headline">&para;</a></h2>

<p>OSPF (Open Shortest Path First) is a routing protocol for IP networks.
It uses a link state routing (LSR) algorithm and falls into the group
of interior gateway protocols (IGPs), operating within a single
autonomous system (AS).

<p>The <tt>Ospf</tt> module implements the OSPF Version 2. Areas and routers
can be configured using an XML file.

<p><tt>OspfRouter</tt> is a <tt>Router</tt> with the OSPF protocol enabled.

<p>
<h2><a name="sec:routing:bgp"></a>10.4 BGP<a class="headerlink" href="#sec:routing:bgp" title="Permalink to this headline">&para;</a></h2>

<p>BGP (Border Gateway Protocol) is a standardized exterior gateway protocol
designed to exchange routing and reachability information among
autonomous systems (AS) on the Internet.

<p>The <tt>Bgp</tt> module implements BGP Version 4. The model implements
RFC 4271, with some limitations. Autonomous Systems and rules can be
configured in an XML file.

<p><tt>BgpRouter</tt> is a <tt>Router</tt> with the BGP protocol enabled.


<hr class='pgbr'><div class='oppnavbar'><a href="chap9.html">Prev</a> &#8226; <a href="chap11.html">Next</a> &#8226; <a href="toc.html#toc_10">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
