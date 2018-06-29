---
layout: page
title: Plans
underMenu: Development
---

This page describes what's planned for INET in the future.

## In INET 4.x

1. Update the INET documentation site to include the Examples, Tutorials, User and Developer's Guide plus
   all Reference documentation.

2. mobility models
    * separate initial positioning from positioning over time
    * make them composable sequentially and additively
    * extend interface with future movement predictions

3. physical layer
    * support capturing a stronger signal while receiving a weaker one
    * support aborting an ongoing transmission
    * add the simulation of synchronization process (pilot/preamble)
    * add missing Weibull and Jakes fading
    * add multipath support
    * add real CUDA and multi-core parallel execution

4. packet trace
    * PCAP and PCAPng

5. IPv6
    * IPv6 has not yet been through the same refactoring and improvements as the IPv4 model
    * after that, xMIPv6 needs to be tested and revised as well

6. Documentation
    * review new and modified NED module and C++ class comments

7. Examples
    * review existing examples
    * add new more meaningful, more specific feature examples (e.g. crosstalk)
    * reduce redundancy in inifiles (e.g. lots of unrelated configuration entries) that makes understanding examples more difficult than necessary
    * review directory structure (e.g. more different wireless directories), make the structure more similar to the source directory structure
    * extend the wireless tutorial with additional steps

8. Tests
    * some examples are rather tests, they were usually created during development for quick testing
    * we definitely need more (some?) validation tests (e.g. comparison with other simulators, real world measurements, or analytical results)

As for the not-so-near future (potentially in a later major version), we are considering some nontrivial changes:

1. synchronous sends
    * introducing synchronous (immediate) message sends to reduce communication overhead between protocol layers

