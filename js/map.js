function chartsLoad(){	
//Map parameter
	var geocoder;
  	var map;
  	var address ="Canada";


  //Chart parameter declaration
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
			var data = {
    labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015"],
    datasets: [
        {
            label: "Housing Selling Price Trend",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
var lineOptions = {

    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};





  	//Map
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapSection"), myOptions);
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                { content: '<b>'+address+'</b>',
                  size: new google.maps.Size(150,50)
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map, 
                title:address
            }); 
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

          } else {
            alert("No results found");
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

// Charts
			var context = document.getElementById('canvasBox1').getContext('2d');
			context.canvas.width = 150;
			context.canvas.height = 120;
			window.myBar = new Chart(context).Bar(barData, options);
			var context1 = document.getElementById('canvasBox2').getContext('2d');
			context1.canvas.width = 150;
			context1.canvas.height = 120;
			window.myBar = new Chart(context1).Bar(barData, options);
			var context2 = document.getElementById('canvasBox3').getContext('2d');
			context2.canvas.width = 150;
			context2.canvas.height = 120;
			window.myBar = new Chart(context2).Bar(barData, options);
			var context3 = document.getElementById('canvasBox4').getContext('2d');
			context3.canvas.width = 150;
			context3.canvas.height = 120;
			window.myBar = new Chart(context3).Bar(barData, options);
			var context4 = document.getElementById('actual').getContext('2d');
			context4.canvas.width = 475;
			context4.canvas.height = 400;
			window.myLineChart = new Chart(context4).Line(data, lineOptions);
			
  }
