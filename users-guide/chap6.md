---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap5.html">Prev</a> &#8226; <a href="chap7.html">Next</a> &#8226; <a href="toc.html#toc_6">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:apps"></a>6 Applications<a class="headerlink" href="#cha:apps" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:apps:overview"></a>6.1 Overview<a class="headerlink" href="#sec:apps:overview" title="Permalink to this headline">&para;</a></h2>

<p>This chapter describes application models and traffic generators.
All applications implement the <tt>IApp</tt> module interface
to ease configuring the <tt>StandardHost</tt> module.

<p><h2><a name="sec:apps:tcp-applications"></a>6.2 TCP applications<a class="headerlink" href="#sec:apps:tcp-applications" title="Permalink to this headline">&para;</a></h2>

<p>This sections describes the applications using the TCP protocol.
These applications use <tt>GenericAppMsg</tt> objects to represent the data
sent between the client and server. The client message contains the expected
reply length, the processing delay, and a flag indicating that the connection
should be closed after sending the reply. This way intelligence (behaviour
specific to the modelled application, e.g. HTTP, SMB, database protocol) needs
only to be present in the client, and the server model can be kept simple and
dumb.

<p>
<h3><a name="sec:apps:tcpbasicclientapp"></a>6.2.1 TcpBasicClientApp<a class="headerlink" href="#sec:apps:tcpbasicclientapp" title="Permalink to this headline">&para;</a></h3>

<p>Client for a generic request-response style protocol over TCP.
May be used as a rough model of HTTP or FTP users.

<p>The model communicates with the server in sessions. During a session,
the client opens a single TCP connection to the server, sends several
requests (always waiting for the complete reply to arrive before
sending a new request), and closes the connection.

<p>The server app should be <tt>TcpGenericServerApp</tt>; the model sends
<tt>GenericAppMsg</tt> messages.

<p>Example settings:

<p>FTP:

<pre><code data-language="ini">numRequestsPerSession = exponential(3)
requestLength = truncnormal(20,5)
replyLength = exponential(1000000)</code></pre><p>
HTTP:

<pre><code data-language="ini">numRequestsPerSession = 1 # HTTP 1.0
numRequestsPerSession = exponential(5)  # HTTP 1.1, with keepalive
requestLength = truncnormal(350,20)
replyLength = exponential(2000)</code></pre><p>
Note that since most web pages contain images and may contain frames,
applets etc, possibly from various servers, and browsers usually download
these items in parallel to the main HTML document, this module cannot
serve as a realistic web client.

<p>Also, with HTTP 1.0 it is the server that closes the connection after
sending the response, while in this model it is the client.

<p><h3><a name="sec:apps:tcpsinkapp"></a>6.2.2 TcpSinkApp<a class="headerlink" href="#sec:apps:tcpsinkapp" title="Permalink to this headline">&para;</a></h3>

<p>Accepts any number of incoming TCP connections, and discards whatever
arrives on them.

<p><h3><a name="sec:apps:tcpgenericserverapp"></a>6.2.3 TcpGenericServerApp<a class="headerlink" href="#sec:apps:tcpgenericserverapp" title="Permalink to this headline">&para;</a></h3>

<p>Generic server application for modelling TCP-based request-reply style
protocols or applications.

<p>The module accepts any number of incoming TCP connections, and expects
to receive messages of class <tt>GenericAppMsg</tt> on them. A message should
contain how large the reply should be (number of bytes). <tt>TcpGenericServerApp</tt>
will just change the length of the received message accordingly, and send
back the same message object. The reply can be delayed by a constant time
(<tt>replyDelay</tt> parameter).

<p><h3><a name="sec:apps:tcpechoapp"></a>6.2.4 TcpEchoApp<a class="headerlink" href="#sec:apps:tcpechoapp" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>TcpEchoApp</tt> application accepts any number of incoming TCP
connections, and sends back the data that arrives on them, The byte counts are
multiplied by <tt>echoFactor</tt> before echoing. The reply can also be delayed by
a constant time (<tt>echoDelay</tt> parameter).

<p><h3><a name="sec:apps:tcpsessionapp"></a>6.2.5 TcpSessionApp<a class="headerlink" href="#sec:apps:tcpsessionapp" title="Permalink to this headline">&para;</a></h3>

<p>Single-connection TCP application: it opens a connection, sends the given number
of bytes, and closes. Sending may be one-off, or may be controlled by a
&#8220;script&#8221; which is a series of (time, number of bytes) pairs. May act either as
client or as server. Compatible with both IPv4 and IPv6.

<p><b>Opening the connection</b>

<p>Depending on the type of opening the connection (active/passive), the
application may be either a client or a server. In passive mode,
the application will listen on the given local local port, and wait for an
incoming connection. In active mode, the application will bind
to given local local address and local port, and connect to the
given address and port. It is possible to use an ephemeral port as
local port.

