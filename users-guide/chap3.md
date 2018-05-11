---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap2.html">Prev</a> &#8226; <a href="chap4.html">Next</a> &#8226; <a href="toc.html#toc_3">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:networks"></a>3 Networks<a class="headerlink" href="#cha:networks" title="Permalink to this headline">&para;</a></h1>


<h2><a name="sec:networks:overview"></a>3.1 Overview<a class="headerlink" href="#sec:networks:overview" title="Permalink to this headline">&para;</a></h2>


INET heavily builds upon the modular architecture of OMNeT++. It provides
numerous domain specific and highly parameterizable components which can be
combined in many ways. The primary means of building large custom network
simulations in INET is the composition of existing models with custom models,
starting from small components and gradually forming ever larger ones up until
the composition of the network. Users are not required to have programming
experience to create simulations unless they also want to implement
their own protocols, for example.

<p>Assembling an INET simulation starts with defining a module representing
the network. Networks are compound modules which contain network nodes,
automatic network configurators, and sometimes additionally transmission
medium, physical environment, various visualizer, and other infrastructure
related modules. Networks also contain connections between network nodes
representing cables. Large hierarchical networks may be further organized
into compound modules to directly express the hierarchy.

<p>There are no predefined networks in INET, because it is very easy to create
one, and because of the vast possibilities. However, the OMNeT++ IDE provides
several topology generator wizards for advanced scenarios.

<p>As INET is an OMNeT++-based framework, users mainly use NED to describe the
model topology, and ini files to provide configuration.<br><ul><font size='-1'>[Some
components require additional configuration to be provided as separate
files, e.g. in XML.]</font></li></ul>

<p><h2><a name="sec:networks:built-in-network-nodes-and-other-top-level-modules"></a>3.2 Built-in Network Nodes and Other Top-Level Modules<a class="headerlink" href="#sec:networks:built-in-network-nodes-and-other-top-level-modules" title="Permalink to this headline">&para;</a></h2>

<p>INET provides several pre-assembled network nodes with carefully selected
components. They support customization via parameters and parametric
submodule types, but they are not meant to be universal. Sometimes it may
be necessary to create special network node models for particular
simulation scenarios. In any case, the following list gives a taste of the
built-in network nodes.

<p><ul>
  <li> <tt>StandardHost</tt> contains the most common Internet protocols:
     UDP, TCP, IPv4, IPv6,
     Ethernet, IEEE 802.11. It also supports an
     optional mobility model, optional energy models, and any number of
     applications which are entirely configurable from INI files.</li>
  <li> <tt>EtherSwitch</tt> models an Ethernet switch containing
     a relay unit and one MAC unit per port.</li>
  <li> <tt>Router</tt> provides the most common routing protocols:
     OSPF, BGP, RIP, PIM.</li>
  <li> <tt>AccessPoint</tt> models a Wifi access point with multiple
     IEEE 802.11 network interfaces and multiple Ethernet
     ports.</li>
  <li> <tt>WirelessHost</tt> provides a network node with one (default)
     IEEE 802.11 network interface in infrastructure mode,
     suitable for using with an <tt>AccessPoint</tt>.</li>
  <li> <tt>AdhocHost</tt> is a <tt>WirelessHost</tt> with the network
     interface configured in ad-hoc mode and forwarding enabled.</li>
  <li> <tt>AodvRouter</tt> is similar to an <tt>AdhocHost</tt> with
     an additional AODV protocol.</li>
</ul>

<p>Network nodes communicate at the network level by exchanging OMNeT++ messages
which are the abstract representations of physical signals on the
transmission medium.  Signals are either sent through OMNeT++ connections
in the wired case, or sent directly to the gate of the receiving network node
in the wireless case. Signals encapsulate INET-specific packets that represent
the transmitted digital data. Packets are further divided into chunks that
provide alternative representations for smaller pieces of data (e.g.
protocol headers, application data).

<p>Additionally, there are components that occur on network level, but they
are not models of physical network nodes. They are necessary
to model other aspects. Some of them are:

