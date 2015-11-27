/**
 * Created by andrew on 6/01/15.
 */

//The directive
function chartPieDirective () { 
    
    function link(scope, element, attrs) {
            //console.log("Link Function Called with chartData: ",scope.chartdata);
            scope.$watch('chartdata', function (chartdata) {
                //console.log("Watch has been called: ",chartdata);
                if (chartdata) {
                    element[0].innerHTML = ""
                   element.append(pieChartBuilder(chartdata,element));
                }
            })
        }
    
    return {
        restrict: "E",
        replace: true,
        template: '<div></div>',
        scope: {
            chartdata: '@chartdata'
        },
        link: link
    }
}

/*

 "phraseTagSummary": { "generalPreposition": 7, "manner": 5, "consider": 21, "outcome": 15, "selfPossessive": 32, "emotive": 4, "temporal": 2, "definite": 23, "generalPronounVerb": 116, "pertains": 90, "selfReflexive": 14, "none": 7, "possible": 8, "compare": 2, "groupPossessive": 6, "anticipate": 6, "othersPossessive": 4 }


 */


//The pie chart builder
function pieChartBuilder(chartdata,element) {
    
    var svg = null;
    var data = null;
    //console.log("chartdata: ",chartdata);
    var origData = JSON.parse(chartdata);
    if (origData instanceof Array) {
        data = origData;
    } else {
        // Transform the object into an array which is what d3 needs...
        data = new Array();
        for (var p in origData) {
            if( origData.hasOwnProperty(p) ) {
                var d = new Object()
                d.word = p;
                d.count = origData[p];
                data.push(d);
            }
        }

        function keysrt(key) {
            return function(a,b){
                if (a[key] > b[key]) return 1;
                if (a[key] < b[key]) return -1;
                return 0;
            }
        }

        data = data.sort(keysrt('count'));
    }
    //console.log("data: ",data);


    //console.log("data: ",data);

    var width = element.parent()[0].offsetWidth;
    //width = 300
    var height = width/1.5;
    var pad = width*0.2;
    var margin = {top: pad, right: pad, bottom: pad, left: pad};
    var w = width - margin.left - margin.right;
    var h = height - margin.top - margin.bottom;
    var r = w/2; //Math.min(w, h) / 2; //outer radius
    var ir = r *0.5;
    var labelr = r -20; // radius for label anchor
    var color = d3.scale.category20();
    var donut = d3.layout.pie().value(function(d) { return d.count; });
    var arc = d3.svg.arc().innerRadius(ir).outerRadius(r);

    svg = d3.select(element[0])
        .data([data])
        .append("svg:svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom);

    var arcs = svg.selectAll("g.arc")
        .data(donut)
        .enter().append("svg:g")
        .attr("class", "arc")
        .attr("transform", "translate(" + (r + 30) + "," + r + ")");

/*
    svg.selectAll(".arc")
        .data(data)
        .enter().append("svg.path")
        .attr("class", function(d) { return d.word; })
        .attr("d", arc); */

    arcs.append("svg:path")
        //.attr("fill", function(d, i) { return color(i); })
        .attr("class", function(d, i) { return data[i].word; })
        .attr("d", arc);

    var legend = svg.selectAll(".legend")
        .data(data)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legendx = width - (18+(pad/2));
    legend.append("rect")
        .attr("x", legendx)
        .attr("width", 18)
        .attr("height", 14)
        .attr("class", function(d) { return d.word; }); //for CSS colors

    legend.append("text")
        .attr("x", legendx - 10)
        .attr("y", 8)
        .attr("dy", ".30em")
        .attr("class","legend-text")
        .style("text-anchor", "end")
        .text(function(d) {return d.word; });


    // Arc Labels
    var totalCount = d3.sum(data, function(d) { return d.count;});
    var    toPercent = d3.format("0.1%");

    arcs.append("svg:text") //add a label to each slice
        .attr("transform", function(d) {
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("class","pie-text")
        .text(function(d, i) {
            var pc = (data[i].count / totalCount);
            var result = null;
            //console.log("pc: "+pc);
            if (pc > 0.03) result = toPercent(pc);
            return result;
        });

}

// Add directive to the app
angular 
    .module(mainAppName)
    .directive("chartPie",chartPieDirective);
