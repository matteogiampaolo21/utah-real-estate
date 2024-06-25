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
        const margin = { top: 0, right: 60, bottom: 50, left: 90 }
        const width = 800 - margin.left - margin.right
        const height = 400 - margin.top - margin.bottom

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
        .domain([0, 12000]);


        const y = d3.scaleLinear()
        .range([height,0])
        // .domain([0, d3.max(data.map(d => d.listPrice))]);
        .domain([0, 1_500_000]);


        const xAxis = d3.axisBottom(x)
        const yAxis = d3.axisLeft(y)


        // const dots = svg.append('g')
        //     .selectAll("dot").data(data);
        // dots.enter().append("circle")
        //     .attr("cx",function(d){return d.sqft;})
        //     .attr("cy",function(d){return d.listPrice;})
        //     .attr('r',5)
        //     .style("fill","red")

        // svg.selectAll(".dot")
        //     .data(data)
        //     .enter().append("circle")
        //     .attr("class", "dot")
        //     .attr("cy", function (d) {return y(d.listPrice) } )
        //     // .attr("height", y.bandwidth())
        //     .attr("cx", 0)
        //     .attr("width", function (d) { return x(d.sqft); })
        //     .attr('fill', '#64748b')





    
        svg.append("g")
            .attr("class", "x axis")
            .style("font-size", 10 )
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        svg.append("g").call(yAxis);

        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.sqft); } )
            .attr("cy", function (d) { return y(d.listPrice); } )
            .attr("r", 0.6)
            .style("fill", "#69b3a2")

        
       
    })

    return (
        <div>

            <h2 className='text-2xl text-center my-10 font-bold'>Price of listing in relation to size</h2>
            <div id='scatter-plot'></div>
            
        </div>
    )
}

export default Scatterplot