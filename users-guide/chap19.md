---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap18.html">Prev</a> &#8226; <a href="chap20.html">Next</a> &#8226; <a href="toc.html#toc_19">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:physicallayer"></a>19 The Physical Layer<a class="headerlink" href="#cha:physicallayer" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:phy:overview"></a>19.1 Overview<a class="headerlink" href="#sec:phy:overview" title="Permalink to this headline">&para;</a></h2>

<p>Wireless network interfaces contain a radio model component, which is
responsible for modeling the physical layer (PHY).<br><ul><font size='-1'>[Wired network interfaces
could similarly contain an explicit PHY model. The reason they do not is that
wired links normally have very low error rates and simple observable behavior,
and there is usually not much to be gained from modeling the physical layer in detail.]</font></li></ul>
The radio model describes the physical device that is capable of transmitting
and receiving signals on the medium.

<p>Conceptually, a radio model relies on several sub-models:

<p><ul>
  <li> antenna model</li>
  <li> transmitter model</li>
  <li> receiver model</li>
  <li> error model (as part of the receiver model)</li>
  <li> energy consumption model</li>
</ul>

<p>The antenna model is shared between the transmitter model and the receiver model.
The separation of the transmitter model and the receiver model allows
asymmetric configurations. The energy consumer model is optional, and
it is only used when the simulation of energy consumption is necessary.

<p>

<p>
<h2><a name="sec:phy:generic-radio"></a>19.2 Generic Radio<a class="headerlink" href="#sec:phy:generic-radio" title="Permalink to this headline">&para;</a></h2>

<p>In INET, radio models implement the <tt>IRadio</tt> module interface.
A generic, often used implementation of <tt>IRadio</tt> is the
<tt>Radio</tt> NED type. <tt>Radio</tt> is an active compound module,
that is, it has an associated C++ class that encapsulates the computations.

<p><tt>Radio</tt> contains its antenna, transmitter, receiver and energy
consumer models as submodules with parametric types:

<pre><code data-language="ned">antenna: &lt;antennaType&gt; like IAntenna;
transmitter: &lt;transmitterType&gt; like ITransmitter;
receiver: &lt;receiverType&gt; like IReceiver;
energyConsumer: &lt;energyConsumerType&gt; like IEnergyConsumer
    if energyConsumerType != "";</code></pre><p>
The following sections describe the parts of the radio model.

<p><h2><a name="sec:phy:components-of-a-radio"></a>19.3 Components of a Radio<a class="headerlink" href="#sec:phy:components-of-a-radio" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:phy:antenna-models"></a>19.3.1 Antenna Models<a class="headerlink" href="#sec:phy:antenna-models" title="Permalink to this headline">&para;</a></h3>

<p>The antenna model describes the effects of the physical device which converts
electric signals into radio waves, and vice versa. This model captures the
antenna characteristics that heavily affect the quality of the communication
channel. For example, various antenna shapes, antenna size and geometry, antenna
arrays, and antenna orientation causes different directional or frequency
selectivity.

<p>The antenna model provides a position and an orientation using a mobility model
that defaults to the mobility of the node. The main purpose of this model is to
compute the antenna gain based on the specific antenna characteristics and the
direction of the signal. The signal direction is computed by the medium from the
position and the orientation of the transmitter and the receiver. The following
list provides some examples:

<p><ul>
  <li> <tt>IsotropicAntenna</tt>: antenna gain is exactly 1 in any direction</li>
  <li> <tt>ConstantGainAntenna</tt>: antenna gain is a constant determined by
    a parameter</li>
  <li> <tt>DipoleAntenna</tt>: antenna gain depends on the direction according
    to the dipole antenna characteristics</li>
  <li> <tt>InterpolatingAntenna</tt>: antenna gain is computed by linear
    interpolation according to a table indexed by the direction angles</li>
</ul>

<p><h3><a name="sec:phy:transmitter-models"></a>19.3.2 Transmitter Models<a class="headerlink" href="#sec:phy:transmitter-models" title="Permalink to this headline">&para;</a></h3>

<p>The transmitter model describes the physical process which converts packets into
electric signals. In other words, this model converts an L2 frame into a signal
that is transmitted on the medium. The conversion process and the representation
of the signal depends on the level of detail and the physical characteristics
of the implemented protocol.

<p>There are two main levels of detail (or modeling depths):

<p><ul>
<li> In the <i>flat model</i>, the transmitter model skips the symbol domain
and the sample domain representations, and it directly creates the analog domain
representation. The bit domain representation is reduced to the bit length of
the packet, and the actual bits are ignored.</li>
<li> In the <i>layered model</i>, the conversion process involves various
processing steps such as packet serialization, forward error correction encoding,
scrambling, interleaving, and modulation. This transmitter model requires
significantly more computation, but it produces accurate bit domain,
symbol domain, and sample domain representations.</li>
</ul>

<p>Some of the transmitter types available in INET:

