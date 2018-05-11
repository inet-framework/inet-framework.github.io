---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap7.html">Prev</a> &#8226; <a href="chap9.html">Next</a> &#8226; <a href="toc.html#toc_8">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:ipv4"></a>8 The IPv4 Protocol Family<a class="headerlink" href="#cha:ipv4" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:ipv4:overview"></a>8.1 Overview<a class="headerlink" href="#sec:ipv4:overview" title="Permalink to this headline">&para;</a></h2>

<p>The IP protocol is the workhorse protocol of the TCP/IP protocol suite.
All UDP, TCP, ICMP packets are encapsulated into IP datagrams and
transported by the IP layer.
While higher layer protocols transfer data among two communication end-point,
the IP layer provides an hop-by-hop, unreliable and connectionless delivery
service. IP does not maintain any state information about the individual
datagrams, each datagram handled independently.

<p>The nodes that are connected to the Internet can be either a host or a router.
The hosts can send and recieve IP datagrams, and their operating system
implements the full TCP/IP stack including the transport layer. On the
other hand, routers have more than one interface cards and perform packet
routing between the connected networks. Routers does not need the
transport layer, they work on the IP level only. The division
between routers and hosts is not strict, because if a host
have several interfaces, they can usually be configured to operate
as a router too.

<p>Each node on the Internet has a unique IP address. IP datagrams contain
the IP address of the destination. The task of the routers is to find
out the IP address of the next hop on the local network, and forward
the packet to it. Sometimes the datagram is larger, than the maximum
datagram that can be sent on the link (e.g. Ethernet has an 1500 bytes limit.).
In this case the datagram is split into fragments and each fragment is
transmitted independently. The destination host must collect all fragments,
and assemble the datagram, before sending up the data to the transport
layer.

<p>The INET framework contains several modules to build the IPv4 network layer of
hosts and routers:

<p><ul>
  <li> <tt>Ipv4</tt> is the main module that implements RFC791. This
        module performs IP encapsulation/decapsulation, fragmentation
        and assembly, and routing of IP datagrams.</li>
  <li> The <tt>Ipv4RoutingTable</tt> is a helper module that manages the routing
        table of the node. It is queried by the <tt>Ipv4</tt> module
        for best routes, and updated by the routing daemons implementing
        RIP, OSPF, Manet, etc. protocols.</li>
  <li> The <tt>Icmp</tt> module can be used to generate ICMP error packets. It also
        supports ICMP echo applications.</li>
  <li> The <tt>Arp</tt> module performs the dynamic translation of IP addresses
        to MAC addresses.</li>
  <li> The <tt>Igmpv2</tt> module to generate and process multicast group
        membership reports.</li>
</ul>

<p>These modules are assembled into a complete network layer module called
<tt>Ipv4NetworkLayer</tt>. The <tt>Ipv4NetworkLayer</tt> module is present
e.g. in <tt>StandardHost</tt> and <tt>Router</tt>.

<p>The subsequent sections describe the IPv4 modules in detail.

<p><h2><a name="sec:ipv4:ipv4"></a>8.2 Ipv4<a class="headerlink" href="#sec:ipv4:ipv4" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Ipv4</tt> module implements the IPv4 protocol.

<p>Its parameters include:

<p><ul>
  <li> <tt>crcMode</tt> TODO: @enum("declared", "computed") = default("declared");</li>
  <li> <tt>procDelay</tt> processing time of each incoming datagram.</li>
  <li> <tt>timeToLive</tt> default TTL of unicast datagrams.</li>
  <li> <tt>multicastTimeToLive</tt> default TTL of multicast datagrams.</li>
  <li> <tt>fragmentTimeout</tt> the maximum duration until fragments are kept
          in the fragment buffer.</li>
  <li> <tt>forceBroadcast</tt> if <b><tt>true</tt></b>, then link-local broadcast
          datagrams are sent out through each interface, if the higher
          layer did not specify the outgoing interface.</li>
  <li> <tt>useProxyARP</tt> TODO: default(true);</li>
</ul>

<p><h2><a name="sec:ipv4:ipv4routingtable"></a>8.3 Ipv4RoutingTable<a class="headerlink" href="#sec:ipv4:ipv4routingtable" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Ipv4RoutingTable</tt> module represents the IPv4 route table.
Hosts and routers normally contain one instance of this module.
The <tt>Ipv4RoutingTable</tt> module does not send or receive messages.
Instead, C++ methods are for querying and updating the table, as well as for
unicast and multicast routing.

<p>The <tt>Ipv4RoutingTable</tt> module has the following parameters:

<p><ul>
  <li> <tt>routerId</tt>: for routers, the router id using IPv4 address dotted notation;
      specify &#8220;auto&#8221; to select the highest interface address; should be left empty &#8220;&#8221;
      for hosts.</li>
  <li> <tt>forwarding</tt>: turns IP forwarding on/off. It is always <tt>true</tt>
      in a <tt>Router</tt> and is <tt>false</tt> by default in a <tt>StandardHost</tt>.</li>
  <li> <tt>multicastForwarding</tt>: turns multicast IP forwarding on/off.
    Default is <b><tt>false</tt></b>, should be set to <b><tt>true</tt></b> in multicast routers.</li>
