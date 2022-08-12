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
			legendMarkerColor: "grey",
			dataPoints: sample
		}]
	});
	return chart;
}

function renderChart(data){
    let chart = createChart(data);
    chart.render();
}


chrome.runtime.onMessage.addListener( e => {
	if ( e.type === 'chart' ) {
        let data = e.message;
        renderChart(data);
	}
});

chrome.storage.sync.get("data", ({ "data":data }) => {
    renderChart(data);
});