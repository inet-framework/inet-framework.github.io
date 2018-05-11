---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap3.html">Prev</a> &#8226; <a href="chap5.html">Next</a> &#8226; <a href="toc.html#toc_4">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:network-nodes"></a>4 Network Nodes<a class="headerlink" href="#cha:network-nodes" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:nodes:overview"></a>4.1 Overview<a class="headerlink" href="#sec:nodes:overview" title="Permalink to this headline">&para;</a></h2>

<p>Hosts, routers, switches, access points, mobile phones, and other network
nodes are represented in INET with compound modules. The previous chapter
has introduced a few node types like <tt>StandardHost</tt>, <tt>Router</tt>,
and showed how to put together networks from them. In this chapter,
we look at the internals of such node models, in order to provide a deeper
understanding of their customization possibilities and to give some guidance
on how custom nodes models can be assembled.

<p><h2><a name="sec:nodes:ingredients"></a>4.2 Ingredients<a class="headerlink" href="#sec:nodes:ingredients" title="Permalink to this headline">&para;</a></h2>

<p>Node models are assembled from other modules which represent applications,
communication protocols, network interfaces, routing tables, mobility models,
energy models, and other functionality. These modules fall into the following
broad categories:

<p><ul>
  <li> <i>Applications</i> often model the user behavior as well as the
     application program (e.g., browser), and the application layer protocol
     (e.g., HTTP). Applications typically use transport layer
     protocols (e.g., TCP and/or UDP), but they may
     also directly use lower layer protocols (e.g., IP or
     Ethernet) via sockets.</li>
  <li> <i>Routing protocols</i> are provided as separate modules:
     OSPF, BGP, or AODV for MANET routing.
     These modules use TCP, UDP, and IPv4,
     and manipulate routes in the <tt>Ipv4RoutingTable</tt> module.</li>
  <li> <i>Transport layer protocols</i> are connected to applications and
     network layer protocols. They are most often represented by simple
     modules, currently TCP, UDP, and SCTP
     are supported. TCP has several implementations: <tt>Tcp</tt>
     is the OMNeT++ native implementation; <tt>TcpLwip</tt> module wraps the
     lwIP TCP stack; and <tt>TcpNsc</tt> module wraps the
     Network Simulation Cradle library.</li>
  <li> <i>Network layer protocols</i> are connected to transport layer
     protocols and network interfaces. They are usually modeled as compound
     modules: <tt>Ipv4NetworkLayer</tt> for IPv4, and
     <tt>Ipv6NetworkLayer</tt> for IPv6. The <tt>Ipv4NetworkLayer</tt>
     module contains several protocol modules: <tt>Ipv4</tt>, <tt>Arp</tt>,
     and <tt>Icmpv4</tt>.</li>
  <li> <i>Network interfaces</i> are represented by compound modules
     which are connected to the network layer protocols and other network
     interfaces in the wired case. They are often modeled as compound modules
     containing separate modules for queues, classifiers, MAC, and PHY protocols.</li>
  <li> <i>Link layer protocols</i> are usually simple modules sitting
     in network interface modules. Some protocols, for example
     IEEE 802.11 MAC, are modeled as a compound module themselves
     due to the complexity of the protocol.</li>
  <li> <i>Physical layer protocols</i> are compound modules also being part
     of network interface modules.</li>
  <li> <i>Interface table</i> maintains the set of network interfaces
     (e.g. <tt>eth0</tt>, <tt>wlan0</tt>) in the network node. Interfaces
     are registered dynamically during initialization of network interfaces.</li>
  <li> <i>Routing tables</i> maintain the list of routes for the corresponding
     network protocol (e.g., <tt>Ipv4RoutingTable</tt> for <tt>Ipv4</tt>).
     Routes are added by automatic network configurators or routing protocols.
     Network protocols use the routing tables to find out the best matching
     route for datagrams.</li>
  <li> <i>Mobility modules</i> are responsible for moving around the network
     node in the simulated playground. The mobility model is mandatory for
     wireless simulations even if the network node is stationary. The mobility
     module stores the location of the network node which is needed to compute
     wireless propagation and path loss. Different mobility models are provided
     as different modules. Network nodes define their mobility submodule with
     a parametric type, so the mobility model can be changed in the configuration.</li>
  <li> <i>Energy modules</i> model energy storage mechanisms, energy
     consumption of devices and software processes, energy generation of devices,
     and energy management processes which shutdown and startup network nodes.</li>
  <li> <i>Status</i> (<tt>NodeStatus</tt>) keeps track of the status of the
     network node (up, down, etc.)</li>
  <li> <i>Other modules</i> with particular functionality such as
     <tt>PcapRecorder</tt> are also available.</li>
</ul>

<p><h2><a name="sec:nodes:node-architecture"></a>4.3 Node Architecture<a class="headerlink" href="#sec:nodes:node-architecture" title="Permalink to this headline">&para;</a></h2>

