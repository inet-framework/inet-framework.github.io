---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap22.html">Prev</a> &#8226; <a href="chap24.html">Next</a> &#8226; <a href="toc.html#toc_23">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:power"></a>23 Modeling Power Consumption<a class="headerlink" href="#cha:power" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:power:overview"></a>23.1 Overview<a class="headerlink" href="#sec:power:overview" title="Permalink to this headline">&para;</a></h2>

<p>Modeling power consumption becomes more and more important with the increasing
number of embedded devices and the upcoming Internet of Things. Mobile personal
medical devices, large scale wireless environment monitoring devices, electric
vehicles, solar panels, low-power wireless sensors, etc. require paying special
attention to power consumption. The high fidelity simulation of power
consumption allows designing power sensitive routing protocols, MAC protocols,
physical layers, etc. which in turn results in more energy efficient devices.

<p>In order to help the modeling process the power model is separated from other
simulation models. This separation makes the model extensible and it also allows
easy experimentation with alternative implementations. In a nutshell the power
model consists of the following components:

<p><ul>
  <li> energy consumption models</li>
  <li> energy generation models</li>
  <li> temporary energy storage models</li>
</ul>

<p>The power model elements fall into two categories, abbreviated with <tt>Ep</tt>
and <tt>Cc</tt> as part of their names:

<p><ul>
  <li> <tt>Ep</tt> models are simpler, and deal with energy and power quantities.</li>
  <li> <tt>Cc</tt> models are more realistic, and deal with charge, current, and voltage quantities.</li>
</ul>

<p>The following sections provide a brief overview of the power model.

<p><h2><a name="sec:power:energy-consumer-models"></a>23.2 Energy Consumer Models<a class="headerlink" href="#sec:power:energy-consumer-models" title="Permalink to this headline">&para;</a></h2>

<p>Energy consumer models describe the energy consumption of devices over time.
For example, a transceiver consumes energy when it transmits or
receives signals, a CPU consumes energy when the network protocol routes
packets, and a display consumes energy when it's turned on.

<p>In INET, an energy consumer model is an OMNeT++ simple module that implements
the energy consumption of software processes or hardware devices over time.
Its main purpose is to provide the power or current consumption for the
current simulation time. Most often energy consumers are included as
submodules in the compound module of the hardware devices or software
components.

<p>INET provides only a few built-in energy consumer models:

<p><ul>
        <li> <tt>AlternatingEpEnergyGenerator</tt> is a trivial energy/power based statistical energy consumer model example.</li>
        <li> <tt>StateBasedEpEnergyConsumer</tt> is a transceiver energy consumer model based on the radio mode and transmission/reception states.</li>
</ul>

<p>In order to simulate power consumption in a wireless network, the energy
consumer model type must be configured for the transceivers. The following
example demonstrates how to configure the power consumption parameters for
a transceiver energy consumer model:

<p><pre class="snippet" src="Snippets.ini" after="#!EnergyConsumerConfigurationExample" until="#!End"></pre><small>Energy consumer configuration example</small>
<p>
<h2><a name="sec:power:energy-generator-models"></a>23.3 Energy Generator Models<a class="headerlink" href="#sec:power:energy-generator-models" title="Permalink to this headline">&para;</a></h2>

<p>Energy generator models describe the energy generation of devices over time.
A solar panel, for example, produces energy based on time, the panel's
position on the globe, its orientation towards the sun and the actual weather
conditions. Energy generators connect to an energy storage that absorbs the
generated energy.

<p>In INET, an energy generator model is an OMNeT++ simple module implementing
the energy generation of a hardware device using a physical phenomena over
time. Its main purpose is to provide the power or current generation for
the current simulation time. Most often energy generation models are
included as submodules in network nodes.

<p>INET provides only one trivial energy/power based statistical energy
generator model called <tt>AlternatingEpEnergyGenerator</tt>. The following
example shows how to configure its power generation parameters:

<p><pre class="snippet" src="Snippets.ini" after="#!EnergyGeneratorConfigurationExample" until="#!End"></pre><small>Energy generator configuration example</small>
<p><h2><a name="sec:power:energy-storage-models"></a>23.4 Energy Storage Models<a class="headerlink" href="#sec:power:energy-storage-models" title="Permalink to this headline">&para;</a></h2>

<p>Electronic devices which are not connected to external power source must contain
some component to store energy. For example, an electrochemical battery in a
mobile phone provides energy for its display, its CPU, and its communication
devices. It might also absorb energy produced by a solar installed on its
display, or by a portable charger plugged into the wall socket.

<p>In INET, an energy storage model is an OMNeT++ simple module which models
the physical phenomena that is used to store energy produced by generators
and provide energy for consumers. Its main purpose is to compute the amount
of available energy or charge at the current simulation time. It maintains
a set of connected energy consumers and energy generators, their respective
total power consumption and total power generation.

<p>INET contains a few built-in energy storage models:

<p><ul>
        <li> <tt>IdealEpEnergyStorage</tt> is an idealistic model with infinite energy capacity and infinite power flow.</li>
        <li> <tt>SimpleEpEnergyStorage</tt> is a non-trivial model integrating the difference between the total consumed power and the total generated power over time.</li>
        <li> <tt>SimpleCcBattery</tt> is a more realistic charge/current based battery model using a charge independent ideal voltage source and internal resistance.</li>
</ul>

<p>The following example shows how to configure a simple energy storage model:

<p><pre class="snippet" src="Snippets.ini" after="#!EnergyStorageConfigurationExample" until="#!End"></pre><small>Energy storage configuration example</small>
<p><h2><a name="sec:power:energy-management-models"></a>23.5 Energy Management Models<a class="headerlink" href="#sec:power:energy-management-models" title="Permalink to this headline">&para;</a></h2>


<tt>SimpleEpEnergyManagement</tt>

<p><pre class="snippet" src="Snippets.ini" after="#!EnergyManagementConfigurationExample" until="#!End"></pre><small>Energy management configuration example</small>
<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap22.html">Prev</a> &#8226; <a href="chap24.html">Next</a> &#8226; <a href="toc.html#toc_23">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
