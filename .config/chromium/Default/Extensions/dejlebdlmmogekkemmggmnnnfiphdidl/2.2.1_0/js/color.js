$(document).ready(function(){
	
 	/*photo.onload=function(){
 		var c=getaveragecolor(this);
 	}
 	*/
})

function getaveragecolor(photo){
		var red=[];
		var green=[];
		var blue=[];
		var alpha=[];
		var sred=0;
		var sgreen=0;
		var sblue=0;
		var salpha=0;
		var c=document.getElementById("cav");
		var ctx=c.getContext("2d");
		ctx.drawImage(photo,0,0,100,100);
		var imgData=ctx.getImageData(0,0,100,100);
		for (var i = 0; i < imgData.data.length; i+=4) {
			red.push(imgData.data[i]);
			green.push(imgData.data[i+1]);
			blue.push(imgData.data[i+2]);
			alpha.push(imgData.data[i+3]);
		}
		for (var i = 0; i <red.length; i++) {
			sred+=red[i];
		};
		for (var i = 0; i <green.length; i++) {
			sgreen+=green[i];
		};
		for (var i = 0; i <blue.length; i++) {
			sblue+=blue[i];
		};
		for (var i = 0; i < alpha.length; i++) {
			salpha+=alpha[i];
		};
		var ared=sred/red.length;
			ared=parseInt(ared);
		var agreen=sgreen/green.length;
			agreen=parseInt(agreen);
		var ablue=sblue/blue.length;
			ablue=parseInt(ablue);
		var aalpha=salpha/alpha.length;
		var color='rgb(';
			color+=ared;
			color+=',';
			color+=agreen;
			color+=',';
			color+=ablue;
			color+=')';
		return color;
      
}

function rangecolor(){
	var rred=Math.round(Math.random()*225);
	var rgreen=Math.round(Math.random()*225);
	var rblue=Math.round(Math.random()*225);
	var color='rgb(';
		color+=rred;
		color+=',';
		color+=rgreen;
		color+=',';
		color+=rblue;
		color+=')';
	return color;
}