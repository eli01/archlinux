$(document).ready(function(){
	var Lang=navigator.language;
	if(!localStorage.city){
		if(Lang=="zh-CN"){
			var wea_url='http://s-85283.gotocdn.com/auto_weather.php';
		}else{
			var wea_url='http://s-82923.gotocdn.com/auto_weather.php?Lang=EN';
		}
	}else{
		var city=localStorage.city;
		if(Lang=="zh-CN"){
			var wea_url='http://s-85283.gotocdn.com/city_wea.php?name='+city;
		}else{
			var wea_url='http://s-82923.gotocdn.com/city_wea.php?name='+city;
		}
	}
	$.ajax({
		url:wea_url,
		dataType:"text",
		success:function(data){
			data=JSON.parse(data);
			var wea="";
			wea+=data.city+"&nbsp;&nbsp;";
			wea+=data.temp+"&nbsp;&nbsp";
			if(Lang=="zh-CN"){
				wea+=data.wind+"，"+data.wea;
			}else{
				wea+=data.wea;
			}
			if(data.city!=""){
				$("#get_wea").html(wea);
				$("#get_wea").attr("city",data.city);
				$("#get_wea").attr("foreign_city",data.city+","+data.state);
			}
		},
		error:function(){
			return false;
		}
	});
	$("#get_wea").mousedown(function(){
		var Lang=navigator.language;
		if (Lang=="zh-CN") {
			var name=$("#get_wea").attr("city");
			if(name){
				var url='http://s-85283.gotocdn.com/weather/tianqi.php?name='+name;
			}else{
				var url='http://s-85283.gotocdn.com/weather/tianqi.php';
			}
			window.open(url,"_blank");
		}else{
			var name=$("#get_wea").attr("foreign_city");
			if(name.length>=3){
				var url='http://www.bing.com/weather/search?q='+name;
			}else{
				var url='http://www.bing.com/weather/search?q=weather';
			}
			window.open(url,"_blank");
		}
		
	});
	$("#set_city").mousedown(function(){
		var div='<div class="lightbox" id="lightbox5">';
				div+='<div id="setcity">';
				div+='<div id="wea_back"></div>';
					div+='<h4 class="h3">'+chrome.i18n.getMessage("default_city")+'</h4>';
					div+='<p>'+chrome.i18n.getMessage("city_alert")+'</p>';
					div+='<div style="width:400px;height:50px;margin-bottom:10px;">';
						div+='<input type="button" class="thebutton" posi="0" id="getposi" value="'+chrome.i18n.getMessage("locate")+'"/>';
					div+='</div>';
						div+='<input type="text" class="theinput" id="city_input"/>';
						div+='<input type="button" class="thebutton" id="wea_finish" value="'+chrome.i18n.getMessage("wea_ok")+'"/>';
						div+='<div id="city_su">';
						div+='</div>';
				div+='</div>';
			div+='</div>';
		$("body").append(div);
		$("#city_input")[0].focus();
		var Lang=navigator.language;
		if (Lang=="zh-CN") {
			var ipurl='http://s-85283.gotocdn.com/getposition.php';
		}else{
			var ipurl='http://s-82923.gotocdn.com/get_position.php';
		}
		$.get(ipurl, function(data) {
			/*optional stuff to do after success */
			if(data!="/"&&data!=""){
				$("#getposi").attr("posi",data);
				$("#getposi").val(data);
			}else{
				$("#getposi").val(chrome.i18n.getMessage("locatefailed"));
			}
		});
		$("#getposi").live('mousedown', function(event) {
			/* Act on the event */
			var posi=$(this).attr("posi");
			if(posi!="0"){
				$("#city_input").val(posi);
			}
		});
		$("#wea_back").click(function(event) {
			/* Act on the event */
			$("#lightbox5").remove();
		});
		return false;
	})
	$("#city_input").live('keyup', function(event) {
		$("#city_su").show();
		
		/* Act on the event */
		var name=$("#city_input").val();
		if(name==""){
			$("#city_su").hide();
		}
		if(Lang=="zh-CN"){
			$.get('http://s-85283.gotocdn.com/citysu.php?name='+name, function(data) {
				/*optional stuff to do after success */
				$("#city_su").children().remove();
				data=JSON.parse(data);
				for (var i = 0; i < data.length; i++) {
					$("#city_su").append('<div class="city_name" cn="'+data[i]+'">'+data[i]+'</div>');
				};
			});
		}else{
			$.get('http://s-82923.gotocdn.com/citysu_us.php?name='+name, function(data) {
				/*optional stuff to do after success */
				$("#city_su").children().remove();
				data=JSON.parse(data);
				for (var i = 0; i < data.length; i++) {
					$("#city_su").append('<div class="city_name" cn="'+data[i].province+'/'+data[i].cityname+'">'+data[i].province+'/'+data[i].cityname+'</div>');
				};
			});
		}
	});
	$(".city_name").live('mousedown', function(event) {
		/* Act on the event */
		var cn=$(event.target).attr('cn');
		$("#city_input").val(cn);
	});
	$("#wea_finish").live('click', function(event) {
		/* Act on the event */
		var cn=$("#city_input").val();
		if(cn==""){
			return false
		}else{
			localStorage.city=cn;
			var city=cn;
			$("#get_wea").html(chrome.i18n.getMessage("getweather"));
			var Lang=navigator.language;
			if(Lang=="zh-CN"){
				var wea_url='http://s-85283.gotocdn.com/city_wea.php?name='+city;
			}else{
				var wea_url='http://s-82923.gotocdn.com/city_wea.php?name='+city;
			}
			$.ajax({
				url:wea_url,
				dataType:"text",
				success:function(data){
					data=JSON.parse(data);
					var wea="";
					wea+=data.city+"&nbsp;&nbsp;";
					wea+=data.temp+"&nbsp;&nbsp";
					if(Lang=="zh-CN"){
						wea+=data.wind+"，"+data.wea;
					}else{
						wea+=data.wea;
					}
					if(data.city!=""){
						$("#get_wea").html(wea);
						$("#get_wea").attr("city",data.city);
						$("#get_wea").attr("foreign_city",data.city+","+data.state);
					}else{
						$("#get_wea").attr("city","");
						$("#get_wea").attr("foreign_city","");
					}
						
						
				},
				error:function(){
					return false;
				}
			});
			$("#lightbox5").remove();
		}
	});
});