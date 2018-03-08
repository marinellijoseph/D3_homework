// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// SVG area dimensions
var svgWidth = 1000;
var svgHeight = 500;

// define chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
}

// define dimensions of chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// select body, append SVG area to it and set dimensions
var svg = d3
    .select("body")
        .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            // Append a group area, then set its margins
            .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%Y");

// Load data from data.csv
d3.csv("Data/data.csv", function(error, demographicsData) {

    // throw an error if one occurs
    if (error) throw error;

    // print data
    console.log(demographicsData);

    // format the data 
    demographicsData.forEach(function(data) {
        data.income = +data.income;
        data.depression = +data.depression;
    });

    // configure a linear scale witha  range between the chartWidth
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);

    // configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

    // set the domain for the linearScales function
    xLinearScale.domain(d3.extent(demographicsData, function(data) {
        return data.income;
    }));

    yLinearScale.domain(d3.extent(demographicsData, function(data) {
        return data.depression;
    }));

    // create axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // // configure a line function plotting ccoordinates using scales
    // var drawLine = d3
    //     .line()
    //     .x(function(data) {
    //         return xLinearScale(data.income);
    //     })
    //     .y(function(data) {
    //         return yLinearScale(data.depression);
    //     });

// // append svg path and plot using line function
// svg
//         .append("path")

//         .attr("d", drawLine(demographicsData))
//         .attr("class", "line");

var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter().append('g');

gdots.append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {
            return d.r;
        })
        .attr("cx", function (d) {
            return x(d.income);
        })
        .attr("cy", function (d) {
            return d.depression;
        })
        .style("fill", function (d) {
            return d.c;
        });

gdots.append("text").text(function (d) {
    return d.abbr;
})
    .attr("x", function (d) {
        return x(d.income);
    })
    .attr("y", function (d) {
        return y(d.depression);
    });

// append svg group element to svg area, create left axis inside of it
svg.append("g")
        .attr("class", "axis")
        .call(leftAxis);

// append svg group element to svg area, create bottom axis inside of it
// translate bottom axis to bottom of page
svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);
});