<p>Within network nodes, OMNeT++ connections are used to represent
communication opportunities between protocols. Packets and
messages sent on these connections represent software or hardware activity.

<p>Although protocols may also be connected to each other directly,
in most cases they are connected via <i>dispatcher modules</i>.
Dispatchers (<tt>MessageDispatcher</tt>) are small, low-overhead modules
that allow protocol components to be connected in one-to-many and many-to-many
fashion, and ensure that messages and packets sent from one component end up
being delivered to the correct component. Dispatchers need no manual
configuration, as they use discovery and peek into packets.

<p>In there pre-assembled node models, dispatchers allow arbitrary
protocol components to talk directly to each other, i.e. not only
to ones in neighboring layers.

<p><h2><a name="sec:nodes:customizing-nodes"></a>4.4 Customizing Nodes<a class="headerlink" href="#sec:nodes:customizing-nodes" title="Permalink to this headline">&para;</a></h2>

<p>The built-in network nodes are written to be as versatile and customizable
as possible. This is achieved in several ways:

<p><b>Submodule and Gate Vectors</b>

<p>One way is the use of gate vectors and submodule vectors. The sizes
of vectors may come from parameters or derived by the number of
external connections to the network node. For example, a host may
have an arbitrary number of wireless interfaces, and it will automatically
have as many Ethernet interfaces as the number of Ethernet
devices connected to it.

<p>For example, wireless interfaces for hosts are defined like this:

<pre><code data-language="ned">wlan[numWlanInterfaces]: &lt;snip&gt; // wlan interfaces in StandardHost etc al.</code></pre><p>
Where <tt>numWlanInterfaces</tt> is a module parameter that defaults to
either 0 or 1 (this is different for e.g. <tt>StandardHost</tt> and
<tt>WirelessHost</tt>.) To configure a host to have two interfaces,
add the following line to the ini file:

<pre><code data-language="ini">**.hostA.numWlanInterfaces = 2</code></pre><p>
<b>Conditional Submodules</b>

<p>Submodules that are not vectors are often conditional. For example,
the TCP protocol module in hosts is conditional on
the <tt>hasTcp</tt> parameter. Thus, to disable TCP support
in a host (it is enabled by default), use the following ini file line:

<pre><code data-language="ini">**.hostA.hasTcp = false</code></pre><p>
<b>Parametric Types</b>

<p>Another often used way of customization is parametric types, that is, the
type of a submodule (or a channel) may be specified as a string parameter.
Almost all submodules in the built-in node types have parametric types.
For example, the TCP protocol module is defined like this:

<pre><code data-language="ned">tcp: &lt;tcpType&gt; like ITcp if hasTcp;</code></pre><p>
The <tt>tcpType</tt> parameter defaults to the default implementation, <tt>Tcp</tt>.
To use another implementation instead, add the following line to the ini file:

<pre><code data-language="ini">**.host*.tcpType = "TcpLwip"  # use lwIP's TCP implementation</code></pre><p>
Submodule vectors with parametric types are defined without the use of a
module parameter to allow elements have different types. An example
is how applications are defined in hosts:

<pre><code data-language="ned">app[numApps]: &lt;&gt; like IApp;  // applications in StandardHost et al.</code></pre><p>
And applications can be added in the following way:

<pre><code data-language="ini">**.hostA.numApps = 2
**.hostA.apps[0].typename = "UdpBasicApp"
**.hostA.apps[1].typename = "PingApp"</code></pre><p>
<b>Inheritance</b>

<p>Inheritance can be use to derive new, specialized node types from existing ones.
A derived NED type may add new parameters, gates, submodules or connections,
and may set inherited unassigned parameters to specific values.

<p>For example, <tt>WirelessHost</tt> is derived from <tt>StandardHost</tt>
in the following way:

<pre><code data-language="ned">module WirelessHost extends StandardHost
{
    @display("i=device/wifilaptop");
    numWlanInterfaces = default(1);
}</code></pre><p>
<h2><a name="sec:nodes:custom-network-nodes"></a>4.5 Custom Network Nodes<a class="headerlink" href="#sec:nodes:custom-network-nodes" title="Permalink to this headline">&para;</a></h2>

<p>Despite the many pre-assembled network nodes and the several available
customization options, sometimes it is just easier to build a network node
from scratch. The following example shows how easy it is to build a simple
network node.

<p>This network node already contains a configurable application and several
standard protocols. It also demonstrates how to use the packet dispatching
mechanism which is required to connect multiple protocols in a many-to-many
relationship.

<p><pre class="snippet" src="Snippets.ned" after="//!NetworkNodeExample" until="//!End"></pre>
<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap3.html">Prev</a> &#8226; <a href="chap5.html">Next</a> &#8226; <a href="toc.html#toc_4">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
