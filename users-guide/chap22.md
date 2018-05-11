---
layout: page
underMenu: Documentation
---



<div>INET User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap21.html">Prev</a> &#8226; <a href="chap23.html">Next</a> &#8226; <a href="toc.html#toc_22">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:mobility"></a>22 Node Mobility<a class="headerlink" href="#cha:mobility" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:mobility:overview"></a>22.1 Overview<a class="headerlink" href="#sec:mobility:overview" title="Permalink to this headline">&para;</a></h2>

<p>In order to simulate ad-hoc wireless networks, it is important to model the
motion of mobile network nodes. Received signal strength, signal
interference, and channel occupancy depend on the distances between nodes.
The selected mobility models can significantly influence the results of the
simulation (e.g. via packet loss rates).

<p>A mobility model describes position and orientation over time in a 3D
Euclidean coordinate system. Its main purpose is to provide position,
velocity and acceleration, and also angular position, angular velocity,
and angular acceleration data as three-dimensional quantities at the
current simulation time.

<p>In INET, a mobility model is most often an OMNeT++ simple module
implementing the motion as a C++ algorithm. Although most models have a few
common parameters (e.g. for initial positioning), they always come with
their own set of parameters. Some models support geographic positioning to
ease the configuration of map based scenarios.

<p>Mobility models be <i>single</i> or <i>group</i> mobility models.
Single mobility models describe the motion of entities independent of each other.
Group mobility models provide such a motion where group members are dependent
on each other.

<p>Mobility models can also be categorized as <i>trace-based</i>,
<i>deterministic</i>, <i>stochastic</i>, and <i>combining</i> models.

<p><b>Using Mobility Models</b>

<p>In order for a mobility model to actually have an effect on the motion of a network node,
the mobility model needs to be included as a submodule in the compound module of the
network node. By default, a transceiver antenna within a network node uses
the same mobility model as the node itself, but that is completely optional.
For example, it is possible to model a vehicle facing forward while moving
on a road that contains multiple transceiver antennas at different relative
locations with different orientations.

<p><b>The Playground</b>

<p>Many mobility models allow the user to define a cubic volume that the node
can not leave. The volume is configured by setting the <tt>constraintAreaX</tt>,
<tt>constraintAreaY</tt>, <tt>constraintAreaZ</tt>,
<tt>constraintAreaWidth</tt>, <tt>constraintAreaHeight</tt> and
<tt>constraintAreaDepth</tt> parameters.

<p>If the <tt>initFromDisplayString</tt> parameter, the initial position is taken from
the display string. Otherwise, the position can be given in the <tt>initialX</tt>,
<tt>initialY</tt> and <tt>initialZ</tt> parameters. If neither of these parameters
are given, a random initial position is choosen within the contraint area.

<p>When the node reaches the boundary of the constraint area, the mobility
component has to prevent the node to exit. Many mobility models offer the
following policies:

<p><ul>
  <li> reflect of the wall</li>
  <li> reappear at the opposite edge (torus area)</li>
  <li> placed at a randomly chosen position of the area</li>
  <li> stop the simulation with an error</li>
</ul>

<p>
<h2><a name="sec:mobility:built-in-mobility-models"></a>22.2 Built-In Mobility Models<a class="headerlink" href="#sec:mobility:built-in-mobility-models" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:mobility:list-of-mobility-models"></a>22.2.1 List of Mobility Models<a class="headerlink" href="#sec:mobility:list-of-mobility-models" title="Permalink to this headline">&para;</a></h3>

<p>The following, potentially list contains the mobility models available in INET.
Nearly all of these models als single mobility models; group mobility can be
implemented e.g. with combining other mobility models.

<p><b>Stationary</b>

<p>Stationary models only define position (and orientation), but no motion.

<p><ul>
    <li> <tt>StationaryMobility</tt> provides deterministic and random positioning.</li>
    <li> <tt>StaticGridMobility</tt> places several mobility models in a rectangular grid.</li>
    <li> <tt>StaticConcentricMobility</tt> places several models in a set of concentric circles.</li>
