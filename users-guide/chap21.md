---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap20.html">Prev</a> &#8226; <a href="chap22.html">Next</a> &#8226; <a href="toc.html#toc_21">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:environment"></a>21 The Physical Environment<a class="headerlink" href="#cha:environment" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:environment:overview"></a>21.1 Overview<a class="headerlink" href="#sec:environment:overview" title="Permalink to this headline">&para;</a></h2>

<p>Wireless networks are heavily affected by the physical environment, and the
requirements for today's ubiquitous wireless communication devices are
increasingly demanding. Cellular networks serve densely populated urban
areas, wireless LANs need to be able to cover large buildings with several
offices, low-power wireless sensors must tolerate noisy industrial
environments, batteries need to remain operational under various external
conditions, and so on.

<p>The propagation of radio signals, the movement of communicating agents,
battery exhaustion, etc., depend on the surrounding physical environment.
For example, signals can be absorbed by objects, can pass through objects,
can be refracted by surfaces, can be reflected from surfaces, or battery
capacity might depend on external temperature. These effects cannot
be ignored in high-fidelity simulations.

<p>In order to help the modeling process, the model of the physical environment in
the INET Framework is separated from the rest of the simulation model. The main
goal of the physical environment model is to describe buildings, walls,
vegetation, terrain, weather, and other physical objects and conditions that
might have effects on radio signal propagation, movement, batteries, etc. This
separation makes the model reusable by all other simulation models that depend
on these circumstances.

<p>The following sections provide a brief overview of the physical environment
model.

<p><h2><a name="sec:environment:physicalenvironment"></a>21.2 PhysicalEnvironment<a class="headerlink" href="#sec:environment:physicalenvironment" title="Permalink to this headline">&para;</a></h2>

<p>In INET, the physical environment is modeled by the
<tt>PhysicalEnvironment</tt> compound module. This module normally has one
instance in the network, and acts as a database that other parts of the
simulation can query at runtime. It contains the following information:

