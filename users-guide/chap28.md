---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap27.html">Prev</a> &#8226; <a href="chap29.html">Next</a> &#8226; <a href="toc.html#toc_28">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:visualization"></a>28 Visualization<a class="headerlink" href="#cha:visualization" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:visualization:overview"></a>28.1 Overview<a class="headerlink" href="#sec:visualization:overview" title="Permalink to this headline">&para;</a></h2>

<p>The INET Framework is able to visualize a wide range of events and conditions
in the network: packet drops, data link connectivity, wireless signal path loss,
transport connections, routing table routes, and many more. Visualization is
implemented as a collection of configurable INET modules that can be added
to simulations at will.

<p><h2><a name="sec:visualization:network-communication"></a>28.2 Visualizing Network Communication<a class="headerlink" href="#sec:visualization:network-communication" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:visualization:packet-drops"></a>28.2.1 Visualizing Packet Drops<a class="headerlink" href="#sec:visualization:packet-drops" title="Permalink to this headline">&para;</a></h3>

<p>Several network problems manifest themselves as excessive packet drops, for
example poor connectivity, congestion, or misconfiguration. Visualizing packet
drops helps identifying such problems in simulations, thereby reducing time
spent on debugging and analysis. Poor connectivity in a wireless network can
cause senders to drop unacknowledged packets after the retry limit is exceeded.
Congestion can cause queues to overflow in a bottleneck router, again resulting
in packet drops.

<p>Packet drops can be visualized by including a <tt>PacketDropVisualizer</tt>
module in the simulation. The <tt>PacketDropVisualizer</tt> module indicates
packet drops by displaying an animation effect at the node where the packet drop
occurs. In the animation, a packet icon gets thrown out from the node icon, and
fades away.

<p>The visualization of packet drops can be enabled with the visualizer's
<tt>displayPacketDrops</tt> parameter. By default, packet drops at all nodes are
visualized. This selection can be narrowed with the <tt>nodeFilter</tt>,
<tt>interfaceFilter</tt> and <tt>packetFilter</tt> parameters.

<p>One can click on the packet drop icon to display information about the packet
drop in the inspector panel.

<p>Packets are dropped for the following reasons:

<p><ul>
  <li> queue overflow</li>
  <li> retry limit exceeded</li>
  <li> unroutable packet</li>
  <li> network address resolution failed</li>
  <li> interface down</li>
</ul>

<p>
<h3><a name="sec:visualization:transport-path-activity"></a>28.2.2 Visualizing Transport Path Activity<a class="headerlink" href="#sec:visualization:transport-path-activity" title="Permalink to this headline">&para;</a></h3>

<p>With INET simulations, it is often useful to be able to visualize network
traffic. INET provides several visualizers for this task, operating at various
levels of the network stack.

<p>Transport path activity can be visualized by including a
<tt>TransportRouteVisualizer</tt> module in the simulation. <tt>TransportRouteVisualizer</tt>
that can provide graphical feedback about transport traffic, i.e. traffic that passes
through the transport layers of two endpoints. Adding an <tt>IntegratedVisualizer</tt> is
also an option, because it also contains a <tt>TransportRouteVisualizer</tt>. Transport
path activity visualization is disabled by default, it can be enabled by setting
the visualizer's <tt>displayRoutes</tt> parameter to true.

<p><tt>TransportRouteVisualizer</tt> observes packets that pass through the transport layer,
i.e. carry data from/to higher layers.

<p>The activity between two nodes is represented visually by a polyline arrow which
points from the source node to the destination node. <tt>TransportRouteVisualizer</tt>
follows packets throughout their path so that the polyline goes through all
nodes which are the part of the path of packets. The arrow appears after the
first packet has been received, then gradually fades out unless it is reinforced
by further packets. Color, fading time and other graphical properties can be
changed with parameters of the visualizer.

<p>By default, all packets and nodes are considered for the visualization. This
selection can be narrowed with the visualizer's packetFilter and nodeFilter
parameters.

<p><h3><a name="sec:visualization:network-path-activity"></a>28.2.3 Visualizing Network Path Activity<a class="headerlink" href="#sec:visualization:network-path-activity" title="Permalink to this headline">&para;</a></h3>

