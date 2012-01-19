var infoFrame,
	contestFrame,
	apptFrame;
$('#info').live('pageinit',function(event){
	$('.backInfo').tap(function(){
		infoFrame = infoFrame || document.getElementById('one').contentWindow;
		infoFrame.postMessage('init back function','*');
	})

	$('.backContest').tap(function(){
		contestFrame = contestFrame || document.getElementById('two').contentWindow;
		contestFrame.postMessage('init back function','*');
	})

	$('.backAppt').tap(function(){
		apptFrame = apptFrame || document.getElementById('three').contentWindow;
		apptFrame.postMessage('init back function','*');
	})

	/*$('#engLang').bind('mousedown',function(){
		alert('123');
	})*/
})