var data = [
['Lesbian', 'Gay',72],
['Lesbian', 'Bisexual',33],
['Lesbian', 'Trans',9],
['Lesbian', 'Non-binary',8],
['Lesbian', 'Non-conforming',2],
['Gay', 'Lesbian',72],
['Gay', 'Bisexual',61],
['Gay', 'Trans',29],
['Gay', 'Non-binary',9],
['Gay', 'Non-conforming',2],
['Bisexual', 'Lesbian',33],
['Bisexual', 'Gay',61],
['Bisexual', 'Trans',22],
['Bisexual', 'Non-binary',28],
['Bisexual', 'Non-conforming',14],
['Trans', 'Lesbian',9],
['Trans', 'Gay',29],
['Trans', 'Bisexual',22],
['Trans', 'Non-binary',2],
['Trans', 'Non-conforming',1],
['Non-binary', 'Lesbian',8],
['Non-binary', 'Gay',9],
['Non-binary', 'Bisexual',28],
['Non-binary', 'Trans',2],
['Non-binary', 'Non-conforming',2],
['Non-conforming', 'Lesbian',2],
['Non-conforming', 'Gay',2],
['Non-conforming', 'Bisexual',14],
['Non-conforming', 'Non-binary',2],
['Non-conforming', 'Trans',1]
];

var colors = {
 "Gay":"#0033ff"
,"Lesbian": "#660099"
,"Bisexual":"#cc0000"
,"Non-conforming":"#ff9900"
,"Trans": "#ffcc00"
,"Non-binary": "#009933"
};

var sortOrder =[
 "Gay"
,"Lesbian"
,"Bisexual"
,"Non-conforming"
,"Trans"
,"Non-binary"
];

function sort(a,b){ return d3.ascending(sortOrder.indexOf(a),sortOrder.indexOf(b)); }

var ch = viz.ch().data(data)
      .padding(.01)
      .sort(sort)
	  .innerRadius(430)
	  .outerRadius(450)
	  .duration(1000)
	  .chordOpacity(0.3)
	  .labelPadding(.03)
      .fill(function(d){ return colors[d];});

var width=1250, height=1100;

var svg = d3.select("body").append("svg").attr("height",height).attr("width",width);

svg.append("g").attr("transform", "translate(600,550)").call(ch);

// adjust height of frame in bl.ocks.org
d3.select(self.frameElement).style("height", height+"px").style("width", width+"px");     