<p>With INET simulations, it is often useful to be able to visualize network
traffic. INET offers several visualizers for this task, operating at various
levels of the network stack. In this showcase, we examine <tt>NetworkRouteVisualizer</tt>
that can provide graphical feedback about network layer level traffic.

<p>Network path activity can be visualized by including a <tt>NetworkRouteVisualizer</tt>
module in the simulation. Adding an <tt>IntegratedVisualizer</tt> module is also an
option, because it also contains a <tt>NetworkRouteVisualizer</tt> module. Network path
activity visualization is disabled by default, it can be enabled by setting the
visualizer's <tt>displayRoutes</tt> parameter to true.

<p><tt>NetworkRouteVisualizer</tt> currently observes packets that pass through the network
layer (i.e. carry data from/to higher layers), but not those that are internal
to the operation of the network layer protocol. That is, packets such as ARP,
although potentially useful, will not trigger the visualization.

<p>The activity between two nodes is represented visually by a polyline arrow which
points from the source node to the destination node. <tt>NetworkRouteVisualizer</tt>
follows packet throughout its path so the polyline goes through all nodes that
are part of the packet's path. The arrow appears after the first packet has been
received, then gradually fades out unless it is reinforced by further packets.
Color, fading time and other graphical properties can be changed with parameters
of the visualizer.

<p>By default, all packets and nodes are considered for the visualization. This
selection can be narrowed with the visualizer's packetFilter and nodeFilter
parameters.

<p>
<h3><a name="sec:visualization:data-link-activity"></a>28.2.4 Visualizing Data Link Activity<a class="headerlink" href="#sec:visualization:data-link-activity" title="Permalink to this headline">&para;</a></h3>

<p>With INET simulations, it is often useful to be able to visualize network
traffic. INET offers several visualizers for this task, operating at various
levels of the network stack. In this showcase, we examine <tt>DataLinkVisualizer</tt>
that can provide graphical feedback about data link level traffic.

<p>Data link activity can be visualized by including a <tt>DataLinkVisualizer</tt> module in
the simulation. Adding an <tt>IntegratedVisualizer</tt> module is also an option, because
it also contains a <tt>DataLinkVisualizer</tt> module. Data link visualization is
disabled by default, it can be enabled by setting the visualizer's displayLinks
parameter to true.

<p><tt>DataLinkVisualizer</tt> currently observes packets that pass through the data link
layer (i.e. carry data from/to higher layers), but not those that are internal
to the operation of the data link layer protocol. That is, frames such as ACK,
RTS/CTS, Beacon or Authentication/Association frames of IEEE 802.11, although
potentially useful, will not trigger the visualization. Visualizing such frames
may be implemented in future INET revisions.

<p>The activity between two nodes is represented visually by an arrow that points
from the sender node to the receiver node. The arrow appears after the first
packet has been received, then gradually fades out unless it is refreshed by
further packets. The style, color, fading time and other graphical properties
can be changed with parameters of the visualizer.

<p>By default, all packets, interfaces and nodes are considered for the
visualization. This selection can be narrowed to certain packets and/or nodes
with the visualizer's <tt>packetFilter</tt>, <tt>interfaceFilter</tt>, and
<tt>nodeFilter</tt> parameters.

<p>
<h3><a name="sec:visualization:physical-link-activity"></a>28.2.5 Visualizing Physical Link Activity<a class="headerlink" href="#sec:visualization:physical-link-activity" title="Permalink to this headline">&para;</a></h3>

<p>With INET simulations, it is often useful to be able to visualize network
traffic. For this task, there are several visualizers in INET, operating at
various levels of the network stack. In this showcase, we demonstrate working of
<tt>PhysicalLinkVisualizer</tt> that can provide graphical feedback about physical layer
traffic.

<p>Physical link activity can be visualized by including a <tt>PhysicalLinkVisualizer</tt>
module in the simulation. Adding an <tt>IntegratedVisualizer</tt> module is also an
option, because it also contains a <tt>PhysicalLinkVisualizer</tt> module. Physical link
activity visualization is disabled by default, it can be enabled by setting the
visualizer's <tt>displayLinks</tt> parameter to true.

