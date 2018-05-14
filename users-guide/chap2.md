---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap1.html">Prev</a> &#8226; <a href="chap3.html">Next</a> &#8226; <a href="toc.html#toc_2">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:usage"></a>2 Using the INET Framework<a class="headerlink" href="#cha:usage" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:usage:installation"></a>2.1 Installation<a class="headerlink" href="#sec:usage:installation" title="Permalink to this headline">&para;</a></h2>

<p>There are several ways to install the INET Framework:

<p><ul>
  <li> Let the OMNeT++ IDE download and install it for you.
      This is the easiest way. Just accept the offer to install INET
      in the dialog that comes up when you first start the IDE, or
      choose <i>Help &gt; Install Simulation Models</i> any time later.</li>
  <li> From INET Framework web site, <i>http://inet.omnetpp.org</i>.
      The IDE always installs the last stable version compatible with
      your version of OMNeT++. If you need some other version, they
      are available for download from the web site. Installation
      instructions are also provided there.</li>
  <li> From GitHub. If you have experience with <i>git</i>,
      clone the INET Framework project (<tt>inet-framework/inet</tt>),
      check out the revision of your choice, and follow the INSTALL
      file in the project root.</li>
</ul>

<p>
<h2><a name="sec:usage:installing-inet-extensions"></a>2.2 Installing INET Extensions<a class="headerlink" href="#sec:usage:installing-inet-extensions" title="Permalink to this headline">&para;</a></h2>

<p>If you plan to make use of INET extensions (e.g. Veins or SimuLTE),
follow the installation instructions provided with them.

<p>In the absence of specific instructions, the following procedure usually works:

<p><ul>
 <li> First, check if the project root contains a file named <tt>.project</tt>.</li>
 <li> If it does, then the project can be imported into the IDE (use <i>File &gt; Import &gt;
    General &gt; Existing Project</i> into workspace). make sure that the project is recognized
    as an OMNeT++ project (the <i>Project Properties</i> dialog contains a page
    titled <i>OMNeT++</i>), and it lists the INET project as dependency
    (check the <i>Project References</i> page in the <i>Project Properties</i> dialog).</li>
 <li> If there is no <tt>.project</tt> file, you can create an empty OMNeT++
    project using the <i>New OMNeT++ Project</i> wizard in <i>File &gt; New</i>,
    add the INET project as dependency using the <i>Project References</i> page
    in the <i>Project Properties</i> dialog, and copy the source files into the project.</li>
</ul>

<p><h2><a name="sec:usage:getting-familiar-with-inet"></a>2.3 Getting Familiar with INET<a class="headerlink" href="#sec:usage:getting-familiar-with-inet" title="Permalink to this headline">&para;</a></h2>

<p>The INET Framework builds upon OMNeT++, and uses the same concept: modules
that communicate by message passing. Hosts, routers, switches and other
network devices are represented by OMNeT++ compound modules. These compound
modules are assembled from simple modules that represent protocols,
applications, and other functional units. A network is again an OMNeT++
compound module that contains host, router and other modules.

<p>Modules are organized into a directory structure that roughly follows
OSI layers:

<p><ul>
  <li> <tt>src/inet/applications/</tt> -- traffic generators and application models</li>
  <li> <tt>src/inet/transportlayer/</tt> -- transport layer protocols</li>
  <li> <tt>src/inet/networklayer/</tt> -- network layer protocols and accessories</li>
  <li> <tt>src/inet/linklayer/</tt> -- link layer protocols and accessories</li>
  <li> <tt>src/inet/physicallayer/</tt> -- physical layer models</li>
  <li> <tt>src/inet/routing/</tt> -- routing protocols (internet and ad hoc)</li>
  <li> <tt>src/inet/mobility/</tt> -- mobility models</li>
  <li> <tt>src/inet/power/</tt> -- energy consumption modeling</li>
  <li> <tt>src/inet/environment/</tt> -- model of the physical environment</li>
  <li> <tt>src/inet/node/</tt> -- preassembled network node models</li>
  <li> <tt>src/inet/visualizer/</tt> -- visualization components (2D and 3D)</li>
  <li> <tt>src/inet/common/</tt> -- miscellaneous utility components</li>
</ul>

<p>The OMNeT++ NED language uses hierarchical packages names. Packages correspond
to directories under <tt>src/</tt>, so e.g. the <tt>src/inet/transportlayer/tcp</tt>
directory corresponds to the <tt>inet.transportlayer.tcp</tt> NED package.

<p>For modularity, the INET Framework has about 80 <i>project features</i>
(parts of the codebase that can be disabled as a unit) defined. Not all project
features are enabled in the default setup after installation. You can review
the list of available project features in the <i>Project | Project Features...</i>
dialog in the IDE. If you want to know more about project features, refer to the
<i>OMNeT++ User Guide</i>.

<p>

<hr class='pgbr'><div class='oppnavbar'><a href="chap1.html">Prev</a> &#8226; <a href="chap3.html">Next</a> &#8226; <a href="toc.html#toc_2">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
