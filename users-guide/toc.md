---
layout: page
underMenu: Documentation
---


### INET Framework User's Guide


<h1>Table of Contents</h1>
<br>&nbsp;&nbsp;<a name="toc_1"/><a href="chap1.html#cha:introduction" class="toc">1 Introduction</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_1.1"/><a href="chap1.html#sec:introduction:what-is-inet-framework" class="toc">1.1 What is INET Framework</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_1.2"/><a href="chap1.html#sec:introduction:designed-for-experimentation" class="toc">1.2 Designed for Experimentation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_1.3"/><a href="chap1.html#sec:introduction:scope-of-this-manual" class="toc">1.3 Scope of this Manual</a><br>
<br>&nbsp;&nbsp;<a name="toc_2"/><a href="chap2.html#cha:usage" class="toc">2 Using the INET Framework</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.1"/><a href="chap2.html#sec:usage:installation" class="toc">2.1 Installation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.2"/><a href="chap2.html#sec:usage:installing-inet-extensions" class="toc">2.2 Installing INET Extensions</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_2.3"/><a href="chap2.html#sec:usage:getting-familiar-with-inet" class="toc">2.3 Getting Familiar with INET</a><br>
<br>&nbsp;&nbsp;<a name="toc_3"/><a href="chap3.html#cha:networks" class="toc">3 Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.1"/><a href="chap3.html#sec:networks:overview" class="toc">3.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.2"/><a href="chap3.html#sec:networks:built-in-network-nodes-and-other-top-level-modules" class="toc">3.2 Built-in Network Nodes and Other Top-Level Modules</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.3"/><a href="chap3.html#sec:networks:typical-networks" class="toc">3.3 Typical Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.3.1"/><a href="chap3.html#sec:networks:wired-networks" class="toc">3.3.1 Wired Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.3.2"/><a href="chap3.html#sec:networks:wireless-networks" class="toc">3.3.2 Wireless Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.3.3"/><a href="chap3.html#sec:networks:mobile-ad-hoc-networks" class="toc">3.3.3 Mobile Ad hoc Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4"/><a href="chap3.html#sec:networks:frequent-tasks" class="toc">3.4 Frequent Tasks (How To...)</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4.1"/><a href="chap3.html#sec:networks:automatic-wired-interfaces" class="toc">3.4.1 Automatic Wired Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4.2"/><a href="chap3.html#sec:networks:multiple-wireless-interfaces" class="toc">3.4.2 Multiple Wireless Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4.3"/><a href="chap3.html#sec:networks:specifying-addresses" class="toc">3.4.3 Specifying Addresses</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4.4"/><a href="chap3.html#sec:networks:node-failure-and-recovery" class="toc">3.4.4 Node Failure and Recovery</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4.5"/><a href="chap3.html#sec:networks:enabling-dual-ip-stack" class="toc">3.4.5 Enabling Dual IP Stack</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_3.4.6"/><a href="chap3.html#sec:networks:enabling-packet-forwarding" class="toc">3.4.6 Enabling Packet Forwarding</a><br>
<br>&nbsp;&nbsp;<a name="toc_4"/><a href="chap4.html#cha:network-nodes" class="toc">4 Network Nodes</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.1"/><a href="chap4.html#sec:nodes:overview" class="toc">4.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.2"/><a href="chap4.html#sec:nodes:ingredients" class="toc">4.2 Ingredients</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.3"/><a href="chap4.html#sec:nodes:node-architecture" class="toc">4.3 Node Architecture</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.4"/><a href="chap4.html#sec:nodes:customizing-nodes" class="toc">4.4 Customizing Nodes</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_4.5"/><a href="chap4.html#sec:nodes:custom-network-nodes" class="toc">4.5 Custom Network Nodes</a><br>
<br>&nbsp;&nbsp;<a name="toc_5"/><a href="chap5.html#cha:network-interfaces" class="toc">5 Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.1"/><a href="chap5.html#sec:interfaces:overview" class="toc">5.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.2"/><a href="chap5.html#sec:interfaces:built-in-network-interfaces" class="toc">5.2 Built-in Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.3"/><a href="chap5.html#sec:interfaces:anatomy-of-network-interfaces" class="toc">5.3 Anatomy of Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.3.1"/><a href="chap5.html#sec:interfaces:internal-vs-external-output-queue" class="toc">5.3.1 Internal vs External Output Queue</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.3.2"/><a href="chap5.html#sec:interfaces:traffic-conditioners" class="toc">5.3.2 Traffic Conditioners</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.3.3"/><a href="chap5.html#sec:interfaces:hooks" class="toc">5.3.3 Hooks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.4"/><a href="chap5.html#sec:interfaces:the-interface-table" class="toc">5.4 The Interface Table</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.5"/><a href="chap5.html#sec:interfaces:wired-network-interfaces" class="toc">5.5 Wired Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.5.1"/><a href="chap5.html#sec:interfaces:ppp" class="toc">5.5.1 PPP</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.5.2"/><a href="chap5.html#sec:interfaces:ethernet" class="toc">5.5.2 Ethernet</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6"/><a href="chap5.html#sec:interfaces:wireless-network-interfaces" class="toc">5.6 Wireless Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.1"/><a href="chap5.html#sec:interfaces:generic-wireless-interface" class="toc">5.6.1 Generic Wireless Interface</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.2"/><a href="chap5.html#sec:interfaces:ieee-80211" class="toc">5.6.2 IEEE 802.11</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.3"/><a href="chap5.html#sec:interfaces:ieee-802154" class="toc">5.6.3 IEEE 802.15.4</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.4"/><a href="chap5.html#sec:interfaces:wireless-sensor-networks" class="toc">5.6.4 Wireless Sensor Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.5"/><a href="chap5.html#sec:interfaces:csma/ca" class="toc">5.6.5 CSMA/CA</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.6"/><a href="chap5.html#sec:interfaces:acking-mac" class="toc">5.6.6 Acking MAC</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.6.7"/><a href="chap5.html#sec:interfaces:shortcut" class="toc">5.6.7 Shortcut</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.7"/><a href="chap5.html#sec:interfaces:special-purpose-network-interfaces" class="toc">5.7 Special-Purpose Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.7.1"/><a href="chap5.html#sec:interfaces:tunnelling" class="toc">5.7.1 Tunnelling</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.7.2"/><a href="chap5.html#sec:interfaces:local-loopback" class="toc">5.7.2 Local Loopback</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.7.3"/><a href="chap5.html#sec:interfaces:external-interface" class="toc">5.7.3 External Interface</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_5.8"/><a href="chap5.html#sec:interfaces:custom-network-interfaces" class="toc">5.8 Custom Network Interfaces</a><br>
<br>&nbsp;&nbsp;<a name="toc_6"/><a href="chap6.html#cha:apps" class="toc">6 Applications</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.1"/><a href="chap6.html#sec:apps:overview" class="toc">6.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2"/><a href="chap6.html#sec:apps:tcp-applications" class="toc">6.2 TCP applications</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.1"/><a href="chap6.html#sec:apps:tcpbasicclientapp" class="toc">6.2.1 TcpBasicClientApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.2"/><a href="chap6.html#sec:apps:tcpsinkapp" class="toc">6.2.2 TcpSinkApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.3"/><a href="chap6.html#sec:apps:tcpgenericserverapp" class="toc">6.2.3 TcpGenericServerApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.4"/><a href="chap6.html#sec:apps:tcpechoapp" class="toc">6.2.4 TcpEchoApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.5"/><a href="chap6.html#sec:apps:tcpsessionapp" class="toc">6.2.5 TcpSessionApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.6"/><a href="chap6.html#sec:apps:telnetapp" class="toc">6.2.6 TelnetApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.2.7"/><a href="chap6.html#sec:apps:tcpserverhostapp" class="toc">6.2.7 TcpServerHostApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3"/><a href="chap6.html#sec:apps:udp-applications" class="toc">6.3 UDP applications</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3.1"/><a href="chap6.html#sec:apps:udpbasicapp" class="toc">6.3.1 UdpBasicApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3.2"/><a href="chap6.html#sec:apps:udpsink" class="toc">6.3.2 UdpSink</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3.3"/><a href="chap6.html#sec:apps:udpechoapp" class="toc">6.3.3 UdpEchoApp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3.4"/><a href="chap6.html#sec:apps:udpvideostreamclient" class="toc">6.3.4 UdpVideoStreamClient</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3.5"/><a href="chap6.html#sec:apps:udpvideostreamserver" class="toc">6.3.5 UdpVideoStreamServer</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.3.6"/><a href="chap6.html#sec:apps:udpbasicburst" class="toc">6.3.6 UdpBasicBurst</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.4"/><a href="chap6.html#sec:apps:ipv4/ipv6-traffic-generators" class="toc">6.4 IPv4/IPv6 traffic generators</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.5"/><a href="chap6.html#sec:apps:the-pingapp-application" class="toc">6.5 The PingApp application</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_6.6"/><a href="chap6.html#sec:apps:ethernet-applications" class="toc">6.6 Ethernet applications</a><br>
<br>&nbsp;&nbsp;<a name="toc_7"/><a href="chap7.html#cha:transport-protocols" class="toc">7 Transport Protocols</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.1"/><a href="chap7.html#sec:transport:overview" class="toc">7.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.2"/><a href="chap7.html#sec:transport:tcp" class="toc">7.2 TCP</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.2.1"/><a href="chap7.html#sec:transport:tcp-overview" class="toc">7.2.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.2.2"/><a href="chap7.html#sec:transport:tcp" class="toc">7.2.2 Tcp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.2.3"/><a href="chap7.html#sec:transport:tcplwip" class="toc">7.2.3 TcpLwip</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.2.4"/><a href="chap7.html#sec:transport:tcpnsc" class="toc">7.2.4 TcpNsc</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.3"/><a href="chap7.html#sec:transport:udp" class="toc">7.3 UDP</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.4"/><a href="chap7.html#sec:transport:sctp" class="toc">7.4 SCTP</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_7.5"/><a href="chap7.html#sec:transport:rtp" class="toc">7.5 RTP</a><br>
<br>&nbsp;&nbsp;<a name="toc_8"/><a href="chap8.html#cha:ipv4" class="toc">8 The IPv4 Protocol Family</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_8.1"/><a href="chap8.html#sec:ipv4:overview" class="toc">8.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_8.2"/><a href="chap8.html#sec:ipv4:ipv4" class="toc">8.2 Ipv4</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_8.3"/><a href="chap8.html#sec:ipv4:ipv4routingtable" class="toc">8.3 Ipv4RoutingTable</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_8.4"/><a href="chap8.html#sec:ipv4:icmp" class="toc">8.4 Icmp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_8.5"/><a href="chap8.html#sec:ipv4:arp" class="toc">8.5 Arp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_8.6"/><a href="chap8.html#sec:ipv4:igmp" class="toc">8.6 Igmp</a><br>
<br>&nbsp;&nbsp;<a name="toc_9"/><a href="chap9.html#cha:ipv6" class="toc">9 IPv6 and Mobile IPv6</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_9.1"/><a href="chap9.html#sec:ipv6:overview" class="toc">9.1 Overview</a><br>
<br>&nbsp;&nbsp;<a name="toc_10"/><a href="chap10.html#cha:routing" class="toc">10 Internet Routing</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_10.1"/><a href="chap10.html#sec:routing:overview" class="toc">10.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_10.2"/><a href="chap10.html#sec:routing:rip" class="toc">10.2 RIP</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_10.3"/><a href="chap10.html#sec:routing:ospf" class="toc">10.3 OSPF</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_10.4"/><a href="chap10.html#sec:routing:bgp" class="toc">10.4 BGP</a><br>
<br>&nbsp;&nbsp;<a name="toc_11"/><a href="chap11.html#cha:adhoc-routing" class="toc">11 Ad Hoc Routing</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_11.1"/><a href="chap11.html#sec:adhocrouting:overview" class="toc">11.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_11.2"/><a href="chap11.html#sec:adhocrouting:aodv" class="toc">11.2 AODV</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_11.3"/><a href="chap11.html#sec:adhocrouting:dsdv" class="toc">11.3 DSDV</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_11.4"/><a href="chap11.html#sec:adhocrouting:dymo" class="toc">11.4 DYMO</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_11.5"/><a href="chap11.html#sec:adhocrouting:gpsr" class="toc">11.5 GPSR</a><br>
<br>&nbsp;&nbsp;<a name="toc_12"/><a href="chap12.html#cha:diffserv" class="toc">12 Differentiated Services</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.1"/><a href="chap12.html#sec:diffserv:overview" class="toc">12.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.1.1"/><a href="chap12.html#sec:diffserv:implemented-standards" class="toc">12.1.1 Implemented Standards</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.2"/><a href="chap12.html#sec:diffserv:architecture-of-nics" class="toc">12.2 Architecture of NICs</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.2.1"/><a href="chap12.html#sec:diffserv:traffic-conditioners" class="toc">12.2.1 Traffic Conditioners</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.2.2"/><a href="chap12.html#sec:diffserv:output-queues" class="toc">12.2.2 Output Queues</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3"/><a href="chap12.html#sec:diffserv:simple-modules" class="toc">12.3 Simple modules</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3.1"/><a href="chap12.html#sec:diffserv:queues" class="toc">12.3.1 Queues</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3.2"/><a href="chap12.html#sec:diffserv:droppers" class="toc">12.3.2 Droppers</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3.3"/><a href="chap12.html#sec:diffserv:schedulers" class="toc">12.3.3 Schedulers</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3.4"/><a href="chap12.html#sec:diffserv:classifiers" class="toc">12.3.4 Classifiers</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3.5"/><a href="chap12.html#sec:diffserv:meters" class="toc">12.3.5 Meters</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.3.6"/><a href="chap12.html#sec:diffserv:markers" class="toc">12.3.6 Markers</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.4"/><a href="chap12.html#sec:diffserv:compound-modules" class="toc">12.4 Compound modules</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.4.1"/><a href="chap12.html#sec:diffserv:afxyqueue" class="toc">12.4.1 AFxyQueue</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_12.4.2"/><a href="chap12.html#sec:diffserv:diffservqeueue" class="toc">12.4.2 DiffservQeueue</a><br>
<br>&nbsp;&nbsp;<a name="toc_13"/><a href="chap13.html#cha:mpls" class="toc">13 The MPLS Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.1"/><a href="chap13.html#sec:mpls:overview" class="toc">13.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2"/><a href="chap13.html#sec:mpls:core-modules" class="toc">13.2 Core Modules</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2.1"/><a href="chap13.html#sec:mpls:mpls" class="toc">13.2.1 Mpls</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2.2"/><a href="chap13.html#sec:mpls:libtable" class="toc">13.2.2 LibTable</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2.3"/><a href="chap13.html#sec:mpls:ldp" class="toc">13.2.3 Ldp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2.4"/><a href="chap13.html#sec:mpls:ted" class="toc">13.2.4 Ted</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2.5"/><a href="chap13.html#sec:mpls:linkstaterouting" class="toc">13.2.5 LinkStateRouting</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.2.6"/><a href="chap13.html#sec:mpls:rsvpte" class="toc">13.2.6 RsvpTe</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.3"/><a href="chap13.html#sec:mpls:classifier" class="toc">13.3 Classifier</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_13.4"/><a href="chap13.html#sec:mpls:mpls-enabled-router-models" class="toc">13.4 MPLS-Enabled Router Models</a><br>
<br>&nbsp;&nbsp;<a name="toc_14"/><a href="chap14.html#cha:ppp" class="toc">14 Point-to-Point Links</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_14.1"/><a href="chap14.html#sec:ppp:overview" class="toc">14.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_14.2"/><a href="chap14.html#sec:ppp:the-ppp-module" class="toc">14.2 The PPP module</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_14.3"/><a href="chap14.html#sec:ppp:pppinterface" class="toc">14.3 PppInterface</a><br>
<br>&nbsp;&nbsp;<a name="toc_15"/><a href="chap15.html#cha:ethernet" class="toc">15 The Ethernet Model</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.1"/><a href="chap15.html#sec:ethernet:overview" class="toc">15.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.2"/><a href="chap15.html#sec:ethernet:nodes" class="toc">15.2 Nodes</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.2.1"/><a href="chap15.html#sec:ethernet:etherswitch" class="toc">15.2.1 EtherSwitch</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.2.2"/><a href="chap15.html#sec:ethernet:etherhub" class="toc">15.2.2 EtherHub</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.2.3"/><a href="chap15.html#sec:ethernet:etherbus" class="toc">15.2.3 EtherBus</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.3"/><a href="chap15.html#sec:ethernet:the-physical-layer" class="toc">15.3 The Physical Layer</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.4"/><a href="chap15.html#sec:ethernet:ethernet-interface" class="toc">15.4 Ethernet Interface</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5"/><a href="chap15.html#sec:ethernet:components" class="toc">15.5 Components</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.1"/><a href="chap15.html#sec:ethernet:ethermacfullduplex" class="toc">15.5.1 EtherMacFullDuplex</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.2"/><a href="chap15.html#sec:ethernet:ethermac" class="toc">15.5.2 EtherMac</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.3"/><a href="chap15.html#sec:ethernet:etherencap" class="toc">15.5.3 EtherEncap</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.4"/><a href="chap15.html#sec:ethernet:etherllc" class="toc">15.5.4 EtherLlc</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.5"/><a href="chap15.html#sec:ethernet:macrelayunit" class="toc">15.5.5 MacRelayUnit</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.6"/><a href="chap15.html#sec:ethernet:macaddresstable" class="toc">15.5.6 MacAddressTable</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.7"/><a href="chap15.html#sec:ethernet:ieee8021drelay" class="toc">15.5.7 Ieee8021dRelay</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.8"/><a href="chap15.html#sec:ethernet:stp" class="toc">15.5.8 Stp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.5.9"/><a href="chap15.html#sec:ethernet:rstp" class="toc">15.5.9 Rstp</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_15.6"/><a href="chap15.html#sec:ethernet:implemented-standards" class="toc">15.6 Implemented Standards</a><br>
<br>&nbsp;&nbsp;<a name="toc_16"/><a href="chap16.html#cha:80211" class="toc">16 The 802.11 Model</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_16.1"/><a href="chap16.html#sec:80211:overview" class="toc">16.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_16.2"/><a href="chap16.html#sec:80211:mac" class="toc">16.2 MAC</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_16.3"/><a href="chap16.html#sec:80211:physical-layer" class="toc">16.3 Physical Layer</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_16.4"/><a href="chap16.html#sec:80211:management" class="toc">16.4 Management</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_16.5"/><a href="chap16.html#sec:80211:agent" class="toc">16.5 Agent</a><br>
<br>&nbsp;&nbsp;<a name="toc_17"/><a href="chap17.html#cha:802154" class="toc">17 The 802.15.4 Model</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_17.1"/><a href="chap17.html#sec:802154:overview" class="toc">17.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_17.2"/><a href="chap17.html#sec:802154:network-interfaces" class="toc">17.2 Network Interfaces</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_17.3"/><a href="chap17.html#sec:802154:physical-layer" class="toc">17.3 Physical Layer</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_17.4"/><a href="chap17.html#sec:802154:mac-protocol" class="toc">17.4 MAC Protocol</a><br>
<br>&nbsp;&nbsp;<a name="toc_18"/><a href="chap18.html#cha:sensor-macs" class="toc">18 MAC Protocols for Wireless Sensor Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_18.1"/><a href="chap18.html#sec:sensor-macs:overview" class="toc">18.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_18.2"/><a href="chap18.html#sec:sensor-macs:b-mac" class="toc">18.2 B-MAC</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_18.3"/><a href="chap18.html#sec:sensor-macs:l-mac" class="toc">18.3 L-MAC</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_18.4"/><a href="chap18.html#sec:sensor-macs:x-mac" class="toc">18.4 X-MAC</a><br>
<br>&nbsp;&nbsp;<a name="toc_19"/><a href="chap19.html#cha:physicallayer" class="toc">19 The Physical Layer</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.1"/><a href="chap19.html#sec:phy:overview" class="toc">19.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.2"/><a href="chap19.html#sec:phy:generic-radio" class="toc">19.2 Generic Radio</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.3"/><a href="chap19.html#sec:phy:components-of-a-radio" class="toc">19.3 Components of a Radio</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.3.1"/><a href="chap19.html#sec:phy:antenna-models" class="toc">19.3.1 Antenna Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.3.2"/><a href="chap19.html#sec:phy:transmitter-models" class="toc">19.3.2 Transmitter Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.3.3"/><a href="chap19.html#sec:phy:receiver-models" class="toc">19.3.3 Receiver Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.3.4"/><a href="chap19.html#sec:phy:error-models" class="toc">19.3.4 Error Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.3.5"/><a href="chap19.html#sec:phy:power-consumption-models" class="toc">19.3.5 Power Consumption Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.4"/><a href="chap19.html#sec:phy:layered-radio-models" class="toc">19.4 Layered Radio Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.5"/><a href="chap19.html#sec:phy:notable-radio-models" class="toc">19.5 Notable Radio Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.5.1"/><a href="chap19.html#sec:phy:unitdiskradio" class="toc">19.5.1 UnitDiskRadio</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_19.5.2"/><a href="chap19.html#sec:phy:apsk-radio" class="toc">19.5.2 APSK Radio</a><br>
<br>&nbsp;&nbsp;<a name="toc_20"/><a href="chap20.html#cha:transmission-medium" class="toc">20 The Transmission Medium</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.1"/><a href="chap20.html#sec:medium:overview" class="toc">20.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.2"/><a href="chap20.html#sec:medium:radiomedium" class="toc">20.2 RadioMedium</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.3"/><a href="chap20.html#sec:medium:propagation-models" class="toc">20.3 Propagation Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.4"/><a href="chap20.html#sec:medium:path-loss-models" class="toc">20.4 Path Loss Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.5"/><a href="chap20.html#sec:medium:obstacle-loss-models" class="toc">20.5 Obstacle Loss Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.6"/><a href="chap20.html#sec:medium:background-noise-models" class="toc">20.6 Background Noise Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.7"/><a href="chap20.html#sec:medium:analog-models" class="toc">20.7 Analog Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.8"/><a href="chap20.html#sec:medium:neighbor-cache" class="toc">20.8 Neighbor Cache</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.9"/><a href="chap20.html#sec:medium:medium-limit-cache" class="toc">20.9 Medium Limit Cache</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.10"/><a href="chap20.html#sec:medium:communication-cache" class="toc">20.10 Communication Cache</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_20.11"/><a href="chap20.html#sec:medium:improving-scalability" class="toc">20.11 Improving Scalability</a><br>
<br>&nbsp;&nbsp;<a name="toc_21"/><a href="chap21.html#cha:environment" class="toc">21 The Physical Environment</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_21.1"/><a href="chap21.html#sec:environment:overview" class="toc">21.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_21.2"/><a href="chap21.html#sec:environment:physicalenvironment" class="toc">21.2 PhysicalEnvironment</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_21.3"/><a href="chap21.html#sec:environment:physical-objects" class="toc">21.3 Physical Objects</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_21.4"/><a href="chap21.html#sec:environment:ground-models" class="toc">21.4 Ground Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_21.5"/><a href="chap21.html#sec:environment:geographic-coordinate-system-models" class="toc">21.5 Geographic Coordinate System Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_21.6"/><a href="chap21.html#sec:environment:object-cache" class="toc">21.6 Object Cache</a><br>
<br>&nbsp;&nbsp;<a name="toc_22"/><a href="chap22.html#cha:mobility" class="toc">22 Node Mobility</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_22.1"/><a href="chap22.html#sec:mobility:overview" class="toc">22.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_22.2"/><a href="chap22.html#sec:mobility:built-in-mobility-models" class="toc">22.2 Built-In Mobility Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_22.2.1"/><a href="chap22.html#sec:mobility:list-of-mobility-models" class="toc">22.2.1 List of Mobility Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_22.2.2"/><a href="chap22.html#sec:mobility:more-information-on-some-mobility-models" class="toc">22.2.2 More Information on Some Mobility Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_22.2.3"/><a href="chap22.html#sec:mobility:replaying-trace-files" class="toc">22.2.3 Replaying trace files</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_22.2.4"/><a href="chap22.html#sec:mobility:turtlemobility" class="toc">22.2.4 TurtleMobility</a><br>
<br>&nbsp;&nbsp;<a name="toc_23"/><a href="chap23.html#cha:power" class="toc">23 Modeling Power Consumption</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_23.1"/><a href="chap23.html#sec:power:overview" class="toc">23.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_23.2"/><a href="chap23.html#sec:power:energy-consumer-models" class="toc">23.2 Energy Consumer Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_23.3"/><a href="chap23.html#sec:power:energy-generator-models" class="toc">23.3 Energy Generator Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_23.4"/><a href="chap23.html#sec:power:energy-storage-models" class="toc">23.4 Energy Storage Models</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_23.5"/><a href="chap23.html#sec:power:energy-management-models" class="toc">23.5 Energy Management Models</a><br>
<br>&nbsp;&nbsp;<a name="toc_24"/><a href="chap24.html#cha:emulation" class="toc">24 Network Emulation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_24.1"/><a href="chap24.html#sec:emulation:motivation" class="toc">24.1 Motivation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_24.2"/><a href="chap24.html#sec:emulation:overview" class="toc">24.2 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_24.3"/><a href="chap24.html#sec:emulation:preparation" class="toc">24.3 Preparation</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_24.4"/><a href="chap24.html#sec:emulation:configuring" class="toc">24.4 Configuring</a><br>
<br>&nbsp;&nbsp;<a name="toc_25"/><a href="chap25.html#cha:network-autoconfiguration" class="toc">25 Network Autoconfiguration</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_25.1"/><a href="chap25.html#sec:autoconfig:overview" class="toc">25.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_25.2"/><a href="chap25.html#sec:autoconfig:configuring-ipv4-networks" class="toc">25.2 Configuring IPv4 Networks</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_25.2.1"/><a href="chap25.html#sec:autoconfig:ipv4networkconfigurator" class="toc">25.2.1 Ipv4NetworkConfigurator</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_25.2.2"/><a href="chap25.html#sec:autoconfig:ipv4flatnetworkconfigurator" class="toc">25.2.2 Ipv4FlatNetworkConfigurator (Legacy)</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_25.2.3"/><a href="chap25.html#sec:autoconfig:routing-files" class="toc">25.2.3 Routing Files (Legacy)</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_25.3"/><a href="chap25.html#sec:autoconfig:configuring-layer-2" class="toc">25.3 Configuring Layer 2</a><br>
<br>&nbsp;&nbsp;<a name="toc_26"/><a href="chap26.html#cha:scenario-scripting" class="toc">26 Scenario Scripting</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_26.1"/><a href="chap26.html#sec:scenario:overview" class="toc">26.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_26.2"/><a href="chap26.html#sec:scenario:scenariomanager" class="toc">26.2 ScenarioManager</a><br>
<br>&nbsp;&nbsp;<a name="toc_27"/><a href="chap27.html#cha:lifecycle" class="toc">27 Modeling Node Failures</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_27.1"/><a href="chap27.html#sec:lifecycle:overview" class="toc">27.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_27.2"/><a href="chap27.html#sec:lifecycle:nodestatus" class="toc">27.2 NodeStatus</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_27.3"/><a href="chap27.html#sec:lifecycle:scripting" class="toc">27.3 Scripting</a><br>
<br>&nbsp;&nbsp;<a name="toc_28"/><a href="chap28.html#cha:visualization" class="toc">28 Visualization</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.1"/><a href="chap28.html#sec:visualization:overview" class="toc">28.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2"/><a href="chap28.html#sec:visualization:network-communication" class="toc">28.2 Visualizing Network Communication</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.1"/><a href="chap28.html#sec:visualization:packet-drops" class="toc">28.2.1 Visualizing Packet Drops</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.2"/><a href="chap28.html#sec:visualization:transport-path-activity" class="toc">28.2.2 Visualizing Transport Path Activity</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.3"/><a href="chap28.html#sec:visualization:network-path-activity" class="toc">28.2.3 Visualizing Network Path Activity</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.4"/><a href="chap28.html#sec:visualization:data-link-activity" class="toc">28.2.4 Visualizing Data Link Activity</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.5"/><a href="chap28.html#sec:visualization:physical-link-activity" class="toc">28.2.5 Visualizing Physical Link Activity</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.6"/><a href="chap28.html#sec:visualization:routing-tables" class="toc">28.2.6 Visualizing Routing Tables</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.7"/><a href="chap28.html#sec:visualization:displaying-ip-addresses-and-other-interface-information" class="toc">28.2.7 Displaying IP Addresses and Other Interface Information</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.8"/><a href="chap28.html#sec:visualization:ieee-80211-network-membership" class="toc">28.2.8 Visualizing IEEE 802.11 Network Membership</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.2.9"/><a href="chap28.html#sec:visualization:transport-connections" class="toc">28.2.9 Visualizing Transport Connections</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.3"/><a href="chap28.html#sec:visualization:the-infrastructure" class="toc">28.3 Visualizing The Infrastructure</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.3.1"/><a href="chap28.html#sec:visualization:the-physical-environment" class="toc">28.3.1 Visualizing the Physical Environment</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_28.3.2"/><a href="chap28.html#sec:visualization:node-mobility" class="toc">28.3.2 Visualizing Node Mobility</a><br>
<br>&nbsp;&nbsp;<a name="toc_29"/><a href="chap29.html#cha:authors-guide" class="toc">29 Appendix: Author's Guide</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.1"/><a href="chap29.html#sec:authorsguide:overview" class="toc">29.1 Overview</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2"/><a href="chap29.html#sec:authorsguide:guidelines" class="toc">29.2 Guidelines</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2.1"/><a href="chap29.html#sec:authorsguide:do-not-repeat-the-standard" class="toc">29.2.1 Do Not Repeat the Standard</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2.2"/><a href="chap29.html#sec:authorsguide:do-not-repeat-ned" class="toc">29.2.2 Do Not Repeat NED</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2.3"/><a href="chap29.html#sec:authorsguide:no-cplusplus" class="toc">29.2.3 No C++</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2.4"/><a href="chap29.html#sec:authorsguide:keep-examples-short" class="toc">29.2.4 Keep Examples Short</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2.5"/><a href="chap29.html#sec:authorsguide:no-reference-to-simulation-examples" class="toc">29.2.5 No Reference to Simulation Examples</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_29.2.6"/><a href="chap29.html#sec:authorsguide:what-then" class="toc">29.2.6 What then?</a><br>
<br>&nbsp;&nbsp;<a name="toc_30"/><a href="chap30.html#cha:History" class="toc">30 History</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;<a name="toc_30.1"/><a href="chap30.html#sec:history:ipsuite-to-inet" class="toc">30.1 IPSuite to INET Framework (2000-2006)</a><br>
</p>
