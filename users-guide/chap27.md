---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap26.html">Prev</a> &#8226; <a href="chap28.html">Next</a> &#8226; <a href="toc.html#toc_27">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:lifecycle"></a>27 Modeling Node Failures<a class="headerlink" href="#cha:lifecycle" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:lifecycle:overview"></a>27.1 Overview<a class="headerlink" href="#sec:lifecycle:overview" title="Permalink to this headline">&para;</a></h2>

<p>Simulation is often used to study the effects of unexpected events like
a router crash on the network. In order to accommodate such scenarios, INET
supports <i>lifecycle modeling</i> of network nodes. The up/down
status of a node is changed via lifecycle operations.

<p>INET supports the following lifecycle operations:

<p><ul>
  <li> <i>Startup</i> represents the process of booting up or starting
    a network node after a shutdown or crash operation.</li>
  <li> <i>Shutdown</i> represents the process of orderly shutting down
    a network node.</li>
  <li> <i>Crash</i> represents the process of crashing a network node.
    The difference between <i>crash</i> and <i>shutdown</i> is that
    for a crash, the network node will not do a graceful shutdown (e.g.
    routing protocols will not have a chance of notifying peers about
    broken routes).</li>
</ul>

<p>In a real-life router or other network node, a crash or shutdown and
subsequent restart affects all parts of the system. All non-persistent
information is lost. Protocol states are reset, various tables are cleared,
connections are broken or torn down, applications restart, and so on.

<p>Mimicking this behavior in simulation does not come for free, it
needs to be explicitly programmed into each affected component.
Here are some examples how INET components react to a <i>crash</i>
lifecycle event:

<p><ul>
  <li> <tt>Tcp</tt> forgets all open connections and sockets</li>
  <li> <tt>Ipv4</tt> clears the fragmentation reassembly buffers and pending packets</li>
  <li> <tt>Ipv4RoutingTable</tt> clears the route table</li>
  <li> <tt>EtherMac</tt> and other MAC protocols clear their queues and reset their state
    associated with the current transmission(s)  %TODO or at least they are supposed to do that</li>
  <li> <tt>Ospf</tt> clears its full state</li>
  <li> <tt>UdpBasicApp</tt>, <tt>TcpSessionApp</tt> and other applications
    reset their state and stop/restart their timers</li>
  <li> <tt>EtherSwitch</tt>, <tt>AccessPoint</tt>, and other L2 bridging
    devices clear their MAC address tables</li>
</ul>

<p>While down, network interfaces, and components in general, ignore (discard)
messages sent to them.

<p>Lifecycle operations are currently instanteneous, i.e. they complete in
zero simulation time. The underlying framework would allow for modeling
them as processes that take place in some finite (nonzero) simulation time,
but this possibility is currently not in use.

<p>It also is possible to simulate a crash or shutdown of part of a node
(certain protocols or interfaces only). Such scenarios would correspond
to e.g. the crash of an OSPF daemon on a real OS.

<p>Some energy-related INET components trigger node shutdown or crash under certain
conditions. For example, a node will crash when it runs out of power (e.g. its
battery depletes); see the chapter on power consumption modeling <a href="chap23.html#cha:power">[23]</a>
for details.

<p>In the following sections we outline the INET components that
participate in lifecycle modeling, and show a usage example.

<p><h2><a name="sec:lifecycle:nodestatus"></a>27.2 NodeStatus<a class="headerlink" href="#sec:lifecycle:nodestatus" title="Permalink to this headline">&para;</a></h2>

<p>Node models contain a <tt>NodeStatus</tt> module that keeps track of
the status of the node (up, down, etc.) for other modules, and also
displays it in the GUI as a small overlay icon.

<p>The <tt>NodeStatus</tt> module is declared conditionally (so that it is
only created in simulations that need it), like this:

<pre><code data-language="ned">status: NodeStatus if hasStatus;</code></pre><p>
If lifecycle modeling is required, the following line must be added
to the ini file to ensure that nodes have status modules:

<pre><code data-language="ini">**.hasStatus = true</code></pre><p>
<h2><a name="sec:lifecycle:scripting"></a>27.3 Scripting<a class="headerlink" href="#sec:lifecycle:scripting" title="Permalink to this headline">&para;</a></h2>

<p>Lifecycle operations can be triggered from C++ code, or from scripts.
INET supports scripting via the <tt>ScenarioManager</tt> NED type,
described in chapter <a href="chap26.html#cha:scenario-scripting">[26]</a>.
Here is an example script that shuts down a router at simulation
time 2s, and starts it up a again at time 8s:

<p><pre><code data-language="xml">&lt;scenario&gt;
  &lt;initiate t="2s" module="Router2" operation="shutdown"/&gt;
  &lt;initiate t="8s" module="Router2" operation="startup"/&gt;
&lt;/scenario&gt;</code></pre>
<p>The <tt>module</tt> attribute should point to the module (host, router,
network interface, protocol, etc.) to be operated on.
The <tt>operation</tt> attribute should contain the operation to perform:
<tt>"shutdown"</tt>, <tt>"crash"</tt>, or <tt>"startup"</tt>.
<tt>t</tt> is the simulation time the operation should be initiated at.

<p>An alternative, shorter form is to use <tt>&lt;shutdown&gt;</tt> /
<tt>&lt;crash&gt;</tt> / <tt>&lt;startup&gt;</tt> elements instead of the
<tt>operation</tt> attribute:

<p><pre><code data-language="xml">&lt;scenario&gt;
  &lt;shutdown t="2s" module="Router2"/&gt;
  &lt;startup  t="8s" module="Router2"/&gt;
&lt;/scenario&gt;</code></pre>
<p>

<p>



<hr class='pgbr'><div class='oppnavbar'><a href="chap26.html">Prev</a> &#8226; <a href="chap28.html">Next</a> &#8226; <a href="toc.html#toc_27">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