<p><tt>PhysicalLinkVisualizer</tt> observes frames that pass through the physical layer,
i.e. are received correctly.

<p>The activity between two nodes is represented visually by a dotted arrow which
points from the sender node to the receiver node. The arrow appears after the
first frame has been received, then gradually fades out unless it is refreshed
by further frames. Color, fading time and other graphical properties can be
changed with parameters of the visualizer.

<p>By default, all packets, interfaces and nodes are considered for the
visualization. This selection can be narrowed with the visualizer's
<tt>packetFilter</tt>, <tt>interfaceFilter</tt>, and <tt>nodeFilter</tt> parameters.

<p>
<h3><a name="sec:visualization:routing-tables"></a>28.2.6 Visualizing Routing Tables<a class="headerlink" href="#sec:visualization:routing-tables" title="Permalink to this headline">&para;</a></h3>

<p>In a complex network topology, it is difficult to see how a packet would be
routed because the relevant data is scattered among network nodes and hidden in
their routing tables. INET contains support for visualization of routing tables,
and can display routing information graphically in a concise way. Using
visualization, it is often possible to understand routing in a simulation
without looking into individual routing tables. The visualization currently
supports IPv4.

<p>The <tt>RoutingTableVisualizer</tt> module (included in the network as part of
<tt>IntegratedVisualizer</tt>) is responsible for visualizing routing table entries.

<p>The visualizer basically annotates network links with labeled arrows that
connect source nodes to next hop nodes. The module visualizes those routing
table entries that participate in the routing of a given set of destination
addresses, by default the addresses of all interfaces of all nodes in the
network. That is, it selects the best (longest prefix) matching routes for all
destination addresses from each routing table, and shows them as arrows that
point to the next hop. Note that one arrow might need to represent several
routing entries, for example when distinct prefixes are routed towards the same
next hop.

<p>Routing table entries are represented visually by solid arrows. An arrow going
from a source node represents a routing table entry in the source node's routing
table. The endpoint node of the arrow is the next hop in the visualized routing
table entry. By default, the routing entry is displayed on the arrows in
following format:


destination/mask -&gt; gateway (interface)

<p>
The format can be changed by setting the visualizer's <tt>labelFormat</tt> parameter.

<p>Filtering is also possible. The <tt>nodeFilter</tt> parameter controls which nodes'
routing tables should be visualized (by default, all nodes), and the
<tt>destinationFilter</tt> parameter selects the set of destination nodes to consider
(again, by default all nodes.)

<p>The visualizer reacts to changes. For example, when a routing protocol changes a
routing entry, or an IP address gets assigned to an interface by DHCP, the
visualizer automatically updates the visualizations according to the specified
filters. This is very useful e.g. for the simulation of mobile ad-hoc networks.

<p><h3><a name="sec:visualization:displaying-ip-addresses-and-other-interface-information"></a>28.2.7 Displaying IP Addresses and Other Interface Information<a class="headerlink" href="#sec:visualization:displaying-ip-addresses-and-other-interface-information" title="Permalink to this headline">&para;</a></h3>

<p>In the simulation of complex networks, it is often useful to be able to display
node IP addresses, interface names, etc. above the node icons or on the links.
For example, when automatic address assignment is used in a hierarchical network
(e.g. using <tt>Ipv4NetworkConfigurator</tt>), visual inspection can help to
verify that the result matches the expectations. While it is true that addresses and other
interface data can also be accessed in the GUI by diving into the interface
tables of each node, that is tedious, and unsuitable for getting an overview.

<p>The <tt>InterfaceTableVisualizer</tt> module (included in the network as part of
<tt>IntegratedVisualizer</tt>) displays data about network nodes' interfaces.
(Interfaces are contained in interface tables, hence the name.) By default, the
visualization is turned off. When it is enabled using the
<tt>displayInterfaceTables</tt> parameter, the default is that interface names, IP
addresses and netmask length are displayed, above the nodes (for wireless
interfaces) and on the links (for wired interfaces). By clicking on an interface
label, details are displayed in the inspector panel.

