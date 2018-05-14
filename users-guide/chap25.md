---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap24.html">Prev</a> &#8226; <a href="chap26.html">Next</a> &#8226; <a href="toc.html#toc_25">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:network-autoconfiguration"></a>25 Network Autoconfiguration<a class="headerlink" href="#cha:network-autoconfiguration" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:autoconfig:overview"></a>25.1 Overview<a class="headerlink" href="#sec:autoconfig:overview" title="Permalink to this headline">&para;</a></h2>

<p>This chapter describes static autoconfiguration of networks.

<p><h2><a name="sec:autoconfig:configuring-ipv4-networks"></a>25.2 Configuring IPv4 Networks<a class="headerlink" href="#sec:autoconfig:configuring-ipv4-networks" title="Permalink to this headline">&para;</a></h2>

<p>An IPv4 network is composed of several nodes like hosts, routers,
switches, hubs, Ethernet buses, or wireless access points.
The nodes having a IPv4 network layer (hosts and routers) should be
configured at the beginning of the simulation. The configuration
assigns IP addresses to the nodes, and fills their routing tables.
If multicast forwarding is simulated, then the multicast routing
tables also must be filled in.

<p>
The configuration can be manual (each address and route is fully specified
by the user), or automatic (addresses and routes are generated by
a configurator module at startup).

<p>Before version 1.99.4 INET offered <tt>Ipv4FlatNetworkConfigurator</tt>
for automatic and routing files for manual configuration.
Both had serious limitations, so a new configurator has been added
in version 1.99.4: <tt>Ipv4NetworkConfigurator</tt>. This configurator
supports both fully manual and fully automatic configuration. It
can also be used with partially specified manual configurations,
the configurator fills in the gaps automatically.

<p>The next section describes the usage of <tt>Ipv4NetworkConfigurator</tt>.
The legacy solutions <tt>Ipv4FlatNetworkConfigurator</tt> and
routing files are described in subsequent sections.

<p><h3><a name="sec:autoconfig:ipv4networkconfigurator"></a>25.2.1 Ipv4NetworkConfigurator<a class="headerlink" href="#sec:autoconfig:ipv4networkconfigurator" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Ipv4NetworkConfigurator</tt> assigns IP addresses and sets up
static routing for an IPv4 network.

<p>It assigns per-interface IP addresses, strives to take subnets into account,
and can also optimize the generated routing tables by merging routing entries.

<p>Hierarchical routing can be set up by using only a fraction of configuration
entries compared to the number of nodes. The configurator also does
routing table optimization that significantly decreases the size of routing
tables in large networks.

<p>The configuration is performed in stage 2 of the initialization. At this
point interface modules (e.g. PPP) has already registered their interface
in the interface table. If an interface is named <tt>ppp[0]</tt>, then the
corresponding interface entry is named <tt>ppp0</tt>. This name can be used
in the config file to refer to the interface.

<p>The configurator goes through the following steps:

