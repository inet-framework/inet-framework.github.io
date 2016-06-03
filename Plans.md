---
layout: page
title: Plans
underMenu: Development
---

This page describes what's planned for INET 4.0 and beyond.

## In INET 4.x

We are planning to do these in the near future (after 3.3):

1. 3D visualization (for OMNeT++ 5.0)

2. Additional features for Ieee 802.11 MAC

3. reorganize StandardHost
    *   refactor the internal structure of the StandardHost. Eliminate different application types (UDP/TCP etc.) and
   provide a single unified socket API for all apps.

5. mobility models
    *   separate initial positioning from positioning over time
    *   make them composable sequentially and additively
    *   extend interface with future movement predictions

6. physical layer
    *   support capturing a stronger signal while receiving a weaker one
    *   support aborting an ongoing transmission
    *   add the simulation of synchronization process (pilot/preamble)
    *   add missing Weibull and Jakes fading
    *   add multipath support
    *   add real CUDA and multi-core parallel execution

7. packet trace
    *   PCAP and PCAPng

8. IPv6
    *   IPv6 has not yet been through the same refactoring and improvements as the IPv4 model
    *   after that, xMIPv6 needs to be tested and revised as well

9. Documentation
    *   review the Manual, update obsolete parts, add missing parts
    *   review new and modified NED module and C++ class comments

10. Examples
    *   review existing examples
    *   add new more meaningful, more specific feature examples (e.g. crosstalk)
    *   reduce redundancy in inifiles (e.g. lots of unrelated configuration entries) that makes understanding examples more difficult than necessary
    *   review directory structure (e.g. more different wireless directories), make the structure more similar to the source directory structure
    *   extend the wireless tutorial with additional steps

11. Tests
    *   some examples are rather tests, they were usually created during development for quick testing
    *   we definitely need more (some?) validation tests (e.g. comparison with other simulators, real world measurements, or analytical results)


As for the not-so-near future, we are considering some nontrivial changes:

1. synchronous sends
    *   introducing synchronous (immediate) message sends to reduce communication overhead between protocol layers

2. flat packets
    *   replacing the nested packet structure with a flat packet structure that uses multiple header and data chunks

3. tags
    *   in conjunction with the above, we might want to replace control info objects with multiple independent tags that can easily pass through layers
