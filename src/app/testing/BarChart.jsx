'use client'
import React, { useEffect} from'react'
import * as d3 from "d3";

const formatTag = (type) => {
    type = type.replaceAll("_"," ");
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function responsivefy(svg) {
    
    // d3.select(window).on("resize", function() {
    //     const newWidth = d3.select("svg").style("width");
    //     const newFontSize = 30 * (600 / parseInt(newWidth));
    //     console.log(newFontSize)
    //     d3.selectAll(".tick").select("text")
    //         .style("font-size", newFontSize)
    // });




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

function BarChart({data}) {

    


    useEffect(() => {
        const margin = { top: 25, right: 60, bottom: 30, left: 110 }
        const width = 800 - margin.left - margin.right
        const height = 300 - margin.top - margin.bottom

        
        
        const svg = d3.select("#bar-chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .call(responsivefy)
            .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");


       
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

        const xAxis = d3.axisBottom(x)
            .ticks(5)
            .tickSize(0); // remove ticks

        const yAxis = d3.axisLeft(y)
            .tickSize(0)
            .tickPadding(5);




        svg.selectAll(".bar")
            .data(tempArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {return y(d.type) } )
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) { return x(d.amount); })
            .attr('fill', "#69b3a2")


        svg.append("g")
            .attr("class", "x axis")
            .style("font-size", 11 )
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .attr("class", "y axis")
            .style("font-size", 11)
            .call(yAxis)
            .selectAll('path')
            .style('stroke-width', '1.75px');




        svg.selectAll(".label")
            .data(tempArray)
            .enter().append("text")
            .attr("x", function (d) { return x(d.amount) + 5; })
            .attr("y", function (d) { return y(d.type) + y.bandwidth() / 2; })
            .attr("dy", ".35em")
            .style("font-family", "sans-serif")
            .style("font-size", 8)
            .style("font-weight", "bold")
            .style('fill', '#889')
            .text(function (d) { return d.amount; });
        
        // console.log(data)
    },[])
    
    return (
        <div>
            <h2 className='text-2xl text-center font-bold'>Number of listing for each type</h2>
            <div id='bar-chart'></div>
        </div>
    )
}

export default BarChart