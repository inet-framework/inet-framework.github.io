---
layout: page
underMenu: Documentation
---



<div>INET 4.0 User's Guide<hr width='100%'></div>
<div class='oppnavbar'><a href="chap28.html">Prev</a> &#8226; <a href="chap30.html">Next</a> &#8226; <a href="toc.html#toc_29">ToC</a> &#8226; <a href="index.html">Chapters</a></div><h1><a name="cha:authors-guide"></a>29 Appendix: Author's Guide<a class="headerlink" href="#cha:authors-guide" title="Permalink to this headline">&para;</a></h1>

<p>
<h2><a name="sec:authorsguide:overview"></a>29.1 Overview<a class="headerlink" href="#sec:authorsguide:overview" title="Permalink to this headline">&para;</a></h2>

<p>This chapter is intended for authors and contributors of this
<i>INET User's Guide</i>, and covers the guidelines for deciding
what type of content is appropriate for this <i>Guide</i> and
what is not.

<p>The main guiding principle is to avoid redundancy and duplication
of information with other pieces of documentation, namely:

<p><ul>
  <li> Standards documents (RFCs, IEEE specifications, etc.) that
    describe protocols that INET modules implement;</li>
  <li> <i>INET Developer's Guide</i>, which is intended as a guide
    for anyone wishing to understand or modify the operation of
    INET's components at C++ level;</li>
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
<h2><a name="sec:authorsguide:guidelines"></a>29.2 Guidelines<a class="headerlink" href="#sec:authorsguide:guidelines" title="Permalink to this headline">&para;</a></h2>

<p><h3><a name="sec:authorsguide:do-not-repeat-the-standard"></a>29.2.1 Do Not Repeat the Standard<a class="headerlink" href="#sec:authorsguide:do-not-repeat-the-standard" title="Permalink to this headline">&para;</a></h3>

<p>When describing a module that implements protocol X, do not go
into lengths explaining what protocol X does and how it works,
because that is appropriately (and usually, much better) explained
in the specification or books on protocol X. It is OK to summarize
the protocol's goal and principles in short paragraph though.

<p>In particular, do not describe the <i>format of the protocol messages</i>.
It surely looks nice and takes up a lot of space, but the same information
can probably be found in a myriad places all over the internet.

<p><h3><a name="sec:authorsguide:do-not-repeat-ned"></a>29.2.2 Do Not Repeat NED<a class="headerlink" href="#sec:authorsguide:do-not-repeat-ned" title="Permalink to this headline">&para;</a></h3>

<p>Things like module parameters, gate names, emitted signals and collected
statistics are appropriately and formally part of the NED definitions,
and there is no need to duplicate that information in this <i>Guide</i>.

<p>Detailed information on the module, such as <i>usage details</i> and the
list of <i>implemented standards</i> should be covered in the module's
NED documentation, not in this <i>Guide</i>.

<p><h3><a name="sec:authorsguide:no-cplusplus"></a>29.2.3 No C++<a class="headerlink" href="#sec:authorsguide:no-cplusplus" title="Permalink to this headline">&para;</a></h3>

<p>Any content which only makes sense on C++ level should go to the
<i>Developer's Guide</i>, and has no place in this <i>Guide</i>.

<p><h3><a name="sec:authorsguide:keep-examples-short"></a>29.2.4 Keep Examples Short<a class="headerlink" href="#sec:authorsguide:keep-examples-short" title="Permalink to this headline">&para;</a></h3>

<p>When giving examples about usage, keep them concise and to the point.
Giving ini or NED file fragments of a few lines length is preferable
to complete working examples.

<p>Complete examples should be written up as showcases. A working simulation
without much commentary should go under <tt>examples</tt>. A practical,
potentially multi-step guide to using a nontrivial feature should be
written up as a tutorial.

<p><h3><a name="sec:authorsguide:no-reference-to-simulation-examples"></a>29.2.5 No Reference to Simulation Examples<a class="headerlink" href="#sec:authorsguide:no-reference-to-simulation-examples" title="Permalink to this headline">&para;</a></h3>

<p>Do not refer to concrete example simulations, showcases or tutorials in the text,
because they might get renamed, moved, merged or deleted, and when they
do, no one will think about updating the reference in the <i>Users Guide</i>.

<p>
<h3><a name="sec:authorsguide:what-then"></a>29.2.6 What then?<a class="headerlink" href="#sec:authorsguide:what-then" title="Permalink to this headline">&para;</a></h3>

<p>Concentrate on giving a &#8220;big picture&#8221; of the models: what it is generally
capable of, how the parts fit together, etc. Give just enough information
that after a quick read, users can &#8220;bootstrap&#8221; into putting together
their own simulations with the model. If they have questions afterwards,
they will/should refer to the NED documentation (INET Reference), or if
that's not enough, delve into the C++ code to find the answers.

<p>


<hr class='pgbr'><div class='oppnavbar'><a href="chap28.html">Prev</a> &#8226; <a href="chap30.html">Next</a> &#8226; <a href="toc.html#toc_29">ToC</a> &#8226; <a href="index.html">Chapters</a></div>
