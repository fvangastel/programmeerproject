# Report

## Short description
This project contains visualizations that will show the greenhouse gas emissions in the world, divided by country, sector and gas type. By *hovering* over the **map**, you can see the total emissions per country. By *clicking* on the **map**, the **bar chart** and **radar chart** will update the emissions per gas and per sector for the selected country. *Hover* over the charts to catch the exact data. With the **select bar** and **slider**, you can respectively change the country and year.

![4-mapHover.png](https://github.com/11096187/programmeerproject/blob/master/docs/4-mapHover.png)

## Technical design
### Overview
The project map consists of:
- A *bootstrap* map that contains scripts, css and images for the [Grayscale](https://startbootstrap.com/template-overviews/grayscale/) theme of the website.
- A *code* map consisting of css and javascript files needed for the visualizations.
- A *data* map containing all the data used.

### Detail
#### js
In the *js map* you can find the all the javascript files needed for de visualizations.
- **main.js** is a file that loads the data and functions to make the visualizations, the slider and the select bar. 
- **barchart.js**, **map.js** and **radar.js** are the files that contain the functions to make and update the visualizations and their titles.
- **components.js** contains the two functions that make the slider and select bar used by the visualizations.

#### css
The *css map* contains the css files used to add style to all visualizations.
- **main.css** contains style code used by all visualizations and the website, like style for the *tooltip* or *fonts* .
- **radar.css** contains style code explicitly used by the radar chart.

## Challenges
During the project I realized that several plans I've made weren't really feasible in the short amount of time. Because of the fact that I've spent a lot of time searching for the data that would explain what I wanted to tell, some visualizations or functionalities that I had in mind were just too complex for the time being. In making decisions about what you want to implement, you have to choose whether spending a lot of time on one specific thing is worth it, since you have to think about meeting all requirements. 

### Changes
1. Radar and bar chart instead of sunburst and multiline chart
2. Data
3. Select button to change country in the radar and bar chart, instead of buttons to change data in map
4. Problem statement

### Argumentation
1. I chose to reject the sunburst, because I've spent much time searching for the data I wanted to show. Since this is a complex visualization that needs a complex json file, this would take too much time meaning I would not be able to make a third visualization. For this, I decided to make a simple bar chart and focus on the last visualization. Since I already implemented a slider for the years, I thought it would be nicer to add a third visualization that would change with the years. Since the multiline chart already contains all the years, I chose to make a radar chart that only contains data for 1 year. The other advantage of this chart is that it shows the relative percentage per sector. Taken up all the advantages and disadvantages of all these charts, I chose to make these changes. 

2. First I wanted to show the CO2 emissions per country, but then during the project I've read that actually the most important gas that the agriculture produces is methane. Since this gas has a big impact on the climate, I wanted to show data of all the greenhouse gases together instead of focusing just on CO2. This way I would not filter out the effect of agriculture on the climate.

3. I intended to make two or more buttons to switch the data of the map (for example 'total CO2 per country' and 'CO2 per capita'), but since I switched the data from CO2 to greenhouse gases, I couln't find a dataset about the greenhouse gas per capita. This meant I had to find another option, so I chose to make a select button to select the country. This could be handy if you want to see data about a certain country, but don't know where on the map it is. Or if you just want to see an overview of all the countries listed.

4. Struggling with data and time, I had to change my problem statement from a specific focus on agriculture, to a more general way containing all sources of greenhouse gases.

## Ideal world
If I would have more time, I would focus more on the agricultural, especially livestock part of the greenhouse gases. Since I wanted to tell a story about the impact of livestock on the climate, there must have been more data about these issues. This could mean that I must have done some more visualizations to show these effects, also in contrast with other agricultural aspects. Next to that, I could have made some more functionalities on my website, like for example information buttons above the visualizations containing more information about the data itself.

