---
layout: page
title: Plans
underMenu: Development
---

This page describes what's planned for INET 3.3 and beyond.

## In INET 3.3

1. 3D visualization (for OMNeT++ 5.0)

2. Additional features for Ieee 802.11 MAC

3. Removal of routing/extras feature and providing easier configuration 
   of adhoc routing protocols.

## In INET 3.4

1. mobility models
    *   separate initial positioning from positioning over time
    *   make them composable sequentially and additively
    *   extend interface with future movement predictions


## In INET 3.x

We are planning to do these in the near future (after 3.3):

1. physical layer
    *   support capturing a stronger signal while receiving a weaker one
    *   support aborting an ongoing transmission
    *   add the simulation of synchronization process (pilot/preamble)
    *   add missing Weibull and Jakes fading
    *   add multipath support
    *   add real CUDA and multi-core parallel execution

2. packet trace
    *   PCAP and PCAPng

3. IPv6
    *   IPv6 has not yet been through the same refactoring and improvements as the IPv4 model
    *   after that, xMIPv6 needs to be tested and revised as well

4. Documentation
    *   review the Manual, update obsolete parts, add missing parts
    *   review new and modified NED module and C++ class comments

5. Examples
    *   review existing examples
    *   add new more meaningful, more specific feature examples (e.g. crosstalk)
    *   reduce redundancy in inifiles (e.g. lots of unrelated configuration entries) that makes understanding examples more difficult than necessary
    *   review directory structure (e.g. more different wireless directories), make the structure more similar to the source directory structure
    *   extend the wireless tutorial with additional steps

6. Tests
    *   some examples are rather tests, they were usually created during development for quick testing
    *   we definitely need more (some?) validation tests (e.g. comparison with other simulators, real world measurements, or analytical results)

## INET 4.0 and Beyond

As for the not-so-near future, we are considering some nontrivial changes:

1. reorganize StandardHost
    *   refactor the internal structure of the StandardHost. Eliminate different application types (UDP/TCP etc.) and 
   provide a single unified socket API for all apps.

2. synchronous sends
    *   introducing synchronous (immediate) message sends to reduce communication overhead between protocol layers

3. flat packets
    *   replacing the nested packet structure with a flat packet structure that uses multiple header and data chunks

4. tags
    *   in conjunction with the above, we might want to replace control info objects with multiple independent tags that can easily pass through layers
