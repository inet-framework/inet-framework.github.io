---
layout: page
underMenu: Documentation
---



<div>INET 4.0 Developer's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap1.html">Prev</a> &#8226; <a href="chap3.html">Next</a> &#8226; <a href="toc.html#toc_2">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:packet-api"></a>2 Working with Packets<a class="headerlink" href="#cha:packet-api" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:packets:overviews"></a>2.1 Overview<a class="headerlink" href="#sec:packets:overviews" title="Permalink to this headline">&para;</a></h2>

<p>The INET Packet API is designed to ease the implementation of communication
protocols and applications by providing many useful C++ components. In the
following sections, we introduce the Packet API in detail, and we shed light on
many common API usages through examples.

<p><ul class="note"><b>NOTE</b><br>
Code fragments in this chapter have been somewhat simplified for brevity. For
example, some <tt>const</tt> modifiers and <tt>const</tt> casts have been omitted,
setting fields have been omitted, and some algorithms have been simplified to
ease understanding.</li>
</ul>

<p>The representation of packets is an essential modeling support for communication
network simulation. Applications and communication protocols construct,
deconstruct, encapsulate, fragment, aggregate, and manipulate packets in many
ways. In order to ease the implementation of said behavioral patterns, the
Packet API primarily provides a feature-rich and general purpose
<tt>Packet</tt> data structure.

<p>The <tt>Packet</tt> data structure is capable of representing application
packets, TCP segments, IP datagrams, Ethernet
frames, IEEE 802.11 frames, and all kinds of digital data. It is
designed to provide efficient storage, duplication, sharing, encapsulation,
aggregation, fragmentation, serialization, and data representation selection.
The <tt>Packet</tt> data structure consists of two layers, built on one
another. The upper layer deals with packets, and the lower layer deals with
alternative data representations.

<p>The Packet API, despite its name, does not only provide the <tt>Packet</tt>
data structure but several other functionality. For example, communication
protocols often need to enqueue data for sending (e.g., TCP), or
buffer received data for reassembly (e.g., IP) or for reordering
(e.g., IEEE 802.11). These services are provided as separate C++ data
structures on top of the lower layer mentioned above.

<p><h2><a name="sec:packets:representing-data"></a>2.2 Representing Data<a class="headerlink" href="#sec:packets:representing-data" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Packet</tt> data structure is a compound data structure that builds on
top of another set of data structures called chunks. The <tt>Chunk</tt> data
structures provide several alternatives to represent a piece of data. Chunks can
be simple or compound if they are built using other chunks.

<p>Communication protocols and applications may define their own chunks or use
already existing ones. User defined chunks are most often genereted by the
OMNeT++ MSG compiler as a subclass of <tt>FieldsChunk</tt>. It's also
possible to write a user defined chunk from scratch.

<p>INET provides the following built-in chunks:

<p><ul>
    <li> repeated byte or bit chunk (<tt>ByteCountChunk</tt>, <tt>BitCountChunk</tt>)</li>
    <li> raw bytes or bits chunk (<tt>BytesChunk</tt>, <tt>BitsChunk</tt>)</li>
    <li> ordered sequence of chunks (<tt>SequenceChunk</tt>)</li>
    <li> slice of another chunk designated by offset and length (<tt>SliceChunk</tt>)</li>
    <li> many protocol specific field based chunks (e.g. <tt>Ipv4Header</tt> subclass of <tt>FieldsChunk</tt>)</li>
</ul>

<p>Applications and communication protocols most often construct simple chunks to
represent application data and protocol headers. The following examples
demonstrate the construction of various simple chunks.

<p><pre class="snippet" src="Snippets.cc" after="//!ChunkConstructionExample" until="//!End"></pre>
<p>In general, chunks must be constructed with a call to <tt>makeShared</tt>
instead of the standard C++ <tt>new</tt> operator. The special construction
mechanism is required for the efficient sharing of chunks among packets using
C++ shared pointers.

<p>Packets most often contain several chunks inserted by different protocols as
they are passed through the protocol layers. The most common way to represent
packet contents, is forming a compound chunk by concatenation.

<p><pre class="snippet" src="Snippets.cc" after="//!ChunkConcatenationExample" until="//!End"></pre>
<p>Protocols often need to slice data, for example to provide fragmentation, which
is also directly supported by the chunk API.

<p><pre class="snippet" src="Snippets.cc" after="//!ChunkSlicingExample" until="//!End"></pre>
<p>In order to avoid cluttered data representation due to slicing, the chunk API
provides automatic merging for consecutive chunk slices.

