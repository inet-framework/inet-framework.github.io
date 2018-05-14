---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
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

<p>RIP (Routing Information Protocol) is a distance-vector routing protocol which
employs the hop count as a routing metric. RIP prevents routing loops by
implementing a limit on the number of hops allowed in a path from source to
destination.  RIP uses the <i>split horizon with poison reverse</i> technique
to work around the &#8220;count-to-infinity&#8221; problem.

<p>The <tt>Rip</tt> module implements distance vector routing as specified in RFC
2453 (RIPv2) and RFC 2080 (RIPng). The behavior can be selected by setting the
<tt>mode</tt> parameter to either <tt>"RIPv2"</tt> or <tt>"RIPng"</tt>. Protocol
configuration such as link metrics and per-interface operation mode (such as 
whether RIP is enabled on the interface, and whether to use split horizon)
can be specified in XML using the <tt>ripConfig</tt> parameter.

<p>The following example configures a <tt>Router</tt> module to use RIPv2:

<pre><code data-language="ini">**.hasRIP = true
**.mode = "RIPv2"
**.ripConfig = xmldoc("RIPConfig.xml")</code></pre><p>
The configuration file specifies the per interface parameters.
Each <tt>&lt;interface&gt;</tt> element configures one or more interfaces;
the <tt>hosts</tt>, <tt>names</tt>, <tt>towards</tt>, <tt>among</tt> attributes
select the configured interfaces (in a similar way as with
<tt>Ipv4NetworkConfigurator</tt> <a href="chap25.html#cha:network-autoconfiguration">[25]</a>).

<p>Additional attributes:

<p><ul>
  <li> <tt>metric</tt>: metric assigned to the link, default value is 1.
        This value is added to the metric of a learned route,
        received on this interface. It must be an integer in
        the [1,15] interval.</li>
  <li> <tt>mode</tt>: mode of the interface.</li>
</ul>

<p>The mode attribute can be one of the following:

<p><ul>
  <li> <tt>'NoRIP'</tt>: no RIP messages are sent or received on this interface.</li>
  <li> <tt>'NoSplitHorizon'</tt>: no split horizon filtering; send all routes to
        neighbors.</li>
  <li> <tt>'SplitHorizon'</tt>: do not sent routes whose next hop is the neighbor.</li>
  <li> <tt>'SplitHorizonPoisenedReverse'</tt> (default): if the next hop is the neighbor, then
  set the metric of the route to infinity.</li>
</ul>

<p>The following example sets the link metric between router
<tt>R1</tt> and <tt>RB</tt> to 2, while all other links will have a metric of 1.

<p><pre><code data-language="xml">&lt;RIPConfig&gt;
  &lt;interface among="R1 RB" metric="2"/&gt;
  &lt;interface among="R? R?" metric="1"/&gt;
&lt;/RIPConfig&gt;</code></pre>
<p><h2><a name="sec:routing:ospf"></a>10.3 OSPF<a class="headerlink" href="#sec:routing:ospf" title="Permalink to this headline">&para;</a></h2>

<p>OSPF (Open Shortest Path First) is a routing protocol for IP networks.
It uses a link state routing (LSR) algorithm and falls into the group
of interior gateway protocols (IGPs), operating within a single
autonomous system (AS).

<p><tt>OspfRouter</tt> is a <tt>Router</tt> with the OSPF protocol enabled.

<p>The <tt>Ospf</tt> module implements OSPF protocol version 2. Areas and routers
can be configured using an XML file specified by the <tt>ospfConfig</tt> parameter.
Various parameters for the network interfaces can be specified also in the XML
file or as a parameter of the <tt>Ospf</tt> module.

<pre><code data-language="ini">**.ospf.ospfConfig = xmldoc("ASConfig.xml")
**.ospf.helloInterval = 12s
**.ospf.retransmissionInterval = 6s</code></pre><p>
The <tt>&lt;OSPFASConfig&gt;</tt> root element may contain <tt>&lt;Area&gt;</tt> and <tt>&lt;Router&gt;</tt>
elements with various attributes specifying the parameters for the network
interfaces. Most importantly <tt>&lt;Area&gt;</tt> contains <tt>&lt;AddressRange&gt;</tt> elements
enumerating the network addresses that should be advertized by the protocol.
Also <tt>&lt;Router&gt;</tt> elements may contain data for configuring various pont-to-point
or broadcast interfaces.

<p><pre><code data-language="xml">&lt;?xml version="1.0"?&gt;
&lt;OSPFASConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="OSPF.xsd"&gt;
  &lt;!-- Areas --&gt;
  &lt;Area id="0.0.0.0"&gt;
    &lt;AddressRange address="H1" mask="H1" status="Advertise" /&gt;
    &lt;AddressRange address="H2" mask="H2" status="Advertise" /&gt;
    &lt;AddressRange address="R1&gt;R2" mask="R1&gt;R2" status="Advertise" /&gt;
    &lt;AddressRange address="R2&gt;R1" mask="R2&gt;R1" status="Advertise" /&gt;
  &lt;/Area&gt;
  &lt;!-- Routers --&gt;
  &lt;Router name="R1" RFC1583Compatible="true"&gt;
    &lt;BroadcastInterface ifName="eth0" areaID="0.0.0.0" interfaceOutputCost="1" routerPriority="1" /&gt;
    &lt;PointToPointInterface ifName="eth1" areaID="0.0.0.0" interfaceOutputCost="2" /&gt;
  &lt;/Router&gt;
  &lt;Router name="R2" RFC1583Compatible="true"&gt;
    &lt;PointToPointInterface ifName="eth0" areaID="0.0.0.0" interfaceOutputCost="2" /&gt;
    &lt;BroadcastInterface ifName="eth1" areaID="0.0.0.0" interfaceOutputCost="1" routerPriority="2" /&gt;
  &lt;/Router&gt;