<p><ol>
  <li>  Builds a graph representing the network topology. The graph
     will have a vertex for every module that has a @node property (this
     includes hosts, routers, and L2 devices like switches, access points,
     Ethernet hubs, etc.) It also assigns weights to vertices and edges that
     will be used by the shortest path algorithm when setting up routes.
     Weights will be infinite for IP nodes that have IP forwarding disabled
     (to prevent routes from transiting them), and zero for all other nodes
     (routers and and L2 devices). Edge weights are chosen to be inversely
     proportional to the bitrate of the link, so that the configurator
     prefers connections with higher bandwidth. For internal purposes,
     the configurator also builds a table of all "links" (the link data
     structure consists of the set of network interfaces that are
     on the same point-to-point link or LAN)</li>
  <li>  Assigns IP addresses to all interfaces of all nodes. The
     assignment process takes into consideration the addresses and netmasks
     already present on the interfaces (possibly set in earlier initialize
     stages), and the configuration provided in the XML format (described
     below). The configuration can specify "templates" for the address
     and netmask, with parts that are fixed and parts that can be chosen
     by the configurator (e.g. "10.0.x.x"). In the most general case,
     the configurator is allowed to choose any address and netmask for all
     interfaces (which results in automatic address assignment). In the most
     constrained case, the configurator is forced to use the requested addresses
     and netmasks for all interfaces (which translates to manual address assignment).
     There are many possible configuration options between these two extremums. The
     configurator assigns addresses in a way that maximizes the number of
     nodes per subnet. Once it figures out the nodes that belong to a single
     subnet it, will optimize for allocating the longest possible netmask.
     The configurator might fail to assign netmasks and addresses according
     to the given configuration parameters; if that happens, the assignment
     process stops and an error is signalled.</li>
  <li>  Adds the manual routes that are specified in the configuration.</li>
  <li>  Adds static routes to all routing tables in the network. The
     configurator uses Dijkstra's weighted shortest path algorithm to find
     the desired routes between all possible node pairs. The resulting
     routing tables will have one entry for all destination interfaces in the
     network. The configurator can be safely instructed to add default routes
     where applicable, significantly reducing the size of the host routing
     tables. It can also add subnet routes instead of interface routes further
     reducing the size of routing tables. Turning on this option requires
     careful design to avoid having IP addresses from the same subnet on
     different links. CAVEAT: Using manual routes and static route generation
     together may have unwanted side effects, because route generation ignores
     manual routes.</li>
  <li>  Then it optimizes the routing tables for size. This optimization allows
     configuring larger networks with smaller memory footprint and makes the
     routing table lookup faster. The resulting routing table might be
     different in that it will route packets that the original routing table
     did not. Nevertheless the following invariant holds: any packet routed
     by the original routing table (has matching route) will still be routed
     the same way by the optimized routing table.</li>
  <li>  Finally it dumps the requested results of the configuration. It can
     dump network topology, assigned IP addresses, routing tables and its
     own configuration format.</li>
</ol>

<p>The module can dump the result of the configuration in the XML format
which it can read. This is useful to save the result of a time consuming
configuration (large network with optimized routes), and use it as
the config file of subsequent runs.

<p><b>Network topology graph</b>

<p>The network topology graph is constructed from the nodes
of the network. The node is a module having a @node property
(this includes hosts, routers, and L2 devices like switches,
 access points, Ethernet hubs, etc.). An IP node is a node
that contains an <tt>InterfaceTable</tt> and a <tt>Ipv4RoutingTable</tt>.
A router is an IP node that has multiple network interfaces,
and IP forwarding is enabled in its routing table module.
In multicast routers the <tt>forwardMulticast</tt> parameter
is also set to <b><tt>true</tt></b>.

<p>A link is a set of interfaces that can send datagrams to each other
without intervening routers. Each interface belongs to exactly
one link. For example two interface connected
by a point-to-point connection forms a link. Ethernet interfaces
connected via buses, hubs or switches.
The configurator identifies links by discovering
the connections between the IP nodes, buses, hubs, and switches.

<p>Wireless links are identified by the <tt>ssid</tt> or <tt>accessPointAddress</tt>
parameter of the 802.11 management module. Wireless interfaces
whose node does not contain a management module are supposed
to be on the same wireless link. Wireless links can also be
configured in the configuration file of <tt>Ipv4NetworkConfigurator</tt>:

<p><pre><code data-language="xml">&lt;config&gt;
  &lt;wireless hosts="area1.*" interfaces="wlan*"&gt;
&lt;/config&gt;</code></pre>
<p>puts wlan interfaces of the specified hosts into the same wireless link.

<p>If a link contains only one router, it is marked as the gateway
of the link. Each datagram whose destination is outside the link
must go through the gateway.

<p><b>Address assignment</b>

<p>Addresses can be set up manually by giving the address and netmask for
each IP node. If some part of the address or netmask is unspecified,
then the configurator can fill them automatically. Unspecified fields
are given as an &#8220;x&#8221; character in the dotted notation of the address.
For example, if the address is specified as 192.168.1.1 and the
netmask is 255.255.255.0, then the node address will be 192.168.1.1
and its subnet is 192.168.1.0. If it is given as 192.168.x.x and
255.255.x.x, then the configurator chooses a subnet address in the range
of 192.168.0.0 - 192.168.255.252, and an IP address within the chosen
subnet. (The maximum subnet mask is 255.255.255.252 allows 2 nodes in the subnet.)