<p>Even when in server mode (passive open), the application will only
serve one incoming connection. Further connect attempts will be
refused by TCP (it will send RST) for lack of LISTENing connections.

<p>The time of opening the connection is in the <tt>tOpen</tt> parameter.

<p><b>Sending data</b>

<p>Regardless of the type of OPEN, the application can be made to send
data. One way of specifying sending is via the <tt>tSend</tt>, <tt>sendBytes</tt>
parameters, the other way is <tt>sendScript</tt>. With the former,
<tt>sendBytes</tt> bytes will be sent at <tt>tSend</tt>. When using
<tt>sendScript</tt>, the format of the script is:


&lt;time&gt; &lt;numBytes&gt;; &lt;time&gt; &lt;numBytes&gt;;...

<p>
<b>Closing the connection</b>

<p>The application will issue a TCP CLOSE at time <tt>tClose</tt>. If
<tt>tClose=-1</tt>, no CLOSE will be issued.

<p>

<p><h3><a name="sec:apps:telnetapp"></a>6.2.6 TelnetApp<a class="headerlink" href="#sec:apps:telnetapp" title="Permalink to this headline">&para;</a></h3>

<p>Models Telnet sessions with a specific user behaviour.
The server app should be <tt>TcpGenericServerApp</tt>.

<p>In this model the client repeats the following activity
between <tt>startTime</tt> and <tt>stopTime</tt>:

<p><ol>
<li> Opens a telnet connection</li>
<li> Sends <tt>numCommands</tt> commands. The command is <tt>commandLength</tt> bytes long.
      The command is transmitted as entered by the user character by character,
      there is <tt>keyPressDelay</tt> time between the characters. The server echoes
      each character. When the last character of the command is sent (new line),
      the server responds with a <tt>commandOutputLength</tt> bytes long message.
      The user waits <tt>thinkTime</tt> interval between the commands.</li>
<li> Closes the connection and waits <tt>idleInterval</tt> seconds</li>
<li> If the connection is broken, it is noticed after <tt>reconnectInterval</tt>
      and the connection is reopened</li>
</ol>

<p>Each parameter in the above description is &#8220;volatile&#8221;, so you can
use distributions to emulate random behaviour.

<p><ul class="note"><b>NOTE</b><br>
This module emulates a very specific user behaviour, and as such,
it should be viewed as an example rather than a generic Telnet model.
If you want to model realistic Telnet traffic, you are encouraged
to gather statistics from packet traces on a real network, and
write your model accordingly.</li>
</ul>

<p><h3><a name="sec:apps:tcpserverhostapp"></a>6.2.7 TcpServerHostApp<a class="headerlink" href="#sec:apps:tcpserverhostapp" title="Permalink to this headline">&para;</a></h3>

<p>This module hosts TCP-based server applications. It dynamically creates
and launches a new &#8220;thread&#8221; object for each incoming connection.

<p>Server threads can be implemented in C++. An example server thread class is
<tt>TcpGenericServerThread</tt>.

<p>
<h2><a name="sec:apps:udp-applications"></a>6.3 UDP applications<a class="headerlink" href="#sec:apps:udp-applications" title="Permalink to this headline">&para;</a></h2>

<p>The following UDP-based applications are implemented in INET:

<p><ul>
<li> <tt>UdpBasicApp</tt> sends UDP packets to a given IP address at a given interval</li>
<li> <tt>UdpBasicBurst</tt> sends UDP packets to the given IP address(es) in bursts, or acts as a packet sink.</li>
<li> <tt>UdpEchoApp</tt> is similar to <tt>UdpBasicApp</tt>, but it sends back the packet after reception</li>
<li> <tt>UdpSink</tt> consumes and prints packets received from the <tt>Udp</tt> module</li>
<li> <tt>UdpVideoStreamClient</tt>,<tt>UdpVideoStreamServer</tt> simulates video streaming over UDP</li>
</ul>

<p>The next sections describe these applications in details.

<p><h3><a name="sec:apps:udpbasicapp"></a>6.3.1 UdpBasicApp<a class="headerlink" href="#sec:apps:udpbasicapp" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>UdpBasicApp</tt> sends UDP packets to a the IP addresses given in the
<tt>destAddresses</tt> parameter. The application sends a message to one of the
targets in each <tt>sendInterval</tt> interval. The interval between message and
the message length can be given as a random variable. Before the packet is
sent, it is emitted in the <tt>sentPk</tt> signal.

<p>The application simply prints the received UDP datagrams. The <tt>rcvdPk</tt>
signal can be used to detect the received packets.

<p><h3><a name="sec:apps:udpsink"></a>6.3.2 UdpSink<a class="headerlink" href="#sec:apps:udpsink" title="Permalink to this headline">&para;</a></h3>