&lt;/OSPFASConfig&gt;</code></pre>
<p><h2><a name="sec:routing:bgp"></a>10.4 BGP<a class="headerlink" href="#sec:routing:bgp" title="Permalink to this headline">&para;</a></h2>

<p>BGP (Border Gateway Protocol) is a standardized exterior gateway protocol
designed to exchange routing and reachability information among
autonomous systems (AS) on the Internet.

<p><tt>BgpRouter</tt> is a <tt>Router</tt> with the BGP protocol enabled.

<p>The <tt>Bgp</tt> module implements BGP Version 4. The model implements
RFC 4271, with some limitations. Autonomous Systems and rules can be
configured in an XML file that can be specified in the <tt>bgpConfig</tt>
parameter.

<pre><code data-language="ini">**.bgpConfig = xmldoc("BGPConfig.xml")</code></pre><p>
The configuration file may contain <tt>&lt;TimerParams&gt;</tt>, <tt>&lt;AS&gt;</tt> and
<tt>Session</tt> elements at the top level.

<p><ul>
  <li> <tt>&lt;TimerParams&gt;</tt>: allows specifying various timing parameters
  for the routers.</li>
  <li> <tt>&lt;AS&gt;</tt>: defines Autonomous Systems, routers and rules to be applied.</li>
  <li> <tt>&lt;Session&gt;</tt>: specifies open sessions between edge routers. It must
  contain exactly two <tt>&lt;Router exterAddr="x.x.x.x"/&gt;</tt> elements.</li>
</ul>

<p><pre><code data-language="xml">&lt;BGPConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="BGP.xsd"&gt;

  &lt;TimerParams&gt;
    &lt;connectRetryTime&gt; 120 &lt;/connectRetryTime&gt;
    &lt;holdTime&gt; 180 &lt;/holdTime&gt;
    &lt;keepAliveTime&gt; 60 &lt;/keepAliveTime&gt;
    &lt;startDelay&gt; 15 &lt;/startDelay&gt;
  &lt;/TimerParams&gt;

  &lt;AS id="60111"&gt;
    &lt;Router interAddr="172.1.10.255"/&gt; &lt;!--Router A1--&gt;
    &lt;Router interAddr="172.1.20.255"/&gt; &lt;!--Router A2--&gt;
  &lt;/AS&gt;

  &lt;AS id="60222"&gt;
    &lt;Router interAddr="172.10.4.255"/&gt; &lt;!--Router B--&gt;
  &lt;/AS&gt;

  &lt;AS id="60333"&gt;
    &lt;Router interAddr="172.13.1.255"/&gt; &lt;!--Router C1--&gt;
    &lt;Router interAddr="172.13.2.255"/&gt; &lt;!--Router C2--&gt;
    &lt;Router interAddr="172.13.3.255"/&gt; &lt;!--Router C3--&gt;
    &lt;Router interAddr="172.13.4.255"/&gt; &lt;!--Router C4--&gt;
    &lt;DenyRouteOUT Address="172.10.8.0" Netmask="255.255.255.0"/&gt;
    &lt;DenyASOUT&gt; 60111 &lt;/DenyASOUT&gt;
  &lt;/AS&gt;

  &lt;Session id="1"&gt;
    &lt;Router exterAddr="10.10.10.1" &gt; &lt;/Router&gt; &lt;!--Router A1--&gt;
    &lt;Router exterAddr="10.10.10.2" &gt; &lt;/Router&gt; &lt;!--Router C1--&gt;
  &lt;/Session&gt;

  &lt;Session id="2"&gt;
    &lt;Router exterAddr="10.10.20.1" &gt; &lt;/Router&gt; &lt;!--Router A2--&gt;
    &lt;Router exterAddr="10.10.20.2" &gt; &lt;/Router&gt; &lt;!--Router B--&gt;
  &lt;/Session&gt;

  &lt;Session id="3"&gt;
    &lt;Router exterAddr="10.10.30.1" &gt; &lt;/Router&gt; &lt;!--Router B--&gt;
    &lt;Router exterAddr="10.10.30.2" &gt; &lt;/Router&gt; &lt;!--Router C2--&gt;
  &lt;/Session&gt;
&lt;/BGPConfig&gt;</code></pre>
<p>Inside <tt>&lt;AS&gt;</tt> elements various rules can be sepecified:

<p><ul>
  <li> DenyRoute: deny route in IN and OUT traffic (<tt>Address</tt> and
        <tt>Netmask</tt> attributes must be specified.)</li>
  <li> DenyRouteIN : deny route in IN traffic (<tt>Address</tt> and
        <tt>Netmask</tt> attributes must be specified.)</li>
  <li> DenyRouteOUT: deny route in OUT traffic (<tt>Address</tt> and
        <tt>Netmask</tt> attributes must be specified.)</li>
  <li> DenyAS: deny routes learned by AS in IN  and OUT traffic (AS id must be
        specified as the body of the element.)</li>
  <li> DenyASIN : deny routes learned by AS in IN traffic (AS id must be
        specified as the body of the element.)</li>
  <li> DenyASOUT: deny routes learned by AS in OUT traffic (AS id must be
        specified as the body of the element.)</li>
</ul>


<hr class='pgbr'><div class='oppnavbar'><a href="chap9.html">Prev</a> &#8226; <a href="chap11.html">Next</a> &#8226; <a href="toc.html#toc_10">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