<p>The following configuration generates network addresses below the 10.0.0.0
address for each link, and assign unique IP addresses to each host:

<p><pre><code data-language="xml">&lt;config&gt;
  &lt;interface hosts="*" address="10.x.x.x" netmask="255.x.x.x"/&gt;
&lt;/config&gt;</code></pre>
<p>The configurator tries to put nodes on the same link into the same subnet,
so its enough to configure the address of only one node on each link.

<p>The following example configures a hierarchical network in a way that keeps
routing tables small.
<pre><code data-language="xml">&lt;config&gt;
  &lt;interface hosts="area11.lan1.*" address="10.11.1.x" netmask="255.255.255.x"/&gt;
  &lt;interface hosts="area11.lan2.*" address="10.11.2.x" netmask="255.255.255.x"/&gt;
  &lt;interface hosts="area12.lan1.*" address="10.12.1.x" netmask="255.255.255.x"/&gt;
  &lt;interface hosts="area12.lan2.*" address="10.12.2.x" netmask="255.255.255.x"/&gt;
  &lt;interface hosts="area*.router*" address="10.x.x.x" netmask="x.x.x.x"/&gt;
  &lt;interface hosts="*" address="10.x.x.x" netmask="255.x.x.0"/&gt;
&lt;/config&gt;</code></pre>
<p>The XML configuration must contain exactly one <tt>&lt;config&gt;</tt> element. Under the
root element there can be multiple of the following elements:

<p>The interface element provides configuration parameters for one or more
interfaces in the network. The selector attributes limit the scope where
the interface element has effects. The parameter attributes limit the
range of assignable addresses and netmasks.
The <tt>&lt;interface&gt;</tt> element may contain the following attributes:
<ul>
    <li> <tt>@hosts</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces in the specified hosts are affected. The pattern might
      be a full path starting from the network, or a module name anywhere in
      the hierarchy, and other patterns similar to ini file keys. The default
      value is "*" that matches all hosts.
      e.g. "subnet.client*" or "host* router[0..3]" or "area*.*.host[0]"</li>
    <li> <tt>@names</tt>
      Optional selector attribute that specifies a list of interface name
      patterns. Only interfaces with the specified names are affected. The
      default value is "*" that matches all interfaces.
      e.g. "eth* ppp0" or "*"</li>
    <li> <tt>@towards</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces connected towards the specified hosts are affected. The
      specified name will be matched against the names of hosts that are on
      the same LAN with the one that is being configured. This works even if
      there's a switch between the configured host and the one specified here.
      For wired networks it might be easier to specify this parameter instead
      of specifying the interface names. The default value is "*".
      e.g. "ap" or "server" or "client*"</li>
    <li> <tt>@among</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces in the specified hosts connected towards the specified
      hosts are affected.
      The 'among="X Y Z"' is same as 'hosts="X Y Z" towards="X Y Z"'.</li>
    <li> <tt>@address</tt>
      Optional parameter attribute that limits the range of assignable
      addresses. Wildcards are allowed with using 'x' as part of the address
      in place of a byte. Unspecified parts will be filled automatically by
      the configurator. The default value "" means that the address will not
      be configured. Unconfigured interfaces still have allocated addresses
      in their subnets allowing them to become configured later very easily.
      e.g. "192.168.1.1" or "10.0.x.x"</li>
    <li> <tt>@netmask</tt>
      Optional parameter attribute that limits the range of assignable
      netmasks. Wildcards are allowed with using 'x' as part of the netmask
      in place of a byte. Unspecified parts will be filled automatically be
      the configurator. The default value "" means that any netmask can be
      configured.
      e.g. "255.255.255.0" or "255.255.x.x" or "255.255.x.0"</li>
    <li> <tt>@mtu</tt>                number
      Optional parameter attribute to set the MTU parameter in the interface.
      When unspecified the interface parameter is left unchanged.</li>
    <li> <tt>@metric</tt>                number
      Optional parameter attribute to set the Metric parameter in the interface.
      When unspecified the interface parameter is left unchanged.</li>
