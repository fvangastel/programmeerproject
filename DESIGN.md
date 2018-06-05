# Programmeerproject DESIGN

### Data Sources
- Total greenhouse gases emissions per country:
https://data.worldbank.org/indicator/EN.ATM.GHGT.KT.CE
- Total CO2 emission:
 https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?end=2014&start=1960&view=chart
- CO2 emission per capita:
https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?view=chart
- Agricultural methane emissions (% of total):
https://data.worldbank.org/indicator/EN.ATM.METH.AG.ZS?view=chart
- Agricultural methane emissions (thousand metric tons of CO2 equivalent):
https://data.worldbank.org/indicator/EN.ATM.METH.AG.KT.CE?view=chart

### Overview technical components
![Sketch.png](https://github.com/11096187/programmeerproject/blob/master/doc/Sketch.png)

### Description components
- A **world map** with color gradients showing the amount of greenhouse gases per country. The map will contain **two buttons** with which you can choose to see the total CO2 emission of a country, the total of greenhouse gases or the CO2 emission per capita. With a **slider** you can change the year of the data. When you **click** on a country on a map, the corresponding data of the country will be shown in the multiline chart and the zoomable sunburst. Without clicking, data about the world as a whole will be shown.
- A **multiline chart** shows information about for example CO2 emissions and production of meat and crops over the years.
- A **sunburst** shows from on what contents the CO2 emission is based.

### External components
