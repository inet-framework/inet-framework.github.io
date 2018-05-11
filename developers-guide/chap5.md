---
layout: page
underMenu: Documentation
---



<div>INET Developer's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap4.html">Prev</a> &#8226; <a href="toc.html#toc_5">ToC</a> &#8226; <a href="index.html">Chapters</a></div><hr class='pgbr'><h1><a name="cha:authors-guide"></a>5 Appendix: Author's Guide<a class="headerlink" href="#cha:authors-guide" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:authorsguide:overview"></a>5.1 Overview<a class="headerlink" href="#sec:authorsguide:overview" title="Permalink to this headline">&para;</a></h2>

<p>This chapter is intended for authors and contributors of this 
<i>INET Developer's Guide</i>, and covers the guidelines for deciding
what type of content is appropriate for this <i>Guide</i> and 
what is not.

<p>The main guiding principle is to avoid redundancy and duplication
of information with other pieces of documentation, namely:

<p><ul>
  <li> Standards documents (RFCs, IEEE specifications, etc.) that
    describe protocols that INET modules implement;</li>
  <li> <i>INET User's Guide</i>, which is intended for users who
    are interested in assembling simulations using the components
    provided by INET;</li>
  <li> <i>INET Framework Reference</i>, directly generated from 
    NED and MSG comments by OMNeT++ documentation generator;</li>
  <li> Showcases, tutorials and simulation examples (<tt>showcases/</tt>,
    <tt>tutorials/</tt> and <tt>examples/</tt> folders in the INET project)</li>
</ul>

<p>Why is duplication to be avoided? Multiple reasons:

<p><ul>
  <li> It is a waste of our reader's time they have to skip information
     they have already seen elsewhere</li>
  <li> The text can easily get out of date as the INET Framework evolves</li>
  <li> It is extra effort for maintainers to keep all copies up to date</li>  
</ul>

<p>
<h2><a name="sec:authorsguide:guidelines"></a>5.2 Guidelines<a class="headerlink" href="#sec:authorsguide:guidelines" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:authorsguide:do-not-repeat-standard"></a>5.2.1 Do Not Repeat the Standard<a class="headerlink" href="#sec:authorsguide:do-not-repeat-standard" title="Permalink to this headline">&para;</a></h3>

<p>When describing a module that implements protocol X, do not go
into lengths explaining what protocol X does and how it works,
because that is appropriately (and usually, much better) explained 
in the specification or books on protocol X. It is OK to summarize
the protocol's goal and principles in a short paragraph though.

<p>In particular, do not describe the <i>format of the protocol messages</i>.
It surely looks nice and takes up a lot of space, but the same information
can probably be found in a myriad places all over the internet.

<p><h3><a name="sec:authorsguide:do-not-repeat-neddoc"></a>5.2.2 Do Not Repeat NED Documentation<a class="headerlink" href="#sec:authorsguide:do-not-repeat-neddoc" title="Permalink to this headline">&para;</a></h3>

<p>Things like module parameters, gate names, emitted signals and collected 
statistics are appropriately and formally part of the NED definitions,
and there is no need to duplicate that information in this <i>Guide</i>.

<p>Detailed information on the module, such as <i>usage details</i> and the 
list of <i>implemented standards</i> should be covered in the module's 
NED documentation, not in this <i>Guide</i>.

<p><h3><a name="sec:authorsguide:do-not-repeat-cpp"></a>5.2.3 Do Not Repeat C++ Documentation<a class="headerlink" href="#sec:authorsguide:do-not-repeat-cpp" title="Permalink to this headline">&para;</a></h3>

<p>Describing every minute detail of C++ classes, methods, arguments are
expected to be appropriately present in their <i>doxygen</i>
documentation.

<p><h3><a name="sec:authorsguide:what-then"></a>5.2.4 What then?<a class="headerlink" href="#sec:authorsguide:what-then" title="Permalink to this headline">&para;</a></h3>

<p>Concentrate on giving a &#8220;big picture&#8221; of the implementation: what it is
generally capable of, how the parts fit together, how to use the provided APIs,
what were the main design decisions, etc. Give simple yet meaningful examples
and just enough information about the API that after a quick read, users can
&#8220;bootstrap&#8221; into implementing their own protocols and applications. If they
have questions afterwards, they will/should refer to the C++ documentation.

<p>
<div class='oppnavbar'><a href="chap4.html">Prev</a> &#8226; <a href="toc.html#toc_5">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