<p>This module binds an UDP socket to a given local port, and prints the
source and destination and the length of each received packet.

<p>
<h3><a name="sec:apps:udpechoapp"></a>6.3.3 UdpEchoApp<a class="headerlink" href="#sec:apps:udpechoapp" title="Permalink to this headline">&para;</a></h3>

<p>Similar to <tt>UdpBasicApp</tt>, but it sends back the packet after reception.
It accepts only packets with <tt>UDPEchoAppMsg</tt> type, i.e. packets that
are generated by another <tt>UdpEchoApp</tt>.

<p>When an echo response received, it emits an <tt>roundTripTime</tt> signal.

<p><h3><a name="sec:apps:udpvideostreamclient"></a>6.3.4 UdpVideoStreamClient<a class="headerlink" href="#sec:apps:udpvideostreamclient" title="Permalink to this headline">&para;</a></h3>

<p>This module is a video streaming client. It send one &#8220;video streaming request&#8221; to
the server at time <tt>startTime</tt> and receives stream from <tt>UdpVideoStreamServer</tt>.

<p>The received packets are emitted by the <tt>rcvdPk</tt> signal.

<p><h3><a name="sec:apps:udpvideostreamserver"></a>6.3.5 UdpVideoStreamServer<a class="headerlink" href="#sec:apps:udpvideostreamserver" title="Permalink to this headline">&para;</a></h3>

<p>This is the video stream server to be used with <tt>UdpVideoStreamClient</tt>.

<p>The server will wait for incoming "video streaming requests".
When a request arrives, it draws a random video stream size
using the <tt>videoSize</tt> parameter, and starts streaming to the client.
During streaming, it will send UDP packets of size <tt>packetLen</tt> at every
<tt>sendInterval</tt>, until <tt>videoSize</tt> is reached. The parameters <tt>packetLen</tt>
and <tt>sendInterval</tt> can be set to constant values to create CBR traffic,
or to random values (e.g. <tt>sendInterval=uniform(1e-6, 1.01e-6)</tt>) to
accomodate jitter.

<p>The server can serve several clients, and several streams per client.


<h3><a name="sec:apps:udpbasicburst"></a>6.3.6 UdpBasicBurst<a class="headerlink" href="#sec:apps:udpbasicburst" title="Permalink to this headline">&para;</a></h3>

<p>Sends UDP packets to the given IP address(es) in bursts, or acts as a
packet sink. Compatible with both IPv4 and IPv6.

<p><b>Addressing</b>

<p>The <tt>destAddresses</tt> parameter can contain zero, one or more destination
addresses, separated by spaces. If there is no destination address given,
the module will act as packet sink. If there are more than one addresses,
one of them is randomly chosen, either for the whole simulation run,
or for each burst, or for each packet, depending on the value of the
<tt>chooseDestAddrMode</tt> parameter. The <tt>destAddrRNG</tt> parameter controls which
(local) RNG is used for randomized address selection.
The own addresses will be ignored.

<p>An address may be given in the dotted decimal notation, or with the module
name. (The <tt>L3AddressResolver</tt> class is used to resolve the address.)
You can use the "Broadcast" string as address for sending broadcast messages.

<p>INET also defines several NED functions that can be useful:

<p><ul>
<li> <tt>moduleListByPath("pattern",...)</tt>: <br>
         Returns a space-separated list of the modulenames.
         All modules whose full path matches one of the pattern parameters will be included.
         The patterns may contain wilcards in the same syntax as in ini files.
         Example:</li>
<li> <tt>moduleListByNedType("fully.qualified.ned.type",...)</tt>: <br>
         Returns a space-separated list of the modulenames with the given NED type(s).
         All modules whose NED type name occurs in the parameter list will be included.
         The NED type name is fully qualified. Example:</li>
</ul>

<p>Examples:

<pre><code data-language="ini">**.app[0].destAddresses = moduleListByPath("**.host[*]", "**.fixhost[*]")
**.app[1].destAddresses = moduleListByNedType("inet.nodes.inet.StandardHost")</code></pre><p>
The peer can be UDPSink or another UDPBasicBurst.

<p><b>Bursts</b>

<p>The first burst starts at <tt>startTime</tt>. Bursts start by immediately sending
a packet; subsequent packets are sent at <tt>sendInterval</tt> intervals. The
<tt>sendInterval</tt> parameter can be a random value, e.g. <tt>exponential(10ms)</tt>.
A constant interval with jitter can be specified as <tt>1s+uniform(-0.01s,0.01s)</tt>
or <tt>uniform(0.99s,1.01s)</tt>. The length of the burst is controlled by the
<tt>burstDuration</tt> parameter. (Note that if <tt>sendInterval</tt> is greater than
<tt>burstDuration</tt>, the burst will consist of one packet only.) The time between
burst is the <tt>sleepDuration</tt> parameter; this can be zero (zero is not
allowed for <tt>sendInterval</tt>.) The zero <tt>burstDuration</tt> is interpreted as infinity.