</ul>

<p>Wireless interfaces can similarly be configured by adding
<tt>&lt;wireless&gt;</tt> elements to the configuration. Each <tt>&lt;wireless&gt;</tt>
element with a different id defines a separate subnet.

<p><ul>
    <li> <tt>@id</tt> (optional)
      identifies wireless network, unique value used if missed</li>
    <li> <tt>@hosts</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces in the specified hosts are affected. The default value
      is "*" that matches all hosts.</li>
    <li> <tt>@interfaces</tt>
      Optional selector attribute that specifies a list of interface name
      patterns. Only interfaces with the specified names are affected. The
      default value is "*" that matches all interfaces.</li>
</ul>

<p>
<h4><a name="sec:autoconfig:multicast-groups"></a>25.2.1.1 Multicast groups<a class="headerlink" href="#sec:autoconfig:multicast-groups" title="Permalink to this headline">&para;</a></h4>

<p>Multicast groups can be configured by adding <tt>&lt;multicast-group&gt;</tt>
elements to the configuration file. Interfaces belongs to a multicast
group will join to the group automatically.

<p>For example,

<p><pre><code data-language="xml">&lt;config&gt;
  &lt;multicast-group hosts="router*" interfaces="eth*" address="224.0.0.5"/&gt;
&lt;/config&gt;</code></pre>
<p>adds all Ethernet interfaces of nodes whose name starts with &#8220;router&#8221;
to the 224.0.0.5 multicast group.

<p>The <tt>&lt;multicast-group&gt;</tt> element has the following attributes:
<ul>
    <li> <tt>@hosts</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces in the specified hosts are affected. The default value
      is "*" that matches all hosts.</li>
    <li> <tt>@interfaces</tt>
      Optional selector attribute that specifies a list of interface name
      patterns. Only interfaces with the specified names are affected. The
      default value is "*" that matches all interfaces.</li>
    <li> <tt>@towards</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces connected towards the specified hosts are affected.
      The default value is "*".</li>
    <li> <tt>@among</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only interfaces in the specified hosts connected towards the specified
      hosts are affected.
      The 'among="X Y Z"' is same as 'hosts="X Y Z" towards="X Y Z"'.</li>
    <li> <tt>@address</tt>
      Mandatory parameter attribute that specifies a list of multicast group
      addresses to be assigned. Values must be selected from the valid range
      of multicast addresses.
      e.g. "224.0.0.1 224.0.1.33"</li>
</ul>

<p>
<b>Manual route configuration</b>

<p>The <tt>Ipv4NetworkConfigurator</tt> module allows the user
to fully specify the routing tables of IP nodes at the beginning
of the simulation.

<p>The <tt>&lt;route&gt;</tt> elements of the configuration add a route to the
routing tables of selected nodes. The element has the following attributes:
<ul>
    <li> <tt>@hosts</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only routing tables in the specified hosts are affected. The default
      value "" means all hosts will be affected.
      e.g. "host* router[0..3]"</li>
    <li> <tt>@destination</tt>
      Optional parameter attribute that specifies the destination address in
      the route (L3AddressResolver syntax). The default value is "*".
      e.g. "192.168.1.1" or "subnet.client[3]" or "subnet.server(ipv4)" or "*"</li>
    <li> <tt>@netmask</tt>
      Optional parameter attribute that specifies the netmask in the route.
      The default value is "*".
      e.g. "255.255.255.0" or "/29" or "*"</li>
    <li> <tt>@gateway</tt>
      Optional parameter attribute that specifies the gateway (next-hop)
      address in the route (L3AddressResolver syntax). When unspecified
      the interface parameter must be specified. The default value is "*".
      e.g. "192.168.1.254" or "subnet.router" or "*"</li>
    <li> <tt>@interface</tt>
      Optional parameter attribute that specifies the output interface name
      in the route. When unspecified the gateway parameter must be specified.
      This parameter has no default value.
      e.g. "eth0"</li>
    <li> <tt>@metric</tt>
      Optional parameter attribute that specifies the metric in the route.
      The default value is 0.</li>
