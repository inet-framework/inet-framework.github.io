---
layout: page
underMenu: Documentation
---


<h3>INET Framework Developer's Guide</h3>


<h1>Table of Contents</h1>
<br>&nbsp;&nbsp;<a name="toc_1"/><a href="chap1.html#cha:introduction" class="toc">1 Introduction</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_1.1"/><a href="chap1.html#sec:introduction:what-is-inet" class="toc">1.1 What is INET Framework</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_1.2"/><a href="chap1.html#sec:introduction:scope-of-this-manual" class="toc">1.2 Scope of this Manual</a><br>
<br>&nbsp;&nbsp;<a name="toc_2"/><a href="chap2.html#cha:packet-api" class="toc">2 Working with Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.1"/><a href="chap2.html#sec:packets:overviews" class="toc">2.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.2"/><a href="chap2.html#sec:packets:representing-data" class="toc">2.2 Representing Data</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.3"/><a href="chap2.html#sec:packets:representing-packets" class="toc">2.3 Representing Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.4"/><a href="chap2.html#sec:packets:representing-signals" class="toc">2.4 Representing Signals</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.5"/><a href="chap2.html#sec:packets:representing-transmission-errors" class="toc">2.5 Representing Transmission Errors</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.6"/><a href="chap2.html#sec:packets:packet-tagging" class="toc">2.6 Packet Tagging</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.7"/><a href="chap2.html#sec:packets:region-tagging" class="toc">2.7 Region Tagging</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.8"/><a href="chap2.html#sec:packets:dissecting-packets" class="toc">2.8 Dissecting Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.9"/><a href="chap2.html#sec:packets:filtering-packets" class="toc">2.9 Filtering Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.10"/><a href="chap2.html#sec:packets:printing-packets" class="toc">2.10 Printing Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.11"/><a href="chap2.html#sec:packets:recording-pcap" class="toc">2.11 Recording PCAP</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.12"/><a href="chap2.html#sec:packets:encapsulating-packets" class="toc">2.12 Encapsulating Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.13"/><a href="chap2.html#sec:packets:fragmenting-packets" class="toc">2.13 Fragmenting Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.14"/><a href="chap2.html#sec:packets:aggregating-packets" class="toc">2.14 Aggregating Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.15"/><a href="chap2.html#sec:packets:serializing-packets" class="toc">2.15 Serializing Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.16"/><a href="chap2.html#sec:packets:emulation-support" class="toc">2.16 Emulation Support</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.17"/><a href="chap2.html#sec:packets:queueing-packets" class="toc">2.17 Queueing Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.18"/><a href="chap2.html#sec:packets:buffering-packets" class="toc">2.18 Buffering Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.19"/><a href="chap2.html#sec:packets:reassembling-packets" class="toc">2.19 Reassembling Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.20"/><a href="chap2.html#sec:packets:reordering-packets" class="toc">2.20 Reordering Packets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.21"/><a href="chap2.html#sec:packets:dispatching-packets" class="toc">2.21 Dispatching Packets</a><br>
<br>&nbsp;&nbsp;<a name="toc_3"/><a href="chap3.html#cha:sockets" class="toc">3 Working with Sockets</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.1"/><a href="chap3.html#sec:sockets:overview" class="toc">3.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.2"/><a href="chap3.html#sec:sockets:udp-socket" class="toc">3.2 UDP Socket</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.3"/><a href="chap3.html#sec:sockets:tcp-socket" class="toc">3.3 TCP Socket</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4"/><a href="chap3.html#sec:sockets:sctp-socket" class="toc">3.4 SCTP Socket</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.5"/><a href="chap3.html#sec:sockets:ipv4-socket" class="toc">3.5 IPv4 Socket</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.6"/><a href="chap3.html#sec:sockets:ipv6-socket" class="toc">3.6 IPv6 Socket</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.7"/><a href="chap3.html#sec:sockets:l3-socket" class="toc">3.7 L3 Socket</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.8"/><a href="chap3.html#sec:sockets:tun-socket" class="toc">3.8 TUN Socket</a><br>
<br>&nbsp;&nbsp;<a name="toc_4"/><a href="chap4.html#cha:authors-guide" class="toc">4 Appendix: Author's Guide</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.1"/><a href="chap4.html#sec:authorsguide:overview" class="toc">4.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.2"/><a href="chap4.html#sec:authorsguide:guidelines" class="toc">4.2 Guidelines</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.2.1"/><a href="chap4.html#sec:authorsguide:do-not-repeat-standard" class="toc">4.2.1 Do Not Repeat the Standard</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.2.2"/><a href="chap4.html#sec:authorsguide:do-not-repeat-neddoc" class="toc">4.2.2 Do Not Repeat NED Documentation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.2.3"/><a href="chap4.html#sec:authorsguide:do-not-repeat-cpp" class="toc">4.2.3 Do Not Repeat C++ Documentation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.2.4"/><a href="chap4.html#sec:authorsguide:what-then" class="toc">4.2.4 What then?</a><br>
</p>
