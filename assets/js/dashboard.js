/*
################ FORMATS ##################
-------------------------------------------
*/


var 	formatAsPercentage = d3.format("%"),
		formatAsPercentage1Dec = d3.format(".1%"),
		formatAsInteger = d3.format(","),
		fsec = d3.time.format("%S s"),
		fmin = d3.time.format("%M m"),
		fhou = d3.time.format("%H h"),
		fwee = d3.time.format("%a"),
		fdat = d3.time.format("%d d"),
		fmon = d3.time.format("%b")
		;

/*
############# PIE CHART ###################
-------------------------------------------
*/



function dsPieChart(){
	
	

	var dataset = [
			{category: "Gay", measure: 0.381516587678},
	      {category: "Lesbian", measure: 0.21327014218},
	      {category: "Bisexual", measure: 0.196682464455},
	      {category: "Trans", measure: 0.0687203791469},
	      {category: "Non binary", measure: 0.042654028436},
	      {category: "Non conf.", measure:0.0971563981043},
	      ]
	      ;

	var 	width = 400,
		   height = 400,
		   outerRadius = Math.min(width, height) / 2,
		   innerRadius = outerRadius * .999,   
		   // for animation
		   innerRadiusFinal = outerRadius * .5,
		   innerRadiusFinal3 = outerRadius* .45,
		   color = d3.scale.ordinal().range(["#e21a00", "#73078e", "#0048ff", "#ffde00", "#fd8e00", "#18800d"])    //builtin range of colors
		   ;
	    
		//vermelho: #e21a00
			//laranja: #fd8e00
			//amarelo: #ffde00
			//verde: #18800d
			//azul: #0048ff
			//roxo: #73078e
			
	var vis = d3.select("#pieChart")
	     .append("svg:svg")              //create the SVG element inside the <body>
	     .data([dataset])                   //associate our data with the document
	         .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	         .attr("height", height)
	     		.append("svg:g")                //make a group to hold our pie chart
	         .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")    //move the center of the pie chart from 0, 0 to radius, radius
				;
				
   var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        	.outerRadius(outerRadius).innerRadius(innerRadius);
   
   // for animation
   var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
	var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

   var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.measure; });    //we must tell it out to access the value of each element in our data array

   var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
               .attr("class", "slice")    //allow us to style things in the slices (like text)
               .on("mouseover", mouseover)
    				.on("mouseout", mouseout)
    				.on("click", up)
    				;
    				
        arcs.append("svg:path")
               .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
               .attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
					.append("svg:title") //mouseover title showing the figures
				   .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.measure); });			

        d3.selectAll("g.slice").selectAll("path").transition()
			    .duration(750)
			    .delay(10)
			    .attr("d", arcFinal )
			    ;
	
	  // Add a label to the larger arcs, translated to the arc centroid and rotated.
	  // source: http://bl.ocks.org/1305337#index.html
	  arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
	  		.append("svg:text")
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
	      //.text(function(d) { return formatAsPercentage(d.value); })
	      .text(function(d) { return d.data.category; })
	      ;
	   
	   // Computes the label angle of an arc, converting from radians to degrees.
		function angle(d) {
		    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		    return a > 90 ? a - 180 : a;
		}
		    
		
		// Pie chart title			
		vis.append("svg:text")
	     	.attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text("LGBTQ+ Identities in Games")
	      .attr("class","title")
	      ;		    


		
	function mouseover() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		//.attr("stroke","red")
	        		//.attr("stroke-width", 1.5)
	        		.attr("d", arcFinal3)
	        		;
	}
	
	function mouseout() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		//.attr("stroke","blue")
	        		//.attr("stroke-width", 1.5)
	        		.attr("d", arcFinal)
	        		;
	}
	
	function up(d, i) {
	
				/* update bar chart when user selects piece of the pie chart */
				//updateBarChart(dataset[i].category);
				updateBarChart(d.data.category, color(i));
				updateLineChart(d.data.category, color(i));
			 
	}
}