</ul>

<p>Multicast routing tables can similarly be configured by adding
<tt>&lt;multicast-route&gt;</tt> elements to the configuration.
<ul>
    <li> <tt>@hosts</tt>
      Optional selector attribute that specifies a list of host name patterns.
      Only routing tables in the specified hosts are affected.
      e.g. "host* router[0..3]"</li>
    <li> <tt>@source</tt>
      Optional parameter attribute that specifies the address of the source
      network. The default value is "*" that matches all sources.</li>
    <li> <tt>@netmask</tt>
      Optional parameter attribute that specifies the netmask of the source
      network. The default value is "*" that matches all sources.</li>
    <li> <tt>@groups</tt>
      Optional List of IPv4 multicast addresses specifying the groups this entry
      applies to. The default value is "*" that matches all multicast groups.
      e.g. "225.0.0.1 225.0.1.2".</li>
    <li> <tt>@metric</tt>
      Optional parameter attribute that specifies the metric in the route.</li>
    <li> <tt>@parent</tt>
      Optional parameter attribute that specifies the name of the interface
      the multicast datagrams are expected to arrive. When a datagram arrives
      on the parent interface, it will be forwarded towards the child interfaces;
      otherwise it will be dropped. The default value is the interface on the
      shortest path towards the source of the datagram.</li>
    <li> <tt>@children</tt>
      Mandatory parameter attribute that specifies a list of interface name
      patterns:
      <ul>
        <li> a name pattern (e.g. "ppp*") matches the name of the interface</li>
        <li> a 'towards' pattern (starting with "&gt;", e.g. "&gt;router*") matches the interface
         by naming one of the neighbour nodes on its link.</li>
      </ul>
      Incoming multicast datagrams are forwarded to each child interface except the
      one they arrived in.</li>
</ul>

<p>The following example adds an entry to the multicast routing table of <tt>router1</tt>,
that intsructs the routing algorithm to forward multicast datagrams whose source
is in the 10.0.1.0 network and whose destinatation address is 225.0.0.1 to
send on the <tt>eth1</tt> and <tt>eth2</tt> interfaces assuming it arrived on the
<tt>eth0</tt> interface:

<p><pre><code data-language="xml">&lt;multicast-route hosts="router1" source="10.0.1.0" netmask="255.255.255.0"
                 groups="225.0.0.1" metric="10"
                 parent="eth0" children="eth1 eth2"/&gt;</code></pre>
<p><b>Automatic route configuration</b>

<p>If the <tt>addStaticRoutes</tt> parameter is true, then
the configurator add static routes to all routing tables.

<p>The configurator uses Dijkstra's weighted shortest path algorithm to find
the desired routes between all possible node pairs. The resulting
routing tables will have one entry for all destination interfaces in the
network.


The configurator can be safely instructed to add default routes
where applicable, significantly reducing the size of the host routing
tables. It can also add subnet routes instead of interface routes further
reducing the size of routing tables. Turning on this option requires
careful design to avoid having IP addresses from the same subnet on
different links.

<p>
<ul class="caution"><b>CAUTION</b><br>
Using manual routes and static route generation
together may have unwanted side effects, because route generation ignores
manual routes. Therefore if the configuration file contains
manual routes, then the <tt>addStaticRoutes</tt> parameter should be set
to <b><tt>false</tt></b>.</li>
</ul>

<p><b>Route optimization</b>

<p>If the <tt>optimizeRoutes</tt> parameter is <b><tt>true</tt></b> then the
configurator tries to optimize the routing table for size.
This optimization allows configuring larger networks with smaller
memory footprint and makes the routing table lookup faster.

<p>The optimization is performed by merging routes whose gateway and
outgoing interface is the same by finding a common prefix that
matches only those routes. The resulting routing table might be
different in that it will route packets that the original routing table
did not. Nevertheless the following invariant holds: any packet routed
by the original routing table (has matching route) will still be routed
the same way by the optimized routing table.

