# What is itchart-prototype

**itchart-prototype** is a D3-based Javascript diagram example set, which not only contains static charts but also dynamic charts. 

## How-to 

`git clone https://github.com/huangye177/itchart-prototype.git`

`cd itchart-prototype`

`./gradlew build`

`./gradlew jettyRunWar`

Now you can visit "http://localhost:8080/itchart-prototype" on your own browser!

=================

Proxy Setting
------
> NOITCE: please check file "gradle.properties" to enable/disable/change your proxy setting if needed

## Included Chart types

Chart types:

* Barplot (D3)

* Single-Series Lineplot (D3)

* Single-Series Bivariate Lineplot (D3)

* Multi-Series Lineplot (D3)

* Multi-Axis Multi-Series Lineplot (D3)

* Scatterplot (D3)

* Multi-Series Lineplot (D3 out-dated)

* ScatterChart (D3 + NVD)

* lineWithFocusChart (D3 + NVD)

Additional functions:

* SVG to PDF convertion (in Barplot and Single-Series Lineplot)
