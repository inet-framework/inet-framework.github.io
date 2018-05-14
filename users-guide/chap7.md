---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap6.html">Prev</a> &#8226; <a href="chap8.html">Next</a> &#8226; <a href="toc.html#toc_7">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:transport-protocols"></a>7 Transport Protocols<a class="headerlink" href="#cha:transport-protocols" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:transport:overview"></a>7.1 Overview<a class="headerlink" href="#sec:transport:overview" title="Permalink to this headline">&para;</a></h2>

<p>In the OSI reference model, the protocols of the transport layer provide
host-to-host communication services for applications. They provide services such
as connection-oriented communication, reliability, flow control, and
multiplexing.

<p>INET currently provides support for the TCP, UDP, SCTP and RTP transport layer
protocols. INET nodes like <tt>StandardHost</tt> contain optional and
replaceable instances of these protocols, like this:

<pre><code data-language="ned">tcp: &lt;tcpType&gt; like ITcp if hasTcp;
udp: &lt;udpType&gt; like IUdp if hasUdp;
sctp: &lt;sctpType&gt; like ISctp if hasSctp;</code></pre><p>
As RTP is more specialized that the other ones (multimedia streaming), INET
provides a separate node type, <tt>RtpHost</tt>, for modeling RTP traffic.

<p><h2><a name="sec:transport:tcp"></a>7.2.2 7.2 TCP<a class="headerlink" href="#sec:transport:tcp" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:transport:tcp-overview"></a>7.2.1 Overview<a class="headerlink" href="#sec:transport:tcp-overview" title="Permalink to this headline">&para;</a></h3>

<p>TCP protocol is the most widely used protocol of the Internet. It provides
reliable, ordered delivery of stream of bytes from one application on one
computer to another application on another computer. The baseline TCP protocol
is described in RFC793, but other tens of RFCs contains modifications and
extensions to the TCP. As a result, TCP is a complex protocol and sometimes it
is hard to see how the different requirements interact with each other.

<p>INET contains three implementations of the TCP protocol:

<p><ul>
  <li> <tt>Tcp</tt> is the primary implementation, designed for readability,
    extensibility, and experimentation.</li>
  <li> <tt>TcpLwip</tt> is a wrapper around the lwIP (Lightweight IP) library,
    a widely used open source TCP/IP stack designed for embedded systems.</li>
  <li> <tt>TcpNsc</tt> wraps Network Simulation Cradle (NSC), a library
    that allows real world TCP/IP network stacks to be used inside a
    network simulator.</li>
</ul>

<p>All three module types implement the <tt>ITcp</tt> interface and communicate
with other layers through the same interface, so they can be interchanged and
also mixed in the same network.

<p>
<h3><a name="sec:transport:tcp"></a>7.2.2 7.2 Tcp<a class="headerlink" href="#sec:transport:tcp" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>Tcp</tt> simple module is the main implementation of the TCP protocol
in the INET framework.

<p><tt>Tcp</tt> implements the following:

<p><ul>
  <li> TCP state machine</li>
  <li> initial sequence number selection according to the system clock.</li>
  <li> window-based flow control</li>
  <li> Window Scale option</li>
  <li> Persistence timer</li>
  <li> Keepalive timer</li>
  <li> Transmission policies</li>
  <li> RTT measurement for retransmission timeout (RTO) computation</li>
  <li> Delayed ACK algorithm</li>
  <li> Nagle's algorithm</li>
  <li> Silly window avoidance</li>
  <li> Timestamp option</li>
  <li> Congestion control schemes: Tahoe, Reno, New Reno, Westwood, Vegas, etc.</li>
  <li> Slow Start and Congestion Avoidance</li>
  <li> Fast Retransmit and Fast Recovery</li>
  <li> Loss Recovery Using Limited Transmit</li>
  <li> Selective Acknowledgments (SACK)</li>
  <li> SACK based loss recovery</li>
</ul>

