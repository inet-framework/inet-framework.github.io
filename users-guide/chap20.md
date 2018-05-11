---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap19.html">Prev</a> &#8226; <a href="chap21.html">Next</a> &#8226; <a href="toc.html#toc_20">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:transmission-medium"></a>20 The Transmission Medium<a class="headerlink" href="#cha:transmission-medium" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:medium:overview"></a>20.1 Overview<a class="headerlink" href="#sec:medium:overview" title="Permalink to this headline">&para;</a></h2>

<p>For wireless communication, an additional module is required to model the
shared physical medium where the communication takes place. This module
keeps track of transceivers, noise sources, ongoing transmissions,
background noise, and other ongoing noises.

<p>It relies on several models:

<p><ol>
  <li> signal propagation model</li>
  <li> path loss model</li>
  <li> obstacle loss model</li>
  <li> background noise model</li>
  <li> signal analog model</li>
</ol>

<p>With the help of the above models, the medium module computes
when, where, and how signals arrive at receivers, including
the set of interfering signals and noises. In addition,
the medium module also contains various mechanisms and ways
to improve the scalability of wireless network simulations.

<p><h2><a name="sec:medium:radiomedium"></a>20.2 RadioMedium<a class="headerlink" href="#sec:medium:radiomedium" title="Permalink to this headline">&para;</a></h2>

<p>The standard transmission medium model in INET is <tt>RadioMedium</tt>.
<tt>RadioMedium</tt> is as an OMNeT++ compound module with
several replaceable submodules. It contains submodules for
each of the above models (signal propagation, path loss, etc.),
and various caches for efficiency.

<p>Note that <tt>RadioMedium</tt> is an active compound module, that is,
it has an associated C++ class that encapsulates the computations.

<p><tt>RadioMedium</tt> contains its components as submodules
with parametric types:

<pre><code data-language="ned">propagation: &lt;propagationType&gt; like IPropagation;
analogModel: &lt;analogModelType&gt; like IAnalogModel;
backgroundNoise: &lt;backgroundNoiseType&gt; like IRadioBackgroundNoise
    if backgroundNoiseType != "";
pathLoss: &lt;pathLossType&gt; like IPathLoss;
obstacleLoss: &lt;obstacleLossType&gt; like IObstacleLoss
    if obstacleLossType != "";
mediumLimitCache: &lt;mediumLimitCacheType&gt; like IMediumLimitCache;
communicationCache: &lt;communicationCacheType&gt; like ICommunicationCache;
neighborCache: &lt;neighborCacheType&gt; like INeighborCache
    if neighborCacheType != "";</code></pre><p>
There are many preconfigured versions of <tt>RadioMedium</tt>:

<p><ul>
  <li> For use with <tt>UnitDiskRadio</tt>: <tt>UnitDiskRadioMedium</tt></li>
  <li> For APSK radios: <tt>ApskScalarRadioMedium</tt>, <tt>ApskDimensionalRadioMedium</tt>,
    <tt>ApskLayeredScalarRadioMedium</tt>, <tt>ApskLayeredDimensionalRadioMedium</tt>,</li>
  <li> For IEEE 802.11: <tt>Ieee80211ScalarRadioMedium</tt>, <tt>Ieee80211DimensionalRadioMedium</tt>,
    <tt>Ieee80211LayeredScalarRadioMedium</tt>, <tt>Ieee80211LayeredDimensionalRadioMedium</tt>,</li>
  <li> For IEEE 802.15.4: <tt>Ieee802154UwbIrRadioMedium</tt>, <tt>Ieee802154NarrowbandScalarRadioMedium</tt></li>
</ul>

<p>The following sections describe the parts of the medium model.

<p><h2><a name="sec:medium:propagation-models"></a>20.3 Propagation Models<a class="headerlink" href="#sec:medium:propagation-models" title="Permalink to this headline">&para;</a></h2>

<p>When a transmitter starts to transmit a signal, the beginning of the signal
propagates through the transmission medium. When the transmitter ends the
transmission, the signal's end propagates similarly. The propagation model
describes how a signal moves through space over time. Its main purpose is
to compute the arrival space-time coordinates at receivers. There are two
built-in models in INET, implemented as simple modules:

