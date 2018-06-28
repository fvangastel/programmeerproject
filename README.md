# Programmeerproject

### [Green or not?](https://11096187.github.io/programmeerproject/index.html)
#### A project by Felicia van Gastel

A project containing data visualizations about the sources of greenhouse gases.

![intro-bg.jpg](https://github.com/11096187/programmeerproject/blob/master/docs/intro-bg.jpg)

### Problem statement
While focussing in the recent years on fossil fuels as a major cause of climate change, we forgotten that our agriculture also has a (very) big influence on our climate. Besides from using the bike more often instead of the car, is there something else we as individuals can do to minimize our impact on the climate? And what changes in our lives will have more impact than others?

The target audience for this problem are people who are willing to minimize their impact on the climate and environment.

### Solution
This project will visualize the impact of meat and diary production on our climate.


#### Main features
- A **world map** with color gradients showing the amount of greenhouse gases per country. The map will contain **two buttons** with which you can choose to see the total CO2 emission of a country, the total of greenhouse gases or the CO2 emission per capita. With a **slider** you can change the year of the data. When you **click** on a country on a map, the corresponding data of the country will be shown in the multiline chart and the zoomable sunburst. Without clicking, data about the world as a whole will be shown.
- A **multiline chart** shows information about for example CO2 emissions and production of meat and crops over the years.
- A **sunburst** shows from on what contents the CO2 emission is based.

### Prerequisites
#### Data sources
- [Total greenhouse gases emissions per country](https://data.worldbank.org/indicator/EN.ATM.GHGT.KT.CE)
- [Total CO2 emission](https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?end=2014&start=1960&view=chart)
- [CO2 emission per capita](https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?view=chart)
- [Agricultural methane emissions (% of total)](https://data.worldbank.org/indicator/EN.ATM.METH.AG.ZS?view=chart)
- [Agricultural methane emissions (thousand metric tons of CO2 equivalent)](https://data.worldbank.org/indicator/EN.ATM.METH.AG.KT.CE?view=chart)

#### External components
- [D3 library](https://d3js.org/d3.v4.min.js)
- [topojson](https://d3js.org/topojson.v1.min.js)
- [D3 queue](https://d3js.org/queue.v1.min.js)
- [D3 tip](https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js)

#### Review of similar or related visualizations
- [World map](http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f)
- [Multiline chart](http://bl.ocks.org/asielen/44ffca2877d0132572cb)
- [Zoomable sunburst](https://bl.ocks.org/mbostock/4348373)

#### Hardest parts of implementing
- Missing data from certain countries
