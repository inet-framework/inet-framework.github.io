---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap14.html">Prev</a> &#8226; <a href="chap16.html">Next</a> &#8226; <a href="toc.html#toc_15">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:ethernet"></a>15 The Ethernet Model<a class="headerlink" href="#cha:ethernet" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:ethernet:overview"></a>15.1 Overview<a class="headerlink" href="#sec:ethernet:overview" title="Permalink to this headline">&para;</a></h2>

<p>Ethernet is the most popular wired LAN technology nowadays, and its use is also
growing in metropolitan area and wide area networks. Since its introduction in
1980, Ethernet data transfer rates have increased from the original 10Mb/s to
the latest 400Gb/s. Originally, The technology has changed from using coaxial
cables and repeaters to using unshielded twisted-pair cables with hubs and
switches. Today, switched Ethernet is prevalent, and most links operate in full
duplex mode. The INET Framework contains support for all major Ethernet
technologies and device types.

<p>In Ethernet networks containing multiple switches, broadcast storms are
prevented by use of a spanning tree protocol (STP, RSTP) that disables selected
links to eliminate cycles from the topology. Ethernet switch models in INET
contain support for STP and RSTP.

<p><h2><a name="sec:ethernet:nodes"></a>15.2 Nodes<a class="headerlink" href="#sec:ethernet:nodes" title="Permalink to this headline">&para;</a></h2>

<p>There are several node models that can be used in an Ethernet network:

<p><ul>
  <li> Node models such as <tt>StandardHost</tt> and <tt>Router</tt> are Ethernet-capable</li>
  <li> <tt>EtherSwitch</tt> models an Ethernet switch, i.e. a multiport bridging device</li>
  <li> <tt>EtherHub</tt> models an Ethernet hub or multiport repeater</li>
  <li> <tt>EtherBus</tt> models the coaxial cable (10BASE2 or 10BASE5 network segments) on legacy Ethernet networks</li>
  <li> <tt>EtherHost</tt> is a sample node which can be used to generate &#8220;raw&#8221; Ethernet traffic</li>
</ul>

<p>
<h3><a name="sec:ethernet:etherswitch"></a>15.2.1 EtherSwitch<a class="headerlink" href="#sec:ethernet:etherswitch" title="Permalink to this headline">&para;</a></h3>

<p><tt>EtherSwitch</tt> models an Ethernet switch. Ethernet switches play an
important role in modern Ethernet LANs. Unlike passive hubs and repeaters that
work in the physical layer, the switches operate in the data link layer and
route data frames between the connected subnets.

<p>In modern Ethernet LANs, each node is connected to the switch directly by full
duplex lines, so no collisions are possible. In this case, the CSMA/CD is not
needed and the channel utilization can be high.

