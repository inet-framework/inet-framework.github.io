---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap8.html">Prev</a> &#8226; <a href="chap10.html">Next</a> &#8226; <a href="toc.html#toc_9">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:ipv6"></a>9 IPv6 and Mobile IPv6<a class="headerlink" href="#cha:ipv6" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:ipv6:overview"></a>9.1 Overview<a class="headerlink" href="#sec:ipv6:overview" title="Permalink to this headline">&para;</a></h2>

<p>IPv6 support is implemented by several cooperating modules. The IPv6 module
implements IPv6 datagram handling (sending, forwarding etc). It relies on
<tt>Ipv6RoutingTable</tt> to get access to the routes. <tt>Ipv6RoutingTable</tt> also contains the
neighbour discovery data structures (destination cache, neighbour cache,
prefix list -- the latter effectively merged into the route table). Interface
configuration (address, state, timeouts etc) is held in the <tt>InterfaceTable</tt>,
in <tt>Ipv6InterfaceData</tt> objects attached to <tt>InterfaceEntry</tt>
as its <tt>ipv6()</tt> member.

<p>The module <tt>Ipv6NeighbourDiscovery</tt> implements all tasks associated with
neighbour discovery and stateless address autoconfiguration. The data
structures themselves (destination cache, neighbour cache, prefix list)
are kept in <tt>Ipv6RoutingTable</tt>, and are accessed via public C++ methods.
Neighbour discovery packets are only sent and processed by this module --
when IPv6 receives one, it forwards the packet to <tt>Ipv6NeighbourDiscovery</tt>.

<p>The rest of ICMPv6 (ICMP errors, echo request/reply etc) is implemented in
the module <tt>Icmpv6</tt>, just like with IPv4. ICMP errors are sent into
<tt>Ipv6ErrorHandling</tt>, which the user can extend or replace to get errors
handled in any way they like.

<p>




<hr class='pgbr'><div class='oppnavbar'><a href="chap8.html">Prev</a> &#8226; <a href="chap10.html">Next</a> &#8226; <a href="toc.html#toc_9">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