<p><ul>
  <li> <tt>UnitDiskTransmitter</tt></li>
  <li> <tt>ApskScalarTransmitter</tt></li>
  <li> <tt>ApskDimensionalTransmitter</tt></li>
  <li> <tt>ApskLayeredTransmitter</tt></li>
  <li> <tt>Ieee80211ScalarTransmitter</tt></li>
  <li> <tt>Ieee80211DimensionalTransmitter</tt></li>
</ul>

<p>

<p>
<h3><a name="sec:phy:receiver-models"></a>19.3.3 Receiver Models<a class="headerlink" href="#sec:phy:receiver-models" title="Permalink to this headline">&para;</a></h3>

<p>The receiver model describes the physical process which converts electric
signals into packets. In other words, this model converts a reception, along
with an interference computed by the medium model, into a MAC packet and a
reception indication.

<p>For a packet to be received successfully, reception must be <i>possible</i>
(based on reception power, bandwidth, modulation scheme and other characteristics),
it must be <i>attempted</i> (i.e. the receiver must synchronize itself on
the preamble and start receiving), and it must be <i>successful</i>
(as determined by the error model and the simulated part of the signal decoding).

<p>In the <i>flat model</i>, the receiver model skips the sample domain, the symbol domain,
and the bit domain representations, and it directly creates the packet domain
representation by copying the packet from the transmission. It uses the error
model to decide whether the reception is successful.

<p>In the <i>layered model</i>, the conversion process involves various processing steps
such as demodulation, descrambling, deinterleaving, forward error correction
decoding, and deserialization. This reception model requires much more
computation than the flat model, but it produces accurate sample domain,
symbol domain, and bit domain representations.

<p>Some of the receiver types available in INET:

<p><ul>
  <li> <tt>UnitDiskReceiver</tt></li>
  <li> <tt>ApskScalarReceiver</tt></li>
  <li> <tt>ApskDimensionalReceiver</tt></li>
  <li> <tt>ApskLayeredReceiver</tt></li>
  <li> <tt>Ieee80211ScalarReceiver</tt></li>
  <li> <tt>Ieee80211DimensionalReceiver</tt></li>
</ul>

<p>
<h3><a name="sec:phy:error-models"></a>19.3.4 Error Models<a class="headerlink" href="#sec:phy:error-models" title="Permalink to this headline">&para;</a></h3>

<p>Determining reception errors is a crucial part of the reception process.
There are often several different statistical error models in the literature
even for a particular physical layer. In order to support this diversity, the
error model is a separate replaceable component of the receiver.

<p>The error model describes how the signal to noise ratio affects the amount of
errors at the receiver. The main purpose of this model is to determine whether
the received packet has errors or not. It also computes various physical
layer indications for higher layers such as packet error rate, bit error rate,
and symbol error rate. For the layered reception model it needs to compute the
erroneous bits, symbols, or samples depending on the lowest simulated physical
domain where the real decoding starts. The error model is optional (if omitted,
all receptions are considered successful.)

<p>The following list provides some examples:

<p><ul>
  <li> <tt>StochasticErrorModel</tt>: simplistic error model with constant
    symbol/bit/packet error rates as parameters; suitable for testing.</li>
  <li> <tt>ApskErrorModel</tt></li>
  <li> <tt>Ieee80211NistErrorModel</tt>, <tt>Ieee80211YansErrorModel</tt>,
    <tt>Ieee80211BerTableErrorModel</tt>: various error models for IEEE 802.11
    network interfaces.</li>
</ul>

<p><h3><a name="sec:phy:power-consumption-models"></a>19.3.5 Power Consumption Models<a class="headerlink" href="#sec:phy:power-consumption-models" title="Permalink to this headline">&para;</a></h3>

<p>A substantial part of the energy consumption of communication devices comes from
transmitting and receiving signals. The energy consumer model describes how the
radio consumes energy depending on its activity. This model is optional (if
omitted, energy consumption is ignored.)

<p>The following list provides some examples:

