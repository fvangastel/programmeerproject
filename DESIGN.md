# Programmeerproject DESIGN

### Data Sources
- Total greenhouse gases emissions per country:
https://data.worldbank.org/indicator/EN.ATM.GHGT.KT.CE
- Total CO2 emission: https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?end=2014&start=1960&view=chart
- CO2 emission per capita:
https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?view=chart
- Agricultural methane emissions (% of total):
https://data.worldbank.org/indicator/EN.ATM.METH.AG.ZS?view=chart
- Agricultural methane emissions (thousand metric tons of CO2 equivalent):
https://data.worldbank.org/indicator/EN.ATM.METH.AG.KT.CE?view=chart

All data is available in csv format, so it has to be transformed to a json format to make use of classes and objects.

### Overview technical components
![Sketch.png](https://github.com/11096187/programmeerproject/blob/master/doc/Sketch.png)

### Description components
- A **world map** with color gradients showing the amount of greenhouse gases per country, using **toposjon**. The map will contain **two buttons** with which you can choose to see the total CO2 emission of a country, the total of greenhouse gases or the CO2 emission per capita. With a **slider** you can change the year of the data. A **hover** will be included, which will show the data when your mouse is over the corresponding country, using **D3 tip**. When you **click** on a country on a map, the corresponding data of the country will be shown in the multiline chart and the zoomable sunburst. Without clicking, data about the world as a whole will be shown.
- A **multiline chart** shows information about for example CO2 emissions and production of meat and crops over the years. A **hover** will be included, showing the corresponding data of the datapoint, using **D3 tip**.
- A **sunburst** shows from on what contents the CO2 emission is based. A **hover** will be included, using **D3 tip** to show the corresponding data.

### External components
- D3 library: https://d3js.org/d3.v4.min.js
- topojson: https://d3js.org/topojson.v1.min.js
- D3 queue: https://d3js.org/queue.v1.min.js
- D3 tip: https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js
