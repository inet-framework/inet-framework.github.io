---
layout: page
title: Contributors
underMenu: People
---

The following people have contributed to the INET Framework. Scroll down for affiliations.

<div class="alert alert-warning">
<b>Note:</b> We tried to make this list as complete as possible. If, despite all our efforts, your name is missing, please contact us so we can correct it!
</div>

{% capture tmp %}Adam Malik (IGMPv3)
Adriano (SimpleVoIP)
Ahmed Ayadi (RTP)
Alberto Cortes (SCTP)
Alfonso Ariza Quintana (MANET protocols, IEEE 802.11)
Alvaro Torres Cortes (TraCI)
Amre El-Hoiydi (CSMA)
Andras Babos (OSPFv2)
Andras Varga* (TCP, IPv4, Ethernet, LDP, etc; maintenance)
Andreas Koepke (CSMA)
Andreas Kuntz (path loss)
Anna Foerster (LMAC, BMAC)
Arndt Buschmann (RTP)
Bastian Halmos (TraCI)
Benjamin Martin Seregi* (RSTP, physical layer, etc.)
Carlos Calafate (TCP Vegas/Westwood)
Christian Bauer (xMIPv6)
Christian Dankbar (serializers, ExtInterface)
Christian Frank (Coord)
Christoph Sommer (TraCI, DYMO-FAU, etc.)
Damien Piguet (ProbabilisticBroadcast, WiseRoute)
Daniel Willkomm (Mobility, Flood, CSMA)
David Eckhoff (TraCI)
Dimitris Kotsakos (ProbabilisticBroadcast)
Dirk Holzhausen (IPSuite)
Emin Ilker Cetinbas (mobility)
Eric Wu (IPv6, IEEE 802.11)
Falko Dressler (TraCI)
Faqir Zarrar Yousaf (Mobile IPv6)
Felix Schmidt-Eisenlohr (path loss)
Florian Meier (IEEE 802.15.4)
George Alyfantis (ProbabilisticBroadcast)
Georg Lutz (RandomWPMobility)
Helene Lageber (BGP)
Ingmar Baumgart (IPv4, fixes)
Irene Ruengeler (SCTP, SCTP apps, serializers)
Isabel Dietrich (StaticGridMobility)
Jerome Rousselot (802.15.4 UWB-IR, CSMA, WiseRoute)
Jochen Reber (IPSuite's IPv4)
Johnny Lai (UDPVideoStream, PingApp)
Juan-Carlos Cano (TCP Vegas/Westwood)
Juan-Carlos Maureira (DHCP)
Juan Luis Garrote Molinero (RSTP)
Karl Wessel (MiXiM mapping classes)
Klaus Wehrle (IPSuite)
Konrad Polys (SUIPathLoss)
Kristjan V. Jonsson (HttpTools)
Krzysztof Grochla (SUIPathLoss)
Levente Meszaros* (IEEE 802.11, physical layer, Dymo, GPSR, etc; maintenance)
Luca Bedogni (TraCI)
Lukas Hluze (Ieee80211Mac)
Marcel Steine (CSMA)
Marcin Kosiba (ChiangMobility, GaussMarkovMobility)
Marc Loebbers (CSMA, ConstSpeedMobility, SnrEval)
Maria Fernandez (TCP Vegas/Westwood)
Martin Becke (SCTP, netperfmeter)
Matthias Oppitz (RTP)
Mathias Bohge (VoIPStream)
Michael Tuexen (SCTP, ExtInterface)
Mohamed Louizi (DYMO-FAU)
Martin Renwanz (VoIPStream)
Oliver Graute (path loss)
Peterpaul Klein Haneveld (TractorMobility)
Pietro Manzoni (TCP Vegas/Westwood)
Robin Seggelmann (SCTP)
Rudolf Hornig* (maintenance)
Sorin Cocorada (IEEE 802.11)
Steffen Sroka (mobility)
Steve Woon (IEEE 801.11)
Tamas Borbely* (DiffServ, RIP, PIM, IPv4, etc.)
Thomas Dreibholz (SCTP, SCTP apps, TCPDump, PCAP)
Thomas Reschka (TCP SACK)
Tobias Mayer (TraCI)
Tomas Prochazka (PIM-SM)
Ulrich Kaage (IPSuite's TCPModule)
Verena Kahmann (IPSuite's TCPModule)
Veronika Rybova (PIM-SM, PIM-DM)
Vincent Oberle (IPv4)
Vladimir Vesely (IGMPv3, PIM-SM, PIM-DM)
Vojtech Janota (MPLS, LDP, RSVP-TE, TED)
Volker Boehm (IPSuite's TCPModule)
Wei Yang Ng (IPv6)
Xuan Thang Nguyen (MPLS, RSVP-TE, LDP)
Yosia Hadisusanto (CSMA)
Zheng Yao (TraCI)
Zoltan Bojthe* (VoIPStream, TCP_lwIP, IPv4, etc; maintenance)
Zsolt Prontvai (STP)
{% endcapture %}

<div style="column-count: 2; -webkit-column-count: 2; -moz-column-count: 2;">
{{ tmp | newline_to_br | replace: "(", "<small>(" | replace: ")", ")</small>" }}
</div>

----

### Contributor Affiliations

{% capture tmp %}CTIE, Monash University, Melbourne, Australia.
University of Technology, Sydney, Australia.
Brno University of Technology, Czech Republic.
INRIA, France.
Communication Networks Institute, Dortmund University of Technology, Germany.
Fachhochschule Muenster, Germany.
Friedrich-Alexander Universitaet (FAU), Erlangen, Germany.
Institut fuer Telematik, Universitaet Karlsruhe, Germany.
Institute of Communications and Navigation, German Aerospace Center (DLR), Germany.
Technische Universitaet Berlin, Germany.
Universitaet Paderborn, Germany.
Communications Network Laboratory, University of Athens, Greece.
Budapest University Technology and Economics, Hungary.
Laboratory for Dependable Systems, Reykjavik University, Iceland.
University of Pisa, Italy.
Eindhoven University of Technology, the Netherlands.
Universita della Svizzera Italiana, Lugano, Switzerland.
Universidad de Malaga, Spain.
{% endcapture %}

{{ tmp | newline_to_br }}

----

Notes:

*   Authors of 3rd party software (e.g. lwIP, NSC, SUMO, Macho, batmand, etc.) not listed
*   Main source: copyright and author lines in sources; committers
*   Asterisk (*) means: OMNeT++ developer / team member