</ul>

<p><b>Deterministic</b>

<p>Deterministic mobility models use non-random mathematical models for describing motion.

<p><ul>
    <li> <tt>LinearMobility</tt> moves linearly with a constant speed or constant acceleration.</li>
    <li> <tt>CircleMobility</tt> moves around a circle parallel to the XY plane with constant speed.</li>
    <li> <tt>RectangleMobility</tt> moves around a rectangular area parallel to the XY plane with constant speed.</li>
    <li> <tt>TractorMobility</tt> moves similarly to a tractor on a field with a number of rows.</li>
    <li> <tt>VehicleMobility</tt> moves similarly to a vehicle along a path especially turning around corners.</li>
    <li> <tt>TurtleMobility</tt> moves according to an XML script written in a simple yet expressive LOGO-like programming language.</li>
    <li> <tt>FacingMobility</tt> orients towards the position of another mobility model.</li>
    <li> <tt>RotatingMobility</tt> rotates with a constant speed.</li>
</ul>

<p><b>Trace-Based</b>

<p>Trace-based mobility models replay recorded motion as observed in real life.

<p><ul>
    <li> <tt>BonnMotionMobility</tt> replays trace files of the BonnMotion scenario generator.</li>
    <li> <tt>Ns2MotionMobility</tt> replays files of the CMU's scenario generator used in ns2.</li>
    <li> <tt>AnsimMobility</tt> replays XML trace files of the ANSim (Ad-Hoc Network Simulation) tool.</li>
</ul>

<p><b>Stochastic</b>

<p>Stochastic or random mobility models use mathematical models involving random numbers.

<p><ul>
    <li> <tt>RandomWaypointMobility</tt> moves to random destination with random speed.</li>
    <li> <tt>GaussMarkovMobility</tt> uses one parameter to vary the degree of randomness from linear to Brown motion.</li>
    <li> <tt>MassMobility</tt> moves similarly to a mass with inertia and momentum.</li>
    <li> <tt>ChiangMobility</tt> uses a probabilistic transition matrix to change the motion state.</li>
</ul>

<p><b>Combining</b>

<p>Combining mobility models are not mobility models per se, but instead, they
allow more complex motions to be formed from simpler ones via superposition
and other ways.

<p><ul>
        <li> <tt>SuperpositioningMobility</tt> model combines several other mobility models by summing them up. It allows creating group mobility by sharing a mobility model in each group member, separating initial positioning from positioning during the simulation, and separating positioning from orientation.</li>
        <li> <tt>AttachedMobility</tt> models a mobility that is attached to another one at a given offset. Position, velocity and acceleration are all affected by the respective quantites and also the orientation of the referenced mobility.</li>
</ul>

<p><h3><a name="sec:mobility:more-information-on-some-mobility-models"></a>22.2.2 More Information on Some Mobility Models<a class="headerlink" href="#sec:mobility:more-information-on-some-mobility-models" title="Permalink to this headline">&para;</a></h3>

<p><b>TractorMobility</b>

<p>Moves a tractor through a field with a certain
amount of rows. The following figure illustrates the movement of the
tractor when the <tt>rowCount</tt> parameter is 2. The trajectory follows
the segments in <i>1,2,3,4,5,6,7,8,1,2,3...</i> order. The area is configured
by the <tt>x1</tt>, <tt>y1</tt>, <tt>x2</tt>, <tt>y2</tt> parameters.

<p>



<center><img src="tractormobility.png" border="0" width="240"></center> <!-- screenshot from the PDF version -->

<p>
<b>RandomWaypointMobility</b>

<p>In the Random Waypoint mobility model the nodes move in line segments. For each
line segment, a random destination position (distributed uniformly over the
playground) and a random speed is chosen. You can define a speed as a variate
from which a new value will be drawn for each line segment; it is customary to
specify it as <tt>uniform(minSpeed, maxSpeed)</tt>. When the node reaches the
target position, it waits for the time <tt>waitTime</tt> which can also be defined as a
variate. After this time the the algorithm calculates a new random position, etc.

