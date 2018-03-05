
var proLot;
var agent = navigator.userAgent;

if(agent.search(/Android/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPhone/) != -1 || agent.search(/iPod/) != -1){
    monaca.viewport({width : 1024});
}

$(document).ready(function(){
						   
	proLot = $('#basic li').length;
	
	if(proLot==1){
		$('#Footer').css('padding-top',0);
	}
						   
   	/* inner link */
	$('#Tab ul li a').click(function(){
		var Target = $(this).attr('href');
		var index = Target.indexOf('#');
		if(index != -1){
			var Pos = $(Target).position();
			var targetPos = Pos.top;
			$('html,body').animate({scrollTop:targetPos-70},350);
			return false
		}
	});
	
});