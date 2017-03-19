//Socket.io event listeners
$(function(){   

	//io.connect('http://localhost:3000')
	var socket = io();
	console.log('client side socket connected');

	//Listening for new tweets
	socket.on('newData', function(response){
		updateData(response);
	})

	//Listening for hashtags to track
	//$('.hashtag').on('click', addDataset);

});
		

// ChartJS
//var Chart = function(){

var currentLabels = [];
    
    var generateLabel = function(time){
        var locale = "en-us";
        var month = time.toLocaleString(locale, { month: "short" });
        var day = time.getDate().toString();
        var hour = time.getHours().toString();
        var min = time.getMinutes().toString();
        min = (Math.round(min/5) * 5) % 60;
        if (min.toString().length == 1){
            min = '0' + min
        }
        hour = min > 52 ? (hour === 23 ? 0 : ++hour) : hour;
        var label = month + " " + day + " " + hour + ":" + min;
        return label;
    }
    
    var date = new Date();
    
    for(var i = 0; i<10; i++){
        currentLabels.push(generateLabel(date));
        date.setMinutes(date.getMinutes() + 5);
    }
    
    
    var data = {
        labels: currentLabels,
        datasets: []
    };

    var ctx = $('#lineChart');
    var options = { };
    var lineChart = new Chart(ctx, {
	    type: 'line',
	    data: data,
	    options: options
	});

	// response = {
	// matchingHashtag: hashtag.tag,
	// tweet: newTweet
	// }

    //update Data whenever incoming tweet saved
    function updateData(response){
    	console.log('update data: ', response);

    	var dataPoint = lineChart.data.datasets;

		// Loop over array to match hashtag with label
    	lineChart.data.datasets.forEach(function(dataset, index){

    		//update dataset for matching hashtag
	    	if (dataset.label === response.matchingHashtag){
		    	// lineChart.data.labels[i] = 
		    	// lineChart.data.datasets[i].label =
                console.log(response.tweet.created)
				var label = generateLabel(new Date(response.tweet.created))
				
				if (currentLabels.indexOf(label) < 0){
					console.log("ADD LABEL")
                    TODO
                    // TODO
					// ADD 'label' into dataSet-Labels and currentLabels.
                    // just push it in.
				}


		    	//add count
                // Fix NaN issue
		    	if (dataPoint[index].data.length <= 0) {
                        dataPoint[index].data.push(0)
                    } else {
                        dataPoint[index].data[0] = dataPoint[index].data[0] + 1
                    }
		    	lineChart.update();
	    	}
    	})
    }



    //Initiate chart on user login
    function initChart(){
    	console.log('init chart');

    	//Add dataset for each hashtag currently tracked
    	dashboard.hashtags.forEach(function(hashtag){

    		var newDataset = {
	    		label: hashtag.tag,
	    		borderColor: randomColor(),
	    		fill: false,
	    		data: []
    		}
    		lineChart.data.datasets.push(newDataset);
    		lineChart.update();
    	})
    }

    function addDataset(hashtag){

        var newDataset = {
            label: hashtag.tag,
            borderColor: randomColor(),
            fill: false,
            data: []
        }

        lineChart.data.datasets.push(newDataset);
        lineChart.update();
    	console.log('add dataset', lineChart.data.datasets);
    }

    function deleteDataset(){
    	event.preventDefault();
    	var hashtagElement = event.target.parentNode.parentNode;
    	var hashtag = hashtagElement.textContent;

        //loop through dataset, delete matching dataset
        lineChart.data.datasets.forEach(function(dataset, index){
            if(hashtag === dataset.label){
                lineChart.data.datasets.splice(index, 1);
                console.log('deleted dataset: ', lineChart.data.datasets);
                lineChart.update();
            }
        })
    }

    //random color generator
    function randomColor(){
    	var r = Math.floor(Math.random()*256);       
		var g = Math.floor(Math.random()*256);     
		var b = Math.floor(Math.random()*256);      
		var rgb = 'rgb(' + r + ',' + g + ',' + b + ')'; 
		return rgb;
    }
// }

// var chart = new Chart();

