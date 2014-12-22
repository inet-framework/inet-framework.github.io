# Welcome to the INET Framework! 

**The INET Framework is an open-source communication networks simulation package for the [OMNeT++][1] simulation environment.** The INET Framework provides models for diverse wired, wireless and mobile networks. 

![][2]

* * *

**Get involved!** INET is a community project. If you'd like to help, there are various ways you can [contribute][3] to its progress. We are also currently looking for [Community Managers][4] and [Component Experts][5]. It is a good start to sign up for the [mailing list][6]. 

* * *

## News

**Mailing List Name Change** (Nov 14, 2014) 

Service Announcement: We have renamed the *inetframework-devel@googlegroups.com* mailing list to *inetframework-contrib@googlegroups.com*, to better reflect the purpose of the list as a discussion forum for those who contribute to INET. If you are already subscribed, you don't need to do anything, except for maybe updating your mail filter rules. The mailing list continues to be available at the updated web address <https://groups.google.com/forum/#!forum/inetframework-contrib>. 

**INET-2.99.0 Development Release Available** (Nov 10, 2014) 

This release is a snapshot of the development that has begun in early 2013, and will culminate in the release of INET-3.0. The code is work in progress, which means all details may still change until 3.0 is reached. 

The highlights of this release are: 

*   Network layer refactoring that allows higher layer protocols (including routing protocols) to be written in a network protocol agnostic manner. 
*   A new physical layer model that builds upon the INET and MiXiM physical layers, and brings them to new heights. Design goals were extreme modularity, extensibility, the ability to support (and easily switch between) various levels of detail, and the ability to add support for exploiting various pieces of parallel hardware. 
*   Extensive refactoring aimed at improving code quality. It includes directory restructuring, code formatting, refactoring of init stages and publish-subscribe communication, and more. 