<p><pre class="snippet" src="Snippets.cc" after="//!ChunkMergingExample" until="//!End"></pre>
<p>Alternative representations can be easily converted into one another using
automatic serialization as a common ground.

<p><pre class="snippet" src="Snippets.cc" after="//!ChunkConversionExample" until="//!End"></pre>
<p>The following MSG fragment is a more complete example which shows how a UDP
header could be defined:

<p><pre class="snippet" src="Snippets.msg" after="//!UdpHeaderDefinitionExample" until="//!End"></pre>
<p>It's important to distinguish the two length related fields in the
<tt>UdpHeader</tt> chunk. One is the length of the chunk itself
(<tt>chunkLength</tt>), the other is the value in the length field of the header
(<tt>lengthField</tt>).

<p><h2><a name="sec:packets:representing-packets"></a>2.3 Representing Packets<a class="headerlink" href="#sec:packets:representing-packets" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Packet</tt> data structure uses a single chunk data structure to
represent its contents. The contents may be as simple as raw bytes
(<tt>BytesChunk</tt>), but most likely it will be the concatenation
(<tt>SequenceChunk</tt>) of various protocol specific headers (e.g.,
<tt>FieldsChunk</tt> subclasses) and application data (e.g.,
<tt>ByteCountChunk</tt>).

<p>Packets can be created by both applications and communication protocols. As
packets are passed down through the protocol layers at the sender node, new
protocol specific headers and trailers are inserted during processing.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketConstructionExample" until="//!End"></pre>
<p>In order to facilitate packet processing by communication protocols at the
receiver node, packets are split into three parts: front popped part, data part,
and back popped part. During packet processing, as the packet is passed through
the protocol layers, headers and trailers are popped from the beginning and from
the end. This effectively reduces the remaining unprocessed part called the data
part, but it doesn't affect the data stored in the packet.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketProcessingExample" until="//!End"></pre>
<p><h2><a name="sec:packets:representing-signals"></a>2.4 Representing Signals<a class="headerlink" href="#sec:packets:representing-signals" title="Permalink to this headline">&para;</a></h2>

<p>Protocols and applications use the <tt>Packet</tt> data structure to represent
digital data during the processing within the network node. In contrast, the
wireless transmission medium uses a different data structure called
<tt>Signal</tt> to represent the physical phenomena used to transmit packets.

<p><pre class="snippet" src="Snippets.cc" after="//!SignalConstructionExample" until="//!End"></pre>
<p>Signals always encapsulate a packet and also contain a description of the analog
domain representation. The most important physical properties of a signal are
the signal duration and the signal power.

<p><h2><a name="sec:packets:representing-transmission-errors"></a>2.5 Representing Transmission Errors<a class="headerlink" href="#sec:packets:representing-transmission-errors" title="Permalink to this headline">&para;</a></h2>

<p>An essential part of communication network simulation is the understanding of
protocol behavior in the presence of errors. The Packet API provides several
alternatives for representing errors. The alternatives range from simple, but
computationally cheap, to accurate, but computationally expensive solutions.

<p><ul>
    <li> mark erroneous packets (simple)</li>
    <li> mark erroneous chunks (good compromise)</li>
    <li> change bits in raw chunks (accurate)</li>
</ul>

<p>The first example shows how to represent transmission erros on the packet level.
A packet is marked as erroneous based on its length and the associated bit error
rate. This representation doesn't give too much chance for a protocol to do
anything else than discard an erroneous packet.

<p><pre class="snippet" src="Snippets.cc" after="//!CorruptingPacketsExample" until="//!End"></pre>
<p>The second example shows how to represent transmission errors on the chunk
level. Similarly to the previous example, a chunk is also marked as erroneous
based on its length and the associated bit error rate. This representation
allows a protocol to discard only certain parts of the packet. For example, an
aggregated packet may be partially discarded and processed.

<p><pre class="snippet" src="Snippets.cc" after="//!CorruptingChunksExample" until="//!End"></pre>
<p>The last example shows how to actually represent transmission errors on the byte
level. In contrast with the previous examples, this time the actual data of the
packet is modified. This allows a protocol to discard or correct any part based
on checksums.

<p><pre class="snippet" src="Snippets.cc" after="//!CorruptingBytesExample" until="//!End"></pre>
<p>The physical layer models support the above mentioned different error
representations via configurable parameters. Higher layer protocols detect
errors by chechking the error bit on packets and chunks, and by standard CRC
mechanisms.