<p>The <tt>duplexMode</tt> parameters of the MACs must be set according to the
medium connected to the port; if collisions are possible (it's a bus or hub)
it must be set to false, otherwise it can be set to true.
By default it uses half-duplex MAC with CSMA/CD.

<p><h3><a name="sec:ethernet:etherhub"></a>15.2.2 EtherHub<a class="headerlink" href="#sec:ethernet:etherhub" title="Permalink to this headline">&para;</a></h3>

<p><tt>EtherHub</tt> models an Ethernet hub. Ethernet hubs are a simple broadcast
devices. Messages arriving on a port are regenerated and broadcast to every
other port.

<p>The connections connected to the hub must have the same data rate.
Cable lengths should be reflected in the delays of the connections.

<p>
<h3><a name="sec:ethernet:etherbus"></a>15.2.3 EtherBus<a class="headerlink" href="#sec:ethernet:etherbus" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>EtherBus</tt> component can model a common coaxial cable
found in early Ethernet LANs. The nodes are attached via taps at specific
positions on the cable. When a node sends a signal, it will propagate
along the cable in both directions at the given propagation speed.

<p>The gates of the <tt>EtherBus</tt> represent taps. The positions
of the taps are given by the <tt>positions</tt> parameter as a
space separated list of distances in metres. If there are more
gates then positions given, the last distance is repeated.
The bus component send the incoming message in one direction and
a copy of the message to the other direction (except at the ends).
The propagation delays are computed from the distances of the taps
and the <tt>propagationSpeed</tt> parameter.

<p>
<h2><a name="sec:ethernet:the-physical-layer"></a>15.3 The Physical Layer<a class="headerlink" href="#sec:ethernet:the-physical-layer" title="Permalink to this headline">&para;</a></h2>

<p>Stations on an Ethernet networks are connected by coaxial,
twisted pair or fibre cables. (Coaxial only has historical importance,
but is supported by INET anyway.) There are several cable types specified
in the standard.

<p>In the INET framework, the cables are represented by connections.
The connections used in Ethernet LANs must be derived from
<tt>DatarateConnection</tt> and should have their <tt>delay</tt> and
<tt>datarate</tt> parameters set.
The delay parameter can be used to model the distance between the
nodes. The datarate parameter can have four values:

<p><ul>
  <li> 10Mbps (classic Ethernet)</li>
  <li> 100Mbps (Fast Ethernet)</li>
  <li> 1Gbps (Gigabit Ethernet, GbE)</li>
  <li> 10Gbps (10 Gigabit Ethernet, 10GbE)</li>
  <li> 40Gbps (40 Gigabit Ethernet, 40GbE)</li>
  <li> 100Gbps (100 Gigabit Ethernet, 100GbE)</li>
</ul>

<p>There is currently no support for 200Gbps and 400Gbps Ethernet.

<p><tt>Ether10M</tt>, <tt>Ether100M</tt>, <tt>Ether1G</tt>, <tt>Eth10G</tt>,
<tt>Eth40G</tt>, <tt>Eth100G</tt>

<p><h2><a name="sec:ethernet:ethernet-interface"></a>15.4 Ethernet Interface<a class="headerlink" href="#sec:ethernet:ethernet-interface" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>EthernetInterface</tt> compound module implements the <tt>IWiredInterface</tt>
interface. Complements <tt>EtherMac</tt> and <tt>EtherEncap</tt> with an output queue
for QoS and RED support. It also has configurable input/output filters as <tt>IHook</tt>
components similarly to the <tt>PppInterface</tt> module.

<p>The Ethernet MAC (Media Access Control) layer transmits the Ethernet frames on
the physical media. This is a sublayer within the data link layer. Because
encapsulation/decapsulation is not always needed (e.g. switches does not do
encapsulation/decapsulation), it is implemented in a separate modules
(<tt>EtherEncap</tt> and <tt>EtherLlc</tt>) that are part of the LLC layer.

<p>
Nowadays almost all Ethernet networks operate using full-duplex
point-to-point connections between hosts and switches. This means
that there are no collisions, and the behaviour of the MAC component
is much simpler than in classic Ethernet that used coaxial cables and
hubs. The INET framework contains two MAC modules for Ethernet:
the <tt>EtherMacFullDuplex</tt> is simpler to understand and easier to extend,
because it supports only full-duplex connections. The <tt>EtherMac</tt>
module implements the full MAC functionality including CSMA/CD, it
can operate both half-duplex and full-duplex mode.

<p><h2><a name="sec:ethernet:components"></a>15.5 Components<a class="headerlink" href="#sec:ethernet:components" title="Permalink to this headline">&para;</a></h2>

<p>Thw following components:

<p><ul>
  <li> <tt>EtherMacFullDuplex</tt></li>
  <li> <tt>EtherMac</tt></li>
  <li> <tt>EtherLlc</tt></li>
  <li> <tt>EtherEncap</tt></li>
  <li> <tt>MacRelayUnit</tt></li>
  <li> <tt>MacAddressTable</tt></li>
  <li> <tt>Ieee802dRelay</tt></li>
</ul>

<p>
<h3><a name="sec:ethernet:ethermacfullduplex"></a>15.5.1 EtherMacFullDuplex<a class="headerlink" href="#sec:ethernet:ethermacfullduplex" title="Permalink to this headline">&para;</a></h3>

<p>From the two MAC implementation <tt>EtherMacFullDuplex</tt> is the simpler one,
it operates only in full-duplex mode (its <tt>duplexEnabled</tt> parameter fixed to
<tt>true</tt> in its NED definition). This module does not need to implement
CSMA/CD, so there is no collision detection, retransmission with exponential backoff,
carrier extension and frame bursting.

<p><h3><a name="sec:ethernet:ethermac"></a>15.5.2 EtherMac<a class="headerlink" href="#sec:ethernet:ethermac" title="Permalink to this headline">&para;</a></h3>

<p>Ethernet MAC layer implementing CSMA/CD. It supports both half-duplex and full-duplex operations;
in full-duplex mode it behaves as <tt>EtherMacFullDuplex</tt>. In half-duplex mode
it detects collisions, sends jam messages and retransmit frames upon collisions using
the exponential backoff algorithm. In Gigabit Ethernet networks it supports carrier
extension and frame bursting. Carrier extension can be turned off by setting the
<tt>carrierExtension</tt> parameter to <tt>false</tt>.

<p><h3><a name="sec:ethernet:etherencap"></a>15.5.3 EtherEncap<a class="headerlink" href="#sec:ethernet:etherencap" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>EtherEncap</tt> module performs Ethernet II or Ethernet with SNAP
encapsulation/decapsulation.

<p><h3><a name="sec:ethernet:etherllc"></a>15.5.4 EtherLlc<a class="headerlink" href="#sec:ethernet:etherllc" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>EtherLlc</tt> module provides Ethernet 802.3
encapsulation/decapsulation.

<p><h3><a name="sec:ethernet:macrelayunit"></a>15.5.5 MacRelayUnit<a class="headerlink" href="#sec:ethernet:macrelayunit" title="Permalink to this headline">&para;</a></h3>

<p>INET framework ethernet switches are built from <tt>IMacRelayUnit</tt>
components. Each relay unit has N input and output gates for sending/receiving
Ethernet frames. They should be connected to <tt>IEtherMac</tt> modules.

<p>The relay unit holds a table for the destination address -&gt; output port mapping
in a <tt>MacAddressTable</tt> module.  When the relay unit receives a data frame, it
updates the table with the source address-&gt;input port. The table can also be
pre-loaded from a text file while initializing the relay unit.

<p>If the destination address is not found in the table, the frame is broadcast.
The frame is not sent to the same subnet it was received from, because the
target already received the original frame. The only exception if the frame
arrived through a radio channel, in this case the target can be out of range.
The port range 0..<tt>numWirelessPorts</tt>-1 are reserved for wireless connections.

<p>A simple scheme for sending PAUSE frames is built in (although
users will probably change it). When the buffer level goes
above a high watermark, PAUSE frames are sent on all ports.
The watermark and the pause time is configurable; use zero
values to disable the PAUSE feature.

<p><h3><a name="sec:ethernet:macaddresstable"></a>15.5.6 MacAddressTable<a class="headerlink" href="#sec:ethernet:macaddresstable" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>MacAddressTable</tt> module stores the mapping between ports and MAC addresses.
Entries are deleted if their age exceeds a certain limit.

<p>If needed, address tables can be pre-loaded from text files at the beginning of
the simulation; this controlled by the <tt>addressTableFile</tt> module parameter.
In the file, each line contains a literal 0 (reserved for VLAN id), a hexadecimal
MAC address and a decimal port number, separated by tabs. Comment lines
beginning with '#' are also allowed:


0    01 ff ff ff ff    0
0    00-ff-ff-ee-d1    1
0    0A:AA:BC:DE:FF    2

<p>
Entries are deleted if their age exceeds the duration given as the <tt>agingTime</tt> parameter.

<p>
<h3><a name="sec:ethernet:ieee8021drelay"></a>15.5.7 Ieee8021dRelay<a class="headerlink" href="#sec:ethernet:ieee8021drelay" title="Permalink to this headline">&para;</a></h3>

<p><tt>Ieee8021dRelay</tt> is a MAC relay unit that should be used instead
of <tt>MacRelayUnit</tt> that when STP or RSTP is needed.

<p><h3><a name="sec:ethernet:stp"></a>15.5.8 Stp<a class="headerlink" href="#sec:ethernet:stp" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Stp</tt> module type implements Spanning Tree Protocol (STP). STP
is a network protocol that builds a loop-free logical topology for Ethernet
networks. The basic function of STP is to prevent bridge loops and the broadcast
radiation that results from them.

<p>STP creates a spanning tree within a network of connected layer-2 bridges, and
disables those links that are not part of the spanning tree, leaving a single
active path between any two network nodes.

<p>
<h3><a name="sec:ethernet:rstp"></a>15.5.9 Rstp<a class="headerlink" href="#sec:ethernet:rstp" title="Permalink to this headline">&para;</a></h3>

<p><tt>Rstp</tt> implements Rapid Spanning Tree Protocol (RSTP), an improved
version of STP. RSTP provides significantly faster recovery in response to
network changes or failures.

<p>
<h2><a name="sec:ethernet:implemented-standards"></a>15.6 Implemented Standards<a class="headerlink" href="#sec:ethernet:implemented-standards" title="Permalink to this headline">&para;</a></h2>

<p>The Ethernet model operates according to the following standards:

<p><ul>
  <li> Ethernet: IEEE 802.3-1998</li>
  <li> Fast Ethernet: IEEE 802.3u-1995</li>
  <li> Full-Duplex Ethernet with Flow Control: IEEE 802.3x-1997</li>
  <li> Gigabit Ethernet: IEEE 802.3z-1998</li>
</ul>

<p>
<hr class='pgbr'><div class='oppnavbar'><a href="chap14.html">Prev</a> &#8226; <a href="chap16.html">Next</a> &#8226; <a href="toc.html#toc_15">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
