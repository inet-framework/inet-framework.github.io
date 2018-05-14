---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap4.html">Prev</a> &#8226; <a href="chap6.html">Next</a> &#8226; <a href="toc.html#toc_5">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:network-interfaces"></a>5 Network Interfaces<a class="headerlink" href="#cha:network-interfaces" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:interfaces:overview"></a>5.1 Overview<a class="headerlink" href="#sec:interfaces:overview" title="Permalink to this headline">&para;</a></h2>

<p>
In INET simulations, network interface modules are the primary means of
communication between network nodes. They represent the required
combination of software and hardware elements from an operating system
point-of-view.

<p>Network interfaces are implemented with OMNeT++ compound modules that
conform to the <tt>INetworkInterface</tt> module interface.
Network interfaces can be further categorized as wired and wireless;
they conform to the <tt>IWiredInterface</tt> and <tt>IWirelessInterface</tt>
NED types, respectively, which are subtypes of <tt>INetworkInterface</tt>.

<p><h2><a name="sec:interfaces:built-in-network-interfaces"></a>5.2 Built-in Network Interfaces<a class="headerlink" href="#sec:interfaces:built-in-network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>INET provides pre-assembled network interfaces for several standard
protocols, protocol tunneling, hardware emulation, etc. The following list
gives the most commonly used network interfaces.

<p><ul>
    <li> <tt>EthernetInterface</tt> represents an Ethernet interface</li>
    <li> <tt>PppInterface</tt> is for wired links using PPP</li>
    <li> <tt>Ieee80211Interface</tt> represents a Wifi (IEEE 802.11) interface</li>
    <li> <tt>Ieee802154Interface</tt> represents a IEEE 802.15.4 interface</li>
    <li> <tt>BMacInterface</tt>, <tt>LMacInterface</tt>, <tt>XMacInterface</tt> provide
      low-power wireless sensor MAC protocols along with a simple hypothetical PHY protocol</li>
    <li> <tt>TunInterface</tt> is a tunneling interface that can be directly used by applications</li>
    <li> <tt>LoopbackInterface</tt> provides local loopback within the network node</li>
    <li> <tt>ExtInterface</tt> represents a real-world interface, suitable for hardware-in-the-loop simulations</li>
</ul>

<p><h2><a name="sec:interfaces:anatomy-of-network-interfaces"></a>5.3 Anatomy of Network Interfaces<a class="headerlink" href="#sec:interfaces:anatomy-of-network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>Network interfaces in the INET Framework are OMNeT++ compound modules that
contain many more components than just the corresponding layer 2 protocol
implementation. Most of these components are optional, i.e. absent by default,
and can be added via configuration.

<p>Typical ingredients are:

<p><ul>
    <li> <i>Layer 2 protocol implementation</i>. For some interfaces such as
      <tt>PppInterface</tt> this is a single module; for others like Ethernet
      and Wifi it consists of separate modules for MAC, LLC, and possibly
      other subcomponents.</li>
    <li> <i>PHY model</i>. Some interfaces also contain separate
      module(s) that implement the physical layer. For example,
      <tt>Ieee80211Interface</tt> contains a radio module.</li>
    <li> <i>Output queue</i>. This module is optional and absent by default,
      because most MAC protocol implementations already contain an internal queue
      which is more efficient to work with. The possibility to plug in an
      external queue module allows one to experiment with different queueing policies
      and implement QoS, RED, etc.</li>
    <li> <i>Traffic conditioners</i> allow traffic shaping and policing elements
      to be added to the interface, for example to implement a Diffserv router.</li>
    <li> <i>Hooks</i> allow extra modules to be inserted in the incoming
      and outgoing paths of packets.</li>
</ul>

<p>
<h3><a name="sec:interfaces:internal-vs-external-output-queue"></a>5.3.1 Internal vs External Output Queue<a class="headerlink" href="#sec:interfaces:internal-vs-external-output-queue" title="Permalink to this headline">&para;</a></h3>

<p>Network interfaces usually have the external queue module defined with a
parametric type like this:

<pre><code data-language="ned">queue: &lt;queueType&gt; like IOutputQueue if queueType != "";</code></pre><p>
When <tt>queueType</tt> is empty (this is the default), the external queue
module is absent, and the MAC (or equivalent L2) protocol will use its
internal queue object. Conceptually, the internal queue is of inifinite size,
but for better diagnostics one can often specify a hard limit for the queue
length in a module parameter -- if this is exceeded, the simulation
stops with an error.

<p>When <tt>queueType</tt> is not empty, it must name a NED type that
implements the <tt>IOutputQueue</tt> interface. The external
queue module model allows modeling a finite buffer, or implement
various queueing policies for QoS and/or RED.

