---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap25.html">Prev</a> &#8226; <a href="chap27.html">Next</a> &#8226; <a href="toc.html#toc_26">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:scenario-scripting"></a>26 Scenario Scripting<a class="headerlink" href="#cha:scenario-scripting" title="Permalink to this headline">&para;</a></h1>

<p><h2><a name="sec:scenario:overview"></a>26.1 Overview<a class="headerlink" href="#sec:scenario:overview" title="Permalink to this headline">&para;</a></h2>

<p>The INET Framework contains scripting support to help the user express
scenarios that cannot be adequately described using static configuration.
You can schedule actions to be carried out at specified simulation times,
for example changing a parameter value, changing the bit error rate of
a connection, removing or adding connections, removing or adding
routes in a routing table, shutting down or crashing routers, etc.
The aim is usually to observe transient behaviour caused by the changes.

<p>INET supports the following built-in actions:

<p><ul>
  <li> Create or delete module</li>
  <li> Create or delete connection</li>
  <li> Set module or channel parameter</li>
  <li> Initiate lifecycle operation (startup, shutdown, crash)
    on a network node or part of it</li>
</ul>

<p><h2><a name="sec:scenario:scenariomanager"></a>26.2 ScenarioManager<a class="headerlink" href="#sec:scenario:scenariomanager" title="Permalink to this headline">&para;</a></h2>

<p>The <tt>ScenarioManager</tt> module type is for setting up and controlling
simulation experiments. In typical usage, it has only one instance in the
network:

<pre><code data-language="ned">network Test {
    submodules:
        scenarioManager: ScenarioManager;
        ...
}</code></pre><p>
<tt>ScenarioManager</tt> executes a script specified in XML. It has a few
built-in commands, while other commands are dispatched (in C++) to be
carried out by other simple modules.

<p>An example script:

<p><pre><code data-language="xml">&lt;scenario&gt;
    &lt;set-param t="10" module="host[1].mobility" par="speed" value="5"/&gt;
    &lt;set-param t="20" module="host[1].mobility" par="speed" value="30"/&gt;
    &lt;at t="50"&gt;
        &lt;set-param module="host[2].mobility" par="speed" value="10"/&gt;
        &lt;set-param module="host[3].mobility" par="speed" value="10"/&gt;
        &lt;connect src-module="host[2]" src-gate="ppp[0]"
                 dest-module="host[1]" dest-gate="ppp[0]"
                 channel-type="ned.DatarateChannel"&gt;
            &lt;param name="datarate" value="10Mbps" /&gt;
            &lt;param name="delay" value="0.1us" /&gt;
        &lt;/connect&gt;
    &lt;/at&gt;
    &lt;at t="60"&gt;
        &lt;disconnect src-module="host[2]" src-gate="ppp[0]" /&gt;
        &lt;disconnect src-module="host[1]" src-gate="ppp[0]" /&gt;
    &lt;/at&gt;
&lt;/scenario&gt;</code></pre>
<p>The above script probably does not need much explanation.

<p>The built-in commands of <tt>ScenarioManager</tt> are:
<tt>&lt;connect&gt;</tt>, <tt>&lt;disconnect&gt;</tt>,
<tt>&lt;create-module&gt;</tt>, <tt>&lt;delete-module&gt;</tt>,
<tt>&lt;initiate&gt;</tt>, <tt>&lt;shutdown&gt;</tt>,<tt>&lt;startup&gt;</tt>,<tt>&lt;crash&gt;</tt>,
<tt>&lt;set-param&gt;</tt>, <tt>&lt;set-channel-attr&gt;</tt>, <tt>&lt;at&gt;</tt>.

<p>All commands have a <tt>t</tt> attribute which carries the simulation time
at which the command has to be carried out. You can group several commands
to be carried out at the same simulation time using <tt>&lt;at&gt;</tt>, and
then only the <tt>&lt;at&gt;</tt> command needs to have a <tt>t</tt> attribute.

<p>More information can be found in the <tt>ScenarioManager</tt> documentation.

<p>The script is usually placed in a separate file, and specified like this:

<pre><code data-language="ini">*.scenarioManager.script = xmldoc("scenario.xml")</code></pre><p>
Short scripts can also be written inline:

<pre><code data-language="ini">*.scenarioManager.script = xml("&lt;x&gt;&lt;shutdown t='2s' module='Router2'/&gt;&lt;/x&gt;")</code></pre><p>

<p>
<hr class='pgbr'><div class='oppnavbar'><a href="chap25.html">Prev</a> &#8226; <a href="chap27.html">Next</a> &#8226; <a href="toc.html#toc_26">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