</ul>

<p>The preferred method for static initialization of routing tables is to use
<tt>Ipv4NetworkConfigurator</tt>. While <tt>Ipv4RoutingTable</tt>
can read the routes from a <i>routing file</i>, that is considered obsolete.
Old routing files should be replaced with the XML configuration of
<tt>Ipv4NetworkConfigurator</tt>. Section <a href=""></a>
describes the format of the new configuration files.

<p>
<h2><a name="sec:ipv4:icmp"></a>8.4 Icmp<a class="headerlink" href="#sec:ipv4:icmp" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Icmp</tt> module implements the Internet Control Message Protocol
(ICMP). ICMP is the error reporting and diagnostic mechanism of the Internet.
It uses the services of IP, so it is a transport layer protocol, but unlike TCP
or UDP it is not used to transfer user data. It cannot be separated from
IP, because the routing errors are reported by ICMP.

<p>The <tt>Icmp</tt> module can be used to send error messages and ping
request. It can also respond to incoming ICMP messages.

<p>Each ICMP message is encapsulated within an IP datagram, so its delivery
is unreliable.

<p><h2><a name="sec:ipv4:arp"></a>8.5 Arp<a class="headerlink" href="#sec:ipv4:arp" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Arp</tt> module implements the Address Resolution Protocol (ARP).
The ARP protocol is designed to translate a local protocol address to a hardware
address. Although the ARP protocol can be used with several network protocol and
hardware addressing schemes, in practice they are almost always IPv4 and 802.3
addresses. The <tt>Arp</tt> module only supports IPv4-to-MAC address
translation, but not the opposite direction, Reverse ARP (RARP).

<p>The address to be resolved can be either an IPv4 broadcast/multicast or a
unicast address. The corresponding MAC addresses can be computed for broadcast
and multicast addresses (RFC 1122, 6.4); unicast addresses are resolved
using the ARP procotol.

<p>If the MAC address is found in the ARP cache, then the packet is transmitted to
the addressed interface immediately. Otherwise the packet is queued and an
address resolution takes place.

<p>For address resolution, ARP broadcasts a request frame on the network. In the
request it publishes its own IP and MAC addresses, so each node in the local
subnet can update their mapping. The node whose MAC address was requested will
respond with an ARP frame containing its own MAC address directly to the node
that sent the request. When the original node receives the ARP response, it
updates its ARP cache and sends the delayed IP packet using the learned MAC
address.

<p>ARP resolution is initiated with a C++ call.

<p>The module parameters of <tt>Arp</tt> are:

<p><ul>
  <li> <tt>retryTimeout</tt>: number of seconds ARP waits between retries to resolve an IPv4 address (default is 1s)</li>
  <li> <tt>retryCount</tt>: number of times ARP will attempt to resolve an IPv4 address (default is 3)</li>
  <li> <tt>cacheTimeout</tt>: number of seconds unused entries in the cache will time out (default is 120s)</li>
  <li> <tt>proxyARP</tt>: enables proxy ARP mode (default is <b><tt>true</tt></b>)</li>
  <li> <tt>globalARP</tt>: use global ARP cache (default is <b><tt>false</tt></b>)</li>
</ul>

<p>
<h2><a name="sec:ipv4:igmp"></a>8.6 Igmp<a class="headerlink" href="#sec:ipv4:igmp" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Igmp</tt> module implements the Internet Group Management Protocol
(IGMP). IGMP is a communications protocol used by hosts and adjacent routers on
IPv4 networks to establish multicast group memberships. IGMP is an integral part
of IP multicast.

<p>IGMP is responsible for distributing the information of
multicast group memberships from hosts to routers. When an interface
of a host joins to a multicast group, it will send an IGMP report
on that interface to routers. It can also send reports when the
interface leaves the multicast group, so it does not want to
receive those multicast datagrams. The IGMP module of multicast
routers processes these IGMP reports: it updates the list of
groups, that has members on the link of the incoming message.

<p>The <tt>IIgmp</tt> module interface defines the connections
of IGMP modules.
IGMP reports are transmitted by IP, so the module contains
gates to be connected to the IP module (<tt>ipIn/ipOut</tt>). The IP
module delivers packets with protocol number 2 to the IGMP module.
However some multicast routing protocols (like DVMRP) also exchange
routing information by sending IGMP messages, so they should be
connected to the <tt>routerIn/routerOut</tt> gates of the IGMP module.
The IGMP module delivers the IGMP messages not processed by itself
to the connected routing module.

<p>The <tt>Igmpv2</tt> module implements version 2 of the IGMP protocol
(RFC 2236). Next we describe its behaviour in host and routers in details.
Note that multicast routers behaves as hosts too, i.e. they are sending
reports to other routers when joining or leaving a multicast group.

