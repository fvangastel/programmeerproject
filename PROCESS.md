# Dag 1 - donderdag 7 juni
Bezig geweest met het zoeken naar data. De eerste dataset voor de map is in csv opgeslagen. Nog bezig met zoeken naar relevante data en de juiste visualisaties hiervoor.

# Dag 2 - vrijdag 8 juni
Nogsteeds op zoek naar relevante datasets en het in het juiste formaat zien te krijgen.

# Dag 3 - maandag 11 juni
Vanwege mijn verhuizing afgelopen week, loop ik nu een beetje achter. Vandaar dat ik
deze week extra hard moet gaan werken. Helaas is het me vandaag niet gelukt om veel te doen. Morgen poging 2.

# Dag 4 - dinsdag 12 juni
Vandaag eindelijk mijn eerste dataset geïmplementeerd en een map aangemaakt. Mijn eerste dataset met de totale aantal CO2 emissies was een csv bestand die ik heb omgezet in een correcte json. Onderweg kwam ik wel een paar probleempjes tegen, zoals de comma's tussen de getallen die omgezet moesten worden tot punten omdat ze anders werden weergegeven als NaN. Uiteindelijk heb ik de kaart afgekregen met de juiste data. Eerste visualisatie is dus zo goed als af. Het enige wat ik hier nog moet aanpassen is de legenda, die NaN nog weergeeft als eerste getal ipv 0.

# Dag 5 - woensdag 13 juni
Vandaag heb ik een slider aan mijn map toegevoegd, een titel die meeverandert met de slider en een update functie gemaakt die mijn dataset koppelt aan de slider. Voor nu is de map dus klaar. Mijn doel van morgen is om een tweede visualisatie te maken en deze aan de map te koppelen.

# Dag 6 - donderdag 14 juni
Hele dag weer bezig geweest met de map visualisatie. Eerst heb ik de data veranderd van CO2 naar totaal aantal broeikasgassen, omdat dit voor mijn onderwerp veel interessanter is. Daarnaast heb ik de CSV2JSON converter zodanig aangepast, dat de JSON data nu ook nested is. Hier zou ik evt beter mee kunnen werken. Daarnaast heb ik nu ook de dataset van greenhouse gas emissions per sector, voor de sunburst die ik wil gaan maken. Op dit moment loop ik vast met de update functie van mijn map, waarbij de data wel goed wordt vernieuwd, maar de kleuren van de map zich niet aanpassen. Morgen zal ik hier even naar moeten kijken, en hopelijk dat ik dan ook kan gaan beginnen met de sunburst.

# Dag 7 - vrijdag 15 juni
Na de werkgroep heb ik de indeling van mijn github aangepast en alles in de juiste mappen geplaatst. Verder had ik geen energie meer om nog te programmeren.

# Dag 8 - maandag 18 juni
Het is EINDELIJK gelukt om de kleuren van mijn map aan te passen in de update functie! Nu kan ik eindelijk verder met mijn volgende visualisaties. Als eerst ben ik nog steeds op zoek naar de juiste data, aangezien ik merk dat data van verschillende bronnen ook totaal verschillende data opgeven. Ik probeer twee sets te vinden die het meest overeenkomen met mijn huidige data.

# Dag 9 - dinsdag 19 juni
Vandaag weer druk aan de slag gegaan met de rest van mijn data en het goed zetten in json bestanden. Van de komende twee grote datasets heb ik dicts aangemaakt om er goed mee te kunnen werken.

# Dag 10 - woensdag 20 juni
Vandaag lukte het allemaal niet. Ik vond het moeilijk om met mijn nieuw gestructureerde data aan de slag te gaan. Gelukkig is het uiteindelijk met een beetje hulp van jullie toch gelukt om met mijn data te werken, en hier is een mooie tweede visualisatie uitgerold: de barchart. Ik twijfel nog wel wat mijn derde visualisatie moet worden, aangezien het iets moet zijn wat ik nog niet eerder heb gemaakt.

# Dag 11 - donderdag 21 juni
Vandaag heb ik een beginnetje gemaakt aan de radarchart, en heb ik een searchbar toegevoegd als extra interactie. Wel werken beiden nog niet volledig, dat wil ik dan ook morgen proberen te fixen. Het liefst houd ik me volgende week alleen nog bezig met de opmaak en storytelling.

# Dag 12 - vrijdag 22 juni
Vandaag heb ik een bootstrap toegevoegd, mooie layout en alles mooi in containers geplaatst. Komende week moet ik dus nog mijn radar chart laten functioneren (ik snap niet waarom mijn data niet in wordt geladen), mijn search/select bar laten functioneren (nu hij in mn bootstrap zit, werkt ie niet goed meer) en evt de laatste dingetjes aan mijn code aanpassen. Daarna moet er als laatst nog een storytelling worden toegevoegd en een filmpje worden gemaakt over de functionaliteit. Drukke week dus weer voor de boeg.

# Dag 13 - maandag 25 juni
Van het weekend heb ik mijn radar chart aan de praat gekregen, alleen zitten er nog wel bugs in. Vandaag wil ik deze bugs fixen, en de search bar werkend zien te krijgen. Hiernaast heb ik gemerkt dat door het toevoegen van mijn radarchart, de tooltip van mijn barchart niet goed meer werkt. Dit moet k ook nog even fixen.

# Dag 14 - dinsdag 26 juni
Het is gisteren gelukt mijn select bar te laten werken, en al mijn visualisaties hierop te laten updaten! In principe werkt nu dus alles. Radar chart werkt wel met een nieuwe maak functie ipv update functie, denk dat die update functie toch net iets te ingewikkeld voor me wordt. Ben allang blij dat alles nu werkt ;). Nu verder met het oplossen van alle overige bugs en evt paar mooie style dingen toevoegen. Zo heb ik de bug in mijn legenda gefixt, en zit er als het goed is geen bug meer in mijn navbar. Ook heb ik mijn tooltips wat mooier gemaakt, en ben ik mijn code en repository aan het opschonen.
