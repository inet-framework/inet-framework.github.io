---
layout: page
underMenu: Documentation
---



<div>INET 4.0 Developer's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap2.html">Prev</a> &#8226; <a href="chap4.html">Next</a> &#8226; <a href="toc.html#toc_3">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:sockets"></a>3 Using Sockets<a class="headerlink" href="#cha:sockets" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:sockets:overview"></a>3.1 Overview<a class="headerlink" href="#sec:sockets:overview" title="Permalink to this headline">&para;</a></h2>

<p>The INET Socket API provides special C++ abstractions on top of the standard
OMNeT++ message passing interface for several communication protocols.

<p>Sockets are most often used by applications and routing protocols to acccess the
corresponding protocol services. Sockets are capable of communicating with the
underlying protocol in a bidirectional way. They can assemble and send service
requests and packets, and they can also receive service indications and packets.

<p>Applications can simply call the socket class member functions (e.g.
<tt>bind()</tt>, <tt>connect()</tt>, <tt>send()</tt>, <tt>close()</tt>) to create
and configure sockets, and to send and receive packets. They may also use
several different sockets simulatenously.

<p>The following sections first introduce the shared functionality of sockets, and
then list all INET sockets in detail, mostly by shedding light on many common
usages through examples.

<p><ul class="note"><b>NOTE</b><br>
Code fragments in this chapter have been somewhat simplified for brevity. For
example, some <tt>virtual</tt> modifiers and <tt>override</tt> qualifiers have been
omitted, and some algorithms have been simplified to ease understanding.</li>
</ul>

<p><b>Socket Interfaces</b>

<p>Although sockets are always implemented as protocol specific C++ classes, INET
also provides C++ socket interfaces. These interfaces allow writing general C++
code which can handle many different kinds of sockets all at once.

<p>For example, the <tt>ISocket</tt> interface is implemented by all sockets, and
the <tt>INetworkSocket</tt> interface is implemented by all network protocol
sockets.

<p><b>Identifying Sockets</b>

<p>All sockets have a socket identifier which is unique within the network node. It
is automatically assigned to the sockets when they are created. The identifier
can accessed with <tt>getSocketId()</tt> throughout the lifetime of the socket.

<p>The socket identifier is also passed along in <tt>SocketReq</tt> and
<tt>SocketInd</tt> packet tags. These tags allow applications and protocols to
identify the socket to which <tt>Packet</tt>s, service <tt>Request</tt>s,
and service <tt>Indication</tt>s belong.

<p><b>Configuring Sockets</b>

<p>Since all sockets work with message passing under the hoods, they must be
configured prior to use. In order to send packets and service requests on the
correct gate towards the underlying communication protocol, the output gate must
be configured:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketConfigureExample" until="//!End"></pre>
<p>In contrast, incoming messages such as service indications from the underlying
communication protocol can be received on any application gate.

<p>To ease application development, all sockets support storing a user specified
data object pointer. The pointer is accessible with the <tt>setUserData()</tt>,
<tt>getUserData()</tt> member functions.

<p>Another mandatory configuration for all sockets is setting the socket callback
interface. The callback interface is covered in more detail in the following
section.

<p>Other socket specific configuration options are also available, these are
discussed in the section of the corresponding socket.

<p><b>Callback Interfaces</b>

<p>To ease centralized message processing, all sockets provide a callback interface
which must be implemented by applications. The callback interface is usually
called <tt>ICallback</tt>, and it's defined as an inner class of the socket it
belongs to. These interfaces often contain some generic notification methods
along with several socket specific methods.

<p>For example, the most common callback method is the one which processes incoming
packets:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketCallbackInterfaceExample" until="//!End"></pre>
<p><b>Processing Messages</b>

<p>In general, sockets can process all incoming messages which were sent by the
underlying protocol. The received messages must be processed by the socket where
they belong to.

<p>For example, an application can simply go through each knonwn socket in any
order, and decide which one should process the received message as follows:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketProcessExample" until="//!End"></pre>
<p>Sockets usually deconstruct the received messages and update their state
accordingly if necessary. They also automatically dispatch received packets and
service indications for further processing to the appropriate functions in the
corresponding <tt>ICallback</tt> interface.

<p><b>Sending Data</b>

<p>All sockets provide one or more <tt>send()</tt> functions which send packets using
the current configuration of the socket. The actual means of packet delivery
depends on the underlying communication protocol, but in general the state of
the socket is expected to affect it.

