function load_search(){
	var Lang=navigator.language;
	_link_url="";
	_is_link=false;
	_search_type="web";
	var div='<div id="searchout">';
			div+='<div id="search_type">';
				div+='<div class="search_top_type" type="web" style="border-bottom:2px solid rgba(3, 247, 237, 1);">'+chrome.i18n.getMessage("search_web")+'</div>';
				div+='<div class="search_top_type" type="news">'+chrome.i18n.getMessage("search_news")+'</div>';
				div+='<div class="search_top_type" type="image">'+chrome.i18n.getMessage("search_image")+'</div>';
				div+='<div class="search_top_type" type="video">'+chrome.i18n.getMessage("search_video")+'</div>';
				div+='<div class="search_top_type" type="music">'+chrome.i18n.getMessage("search_music")+'</div>';
				div+='<div class="search_top_type" type="map">'+chrome.i18n.getMessage("search_map")+'</div>';

			div+='</div>';
			div+='<div id=searchform>';
				div+='<div id="search_option">百度</div>';
				div+='<input type="text" id="search_input" name="search" />';
				div+='<div id="searchbutton"></div>';
			div+='</div>';
			div+='<div id="search_sg"><div id="site_sg"></div><div id="sousuo_sg"></div></div>';
		div+='</div>';
	$("#search").append(div);
	$(document).mousedown(function(e){
		if(e.target.className=="search_top_type"){
			$(".search_top_type").css("border-bottom","");
			$(e.target).css("border-bottom","2px solid rgba(3, 247, 237, 1)");
			var type=$(e.target).attr("type");

			_search_type=type;
		}
	})
	if(Lang=="zh-CN"){
		if(!localStorage.se){
			localStorage.se="0";

			_s_e="baidu"
			$("#search_option").text("百度");
		}else{
			if(localStorage.se=="1"){

				_s_e="google";
				$("#search_option").text("谷歌");
			}else{

				_s_e="baidu";
				$("#search_option").text("百度");
			}
		}
	}else{
		_s_e="google";
		$("#search_option").text("google");
		$("#search_option").css("background-image","none");
	}
	var search={
			baidu:{
				web:"http://www.baidu.com/s?wd=",

				news:"http://news.baidu.com/ns?tn=news&ie=utf-8&word=",

				image:"http://image.baidu.com/i?&ie=utf-8&word=",

				video:"http://video.baidu.com/v?ie=utf-8&word=",

				music:"http://music.baidu.com/search?fr=ps&ie=utf-8&key=",

				map:"http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D"

			},
			google:{
				web:"https://www.google.com/search?q=",

				news:"https://www.google.com/search?tbm=nws&q=",

				image:"https://www.google.com/search?tbm=isch&q=",

				video:"https://www.google.com/search?tbm=vid&q=",

				music:"http://music.baidu.com/search?fr=ps&ie=utf-8&key=",
				blogs:"https://www.google.com/search?tbm=blg&hl=en&q=",
				map:"https://www.google.com/maps/preview#!q="

			}
		}
	var search0={
			baidu:{
					web:"http://www.baidu.com",

					news:"http://news.baidu.com",

					image:"http://image.baidu.com",

					video:"http://video.baidu.com",

					music:"http://music.baidu.com",

					map:"http://map.baidu.com"

				},
				google:{
					web:"https://www.google.com/",

					news:"https://www.google.com/search?tbm=nws&q=",

					image:"https://www.google.com/search?tbm=isch&q=",

					video:"https://www.google.com/search?tbm=vid&q=",

					music:"http://music.baidu.com/search?fr=ps&ie=utf-8&key=",
					blogs:"https://www.google.com/search?tbm=blg&hl=en&q=",
					map:"https://www.google.com/maps/preview#!q="

				}
		}

		$("#search_input").live("keydown",function(e){
			if(e.which==13){
				if(_is_link){
					var url=_link_url;
					$("#site_sg").children().remove();
					$("#sousuo_sg").children().remove();
					$("#search_sg").hide();
					$("#search_input").val("");
					_is_link=false;
				}else{
					var word=$("#search_input").val();
					var type=_search_type;

					var se=_s_e;
					var url=search[se][type]+word;
					if(word==""){
						var url=search0[se][type];
					}
					if(se=="google"&&type=="music"&&navigator.language!="zh-CN"){
						var url=search.google.blogs+word;
					}
					
					$("#site_sg").children().remove();
					$("#sousuo_sg").children().remove();
				}
				window.open(url,_opensearch);
			}
		})
		$("#searchbutton").live("mousedown",function(e){
			var word=$("#search_input").val();
				var type=_search_type;

				var se=_s_e;

				var url=search[se][type]+word;
				if(word==""){
						var url=search0[se][type];
					}
				if(se=="google"&&type=="music"&&navigator.language!="zh-CN"){
						var url=search.google.blogs+word;
					}
			$("#site_sg").children().remove();
			$("#sousuo_sg").children().remove();
			if(e.which==1){
				window.open(url,_opensearch);
			}
			if(e.which==2){
				window.open(url,"_blank");
			}
			return false;
		})
		_search_select=false;
		$("#search_option").live("mousedown",function(e){
			if(Lang!="zh-CN"){
				return false;
			}
			if(e.target.id!=="another"){
				$(this).children().remove();
				if(!_search_select){
					var se=_s_e;

					if(se=="baidu"){
						var oth_se="谷歌";
						var se="g";
					}else{
						var oth_se="百度";
						var se="b";
					}
					var div='<div id="another" se="'+se+'">'+oth_se+'<div>';
					$(this).append(div);
					_search_select=true;
				}else{
					_search_select=false;
				}
			}
		})
		$("#another").live("mousedown",function(){
			var se=$(this).attr("se");
			if(se=="g"){
				$("#search_option").children().remove();
				$("#search_option").text("谷歌");
				_s_e="google";

				localStorage.se="1";
				_search_select=false;
			}else{
				$("#search_option").children().remove();
				$("#search_option").text("百度");
				_s_e="baidu";

				localStorage.se="0";
				_search_select=false;
			}
		});




		/*搜索提示*/
	function getsearchsg(q){
		var Lang=navigator.language;
		if(Lang=="zh-CN"){
			$.ajax({
			url:"http://s-85283.gotocdn.com/search_su.php?word=" + encodeURIComponent(q) + "&p=3&t=" + new Date().getTime(),
			dataType:'text',
			error:function() {
				 $("#sousuo_sg").children().remove();
				},
			success:function(data){
				try{
					data=data.match(/cbackc\((.*)\);/)[1];
					try{
						data=window.eval('('+data+')');
					}
					catch(err1){
						data=JSON.parse(data);
					}
					var sg=data.s.length;
					if(sg>0){
						$("#sousuo_sg").children().remove();
						for (var i = 0; i <sg; i++) {
							if(i==8){
								break;
							}
							$("#sousuo_sg").append('<div id="tip'+i+'" class="thesearchsg">'+data.s[i]+'</div>');
						};
						
					}
					else{
						$("#sousuo_sg").children().remove();
					}
					
					
				}
				catch(err){

				}	
			}
			});
		}
			else{
			$.ajax({
					url:"http://s-82923.gotocdn.com/get_bing_su.php?word=" + encodeURIComponent(q),
					dataType:'text',
					error:function() {
						 $("#sousuo_sg").children().remove();
						},
					success:function(data){
						try{
							var reg=/(\[\{"Txt":.*(?=\}\]))/g;
							var d=data.match(reg)[0];
							try{
								d=window.eval('('+d+')');
							}
							catch(err1){
								d=JSON.parse(d);
							}

							var sg=d.length;
							if(sg>0){
								 $("#sousuo_sg").children().remove();
								 

								for (var i = 0; i <sg; i++) {
									$("#sousuo_sg").append('<div id="tip'+i+'" class="thesearchsg">'+d[i].Txt+'</div>');
								};
								
							}
							else{
								$("#sousuo_sg").children().remove();
							}
							
							
						}
						catch(err){
							$("#sousuo_sg").children().remove();
						}	
					}
				})
		}
	}
	function getsitesg(q){
		var Lang=navigator.language;
		if(Lang=="zh-CN"){
			var url='http://s-85283.gotocdn.com/suggest.php?word='+q+'&t='+ new Date().getTime();

			$.ajax({url:url,dataType:'text',error:function(){},success:
				function(data){

					var reg=/s:.*\}\)/gi;
					var s=data.match(reg)[0];

					var l=s.length;
					if(l<8){
						$("#site_sg").children().remove();
						return false;

					}

						s=s.substring(2,l-2);
					

					var sg=JSON.parse(s);

					$("#site_sg").children().remove();
					var jn=0;
					for(var i=0;i<sg.length;i++){
						var reg2=/0\{\#\S\+\_\}.*/gi;
						var sg_list=sg[i].match(reg2)[0];

							sg_list=sg_list.substring(7);	
		
						var sg_l=JSON.parse(sg_list);

						var sg_name=sg_l[4];
						var sg_url=sg_l[1];
						if(jn==1){
							break;
						}
							if(i!=0){
								var sg_before=JSON.parse(sg[i-1].match(reg2)[0].substring(7))[1];
								if(sg_before==sg_url){
									continue;
								}
							}

						$("#site_sg").append('<div class="thesitesg" id="stip0" url="'+sg_url+'"><span class="sgvisit">访问&nbsp;&nbsp;'+sg_name+':</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sg_link">'+sg_url+'</span></div>');
						jn++;
					}
				}
			});
		}else{
			var url='http://s-82923.gotocdn.com/query_url.php?name='+q+'&time='+new Date().getTime();
			$.ajax({url:url,dataType:'text',error:function(){$("#site_su").html("");},success:
				function(data){

						var l=data.length;
						if(l<8){
							$("#site_sg").children().remove();
							return false;

						}
						var json=JSON.parse(data);
						$("#site_sg").children().remove();
						for (var i = 0; i < json.length; i++) {
							if(i==1){
								break;
							}
							$("#site_sg").append('<div class="thesitesg" id="stip0" url="http://'+json[i].url+'"><span class="sgvisit">Visit&nbsp;&nbsp;'+json[i].name+':</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sg_link">http://'+json[i].url+'</span></div>');

							

						};
						/*
						*/

					}
				
			});
		}//
	}
	$("#search_input").live("keyup",function(e){
		if(e.which!=40&&e.which!=38&&e.which!=39&&e.which!=37&&e.which!=16&&e.which!=17&&e.which!=18&&e.which!=13){
			$("#search_sg").show();
			var q=$("#search_input").val();
			if(q==""){
				$("#search_sg").hide();
			}
			_start_li=0;
			
			_is_link=false;
			getsitesg(q)
			getsearchsg(q);
			
		}
	})
	
	$(document).click(function(e){
		if(e.target.className=="thesitesg"||e.target.className=="sgvisit"||e.target.className=="sg_link"){
			if(e.target.className=="thesitesg"){
				var obj=e.target;
			}
			if(e.target.className=="sgvisit"||e.target.className=="sg_link"){
				var obj=e.target.parentNode;
			}
			var url=$(obj).attr("url");
			if(e.which==1){
				window.open(url,_opensearch);
			}
			if(e.which==2){
				window.open(url,"_blank");
			}
			$("#site_sg").children().remove();
			$("#sousuo_sg").children().remove();
			_is_link=false;
			return false;
		}
	})
	$(document).click(function(e){
		if(e.target.className=="thesearchsg"){
			var word=$(e.target).text();
			var type=_search_type;

			var se=_s_e;

			var url=search[se][type]+word;
			if(se=="google"&&type=="music"&&navigator.language!="zh-CN"){
						var url=search.google.blogs+word;
					}
			if(e.which==1){
				window.open(url,_opensearch);
			}
			if(e.which==2){
				window.open(url,"_blank");
			}
			$("#site_sg").children().remove();
			$("#sousuo_sg").children().remove();
			_is_link=false;
			return false;
		}
	})
	$(document).mousedown(function(e){
		if(e.target.className!="thesitesg"&&e.target.className!="sgvisit"&&e.target.className!="sg_link"&&e.target.className!="thesearchsg"&&e.target.id!="search_input"){
			$("#site_sg").children().remove();
			$("#sousuo_sg").children().remove();
			$("#search_sg").hide();
			_is_link=false;
		}
	})
	_start_li=0;
	_s_pointer=0;
	$("#search_input").live("keydown",function(e){
		if(e.which==40){
			var sear_num=$("#sousuo_sg").children().length;
			var n1=$("#site_sg").children().length;
			if(_s_pointer==2){
				if(_start_li==sear_num+1){
					_start_li=2;
				}else{
					if(_start_li==sear_num){
						_start_li=2;
					}else{
						_start_li+=2;
					}
				}
			}else{
				_start_li+=1;
			}

			if(n1==0){
				
				$(".thesearchsg").css("background-color","");
				$(".thesitesg").css("background-color","");
				$("#tip"+(_start_li-1)).css("background-color","rgba(198, 248, 182, 0.7)");
				_is_link=false;
				var txt=$("#tip"+(_start_li-1)).text();
				$("#search_input").val(txt);
				
				if(_start_li==sear_num){
						_start_li=0;
					}
			}else{
				if(_start_li==1){
					
					$(".thesearchsg").css("background-color","");
					$(".thesitesg").css("background-color","");
					$("#stip0").css("background-color","rgba(198, 248, 182, 0.7)");
					_is_link=true;
					_link_url=$("#stip0").attr("url");
					var txt=$("#stip0").text();
					$("#search_input").val(txt);
					
					if(_start_li==sear_num+1){
						_start_li=0;
					}
				}else{
					
					$(".thesearchsg").css("background-color","");
					$(".thesitesg").css("background-color","");
					$("#tip"+(_start_li-2)).css("background-color","rgba(198, 248, 182, 0.7)");
					_is_link=false;
					var txt=$("#tip"+(_start_li-2)).text();
					$("#search_input").val(txt);
					
					if(_start_li==sear_num+1){
						_start_li=0;
					}
				}
			}
			_s_pointer=1;
		}
		if(e.which==38){
			e.preventDefault();
			var n1=$("#site_sg").children().length;
			var sear_num=$("#sousuo_sg").children().length;

				if(_s_pointer==1){
					if(_start_li==0){
						if(n1!=0){
							_start_li=sear_num-1;
						}else{
							_start_li=sear_num-2;
						}
						
					}else{
						_start_li-=2;
					}
					
				}else{
					_start_li-=1;
				}
			
			
			
			if(_start_li==-1){
				if(n1==0){
					_start_li=sear_num-1;
				}else{
					_start_li=sear_num;
				}
			}
			
			if(n1==0){
				$(".thesearchsg").css("background-color","");
				$(".thesitesg").css("background-color","");
				$("#tip"+_start_li).css("background-color","rgba(198, 248, 182, 0.7)");
				_is_link=false;
				var txt=$("#tip"+_start_li).text();
				$("#search_input").val(txt);
				if(_start_li==0){
						_start_li=sear_num;
				}

			}else{
				if(_start_li==0){
					
					$(".thesearchsg").css("background-color","");
					$(".thesitesg").css("background-color","");
					$("#stip0").css("background-color","rgba(198, 248, 182, 0.7)");
					_is_link=true;
					_link_url=$("#stip0").attr("url");
					var txt=$("#stip0").text();
					$("#search_input").val(txt);

					if(_start_li==0){
						_start_li=sear_num+1;
					}
				}else{

					$(".thesearchsg").css("background-color","");
					$(".thesitesg").css("background-color","");
					$("#tip"+(_start_li-1)).css("background-color","rgba(198, 248, 182, 0.7)");
					_is_link=false;
					var txt=$("#tip"+(_start_li-1)).text();
					$("#search_input").val(txt);

					if(_start_li==0){
						_start_li=sear_num+1;
					}
				}
			}
			_s_pointer=2;
			
		}
	})

}