<p>The visualizer has several configuration parameters. The <tt>format</tt> parameter
specifies what information is displayed about interfaces. It takes a format
string, which can contain the following directives:

<p><ul>
  <li> %N: interface name</li>
  <li> %4: IPv4 address</li>
  <li> %6: IPv6 address</li>
  <li> %n: network address. This is either the IPv4 or the IPv6 address</li>
  <li> %l: netmask length</li>
  <li> %M: MAC address</li>
  <li> %\: conditional newline for wired interfaces. The '\'
  needs to be escaped with another '\', i.e. '%<br>'</li>
  <li> %i and %s: the info() and str() functions for the interfaceEntry class, respectively</li>
</ul>

<p>The default format string is
<tt>"%N %<br>%n/%l"</tt>, i.e. interface name, IP address and
netmask length.

<p>The set of visualized interfaces can be selected with the configurator's
<tt>nodeFilter</tt> and <tt>interfaceFilter</tt> parameters. By default, all
interfaces of all nodes are visualized, except for loopback addresses (the default for the
<tt>interfaceFilter</tt> parameter is <tt>"not lo\*"</tt>.)

<p>It is possible to display the labels for wired interfaces above the node icons,
instead of on the links. This can be done by setting the
<tt>displayWiredInterfacesAtConnections</tt> parameter to false.

<p>There are also several parameters for styling, such as color and font selection.

<p>
<h3><a name="sec:visualization:ieee-80211-network-membership"></a>28.2.8 Visualizing IEEE 802.11 Network Membership<a class="headerlink" href="#sec:visualization:ieee-80211-network-membership" title="Permalink to this headline">&para;</a></h3>

<p>When simulating wifi networks that overlap in space, it is difficult to see
which node is a member of which network. The membership may even change over
time. It would be useful to be able to display e.g. the SSID above node icons.

<p>IEEE 802.11 network membership can be visualized by including a
<tt>Ieee80211Visualizer</tt> module in the simulation. Adding an <tt>IntegratedVisualizer</tt> is
also an option, because it also contains a <tt>Ieee80211Visualizer</tt>. Displaying
network membership is disabled by default, it can be enabled by setting the
visualizer's <tt>displayAssociations</tt> parameter to true.

<p>The <tt>Ieee80211Visualizer</tt> displays an icon and the SSID above network nodes which
are part of a wifi network. The icons are color-coded according to the SSID. The
icon, colors, and other visual properties can be configured via parameters of
the visualizer.

<p>The visualizer's <tt>nodeFilter</tt> parameter selects which nodes' memberships are
visualized. The <tt>interfaceFilter</tt> parameter selects which interfaces are
considered in the visualization. By default, all interfaces of all nodes are
considered.

<p>
<h3><a name="sec:visualization:transport-connections"></a>28.2.9 Visualizing Transport Connections<a class="headerlink" href="#sec:visualization:transport-connections" title="Permalink to this headline">&para;</a></h3>

<p>In a large network with a complex topology, there might be many transport layer
applications and many nodes communicating. In such a case, it might be difficult
to see which nodes communicate with which, or if there is any communication at
all. Transport connection visualization makes it easy to get information about
the active transport connections in the network at a glance. Visualization makes
it easy to identify connections by their two endpoints, and to tell different
connections apart. It also gives a quick overview about the number of
connections in individual nodes and the whole network.

<p>The <tt>TransportConnectionVisualizer</tt> module (also part of <tt>IntegratedVisualizer</tt>)
displays color-coded icons above the two endpoints of an active, established
transport layer level connection. The icons will appear when the connection is
established, and disappear when it is closed. Naturally, there can be multiple
connections open at a node, thus there can be multiple icons. Icons have the
same color at both ends of the connection. In addition to colors, letter codes
(A, B, AA, …) may also be displayed to help in identifying connections. Note
that this visualizer does not display the paths the packets take. If you are
interested in that, take a look at <tt>TransportRouteVisualizer</tt>, covered in the
Visualizing Transport Path Activity showcase.