<p><ul>
  <li> <tt>StateBasedEpEnergyConsumer</tt>: power consumption is
    determined by the radio state (a combination of radio mode,
    transmitter state and receiver state), and specified in
    parameters like <tt>receiverIdlePowerConsumption</tt> and
    <tt>receiverReceivingDataPowerConsumption</tt>, in watts.</li>
  <li> <tt>StateBasedCcEnergyConsumer</tt>: similar to the previous
    one, but consumption is given in amp\`eres.</li>
</ul>

<p><h2><a name="sec:phy:layered-radio-models"></a>19.4 Layered Radio Models<a class="headerlink" href="#sec:phy:layered-radio-models" title="Permalink to this headline">&para;</a></h2>

<p>In layered radio models, the transmitter and receiver models are split
to several stages to allow more fine-grained modeling.

<p>For transmission, processing steps such as packet serialization,
forward error correction (FEC) encoding, scrambling, interleaving, and
modulation are explicitly modeled. Reception involves the inverse
operations: demodulation, descrambling, deinterleaving,
FEC decoding, and deserialization.

<p>In layered radio models, these processing steps are encapsulated
in four stages, represented as four submodules in both the
transmitter and receiver model:

<p><ol>
  <li> <i>Encoding and Decoding</i> describe how the packet domain
    signal representation is converted into the bit domain, and vice versa.</li>
  <li> <i>Modulation and Demodulation</i> describe how the bit domain
    signal representation is converted into the symbol domain, and vice versa.</li>
  <li> <i>Pulse Shaping and Pulse Filtering</i> describe how the
    symbol domain signal representation is converted into the sample domain,
    and vice versa.</li>
  <li> <i>Digital Analog and Analog Digital Conversion</i> describe
    how the sample domain signal representation is converted into the
    analog domain, and vice versa.</li>
</ol>

<p>In layered radio transmitters and receivers such as <tt>ApskLayeredTransmitter</tt>
and <tt>ApskLayeredReceiver</tt>, these submodules have parametric
types to make them replaceable. This provides immense freedom for
experimentation.

<p><h2><a name="sec:phy:notable-radio-models"></a>19.5 Notable Radio Models<a class="headerlink" href="#sec:phy:notable-radio-models" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>Radio</tt> module has several specialized versions derived
from it, where certain submodule types and parameters are set to fixed values.
This section describes some of the frequently used ones.

<p>The radio can be replaced in wireless network interfaces by setting the
<tt>radioType</tt> parameter, like in the following ini file fragment.

<pre><code data-language="ini">**.wlan[*].radioType = "UnitDiskRadio"</code></pre><p>
However, be aware that not all MAC protocols can be used with all radio models,
and that some radio models require a matching transmission medium module.

<p><h3><a name="sec:phy:unitdiskradio"></a>19.5.1 UnitDiskRadio<a class="headerlink" href="#sec:phy:unitdiskradio" title="Permalink to this headline">&para;</a></h3>

<p><tt>UnitDiskRadio</tt> provides a very simple but fast and predictable
physical layer model. It is the implementation (with some extensions)
of the <i>Unit Disk Graph</i> model, which is widely used
for the study of wireless ad-hoc networks.
<tt>UnitDiskRadio</tt> is applicable if network nodes need
to have a finite communication range, but physical effects
of signal propagation are to be ignored.

<p><tt>UnitDiskRadio</tt> allows three radii to be given as parameters,
instead of the usual one: communication range, interference range, and
detection range. One can also turn off interference modeling
(meaning that signals colliding at a receiver will all be received
correctly), which is sometimes a useful abstraction.

<p><tt>UnitDiskRadio</tt> needs to be used together with a special physical
medium model, <tt>UnitDiskRadioMedium</tt>.

<p>The following ini file fragment shows an example configuration.

<pre><code data-language="ini">*.radioMediumType = "UnitDiskRadioMedium"
*.host[*].wlan[*].radioType = "UnitDiskRadio"
*.host[*].wlan[*].radio.transmitter.bitrate = 2Mbps
*.host[*].wlan[*].radio.transmitter.preambleDuration = 0s
*.host[*].wlan[*].radio.transmitter.headerLength = 100b
*.host[*].wlan[*].radio.transmitter.communicationRange = 100m
*.host[*].wlan[*].radio.transmitter.interferenceRange = 0m
*.host[*].wlan[*].radio.transmitter.detectionRange = 0m
*.host[*].wlan[*].radio.receiver.ignoreInterference = true</code></pre><p>
As a side note, if modeling full connectivity and ignoring
interference is required, then <tt>ShortcutInterface</tt>
provides an even simpler and faster alternative.

<p><h3><a name="sec:phy:apsk-radio"></a>19.5.2 APSK Radio<a class="headerlink" href="#sec:phy:apsk-radio" title="Permalink to this headline">&para;</a></h3>

<p>APSK radio models provide a hypothetical radio that simulates
one of the well-known ASP, PSK and QAM modulations.
(APSK stands for Amplitude and Phase-Shift Keying.)

<p>APSK radio has scalar/dimensional, and flat/layered variants.
The flat variants, <tt>ApskScalarRadio</tt> and <tt>ApskDimensionalRadio</tt>
model frame transmissons in the selected modulation scheme
but without utilizing other techniques such as forward error
correction (FEC), interleaving, spreading, etc. These radios
require matching medium models, <tt>ApskScalarRadioMedium</tt>
and <tt>ApskDimensionalRadioMedium</tt>.

<p>The layered versions, <tt>ApskLayeredScalarRadio</tt>
and <tt>ApskLayeredDimensionalRadio</tt> can not only
model the processing steps missing from their simpler counterparts,
they also feature configurable level of detail: the transmitter
and receiver modules have <tt>levelOfDetail</tt> parameters that
control which domains are actually simulated.
These radio models must be used in conjuction with
<tt>ApskLayeredScalarRadioMedium</tt> and
<tt>ApskLayeredDimensionalRadioMedium</tt>, respectively.

<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap18.html">Prev</a> &#8226; <a href="chap20.html">Next</a> &#8226; <a href="toc.html#toc_19">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