<p><ul>
  <li> A <i>radio medium</i> module such as <tt>Ieee80211RadioMedium</tt>,
     <tt>ApskScalarRadioMedium</tt> and <tt>UnitDiskRadioMedium</tt>
     (there are a few of them) are a required component of wireless networks.</li>
  <li> <tt>PhysicalEnvironment</tt> models the effect of the physical
     environment (i.e. obstacles) on radio signal propagation. It is an
     optional component.</li>
  <li> <i>Configurators</i> such as <tt>Ipv4NetworkConfigurator</tt>,
     <tt>L2NetworkConfigurator</tt> and <tt>GenericNetworkConfigurator</tt>
     configure various aspects of the network. For example,
     <tt>Ipv4NetworkConfigurator</tt> assigns IP addresses
     to hosts and routers, and sets up static routing. It is used
     when modeling dynamic IP address assignment (e.g. via DHCP) or
     dynamic routing is not of importance. <tt>L2NetworkConfigurator</tt>
     allows one to configure 802.1 LANs and provide STP/RSTP-related
     parameters such as link cost, port priority and the &#8220;is-edge&#8221; flag.</li>
  <li> <tt>ScenarioManager</tt> allows scripted scenarios, such
     as timed failure and recovery of network nodes.</li>
  <li> <i>Group coordinators</i> are needed for the operation of some
     group mobility mdels. For example, <tt>MoBanCoordinator</tt> is
     the coordinator module for the MoBAN mobility model.</li>
  <li> <i>Visualizers</i> like <tt>PacketDropOsgVisualizer</tt> provide
     graphical rendering of some aspect of the simulation either in
     2D (canvas) or 3D (using OSG or osgEarth). The usual choice is
     <tt>IntegratedVisualizer</tt> which bundles together an instance
     of each specific visualizer type in a compound module.</li>
</ul>

<p><h2><a name="sec:networks:typical-networks"></a>3.3 Typical Networks<a class="headerlink" href="#sec:networks:typical-networks" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:networks:wired-networks"></a>3.3.1 Wired Networks<a class="headerlink" href="#sec:networks:wired-networks" title="Permalink to this headline">&para;</a></h3>

<p>Wired network connections, for example Ethernet cables, are
represented with standard OMNeT++ connections using the
<tt>DatarateChannel</tt> NED type. The channel's <tt>datarate</tt> and
<tt>delay</tt> parameters must be provided for all wired connections.

<p>The following example shows how straightforward it is to create a model for
a simple wired network. This network contains a server connected to a router
using PPP, which in turn is connected to a switch using
Ethernet. The network also contains a parameterizable number of
clients, all connected to the switch forming a star topology. The utilized
network nodes are all predefined modules in INET. To avoid the manual
configuration of IP addresses and routing tables, an automatic network
configurator is also included.

<p><pre class="snippet" src="Snippets.ned" after="//!WiredNetworkExample" until="//!End"></pre>
<p>In order to run a simulation using the above network, an OMNeT++ INI file must
be created. The INI file selects the network, sets its number of clients
parameter, and configures a simple TCP application for each
client. The server is configured to have a TCP application which
echos back all data received from the clients individually.

<p><pre class="snippet" src="Snippets.ini" after="#!WiredNetworkConfigurationExample" until="#!End"></pre>
<p>When the above simulation is run, each client application connects to the
server using a TCP socket. Then each one of them sends 1MB of
data, which in turn is echoed back by the server, and the simulation
concludes. The default statistics are written to the <tt>results</tt>
folder of the simulation for later analysis.

<p><h3><a name="sec:networks:wireless-networks"></a>3.3.2 Wireless Networks<a class="headerlink" href="#sec:networks:wireless-networks" title="Permalink to this headline">&para;</a></h3>

<p>Wireless network connections are not modeled with OMNeT++ connections due the
dynamically changing nature of connectivity. For wireless networks, an
additional module, one that represents the transmission medium, is required to
maintain connectivity information.

<p><pre class="snippet" src="Snippets.ned" after="//!WirelessNetworkExample" until="//!End"></pre>
<p>In the above network, positions in the display strings provide 
positions for the transmission medium during the computation of 
signal propagation and path loss. 

<p>In addition, <tt>host1</tt> is configured to periodically send
UDP packets to <tt>host2</tt> over the AP.

<p><pre class="snippet" src="Snippets.ini" after="#!WirelessNetworkConfigurationExample" until="#!End"></pre>
<p>

<p><h3><a name="sec:networks:mobile-ad-hoc-networks"></a>3.3.3 Mobile Ad hoc Networks<a class="headerlink" href="#sec:networks:mobile-ad-hoc-networks" title="Permalink to this headline">&para;</a></h3>