<p>The visualization is turned off by default, it can be turned on by setting the
<tt>displayTransportConnections</tt> parameter of the visualizer to true.

<p>It is possible to filter the connections being visualized. By default, all
connections are included. Filtering by hosts and port numbers can be achieved by
setting the <tt>sourcePortFilter</tt>, <tt>destinationPortFilter</tt>,
<tt>sourceNodeFilter</tt> and <tt>destinationNodeFilter</tt> parameters.

<p>The icon, colors and other visual properties can be configured by setting the
visualizer's parameters.

<p>
<h2><a name="sec:visualization:the-infrastructure"></a>28.3 Visualizing The Infrastructure<a class="headerlink" href="#sec:visualization:the-infrastructure" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:visualization:the-physical-environment"></a>28.3.1 Visualizing the Physical Environment<a class="headerlink" href="#sec:visualization:the-physical-environment" title="Permalink to this headline">&para;</a></h3>

<p>The physical environment has a profound effect on the communication of wireless
devices. For example, physical objects like walls inside buildings constraint
mobility. They also obstruct radio signals often resulting in packet loss. It's
difficult to make sense of the simulation without actually seeing where physical
objects are.

<p>The visualization of physical objects present in the physical environment is
essential.

<p>The <tt>PhysicalEnvironmentVisualizer</tt> (also part of <tt>IntegratedVisualizer</tt>) is
responsible for displaying the physical objects. The objects themselves are
provided by the PhysicalEnvironment module; their geometry, physical and visual
properties are defined in the XML configuration of the PhysicalEnvironment
module.

<p>The two-dimensional projection of physical objects is determined by the
<tt>SceneCanvasVisualizer</tt> module. (This is because the projection is also needed by
other visualizers, for example <tt>MobilityVisualizer</tt>.) The default view is top view
(z axis), but you can also configure side view (x and y axes), or isometric or
ortographic projection.

<p>The visualizer also supports OpenGL-based 3D rendering using the OpenSceneGraph
(OSG) library. If the OMNeT++ installation has been compiled with OSG
support, you can switch to 3D view using the Qtenv toolbar.

<p><h3><a name="sec:visualization:node-mobility"></a>28.3.2 Visualizing Node Mobility<a class="headerlink" href="#sec:visualization:node-mobility" title="Permalink to this headline">&para;</a></h3>

<p>In INET simulations, the movement of mobile nodes is often as important as the
communication among them. However, as mobile nodes roam, it is often difficult
to visually follow their movement. INET provides a visualizer that not only
makes visually tracking mobile nodes easier, but also indicates other properties
like speed and direction.

<p>Node mobility of nodes can be visualized by <tt>MobilityVisualizer</tt> module
(included in the network as part of <tt>IntegratedVisualizer</tt>). By default,
mobility visualization is enabled, it can be disabled by setting
<tt>displayMovements</tt> parameter to false.

<p>By default, all mobilities are considered for the visualization. This selection
can be narrowed with the visualizer's <tt>moduleFilter</tt> parameter.

<p>The visualizer has several important features:

<p><ul>
  <li> Movement Trail: It displays a line along the recent path of movements.
        The trail gradually fades out as time passes. Color, trail length and
        other graphical properties can be changed with parameters of the
        visualizer.</li>
  <li> Velocity Vector: Velocity is represented visually by an arrow. Its
        starting point is the node, and its direction coincides with the
        movement's direction. The arrow's length is proportional to the node's
       speed.</li>
  <li> Orientation Arc: Node orientation is represented by an arc whose size
       is specified by the <tt>orientationArcSize</tt> parameter. This value is the
       relative size of the arc compared to a full circle. The arc's default
       value is 0.25, i.e. a quarter of a circle.</li>
</ul>

<p>These features are disabled by default; they can be enabled by setting the
visualizer's <tt>displayMovementTrails</tt>, <tt>displayVelocities</tt> and
<tt>displayOrientations</tt> parameters to true.

<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap27.html">Prev</a> &#8226; <a href="chap29.html">Next</a> &#8226; <a href="toc.html#toc_28">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
