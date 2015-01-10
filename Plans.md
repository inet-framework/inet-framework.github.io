---
layout: page
title: Plans
underMenu: Development
---

This page describes what's planned for INET 3.0 and beyond.

## Plans for INET 3.0

This is a list of the most important items that we plan to complete before releasing the final INET 3.0 version.

1. Source code

*   increase the code quality by eliminating bugs found by automated tools (e.g. valgrind, memcheck and coverity)
*   modernize the code by using standard C++11 features (e.g. `auto` type specifier, range-based loops)
*   apply formatting rules, naming conventions, and other syntax changes

2. Integrate already finished components

*   PIM
*   IGMPv3

3. Implementation

*   finish packet serialization for IEEE 802.11 in conjunction with the following
*   add a bit-precise APSK and IEEE 802.11 model to the physical layer
*   review network layer inheritance and generalization, remove unnecessary code duplication caused by implementing interfaces via generated classes
*   change the ModuleAccess mechanism to more explicit module parameters

4. Documentation

*   review the Manual, update obsolete parts, add missing parts
*   review new and modified NED module and C++ class comments

5. Examples

*   review existing examples
*   add new more meaningful, more specific feature examples (e.g. crosstalk)
*   reduce redundancy in inifiles (e.g. lots of unrelated configuration entries) that makes understanding examples more difficult than necessary
*   review directory structure (e.g. more different wireless directories), make the structure more similar to the source directory structure

6. Tests

*   some examples are rather tests, they were usually created during development for quick testing
*   we definitely need more (some?) validation tests (e.g. comparison with other simulators, real world measurements, or analytical results)

## In INET 3.x

We are planning to do these in the near future (after 3.0):

1. IEEE 802.11

*   refactor the IEEE 802.11 MAC model to utilize multiple smaller components to help understanding and maintenance (right now it has 70 member variables).

2. mobility models

*   separate initial positioning from positioning over time
*   make them composable sequentially and additively
*   extend interface with future movement predictions

3. physical layer

*   support capturing a stronger signal while receiving a weaker one
*   support aborting an ongoing transmission
*   add the simulation of synchronization process (pilot/preamble)
*   add missing Weibull and Jakes fading
*   add multipath support
*   add real CUDA and multi-core parallel execution

4. packet trace

*   PCAP and PCAPng

5. IPv6

*   IPv6 has not yet been through the same refactoring and improvements as the IPv4 model
*   after that, xMIPv6 needs to be tested and revised as well

## INET 4.0 and Beyond

As for the not-so-near future, we are considering some nontrivial changes:

1. synchronous sends

*   introducing synchronous (immediate) message sends to reduce communication overhead between protocol layers

2. flat packets

*   replacing the nested packet structure with a flat packet structure that uses multiple header and data chunks

3. tags

*   in conjunction with the above, we might want to replace control info objects with multiple independent tags that can easily pass through layers