<p><ul>
  <li> geometry and properties of <i>physical objects</i> (usually referrred to as &#8220;obstacles&#8221; in wireless simulations)</li>
  <li> a <i>ground model</i></li>
  <li> other physical properties of the environment, like its bounds in space</li>
</ul>

<p><tt>PhysicalEnvironment</tt> is an active compound module, that is, it has an
associated C++ class that contains the data structures and implements an API
that allows other modules to query the data.

<p>Part of <tt>PhysicalEnvironment</tt>'s functionality is implemented in
submodules for easy replacement. They are currently the ground model,
and an object cache (for efficient queries):

<pre><code data-language="ned">ground: &lt;groundType&gt; like IGround if groundType != "";
objectCache: &lt;objectCacheType&gt; like IObjectCache if objectCacheType != "";</code></pre><p>
<h2><a name="sec:environment:physical-objects"></a>21.3 Physical Objects<a class="headerlink" href="#sec:environment:physical-objects" title="Permalink to this headline">&para;</a></h2>

<p>The most important aspect of the physical environment is the objects which are
present in it. For example, simulating an indoor Wifi scenario may need to model
walls, floors, ceilings, doors, windows, furniture, and similar objects, because
they all affect signal propagation (obstacle modeling).

<p>Objects are located in space, and have shapes and materials. The physical
environment model supports basic shapes and homogeneous materials, which is a
simplified description but still allows for a reasonable approximation of
reality. Physical objects in INET have the following properties:

<p><ul>
    <li> <i>shape</i> describes the object in 3D independent of its position and orientation.</li>
    <li> <i>position</i> determines where the object is located in the 3D space.</li>
    <li> <i>orientation</i> determines how the object is rotated relative to its default orientation.</li>
    <li> <i>material</i> describes material specific physical properties.</li>
    <li> <i>graphical properties</i> provide parameters for better visualization.</li>
</ul>

<p>Graphical properties include:

<p><ul>
  <li> <i>line width</i>: affects surface outline</li>
  <li> <i>line color</i>: affects surface outline</li>
  <li> <i>fill color</i>: affects surface fill</li>
  <li> <i>opacity</i>: affects surface outline and fill</li>
  <li> <i>tags</i>: allows filtering objects on the graphical user interface</li>
</ul>

<p>Physical objects in INET are stationary, they cannot change their position
or orientation over time. Since the shape of the physical objects might be
quite diverse, the model is designed to be extensible with new shapes.
INET provides the following shapes:

<p><ul>
    <li> <i>sphere</i> shapes are specified by a radius</li>
    <li> <i>cuboid</i> shapes are specified by a length, a width, and a height</li>
    <li> <i>prism</i> shapes are specified by a 2D polygon base and a height</li>
    <li> <i>polyhedron</i> shapes are specified by the convex hull of a set of 3D vertices</li>
</ul>

<p>The following example shows how to define various physical objects using
the XML syntax supported by the physical environment:

<p><pre class="snippet" src="Snippets.xml" after="<!--!DefiningPhysicalObjectsExample-->" until="<!--End-->"></pre>
<p>In order to load the above XML file, the following configuration could be
used:

<p><pre class="snippet" src="Snippets.ini" after="#!PhysicalObjectsConfigurationExample" until="#!End"></pre>
<p><h2><a name="sec:environment:ground-models"></a>21.4 Ground Models<a class="headerlink" href="#sec:environment:ground-models" title="Permalink to this headline">&para;</a></h2>

<p>In inter-vehicle simulations the terrain has profound effects on signal
propagation. For example, vehicles on the opposite sides of a mountain
cannot directly communicate with each other.

<p>A ground model describes the 3D surface of the terrain. Its main purpose is
to compute a position on the surface underneath an particular position.

<p>INET contains the following built-in ground models implemented as
OMNeT++ simple modules:

<p><ul>
    <li> <tt>FlatGround</tt> is a trivial model which provides a flat surface parallel to the XY plane at a certain height.</li>
    <li> <tt>OsgEarthGround</tt> is a more realistic model (based on <b>osgEarth</b>) which provides a terrain surface.</li>
</ul>

<p><h2><a name="sec:environment:geographic-coordinate-system-models"></a>21.5 Geographic Coordinate System Models<a class="headerlink" href="#sec:environment:geographic-coordinate-system-models" title="Permalink to this headline">&para;</a></h2>

<p>In order to run high fidelity simulations, it is often required to embed
the communication network into a real world map. With the new OMNeT++ 5
version, INET already provides support for 3D maps using
<b>osgEarth</b> for visualization and <b>openstreetmap</b> as the map
provider.

<p>However, INET carries out all geometric computation internally (including
signal propagation and path loss) in a 3D Euclidean coordinate system. The
discrepancy between the internal playground coordinate system and the usual
geographic coordinate systems must be resolved.

<p>A geographic coordinate system model maps playground coordinates to
geographic coordinates, and vice versa. Such a model allows positioning
physical objects and describing network node mobility using geographical
coordinates (e.g longitude, latitude, altitude).

<p>In INET, a geographic coordinate system model is implemented as an OMNeT++
simple module:

<p><ul>
    <li> <tt>SimpleGeographicCoordinateSystem</tt> provides a trivial linear approximation without any external dependency.</li>
    <li> <tt>OsgGeographicCoordinateSystem</tt> provides an accurate mapping using the external <b>osgEarth</b> library.</li>
</ul>

<p>In order to use geographic coordinates in a simulation, a geographic
coordinate system module must be included in the network. The desired
physical environment module and mobility modules must be configured (using
module path parameters) to use the geographic coordinate system module. The
following example also shows how the geographic coordinate system module
can be configured to place the playground at a particular geographic
location and orientation.

<p><pre class="snippet" src="Snippets.ini" after="#!GeographicCoordinateSystemConfigurationExample" until="#!End"></pre>
<p><h2><a name="sec:environment:object-cache"></a>21.6 Object Cache<a class="headerlink" href="#sec:environment:object-cache" title="Permalink to this headline">&para;</a></h2>

<p>If a simulation contains a large number of physical objects, then signal
propagation may become computationally very expensive. The reason is that
the transmission medium model must check each line of sight path between
all transmitter and receiver pairs against all physical objects.

<p>An object cache organizes physical objects into a data structure which provides
efficient geometric queries. Its main purpose is to iterate all physical objects
penetrated by a 3D line segment.

<p>In INET, an object cache model is implemented as an OMNeT++ simple module:

<p><ul>
    <li> <tt>GridObjectCache</tt> organizes objects into a fixed cell size 3D spatial grid.</li>
    <li> <tt>BvhObjectCache</tt> organizes objects into a tree data structure based on recursive 3D volume division.</li>
</ul>

<p>

<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap20.html">Prev</a> &#8226; <a href="chap22.html">Next</a> &#8226; <a href="toc.html#toc_21">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