<p>For example, after the socket is properly configured, the application can start
sending packets without attaching any tags, because the socket takes care of
the necessary technical details:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketSendExample" until="//!End"></pre>
<p><b>Receiving Data</b>

<p>For example, the application may directly implement the <tt>ICallback</tt>
interface of the socket and print the received data as follows:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketReceiveExample" until="//!End"></pre>
<p><b>Closing Sockets</b>

<p>Sockets must be closed before deleting them. Closing a socket allows the
underlying communication protocol to release allocated resources. These
resources are often allocated on the local network node, the remote nework node,
or potentially somewhere else in the network.

<p>For example, a socket for a connection oriented protocol must be closed to
release the allocated resources at the peer:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketCloseExample" until="//!End"></pre>
<p><b>Using Multiple Sockets</b>

<p>If the application needs to manage a large number of sockets, for example in a
server application which handles multiple incoming connections, the generic
<tt>SocketMap</tt> class may be useful. This class can manage all kinds of
sockets which implement the <tt>ISocket</tt> interface simultaneously.

<p>For example, processing an incoming packet or service indication can be done as
follows:

<p><pre class="snippet" src="Snippets.cc" after="//!SocketFindExample" until="//!End"></pre>
<p>In order for the <tt>SocketMap</tt> to operate properly, sockets must be added
to and removed from it using the <tt>addSocket()</tt> and <tt>removeSocket()</tt>
methods respectively.

<p><h2><a name="sec:sockets:udp-socket"></a>3.2 UDP Socket<a class="headerlink" href="#sec:sockets:udp-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>UdpSocket</tt> class provides an easy to use C++ interface to send and
receive UDP datagrams. The underlying UDP protocol is
implemented in the <tt>Udp</tt> module.

<p><b>Callback Interface</b>

<p>Processing packets and indications which are received from the <tt>Udp</tt>
module is pretty simple. The incoming message must be processed by the socket
where it belongs as shown in the general section.

<p>The <tt>UdpSocket</tt> deconstructs the message and uses the
<tt>UdpSocket::ICallback</tt> interface to notify the application about
received data and error indications:

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Sockets</b>

<p>For receiving UDP datagrams on a socket, it must be bound to an
address and a port. Both the address and port is optional. If the address is
unspecified, than all UDP datagrams with any destination address are
received. If the port is -1, then an unused port is selected automatically by
the <tt>Udp</tt> module. The address and port pair must be unique within the
same network node.

<p>Here is how to bind to a specific local address and port to receive
UDP datagrams:

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketBindExample" until="//!End"></pre>
<p>For only receiving UDP datagrams from a specific remote address/port,
the socket can be connected to the desired remote address/port:

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketConnectExample" until="//!End"></pre>
<p>There are several other socket options (e.g. receiving broadcasts, managing
multicast groups, setting type of service) which can also be configured using
the <tt>UdpSocket</tt> class:

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketConfigureExample" until="//!End"></pre>
<p><b>Sending Data</b>

<p>After the socket has been configured, applications can send datagrams to a
remote address and port via a simple function call:

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketSendToExample" until="//!End"></pre>
<p>If the application wants to send several datagrams, it can optionally connect to
the destination.

<p>The UDP protocol is in fact connectionless, so when the <tt>Udp</tt>
module receives the connect request, it simply remembers the remote address and
port, and use it as default destination for later sends.

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketSendExample" until="//!End"></pre>
<p>The application can call connect several times on the same socket.

<p><b>Receiving Data</b>

<p>For example, the application may directly implement the
<tt>UdpSocket::ICallback</tt> interface and print the received data as
follows:

<p><pre class="snippet" src="Snippets.cc" after="//!UdpSocketReceiveExample" until="//!End"></pre>
<p><h2><a name="sec:sockets:tcp-socket"></a>3.3 TCP Socket<a class="headerlink" href="#sec:sockets:tcp-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>TcpSocket</tt> class provides an easy to use C++ interface to manage
TCP connections, and to send and receive data. The underlying
TCP protocol is implemented in the <tt>Tcp</tt>, <tt>TcpLwip</tt>,
and <tt>TcpNsc</tt> modules.

<p><b>Callback Interface</b>

<p>Messages received from the various <tt>Tcp</tt> modules can be processed by the
<tt>TcpSocket</tt> where they belong to. The <tt>TcpSocket</tt> deconstructs
the message and uses the <tt>TcpSocket::ICallback</tt> interface to notify the
application about the received data or service indication:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Connections</b>

