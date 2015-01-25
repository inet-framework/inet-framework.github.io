---
layout: page
title: What Is This?
underMenu: Documentation
---

### A Network Simulator

INET Framework is an open-source communication networks simulation package for OMNeT++.
It contains models for the Internet stack (TCP, UDP, IPv4, IPv6, OSPF, BGP, etc.),
wired and wireless link layer protocols (Ethernet, PPP, IEEE 802.11, etc), support for mobility,
MANET protocols, DiffServ, MPLS with LDP and RSVP-TE signalling, several application models,
and many other protocols and components.

Several other simulation frameworks take INET as a base, and extend it
into specific directions, such as vehicular networks or peer-to-peer networks.

### Designed for Experimentation

INET is built around the concept of modules that communicate by message passing.
Agents and network protocols are represented by components (OMNeT++ simple modules),
which can be freely combined to form hosts, routers, switches, and other
networking devices.

INET benefits from * Models *may* be developed, assembled, parameterized, run, and their results
evaluted from the comfort of the OMNeT++ Simulation IDE. Use of the IDE is
completely optional though, the full functionality is available from
the command-line as well.

- OSI layers implemented (physical, link-layer, network, transport, application)
- pluggable protocol implementations for various layers
- scalable physical layer implementations (802.11, )
- wired/wireless interfaces (ethernet, ppp, 802.11)
- routing (ad-hoc and wired)
- IPv4/IPv6 network stack (or build your own network layer)
- transport layer protocols: TCP/UDP/SCTP
- Wide range of application models
- network emulation support
- mobility support
- supports the modeling of the physical environment
- separation of concerns


### For Experimentation and Research

INET has support for emulation, real-time (RT) and hardware-in-the-loop (HIL) simulation.

### Driven By the Community

INET Framework is maintained by the OMNeT++ team for the community,
utilizing patches and new models contributed by members of the community.

RUDI:

The INET Framework is an open-source model library for the OMNeT++ simulation environment. It provides
models for researchers and students who are working with communication networks. INET is especially
useful when designing and validating new protocols or when the researcher needs to introduce new
or modified protocols into the

