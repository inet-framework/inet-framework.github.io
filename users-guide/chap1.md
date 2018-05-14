---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap2.html">Next</a> &#8226; <a href="toc.html#toc_1">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:introduction"></a>1 Introduction<a class="headerlink" href="#cha:introduction" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:introduction:what-is-inet-framework"></a>1.1 What is INET Framework<a class="headerlink" href="#sec:introduction:what-is-inet-framework" title="Permalink to this headline">&para;</a></h2>

<p>INET Framework is an open-source model library for the OMNeT++ simulation
environment. It provides protocols, agents and other models for researchers
and students working with communication networks. INET is especially useful
when designing and validating new protocols, or exploring new or exotic scenarios.

<p>INET supports a wide class of communication networks, including wired,
wireless, mobile, ad hoc and sensor networks.  It contains models for
the Internet stack (TCP, UDP, IPv4, IPv6, OSPF, BGP, etc.), link layer protocols
(Ethernet, PPP, IEEE 802.11, various sensor MAC protocols, etc),
refined support for the wireless physical layer, MANET routing protocols,
DiffServ, MPLS with LDP and RSVP-TE signalling, several application models,
and many other protocols and components. It also provides support for
node mobility, advanced visualization, network emulation and more.

<p>Several other simulation frameworks take INET as a base, and extend it
into specific directions, such as vehicular networks, overlay/peer-to-peer
networks, or LTE.

<p><h2><a name="sec:introduction:designed-for-experimentation"></a>1.2 Designed for Experimentation<a class="headerlink" href="#sec:introduction:designed-for-experimentation" title="Permalink to this headline">&para;</a></h2>

<p>INET is built around the concept of modules that communicate by message passing.
Agents and network protocols are represented by components, which can be freely
combined to form hosts, routers, switches, and other networking devices.
New components can be programmed by the user, and existing components have
been written so that they are easy to understand and modify.

<p>INET benefits from the infrastructure provided by OMNeT++. Beyond making
use of the services provided by the OMNeT++ simulation kernel and library
(component model, parameterization, result recording, etc.), this also means
that models may be developed, assembled, parameterized, run, and their
results evaluted from the comfort of the OMNeT++ Simulation IDE, or
from the command line.

<p>INET Framework is maintained by the OMNeT++ team for the community,
utilizing patches and new models contributed by members of the community.

<p><h2><a name="sec:introduction:scope-of-this-manual"></a>1.3 Scope of this Manual<a class="headerlink" href="#sec:introduction:scope-of-this-manual" title="Permalink to this headline">&para;</a></h2>

<p>This manual is written for users who are interested in assembling
simulations using the components provided by the INET Framework.
(In contrast, if you are interested in modifing INET's components or plan
to extend INET with new protocols or other components using C++,
we recommend the <i>INET Developers Guide</i>.)

<p>This manual does not attempt to be a reference for INET. It concentrates
on conveying the big picture, and does not attempt to cover all
components, or try to document the parameters, gates, statistics or
precise operation of individual components. For such information,
users should refer to the <i>INET Reference</i>, a web-based
cross-referenced documentation generated from NED and MSG files.

<p>A working knowledge of OMNeT++ is assumed.

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap2.html">Next</a> &#8226; <a href="toc.html#toc_1">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