<p><h2><a name="sec:packets:packet-tagging"></a>2.6 Packet Tagging<a class="headerlink" href="#sec:packets:packet-tagging" title="Permalink to this headline">&para;</a></h2>

<p>Communication between protocols inside network nodes often require passing
around meta information along with packets. To this end, packets are also
capable of carrying various meta information called tags. Tags can either be
attached to the whole packet or to a specific region. The former are called
packet tags, the latter are called region tags.

<p>The most important packet tag example is the one specifying the outermost
protocol of the packet, which cannot be unambigously identified just by looking
at the raw data. Other notable examples are: MAC address request, outgoing
interface request, transmission power request, receive strength indication,
incoming interface indication.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketTaggingExample" until="//!End"></pre>
<p>Tags are very simple C++ classes usually generated by the OMNeT++ MSG compiler.
Tags come in three flavors:

<p><ul>
	<li> <i>requests</i> carry information from higher layer to lower layer (e.g. <tt>MacAddressReq</tt>).</li>
	<li> <i>indications</i> carry information from lower layer to higher layer (e.g. <tt>InterfaceInd</tt>).</li>
	<li> <i>plain tags</i> contain some meta information (e.g. <tt>PacketProtocolTag</tt>).</li>
	<li> <i>base classes</i> must not be attached to packets (e.g. <tt>TagBase</tt>).</li>
</ul>

<p><pre class="snippet" src="Snippets.msg" after="//!TagDefinitionExeample" until="//!End"></pre>
<p><h2><a name="sec:packets:region-tagging"></a>2.7 Region Tagging<a class="headerlink" href="#sec:packets:region-tagging" title="Permalink to this headline">&para;</a></h2>

<p>In order to collect some statistics, it is required to attach meta information
to arbitrary regions of packets. For example, computing the end-to-end delay in
a TCP stream requires to tag regions at the sender with the timestamp when they
were created. Then the receiver computes the end-to-end delay for every region
as the data arrives.

<p><pre class="snippet" src="Snippets.cc" after="//!RegionTaggingSendExample" until="//!End"></pre>
<p>In a TCP stream, the data can be arbitrarily split, reordered, and merged in the
underlying network. The packet data representation takes care of maintaining the
attached region tags as if they were individually attached to bits. In order to
avoid cluttered data representation due to the above, the tag API provides
automatic merging for similar consecutive tag regions.

<p><pre class="snippet" src="Snippets.cc" after="//!RegionTaggingReceiveExample" until="//!End"></pre>
<p>The above loop may run exactly once for the whole data, or it may run several
times depending on how the data is provided at the sender and how the underlying
network works.

<p><h2><a name="sec:packets:dissecting-packets"></a>2.8 Dissecting Packets<a class="headerlink" href="#sec:packets:dissecting-packets" title="Permalink to this headline">&para;</a></h2>

<p>Understanding what's inside a packet is a very important and often used
functionality. Simply using the representation may be insufficient, because the
<tt>Packet</tt> may be represented with a <tt>BytesChunk</tt>, for exmple.
The Packet API provides a <tt>PacketDissector</tt> class which analyzes a
packet solely based on the assigned packet protocol and the actual data it
contains.

<p>The analysis is done according to the protocol logic as opposed to the actual
representation of the data. The <tt>PacketDissector</tt> works similarly to a
parser. Basically, it walks through each part (such as protocol headers) of a
packet in order. For each part, it determines the corresponding protocol and the
most specific representation for that protocol.

<p>The <tt>PacketDissector</tt> class relies on small registered
protocol-specific dissector classes (e.g. <tt>Ipv4ProtocolDissector</tt>)
subclassing the required <tt>ProtocolDissector</tt> base class. Implementors
are expected to use the <tt>PacketDissector::ICallback</tt> interface to
notify the parser about the packet structure.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDissectorCallbackInterface" until="//!End"></pre>
<p>In order to use the <tt>PacketDissector</tt>, the user is expected to
implement a <tt>PacketDissector::ICallback</tt>  interface. The callback
interface will be notified for each part of the packet as the
<tt>PacketDissector</tt> goes through it.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDissectionExample" until="//!End"></pre>
<p><h2><a name="sec:packets:filtering-packets"></a>2.9 Filtering Packets<a class="headerlink" href="#sec:packets:filtering-packets" title="Permalink to this headline">&para;</a></h2>

<p>Filtering packets based on the actual data they contain is another widely used
and very important feature. With the help of the packet dissector, it is very
simple to create arbitrary custom packet filters. Packet filters are generally
used for recording packets and visualizing various packet related information.

