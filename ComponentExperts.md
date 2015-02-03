---
layout: page
title: Component Experts
underMenu: People
people:
   avirdis:   <a href="mailto:TODO@iet.unipi.it">Antonio Virdis</a>
   becke:     <a href="mailto:TODO">Martin Becke</a>
   jmaureir:  <a href="mailto:TODO">Juan-Carlos Maureira</a>
   levy:      <a href="mailto:TODO">Levente M&eacute;sz&aacute;ros</a>
   reschka:   <a href="mailto:TODO">Thomas Reschka</a>
   ruengeler: <a href="https://fh-muenster.de/fb2/personen/mitarbeiter/ruengeler">Irene R&uuml;ngeler</a>
   tuexen:    <a href="https://www.fh-muenster.de/fb2/personen/professoren/tuexen">Michael T&uuml;xen</a>
   vesely:    <a href="http://www.fit.vutbr.cz/~ivesely/">Vladimir Vesely</a>
   zarrar:    <a href="mailto:TODO">Zarrar Yousaf</a>
   zbojthe:   <a href="mailto:TODO">Zolt&aacute;n B&ouml;jthe</a>
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
    HttpTools: ;
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
    DYMO:        levy;
    AODV: ;
    GPSR:        levy;
    WiseRoute: ;
    Others (flood, prob. broadcast): ;
Data Link Layer;
    Ethernet: ;
    PPP: ;
    802.11: ;
    802.15.4: ;
    IEEE 802.1d (STP, RSTP, etc.): ;
    B-MAC, L-MAC: ;
    CSMA: ;
Physical Layer;
    Path loss models: levy;
    Error models:     levy;
    Analog models:    levy;
    Radio:            levy;
Environment;          
    Mobility:         levy;
    TraCI: ;
    Physical environment: levy;
    Power:            levy;
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


