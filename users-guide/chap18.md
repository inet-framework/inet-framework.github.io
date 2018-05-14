---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap17.html">Prev</a> &#8226; <a href="chap19.html">Next</a> &#8226; <a href="toc.html#toc_18">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:sensor-macs"></a>18 MAC Protocols for Wireless Sensor Networks<a class="headerlink" href="#cha:sensor-macs" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:sensor-macs:overview"></a>18.1 Overview<a class="headerlink" href="#sec:sensor-macs:overview" title="Permalink to this headline">&para;</a></h2>

<p>The INET Framework contains the implementation of several MAC protocols
for wireless sensor networks (WSNs), including B-MAC, L-MAC and X-MAC.

<p>To create a wireless node with a specific MAC protocol, use a node type
that has a wireless interface, and set the interface type to the
appropriate type. For example, <tt>WirelessHost</tt> is a node type
which is preconfigured to have one wireless interface, <tt>wlan[0]</tt>.
<tt>wlan[0]</tt> is of parametric type, so if you build the network from
<tt>WirelessHost</tt> nodes, you can configure all of them to use
e.g. B-MAC with the following line in the ini file:

<pre><code data-language="ini">**.wlan[0].typename = "BMacInterface"</code></pre><p>

<p><h2><a name="sec:sensor-macs:b-mac"></a>18.2 B-MAC<a class="headerlink" href="#sec:sensor-macs:b-mac" title="Permalink to this headline">&para;</a></h2>

<p>B-MAC (Berkeley MAC) is a carrier sense media access protocol for
wireless sensor networks that provides a flexible interface to obtain
ultra low power operation, effective collision avoidance, and
high channel utilization. To achieve low power operation,
B-MAC employs an adaptive preamble sampling scheme to reduce duty cycle
and minimize idle listening. B-MAC is designed for low traffic,
low power communication, and is one of the most widely used
protocols (e.g. it is part of TinyOS).

<p>The <tt>BMac</tt> module type implements the B-MAC protocol.

<p><tt>BMacInterface</tt> is a <tt>WirelessInterface</tt> with the MAC type
set to <tt>BMac</tt>.

<p>
<h2><a name="sec:sensor-macs:l-mac"></a>18.3 L-MAC<a class="headerlink" href="#sec:sensor-macs:l-mac" title="Permalink to this headline">&para;</a></h2>

<p>L-MAC (Lightweight MAC) is an energy-efficient medium acces protocol designed
for wireless sensor networks. Although the protocol uses TDMA to give nodes
in the WSN the opportunity to communicate collision-free, the network is
self-organizing in terms of time slot assignment and synchronization.
The protocol reduces the number of transceiver state switches and hence
the energy wasted in preamble transmissions.

<p>The <tt>LMac</tt> module type implements the L-MAC protocol, based on the
paper &#8220;A lightweight medium access protocol (LMAC) for wireless sensor networks&#8221;
by van Hoesel and P. Havinga.

<p><tt>LMacInterface</tt> is a <tt>WirelessInterface</tt> with the MAC type
set to <tt>LMac</tt>.

<p>
<h2><a name="sec:sensor-macs:x-mac"></a>18.4 X-MAC<a class="headerlink" href="#sec:sensor-macs:x-mac" title="Permalink to this headline">&para;</a></h2>

<p>X-MAC is a low-power MAC protocol for wireless sensor networks (WSNs).
In contrast to B-MAC which employs an extended preamble and preamble sampling,
X-MAC uses a shortened preamble that reduces latency at each hop and
improves energy consumption while retaining the advantages
of low power listening, namely low power communication, simplicity
and a decoupling of transmitter and receiver sleep schedules.

<p>The <tt>XMac</tt> module type implements the X-MAC protocol, based on
the paper &#8220;X-MAC: A Short Preamble MAC Protocol for Duty-Cycled
Wireless Sensor Networks&#8221; by Michael Buettner, Gary V. Yee, Eric Anderson
and Richard Han.

<p><tt>XMacInterface</tt> is a <tt>WirelessInterface</tt> with the MAC type
set to <tt>XMac</tt>.

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap17.html">Prev</a> &#8226; <a href="chap19.html">Next</a> &#8226; <a href="toc.html#toc_18">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
