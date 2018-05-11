---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap12.html">Prev</a> &#8226; <a href="chap14.html">Next</a> &#8226; <a href="toc.html#toc_13">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:mpls"></a>13 The MPLS Models<a class="headerlink" href="#cha:mpls" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:mpls:overview"></a>13.1 Overview<a class="headerlink" href="#sec:mpls:overview" title="Permalink to this headline">&para;</a></h2>

<p>Multi-Protocol Label Switching (MPLS) is a &#8220;layer 2.5&#8221; protocol for
high-performance telecommunications networks. MPLS directs data from one network
node to the next based on numeric labels instead of network addresses, avoiding
complex lookups in a routing table and allowing traffic engineering.
The labels identify virtual links (label-switched paths or LSPs, also
called MPLS tunnels) between distant nodes rather than endpoints. The routers
that make up a label-switched network are called label-switching routers (LSRs)
inside the network (&#8220;transit nodes&#8221;), and label edge routers (LER) on the
edges of the network (&#8220;ingress&#8221; or &#8220;egress&#8221; nodes).

<p>A fundamental MPLS concept is that two LSRs must agree on the meaning of the
labels used to forward traffic between and through them.
This common understanding is achieved by using signaling protocols by which one
LSR informs another of label bindings it has made. Such signaling protocols are
also called label distribution protocols. The two main label distribution
protocols used with MPLS are LDP and RSVP-TE.

<p>INET provides basic support for building MPLS simulations. It provides models
for the MPLS, LDP and RSVP-TE protocols and their associated data structures,
and preassembled MPLS-capable router models.

<p><h2><a name="sec:mpls:core-modules"></a>13.2 Core Modules<a class="headerlink" href="#sec:mpls:core-modules" title="Permalink to this headline">&para;</a></h2>

<p>The core modules are:

<p><ul>
  <li> <tt>Mpls</tt> implements the MPLS protocol</li>
  <li> <tt>LibTable</tt> holds the LIB (Label Information Base)</li>
  <li> <tt>Ldp</tt> implements the LDP signaling protocol for MPLS</li>
  <li> <tt>RsvpTe</tt> implements the RSVP-TE signaling protocol for MPLS</li>
  <li> <tt>Ted</tt> contains the Traffic Engineering Database</li>
  <li> <tt>LinkStateRouting</tt> is a simple link-state routing protocol</li>
  <li> <tt>SimpleClassifier</tt> is a configurable ingress classifier for MPLS</li>
</ul>

<p><h3><a name="sec:mpls:mpls"></a>13.2.1 Mpls<a class="headerlink" href="#sec:mpls:mpls" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Mpls</tt> module implements the MPLS protocol. MPLS is situated between
layer 2 and 3, and its main function is to switch packets based on their labels.
For that, it relies on the data structure called LIB (Label Information Base).
LIB is fundamentally a table with the following columns: <i>input-interface</i>,
<i>input-label</i>, <i>output-interface</i>, <i>label-operation(s)</i>.

<p>Upon receiving a labelled packet from another LSR, MPLS first extracts the
incoming interface and incoming label pair, and then looks it up in local LIB.
If a matching entry is found, it applies the prescribed label operations, and
forwards the packet to the output interface.

<p>Label operations can be the following:

<p><ul>
  <li> <i>Push</i> adds a new MPLS label to a packet. (A packet may
     contain multiple labels, acting as a stack.) When a normal IP packet
     enters an LSP, the new label will be the first label on the packet.</li>
  <li> <i>Pop</i> removes the topmost MPLS label from a packet.
     This is typically done at either the penultimate or the egress router.</li>
  <li> <i>Swap</i>: Replaces the topmost label with a new label.</li>
</ul>

<p>In INET, the local LIB is stored in a <tt>LibTable</tt> module in the router.

<p>Upon receiving an unlabelled (e.g. plain IPv4) packet, MPLS first determines the
forwarding equivalence class (FEC) for the packet using an ingress classifier,
and then inserts one or more labels in the packet's newly created MPLS header.
The packet is then passed on to the next hop router for the LSP.

<p>The ingress classifier is also a separate module; it is selected depending
on the choice of the signaling protocol.

<p>
<h3><a name="sec:mpls:libtable"></a>13.2.2 LibTable<a class="headerlink" href="#sec:mpls:libtable" title="Permalink to this headline">&para;</a></h3>

<p><tt>LibTable</tt> stores the LIB (Label Information Base), as described
in the previous section. <tt>LibTable</tt> is expected to have one instance
in the router.

<p>LIB is normally filled and maintained by label distribution protocols (RSVP-TE,
LDP), but in INET it is possible to preload it with initial contents.

<p>The <tt>LibTable</tt> module accepts an XML config file whose structure
follows the contents of the LIB table. An example configuration:

<p><pre><code data-language="xml">&lt;libtable&gt;
    &lt;libentry&gt;
        &lt;inLabel&gt;203&lt;/inLabel&gt;
        &lt;inInterface&gt;ppp1&lt;/inInterface&gt;
        &lt;outInterface&gt;ppp2&lt;/outInterface&gt;
        &lt;outLabel&gt;
            &lt;op code="pop"/&gt;
            &lt;op code="swap" value="200"/&gt;
            &lt;op code="push" value="300"/&gt;
        &lt;/outLabel&gt;
        &lt;color&gt;200&lt;/color&gt;
    &lt;/libentry&gt;
&lt;/libtable&gt;</code></pre>
<p>There can be multiple <tt>&lt;libentry&gt;</tt> elements, each describing a row in the
table. Colums are given as child elements: <tt>&lt;inLabel&gt;</tt>, <tt>&lt;inInterface&gt;</tt>,
etc. The <tt>&lt;color&gt;</tt> element is optional, and it only exists to be able to
color LSPs on the GUI. It is not used by the protocols.

<p><h3><a name="sec:mpls:ldp"></a>13.2.3 Ldp<a class="headerlink" href="#sec:mpls:ldp" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Ldp</tt> module implements the Label Distribution Protocol (LDP).
LDP is used to establish LSPs in an MPLS network when traffic engineering is not
required. It establishes LSPs that follow the existing IP routing table, and is
particularly well suited for establishing a full mesh of LSPs between all of the
routers on the network.

<p>LDP relies on the underlying routing information provided by a routing protocol
in order to forward label packets. The router's forwarding information base, or
FIB, is responsible for determining the hop-by-hop path through the network.

<p>In INET, the <tt>Ldp</tt> module takes routing information from <tt>Ted</tt>
module. The <tt>Ted</tt> instance in the network is filled and maintained
by a <tt>LinkStateRouting</tt> module. Unfortunately, it is currently not
possible to use other routing protocol implementations such as <tt>Ospf</tt>
in conjunction with <tt>Ldp</tt>.

<p>When <tt>Ldp</tt> is used as signaling protocol, it also serves as ingress
classifier for <tt>Mpls</tt>.

<p><h3><a name="sec:mpls:ted"></a>13.2.4 Ted<a class="headerlink" href="#sec:mpls:ted" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Ted</tt> module contains the Traffic Engineering Database (TED).
In INET, <tt>Ted</tt> contains a link state database, including reservations
for each link by RSVP-TE.

<p><h3><a name="sec:mpls:linkstaterouting"></a>13.2.5 LinkStateRouting<a class="headerlink" href="#sec:mpls:linkstaterouting" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>LinkStateRouting</tt> module provides a simple link state routing
protocol. It uses <tt>Ted</tt> as its link state database. Unfortunately, the
<tt>LinkStateRouting</tt> module cannot operate independently, it can only be
used inside an MPLS router.

<p> <h3><a name="sec:mpls:rsvpte"></a>13.2.6 RsvpTe<a class="headerlink" href="#sec:mpls:rsvpte" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>RsvpTe</tt> module implements RSVP-TE (Resource Reservation Protocol --
Traffic Engineering), as signaling protocol for MPLS. RSVP-TE handles bandwidth
allocation and allows traffic engineering across an MPLS network. Like LDP, RSVP
uses discovery messages and advertisements to exchange LSP path information
between all hosts. However, whereas LDP is restricted to using the configured
IGP's shortest path as the transit path through the network, RSVP can take
taking into consideration network constraint parameters such as available
bandwidth and explicit hops. RSVP uses a combination of the Constrained Shortest
Path First (CSPF) algorithm and Explicit Route Objects (EROs) to determine how
traffic is routed through the network.

<p>When <tt>RsvpTe</tt> is used as signaling protocol, <tt>Mpls</tt> needs a
separate ingress classifier module, which is usually a <tt>SimpleClassifier</tt>.

<p>The <tt>RsvpTe</tt> module allows LSPs to be specified statically in an XML
config file. An example <tt>traffic.xml</tt> file:

<p><pre><code data-language="xml">&lt;sessions&gt;
    &lt;session&gt;
        &lt;endpoint&gt;host3&lt;/endpoint&gt;
        &lt;tunnel_id&gt;1&lt;/tunnel_id&gt;
        &lt;paths&gt;
            &lt;path&gt;
                &lt;lspid&gt;100&lt;/lspid&gt;
                &lt;bandwidth&gt;100000&lt;/bandwidth&gt;
                &lt;route&gt;
                    &lt;node&gt;10.1.1.1&lt;/node&gt;
                    &lt;lnode&gt;10.1.2.1&lt;/lnode&gt;
                    &lt;node&gt;10.1.4.1&lt;/node&gt;
                    &lt;node&gt;10.1.5.1&lt;/node&gt;
                &lt;/route&gt;
                &lt;permanent&gt;true&lt;/permanent&gt;
                &lt;color&gt;100&lt;/color&gt;
            &lt;/path&gt;
        &lt;/paths&gt;
    &lt;/session&gt;
&lt;/sessions&gt;</code></pre>
<p>In the route, <tt>&lt;node&gt;</tt> stands for strict hop, and <tt>&lt;lnode&gt;</tt> for loose hop.

<p>Paths can also be set up and torn down dynamically with <tt>ScenarioManager</tt>
commands (see chapter <a href="chap26.html#cha:scenario-scripting">[26]</a>).
<tt>RsvpTe</tt> understands the <tt>&lt;add-session&gt;</tt> and <tt>&lt;del-session&gt;</tt>
<tt>ScenarioManager</tt> commands. The contents of the <tt>&lt;add-session&gt;</tt>
element can be the same as the <tt>&lt;session&gt;</tt> element for the <tt>traffic.xml</tt>
above. The <tt>&lt;del-command&gt;</tt> element syntax is also similar, but only
<tt>&lt;endpoint&gt;</tt>, <tt>&lt;tunnel_id&gt;</tt> and <tt>&lt;lspid&gt;</tt> need to be specified.

<p>The following is an example <tt>scenario.xml</tt> file:

<p><pre><code data-language="xml">&lt;scenario&gt;
    &lt;at t="2"&gt;
        &lt;add-session module="LSR1.rsvp"&gt;
            &lt;endpoint&gt;10.2.1.1&lt;/endpoint&gt;
            &lt;tunnel_id&gt;1&lt;/tunnel_id&gt;
            &lt;paths&gt;
                ...
            &lt;/paths&gt;
        &lt;/add-session&gt;
    &lt;/at&gt;
    &lt;at t="2.4"&gt;
        &lt;del-session module="LSR1.rsvp"&gt;
            &lt;endpoint&gt;10.2.1.1&lt;/endpoint&gt;
            &lt;tunnel_id&gt;1&lt;/tunnel_id&gt;
            &lt;paths&gt;
                &lt;path&gt;
                    &lt;lspid&gt;100&lt;/lspid&gt;
                &lt;/path&gt;
            &lt;/paths&gt;
        &lt;/del-session&gt;
    &lt;/at&gt;
&lt;/scenario&gt;</code></pre>
<p><h2><a name="sec:mpls:classifier"></a>13.3 Classifier<a class="headerlink" href="#sec:mpls:classifier" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>RsvpClassifier</tt> module implements an ingress classifier for
<tt>Mpls</tt> when using <tt>RsvpTe</tt> for signaling. The classifier can be
configured with an XML config file.

<pre><code data-language="ini">**.classifier.config = xmldoc("fectable.xml");</code></pre><p>
An example <tt>fectable.xml</tt> file:

<p><pre><code data-language="xml">&lt;fectable&gt;
    &lt;fecentry&gt;
        &lt;id&gt;1&lt;/id&gt;
        &lt;destination&gt;host5&lt;/destination&gt;
        &lt;source&gt;host1&lt;/source&gt;
        &lt;tunnel_id&gt;1&lt;/tunnel_id&gt;
        &lt;lspid&gt;100&lt;/lspid&gt;
    &lt;/fecentry&gt;
&lt;/fectable&gt;</code></pre><h2><a name="sec:mpls:mpls-enabled-router-models"></a>13.4 MPLS-Enabled Router Models<a class="headerlink" href="#sec:mpls:mpls-enabled-router-models" title="Permalink to this headline">&para;</a></h2>

<p>INET provides the following pre-assembled MPLS routers:

<p><ul>
  <li> <tt>LdpMplsRouter</tt> is an MPLS router with the LDP signaling protocol</li>
  <li> <tt>RsvpMplsRouter</tt> is an MPLS router with the RSVP-TE signaling protocol</li>
</ul>



<hr class='pgbr'><div class='oppnavbar'><a href="chap12.html">Prev</a> &#8226; <a href="chap14.html">Next</a> &#8226; <a href="toc.html#toc_13">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
