---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap13.html">Prev</a> &#8226; <a href="chap15.html">Next</a> &#8226; <a href="toc.html#toc_14">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:ppp"></a>14 Point-to-Point Links<a class="headerlink" href="#cha:ppp" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:ppp:overview"></a>14.1 Overview<a class="headerlink" href="#sec:ppp:overview" title="Permalink to this headline">&para;</a></h2>

<p>For simulating wired point-to-point links, the INET Framework contains
a minimal implementation of the PPP protocol and a corresponding network
interface module.

<p><ul>
  <li> <tt>Ppp</tt> is a simple module that performs encapsulation
    of network datagrams into PPP frames and decapsulation of
    the incoming PPP frames. It can be connected to the network
    layer directly or can be configured to get the outgoing messages
    from an output queue. The module collects statistics about
    the transmitted and dropped packages.</li>
  <li> <tt>PppInterface</tt> is a compound module that complements
    the <tt>Ppp</tt> module with an output queue. It implements
    the <tt>IWiredInterface</tt> interface. Input and output hooks
    can be configured for further processing of the network messages.</li>
</ul>

<p>PPP (RFC 1661) is a complex protocol which, in addition to providing
a method for encapsulating multi-protocol datagrams, also contains
control protocols for establishing, configuring, and testing the data-link
connection (LCP) and for configuring different network-layer protocols (NCP).

<p>The INET implementation only covers encapsulation and decapsulation of
data into PPP frames. Control protocols, which do not have a significant
effect on the links' capacity and latency during normal link operation,
are not simulated. In addition, header field compressions (PFC and ACFC)
are also bot supported, so a simulated PPP frame always contains 1-byte
Address and Control fields and a 2-byte Protocol field.

<p>
<h2><a name="sec:ppp:the-ppp-module"></a>14.2 The PPP module<a class="headerlink" href="#sec:ppp:the-ppp-module" title="Permalink to this headline">&para;</a></h2>

<p>The PPP module receives packets from the upper layer in the <tt>netwIn</tt>
gate, encapsulates them into <tt>PppFrame</tt>s, and send it to the
physical layer through the <tt>phys</tt> gate. The <tt>PppFrame</tt>s
received from the <tt>phys</tt> gate are decapsulated and sent to the upper
layer immediately through the <tt>netwOut</tt> gate.

<p>Incoming datagrams are waiting in a queue if the line is currently busy.
In routers, PPP relies on an external queue module (implementing
<tt>IOutputQueue</tt>) to model finite buffer, implement QoS and/or RED,
and requests packets from this external queue one-by-one. The name
of this queue is given as the <tt>queueModule</tt> parameter.

<p>In hosts, no such queue is used, so <tt>Ppp</tt> contains an internal
queue named txQueue to queue up packets wainting for transmission.
Conceptually txQueue is of inifinite size, but for better diagnostics
one can specify a hard limit in the <tt>txQueueLimit</tt> parameter -- if
this is exceeded, the simulation stops with an error.

<p>The module can be used in simulations where the nodes are connected and
disconnected dinamically. If the channel between the PPP modules is down,
the messages received from the upper layer are dropped (including the messages
waiting in the queue). When the connection is restored it will
poll the queue and transmits the messages again.

<p>The PPP module registers itself in the interface table of the node.
The <tt>mtu</tt> of the entry can be specified by the
<tt>mtu</tt> module parameter. The module checks the state of the physical link
and updates the entry in the interface table.

<p><h2><a name="sec:ppp:pppinterface"></a>14.3 PppInterface<a class="headerlink" href="#sec:ppp:pppinterface" title="Permalink to this headline">&para;</a></h2>

<p><tt>PppInterface</tt> is a compound module that implements the
<tt>IWiredInterface</tt> interface. It contains a <tt>Ppp</tt>
module and a passive queue for the messages received from the network layer.

<p>The queue type is specified by the <tt>queueType</tt> parameter.
It can be set to <tt>NoQueue</tt> or to a module type implementing
the <tt>IOutputQueue</tt> interface. There are implementations
with QoS and RED support.

<p>In typical use of the <tt>Ppp</tt> module it is augmented with other nodes
that monitor the traffic or simulate package loss and duplication.
The <tt>PppInterface</tt> module abstract that usage by adding
<tt>IHook</tt> components to the network input and output of the
<tt>Ppp</tt> component. Any number of hook can be added by
specifying the <tt>numOutputHooks</tt> and <tt>numInputHooks</tt>
parameters and the types of the <tt>outputHook</tt> and <tt>inputHook</tt>
components. The hooks are chained in their numeric order.

<p>


<p><hr class='pgbr'><div class='oppnavbar'><a href="chap13.html">Prev</a> &#8226; <a href="chap15.html">Next</a> &#8226; <a href="toc.html#toc_14">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
