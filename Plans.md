---
layout: page
title: Plans
underMenu: Development
---

This page describes what's planned for INET 3.1 and beyond.

## In INET 3.1

2. mobility models
    *   separate initial positioning from positioning over time
    *   make them composable sequentially and additively
    *   extend interface with future movement predictions

6. Examples
    *   review existing examples
    *   add new more meaningful, more specific feature examples (e.g. crosstalk)
    *   reduce redundancy in inifiles (e.g. lots of unrelated configuration entries) that makes understanding examples more difficult than necessary
    *   review directory structure (e.g. more different wireless directories), make the structure more similar to the source directory structure
    *   extend the wireless tutorial with additional steps


## In INET 3.x

We are planning to do these in the near future (after 3.1):

1. IEEE 802.11
    *   refactor the IEEE 802.11 MAC model to utilize multiple smaller components to help understanding and maintenance (right now it has 70 member variables).

2. physical layer
    *   support capturing a stronger signal while receiving a weaker one
    *   support aborting an ongoing transmission
    *   add the simulation of synchronization process (pilot/preamble)
    *   add missing Weibull and Jakes fading
    *   add multipath support
    *   add real CUDA and multi-core parallel execution

3. packet trace
    *   PCAP and PCAPng

4. IPv6
    *   IPv6 has not yet been through the same refactoring and improvements as the IPv4 model
    *   after that, xMIPv6 needs to be tested and revised as well

5. Documentation
    *   review the Manual, update obsolete parts, add missing parts
    *   review new and modified NED module and C++ class comments

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

