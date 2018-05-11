---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap16.html">Prev</a> &#8226; <a href="chap18.html">Next</a> &#8226; <a href="toc.html#toc_17">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:802154"></a>17 The 802.15.4 Model<a class="headerlink" href="#cha:802154" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:802154:overview"></a>17.1 Overview<a class="headerlink" href="#sec:802154:overview" title="Permalink to this headline">&para;</a></h2>

<p>IEEE 802.15.4 is a technical standard which defines the operation of low-rate
wireless personal area networks (LR-WPANs). IEEE 802.15.4 was designed for data
rates of 250 kbit/s or lower, in order to achieve long battery life (months or
even years) and very low complexity. The standard specifies the physical layer
and media access control.

<p>IEEE 802.15.4 is the basis for the ZigBee, ISA100.11a, WirelessHART, MiWi, SNAP,
and the Thread specifications, each of which further extends the standard by
developing the upper layers which are not defined in IEEE 802.15.4.
Alternatively, it can be used with 6LoWPAN, the technology used to deliver IPv6
over WPANs, to define the upper layers. (Thread is also 6LoWPAN-based.)

<p>The INET Framework contains a basic implementation of IEEE 802.15.4 protocol.

<p>
<h2><a name="sec:802154:network-interfaces"></a>17.2 Network Interfaces<a class="headerlink" href="#sec:802154:network-interfaces" title="Permalink to this headline">&para;</a></h2>

<p>There are two network interfaces that differ in the type of radio:

<p><ul>
  <li> <tt>Ieee802154NarrowbandInterface</tt> is for use with narrowband radios</li>
  <li> <tt>Ieee802154UwbIrInterface</tt> is for use with the UWB-IR radio</li>
</ul>

<p>
To create a wireless node with a 802.15.4 interface, use a node type
that has a wireless interface, and set the interface type to the
appropriate type. For example, <tt>WirelessHost</tt> is a node type
which is preconfigured to have one wireless interface, <tt>wlan[0]</tt>.
<tt>wlan[0]</tt> is of parametric type, so if you build the network from
<tt>WirelessHost</tt> nodes, you can configure all of them to use
802.15.4 with the following line in the ini file:

<pre><code data-language="ini">**.wlan[0].typename = "Ieee802154NarrowbandInterface"</code></pre><p>
<h2><a name="sec:802154:physical-layer"></a>17.3 Physical Layer<a class="headerlink" href="#sec:802154:physical-layer" title="Permalink to this headline">&para;</a></h2>

<p>The IEEE 802.15.4 standard defines several alternative PHYs. There are
several narrowband radios at various frequency bands using various modulation
schemes (DSSS, O-QPSK, MPSK, GFSK BPSK, etc.), a Direct Sequence ultra-wideband
(UWB), and one using chirp spread spectrum (CSS).

<p>INET provides the following radios:

<p><ul>
  <li> <tt>Ieee802154NarrowbandScalarRadio</tt> is currently a partially
    parameterized version of the APSK radio. Before using this radio,
    one must check its parameters and make sure that they correspond to the
    specification of the 802.15.4 narrowband PHY to be simulated.</li>
  <li> <tt>Ieee802154UwbIrRadio</tt> models the 802.14.5 UWB radio.</li>
</ul>

<p>One must choose a matching medium model, for example
<tt>Ieee802154UwbIrRadioMedium</tt> for <tt>Ieee802154UwbIrRadio</tt>,
and <tt>Ieee802154NarrowbandScalarRadioMedium</tt> for
<tt>Ieee802154NarrowbandScalarRadio</tt>.

<p>
<h2><a name="sec:802154:mac-protocol"></a>17.4 MAC Protocol<a class="headerlink" href="#sec:802154:mac-protocol" title="Permalink to this headline">&para;</a></h2>

<p>The 802.15.4 MAC is based on collision avoidance via CSMA/CA. Important other
features include real-time suitability by reservation of guaranteed time slots,
and integrated support for secure communications. Devices also include power
management functions such as link quality and energy detection.

<p>The <tt>Ieee802154Mac</tt> type in INET is currently a parameterized
version of a generic CSMA/CA protocol model with ACK support.

<p>There is also a <tt>Ieee802154NarrowbandMac</tt>.

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap16.html">Prev</a> &#8226; <a href="chap18.html">Next</a> &#8226; <a href="toc.html#toc_17">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