<p>The most frequently used module type for external queue is
<tt>DropTailQueue</tt>, a finite-size FIFO that drops overflowing
packets). Other queue types that implement queueing policies can be
created by assembling compound modules from DiffServ components
(see chapter <a href="chap12.html#cha:diffserv">[12]</a>). An example of such compound
modules is <tt>DiffservQueue</tt>.

<p>An example ini file fragment that installs drop-tail queues of size 10
on PPP interfaces:

<pre><code data-language="ini">**.ppp[*].queueType = "DropTailQueue"
**.ppp[*].queue.frameCapacity = 10</code></pre><p>
<h3><a name="sec:interfaces:traffic-conditioners"></a>5.3.2 Traffic Conditioners<a class="headerlink" href="#sec:interfaces:traffic-conditioners" title="Permalink to this headline">&para;</a></h3>

<p>Many network interfaces contain optional traffic conditioner submodules
defined with parametric types, like this:

<pre><code data-language="ned">ingressTC: &lt;ingressTCType&gt; like ITrafficConditioner if ingressTCType != "";
egressTC: &lt;egressTCType&gt; like ITrafficConditioner if egressTCType != "";</code></pre><p>
Traffic conditioners allow one to implement the policing and shaping actions
of a Diffserv router. They are added to the input or output packets paths
in the network interface. (On the output path they are added before the queue
module.)

<p>Traffic conditioners must implement the <tt>ITrafficConditioner</tt> module
interface. Traffic conditioners can be assembled from DiffServ components
(see chapter <a href="chap12.html#cha:diffserv">[12]</a>). There is no preassembled traffic conditioner
in INET, but you can find some in the example simulations.

<p>An example configuration with fictituous types:

<pre><code data-language="ini">**.ppp[*].ingressTCType = "CustomIngressTC"
**.ppp[*].egressTCType = "CustomEgressTC"</code></pre><p>

<p><h3><a name="sec:interfaces:hooks"></a>5.3.3 Hooks<a class="headerlink" href="#sec:interfaces:hooks" title="Permalink to this headline">&para;</a></h3>

<p>Several network interfaces allow extra modules to be inserted in the incoming
and outgoing paths of packets at the top of the netwok interface.
Hooks are added as a submodule vector with parametric type, like this:

<pre><code data-language="ned">outputHook[numOutputHooks]: &lt;default("Nop")&gt; like IHook if numOutputHooks&gt;0;
inputHook[numInputHooks]: &lt;default("Nop")&gt; like IHook if numInputHooks&gt;0;</code></pre><p>
This allows any number of hook modules to be added. The hook modules
are chained in their numeric order.

<p>Modules inserted as hooks may act as probes (for measuring or recording
traffic) or as means of modifying or perturbing the packet flow for
experimentation. Module types implementing the <tt>IHook</tt> NED interface
include <tt>ThruputMeter</tt>, <tt>Delayer</tt>, <tt>OrdinalBasedDropper</tt>,
and <tt>OrdinalBasedDuplicator</tt>.

<p>The following ini file fragment inserts two hook modules into the output
paths of PPP interfaces, a delayer and a throughput meter:

<pre><code data-language="ini">**.ppp[*].numOutputHooks = 2
**.ppp[*].outputHook[0].typename = "Delayer"
**.ppp[*].outputHook[1].typename = "ThruputMeter"
**.ppp[*].outputHook[0].delay = 3ms</code></pre><p>

<p>
<h2><a name="sec:interfaces:the-interface-table"></a>5.4 The Interface Table<a class="headerlink" href="#sec:interfaces:the-interface-table" title="Permalink to this headline">&para;</a></h2>

<p>Network nodes normally contain an <tt>InterfaceTable</tt> module.
The interface table is a sort of registry of all the network interfaces
in the host. It does not send or receive messages, other modules access it
via C++ function calls. Contents of the interface table can also
be inspected e.g. in Qtenv.

<p>Network interfaces register themselves in the interface table at the
beginning of the simulation. Registration is usually the task of the
MAC (or equivalent) module.

<p>
<h2><a name="sec:interfaces:wired-network-interfaces"></a>5.5 Wired Network Interfaces<a class="headerlink" href="#sec:interfaces:wired-network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>Wired interfaces have a pair of special purpose OMNeT++ gates which represent
the capability of having an external physical connection to another network
node (e.g. Ethernet port). In order to make wired communication work,
these gates must be connected with special connections which represent the
physical cable between the physical ports. The connections must use special
OMNeT++ channels (e.g. <tt>DatarateChannel</tt>) which determine datarate
and delay parameters.

<p>Wired network interfaces are compound modules that implement the
<tt>IWiredInterface</tt> interface. INET has the following
wired network interfaces.

<p><h3><a name="sec:interfaces:ppp"></a>5.5.1 PPP<a class="headerlink" href="#sec:interfaces:ppp" title="Permalink to this headline">&para;</a></h3>

