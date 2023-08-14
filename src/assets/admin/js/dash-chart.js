import $ from 'jquery'; 
$( document ).ready(function() {
  var options = {
  		series: [
			{
				name: 'Net Profit',
				data: [10,80, 200, 80, 200, 240, 180,230,200, 250],
			}, 				
		],
          
        chart:{
			type: 'area',
			height: 80,
			width: 320,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
		},

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },

        fill: {
		  opacity: 0.9,
		  colors:'#00ee57',
		  type: 'gradient', 
		  gradient: {
			colorStops:[ 
				
				{
				  offset: 0,
				  color: '#00ee57',
				  opacity: .8
				},
				{
				  offset: 0.6,
				  color: '#00ee57',
				  opacity: .6
				},
				{
				  offset: 100,
				  color: 'white',
				  opacity: 0
				}
			  ],
			  
			}
		},

        xaxis: {
          categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July','August', 'Sept','Oct'],
        },
        
        };

        var chart = new ApexCharts(document.querySelector("#NewCustomers"), options);
        chart.render();
});



$( document ).ready(function() {
  var options = {
  		series: [
			{
				name: 'Net Profit',
				data: [250,300, 50, 250, 200, 80, 180,230,200, 250],
			}, 				
		],
          
        chart:{
			type: 'area',
			height: 80,
			width: 320,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
		},

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },

        fill: {
		  opacity: 0.9,
		  colors:'#03002B',
		  type: 'gradient', 
		  gradient: {
			colorStops:[ 
				
				{
				  offset: 0,
				  color: '#03002B',
				  opacity: .8
				},
				{
				  offset: 0.6,
				  color: '#03002B',
				  opacity: .6
				},
				{
				  offset: 100,
				  color: 'white',
				  opacity: 0
				}
			  ],
			  
			}
		},

        xaxis: {
          categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July','August', 'Sept','Oct'],
        },
        
        };

        var chart = new ApexCharts(document.querySelector("#TotalCrates"), options);
        chart.render();
});



$( document ).ready(function() {
  var options = {
  		series: [
			{
				name: 'Net Profit',
				data: [10,300, 200, 250, 200, 240, 180,230,200, 250],
			}, 				
		],
          
        chart:{
			type: 'area',
			height: 80,
			width: 320,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
		},

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },

        fill: {
		  opacity: 0.9,
		  colors:'#ffc107',
		  type: 'gradient', 
		  gradient: {
			colorStops:[ 
				
				{
				  offset: 0,
				  color: '#ffc107',
				  opacity: .8
				},
				{
				  offset: 0.6,
				  color: '#ffc107',
				  opacity: .6
				},
				{
				  offset: 100,
				  color: 'white',
				  opacity: 0
				}
			  ],
			  
			}
		},

        xaxis: {
          categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July','August', 'Sept','Oct'],
        },
        
        };

        var chart = new ApexCharts(document.querySelector("#TotalClubs"), options);
        chart.render();
});



$( document ).ready(function() {
  var options = {
  		series: [
			{
				name: 'Net Profit',
				data: [10,300, 200, 50, 200, 40, 80,230,200, 250],
			}, 				
		],
          
        chart:{
			type: 'area',
			height: 80,
			width: 320,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
		},

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },

        fill: {
		  opacity: 0.9,
		  colors:'#ff0a32',
		  type: 'gradient', 
		  gradient: {
			colorStops:[ 
				
				{
				  offset: 0,
				  color: '#ff0a32',
				  opacity: .8
				},
				{
				  offset: 0.6,
				  color: '#ff0a32',
				  opacity: .6
				},
				{
				  offset: 100,
				  color: 'white',
				  opacity: 0
				}
			  ],
			  
			}
		},

        xaxis: {
          categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July','August', 'Sept','Oct'],
        },
        
        };

        var chart = new ApexCharts(document.querySelector("#TotalMangers"), options);
        chart.render();


});