<p><ul>
        <li> <tt>ConstantTimePropagation</tt> is a simplistic model where the propagation time is independent of the traveled distance. The propagation time is simply determined by a module parameter.</li>
        <li> <tt>ConstantSpeedPropagation</tt> is a more realistic model where the propagation time is proportional to the traveled distance. The propagation time is independent of the transmitter and receiver movement during both signal transmission and propagation. The propagation speed is determined by a module parameter.</li>
</ul>

<p>The default propagation model is configured as follows:

<p><pre class="snippet" src="Snippets.ini" after="#!PropagationModelConfigurationExample" until="#!End"></pre><small>Propagation model configuration example</small>
<p>A more accurate model could take into consideration the transmitter and
receiver movement. This effect becomes especially important for acoustic
communication, because the propagation speed of the signal is much more
comparable to the speed of the transceivers.

<p><h2><a name="sec:medium:path-loss-models"></a>20.4 Path Loss Models<a class="headerlink" href="#sec:medium:path-loss-models" title="Permalink to this headline">&para;</a></h2>

<p>As a signal propagates through space its power density decreases. This is
called path loss and it is the combination of many effects such as
free-space loss, refraction, diffraction, reflection, and absorption. There
are several different path loss models in the literature, which differ in
their parameterization and application area.

<p>In INET, a path loss model is an OMNeT++ simple module implementing a
specific path loss algorithm. Its main purpose is to compute the power loss
for a given signal, but it is also capable of estimating the range for a
given loss. The latter is useful, for example, to allow visualizing
communication range. INET contains a number of built-in path loss
algorithms, each comes with its own set of parameters:

<p><ul>
        <li> <tt>FreeSpacePathLoss</tt> models line of sight path loss for air or vacuum.</li>
        <li> <tt>BreakpointPathLoss</tt> refines it using dual slope model with two separate path loss exponents.</li>
        <li> <tt>LogNormalShadowing</tt> models path loss for a wide range of environments (e.g. urban areas, and buildings)</li>
        <li> <tt>TwoRayGroundReflection</tt> models interference between line of sight and single ground reflection.</li>
        <li> <tt>TwoRayInterference</tt> refines the above for inter-vechicle communication.</li>
        <li> <tt>RicianFading</tt> is a stochastical model for the anomaly caused by partial cancellation of a signal by itself.</li>
        <li> <tt>RayleighFading</tt> is a stochastical model for heavily built-up urban environments when there is no dominant propagation along the line of sight.</li>
        <li> <tt>NakagamiFading</tt> further refines the above two models for cellular systems.</li>
</ul>

<p>The following example replaces the default free-space path loss model with
log normal shadowing:

<p><pre class="snippet" src="Snippets.ini" after="#!PathLossConfigurationExample" until="#!End"></pre><small>Path loss configuration example</small>
<p><h2><a name="sec:medium:obstacle-loss-models"></a>20.5 Obstacle Loss Models<a class="headerlink" href="#sec:medium:obstacle-loss-models" title="Permalink to this headline">&para;</a></h2>

<p>When the signal propagates through space it also passes through physical
objects present in that space. As the signal penetrates physical objects,
its power decreases when it reflects from surfaces, and also when it is
absorbed by their material. There are various ways to model this effect,
which differ in the trade-off between accuracy and performance.

<p>In INET, an obstacle loss model is an OMNeT++ simple module. Its main
purpose is to compute the power loss based on the traveled path and the
signal frequency. The obstacle loss models most often use the physical
environment model to determine the set of penetrated physical objects.
INET contains a few built-in obstacle loss models:

<p><ul>
        <li> <tt>IdealObstacleLoss</tt> model determines total or no power loss at all by checking if there is any obstructing physical object along the straight propagation path.</li>
        <li> <tt>DielectricObstacleLoss</tt> computes the power loss based on the accurate dielectric and reflection loss along the straight path considering the shape, position, orientation, and material of obstructing physical objects.</li>
</ul>

<p>By default, the medium module doesn't contain any obstacle loss model, but
configuring one is very simple:

