
var URL = location.href;
var urlLength = URL.length;
var W = $(window).width();
var H = $(window).height();
var $mainElm;
var imageWidth = 972;
/*var imageHeight= 350;*/
var duration = 300;
var defaultList;
var ulWidth;
var thumbW = 10;
var thumbMargin = 6;

var startPos;
var Start;
var Pos;
var curPos;
var accel;
var Dist;
var a = 0.5;
var b = 5;
var margin = 180;
var Num = 0;
var ulCur;
var Detail;

var pURL;
var newURL;

$(document).ready(function(){
						   
	pURL = $('#header ul li').eq(2).children('a').attr('href');
	
	Detail = $('.detailPage li').length;
        				   
	$mainElm = $('#basic');
						   
	defaultList = $mainElm.find('li').length;
	ulWidth = imageWidth*defaultList;
	var TW = (thumbW+thumbMargin)*defaultList;
	
	$mainElm.children('ul').css('width',ulWidth);
	$('#thumbNail').css('width',TW);
	
	var ID = URL.indexOf('?');
	if(ID != -1){
		var Target = URL.substring(ID+2,urlLength);
		var targetID = '#0'+Target;
		var Pos = $(targetID).position();
		curPos = Pos.left;
		Num = Target-1;
		$mainElm.children('ul').css('left',-curPos);
		if(pURL!=undefined){
			setURL();
		}
	}
	
	ulCur = $mainElm.children('ul').position().left;
	
	for(i=0;i<defaultList;i++){
		$('#thumbNail').append('<div class="thumb"></div>');
	}
	
	$('.thumb').eq(Num).addClass('selected');
	
	proLot = $('.detailPage li').length;
	
	naviAction();
	thumbAction();
	
});

function naviAction(){
	
	$mainElm.children('ul').on('touchstart', function(){
		startPos = event.changedTouches[0].pageX;
		Pos = $(this).position();
		curPos = Pos.left;
		Start = curPos;
	});	
	
	$mainElm.children('ul').on('touchmove', function(){
		event.preventDefault();
		var newX = event.changedTouches[0].pageX;
        var Move = (startPos-newX)*a;
		curPos = curPos-(Move);
		$(this).css('left',curPos);
		accel = (newX-startPos) * b;
		startPos = newX;
	});
	
	$mainElm.children('ul').on('touchend', function(){
		/*fw = imageWidth;
    	sw = ulWidth;*/
		$('#next,#prev').off('click');
		/*if (accel > imageWidth * a) {accel = imageWidth * a;}
    	if (accel < -imageWidth * a) {accel = -imageWidth * a;}*/
		if(accel > imageWidth * a) {accel = 0;}
    	if(accel < -imageWidth * a) {accel = 0;}
    	curPos += accel;
    	accel = 0;
    	visualAction();
	});
	
	$('#next').on('click',function(){
		nextBtn();
	});
	
	$('#prev').on('click',function(){
		prevBtn();
	});
	
}

function nextBtn(){
	Pos = $mainElm.children('ul').position();
	curPos = Pos.left;
	curPos = curPos-imageWidth;
	btnAction();
}

function prevBtn(){
	Pos = $mainElm.children('ul').position();
	curPos = Pos.left;
	curPos = curPos+imageWidth;
	btnAction();
}

function visualAction(){
	$mainElm.children('ul').off('touchstart');
	$mainElm.children('ul').off('touchmove');
	$mainElm.children('ul').off('touchend');
	Dist = Start-curPos;
	if(curPos > 0){
       	curPos = 0;
       	$mainElm.children('ul').stop().animate({left:curPos},duration,function(){naviAction();});
    }else if(curPos < imageWidth - ulWidth) {
       	curPos = imageWidth - ulWidth;
       	$mainElm.children('ul').stop().animate({left:curPos},duration,function(){naviAction();});
    }else{
       	edge = curPos % imageWidth;
		if(Dist > margin){
			curPos = curPos - edge - imageWidth;
		}else if(Dist>0&&Dist<margin){
			curPos -= edge;
		}else if(Dist<-margin){
			curPos -= edge;
		}else if(Dist<0&&Dist>-margin){
			curPos = curPos - edge - imageWidth;
		}
		$mainElm.children('ul').stop().animate({left:curPos},duration,"linear",function(){
			naviAction();
			thumbAction();
		});
     
    }
}

function btnAction(){
	$('#next,#prev').off('click');
	if(curPos > 0) {
       	curPos = 0;
    }else if(curPos < imageWidth - ulWidth) {
       	curPos = imageWidth - ulWidth;
    }
	$mainElm.children('ul').stop().animate({left:curPos},duration,"linear",function(){thumbAction();});
}

function thumbAction(){
	var ulPos = $mainElm.children('ul').position();
	var ulLeft = ulPos.left;
	/*if(ulLeft<ulCur){
		Num++;
	}else if(ulLeft>ulCur){
		Num--;
	}
	ulCur = ulLeft;*/
	Num = (ulLeft/imageWidth)*-1;
	$('.thumb').removeClass('selected');
	$('.thumb').eq(Num).addClass('selected');
	if(Detail==1){
		$('#prev,#next').css('display','none');
		$('#Footer').css('padding-top',20);
	}else if(Detail!=1&&Num==0){
		$('#prev').css('display','none');
		$('#next').css('display','block');
	}else if(Num==defaultList-1){
		$('#next').css('display','none');
		$('#prev').css('display','block');
	}else{
		$('#prev,#next').css('display','block');
	}
	
	$('#next').on('click',function(){
		nextBtn();
	});
	
	$('#prev').on('click',function(){
		prevBtn();
	});
	
	if(pURL!=undefined){
		setURL();
	}
	
}

function setURL(){
	var tID = (Num+1)/12;
	if(tID>1&&tID<=2){
		tID = 1;
		newURL = pURL+'?0'+tID;
	}else if(tID>2&&tID<=3){
		tID = 2;
		newURL = pURL+'?0'+tID;
	}else if(tID>3){
		tID = 3;
		newURL = pURL+'?0'+tID;
	}else if(tID<=1){
		newURL = pURL;
	}
	$('#header ul li').eq(2).children('a').attr('href',newURL);
}