dsPieChart();

/*
############# BAR CHART ###################
-------------------------------------------
*/



var datasetBarChart = [
{ group: "Gay", category: "Adventure", measure: 52.0}, 
{ group: "Lesbian", category: "Adventure", measure: 23.0}, 
{ group: "Bisexual", category: "Adventure", measure: 26.0}, 
{ group: "Trans", category: "Adventure", measure: 6.0}, 
{ group: "Non binary", category: "Adventure", measure: 5.0}, 
{ group: "Non conf.", category: "Adventure", measure: 13.0}, 
{ group: "Gay", category: "RPG", measure: 63.0}, 
{ group: "Lesbian", category: "RPG", measure: 38.0}, 
{ group: "Bisexual", category: "RPG", measure: 42.0}, 
{ group: "Trans", category: "RPG", measure: 12.0}, 
{ group: "Non binary", category: "RPG", measure: 9.0}, 
{ group: "Non conf.", category: "RPG", measure: 16.0}, 
{ group: "Gay", category: "Shooter", measure: 6.0}, 
{ group: "Lesbian", category: "Shooter", measure: 6.0}, 
{ group: "Bisexual", category: "Shooter", measure: 4.0}, 
{ group: "Trans", category: "Shooter", measure: 0.0}, 
{ group: "Non binary", category: "Shooter", measure: 3.0}, 
{ group: "Non conf.", category: "Shooter", measure: 2.0}, 
{ group: "Gay", category: "Fighting", measure: 7.0}, 
{ group: "Lesbian", category: "Fighting", measure: 1.0}, 
{ group: "Bisexual", category: "Fighting", measure: 2.0}, 
{ group: "Trans", category: "Fighting", measure: 2.0}, 
{ group: "Non binary", category: "Fighting", measure: 1.0}, 
{ group: "Non conf.", category: "Fighting", measure: 5.0}, 
{ group: "Gay", category: "Simulation", measure: 11.0}, 
{ group: "Lesbian", category: "Simulation", measure: 4.0}, 
{ group: "Bisexual", category: "Simulation", measure: 1.0}, 
{ group: "Trans", category: "Simulation", measure: 1.0}, 
{ group: "Non binary", category: "Simulation", measure: 1.0}, 
{ group: "Non conf.", category: "Simulation", measure: 4.0}, 
{ group: "Gay", category: "Action", measure: 40.0}, 
{ group: "Lesbian", category: "Action", measure: 13.0}, 
{ group: "Bisexual", category: "Action", measure: 28.0}, 
{ group: "Trans", category: "Action", measure: 4.0}, 
{ group: "Non binary", category: "Action", measure: 7.0}, 
{ group: "Non conf.", category: "Action", measure: 5.0},
{ group: "All", category: "Adventure", measure: 125.0},
{ group: "All", category: "RPG", measure: 180.0},
{ group: "All", category: "Shooter", measure: 21.0},
{ group: "All", category: "Fighting", measure: 18.0},
{ group: "All", category: "Simulation", measure: 22.0},
{ group: "All", category: "Action", measure: 97.0}
]
;

// set initial group value
var group = "All";

function datasetBarChosen(group) {
	var ds = [];
	for (x in datasetBarChart) {
		 if(datasetBarChart[x].group==group){
		 	ds.push(datasetBarChart[x]);
		 } 
		}
	return ds;
}


function dsBarChartBasics() {

		var margin = {top: 30, right: 5, bottom: 20, left: 50},
		width = 500 - margin.left - margin.right,
	   	height = 250 - margin.top - margin.bottom,
		colorBar = d3.scale.ordinal().range(["#73078e", "#0048ff", "#18800d", "#ffde00", "#fd8e00", "#e21a00"]),
		barPadding = 1
		;
			
		
		return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}			
		;
}