<p><pre class="snippet" src="Snippets.ini" after="#!ObstacleLossModelConfigurationExample" until="#!End"></pre><small>Obstacle loss model configuration example</small>
<p>Statistical obstacle loss models are also possible but currently not provided.

<p><h2><a name="sec:medium:background-noise-models"></a>20.6 Background Noise Models<a class="headerlink" href="#sec:medium:background-noise-models" title="Permalink to this headline">&para;</a></h2>

<p>Thermal noise, cosmic background noise, and other random fluctuations of
the electromagnetic field affect the quality of the communication channel.
This kind of noise doesn't come from a particular source, so it doesn't
make sense to model its propagation through space. The background noise
model describes instead how it changes over space and time.

<p>In INET, a background noise model is an OMNeT++ simple module. Its main
purpose is to compute the analog representation of the background noise for
a given space-time interval. For example,
<tt>IsotropicScalarBackgroundNoise</tt> computes a background noise that is
independent of space-time coordinates, and its scalar power is determined
by a module parameter.

<p>The simplest background noise model can be configured as follows:

<p><pre class="snippet" src="Snippets.ini" after="#!BackgroundNoiseModelConfigurationExample" until="#!End"></pre><small>Background noise model configuration example</small>
<p><h2><a name="sec:medium:analog-models"></a>20.7 Analog Models<a class="headerlink" href="#sec:medium:analog-models" title="Permalink to this headline">&para;</a></h2>

<p>The analog signal is a complex physical phenomenon which can be modeled in
many different ways. Choosing the right analog domain signal representation
is the most important factor in the trade-off between accuracy and
performance. The analog model of the transmission medium determines how
signals are represented while being transmitted, propagated, and received.

<p>In INET, an analog model is an OMNeT++ simple module. Its main purpose is
to compute the received signal from the transmitted signal. The analog
model combines the effect of the antenna, path loss, and obstacle loss
models. Transceivers must be configured transmit and receive signals
according to the representation used by the analog model.

<p>The most commonly used analog model, which uses a scalar signal power
representation over a frequency and time interval, can be configured as
follows:

<p><pre class="snippet" src="Snippets.ini" after="#!AnalogModelConfigurationExample" until="#!End"></pre><small>Analog model configuration example</small>
<p><h2><a name="sec:medium:neighbor-cache"></a>20.8 Neighbor Cache<a class="headerlink" href="#sec:medium:neighbor-cache" title="Permalink to this headline">&para;</a></h2>

<p>Transceivers are considered neighbors if successful communication is
possible between them. For wired communication it is easy to determine
which transceivers are neighbors, because they are connected by wires. In
contrast, in wireless communication determining which transceivers are
neighbors isn't obvious at all.

<p>In INET, a neighbor cache is an OMNeT++ simple module which provides
an efficient way of keeping track of the neighbor relationship between
transceivers. Its main purpose is to compute the set of affected receivers
for a given transmission. All built-in models in INET provide a
conservative approximation only, because they update their state
periodically:

<p><ul>
  <li> <tt>NeighborListNeighborCache</tt> takes a range as parameter,
    and for each transceiver it maintains the list of receivers within
    range (<i>neighbor list</i>).</li>
  <li> <tt>GridNeighborCache</tt> organizes transceivers in a 3D grid with
    constant cell size.</li>
  <li> <tt>QuadTreeNeighborCache</tt> organizes transceivers in a 2D quad tree
    (ignoring the Z axis) with constant node size.</li>
</ul>

<p>The following example sets <tt>QuadTreeNeighborCache</tt> as neighbor cache:

<p><pre class="snippet" src="Snippets.ini" after="#!NeighborCacheModelConfigurationExample" until="#!End"></pre><small>Neighbor cache model configuration example</small>
<p>How should one decide which neighbor cache to choose for a given simulation?
As the sole purpose of the neighbor cache is to speed up the simulation,
one should choose the one that leads to the best performance for that particular
network. Which one performs best is best determined by experimentation, as it
depends on many factors: number of nodes, their spatial distribution, their
speed and movement pattern, their communication pattern, and so on.
Note that not only the choice of neighbor cache but also its parameterization
can affect performance.