<p><b>Host behaviour</b>

<p>When an interface joins to a multicast group, the host
will send a Membership Report immediately to the group address.
This report is repeated after <tt>unsolicitedReportInterval</tt> to
cover the possibility of the first report being lost.

<p>When a host's interface leaves a multicast group, and it was
the last host that sent a Membership Report for that group,
it will send a Leave Group message to the all-routers multicast
group (224.0.0.2).

<p>This module also responds to IGMP Queries. When the host
receives a Group-Specific Query on an interface that belongs
to that group, then it will set a timer to a random value
between 0 and Max Response Time of the Query. If the timer
expires before the host observe a Membership Report sent
by other hosts, then the host sends an IGMPv2 Membership Report.
When the host receives a General Query on an interface,
a timer is initialized and a report is sent for each group
membership of the interface.

<p><b>Router behaviour</b>

<p>Multicast routers maintains a list for each interface containing
the multicast groups that have listeners on that interface.
This list is updated when IGMP Membership Reports and Leave Group
messages arrive, or when a timer expires since the last Query.

<p>When multiple routers are connected to the same link, the one with
the smallest IP address will be the Querier. When other routers
observe that they are Non-Queriers (by receiving an IGMP Query
with a lower source address), they stop sending IGMP Queries
until <tt>otherQuerierPresentInterval</tt> elapsed since the last
received query.

<p>Routers periodically (<tt>queryInterval</tt>) send a General Query
on each attached network for which this router is a Querier.
On startup the router sends <tt>startupQueryCount</tt> queries
separated by <tt>startupQueryInterval</tt>. A General Query
has unspecified Group Address field, a Max Response Time
field set to <tt>queryResponseInterval</tt>, and is sent to the
all-systems multicast address (224.0.0.1).

<p>When a router receives a Membership Report, it will add the
reported group to the list of multicast group memberships.
At the same time it will set a timer for the membership
to <tt>groupMembershipInterval</tt>. Repeated reports restart
the timer. If the timer expires, the router assumes
that the group has no local members, and multicast traffic
is no more forwarded to that interface.

<p>When a Querier receives a Leave Group message for a group,
it sends a Group-Specific Query to the group being left.
It repeats the Query <tt>lastMemberQueryCount</tt> times in
separated by <tt>lastMemberQueryInterval</tt> until a Membership
Report is received. If no Report received, then the router
assumes that the group has no local members.

<p>
<b>Parameters</b>

<p>The following parameters have effects in both hosts and routers:

<p><ul>
  <li> <tt>enabled</tt> if <b><tt>false</tt></b> then the IGMP module
     never sends any message and discards incoming messages.
  Default is <b><tt>true</tt></b>.</li>
</ul>

<p>The following parameters are only used in hosts:

<p><ul>
  <li> <tt>unsolicitedReportInterval</tt> the time between repetitions of a
   host's initial report of membership in a group. Default is 10s.</li>
</ul>

<p>Router timeouts are configured by these parameters:

<p><ul>
  <li> <tt>robustnessVariable</tt> the IGMP is robust to <tt>robustnessVariable</tt>-1
   packet losses. Default is 2.</li>
  <li> <tt>queryInterval</tt> the interval between General Queries sent by a Querier.
   Default is 125s.</li>
  <li> <tt>queryResponseInterval</tt> the Max Response Time inserted into General Queries</li>
  <li> <tt>groupMembershipInterval</tt> the amount of time that must pass before
   a multicast router decides there are no more members of a group on a network.
   Fixed to <tt>robustnessVariable</tt> * <tt>queryInterval</tt> + <tt>queryResponseInterval</tt>.</li>
  <li> <tt>otherQuerierPresentInterval</tt> the length of time that must
   pass before a multicast router decides that there is no longer
   another multicast router which should be the querier.
   Fixed to <tt>robustnessVariable</tt> * <tt>queryInterval</tt> + <tt>queryResponseInterval</tt> / 2.</li>
  <li> <tt>startupQueryInterval</tt> the interval between General Queries
   sent by a Querier on startup. Default is <tt>queryInterval</tt> / 4.</li>
  <li> <tt>startupQueryCount</tt> the number of Queries sent out on startup,
   separated by the <tt>startupQueryInterval</tt>. Default is <tt>robustnessVariable</tt>.</li>
  <li> <tt>lastMemberQueryInterval</tt> the Max Response Time inserted into
   Group-Specific Queries sent in response to Leave Group messages, and
   is also the amount of time between Group-Specific Query messages.
   Default is 1s.</li>
  <li> <tt>lastMemberQueryCount</tt> the number of Group-Specific Queries
   sent before the router assumes there are no local members.
   Default is <tt>robustnessVariable</tt>.</li>
</ul>

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap7.html">Prev</a> &#8226; <a href="chap9.html">Next</a> &#8226; <a href="toc.html#toc_8">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