function dsBarChart() {

	var firstDatasetBarChart = datasetBarChosen(group);         	
	
	var basics = dsBarChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   	height = basics.height,
		colorBar = basics.colorBar,
		barPadding = basics.barPadding
		;
					
	var 	xScale = d3.scale.linear()
						.domain([0, firstDatasetBarChart.length])
						.range([0, width])
						;
						
	// Create linear y scale 
	// Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
	// get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
	var yScale = d3.scale.linear()
			// use the max funtion to derive end point of the domain (max value of the dataset)
			// do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
		   .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
		   // As coordinates are always defined from the top left corner, the y position of the bar
		   // is the svg height minus the data value. So you basically draw the bar starting from the top. 
		   // To have the y position calculated by the range function
		   .range([height, 0])
		   ;
	
	//Create SVG element
	
	var svg = d3.select("#barChart")
			.append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("id","barChartPlot")
		    ;
	
	var plot = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    ;
	            
	plot.selectAll("rect")
		   .data(firstDatasetBarChart)
		   .enter()
		   .append("rect")
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / firstDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", "lightgrey")
			;
	
		
	// Add y labels to plot	
	
	plot.selectAll("text")
	.data(firstDatasetBarChart)
	.enter()
	.append("text")
	.text(function(d) {
			return formatAsInteger(d3.round(d.measure));
	})
	.attr("text-anchor", "middle")
	// Set x position to the left edge of each bar plus half the bar width
	.attr("x", function(d, i) {
			return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
	})
	.attr("y", function(d) {
			return yScale(d.measure) + 14;
	})
	.attr("class", "yAxis")
	/* moved to CSS			   
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "white")
	*/
	;
	
	// Add x labels to chart	
	
	var xLabels = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
		    ;
	
	xLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.category;})
		  .attr("text-anchor", "middle")
			// Set x position to the left edge of each bar plus half the bar width
						   .attr("x", function(d, i) {
						   		return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
						   })
		  .attr("y", 15)
		  .attr("class", "barbase")
		  //.attr("style", "font-size: 8pt; font-family: Helvetica, sans-serif; font-weight:bold; text-transform:uppercase;")
		  ;			
	 
	// Title
	
	svg.append("text")
		.attr("x", (width + margin.left + margin.right)/2)
		.attr("y", 15)
		.attr("class","title")				
		.attr("text-anchor", "middle")
		.text("LGBTQ+ representation in different game genres")
		;
}

dsBarChart();

 /* ** UPDATE CHART ** */
 
/* updates bar chart on request */

function updateBarChart(group, colorChosen) {
		if (Cgroup==group && group!="All") { group = "All"; colorChosen = "#d3d3d3";}
		Cgroup = group;
		var currentDatasetBarChart = datasetBarChosen(group);
		
		var basics = dsBarChartBasics();
	
		var margin = basics.margin,
			width = basics.width,
		   	height = basics.height,
			colorBar = basics.colorBar,
			barPadding = basics.barPadding
			;
		
		var 	xScale = d3.scale.linear()
			.domain([0, currentDatasetBarChart.length])
			.range([0, width])
			;
		
			
		var yScale = d3.scale.linear()
	      .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
	      .range([height,0])
	      ;
	      
	   var svg = d3.select("#barChart svg");
	      
	   var plot = d3.select("#barChartPlot")
	   	.datum(currentDatasetBarChart)
		   ;
	
	  		/* Note that here we only have to select the elements - no more appending! */
	  	plot.selectAll("rect")
	      .data(currentDatasetBarChart)
	      .transition()
			.duration(750)
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / currentDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", colorChosen)
			;
		
		plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
			.data(currentDatasetBarChart)
			.transition()
			.duration(750)
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
		   })
		   .attr("y", function(d) {
		   		return yScale(d.measure) + 14;
		   })
		   .text(function(d) {
				return formatAsInteger(d3.round(d.measure));
		   })
		   .attr("class", "yAxis")					 
		;
		

		svg.selectAll("text.title") // target the text element(s) which has a title class defined
			.attr("x", (width + margin.left + margin.right)/2)
			.attr("y", 15)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text(group + " representation in different game genres")
		;
}


