---
layout: page
title: Recent Progress
underMenu: Development
---

*Dec 9, 2014*:

We are working in the *integration* branch towards INET-3.0.

What we've been doing since the INET-2.99.0 pre-release:

*   Set up a Coverity account for detecting defects via static code analysis
*   Introducing C++11 features in the code (nullptr, auto, in-class member initializers)
*   Working on the manual
*   Merged the PIM/IGMPv3 topic branch into integration

*Apr 2, 2012*:

INET-1.99.4 has been released. See [what is new][1].

We are currently concentrating on code and protocol reviews. Additional short term plans:

*   Implement DiffServ.
*   Merge/integrate the MiXiM project with INET.
*   Implement Node failure/recovery support.
*   Implement IPv6NetworkConfigurator (should work like the current IPv4NetworkConfigurator).

*June 6, 2011*:

For the last six months or so, development has taken place in the **master** branch of the repository, with periodic releases of that branch as INET-1.99.x.

To see what's been done, check the WHATSNEW file in the repo:

*   <https://github.com/inet-framework/inet/blob/master/WHATSNEW>

or browse the commits directly.

Short-term plans include the integration of the 802.15.4 model from INETMANET, HttpTools and MiXiM.

* * *

*Aug 18, 2010*:

The following topic branches are currently open in the INET repository (last updated: :

*   `topic/bgpv4` -- recently contributed BGP protocol (mostly done)
*   `topic/ethernet` -- changing Ethernet to use channel datarate instead of parameter (mostly done)
*   `topic/ospfrenaming` -- OSPF model code style fixes (mostly done)
*   `topic/signals` -- signals-based result recording instead of cOutVector/recordScalar (halfway)
*   `topic/PcapTrace` -- capturing and recording PCAP traces via GUI
*   `topic/tcp_lwip` -- lwIP integration as alternative TCP (mostly done)
*   `topic/tcp_socket_read` -- application-level flow control in TCP (in work)
*   `topic/tcptransfermode` -- refactoring of TCP send/recvQueueClass to a transferMode parameter (halfway)
*   `topic/wizards` -- wizards to generate wireless and other networks (halfway)

The plan is to have these branches finished, reviewed, and merged into master over the next few months.

 [1]: https://github.com/inet-framework/inet/blob/master/WHATSNEW