<p>Network interfaces for point-to-point links (<tt>PppInterface</tt>) are
described in chapter <a href="chap14.html#cha:ppp">[14]</a>. They are typically used in routers.

<p><h3><a name="sec:interfaces:ethernet"></a>5.5.2 Ethernet<a class="headerlink" href="#sec:interfaces:ethernet" title="Permalink to this headline">&para;</a></h3>

<p>Ethernet interfaces (<tt>EthernetInterface</tt>), alongside with models
of Ethernet devices such as switches and hubs, are described in chapter
<a href="chap15.html#cha:ethernet">[15]</a>.

<p><h2><a name="sec:interfaces:wireless-network-interfaces"></a>5.6 Wireless Network Interfaces<a class="headerlink" href="#sec:interfaces:wireless-network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>Wireless interfaces use direct sending<br><ul><font size='-1'>[OMNeT++ <tt>sendDirect()</tt> calls]</font></li></ul>
for communication instead of links, so their compound modules do not have
output gates at the physical layer, only an input gate dedicated to receiving.
Another difference from the wired case is that wireless interfaces
require (and collaborate with) a <i>transmission medium</i> module
at the network level. The medium module represents the shared transmission
medium (electromagnetic field or acoustic medium), is responsible for
modeling physical effects like signal attenuation, and maintains
connectivity information. Also, while wired interfaces can do without
explicit modeling of the physical layer, a PHY module is an indispensable
part of a wireless interface.

<p>Wireless network interfaces are compound modules that implement the
<tt>IWirelessInterface</tt> interface. In the following sections we
give an overview of the wireless interfaces available in INET.

<p><h3><a name="sec:interfaces:generic-wireless-interface"></a>5.6.1 Generic Wireless Interface<a class="headerlink" href="#sec:interfaces:generic-wireless-interface" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>WirelessInterface</tt> compound module is a generic implementation
of <tt>IWirelessInterface</tt>. In this network interface, the types of the
MAC protocol and the PHY layer (the radio) are parameters:

<pre><code data-language="ned">mac: &lt;macType&gt; like IMacProtocol;
radio: &lt;radioType&gt; like IRadio if radioType != "";</code></pre><p>
There are specialized versions of <tt>WirelessInterface</tt> where
the MAC and the radio modules are fixed to a particular value.
One example is <tt>BMacInterface</tt>, which contains a <tt>BMac</tt>
and an <tt>ApskRadio</tt>.

<p><h3><a name="sec:interfaces:ieee-80211"></a>5.6.2 IEEE 802.11<a class="headerlink" href="#sec:interfaces:ieee-80211" title="Permalink to this headline">&para;</a></h3>

<p>IEEE 802.11 or Wifi network interfaces (<tt>Ieee80211Interface</tt>),
alongside with models of devices acting as access points (AP),
are covered in chapter <a href="chap16.html#cha:80211">[16]</a>.

<p><h3><a name="sec:interfaces:ieee-802154"></a>5.6.3 IEEE 802.15.4<a class="headerlink" href="#sec:interfaces:ieee-802154" title="Permalink to this headline">&para;</a></h3>

<p><tt>Ieee802154Interface</tt> is covered in a separate chapter, see <a href="chap17.html#cha:802154">[17]</a>.

<p><h3><a name="sec:interfaces:wireless-sensor-networks"></a>5.6.4 Wireless Sensor Networks<a class="headerlink" href="#sec:interfaces:wireless-sensor-networks" title="Permalink to this headline">&para;</a></h3>

<p>MAC protocols for wireless sensor networks (WSNs) and the corresponding
network interfaces are covered in chapter <a href="chap18.html#cha:sensor-macs">[18]</a>.

<p><h3><a name="sec:interfaces:csma/ca"></a>5.6.5 CSMA/CA<a class="headerlink" href="#sec:interfaces:csma/ca" title="Permalink to this headline">&para;</a></h3>

<p><tt>CsmaCaMac</tt> implements an imaginary CSMA/CA-based MAC protocol with
optional acknowledgements and a retry mechanism. With the appropriate settings,
it can approximate basic 802.11b ad-hoc mode operation.

<p><tt>CsmaCaMac</tt> provides a lot of room for experimentation:
acknowledgements can be turned on/off, and operation parameters like
inter-frame gap sizes, backoff behaviour (slot time, minimum and maximum
number of slots), maximum retry count, header and ACK frame sizes, bit rate,
etc. can be configured via NED parameters.

<p><tt>CsmaCaInterface</tt> interface is a <tt>WirelessInterface</tt> with
the MAC type set to <tt>CsmaCaMac</tt>.

<p><h3><a name="sec:interfaces:acking-mac"></a>5.6.6 Acking MAC<a class="headerlink" href="#sec:interfaces:acking-mac" title="Permalink to this headline">&para;</a></h3>