/*
############# LINE CHART ##################
-------------------------------------------
*/

var datasetLineChart = [
{ group: "Gay", category: 1985, measure: 0}, 
{ group: "Lesbian", category: 1985, measure: 0}, 
{ group: "Bisexual", category: 1985, measure: 0}, 
{ group: "Trans", category: 1985, measure: 0}, 
{ group: "Non binary", category: 1985, measure: 1}, 
{ group: "Non conf.", category: 1985, measure: 0}, 
{ group: "All", category: 1985, measure: 1.0}, 
{ group: "Gay", category: 1986, measure: 0}, 
{ group: "Lesbian", category: 1986, measure: 2}, 
{ group: "Bisexual", category: 1986, measure: 0}, 
{ group: "Trans", category: 1986, measure: 0}, 
{ group: "Non binary", category: 1986, measure: 0}, 
{ group: "Non conf.", category: 1986, measure: 0}, 
{ group: "All", category: 1986, measure: 2.0}, 
{ group: "Gay", category: 1987, measure: 0}, 
{ group: "Lesbian", category: 1987, measure: 0}, 
{ group: "Bisexual", category: 1987, measure: 0}, 
{ group: "Trans", category: 1987, measure: 0}, 
{ group: "Non binary", category: 1987, measure: 0}, 
{ group: "Non conf.", category: 1987, measure: 0}, 
{ group: "All", category: 1987, measure: 0.0}, 
{ group: "Gay", category: 1988, measure: 1}, 
{ group: "Lesbian", category: 1988, measure: 1}, 
{ group: "Bisexual", category: 1988, measure: 0}, 
{ group: "Trans", category: 1988, measure: 2}, 
{ group: "Non binary", category: 1988, measure: 0}, 
{ group: "Non conf.", category: 1988, measure: 0}, 
{ group: "All", category: 1988, measure: 4.0}, 
{ group: "Gay", category: 1989, measure: 1}, 
{ group: "Lesbian", category: 1989, measure: 2}, 
{ group: "Bisexual", category: 1989, measure: 1}, 
{ group: "Trans", category: 1989, measure: 1}, 
{ group: "Non binary", category: 1989, measure: 0}, 
{ group: "Non conf.", category: 1989, measure: 1}, 
{ group: "All", category: 1989, measure: 6.0}, 
{ group: "Gay", category: 1990, measure: 1}, 
{ group: "Lesbian", category: 1990, measure: 0}, 
{ group: "Bisexual", category: 1990, measure: 0}, 
{ group: "Trans", category: 1990, measure: 1}, 
{ group: "Non binary", category: 1990, measure: 0}, 
{ group: "Non conf.", category: 1990, measure: 1}, 
{ group: "All", category: 1990, measure: 3.0}, 
{ group: "Gay", category: 1991, measure: 2}, 
{ group: "Lesbian", category: 1991, measure: 0}, 
{ group: "Bisexual", category: 1991, measure: 0}, 
{ group: "Trans", category: 1991, measure: 0}, 
{ group: "Non binary", category: 1991, measure: 0}, 
{ group: "Non conf.", category: 1991, measure: 0}, 
{ group: "All", category: 1991, measure: 2.0}, 
{ group: "Gay", category: 1992, measure: 1}, 
{ group: "Lesbian", category: 1992, measure: 2}, 
{ group: "Bisexual", category: 1992, measure: 1}, 
{ group: "Trans", category: 1992, measure: 0}, 
{ group: "Non binary", category: 1992, measure: 0}, 
{ group: "Non conf.", category: 1992, measure: 2}, 
{ group: "All", category: 1992, measure: 6.0}, 
{ group: "Gay", category: 1993, measure: 2}, 
{ group: "Lesbian", category: 1993, measure: 0}, 
{ group: "Bisexual", category: 1993, measure: 1}, 
{ group: "Trans", category: 1993, measure: 1}, 
{ group: "Non binary", category: 1993, measure: 0}, 
{ group: "Non conf.", category: 1993, measure: 2}, 
{ group: "All", category: 1993, measure: 6.0}, 
{ group: "Gay", category: 1994, measure: 4}, 
{ group: "Lesbian", category: 1994, measure: 0}, 
{ group: "Bisexual", category: 1994, measure: 0}, 
{ group: "Trans", category: 1994, measure: 0}, 
{ group: "Non binary", category: 1994, measure: 0}, 
{ group: "Non conf.", category: 1994, measure: 0}, 
{ group: "All", category: 1994, measure: 4.0}, 
{ group: "Gay", category: 1995, measure: 8}, 
{ group: "Lesbian", category: 1995, measure: 1}, 
{ group: "Bisexual", category: 1995, measure: 0}, 
{ group: "Trans", category: 1995, measure: 0}, 
{ group: "Non binary", category: 1995, measure: 1}, 
{ group: "Non conf.", category: 1995, measure: 2}, 
{ group: "All", category: 1995, measure: 12.0}, 
{ group: "Gay", category: 1996, measure: 6}, 
{ group: "Lesbian", category: 1996, measure: 0}, 
{ group: "Bisexual", category: 1996, measure: 3}, 
{ group: "Trans", category: 1996, measure: 0}, 
{ group: "Non binary", category: 1996, measure: 0}, 
{ group: "Non conf.", category: 1996, measure: 2}, 
{ group: "All", category: 1996, measure: 11.0}, 
{ group: "Gay", category: 1997, measure: 7}, 
{ group: "Lesbian", category: 1997, measure: 5}, 
{ group: "Bisexual", category: 1997, measure: 0}, 
{ group: "Trans", category: 1997, measure: 1}, 
{ group: "Non binary", category: 1997, measure: 0}, 
{ group: "Non conf.", category: 1997, measure: 1}, 
{ group: "All", category: 1997, measure: 14.0}, 
{ group: "Gay", category: 1998, measure: 2}, 
{ group: "Lesbian", category: 1998, measure: 0}, 
{ group: "Bisexual", category: 1998, measure: 0}, 
{ group: "Trans", category: 1998, measure: 0}, 
{ group: "Non binary", category: 1998, measure: 0}, 
{ group: "Non conf.", category: 1998, measure: 0}, 
{ group: "All", category: 1998, measure: 2.0}, 
{ group: "Gay", category: 1999, measure: 6}, 
{ group: "Lesbian", category: 1999, measure: 5}, 
{ group: "Bisexual", category: 1999, measure: 1}, 
{ group: "Trans", category: 1999, measure: 0}, 
{ group: "Non binary", category: 1999, measure: 0}, 
{ group: "Non conf.", category: 1999, measure: 3}, 
{ group: "All", category: 1999, measure: 15.0}, 
{ group: "Gay", category: 2000, measure: 3}, 
{ group: "Lesbian", category: 2000, measure: 4}, 
{ group: "Bisexual", category: 2000, measure: 3}, 
{ group: "Trans", category: 2000, measure: 1}, 
{ group: "Non binary", category: 2000, measure: 1}, 
{ group: "Non conf.", category: 2000, measure: 3}, 
{ group: "All", category: 2000, measure: 15.0}, 
{ group: "Gay", category: 2001, measure: 9}, 
{ group: "Lesbian", category: 2001, measure: 1}, 
{ group: "Bisexual", category: 2001, measure: 7}, 
{ group: "Trans", category: 2001, measure: 5}, 
{ group: "Non binary", category: 2001, measure: 0}, 
{ group: "Non conf.", category: 2001, measure: 3}, 
{ group: "All", category: 2001, measure: 25.0}, 
{ group: "Gay", category: 2002, measure: 5}, 
{ group: "Lesbian", category: 2002, measure: 0}, 
{ group: "Bisexual", category: 2002, measure: 9}, 
{ group: "Trans", category: 2002, measure: 0}, 
{ group: "Non binary", category: 2002, measure: 2}, 
{ group: "Non conf.", category: 2002, measure: 5}, 
{ group: "All", category: 2002, measure: 21.0}, 
{ group: "Gay", category: 2003, measure: 10}, 
{ group: "Lesbian", category: 2003, measure: 6}, 
{ group: "Bisexual", category: 2003, measure: 4}, 
{ group: "Trans", category: 2003, measure: 3}, 
{ group: "Non binary", category: 2003, measure: 0}, 
{ group: "Non conf.", category: 2003, measure: 4}, 
{ group: "All", category: 2003, measure: 27.0}, 
{ group: "Gay", category: 2004, measure: 16}, 
{ group: "Lesbian", category: 2004, measure: 4}, 
{ group: "Bisexual", category: 2004, measure: 11}, 
{ group: "Trans", category: 2004, measure: 2}, 
{ group: "Non binary", category: 2004, measure: 0}, 
{ group: "Non conf.", category: 2004, measure: 2}, 
{ group: "All", category: 2004, measure: 35.0}, 
{ group: "Gay", category: 2005, measure: 15}, 
{ group: "Lesbian", category: 2005, measure: 4}, 
{ group: "Bisexual", category: 2005, measure: 5}, 
{ group: "Trans", category: 2005, measure: 1}, 
{ group: "Non binary", category: 2005, measure: 0}, 
{ group: "Non conf.", category: 2005, measure: 2}, 
{ group: "All", category: 2005, measure: 27.0}, 
{ group: "Gay", category: 2006, measure: 2}, 
{ group: "Lesbian", category: 2006, measure: 2}, 
{ group: "Bisexual", category: 2006, measure: 0}, 
{ group: "Trans", category: 2006, measure: 0}, 
{ group: "Non binary", category: 2006, measure: 2}, 
{ group: "Non conf.", category: 2006, measure: 1}, 
{ group: "All", category: 2006, measure: 7.0}, 
{ group: "Gay", category: 2007, measure: 3}, 
{ group: "Lesbian", category: 2007, measure: 6}, 
{ group: "Bisexual", category: 2007, measure: 1}, 
{ group: "Trans", category: 2007, measure: 0}, 
{ group: "Non binary", category: 2007, measure: 2}, 
{ group: "Non conf.", category: 2007, measure: 0}, 
{ group: "All", category: 2007, measure: 12.0}, 
{ group: "Gay", category: 2008, measure: 16}, 
{ group: "Lesbian", category: 2008, measure: 5}, 
{ group: "Bisexual", category: 2008, measure: 12}, 
{ group: "Trans", category: 2008, measure: 3}, 
{ group: "Non binary", category: 2008, measure: 0}, 
{ group: "Non conf.", category: 2008, measure: 2}, 
{ group: "All", category: 2008, measure: 38.0}, 
{ group: "Gay", category: 2009, measure: 6}, 
{ group: "Lesbian", category: 2009, measure: 4}, 
{ group: "Bisexual", category: 2009, measure: 5}, 
{ group: "Trans", category: 2009, measure: 0}, 
{ group: "Non binary", category: 2009, measure: 1}, 
{ group: "Non conf.", category: 2009, measure: 0}, 
{ group: "All", category: 2009, measure: 16.0}, 
{ group: "Gay", category: 2010, measure: 14}, 
{ group: "Lesbian", category: 2010, measure: 10}, 
{ group: "Bisexual", category: 2010, measure: 11}, 
{ group: "Trans", category: 2010, measure: 0}, 
{ group: "Non binary", category: 2010, measure: 1}, 
{ group: "Non conf.", category: 2010, measure: 2}, 
{ group: "All", category: 2010, measure: 38.0}, 
{ group: "Gay", category: 2011, measure: 0}, 
{ group: "Lesbian", category: 2011, measure: 1}, 
{ group: "Bisexual", category: 2011, measure: 1}, 
{ group: "Trans", category: 2011, measure: 1}, 
{ group: "Non binary", category: 2011, measure: 0}, 
{ group: "Non conf.", category: 2011, measure: 2}, 
{ group: "All", category: 2011, measure: 5.0}, 
{ group: "Gay", category: 2012, measure: 4}, 
{ group: "Lesbian", category: 2012, measure: 7}, 
{ group: "Bisexual", category: 2012, measure: 3}, 
{ group: "Trans", category: 2012, measure: 0}, 
{ group: "Non binary", category: 2012, measure: 1}, 
{ group: "Non conf.", category: 2012, measure: 0}, 
{ group: "All", category: 2012, measure: 15.0}, 
{ group: "Gay", category: 2013, measure: 9}, 
{ group: "Lesbian", category: 2013, measure: 7}, 
{ group: "Bisexual", category: 2013, measure: 2}, 
{ group: "Trans", category: 2013, measure: 3}, 
{ group: "Non binary", category: 2013, measure: 0}, 
{ group: "Non conf.", category: 2013, measure: 0}, 
{ group: "All", category: 2013, measure: 21.0}, 
{ group: "Gay", category: 2014, measure: 4}, 
{ group: "Lesbian", category: 2014, measure: 4}, 
{ group: "Bisexual", category: 2014, measure: 1}, 
{ group: "Trans", category: 2014, measure: 2}, 
{ group: "Non binary", category: 2014, measure: 1}, 
{ group: "Non conf.", category: 2014, measure: 1}, 
{ group: "All", category: 2014, measure: 13.0}, 
{ group: "Gay", category: 2015, measure: 3}, 
{ group: "Lesbian", category: 2015, measure: 4}, 
{ group: "Bisexual", category: 2015, measure: 1}, 
{ group: "Trans", category: 2015, measure: 1}, 
{ group: "Non binary", category: 2015, measure: 4}, 
{ group: "Non conf.", category: 2015, measure: 0}, 
{ group: "All", category: 2015, measure: 13.0}, 
{ group: "Gay", category: 2016, measure: 1}, 
{ group: "Lesbian", category: 2016, measure: 3}, 
{ group: "Bisexual", category: 2016, measure: 0}, 
{ group: "Trans", category: 2016, measure: 1}, 
{ group: "Non binary", category: 2016, measure: 1}, 
{ group: "Non conf.", category: 2016, measure: 0}, 
{ group: "All", category: 2016, measure: 6.0}
]
;

