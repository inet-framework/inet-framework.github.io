---
layout: page
title: Component Advisors
underMenu: People
people:
   aarizaq:   <a href="https://github.com/aarizaq">Alfonso Ariza Quintana</a>
   afoerster: <a href="https://github.com/TODO">Anna F&ouml;rster</a>
   avirdis:   <a href="https://github.com/kruviser">Antonio Virdis</a>
   becke:     <a href="https://github.com/scimbe">Martin Becke</a>
   benmartin: <a href="https://github.com/benmartin92">Benjamin Seregi</a>
   dreibholz: <a href="https://github.com/dreibh">Thomas Dreibholz</a>
   dhodson:   <a href="https://github.com/doughodson">Doug Hodson</a>
   jmaureir:  <a href="https://github.com/jmaureir">Juan-Carlos Maureira</a>
   kristjanvj: <a href="https://github.com/kristjanvj">Kristjan Valur Jonsson</a>
   kyeongsoo: <a href="https://github.com/kyeongsoo">Kyeong Soo (Joseph) Kim</a>
   levy:      <a href="https://github.com/levy">Levente M&eacute;sz&aacute;ros</a>
   lmfeeney:  <a href="https://github.com/TODO">Laura Marie Feeney</a>
   reschka:   <a href="https://github.com/ThomasReschka">Thomas Reschka</a>
   ruengeler: <a href="https://github.com/ruengeler">Irene R&uuml;ngeler</a>
   sommer:    <a href="https://github.com/sommer">Christoph Sommer</a>
   tillsteinb: <a href="https://github.com/tillsteinbach">Till Steinbach</a>
   tuexen:    <a href="https://github.com/tuexen">Michael T&uuml;xen</a>
   vesely:    <a href="https://github.com/kvetak">Vladimir Vesely</a>
   zarrar:    <a href="https://github.com/zarrar">Zarrar Yousaf</a>
   zbojthe:   <a href="https://github.com/ZoltanBojthe">Zolt&aacute;n B&ouml;jthe</a>
---

<p class="lead">Bring your expertise to the table, and be someone that contributors and developers can consult.</p>

The INET Framework contains the implementations of numerous protocols and
concepts, and maintenance of the codebase and reviewing contributions often
poses challenges that are difficult to meet with a small team of core
developers. In this table we are collecting people who have specialized
knowledge and expertise in certain areas, and are willing to help
developers/maintainers by advising them.

<div class="alert alert-warning">
<p>Ideally, we'd like to have at least two-three names for each component. Contact us if you are willing to join!</p>
</div>

{% capture tabledata %}
Applications;
    VoIPStream:  zbojthe;
    SimpleVoIP:  avirdis;
    HttpTools: kristjanvj;
Transport Layer;
    TCP, UDP:    tuexen, becke, reschka;
    TCP (lwIP):  zbojthe;
    TCP (NSC):   zbojthe;
    RTP: ;
    SCTP:        tuexen, ruengeler, becke;
Network Layer;
    IPv4 (incl. ARP): ;
    IPv6: ;
    Mobile IPv6: zarrar;
    DHCP:        jmaureir;
    DiffServ: ;
    Multicast (IGMP, PIM, etc.):       vesely;
    MPLS family (LDP, RSVP-TE, etc.): ;
    Generic network layer protocol:    levy;
    Multi-stack network layer:         levy;
    Internet Cloud:                    zbojthe;
Routing;
    OSPF:        vesely;
    BGP:         vesely;
    RIP:         vesely;
MANET Routing;
    DYMO:        levy, aarizaq, sommer;
    AODV:        benmartin, aarizaq;
    GPSR:        levy;
    WiseRoute: ;
    Others (flood, prob. broadcast): ;
Data Link Layer;
    Ethernet:    tillsteinb;
    PPP: ;
    802.11:      aarizaq;
    802.15.4:    lmfeeney;
    IEEE 802.1d (STP, RSTP, etc.): tillsteinb;
    B-MAC, L-MAC: afoerster;
    CSMA:        afoerster;
Physical Layer;
    Path loss models: levy;
    Error models:     levy;
    Analog models:    levy;
    Radio:            levy;
Environment;          
    Mobility:         levy;
    TraCI:            sommer;
    Physical environment: levy, sommer;
    Energy consumption and storage: levy, lmfeeney;
Other;
    Network emulation support:
{% endcapture %}


<table class="table table-bordered table-striped">
  <thead>
    <tr class="info"><th>Component</th><th>Name</th></tr>
  </thead>
  <tbody>
{% assign lines = tabledata | split: ";" %}
{% for line in lines %}
  {% assign items = line | split: ":" %}
  {% if items.size == 1 %}
    <tr class="success"><td colspan="2"><b>{{ items[0] }}</b></td></tr>
  {% elsif items.size == 2 %}
    <tr>
      <td>{{ items[0] }}</td>
      {% assign names = items[1] %}
      {% for person in page.people %}
          {% assign names = names | replace: person[0], person[1] %}
      {% endfor %}
      <td>{{ names }}</td>
    </tr>
  {% else %}
    <tr class="error"><td colspan="2">Wrong #cols in line: {{ line }}</td></tr>
  {% endif %}
{% endfor %}
  </tbody>
</table>