<p><b>Operation as sink</b>

<p>When <tt>destAddresses</tt> parameter is empty, the module receives packets and makes statistics only.

<p>
<h2><a name="sec:apps:ipv4/ipv6-traffic-generators"></a>6.4 IPv4/IPv6 traffic generators<a class="headerlink" href="#sec:apps:ipv4/ipv6-traffic-generators" title="Permalink to this headline">&para;</a></h2>

<p>The applications described in this section use the services of the network
layer only, they do not need transport layer protocols.
They can be used with both IPv4 and IPv6.

<p><tt>IIPvXTraffixGenerator</tt> (prototype) sends IP or IPv6 datagrams to the
given address at the given <tt>sendInterval</tt>.
The <tt>sendInterval</tt> parameter can be a constant or a random value (e.g.
<tt>exponential(1)</tt>). If the <tt>destAddresses</tt> parameter contains more than
one address, one of them is randomly for each packet. An address may be given in
the dotted decimal notation (or, for IPv6, in the usual notation with colons),
or with the module name. (The <tt>L3AddressResolver</tt> class is used to
resolve the address.) To disable the model, set <tt>destAddresses</tt> to "".

<p>The <tt>IpvxTrafGen</tt> sends messages with length <tt>packetLength</tt>.
The sent packet is emitted in the <tt>sentPk</tt> signal.
The length of the sent packets can be recorded as scalars and vectors.

<p>The <tt>IpvxTrafSink</tt> can be used as a receiver of the packets
generated by the traffic generator. This module emits the packet
in the <tt>rcvdPacket</tt> signal and drops it. The <tt>rcvdPkBytes</tt>
and <tt>endToEndDelay</tt> statistics are generated from this signal.

<p>The <tt>IpvxTrafGen</tt> can also be the peer of the traffic generators;
it handles the received packets exactly like <tt>IpvxTrafSink</tt>.

<p><h2><a name="sec:apps:the-pingapp-application"></a>6.5 The PingApp application<a class="headerlink" href="#sec:apps:the-pingapp-application" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>PingApp</tt> application
generates ping requests and calculates the packet loss and round trip
parameters of the replies.

<p>Start/stop time, sendInterval etc. can be specified via parameters. An address
may be given in the dotted decimal notation (or, for IPv6, in the usual
notation with colons), or with the module name.
(The <tt>L3AddressResolver</tt> class is used to resolve the address.)
To disable send, specify empty destAddr.

<p>Every ping request is sent out with a sequence number, and replies are
expected to arrive in the same order. Whenever there's a jump in the
in the received ping responses' sequence number (e.g. 1, 2, 3, 5), then
the missing pings (number 4 in this example) is counted as lost.
Then if it still arrives later (that is, a reply with a sequence number
smaller than the largest one received so far) it will be counted as
out-of-sequence arrival, and at the same time the number of losses is
decremented. (It is assumed that the packet arrived was counted earlier as a loss,
which is true if there are no duplicate packets.)

<p>Uses <tt>PingPayload</tt> as payload for the ICMP(v6) Echo Request/Reply packets.

<p>
<h2><a name="sec:apps:ethernet-applications"></a>6.6 Ethernet applications<a class="headerlink" href="#sec:apps:ethernet-applications" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>inet.applications.ethernet</tt> package contains modules
for a simple client-server application. The <tt>EtherAppClient</tt> is a simple
traffic generator that peridically sends <tt>EtherAppReq</tt> messages
whose length can be configured. destAddress, startTime,waitType, reqLength, respLength

<p>The server component of the model (<tt>EtherAppServer</tt>) responds with a
<tt>EtherAppResp</tt> message of the requested length. If the response does
not fit into one ethernet frame, the client receives the data in multiple
chunks.


Both applications have a <tt>registerSAP</tt> boolean parameter.
This parameter should be set to <tt>true</tt> if the application is connected
to the <tt>EtherLlc</tt> module which requires registration of the SAP
before sending frames.

<p>Both applications collects the following statistics: sentPkBytes, rcvdPkBytes,
endToEndDelay.

<p>The client and server application works with any model that accepts
Ieee802Ctrl control info on the packets (e.g. the 802.11 model).
The applications should be connected directly to the <tt>EtherLlc</tt>
or an EthernetInterface NIC module.

<p>The model also contains a host component that groups the applications
and the LLC and MAC components together (<tt>EtherHost</tt>). This node does
not contain higher layer protocols, it generates Ethernet traffic directly.
By default it is configured to use half duplex MAC (CSMA/CD).

<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap5.html">Prev</a> &#8226; <a href="chap7.html">Next</a> &#8226; <a href="toc.html#toc_6">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