<p>Several protocol features can be turned on/off with parameters like
<tt>delayedAcksEnabled</tt>, <tt>nagleEnabled</tt>, <tt>limitedTransmitEnabled</tt>,
<tt>increasedIWEnabled</tt>, <tt>sackSupport</tt>, <tt>windowScalingSupport</tt>, or
<tt>timestampSupport</tt>.

<p>The congestion control algorithm can be selected with the <tt>tcpAlgorithmClass</tt>
parameter. For example, the following ini file fragment selects TCP Vegas:

<pre><code data-language="ini">**.tcp.tcpAlgorithmClass = "TcpVegas"</code></pre><p>
Values like <tt>"TcpVegas"</tt> name C++ classes. Indeed, <tt>Tcp</tt> can be
extended with new congestion control schemes by implementing and registering
them in C++.

<p>

<p><h3><a name="sec:transport:tcplwip"></a>7.2.3 TcpLwip<a class="headerlink" href="#sec:transport:tcplwip" title="Permalink to this headline">&para;</a></h3>

<p><i>lwIP</i> is a light-weight implementation of the TCP/IP protocol suite
that was originally written by Adam Dunkels of the Swedish Institute of
Computer Science. The current development homepage is
<a href="http://savannah.nongnu.org/projects/lwip/">http://savannah.nongnu.org/projects/lwip/</a>.

