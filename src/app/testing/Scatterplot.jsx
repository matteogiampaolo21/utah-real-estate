'use client'
import React, { useEffect } from 'react'
import * as d3 from "d3";


function responsivefy(svg) {
    

    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));



        
    }
}

function Scatterplot({data}) {

    useEffect(() => {
        // console.log("Scatter:", data)
        const margin = { top:10, right: 60, bottom: 50, left: 90 }
        const width = 800 - margin.left - margin.right
        const height = 300 - margin.top - margin.bottom

        const svg = d3.select("#scatter-plot")
            .append("svg")
                .attr("width",width + margin.left + margin.right)
                .attr("height",height + margin.bottom + margin.top)
                .call(responsivefy)
            .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleLinear()
        .range([0, width])
        // .domain([0, d3.max(data.map(d => d.sqft))]);
        .domain([0, 8_000]);


        const y = d3.scaleLinear()
        .range([height,0])
        // .domain([0, d3.max(data.map(d => d.listPrice))]);
        .domain([0, 1_400_000]);


        const xAxis = d3.axisBottom(x)

        const yAxis = d3.axisLeft(y)
            .ticks(14)
            .tickSize(3)
            .tickPadding(3);



    
        svg.append("g")
            .attr("class", "x axis")
            .style("font-size", 10 )
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        svg.append("g").call(yAxis)
            .attr("class", "y axis")
            .style("font-size", 10)
            .call(yAxis)

        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.sqft); } )
            .attr("cy", function (d) { return y(d.listPrice); } )
            .attr("r", 0.6)
            .style("fill", "#69b3a2");
        

        svg.append("text")
            .attr("transform", "translate(" + width / 2 + "," + (height + margin.bottom / 2) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "8px")
            .style("fill", "black")
            .style("font-family", "sans-serif")
            .attr("dy", "1em")
            .text("Size (ft²)");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", 25)
            .attr("y",3)
            .style("font-size", "8px")
            .text("(USD)");
        
       
    })

    return (
        <div className='bg-white rounded shadow mb-10'>

            <h2 className='text-2xl text-center pt-10 font-bold'>Price of listing in relation to size</h2>
            <div id='scatter-plot'></div>
            
        </div>
    )
}

export default Scatterplot