// set initial category value
var Cgroup = "All";
var group = "All";
var CLgroup = "All";
function datasetLineChartChosen(group) {
	var ds = [];
	for (x in datasetLineChart) {
		 if(datasetLineChart[x].group==group){
		 	ds.push(datasetLineChart[x]);
		 } 
		}
	return ds;
}

function dsLineChartBasics() {

	var margin = {top: 40, right: 10, bottom: 20, left: 50},
	    width = 500 - margin.left - margin.right,
	    height = 150 - margin.top - margin.bottom
	    ;
		
		return {
			margin : margin, 
			width : width, 
			height : height
		}			
		;
}


function dsLineChart() {

	var firstDatasetLineChart = datasetLineChartChosen(group);    
	
	var basics = dsLineChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height
		;

	var xScale = d3.scale.linear()
	    .domain([0, firstDatasetLineChart.length-1])
	    .range([0, width])
	    ;

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.measure; })])
	    .range([height, 0])
	    ;
	
	var line = d3.svg.line()
	    //.x(function(d) { return xScale(d.category); })
	    .x(function(d, i) { return xScale(i); })
	    .y(function(d) { return yScale(d.measure); })
	    ;
	
	var svg = d3.select("#lineChart").append("svg")
	    .datum(firstDatasetLineChart)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    // create group and move it so that margins are respected (space for axis and title)
	    
	var plot = svg
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + (margin.top-5) + ")")
	    .attr("id", "lineChartPlot")
	    ;

		/* descriptive titles as part of plot -- start */
	var dsLength=firstDatasetLineChart.length;

	/*plot.append("text")
		.text(firstDatasetLineChart[dsLength-1].measure)
		.attr("id","lineChartTitle2")
		.attr("x",width/2)
		.attr("y",height/2)	
		;*/
	/* descriptive titles -- end */
	    
	plot.append("path")
	    .attr("class", "line")
	    .attr("d", line)	
	    // add color
		.attr("stroke", "lightgrey")
	    ;
	  
	plot.selectAll(".dot")
	    .data(firstDatasetLineChart)
	  	 .enter().append("circle")
	    .attr("class", "dot")
	    //.attr("stroke", function (d) { return d.measure==datasetMeasureMin ? "red" : (d.measure==datasetMeasureMax ? "green" : "steelblue") } )
	    .attr("fill", function (d) { return d.measure==d3.min(firstDatasetLineChart, function(d) { return d.measure; }) ? "red" : (d.measure==d3.max(firstDatasetLineChart, function(d) { return d.measure; }) ? "green" : "white") } )
	    //.attr("stroke-width", function (d) { return d.measure==datasetMeasureMin || d.measure==datasetMeasureMax ? "3px" : "1.5px"} )
	    .attr("cx", line.x())
	    .attr("cy", line.y())
	    .attr("r", 3.5)
	    .attr("stroke", "lightgrey")
	    .append("title")
	    .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })
	    ;

	svg.append("text")
		.text("From 1985 - 2016")
		.attr("id","lineChartTitle1")	
		.attr("x",margin.left + ((width + margin.right)/2))
		.attr("y", 10)
		;

}

