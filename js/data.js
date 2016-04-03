function chartsLoad(){

			var options = {
				scaleOverride: true,
				scaleSteps: 5,
				scaleStepWidth: 5,
				scaleStartValue: 0,
				scaleShowGridLines : false,
				scaleShowLabels : false,
				scaleFontSize: 0,
				scaleShowLabels: false,
				scaleLineColor: 'transparent',
    			scaleShowHorizontalLines: false,
    			scaleShowVerticalLines: false,
    			barShowStroke : false,
				barStrokeWidth : 2,
				barValueSpacing : 2,
   				barDatasetSpacing : 1,
				annotateDisplay: true,
				animation: false

			};
			var barData = {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [{
            fillColor: "rgba(252,252,252,1.0)",
            highlightFill: "rgba(232,232,232,0.75)",
            data: [10, 20, 15, 12, 16, 20, 10]
        }]
			};
			

			var context = document.getElementById('canvasBox1').getContext('2d');
			context.canvas.width = 100%;
			context.canvas.height = 120;
			window.myBar = new Chart(context).Bar(barData, options);
			var context1 = document.getElementById('canvasBox2').getContext('2d');
			context1.canvas.width = 100%;
			context1.canvas.height = 120;
			window.myBar = new Chart(context1).Bar(barData, options);
			var context2 = document.getElementById('canvasBox3').getContext('2d');
			context2.canvas.width = 100%;
			context2.canvas.height = 120;
			window.myBar = new Chart(context2).Bar(barData, options);
			var context3 = document.getElementById('canvasBox4').getContext('2d');
			context3.canvas.width = 100%;
			context3.canvas.height = 120;
			window.myBar = new Chart(context3).Bar(barData, options);
			/*var context3 = document.getElementById('actual').getContext('2d');
			context3.canvas.width = 475;
			context3.canvas.height = 400;
			window.myLineChart = new Chart(ctx).Line(data, options);*/
		

}
			

