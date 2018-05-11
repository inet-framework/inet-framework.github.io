---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap15.html">Prev</a> &#8226; <a href="chap17.html">Next</a> &#8226; <a href="toc.html#toc_16">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:80211"></a>16 The 802.11 Model<a class="headerlink" href="#cha:80211" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:80211:overview"></a>16.1 Overview<a class="headerlink" href="#sec:80211:overview" title="Permalink to this headline">&para;</a></h2>

<p>This chapter provides an overview of the IEEE 802.11 model for the INET Framework.

<p>An IEEE 802.11 interface (NIC) comes in several flavours, differring
in their role (ad-hoc station, infrastructure mode station, or
access point) and their level of detail:

<p><ol>
 <li> <tt>Ieee80211Interface</tt>: a generic (configurable) NIC</li>
 <li> <tt>Ieee80211NicAdhoc</tt>: for ad-hoc mode</li>
 <li> <tt>Ieee80211NicAP</tt>, <tt>Ieee80211NicAPSimplified</tt>: for use in an access point</li>
 <li> <tt>Ieee80211NicSTA</tt>, <tt>Ieee80211NicSTASimplified</tt>: for use in an
   infrastructure-mode station</li>
</ol>

<p>NICs consist of four layers, which are the following (in top-down order):

<p><ol>
  <li> agent</li>
  <li> management</li>
  <li> MAC</li>
  <li> physical layer (radio)</li>
</ol>

<p>The following sections examine the above components.

<p><h2><a name="sec:80211:mac"></a>16.2 MAC<a class="headerlink" href="#sec:80211:mac" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Ieee80211Mac</tt> module type represents the IEEE 802.11 MAC.
The implementation is entirely based on the standard IEEE 802.11™-2012 Part 11:
Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY)
Specifications.

<p><tt>Ieee80211Mac</tt> performs transmission of frames according
to the CSMA/CA protocol. It receives data and management frames from
the upper layers, and transmits them.

<p>The <tt>Ieee80211Mac</tt> was designed to be modular to facilitate experimenting
with new policies, features and algorithms within the MAC layer. Users can
easily replace individual components with their own implementations. Policies,
which most likely to be experimented with, are extracted into their own modules.

<p>The model has the following replaceable built-in policies:

<p><ul>
  <li> ACK policy</li>
  <li> RTS/CTS policy</li>
  <li> Originator and recipient block ACK agreement policies</li>
  <li> MSDU aggregation policy</li>
  <li> Fragmentation policy</li>
</ul>

<p>The new model also separates the following components:

<p><ul>
  <li> Coordination functions</li>
  <li> Channel access methods</li>
  <li> MAC data services</li>
  <li> Aggregation and deaggregation</li>
  <li> Fragmentation and defragmentation</li>
  <li> Block ACK agreements and reordering</li>
  <li> Frame exchange sequences</li>
  <li> Duplicate removal</li>
  <li> Rate selection</li>
  <li> Rate control</li>
  <li> Protection mechanisms</li>
  <li> Recovery procedure</li>
  <li> Contention</li>
  <li> Frame queues</li>
  <li> TX/RX</li>
</ul>

<p><h2><a name="sec:80211:physical-layer"></a>16.3 Physical Layer<a class="headerlink" href="#sec:80211:physical-layer" title="Permalink to this headline">&para;</a></h2>

<p><i>The physical layer</i> modules (<tt>Ieee80211Radio</tt>) deal with modelling
transmission and reception of frames. They model the characteristics of
the radio channel, and determine if a frame was received correctly
(that is, it did not suffer bit errors due to low signal power or
interference in the radio channel). Frames received correctly are passed
up to the MAC. The implementation of these modules is based on the
Mobility Framework.

<p><h2><a name="sec:80211:management"></a>16.4 Management<a class="headerlink" href="#sec:80211:management" title="Permalink to this headline">&para;</a></h2>

<p><i>The management layer</i> performs encapsulation and decapsulation of data packets
for the MAC, and exchanges management frames via the MAC with its peer
management entities in other STAs and APs. Beacon, Probe Request/Response,
Authentication, Association Request/Response etc frames are generated
and interpreted by management entities, and transmitted/received via
the MAC layer. During scanning, it is the management entity that periodically
switches channels, and collects information from received beacons and
probe responses.

<p>The management layer has several implementations which differ in their role
(STA/AP/ad-hoc) and level of detail: <tt>Ieee80211MgmtAdhoc</tt>,
<tt>Ieee80211MgmtAp</tt>, <tt>Ieee80211MgmtApSimplified</tt>, <tt>Ieee80211MgmtSta</tt>,
<tt>Ieee80211MgmtStaSimplified</tt>. The ..Simplified ones differ from the others
in that they do not model the scan-authenticate-associate process,
so they cannot be used in experiments involving handover.

<p><h2><a name="sec:80211:agent"></a>16.5 Agent<a class="headerlink" href="#sec:80211:agent" title="Permalink to this headline">&para;</a></h2>

<p>The agent is what instructs the management layer to perform
scanning, authentication and association. The management layer itself
just carries out these commands by performing the scanning, authentication
and association procedures, and reports back the results to the agent.

<p>The agent layer is currenly only present in the <tt>Ieee80211NicSTA</tt> NIC module,
as an <tt>Ieee80211AgentSta</tt> module. The managament entities in other NIC
variants do not have as much freedom as to need an agent to control them.

<p>By modifying or replacing the agent, one can alter the dynamic behaviour
of STAs in the network, for example implement different handover strategies.

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap15.html">Prev</a> &#8226; <a href="chap17.html">Next</a> &#8226; <a href="toc.html#toc_16">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
