// https://canvasjs.com/html5-javascript-column-chart/

const CHARTNAME = "chartContainer";
const TITLE = "Text Statistics";
const AXIS_Y_NAME = "Frequency";

function createChart(sample){
	var chart = new CanvasJS.Chart(CHARTNAME, {
		animationEnabled: true,
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		title:{
			text: TITLE
		},
		axisY: {
			title: AXIS_Y_NAME
		},
		data: [{        
			type: "column",  
			showInLegend: true, 
			legendMarkerColor: "grey",
			dataPoints: sample
		}]
	});
	return chart;
}

export function createChart(data){
	let chart = getChart(data);
	chart.render();
}