dsLineChart();


 /* ** UPDATE CHART ** */

/* updates bar chart on request */
function updateLineChart(group, colorChosen) {
        if (CLgroup==group && group!="All") { group = "All"; colorChosen = "#d3d3d3";}
		CLgroup = group;
	var currentDatasetLineChart = datasetLineChartChosen(group);   

	var basics = dsLineChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height
		;

	var xScale = d3.scale.linear()
	    .domain([0, currentDatasetLineChart.length-1])
	    .range([0, width])
	    ;

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(currentDatasetLineChart, function(d) { return d.measure; })])
	    .range([height, 0])
	    ;
	
	var line = d3.svg.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d.measure); })
    ;

   var plot = d3.select("#lineChartPlot")
   	.datum(currentDatasetLineChart)
	   ;
	   
	/* descriptive titles as part of plot -- start */
	var dsLength=currentDatasetLineChart.length;
	
	plot.select("text")
		.text(currentDatasetLineChart[dsLength-1].measure)
		;
	/* descriptive titles -- end */
	   
	plot
	.select("path")
		.transition()
		.duration(750)			    
	   .attr("class", "line")
	   .attr("d", line)	
	   // add color
		.attr("stroke", colorChosen)
	   ;
	   
	var path = plot
		.selectAll(".dot")
	   .data(currentDatasetLineChart)
	   .transition()
		.duration(750)
	   .attr("class", "dot")
	   .attr("fill", function (d) { return d.measure==d3.min(currentDatasetLineChart, function(d) { return d.measure; }) ? "red" : (d.measure==d3.max(currentDatasetLineChart, function(d) { return d.measure; }) ? "green" : "white") } )
	   .attr("cx", line.x())
	   .attr("cy", line.y())
	   .attr("r", 3.5)
	   // add color
		.attr("stroke", colorChosen)
	   ;
	   
	   path
	   .selectAll("title")
	   .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })	 
	   ;  

}