	function closeDialog(callback){
		$('#infoBox').css('display','none');
		if(callback){
			callback();
		}
	}

	function showDialog(callback){
		$('#infoBox').css('display','block');
		if(callback){
				callback();
		}
	}

	function addScript(url)
	{
	  var obj=new JSONscriptRequest(url);
	  obj.buildScriptTag(); // Build the script tag
	  obj.addScriptTag(); // Execute (add) the script tag
	}//end addScript

	function appObj(){
		var app = {
			loadEvents: function(){
				var _this = this;
				$('#submit-message').click(function(){_this.submitMessage()});
				$('#submit-info').click(function(){_this.submitInfo()});
				$('#cancel-info').click(function(){_this.cancelInfo()});
				$('#term').tap(function(el){_this.openTerm(el)});
				$('#closeTerm').click(function(){_this.closeTerm()});
			},
			submitMessage: function(){
				if($('textarea').val().length){
					showDialog(function(){
						$('#contentMessage').val($('textarea').val());
					});
				}
				else {
					alert("Please input a message");
				}
			},
			submitInfo: function(){
				if($('#username').val().length && $('#nric').val().length && $('#contact').val().length && $('#contact').val().length && $('#checkbox-0').attr('checked')){
					$('#hidden-submit').submit();
				}
				else {
					alert("Please complete the form");
				}
			},
			cancelInfo:function() {
				closeDialog(function(){
					$('#infoBox input').val('');
				})
			},
			openTerm:function(e) {
				e.stopImmediatePropagation();
				$('#infoBoxContent form').css('display','none');
				$('#termBox').css('display','block');
				return false;
			},
			closeTerm:function() {
				$('#infoBoxContent form').css('display','block');
				$('#termBox').css('display','none');
			},
		}
		return app;
	}