<p>The <tt>Tcp</tt> module supports several TCP different congestion
algorithms, which can also be configured using the <tt>TcpSocket</tt>:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketConfigureExample" until="//!End"></pre>
<p>Upon setting the individual parameters, the socket immediately sends sevice
requests to the underlying <tt>Tcp</tt> protocol module.

<p><b>Setting up Connections</b>

<p>Since TCP is a connection oriented protocol, a connection must be
established before applications can exchange data. On the one side, the
application listens at a local address and port for incoming TCP
connections:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketListenExample" until="//!End"></pre>
<p>On the other side, the application connects to a remote address and port to
establish a new connection:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketConnectExample" until="//!End"></pre>
<p><b>Accepting Connections</b>

<p>The <tt>Tcp</tt> module automatically notifies the <tt>TcpSocket</tt> about
incoming connections. The socket in turn notifies the application using the
<tt>ICallback::socketAvailable</tt> method of the callback interface. Finally,
incoming TCP connections must be accepted by the application before
they can be used:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketAcceptExample" until="//!End"></pre>
<p>After the connection is accepted, the <tt>Tcp</tt> module notifies the
application about the socket being established and ready to be used.

<p><b>Sending Data</b>

<p>After the connection has been established, applications can send data to the
remote application via a simple function call:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketSendExample" until="//!End"></pre>
<p>Packet data is enqueued by the local <tt>Tcp</tt> module and transmitted
over time according to the protocol logic.

<p><b>Receiving Data</b>

<p>Receiving data is as simple as implementing the corresponding method of the
<tt>TcpSocket::ICallback</tt> interface. One caveat is that packet data may
arrive in different chunk sizes (but the same order) than they were sent due to
the nature of TCP protocol.

<p>For example, the application may directly implement the
<tt>TcpSocket::ICallback</tt> interface and print the received data as
follows:

<p><pre class="snippet" src="Snippets.cc" after="//!TcpSocketReceiveExample" until="//!End"></pre>
<p><h2><a name="sec:sockets:sctp-socket"></a>3.4 SCTP Socket<a class="headerlink" href="#sec:sockets:sctp-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>SctpSocket</tt> class provides an easy to use C++ interface to manage
SCTP connections, and to send and receive data. The underlying
SCTP protocol is implemented in the <tt>Sctp</tt> module.

<p><b>Callback Interface</b>

<p>Messages received from the <tt>Sctp</tt> module can be processed by the
<tt>SctpSocket</tt> where they belong to. The <tt>SctpSocket</tt>
deconstructs the message and uses the <tt>SctpSocket::ICallback</tt> interface
to notify the application about the received data or service indication:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Connections</b>

<p>The <tt>SctpSocket</tt> class supports setting several SCTP
specific connection parameters directly:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketConfigureExample" until="//!End"></pre>
<p>Upon setting the individual parameters, the socket immediately sends sevice
requests to the underlying <tt>Sctp</tt> protocol module.

<p><b>Setting up Connections</b>

<p>Since SCTP is a connection oriented protocol, a connection must be
established before applications can exchange data. On the one side, the
application listens at a local address and port for incoming SCTP
connections:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketListenExample" until="//!End"></pre>
<p>On the other side, the application connects to a remote address and port to
establish a new connection:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketConnectExample" until="//!End"></pre>
<p><b>Accepting Connections</b>

<p>The <tt>Sctp</tt> module automatically notifies the <tt>SctpSocket</tt> about
incoming connections. The socket in turn notifies the application using the
<tt>ICallback::socketAvailable</tt> method of the callback interface. Finally,
incoming SCTP connections must be accepted by the application before
they can be used:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketAcceptExample" until="//!End"></pre>
<p><b>Sending Data</b>

<p>After the connection has been established, applications can send data to the
remote applica- tion via a simple function call:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketSendExample" until="//!End"></pre>
<p>Packet data is enqueued by the local <tt>Sctp</tt> module and transmitted over
time according to the protocol logic.

<p><b>Receiving Data</b>

<p>Receiving data is as simple as implementing the corresponding method of the
<tt>SctpSocket::ICallback</tt> interface. One caveat is that packet data may
arrive in different chunk sizes (but the same order) than they were sent due to
the nature of SCTP protocol.

<p>For example, the application may directly implement the
<tt>SctpSocket::ICallback</tt> interface and print the received data as
follows:

<p><pre class="snippet" src="Snippets.cc" after="//!SctpSocketReceiveExample" until="//!End"></pre>
<p><h2><a name="sec:sockets:ipv4-socket"></a>3.5 IPv4 Socket<a class="headerlink" href="#sec:sockets:ipv4-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Ipv4Socket</tt> class provides an easy to use C++ interface to send
and receive IPv4 datagrams. The underlying IPv4 protocol
is implemented in the <tt>Ipv4</tt> module.