<p><b>GaussMarkovMobility</b>

<p>The Gauss-Markov model contains a tuning parameter that control the randomness
in the movement of the node. Let the magnitude and direction of speed of the
node at the <i>n</i>th time step be <i>s<sub>n</sub></i> and <i>d<sub>n</sub></i>. The next speed and direction are
computed as

<p><center><i> s<sub>n+1</sub> = &alpha; s<sub>n</sub> + (1 - &alpha;) s&#772 + sqrt((1-&alpha;<sup>2</sup>)) s<sub>x<sub>n</sub></sub> </i></center>

<p><center><i> d<sub>n+1</sub> = &alpha; s<sub>n</sub> + (1 - &alpha;) d&#772 + sqrt((1-&alpha;<sup>2</sup>)) d<sub>x<sub>n</sub></sub> </i></center>

<p>where <i>s&#772</i> and <i>d&#772</i> are constants representing the mean value
of speed and direction as <i>n &#8594; &#8734;</i>; and <i>s<sub>x<sub>n</sub></sub></i> and <i>d<sub>x<sub>n</sub></sub></i>
are random variables with Gaussian distribution.

<p>Totally random walk (Brownian motion) is obtained by setting <i>&alpha;=0</i>,
while <i>&alpha;=1</i> results a linear motion.