<p>The implementation targets embedded devices: it has very limited resource usage
(it works &#8220;with tens of kilobytes of RAM and around 40 kilobytes of ROM&#8221;), and
does not require an underlying OS.

<p>The <tt>TcpLwip</tt> simple module is based on the 1.3.2 version of
the lwIP sources.

<p>Features:

<p><ul>
<li> delayed ACK</li>
<li> Nagle's algorithm</li>
<li> round trip time estimation</li>
<li> adaptive retransmission timeout</li>
<li> SWS avoidance</li>
<li> slow start threshold</li>
<li> fast retransmit</li>
<li> fast recovery</li>
<li> persist timer</li>
<li> keep-alive timer</li>
</ul>

<p><b>Limitations</b>

<p><ul>
  <li> only MSS and TS TCP options are supported. The TS option is turned off
        by default, but can be enabled by defining LWIP_TCP_TIMESTAMPS to 1
        in <tt>lwipopts.h</tt>.</li>
  <li> <tt>fork</tt> must be <b><tt>true</tt></b> in the passive open command</li>
  <li> The status request command (TCP_C_STATUS) only reports the
          local and remote addresses/ports of the connection and
          the MSS, SND.NXT, SND.WND, SND.WL1, SND.WL2, RCV.NXT, RCV.WND variables.</li>
</ul>

<p><h3><a name="sec:transport:tcpnsc"></a>7.2.4 TcpNsc<a class="headerlink" href="#sec:transport:tcpnsc" title="Permalink to this headline">&para;</a></h3>

<p>Network Simulation Cradle (NSC) is a tool that allow real-world TCP/IP network stacks
to be used in simulated networks. The NSC project is created by Sam Jansen
and available on <a href="http://research.wand.net.nz/software/nsc.php">http://research.wand.net.nz/software/nsc.php</a>. NSC currently
contains Linux, FreeBSD, OpenBSD and lwIP network stacks, although on 64-bit
systems only Linux implementations can be built.

<p>To use the <tt>TcpNsc</tt> module you should download the
<tt>nsc-0.5.2.tar.bz2</tt> package and follow the instructions
in the <tt>&lt;inet_root&gt;/3rdparty/README</tt> file to build it.

<p><ul class="warning"><b>WARNING</b><br>
Before generating the INET module, check that the <i>opp_makemake</i> call
in the make file (<tt>&lt;inet_root&gt;/Makefile</tt>) includes the
<i>-DWITH_TCP_NSC</i> argument. Without this option the <tt>TcpNsc</tt>
module is not built. If you build the INET library from the IDE, it is enough
to enable the <i>TCP (NSC)</i> project feature.</li>
</ul>

<p><b>Parameters</b>

<p>The module has the following parameters:

<p><ul>
  <li> <tt>stackName</tt>: the name of the TCP implementation to be used.
    Possible values are: <tt>liblinux2.6.10.so</tt>, <tt>liblinux2.6.18.so</tt>,
    <tt>liblinux2.6.26.so</tt>, <tt>libopenbsd3.5.so</tt>, <tt>libfreebsd5.3.so</tt> and
    <tt>liblwip.so</tt>. (On the 64 bit systems, the <tt>liblinux2.6.26.so</tt> and
    <tt>liblinux2.6.16.so</tt> are available only).</li>
  <li> <tt>stackBufferSize</tt>: the size of the receive and send buffer of
    one connection for selected TCP implementation.
    The NSC sets the <tt>wmem_max</tt>, <tt>rmem_max</tt>, <tt>tcp_rmem</tt>, <tt>tcp_wmem</tt>
    parameters to this value on linux TCP implementations. For details, you can see
    the NSC documentation.</li>
</ul>

<p><b>Limitations</b>

<p><ul>
  <li> Because the kernel code is not reentrant, NSC creates a record containing
    the global variables of the stack implementation. By default there is room
    for 50 instance in this table, so you can not create more then 50 instance
    of <tt>TcpNsc</tt>. You can increase the <tt>NUM_STACKS</tt> constant
    in <tt>num_stacks.h</tt> and recompile NSC to overcome this limitation.</li>
  <li> The <tt>TcpNsc</tt> module does not supprt TCP_TRANSFER_OBJECT
    data transfer mode.</li>
  <li> The MTU of the network stack fixed to 1500, therefore MSS is 1460.</li>
  <li> TCP_C_STATUS command reports only local/remote addresses/ports and
    current window of the connection.</li>
</ul>

<p><h2><a name="sec:transport:udp"></a>7.3 UDP<a class="headerlink" href="#sec:transport:udp" title="Permalink to this headline">&para;</a></h2>

<p>The UDP protocol is a very simple datagram transport protocol, which
basically makes the services of the network layer available to the applications.
It performs packet multiplexing and demultiplexing to ports and some basic
error detection only.

<p>The <tt>Udp</tt> simple module implements the UDP protocol.
There is a module interface (<tt>IUdp</tt>) that defines the gates of the
<tt>Udp</tt> component. In the <tt>StandardHost</tt> node, the UDP component
can be any module implementing that interface.

<p>
<h2><a name="sec:transport:sctp"></a>7.4 SCTP<a class="headerlink" href="#sec:transport:sctp" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Sctp</tt> module implements the Stream Control Transmission Protocol
(SCTP). Like TCP, SCTP provides reliable ordered data delivery over an ureliable
network. The most prominent feature of SCTP is the capability of transmitting
multiple streams of data at the same time between two end points that have
established a connection.

<p><h2><a name="sec:transport:rtp"></a>7.5 RTP<a class="headerlink" href="#sec:transport:rtp" title="Permalink to this headline">&para;</a></h2>

<p>The Real-time Transport Protocol (RTP) is a transport layer protocol for
delivering audio and video over IP networks. RTP is used extensively in
communication and entertainment systems that involve streaming media, such as
telephony, video teleconference applications including WebRTC, television
services and web-based push-to-talk features.

<p>The RTP Control Protocol (RTCP) is a sister protocol of the Real-time Transport
Protocol (RTP). RTCP provides out-of-band statistics and control information for
an RTP session.

<p>INET provides the following modules:

<p><ul>
  <li> <tt>Rtp</tt> implements the RTP protocol</li>
  <li> <tt>Rtcp</tt> implements the RTCP protocol</li>
</ul>


<hr class='pgbr'><div class='oppnavbar'><a href="chap6.html">Prev</a> &#8226; <a href="chap8.html">Next</a> &#8226; <a href="toc.html#toc_7">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
