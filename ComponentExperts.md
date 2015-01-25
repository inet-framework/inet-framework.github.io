---
layout: page
title: Component Experts
underMenu: People
people:
   tuexen: <a href="https://www.fh-muenster.de/fb2/personen/professoren/tuexen/index.php">Michael Tuexen</a>
   vesely: <a href="http://www.fit.vutbr.cz/~ivesely/">Vladimir Vesely</a>
---

<p class="lead">Bring your expertise to the table, and be someone that contributors and developers can consult.</p>

The INET Framework contains the implementations of numerous protocols and
concepts, and maintenance of the codebase and reviewing contributions often
poses challenges that are difficult to meet with a small team of core
developers. In this table we are collecting people who have specialized
knowledge and expertise in certain areas, and are willing to help
developers/maintainers by advising them.

Ideally we'd like to have 2-3 Experts for each component. Contact us if you are interested!

<br>

{% capture tabledata %}
Applications;
    VoIPStream: ;
    SimpleVoIP: ;
    HttpTools: ;
Transport Layer;
    TCP (INET):  tuexen;
    TCP (lwIP): ;
    TCP (NSC): ;
    RTP: ;
    SCTP:        tuexen;
    UDP: ;
Network Layer;
    IPv4: ;
    IPv6: ;
    Mobile IPv6: ;
    Generic network layer protocol: ;
    Multi network layer: ;
    Internet Cloud: ;
    ARP: ;
    DHCP: ;
    DiffServ: ;
    MPLS family (LDP, RSVP-TE, etc.): ;
Routing;
    OSPF:        vesely;
    BGP:         vesely;
    RIP:         vesely;
MANET Routing;
    DYMO: ;
    AODV: ;
    GPSR: ;
    WiseRoute: ;
Data Link Layer;
    Ethernet: ;
    PPP: ;
    802.11: ;
    802.15.4: ;
    IEEE 802.1d (STP, RSTP, etc.): ;
Physical Layer;
    Physical layer: ;
    Environment;
    Mobility: ;
    TraCI: ;
Physical environment;
    Power: ;
Other;
    Network emulation support:
{% endcapture %}


<table class="table table-bordered table-striped">
  <thead>
    <tr class="info"><th>Component</th><th>Name</th></tr>
  </thead>
  <tbody>
{% capture links %}
{% include links.md %}
{% endcapture %}
{% assign lines = tabledata | split: ";" %}
{% for line in lines %}
  {% assign items = line | split: ":" %}
  {% if items.size == 1 %}
    <tr class="success"><td colspan="2"><b>{{ items[0] }}</b></td></tr>
  {% else %}
    <tr>
      {% for item in items %}
        {% assign item2 = item %}
        <td>
          {% for person in page.people %}
             {% assign item2 = item2 | replace: person[0], person[1] %}
          {% endfor %}
          {{ item2 }}
        </td>
      {% endfor %}
    </tr>
  {% endif %}
{% endfor %}
  </tbody>
</table>