This version requires OMNeT++ 4.6 or later. Read [what's new][7] and [download INET-2.99.0][8] now. 

**INET-2.5.0 Stable Release Available** (Oct 30, 2014) 

We are happy to announce the latest stable version of the INET Framework. This version requires OMNeT++ 4.6. 

This release contains some smaller fixes: 

*   Compiles with OMNeT++ 4.6 with C++11 compatibility turned on. 
*   added netperfmeter application by Thomas Dreibholz 

You can download INET-2.5.0 [here][9]. 

**INET-2.4.0 Stable Release Available** (June 12, 2014) 

We are happy to announce the latest stable version of the INET Framework. This version requires OMNeT++ 4.3 or 4.4. 

This release contains some smaller fixes: 

*   Added support for link break detection in IdealWireless. (using the NF\_LINK\_BREAK signal) 
*   VoIPStream updated to match the latest version of ffmpeg library. 
*   Added packet printers that can dump packet data in OMNeT++ 4.5/Tkenv in the packet trace window. 
*   Fixed non-conformant 802.11 WAITACK timeout computation 

and a new routing protocol: 

*   Brand new AODV implementation in network/routing folder (backported from the integration branch). 

You can download INET-2.4.0 [here][9]. 

**INET-2.3.0 Stable Release Available** (March 27, 2014) 

We are happy to announce the latest stable version of the INET Framework. This version requires OMNeT++ 4.3 or 4.4. 

This release contains several new protocols, and a lot of changes that were backported from the current integration branch (destined to be INET 3.0). 

Application startTime/stopTime fixes: 

*   apps start sending at startTime, and send their last packet before stopTime 
*   negative stopTime means sending forever 
*   if startTime and stopTime are the same, the app sends a single packet only (except TCP apps) 

DHCPServer and Client: 

*   The whole implementation has been reviewed to bring it closer to the standards defined in RFC 2131 and 2132. 
*   Major changes were made both in client's and server's state machines. It is now extended with new states (INIT-REBOOT, REBOOTING) and with new message types (DHCPNAK, DHCPDECLINE). The new states allow the user to model scenarios with lifecycle events. 
*   The server's performance model has been removed. 
*   The internal representation of the DHCP options were moved to the DHCPOptions INET message definition file. 
*   Limitation: The client module currently does not support multiple DHCP servers and BOOTP relay agents. 

SCTP improvements submitted by Irene Rungeler and Thomas Dreibholz: 

*   added CMT support (Concurrent Multipath Transfer) 
*   added SCTP NAT support 
*   added support for using SCTP over IPv6 

STP / RSTP support (802.1d) added to the EthernetSwitch: 

*   STP: added IEEE 802.1D-1998 implementation of Spanning Tree Protocol. The source code is based on the ANSA (<https://github.com/kvetak/ANSA>) implementation. 
*   RSTP: added IEEE 802.1D-2004 implementation of Spanning Tree Protocol. The source code is based on Juan Luis Garrote Molinero's implementation from INETMANET. 
*   Interfaces can be configured using the new L2NetworkConfigurator module. This module allows one to configure network scenarios at Layer 2. 
*   Replaced the EtherSwitch relay unit with a new, STP/RSTP capable one. The CPU and memory modelling are no longer supported in this relay unit. 

Nodes automatically pick-up the network configuration on restart: 

*   An IPv4NodeConfigurator module has been added to hosts, which is responsible for configuring the host on restart based on information stored in the IPv4NetworkConfigurator module. 

INetFilter::IHook API: 

*   Modules can now hook into the IP module with the new 'NetFilter' API. Routing protocols can be implemented now without modifying the IP module's code. ManetRoutingBase, InternetCloud and ARP have been updated to use the new 'NetFilter' API. 

Added new routing protocols: 

*   RIP (networklayer/routing/rip) 
*   GPSR (networklayer/routing/gpsr) 
*   DYMO (networklayer/routing/dymo) 

These protocols use INetFilter::IHook, too. 

Revised Mobility code: Split the 'models' directory into multiple directories: 

*   contract - specifies the interface of mobility models 
*   common - shared files among mobility models that are not complete mobility models 
*   static - mobility models that actually don't move 
*   single - mobility models controlling only one moving object 
*   group - mobility models controlling multiple interlinked moving objects 

Radio: 

*   Added the Stanford University Interim radio propagation model contributed by Konrad Polys and Krzysztof Grochla. 

In addition, there were several bugfixes and smaller improvements See the WHATSNEW and per-directory ChangeLog files for further details. 

You can download INET-2.3.0 [here][9]. 

**INET-2.2.0 Stable Release Available** (Aug 23, 2013) 

We are happy to announce the latest stable version of the INET Framework. This version requires OMNeT++ 4.2 or 4.3. 

New features: 

*   Simulating shutdown, crash, reboot and similar events for network nodes. This is made possible by a new mechanism called lifecycle infrastructure. For node shutdown/crash/startup/etc, a LifecycleOperation (e.g. NodeShutdownOperation) is applied to the submodule tree of the network node (host or router) by a LifecycleController module. Each module can decide how to handle the operation and how to store the resulting state (up/down,etc). Operations can be multi-stage, and don't need to complete immediately (i.e. they can take nonzero simulation time and multiple events to complete). 

*   Static IP4 configuration: A new module, IPv4NodeConfigurator was added to IPv4NetworkLayer. This module is necessary because IPv4NetworkConfigurator cannot configure the node after a restart (see newly introduced node lifecycle operations above), since being a global module, it doesn't know about node lifecycle events. The new module listens to node lifecycle events, and configures the node's routing table and interfaces according to configuration computed by the network's global IPv4NetworkConfigurator module. Initialization-time node configuration is also carried out by the new module. 

*   New TCP congestion control algorithms: TCP Vegas, TCP Westwood 

*   Added IdealWirelessNic (IdealRadio + IdealWirelessMac). This is a highly abstracted wireless NIC that consists of a unit disk radio and a trivial MAC protocol. It offers simplicity for scenarios where Layer 1 and Layer 2 effects can be completely ignored, for example testing the basic functionality of a wireless ad-hoc routing protocol. 

*   SCTP received several new features: new strategies for SCTP stream scheduling; SCTP Stream Reset (RFC 6525); SCTP Authentication (RFC 4895); Add-IP feature for SCTP (RFC 5061); NR_SACK feature to SCTP; Partial Reliability SCTP (RFC 3758); SCTP packet drop feature (draft-stewart-sctp-pktdrprep-15.txt); SCTP "sack immediately" feature (draft-ietf-tsvwg-sctp-sack-immediately); several alternatives to send fast retransmissions on SCTP 

*   Loopback interface module added. Loopback used to be a special case inside the IPv4/IPv6 modules, now it is handled completely like any other interface, with a separate Loopback module. 

*   EtherSwitch, AccessPoint: Bare EtherMAC modules have been replaced with EthernetInterface, so that external queues can be used (useful for e.g. QoS). 

*   InterfaceTable, NIC, NetworkLayer: Revert to earlier behavior of determining networkLayerGateIndex. Now the module connected to a NIC must have gate vectors called ifIn and ifOut. If it doesn't, the code decides that the NIC is not directly connected to a network layer, and leaves networkLayerGateIndex unfilled. 

*   In addition, there were several bugfixes and smaller improvements 

See the WHATSNEW and per-directory ChangeLog files for further details. 

You can download INET-2.2.0 [here][9]. 

**INET-2.1.0 Stable Release Available** (Feb 1, 2013) 

This is the latest stable version of the INET Framework. This version is now recommended for your further INET-based development. It requires OMNeT++ 4.2 or 4.3. 

NEW: 

*   Added a new module to model an "internet cloud". The component can be configured to model packet delay, datarate and drop probability between each input-output interface pair. The parameter matrix is provided as an XML configuration file. See the README file in src/nodes/internetcloud for further details. 
*   New SimpleVoIPReceiver/Sender applications that gather MOS (Mean Opinion Score) for measuring voice quality. 
*   Added HNA support to the Batman protocol (MANET) 

CHANGED: 

Applications: 

*   PingApp: Shows the configured destination address at the end of the simulation. 
*   TCPBasicClientApp: bugfix #611: simulation generated an ASSERT if numRequestsPerSession parameter value larger than 1. 
*   TcpApp: socket state is now shown on the GUI (in Echo, Sink and Session apps.) 
*   VoipTool: was renamed to VoIPStream (The actual module names are VoIPStreamSender/Receiver.) 

Ethernet: 

*   Transmission channel's 'disabled' parameter is now correctly handled in EtherMacBase. 

Ieee80211Mac: 

*   Better parameter processing in MAC: error is thrown if an undefined value is specified for the opmode or autoBitrate parameters. 
*   Added the Ieee80211Descriptor class to assign modulation speed and type for the different opModes. 
*   Bugfix: Default bitrate for opMode 'p' was incorrectly set. 

BGP: 

*   Minor optimizations 
*   Bugfix: The text in specification "sets the ConnectRetryTimer to zero" means: restart this timer. The _connectRetryTime member now stores the timeout value. 

Manetrouting: 

*   updated documentation 
*   replaced Uint128 with ManetNetworkAddress 
*   removed: 
    *   unused ManetTimer and BatmanTimer class 
    *   unused static variables 
    *   isIpLocalAddress(), uses isLocalAddress() 
    *   convertAddressToString() 
    *   getXPos(), getYPos() functions, you should use getPosition() instead. 
*   redesigned coordinate and speed storage and access. replaced double x,y with a Coord. getDirection() now returns the speed vector (as a Coord) 
*   getters returns UNSPECIFIED_ADDRESS if addrType==UNDEFINED 
*   merged sendToIp() code into a common base function sendToIpOnIface() 

AODV: 

*   AODV's hand-written descriptors were replaced with generated ones. 
*   aodv\_msg\_struct.h: added getter methods expected by the generated descriptors removed hand-written aodv\_msg\_struct_descriptor.cc 

Batman: 

*   Updated and expanded documentation 
*   Updated the code to match the latest available "batmand" version. 
*   Numerous optimizations 
*   Fixed several memory leaks 
*   Fixed routing table corruption and possible crash when multiple radios were used in a single host 
*   Fixed decapsulation of incoming packets. Now it checks for the type of decapsulated packet. 
*   Fix for a problem when aggregated batman packets were dropped erronously. 
*   Added HNA support. Nodes can advertise external networks, so traffic towards those networks can be routed correctly. Use the announcedNetworks parameter to specify multiple connected external networks. 
*   Added SourceModifier script to help the conversion from the original batmand code. 
    *   fixes spaces, tabs and empty lines 
    *   replaces some c-style structs to c++-style classes 
    *   replaces some batmand specified list manipulators with c++ code 
    *   replaces malloc/free with new/delete 
    *   removes prof\_start()/prof\_stop() calls 

Examples: 

*   Added a new simulation with wired and wireless hosts exchanging UDP data via an AccessPoint. It shows how to use the IPv4NetworkConfigurator to mix wired and wireless networks. 
*   Fixes for BGP examples. 
*   New example to demonstrate HNA support in Batman. 
*   Hostautoconf examample moved to the adhoc folder. 

Other changes: 

*   Uint128 class was removed. Use ManetNetworkAddress class instead. 
*   Visual changes in StandardHost/NodeBase: utility module icons are now smaller and wlan[]/PingApp[] modules are displayed in a row. 
*   NodeBase: it is possible to use mobility module even if numRadios = 0 
*   Added check for detecting too small netmask parameter value in HostAutoConfigurator 
*   PacketDump: TCP header option fix (dumped only in verbose mode.) 
*   Bugfix #620. The module pointer returned by a ModuleAccess class is now cached only if get() was used. For get(module) no caching is done. 
*   MACAddress: made the constructor explicit so we will not see unexpected implicit conversions in future 
*   IPv6Address: removed Uint128 related functions and added an additional constructMask() method 
*   headerserializers: compile fix for Visual C++ 10.0 and later 
*   Pcap now records on ALL interfaces by default (including external IFs). Added Enter_Method for better error reporting if a packet cannot be serialized. Also added an icon for PcapRecorder. 
*   Several TCP related fixes. 

You can download INET-2.1.0 [here][9]. 

**INET-2.0.0 Stable Release Available** (Aug 7, 2012) 

We are happy to announce the INET Framework 2.0.0 release. The INET Framework is an open-source communication networks simulation package for the OMNeT++ simulation environment. It contains models for several wired and wireless networking protocols, including UDP, TCP, SCTP, IP, IPv6, Ethernet, PPP, 802.11, MPLS, OSPF, and many others. We recommend that you port your existing models to the new 2.0 version so you can benefit from new features and improvements. 

New features: 

*   INET is now partitioned into several "project features" that can be turned on or off independently. This can greatly reduce the compile time by turning off unused parts of INET. 
*   Result recording has been ported to use the new signal-based statistics collection framework; this allows better separation of the model and the statistic collection code. 
*   New Differentiated Services framework for QoS simulations. 
*   New IPv4NetworkConfigurator for more powerful configuration of IP networks. 
*   New protocols: DHCP, BGPv4; interated xMIPv6 (mobile IPv6). 
*   New MANET routing protocols (from INETMANET): AODV, DSR, BATMAN, DYMO, OLSR 
*   New PcapRecorder module for capturing traffic traces. 
*   New VoIP application that allows sending an actual voice stream over the network. 
*   Integrated HttpTools for simulating HTTP-based applications. 
*   New mobility modules including TraCI (taken over from the Veins project) 
*   Added an LwIP-based TCP implementation. 
*   Writing a manual for INET has been started and already made a great progress. 

Improvements: 

*   Node models refactored for better extensibility (StandardHost, AdhocHost, WirelessHost, Router). 
    *   Different types of TCP, UDP and SCTP applications can co-exist in the same host. 
    *   Alternate UDP and TCP implementation can be plugged-in. Three independent TCP implementations are available (OMNeT++ native, LwIP, NSC) 
    *   Inside a host, submodules are instantiated only if they are actually required. 
    *   Configurable hooks have been added in the network layer to allow packet drop/duplication scenarios. 
    *   Routers now support an unlimited number of wireless, Ethernet, point-to-point and external interfaces. 
    *   Mobility support in Router and StandardHost is now optional. 
    *   AccessPoints now have both wireless and Ethernet interfaces (bridged). 
*   Revised OSPFv2 model. 
*   TCP: Transmission mode (byte count, object and byte stream) is now specified by the application. 
*   UDP: multicast, broadcast and TTL support. Improved socket API. 
*   IPv6: implemented default router selection, tunneling and datagram fragmentation/reassembly for PPP links. 
*   IPv4: reimplemented multicast routing 
*   Ethernet: EtherMAC refactored for better readability; added reconnect support, better PAUSE support, support for 40 and 100 Gigabit Ethernet. 
*   Ethernet datarate is now configured on the channels (not in the MAC). Also added new Ethernet channel types: Eth10M, Eth100M, Eth1G, Eth10G, Eth40G and Eth100G 
*   IEEE802.11 a/b/g/s model: Unified several implementations into a single MAC module. 
*   Multiple radio support for wireless hosts; radio infrastructure has been refactored. 
*   Refactoring: Mobility support is now completely independent of the radio infrastructure and it is compatible with the MiXiM mobility modules. 
*   A comprehensive test suite has be devised, and deployed in a continuous testing environment (Jenkins). 
*   A large number of bug fixes and other improvements. 

You can find the detailed change log [here][10]. 

You can download INET-2.0.0 [here][9]. 

**New INET Development Release: INET-1.99.5** (June 22, 2012) 

We have just released the last 1.99.x version for the development branch of INET. Highlights of this release are a new DiffServ framework and the overhaul of the OSPFv2 model. You can download INET-1.99.5 [here][9], or read what's new in this version [here][11]. 

**New INET Development Release: INET-1.99.4** (March 21, 2012) 

We have just released a new version from the development branch of INET. It contains some features that did not make into the previous version. You can download INET-1.99.4 [here][9], or read what's new in this version [here][12]. 

**New INET Development Release: INET-1.99.3** (Feb 24, 2012) 

We have just released a new version from the development branch of INET. You can download INET-1.99.3 [here][9], or read what's new in this version [here][13]. 

**New INET Releases: INET-20111118 (stable), INET-1.99.2 (development)** (Nov 18, 2011) 

INET-20111118 is an update of the previous stable INET version to the just-released OMNeT++ 4.2, with a few bug fixes. The other download, INET-1.99.2 represents a snapshot of the development effort ongoing since the last 1.99.x release in March, which will eventually result in the 2.0 stable release. Learn more about the development of INET [here][14], or download the source [here][9]. 

**Development Snapshot INET-1.99.1** (May 27, 2011) 

Work on INET is progressing fast. The 1.99.x snapshots represent the consolidation of the INET codebase as well as integrating various external INET extensions created by the community, and will eventually result in a 2.0 stable release. Learn more about the development of INET [here][14], or download the source [here][9]. 

**Development Snapshot INET-1.99.0** (March 3, 2011) 

This release is a snapshot of work in progress, please do not use it for research. The source is available from the [download page][9]. 

**INET-20110225 Released** (Feb 25, 2011) 

We are happy to announce a new release of the INET Framework, INET-20110225. This release contains `#include` fixes needed for INET to compile with OMNeT++ 4.2b1. (If you have your own copy or fork of INET, apply [this][15] and [this][16] patch.) Other changes in this INET release include SCTP fixes and additional SCTP statistics by Alberto Cortes. [Download][17] 

**INET Web Site Redesigned** (Aug 16, 2010) 

The INET Framework's web site received a serious face lift. 

**BGPv4 Model Contributed to INET** (Aug 5, 2010) 

Helene Lageber has contributed a BGPv4 model to the INET Framework. The code is now available in the *topic/bgpv4* branch of the INET repo; it will be integrated into the INET *master* branch after some refinements and testing. 

**INET-20100723 Released** (Jul 23, 2010) 

A new INET Framework has been released. The most significant change is new features for the TCP model by Thomas Reschka. See the [release announcement][18].

 [1]: http://www.omnetpp.org
 [2]: http://localhost:/web/inet/uploads/Main/inet.png ""
 [3]: http://localhost:/web/inet/index.php?n=Main.WhyContribute
 [4]: http://localhost:/web/inet/index.php?n=Main.CommunityManagers
 [5]: http://localhost:/web/inet/index.php?n=Main.ComponentExperts
 [6]: http://localhost:/web/inet/index.php?n=Main.MailingList
 [7]: https://github.com/inet-framework/inet/blob/v2.99.0/WHATSNEW
 [8]: http://omnetpp.org/download/contrib/models/inet-2.99.0-src.tgz
 [9]: http://localhost:/web/inet/index.php?n=Main.Download
 [10]: https://github.com/inet-framework/inet/blob/v2.0.0/WHATSNEW
 [11]: https://github.com/inet-framework/inet/blob/integration_1.99.5/WHATSNEW
 [12]: https://github.com/inet-framework/inet/blob/integration_1.99.4/WHATSNEW
 [13]: https://github.com/inet-framework/inet/blob/integration_1.99.3/WHATSNEW
 [14]: http://localhost:/web/inet/index.php?n=Main.Development
 [15]: https://github.com/inet-framework/inet/commit/869de7139b3bc5cd43443a3fe978c5fec42fe331
 [16]: https://github.com/inet-framework/inet/commit/c86b8e5bd6e38eabcb677117e27afb7295db422f
 [17]: http://omnetpp.org/download/contrib/models/inet-20110225-src.tgz
 [18]: http://github.com/inet-framework/inet/blob/master/WHATSNEW