<p><b>Parameters</b>

<p>This list summarize the parameters of the <tt>IPv4NetorkConfigurator</tt>:

<p><ul>
  <li> <tt>config</tt>: XML configuration parameters for IP address assignment
    and adding manual routes.</li>
  <li> <tt>assignAddresses</tt>: assign IP addresses to all interfaces in the network</li>
  <li> <tt>assignDisjunctSubnetAddresses</tt>: avoid using the same address prefix and
    netmask on different links when assigning IP addresses to interfaces</li>
  <li> <tt>addStaticRoutes</tt>: add static routes to the routing tables of all nodes
    to route to all destination interfaces (only where applicable; turn off when
    config file contains manual routes)</li>
  <li> <tt>addDefaultRoutes</tt>: add default routes if all routes from a source node
     go through the same gateway (used only if addStaticRoutes is true)</li>
  <li> <tt>addSubnetRoutes</tt>: add subnet routes instead of destination interface routes
    (only where applicable; used only if addStaticRoutes is true)</li>
  <li> <tt>optimizeRoutes</tt>: optimize routing tables by merging routes, the
    resulting routing table might route more packets than the original
    (used only if addStaticRoutes is true)</li>
  <li> <tt>dumpTopology</tt>: if true, then the module prints extracted network topology</li>
  <li> <tt>dumpAddresses</tt>: if true, then the module prints assigned IP addresses
    for all interfaces</li>
  <li> <tt>dumpRoutes</tt>: if true, then the module prints configured and optimized
    routing tables for all nodes to the module output</li>
  <li> <tt>dumpConfig</tt>: name of the file, write configuration into the given
    config file that can be fed back to speed up subsequent runs (network configurations)</li>
</ul>

<p><h3><a name="sec:autoconfig:ipv4flatnetworkconfigurator"></a>25.2.2 Ipv4FlatNetworkConfigurator (Legacy)<a class="headerlink" href="#sec:autoconfig:ipv4flatnetworkconfigurator" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Ipv4FlatNetworkConfigurator</tt> module configures
IP addresses and routes of IP nodes of a network.
All assigned addresses share a common subnet prefix,
the network topology will be ignored. Shortest path
routes are also generated from any node to any other
node of the network. The Gateway (next hop) field of the routes
is not filled in by these configurator, so it relies
on proxy ARP if the network spans several LANs.
It does not perform routing table optimization (i.e.
merging similar routes into a single, more general route.)

<p><ul class="warning"><b>WARNING</b><br>
<tt>Ipv4FlatNetworkConfigurator</tt> is considered
legacy, use do not use it for new projects.</li>
</ul>

<p>The <tt>Ipv4FlatNetworkConfigurator</tt> module configures
the network when it is initialized. The configuration
is performed in stage 2, after interface tables are
filled in. Do not use a <tt>Ipv4FlatNetworkConfigurator</tt>
module together with static routing files, because they
can iterfere with the configurator.