<p>In order to simplify filtering, the Packet API provides a generic expression
based packet filter which is implemented in the <tt>PacketFilter</tt> class.
The expression syntax is the same as other OMNeT++ expressions, and the data
filter is matched against individual chunks of the packet as found by the packet
dissector.

<p>For example, the packet filter expression "ping*" matches all packets having the
name prefix 'ping', and the packet chunk filter expression "inet::Ipv4Header and
srcAddress(10.0.0.*)" matches all packets that contain an IPv4 header
with a '10.0.0' source address prefix.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketFilteringExample" until="//!End"></pre>
<p><h2><a name="sec:packets:printing-packets"></a>2.10 Printing Packets<a class="headerlink" href="#sec:packets:printing-packets" title="Permalink to this headline">&para;</a></h2>

<p>During model development, packets often need to be displayed in a human readable
form. The Packet API provides a <tt>PacketPrinter</tt> class which is capable
of forming a human readable string representation of <tt>Packet</tt>s. The
<tt>PacketPrinter</tt> class relies on small registered protocol-specific
printer classes (e.g. <tt>Ipv4ProtocolPrinter</tt> subclassing the required
<tt>ProtocolPrinter</tt> base class.

<p>The packet printer is automatically used by the OMNeT++ runtime user interface
to display packets in the packet log window. The packet printer contributes
several log window columns into the user interface: 'Source', 'Destination',
'Protocol', 'Length', and 'Info'. These columns display packet data similarly to
the well-known Wireshark protocol analyzer.

<p><pre class="snippet" src="Snippets.cc" after="//!PacketPrintingExample" until="//!End"></pre>
<p>The <tt>PacketPrinter</tt> provides a few other functions which have
additional options to control the details of the resulting human readable form.

<p><h2><a name="sec:packets:recording-pcap"></a>2.11 Recording PCAP<a class="headerlink" href="#sec:packets:recording-pcap" title="Permalink to this headline">&para;</a></h2>

<p>Exporting the packets from a simulation into a PCAP file allows further
processing with 3rd party tools. The Packet API provides a <tt>PcapDump</tt>
class for creating PCAP files. Packet filtering can be used to reduce the file
size and increase performance.

<p><pre class="snippet" src="Snippets.cc" after="//!PCAPRecoringExample" until="//!End"></pre>
<p><h2><a name="sec:packets:encapsulating-packets"></a>2.12 Encapsulating Packets<a class="headerlink" href="#sec:packets:encapsulating-packets" title="Permalink to this headline">&para;</a></h2>

<p>Many communication protocols work with simple packet encapsulation. They
encapsulate packets with their own protocol specific headers and trailers at the
sender node, and they decapsulate packets at the reciver node. The headers and
trailers carry the information that is required to provide the protocol specific
service.

<p>For example, when sending a packet, the Ethernet protocol encapsulates an IP
datagram by prepending the packet with an Ethernet header, and also by appending
the packet with an optional padding and an Ethernet FCS. The following example
shows how a MAC protocol could encapsulate a packet:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketEncapsulationExample" until="//!End"></pre>
<p>When receiving a packet, the Ethernet protocol removes an Ethernet header and an
Ethernet FCS from the received Ethernet frame, and passes the resulting IP
datagram along. The following example shows how a MAC protocol could decapsulate
a packet:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDecapsulationExample" until="//!End"></pre>
<p>Although the <tt>popAtFront</tt> and <tt>popAtBack</tt> functions change the
remaining unprocessed part of the packet, they don't have effect on the actual
packet data. That is when the packet reaches high level protocol, it still
contains all the received data.

<p><h2><a name="sec:packets:fragmenting-packets"></a>2.13 Fragmenting Packets<a class="headerlink" href="#sec:packets:fragmenting-packets" title="Permalink to this headline">&para;</a></h2>

<p>Communication protocols often provide fragmentation to overcome various physical
limits (e.g. length limit, error rate). They split packets into smaller pieces
at the sender node, which send them one-by-one. They form the original packet at
the receiver node by combining the received fragments.

<p>For example, the IEEE 802.11 protocol fragments packets to overcome the
increasing probability of packet loss of large packets. The following example
shows how a MAC protocol could fragment a packet:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketFragmentationExample" until="//!End"></pre>
<p>When receiving fragments, protocols need to collect the coherent fragments of
the same packet until all fragments becomes available. The following example
shows how a MAC protocol could form the original packet from a set of coherent
fragments:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDefragmentationExample" until="//!End"></pre>
<p><h2><a name="sec:packets:aggregating-packets"></a>2.14 Aggregating Packets<a class="headerlink" href="#sec:packets:aggregating-packets" title="Permalink to this headline">&para;</a></h2>

<p>Communication protocols often provide aggregation to better utilize the
communication channel by reducing protocol overhead. They wait for several
packets to arrive at the sender node, then they form a large aggregated packet
which is in turn sent at once. At the receiver node the aggregated packet is
split into the original packets, and they are passed along.

<p>For example, the IEEE 802.11 protocol aggregates packets for better channel
utilization at both MSDU and MPDU levels. The following example shows a version
of how a MAC protocol could create an aggregate packet:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketAggregationExample" until="//!End"></pre>
<p>The following example shows a version of how a MAC protocol could disaggregate a
packet:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDisaggregationExample" until="//!End"></pre>
<p><h2><a name="sec:packets:serializing-packets"></a>2.15 Serializing Packets<a class="headerlink" href="#sec:packets:serializing-packets" title="Permalink to this headline">&para;</a></h2>

<p>In real communication systems packets are usually stored as a sequence of bytes
directly in network byte order. In contrast, INET usually stores packets in
small field based C++ classes (generated by the OMNeT++ MSG compiler) to ease
debugging. In order to calculate checksums or to communicate with real hardware,
all protocol specific parts must be serializable to a sequence of bytes.

<p>The protocol header serializers are separate classes from the actual protocol
headers. They must be registered in the <tt>ChunkSerializerRegistry</tt> in
order to be used. The following example shows how a MAC protocol header could be
serialized to a sequence of bytes:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketSerializationExample" until="//!End"></pre>
<p>Deserialization is somewhat more complicated than serialization, because it must
be prepared to handle incomplete or even incorrect data due to errors introduced
by the network. The following example shows how a MAC protocol header could be
deserialized from a sequence of bytes:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDeserializationExample" until="//!End"></pre>
<p><h2><a name="sec:packets:emulation-support"></a>2.16 Emulation Support<a class="headerlink" href="#sec:packets:emulation-support" title="Permalink to this headline">&para;</a></h2>

<p>In order to be able to communicate with real hardware, packets must be converted
to and from a sequence of bytes. The reason is that the programming interface of
operating systems and external libraries work with sending and receiving raw
data.

<p>All protocol headers and data chunks which are present in a packet must have a
registered serializer to be able to create the raw sequence of bytes. Protocol
modules must also be configured to either disable or compute checksums, because
serializers cannot carry out the checksum calculation.

<p>The following example shows how a packet could be converted to a sequence of
bytes to send through an external interface:

<p><pre class="snippet" src="Snippets.cc" after="//!EmulationPacketSendingExample" until="//!End"></pre>
<p>The following example shows how a packet could be converted from a sequence of
bytes when receiving from an external interface:

<p><pre class="snippet" src="Snippets.cc" after="//!EmulationPacketReceivingExample" until="//!End"></pre>
<p>In INET, all protocols automatically support hardware emulation due to the dual
representation of packets. The above example creates a packet which contains a
single chunk with a sequence of bytes. As the packet is passed through the
protocols, they can interpret the data (e.g. by calling <tt>peekAtFront</tt>) as
they see fit. The Packet API always provides the requested representation,
either because it's already available in the packet, or because it gets
automatically deserialized.

<p><h2><a name="sec:packets:queueing-packets"></a>2.17 Queueing Packets<a class="headerlink" href="#sec:packets:queueing-packets" title="Permalink to this headline">&para;</a></h2>

<p>Some protocols store packet data temporarily at the sender node before actual
processing can occur. For example, the TCP protocol must store the outgoing data
received from the application in order to be able to provide transmission flow
control.

<p>The following example shows how a transport protocol could store the received
data temporarily until the data is actually used:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketQueueingExample" until="//!End"></pre>
<p>The <tt>ChunkQueue</tt> class acts similarly to a binary FIFO queue except it
works with chunks. Similarly to the <tt>Packet</tt> it also automatically
merge consecutive data and selects the most appropriate representation.

<p><h2><a name="sec:packets:buffering-packets"></a>2.18 Buffering Packets<a class="headerlink" href="#sec:packets:buffering-packets" title="Permalink to this headline">&para;</a></h2>

<p>Protocols at the receiver node often need to buffer incoming packet data until
the actual processing can occur. For example, packets may arrive out of order,
and the data they contain must be reassembled or reordered before it can be
passed along.

<p>INET provides a few special purpose C++ classes to support data buffering:
<ul>
	<li> <tt>ChunkBuffer</tt> provides automatic merging for large data
	chunks from out of order smaller data chunks.</li>
	<li> <tt>ReassemblyBuffer</tt> provides reassembling for out of order data
	according to an expected length.</li>
	<li> <tt>ReorderBuffer</tt> provides reordering for out of order data into a
	continuous data stream from an expected offset.</li>
</ul>

<p>All buffers deal with only the data, represented by chunks, instead of packets.
They automatically merge consecutive data and select the most appropriate
representation. Protocols using these buffers automatically support all data
representation provided by INET, and any combination thereof. For example,
<tt>ByteCountChunk</tt>, <tt>BytesChunk</tt>, <tt>FieldsChunk</tt>, and
<tt>SliceChunk</tt> can be freely mixed in the same buffer.

<p><h2><a name="sec:packets:reassembling-packets"></a>2.19 Reassembling Packets<a class="headerlink" href="#sec:packets:reassembling-packets" title="Permalink to this headline">&para;</a></h2>

<p>Some protocols may use an unreliable service to transfer a large piece of data
over the network. The unreliable service requires the receiver node to be
prepared for receiving parts out of order and potentially duplicated.

<p>For example, the IP protocol must store incoming fragments at the receiver node,
because it must wait until the datagram becomes complete, before it can be
passed along. The IP protocol must also be prepared for receiving the individual
fragments out of order and potentially duplicated.

<p>The following example shows how a network protocol could store and reassemble
the data of the incoming packets into a whole packet:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketReassemblingExample" until="//!End"></pre>
<p>The <tt>ReassemblyBuffer</tt> supports replacing the stored data at a given
offset, and it also provides the complete reassembled data with the expected
length if available.

<p><h2><a name="sec:packets:reordering-packets"></a>2.20 Reordering Packets<a class="headerlink" href="#sec:packets:reordering-packets" title="Permalink to this headline">&para;</a></h2>

<p>Some protocols may use an unreliable service to transfer a long data stream over
the network. The unreliable service requires the sender node to resend
unacknowledged parts, and it also requires the receiver node to be prepared for
receiving parts out of order and potentially duplicated.

<p>For example, the TCP protocol must buffer the incoming data at the receiver
node, because the TCP segments may arrive out of order and potentially
duplicated or overlapping, and TCP is required to provide the data to the
application in the correct order and only once.

<p>The following example shows how a transport protocol could store and reorder the
data of incoming packets, which may arrive out of order, and also how such a
protocol could pass along only the available data in the correct order:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketReorderingExample" until="//!End"></pre>
<p>The <tt>ReorderBuffer</tt> supports replacing the stored data at a given
offset, and it provides the available data from the expected offset if any.

<p><h2><a name="sec:packets:dispatching-packets"></a>2.21 Dispatching Packets<a class="headerlink" href="#sec:packets:dispatching-packets" title="Permalink to this headline">&para;</a></h2>

<p>Protocols also communicate with each other inside the network node by sending
packets, requests, and confirmations. INET is very flexible in terms of how
protocols can be connected to each other. Protocols can be connected directly,
or they can be connected through one or more <tt>MessageDispatcher</tt>
modules.

<p>This flexiblity allows creating very simple network nodes where the protocol
stack is a chain. But it also allows creating more complicated network nodes
where protocols are grouped into protocol layers to provide many-to-one and
many-to-many relationships. It's also possible to use dispatcher modules
hierarchically inside compound modules, or to connect all protocols to a single
central dispatcher module.

<p>The <tt>DispatchProtocolTag</tt> must be attached to a packet, request or
confirmation to allow the <tt>MessageDispatcher</tt> to direct the message to
the inteded recipient. The following example shows how a MAC protocol could send
up a packet to the designated protocol without actually knowing where that
protocol is in the network node:

<p><pre class="snippet" src="Snippets.cc" after="//!PacketDispatchingExample" until="//!End"></pre>
<p>The <tt>MessageDispatcher</tt> finds the designated protocol module and its
gate based on the <tt>registerProtocol</tt> calls it has received during the
initialization of all connected protocol modules.

<p><hr class='pgbr'><div class='oppnavbar'><a href="chap1.html">Prev</a> &#8226; <a href="chap3.html">Next</a> &#8226; <a href="toc.html#toc_2">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