<p>To ensure that the node does not remain at the boundary of the constraint
area for a long time, the mean value of the direction (<i>d&#772</i>) modified
as the node enters the margin area. For example at the right edge of the
area it is set to 180 degrees, so the new direction is away from the edge.


<b>MassMobility</b>

<p>This is a random mobility model for a mobile host with
a mass. It is the one used in [<a href="#bib-Perkins99optimizedsmooth">Perkins99optimizedsmooth</a>].

<p><blockquote>
"An MH moves within the room according to the following pattern. It moves
along a straight line for a certain period of time before it makes a turn.
This moving period is a random number, normally distributed with average of
5 seconds and standard deviation of 0.1 second. When it makes a turn, the
new direction (angle) in which it will move is a normally distributed
random number with average equal to the previous direction and standard
deviation of 30 degrees. Its speed is also a normally distributed random
number, with a controlled average, ranging from 0.1 to 0.45 (unit/sec), and
standard deviation of 0.01 (unit/sec). A new such random number is picked
as its speed when it makes a turn. This pattern of mobility is intended to
model node movement during which the nodes have momentum, and thus do not
start, stop, or turn abruptly. When it hits a wall, it reflects off the
wall at the same angle; in our simulated world, there is little other
choice."
</blockquote>

<p>This implementation can be parameterized a bit more, via the
<tt>changeInterval</tt>, <tt>changeAngleBy</tt> and <tt>changeSpeedBy</tt> parameters.
The parameters described above correspond to the following settings:

<p><ul>
<li> changeInterval = normal(5, 0.1)</li>
<li> changeAngleBy = normal(0, 30)</li>
<li> speed = normal(avgSpeed, 0.01)</li>
</ul>

<p><b>ChiangMobility</b>

<p>Implements Chiang's random walk movement model ([<a href="#bib-Chiang98wirelessnetwork">Chiang98wirelessnetwork</a>]).
In this model, the state of the mobile node in each direction (x and y) can be:

<p><ul>
  <li> 0: the node stays in its current position</li>
  <li> 1: the node moves forward</li>
  <li> 2: the node moves backward</li>
</ul>

<p>The <i>(i,j)</i> element of the state transition matrix determines the
probability that the state changes from <i>i</i> to <i>j</i>:

<p>


<center>
<div>
<table class="matrix">
  <tr> <td>0</td>   <td>0.5</td> <td>0.5</td> </tr>
  <tr> <td>0.3</td> <td>0.7</td> <td>0</td>   </tr>
  <tr> <td>0.3</td> <td>0</td>   <td>0.7</td> </tr>
</table>
</div>
</center>

<p>
<h3><a name="sec:mobility:replaying-trace-files"></a>22.2.3 Replaying trace files<a class="headerlink" href="#sec:mobility:replaying-trace-files" title="Permalink to this headline">&para;</a></h3>

<p><b>BonnMotionMobility</b>

<p>Uses the native file format of <a href="http://bonnmotion.net">BonnMotion</a>.

<p>The file is a plain text file, where every line describes the motion
of one host. A line consists of one or more (t, x, y) triplets of real
numbers, like:


t1 x1 y1 t2 x2 y2 t3 x3 y3 t4 x4 y4 ...

<p>
The meaning is that the given node gets to <i>(xk,yk)</i> at <i>tk</i>. There's no
separate notation for wait, so x and y coordinates will be repeated there.

<p><b>Ns2MotionMobility</b>

<p>Nodes are moving according to the trace files used in NS2.
The trace file has this format:


# '#' starts a comment, ends at the end of line
$node_(&lt;id&gt;) set X_ &lt;x&gt; # sets x coordinate of the node identified by &lt;id&gt;
$node_(&lt;id&gt;) set Y_ &lt;y&gt; # sets y coordinate of the node identified by &lt;id&gt;
$node_(&lt;id&gt;) set Z_ &lt;z&gt; # sets z coordinate (ignored)
$ns at $time "$node_(&lt;id&gt;) setdest &lt;x&gt; &lt;y&gt; &lt;speed&gt;" # at $time start moving
towards &lt;x&gt;,&lt;y&gt; with &lt;speed&gt;

<p>
The <tt>Ns2MotionMobility</tt> module has the following parameters:

<p><ul>
  <li> <tt>traceFile</tt> the Ns2 trace file</li>
  <li> <tt>nodeId</tt> node identifier in the trace file; -1 gets substituted by
  parent module's index</li>
  <li> <tt>scrollX</tt>,<tt>scrollY</tt> user specified translation of the
  coordinates</li>
</ul>


<b>ANSimMobility</b>

<p>It reads trace files of the <a href="http://www.ansim.info">ANSim</a> Tool.
The nodes are moving along linear segments described by an XML trace file
conforming to this DTD:

<p><pre><code data-language="xml">&lt;!ELEMENT mobility (position_change*)&gt;
&lt;!ELEMENT position_change (node_id, start_time, end_time, destination)&gt;
&lt;!ELEMENT node_id (#PCDATA)&gt;
&lt;!ELEMENT start_time (#PCDATA)&gt;
&lt;!ELEMENT end_time (#PCDATA)&gt;
&lt;!ELEMENT destination (xpos, ypos)&gt;
&lt;!ELEMENT xpos (#PCDATA)&gt;
&lt;!ELEMENT ypos (#PCDATA)&gt;</code></pre>
<p>Parameters of the module:

<p><ul>
  <li> <tt>ansimTrace</tt> the trace file</li>
  <li> <tt>nodeId</tt> the <tt>node_id</tt> of this node, -1 gets substituted to
  parent module's index</li>
</ul>

<p><ul class="note"><b>NOTE</b><br>
The <tt>AnsimMobility</tt> module processes only the <tt>position_change</tt>
elements and it ignores the <tt>start_time</tt> attribute. It starts the move
on the next segment immediately.</li>
</ul>

<p><h3><a name="sec:mobility:turtlemobility"></a>22.2.4 TurtleMobility<a class="headerlink" href="#sec:mobility:turtlemobility" title="Permalink to this headline">&para;</a></h3>

<p>The <tt>TurtleMobility</tt> module can be parametrized by a script file
containing LOGO-style movement commands in XML format. The content of
the XML file should conform to the DTD in the <tt>TurtleMobility.dtd</tt>
file in the source tree.

<p>The file contains <tt>movement</tt> elements, each describing a trajectory.
The <tt>id</tt> attribute of the <tt>movement</tt> element can be used to
refer the movement from the ini file using the syntax:

<pre><code data-language="ini">**.mobility.turtleScript = xmldoc("turtle.xml", "movements//movement[@id='1']")</code></pre><p>
The motion of the node is composed of uniform linear segments.
The <tt>movement</tt> elements may contain the the following commands as
elements (names in parens are recognized attribute names):

<p><ul>
<li> <tt>repeat(n)</tt> repeats its content n times, or indefinitely if
       the <tt>n</tt> attribute is omitted.</li>
<li> <tt>set(x,y,speed,angle,borderPolicy)</tt> modifies the state of the node.
      <tt>borderPolicy</tt> can be <tt>reflect</tt>, <tt>wrap</tt>, <tt>placerandomly</tt>
      or <tt>error</tt>.</li>
<li> <tt>forward(d,t)</tt> moves the node for <i>t</i> time or to the <i>d</i> distance
      with the current speed. If both <i>d</i> and <i>t</i> is given, then the current
      speed is ignored.</li>
<li> <tt>turn(angle)</tt> increase the angle of the node by <i>angle</i> degrees.</li>
<li> <tt>moveto(x,y,t)</tt> moves to point <i>(x,y)</i> in the given time. If
      <i>t</i> is not specified, it is computed from the current speed.</li>
<li> <tt>moveby(x,y,t)</tt> moves by offset <i>(x,y)</i> in the given time. If
      <i>t</i> is not specified, it is computed from the current speed.</li>
<li> <tt>wait(t)</tt> waits for the specified amount of time.</li>
</ul>

<p>Attribute values must be given without physical units, distances are assumed
to be given as meters, time intervals in seconds and speeds in meter per seconds.
Attibutes can contain expressions that are evaluated each time the
command is executed. The limits of the constraint area can be
referenced as <tt>$MINX</tt>, <tt>$MAXX</tt>, <tt>$MINY</tt>, and <tt>$MAXY</tt>.
Random number distibutions generate a new random number when evaluated,
so the script can describe random as well as deterministic scenarios.

<p>To illustrate the usage of the module, we show how some mobility
models can be implemented as scripts.

<p>RectangleMobility:

<p><pre><code data-language="xml">&lt;movement&gt;
    &lt;set x="$MINX" y="$MINY" angle="0" speed="10"/&gt;
    &lt;repeat&gt;
        &lt;repeat n="2"&gt;
            &lt;forward d="$MAXX-$MINX"/&gt;
            &lt;turn angle="90"/&gt;
            &lt;forward d="$MAXY-$MINY"/&gt;
            &lt;turn angle="90"/&gt;
        &lt;/repeat&gt;
    &lt;/repeat&gt;
&lt;/movement&gt;</code></pre>
<p>Random Waypoint:

<p><pre><code data-language="xml">&lt;movement&gt;
    &lt;repeat&gt;
        &lt;set speed="uniform(20,60)"/&gt;
        &lt;moveto x="uniform($MINX,$MAXX)" y="uniform($MINY,$MAXY)"/&gt;
        &lt;wait t="uniform(5,10)"&gt;
    &lt;/repeat&gt;
&lt;/movement&gt;</code></pre>
<p>MassMobility:

<p><pre><code data-language="xml">&lt;movement&gt;
    &lt;repeat&gt;
        &lt;set speed="uniform(10,20)"/&gt;
        &lt;turn angle="uniform(-30,30)"/&gt;
        &lt;forward t="uniform(0.1,1)"/&gt;
    &lt;/repeat&gt;
&lt;/movement&gt;</code></pre>
<p>


<p><hr class='pgbr'><div class='oppnavbar'><a href="chap21.html">Prev</a> &#8226; <a href="chap23.html">Next</a> &#8226; <a href="toc.html#toc_22">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