<p>Not every simulation requires a detailed simulation of the lower layers.
<tt>AckingWirelessInterface</tt> is a highly abstracted wireless interface
that offers simplicity for scenarios where Layer 1 and 2 effects can be
completely ignored, for example testing the basic functionality of a
wireless ad-hoc routing protocol.

<p><tt>AckingWirelessInterface</tt> is a <tt>WirelessInterface</tt>
parameterized to contain a unit disk radio (<tt>UnitDiskRadio</tt>)
and a trivial MAC protocol (<tt>AckingMac</tt>).

<p>The most important parameter <tt>UnitDiskRadio</tt> accepts is the
transmission range. When a radio transmits a frame, all other radios
within transmission range are able to receive the frame correctly,
and radios that are out of range will not be affected at all.
Interference modeling (collisions) is optional, and it is recommended
to turn it off with <tt>AckingMac</tt>.

<p><tt>AckingMac</tt> implements a trivial MAC protocol that has packet
encapsulation and decapsulation, but no real medium access procedure.
Frames are simply transmitted on the wireless channel as soon as the
transmitter becomes idle. There is no carrier sense, collision avoidance,
or collison detection. <tt>AckingMac</tt> also provides an optional
out-of-band acknowledgement mechanism (using C++ function calls,
not actual wirelessly sent frames), which is turned on by default.
There is no retransmission: if the acknowledgement does not arrive
after the first transmission, the MAC gives up and counts the packet
as failed transmission.

<p><h3><a name="sec:interfaces:shortcut"></a>5.6.7 Shortcut<a class="headerlink" href="#sec:interfaces:shortcut" title="Permalink to this headline">&para;</a></h3>

<p><tt>ShortcutMac</tt> implements error-free &#8220;teleportation&#8221; of packets
to the peer MAC entity, with some delay computed from a transmission
duration and a propagation delay. The physical layer is completely bypassed.
The corresponding network interface type, <tt>ShortcutInterface</tt>,
does not even have a radio model.

<p><tt>ShortcutInterface</tt> is useful for modeling wireless networks
where full connectivity is assumed, and Layer 1 and Layer 2 effects
can be completely ignored.

<p><h2><a name="sec:interfaces:special-purpose-network-interfaces"></a>5.7 Special-Purpose Network Interfaces<a class="headerlink" href="#sec:interfaces:special-purpose-network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>
<h3><a name="sec:interfaces:tunnelling"></a>5.7.1 Tunnelling<a class="headerlink" href="#sec:interfaces:tunnelling" title="Permalink to this headline">&para;</a></h3>

<p><tt>TunInterface</tt> is a virtual network interface that can be used
for creating tunnels, but it is more powerful than that.
It lets an application-layer module capture packets sent to
the TUN interface and do whatever it pleases with it (including
sending it to a peer entity in an UDP or plain IPv4 packet.)

<p>To set up a tunnel, add an instance of <tt>TunnelApp</tt> to
the node, and specify the protocol (IPv4 or UDP) and the remote
endpoint of the tunnel (address and port) in parameters.

<p><h3><a name="sec:interfaces:local-loopback"></a>5.7.2 Local Loopback<a class="headerlink" href="#sec:interfaces:local-loopback" title="Permalink to this headline">&para;</a></h3>

<p><tt>LoopbackInterface</tt> provides local loopback within the network node.

<p><h3><a name="sec:interfaces:external-interface"></a>5.7.3 External Interface<a class="headerlink" href="#sec:interfaces:external-interface" title="Permalink to this headline">&para;</a></h3>

<p><tt>ExtInterface</tt> represents a real-world interface, suitable for
hardware-in-the-loop simulations. External interfaces are explained in
chapter <a href="chap24.html#cha:emulation">[24]</a>.

<p><h2><a name="sec:interfaces:custom-network-interfaces"></a>5.8 Custom Network Interfaces<a class="headerlink" href="#sec:interfaces:custom-network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>It's also possible to build custom network interfaces, the following
example shows how to build a custom wireless interface.

<p><pre class="snippet" src="Snippets.ned" after="//!WirelessInterfaceExample" until="//!End"></pre>
<p>The above network interface contains very simple hypothetical MAC and PHY
protocols. The MAC protocol only provides acknowledgment without other
services (e.g., carrier sense, collision avoidance, collision detection),
the PHY protocol uses one of the predefined APSK modulations for the whole
signal (preamble, header, and data) without other services (e.g.,
scrambling, interleaving, forward error correction).

<p>


<p><hr class='pgbr'><div class='oppnavbar'><a href="chap4.html">Prev</a> &#8226; <a href="chap6.html">Next</a> &#8226; <a href="toc.html#toc_5">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