<p><b>Callback Interface</b>

<p>Messages received from the <tt>Ipv4</tt> module must be processed by the socket
where they belong as shown in the general section. The <tt>Ipv4Socket</tt>
deconstructs the message and uses the <tt>Ipv4Socket::ICallback</tt> interface
to notify the application about the received data:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv4SocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Sockets</b>

<p>In order to only receive IPv4 datagrams which are sent to a specific
local address or contain a specific protocol, the socket can be bound to the
desired local address or protocol.

<p>For example, the following code fragment shows how the INET <tt>PingApp</tt>
binds to the ICMPv4 protocol to receive all incoming
ICMPv4 Echo Reply messages:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv4SocketBindExample" until="//!End"></pre>
<p>For only receiving IPv4 datagrams from a specific remote address, the
socket can be connected to the desired remote address:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv4SocketConnectExample" until="//!End"></pre>
<p><b>Sending Data</b>

<p>After the socket has been configured, applications can immediately start sending
IPv4 datagrams to a remote address via a simple function call:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv4SocketSendToExample" until="//!End"></pre>
<p>If the application wants to send several IPv4 datagrams to the same
destination address, it can optionally connect to the destination:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv4SocketSendExample" until="//!End"></pre>
<p>The IPv4 protocol is in fact connectionless, so when the
<tt>Ipv4</tt> module receives the connect request, it simply remembers the
remote address, and uses it as the default destination address for later sends.

<p>The application can call <tt>connect()</tt> several times on the same socket.

<p><b>Receiving Data</b>

<p>For example, the application may directly implement the
<tt>Ipv4Socket::ICallback</tt> interface and print the received data as
follows:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv4SocketReceiveExample" until="//!End"></pre>
<p><h2><a name="sec:sockets:ipv6-socket"></a>3.6 IPv6 Socket<a class="headerlink" href="#sec:sockets:ipv6-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Ipv6Socket</tt> class provides an easy to use C++ interface to send
and receive IPv6 datagrams. The underlying IPv6 protocol
is implemented in the <tt>Ipv6</tt> module.

<p><b>Callback Interface</b>

<p>Messages received from the <tt>Ipv6</tt> module must be processed by the socket
where they belong as shown in the general section. The <tt>Ipv6Socket</tt>
deconstructs the message and uses the <tt>Ipv6Socket::ICallback</tt> interface
to notify the application about the received data:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv6SocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Sockets</b>

<p>In order to only receive IPv6 datagrams which are sent to a specific
local address or contain a specific protocol, the socket can be bound to the
desired local address or protocol.

<p>For example, the following code fragment shows how the INET <tt>PingApp</tt>
binds to the ICMPv6 protocol to receive all incoming
ICMPv6 Echo Reply messages:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv6SocketBindExample" until="//!End"></pre>
<p>For only receiving IPv6 datagrams from a specific remote address, the
socket can be connected to the desired remote address:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv6SocketConnectExample" until="//!End"></pre>
<p><b>Sending Data</b>

<p>After the socket has been configured, applications can immediately start sending
IPv6 datagrams to a remote address via a simple function call:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv6SocketSendAtExample" until="//!End"></pre>
<p>If the application wants to send several IPv6 datagrams to the same
destination address, it can optionally connect to the destination:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv6SocketSendExample" until="//!End"></pre>
<p>The IPv6 protocol is in fact connectionless, so when the
<tt>Ipv6</tt> module receives the connect request, it simply remembers the
remote address, and uses it as the default destination address for later sends.

<p>The application can call <tt>connect()</tt> several times on the same socket.

<p><b>Receiving Data</b>

<p>For example, the application may directly implement the
<tt>Ipv6Socket::ICallback</tt> interface and print the received data as
follows:

<p><pre class="snippet" src="Snippets.cc" after="//!Ipv6SocketReceiveExample" until="//!End"></pre>
<p><h2><a name="sec:sockets:l3-socket"></a>3.7 L3 Socket<a class="headerlink" href="#sec:sockets:l3-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>L3Socket</tt> class provides an easy to use C++ interface to send and
receive datagrams using the conceptual network protocols. The underlying network
protocols are implemented in the <tt>NextHopForwarding</tt>,
<tt>Flooding</tt>, <tt>ProbabilisticBroadcast</tt>, and
<tt>AdaptiveProbabilisticBroadcast</tt> modules.

