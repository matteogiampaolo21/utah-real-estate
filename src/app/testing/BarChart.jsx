'use client'
import React, { useEffect,useLayoutEffect, useState } from'react'
import * as d3 from "d3";

const formatTag = (type) => {
    type = type.replaceAll("_"," ");
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function BarChart({data}) {

    


    useEffect(() => {
        const margin = { top: 30, right: 40, bottom: 60, left: 0 }
        const width = 1920 - margin.left - margin.right
        const height = 1080 - margin.top - margin.bottom

        const svg = d3.select("#bar-chart").append("svg")
        .attr("width", '75%')
        .attr("height", '60%')
        .attr('viewBox','0 0 1920 1080')
        .attr('preserveAspectRatio','xMinYMin meet')
        .append("g")
        .attr("transform", "translate(" + 550 + "," + 50 +") rotate(180) scale(-0.75)");
        // .append("g")
        // .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let tempObj = {}

        data.forEach(d => {
            let propType = [d.type]
            
            if (propType[0].includes("town") && propType[0].includes("condo")){
                propType = ['town','condo'];
            }else if( propType[0].includes("town")){
                propType = ["town"]
            }else if( propType[0].includes('condo')){
                propType = ['condo']
            }
            // console.log(propType)

            propType.forEach(type => {
                if(tempObj[type] == undefined){
                    tempObj[type] = 1;
                }else{
                    tempObj[type] += 1;
                }
            })
        })

        // Format object into an array, for easier use
        let tempArray =[];
        for (let i = 0;i < Object.keys(tempObj).length;i++){
            tempArray.push({type:formatTag(Object.keys(tempObj)[i]),amount:Object.values(tempObj)[i],})
        }

        tempArray.sort(function (a, b) {
            return d3.ascending(a.amount, b.amount);
        });


         // Set the x and y scales
        const x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(tempArray.map(d => d.amount))]);
        
        const y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1)
            .domain(tempArray.map(d => d.type));
            // .domain(data.map(function (d) { return d.type; }));

        const xAxis = d3.axisBottom(x)
            .ticks(5)
            .tickSize(0); // remove ticks


        const yAxis = d3.axisLeft(y)
            .tickSize(0)
            .tickPadding(10);




        svg.selectAll(".bar")
            .data(tempArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {return y(d.type) } )
            // .attr("y", function (d) { return y(d.type); })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) { return x(d.amount); })
            // .attr("width", function (d) { return x(d.type); })
            .attr('fill', '#96a5b9')


        svg.append("g")
            .attr("class", "x axis")
            .style("font-size", 33 * (600 / parseInt(d3.select("svg").style("width"))) )
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .attr("class", "y axis")
            .style("font-size", 33 * (600 / parseInt(d3.select("svg").style("width"))))
            .call(yAxis)
            .selectAll('path')
            .style('stroke-width', '1.75px');


        d3.select(window).on("resize", function() {
            const newWidth = d3.select("svg").style("width");
            const newFontSize = 30 * (600 / parseInt(newWidth));
            console.log(newFontSize)
            d3.selectAll(".tick").select("text")
                .style("font-size", newFontSize)
        });
        
        // console.log(data)
    },[])
    
    return (
        <div>

            <div id='bar-chart'></div>

        </div>
    )
}

export default BarChart