<p>
<h2><a name="sec:medium:medium-limit-cache"></a>20.9 Medium Limit Cache<a class="headerlink" href="#sec:medium:medium-limit-cache" title="Permalink to this headline">&para;</a></h2>

<p>The medium limit cache (and its default implementation <tt>MediumLimitCache</tt>)
keeps track of certain thresholds and minimum/maximum values of quantities
related to layer 1 modeling. Some of these limits can be gathered from other
modules in the network, but still, all of them can be explicitly specified by the user.
The quantities include:

<p><ul>
    <li> maximum speed (can be gathered from mobility models)</li>
    <li> maximum transmission power</li>
    <li> minimum interference power and reception power</li>
    <li> maximum antenna gain (can be computed from antenna models)</li>
    <li> minimum time interval to consider two overlapping signals interfering</li>
    <li> maximum duration of a transmission</li>
    <li> maximum communication range and interference range
      (can be computed from transmitter and receiver models)</li>
</ul>

<p>These limits allow the transmission medium model to make assumptions about the
locations of nodes (i.e. the maximum distance they can move during some
interval), about the possibility of interference, and about the possibility
of a signal being receivable.

<p>
<h2><a name="sec:medium:communication-cache"></a>20.10 Communication Cache<a class="headerlink" href="#sec:medium:communication-cache" title="Permalink to this headline">&para;</a></h2>

<p>The communication cache is used to cache various intermediate computation
results related to the communication on the medium. The main motivation to have
multiple implementations is that different implementations may be the most
efficient in different simulations. Also, a conservative (simple but robust)
implementation may be used for validating new (more efficient but also more
complex) implementations.

<p>Implementations include:

<p><ul>
  <li> <tt>ReferenceCommunicationCache</tt></li>
  <li> <tt>MapCommunicationCache</tt></li>
  <li> <tt>VectorCommunicationCache</tt></li>
</ul>

<p>
<h2><a name="sec:medium:improving-scalability"></a>20.11 Improving Scalability<a class="headerlink" href="#sec:medium:improving-scalability" title="Permalink to this headline">&para;</a></h2>

<p>The simulation of wireless networks is inherently less scalable than
that of wired networks. In wired networks, a transmission only affects
the host's neighbors on the link, which is usually 1 in modern networks
that are dominated by point-to-point links. The wireless medium, however,
is a broadcast medium. Any transmission is &#8220;heard&#8221; by all nodes
within interference range, not only the intended recipients.
The signal may be receivable by them (and must be indeeded received
before the destination address field in it can be examined),
or may interfere with the reception of other transmissions.
Whichever the case, the transmission must be evaluated or processed
by a much larger number of nodes than in the wired case.
This makes the computational complexity at least <i>O(n<sup>2</sup>)</i> (<i>n</i> being
the number of nodes.) Other effects may further increase the exponent.

<p>The medium module provides a set of parameters that can be used
to alleviate the scalability issue. These <i>filter</i> parameters
that can be used to reduce the amount of processing at nodes that are
not the indended recipients of the frame, increasing simulation performance.

<p>There are several filters that can be enabled/disabled individually:

<p><ul>
  <li> <i>Range filter</i>. When this filter is active, the medium module
    does not send signals to a radio if it is outside interference range
    (or communication range, this option can also be selected.)</li>
  <li> <i>Radio mode filter</i>. When this filter is active,
    the medium module does not send signals to a radio if it is neither
    in <i>receiver</i> nor in <i>transceiver</i> mode.</li>
  <li> <i>Listening filter</i>. When this filter is active, the medium module
    does not send signals to a radio if it listens on the channel in
    incompatible mode (e.g. different carrier frequency and bandwidth,
    or different modulation)</li>
  <li> <i>MAC address filter</i>. When this filter is active, the radio medium
    does not send signals to a radio if it the destination MAC address
    does not match</li>
</ul>

<p>The corresponding module parameters are called <tt>rangeFilter</tt>,
<tt>radioModeFilter</tt>, <tt>listeningFilter</tt> and <tt>macAddressFilter</tt>.
By default, all filters are turned off.

<hr class='pgbr'><div class='oppnavbar'><a href="chap19.html">Prev</a> &#8226; <a href="chap21.html">Next</a> &#8226; <a href="toc.html#toc_20">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