<p><pre class="snippet" src="Snippets.ned" after="//!MobileAdhocNetworkExample" until="//!End"></pre>
<p><pre class="snippet" src="Snippets.ini" after="#!MobileAdhocNetworkConfigurationExample" until="#!End"></pre>
<p>
<h2><a name="sec:networks:frequent-tasks"></a>3.4 Frequent Tasks (How To...)<a class="headerlink" href="#sec:networks:frequent-tasks" title="Permalink to this headline">&para;</a></h2>

<p>Quick and somewhat superficial advice to many practical tasks.

<p><h3><a name="sec:networks:automatic-wired-interfaces"></a>3.4.1 Automatic Wired Interfaces<a class="headerlink" href="#sec:networks:automatic-wired-interfaces" title="Permalink to this headline">&para;</a></h3>

<p>In many wired network simulations, the number of wired interfaces need not
be manually configured, because it can be automatically inferred from the
actual number of connections between network nodes.

<p><pre class="snippet" src="Snippets.ned" after="//!AutomaticWiredInterfacesExample" until="//!End"></pre>
<p><h3><a name="sec:networks:multiple-wireless-interfaces"></a>3.4.2 Multiple Wireless Interfaces<a class="headerlink" href="#sec:networks:multiple-wireless-interfaces" title="Permalink to this headline">&para;</a></h3>

<p>All built-in wireless network nodes support multiple wireless interfaces,
but only one is enabled by default.

<p><pre class="snippet" src="Snippets.ini" after="#!MultipleWirelessInterfacesExample" until="#!End"></pre>
<p><h3><a name="sec:networks:specifying-addresses"></a>3.4.3 Specifying Addresses<a class="headerlink" href="#sec:networks:specifying-addresses" title="Permalink to this headline">&para;</a></h3>

<p>Nearly all application layer modules, but several other components as well,
have parameters that specify network addresses. They typically accept
addresses given with any of the following syntax variations:

<p><ul>
  <li> literal IPv4 address: <tt>"186.54.66.2"</tt></li>
  <li> literal IPv6 address: <tt>"3011:7cd6:750b:5fd6:aba3:c231:e9f9:6a43"</tt></li>
  <li> module name: <tt>"server"</tt>, <tt>"subnet.server[3]"</tt></li>
  <li> interface of a host or router: <tt>"server/eth0"</tt>, <tt>"subnet.server[3]/eth0"</tt></li>
  <li> IPv4 or IPv6 address of a host or router: <tt>"server(ipv4)"</tt>,
      <tt>"subnet.server[3](ipv6)"</tt></li>
  <li> IPv4 or IPv6 address of an interface of a host or router:
      <tt>"server/eth0(ipv4)"</tt>, <tt>"subnet.server[3]/eth0(ipv6)"</tt></li>
</ul>

<p><h3><a name="sec:networks:node-failure-and-recovery"></a>3.4.4 Node Failure and Recovery<a class="headerlink" href="#sec:networks:node-failure-and-recovery" title="Permalink to this headline">&para;</a></h3>

<p><h3><a name="sec:networks:enabling-dual-ip-stack"></a>3.4.5 Enabling Dual IP Stack<a class="headerlink" href="#sec:networks:enabling-dual-ip-stack" title="Permalink to this headline">&para;</a></h3>

<p>All built-in network nodes support dual Internet protocol stacks, that is
both IPv4 and IPv6 are available. They are also
supported by transport layer protocols, link layer protocols, and most
applications. Only IPv4 is enabled by default, so in order to
use IPv6, it must be enabled first, and an application
supporting IPv6 (e.g., <tt>PingApp</tt> must be used). The
following example shows how to configure two ping applications in a single
node where one is using an IPv4 and the other is using an
IPv6 destination address.

<p><pre class="snippet" src="Snippets.ini" after="#!DualStackExample" until="#!End"></pre>
<p><h3><a name="sec:networks:enabling-packet-forwarding"></a>3.4.6 Enabling Packet Forwarding<a class="headerlink" href="#sec:networks:enabling-packet-forwarding" title="Permalink to this headline">&para;</a></h3>

<p>In general, network nodes don't forward packets by default, only
<tt>Router</tt> and the like do. Nevertheless, it's possible to enable
packet forwarding as simply as flipping a switch.

<p><pre class="snippet" src="Snippets.ini" after="#!ForwardingExample" until="#!End"></pre>
<p>


<p><hr class='pgbr'><div class='oppnavbar'><a href="chap2.html">Prev</a> &#8226; <a href="chap4.html">Next</a> &#8226; <a href="toc.html#toc_3">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
