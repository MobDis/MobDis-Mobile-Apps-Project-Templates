var infoFrame,
	contestFrame,
	apptFrame;

window.addEventListener('message',
		function(evt){
			window.location = evt.data;
		},
		false);	

		
$('#info').live('pageinit',function(event){

	/***** Tap Events*****/
	$('.backInfo').tap(function(){
		event.preventDefault();
		document.getElementById('one').contentWindow.triggerBackButton();
	//	infoFrame = infoFrame || document.getElementById('one').contentWindow;
		//.postMessage('init back function','*');
	});

	/*$('.backContest').tap(function(){
		contestFrame = contestFrame || document.getElementById('two').contentWindow;
		contestFrame.postMessage('init back function','*');
	})

	$('.backAppt').tap(function(){
		apptFrame = apptFrame || document.getElementById('three').contentWindow;
		apptFrame.postMessage('init back function','*');
	})*/

	$('.ref').tap(function(){
		var oldUrl = $('#one').attr('src');
		$('#one').attr('src',oldUrl);
	})

	/***** End of Tap Events *****/

	//Update viewport

	function updateViewPort(orientation){
		var scale = (orientation == "portrait" ? screen.width : screen.height )/320;
		setTimeout(function(){
			
			var viewPortString = 'width=device-width,initial-scale='+scale+',minimum-scale='+scale+'';

			$('head meta[name=viewport]').attr("content", viewPortString);
			$('body').css('opacity','0.9');
			setTimeout(function(){
				$('body').css('opacity','1.0');
			},200);
			
		},200);
	}

	//end of update view port

	$(window).orientationchange(function(data){
		if(ios){
			updateViewPort(data.orientation);
		}
	});
		
	updateViewPort(jQuery.event.special.orientationchange.orientation());
})