<p>The <tt>Ipv4FlatNetworkConfigurator</tt> searches each IP nodes of the network.
(IP nodes are those modules that have the @node NED property and
has a <tt>Ipv4RoutingTable</tt> submodule named &#8220;routingTable&#8221;).
The configurator then assigns IP addresses to the IP nodes, controlled
by the following module parameters:
<ul>
  <li> <tt>netmask</tt> common netmask of the addresses (default is 255.255.0.0)</li>
  <li> <tt>networkAddress</tt> higher bits are the network part of the addresses,
        lower bits should be 0. (default is 192.168.0.0)</li>
</ul>

<p>With the default parameters the assigned addresses are in the range
192.168.0.1 - 192.168.255.254, so there can be maximum 65534 nodes in the
network. The same IP address will be assigned to each interface
of the node, except the loopback interface which always has address 127.0.0.1
(with 255.0.0.0 mask).

<p>After assigning the IP addresses, the configurator fills in the routing tables.
There are two kind of routes:
<ul>
  <li> default routes: for nodes that has only one non-loopback interface
        a route is added that matches with any destination address
        (the entry has 0.0.0.0 <tt>host</tt> and <tt>netmask</tt> fields).
        These are remote routes, but the gateway address is left unspecified.
        The delivery of the datagrams rely on the proxy ARP feature of the
        routers.</li>
  <li> direct routes following the shortest paths: for nodes that has more
        than one non-loopback interface a separate route is added to each
        IP node of the network. The outgoing interface is chosen by the
        shortest path to the target node. These routes are
        added as direct routes, even if there is no direct link with the
        destination. In this case proxy ARP is needed to deliver the datagrams.</li>
</ul>

<p><ul class="note"><b>NOTE</b><br>
This configurator does not try to optimize the routing tables.
If the network contains <i>n</i> nodes, the size of all routing tables
will be proportional to <i>n<sup>2</sup></i>, and the time of the lookup of the
best matching route will be proportional to <i>n</i>.</li>
</ul>


<h3><a name="sec:autoconfig:routing-files"></a>25.2.3 Routing Files (Legacy)<a class="headerlink" href="#sec:autoconfig:routing-files" title="Permalink to this headline">&para;</a></h3>

<p>Routing files are files with <tt>.irt</tt> or <tt>.mrt</tt> extension,
and their names are passed in the <tt>routingFile</tt> parameter
to <tt>Ipv4RoutingTable</tt> modules.

<p>Routing files may contain network interface configuration and static
routes. Both are optional. Network interface entries in the file
configure existing interfaces; static routes are added to the route table.

<p><ul class="warning"><b>WARNING</b><br>
<tt>Routing files</tt> are considered legacy, use do not use them for new
projects. Their contents can be expressed in <tt>Ipv4NetworkConfigurator</tt>
config files.</li>
</ul>

<p>Interfaces themselves are represented in the simulation by modules
(such as the PPP module). Modules automatically register themselves
with appropriate defaults in the IPv4RoutingTable, and entries in the
routing file refine (overwrite) these settings.
Interfaces are identified by names (e.g. ppp0, ppp1, eth0) which
are normally derived from the module's name: a module called
<tt>"ppp[2]"</tt> in the NED file registers itself as interface ppp2.

<p>An example routing file (copied here from one of the example simulations):


ifconfig:

# ethernet card 0 to router
name: eth0   inet_addr: 172.0.0.3   MTU: 1500   Metric: 1  BROADCAST MULTICAST
Groups: 225.0.0.1:225.0.1.2:225.0.2.1

# Point to Point link 1 to Host 1
name: ppp0   inet_addr: 172.0.0.4   MTU: 576   Metric: 1

ifconfigend.

route:
172.0.0.2   *           255.255.255.255  H  0   ppp0
172.0.0.4   *           255.255.255.255  H  0   ppp0
default:    10.0.0.13   0.0.0.0          G  0   eth0

225.0.0.1   *           255.255.255.255  H  0   ppp0
225.0.1.2   *           255.255.255.255  H  0   ppp0
225.0.2.1   *           255.255.255.255  H  0   ppp0

225.0.0.0   10.0.0.13   255.0.0.0        G  0   eth0

routeend.

<p>
The <tt>ifconfig...ifconfigend.</tt> part configures interfaces,
and <tt>route..routeend.</tt> part contains static routes.
The format of these sections roughly corresponds to the output
of the <tt>ifconfig</tt> and <tt>netstat -rn</tt> Unix commands.

<p>An interface entry begins with a <tt>name:</tt> field, and lasts until
the next <tt>name:</tt> (or until <tt>ifconfigend.</tt>). It may
be broken into several lines.

<p>Accepted interface fields are:

<p><ul>
  <li> <tt>name:</tt> - arbitrary interface name (e.g. eth0, ppp0)</li>
  <li> <tt>inet_addr:</tt> - IP address</li>
  <li> <tt>Mask:</tt> - netmask</li>
  <li> <tt>Groups:</tt> Multicast groups. 224.0.0.1 is added automatically,
     and 224.0.0.2 also if the node is a router (IPForward==true).</li>
  <li> <tt>MTU:</tt> - MTU on the link (e.g. Ethernet: 1500)</li>
  <li> <tt>Metric:</tt> - integer route metric</li>
  <li> flags: <tt>BROADCAST</tt>, <tt>MULTICAST</tt>, <tt>POINTTOPOINT</tt></li>
</ul>

<p>The following fields are parsed but ignored: <tt>Bcast</tt>,<tt>encap</tt>,
<tt>HWaddr</tt>.

<p>Interface modules set a good default for MTU, Metric (as <i>2*10<sup>9</sup></i>/bitrate) and
flags, but leave <tt>inet_addr</tt> and <tt>Mask</tt> empty. <tt>inet_addr</tt> and
<tt>mask</tt> should be set either from the routing file or by a dynamic network
configuration module.

<p>The route fields are:


Destination  Gateway  Netmask  Flags  Metric Interface

<p>
<tt>Destination</tt>, <tt>Gateway</tt> and <tt>Netmask</tt> have the usual meaning.
The <tt>Destination</tt> field should either be an IP address or &#8220;default&#8221;
(to designate the default route). For <tt>Gateway</tt>, <tt>*</tt> is also
accepted with the meaning <tt>0.0.0.0</tt>.

<p><tt>Flags</tt> denotes route type:

<p><ul>
  <li> <i>H</i> &#8220;host&#8221;: direct route (directly attached to the router), and</li>
  <li> <i>G</i> &#8220;gateway&#8221;: remote route (reached through another router)</li>
</ul>

<p><tt>Interface</tt> is the interface name, e.g. <tt>eth0</tt>.

<p><ul class="important"><b>IMPORTANT</b><br>
The meaning of the routes where the destination is a multicast address
has been changed in version 1.99.4. Earlier these entries was used
both to select the outgoing interfaces of multicast datagrams
sent by the higher layer (if multicast interface was otherwise unspecified)
and to select the outgoing interfaces of datagrams that are received from
the network and forwarded by the node.

<p>From version 1.99.4 multicast routing applies reverse path forwarding.
This requires a separate routing table, that can not be populated from
the old routing table entries. Therefore simulations that use multicast
forwarding can not use the old configuration files, they should be
migrated to use an <tt>Ipv4NetworkConfigurator</tt> instead.

<p>Some change is needed in models that use link-local multicast too.
Earlier if the IP module received a datagram from the higher layer
and multiple routes was given for the multicast group,
then IP sent a copy of the datagram on each interface of that routes.
From version 1.99.4, only the first matching interface is used (considering
longest match). If the application wants to send the multicast datagram
on each interface, then it must explicitly loop and specify the multicast
interface.</li>
</ul>


<p>
<h2><a name="sec:autoconfig:configuring-layer-2"></a>25.3 Configuring Layer 2<a class="headerlink" href="#sec:autoconfig:configuring-layer-2" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>L2Configurator</tt> module allows configuring network scenarios at layer 2.
The STP/RTP-related parameters such as link cost, port priority
and the &#8220;is-edge&#8221; flag can be configured with XML files.

<p>This module is similar to <tt>Ipv4NetworkConfigurator</tt>. It supports
the selector attributes <tt>@hosts</tt>, <tt>@names</tt>, <tt>@towards</tt>, <tt>@among</tt>,
and they behave similarly to its <tt>Ipv4NetworkConfigurator</tt> equivalent.
The <tt>@ports</tt> selector is also supported, for configuring per-port parameters.

<p>The following example configures port 5 (if it exists) on all switches,
and sets cost=19 and priority=32768:

<p><pre><code data-language="xml">&lt;config&gt;
  &lt;interface hosts='**' ports='5' cost='19' priority='32768'/&gt;
&lt;/config&gt;</code></pre>
<p>For more information about the usage of the selector attributes see
<tt>Ipv4NetworkConfigurator</tt>.

<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap24.html">Prev</a> &#8226; <a href="chap26.html">Next</a> &#8226; <a href="toc.html#toc_25">ToC</a> &#8226; <a href="index.html">Chapters</a></div>