<p><b>Callback Interface</b>

<p>Messages received from the network protocol module must be processed by the
associated socket where as shown in the general section. The <tt>L3Socket</tt>
deconstructs the message and uses the <tt>L3Socket::ICallback</tt> interface
to notify the application about the received data:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Sockets</b>

<p>Since the <tt>L3Socket</tt> class is network protocol agnostic, it must be
configured to connect to a desired network protocol:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketProtocolExample" until="//!End"></pre>
<p>In order to only receive datagrams which are sent to a specific local address or
contain a specific protocol, the socket can be bound to the desired local
address or protocol. The conceptual network protocols can work with the
<tt>ModuleIdAddress</tt> class which contains a <tt>moduleId</tt> of the desired
network interface.

<p>For example, the following code fragment shows how the INET <tt>PingApp</tt>
binds to the Echo protocol to receive all incoming Echo
Reply messages:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketBindExample" until="//!End"></pre>
<p>For only receiving datagrams from a specific remote address, the socket can be
connected to the desired remote address:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketConnectExample" until="//!End"></pre>
<p><b>Sending Data</b>

<p>After the socket has been configured, applications can immediately start sending
datagrams to a remote address via a simple function call:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketSendToExample" until="//!End"></pre>
<p>If the application wants to send several datagrams to the same destination
address, it can optionally connect to the destination:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketSendExample" until="//!End"></pre>
<p>The network protocols are in fact connectionless, so when the protocol module
receives the connect request, it simply remembers the remote address, and uses
it as the default destination address for later sends.

<p>The application can call <tt>connect()</tt> several times on the same socket.

<p><b>Receiving Data</b>

<p>For example, the application may directly implement the
<tt>L3Socket::ICallback</tt> interface and print the received data as follows:

<p><pre class="snippet" src="Snippets.cc" after="//!L3SocketReceiveExample" until="//!End"></pre>
<p><h2><a name="sec:sockets:tun-socket"></a>3.8 TUN Socket<a class="headerlink" href="#sec:sockets:tun-socket" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>TunSocket</tt> class provides an easy to use C++ interface to send and
receive datagrams using a TUN interface. The underlying
TUN interface is implemented in the <tt>Tun</tt> module.

<p>A TUN interface is basically a virtual network interface which is
usually connected to an application (from the outside) instead of other network
devices. It can be used for many networking tasks such as tunneling, or virtual
private networking.

<p><b>Callback Interface</b>

<p>Messages received from the <tt>Tunq</tt> module must be processed by the socket
where they belong as shown in the general section. The <tt>TunSocket</tt>
deconstructs the message and uses the <tt>TunSocket::ICallback</tt> interface
to notify the application about the received data:

<p><pre class="snippet" src="Snippets.cc" after="//!TunSocketCallbackInterface" until="//!End"></pre>
<p><b>Configuring Sockets</b>

<p>A <tt>TunSocket</tt> must be associated with a TUN interface before
it can be used:

<p><pre class="snippet" src="Snippets.cc" after="//!TunSocketOpenExample" until="//!End"></pre>
<p><b>Sending Packets</b>

<p>As soon as the <tt>TunSocket</tt> is associated with a TUN
interface, applications can immediately start sending datagrams via a simple
function call:

<p><pre class="snippet" src="Snippets.cc" after="//!TunSocketSendExample" until="//!End"></pre>
<p>When the application sends a datagram to a <tt>TunSocket</tt>, the packet
appears for the protocol stack within the network node as if the packet were
received from the network.

<p><b>Receiving Packets</b>

<p>Messages received from the TUN interface must be processed by the
corresponding <tt>TunSocket</tt>. The <tt>TunSocket</tt> deconstructs the
message and uses the <tt>TunSocket::ICallback</tt> interface to notify the
application about the received data:

<p><pre class="snippet" src="Snippets.cc" after="//!TunSocketReceiveExample" until="//!End"></pre>
<p>When the protocol stack within the network node sends a datagram to a
TUN interface, the packet appears for the application which uses a
<tt>TunSocket</tt> as if the packet were sent to the network.

<p>

<p>


<p>


<p>

<p>

<p>


<p>


<p>


<p>

<p>


<p>

<p>

<p>


<p>



<p>


<p>


<p>


<p>


<p>

<p>

<p>

<p>

<p>
<hr class='pgbr'><div class='oppnavbar'><a href="chap2.html">Prev</a> &#8226; <a href="chap4.html">Next</a> &#8226; <a href="toc.html#toc_3">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
