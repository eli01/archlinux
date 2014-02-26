//书签
function bookmarks(){
	chrome.bookmarks.getTree(function(books){

			var a=books[0].children;
			for(var i=0;i<a.length;i++){
				if(i==0){
					var book='<div class="book">';
							book+='<div class="bookss">';
								book+='<div class="linksss" id="open_apps"><img class="booksss_ico" id="open_apps" src="img/apps.png"/>'+chrome.i18n.getMessage("application")+'</div></div>';
							for(var j=0;j<a[0].children.length;j++){
								if(typeof(a[0].children[j]).children=="object"){
									book+='<div class="booksss" bookindex="0" bookid="'+a[0].children[j].id+'" parentId="'+a[0].children[j].parentId+'" type="books">'+a[0].children[j].title;
									book+='</div>';
								}else{
									book+='<div class="linksss" bookindex="0" bookid="'+a[0].children[j].id+' " bookurl="'+a[0].children[j].url+'" type="links"><img class="linksss_ico" " bookurl="'+a[0].children[j].url+'" src="'+Favicon_Api+a[0].children[j].url+'"/>'+a[0].children[j].title;
									book+='</div>';
								}
							}
							book+='</div>';
							try{

								book+='<div class="other" ><div id="more" bookindex="0" class="linksss">»</div>';
								for(var g=1;g<a.length;g++){
									book+='<div class="booksss" bookindex="0" id="other_bookmarks" bookid="'+a[g].id+'" parentId="'+a[g].parentId+'">'+a[g].title+'</div>';
								}
								book+='<div class="linksss" bookindex="0" id="manage_bookmarks"><img class="booksss_ico" src="img/bookmarks.png" id="manage_bookmarks"/>'+chrome.i18n.getMessage("bookmark_manage")+'</div></div>';
							}catch(e){
								
							}
						book+='</div>';
					$("body").append(book);
				}
			}
			

		
	})
}
function load_bookmarks(){
	//加载书签栏

	_new_book=false;
	_p_id2=0;
	_book_id="";
	_bigest_index=0;
	
	//打开书签管理器
	$(document).mousedown(function(e){
		if(e.target.id=="manage_bookmarks"){
			chrome.tabs.getCurrent(function(tab) {		
				var a=tab.index+1;
				chrome.tabs.create({"index":a,"url":"chrome://bookmarks/"},function(){
				return false;
				})
			});
			
		}
	})
	//打开应用程序
	$(document).mousedown(function(e){
		if(e.target.id=="open_apps"){
			chrome.tabs.getCurrent(function(tab) {		
				var a=tab.index+1;
				chrome.tabs.create({"index":a,"url":"chrome://apps/"},function(){
					return false;
				})
			});
			
		}
	})
	//打开书签
	$(document).mousedown(function(e){
		if(e.which==1||e.which==2){
			if((e.target.className=="linksss"||e.target.className=="linksss_ico")&&e.target.id!="open_apps"&&e.target.id!="manage_bookmarks"&&e.target.id!="more"){
				var url=$(e.target).attr("bookurl");
				if(e.which==1){
					window.open(url,_openbookmark);
					return false;
				}
				if(e.which==2){
					window.open(url,"_blank");
				}
				return false;
			}
		}
	})
	//打开书签文件夹
	
	$(document).mousedown(function(e){
		if(e.target.className=="booksss"){
			$(".newbook").remove();
			$(".newbook2").remove();
			_lock=true;
			var obj=e.target;
			
			_book_id="";
			_new_book=true;
			var width=$(window).width();
			var left=$(obj).offset().left;
			var right=width-left;
			var index=$(obj).attr("bookindex");
				index=parseInt(index);
				index+=1;
			var bookid=$(obj).attr("bookid");
			if(left<=width/2){
				var div='<div bookindex="'+index+'" class="newbook" style="left:'+left+'px">';
			}else{
				var div='<div bookindex="'+index+'" class="newbook" style="right:'+right+'px">';
			}
				div+='<div class="newclear" type="links"></div>';
			chrome.bookmarks.getChildren(bookid,function(bookmarks){
				if(bookmarks.length==0){
						div+='<div class="newlinks" type="links"  ><img class="newlinkico" src="img/false.png"/>'+chrome.i18n.getMessage("emp")+'</div>';
				}else{
					for (var i = 0; i < bookmarks.length; i++) {
						
							if(typeof(bookmarks[i].url)=="undefined"){
								div+='<div bookindex="'+index+'" class="newbooks" type="books" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" >'+bookmarks[i].title+'</div>';
							}else{
								div+='<div bookindex="'+index+'" class="newlinks" type="links" bookurl="'+bookmarks[i].url+'" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" ><img class="newlinkico" src="'+Favicon_Api+bookmarks[i].url+'"/>'+bookmarks[i].title+'</div>';
							}
					};
				}
				div+='<div class="newclear" type="links" style="height:4px;"></div>';
				div+='</div>';
				$("body").append(div);
				
			})
		}
	})
	$(document).mouseover(function(e){
		if(_new_book==false){
			return false;
		}

		if(e.target.className=="booksss"){
			$(".newbook").remove();
			$(".newbook2").remove();
			_lock=true;
			var obj=e.target;
	
			_book_id="";
			var width=$(window).width();
			var left=$(obj).offset().left;
			var right=width-left;
			var index=$(obj).attr("bookindex");
				index=parseInt(index);
				index+=1;
			var bookid=$(obj).attr("bookid");
			if(left<=width/2){
				var div='<div bookindex="'+index+'" class="newbook" style="left:'+left+'px">';
			}else{
				var div='<div bookindex="'+index+'" class="newbook" style="right:'+right+'px">';
			}
				div+='<div class="newclear" type="links"></div>';
			chrome.bookmarks.getChildren(bookid,function(bookmarks){
				if(bookmarks.length==0){
						div+='<div class="newlinks" type="links"  ><img class="newlinkico" src="img/false.png"/>'+chrome.i18n.getMessage("emp")+'</div>';
				}else{
					for (var i = 0; i < bookmarks.length; i++) {
						
							if(typeof(bookmarks[i].url)=="undefined"){
								div+='<div bookindex="'+index+'" class="newbooks" type="books" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" >'+bookmarks[i].title+'</div>';
							}else{
								div+='<div bookindex="'+index+'" class="newlinks" type="links" bookurl="'+bookmarks[i].url+'" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'"><img class="newlinkico" src="'+Favicon_Api+bookmarks[i].url+'"/>'+bookmarks[i].title+'</div>';
							}
					};
				}
				div+='<div class="newclear" type="links" style="height:4px;"></div>';
				div+='</div>';
				$("body").append(div);

			})
		}
	})
	//
	$(document).mousedown(function(e){
		if(e.target.className!="newbooks"&&e.target.className!="newlinks"&&e.target.className!="newbook"&&e.target.className!="newlinkico"&&e.target.className!="booksss"){
			$(".newbook").remove();
			$(".newbook2").remove();
			_new_book=false;
			_lock=false;
		}
	})
	$(document).mouseover(function(e){
		if(e.target.className=="newbooks"){
			_lock=true;
			var obj=e.target;
			
			var _p_id1=$(obj).attr("parentId");
				_p_id1=parseInt(_p_id1);
				_p_id2=parseInt(_p_id2);
			var parent=_p_id2.toString();
			var bid=$(obj).attr("bookid");
			var index=$(obj).attr("bookindex");
				index=parseInt(index);
				if((_p_id2>=_p_id1)&&(bid!=_book_id)){
					try{
						
					for(var l=index+1;l<_bigest_index+1;l++){
						$('[bookindex='+l+']').remove();	
					}
						

					}catch(e){

					}
				}
				
				if(bid==_book_id){
					return false;
				}
		
				index+=1;
				if(_bigest_index<=index){
					_bigest_index=index;
				}
			var width=$(window).width();
			var height=$(window).height();
			var left=$(obj).offset().left;
			var top=$(obj).offset().top-30;
			var leftnow=left+330;
			var right=width-left;
			var bookid=$(obj).attr("bookid");
			if(left<=width/2){
				var div='<div bookindex="'+index+'" class="newbook2" style="left:'+leftnow+'px;">';
			}else{
				var div='<div bookindex="'+index+'" class="newbook2" style="right:'+right+'px;">';
			}
				div+='<div class="newclear" type="links"></div>';
			chrome.bookmarks.getChildren(bookid,function(bookmarks){
				if(bookmarks.length==0){
						div+='<div bookindex="'+index+'" class="newlinks" type="links"  ><img class="newlinkico" src="img/false.png"/>'+chrome.i18n.getMessage("emp")+'</div>';
				}else{
					for (var i = 0; i < bookmarks.length; i++) {
						
							if(typeof(bookmarks[i].url)=="undefined"){
								div+='<div bookindex="'+index+'" class="newbooks" type="books" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'">'+bookmarks[i].title+'</div>';
							}else{
								div+='<div bookindex="'+index+'" class="newlinks" type="links" bookurl="'+bookmarks[i].url+'" bookid="'+bookmarks[i].id+'"><img class="newlinkico" src="'+Favicon_Api+bookmarks[i].url+'"/>'+bookmarks[i].title+'</div>';
							}
					};
				}
				div+='<div class="newclear" type="links" style="height:4px;"></div>';
				div+='</div>';
				$("body").append(div);
				
			})
			_p_id2=_p_id1;
			_book_id=bid;
		}
	})
	$(document).mousedown(function(e){
		if(e.target.id=="more"){
				_lock=true;
				$(".newbook").remove();
				$(".newbook2").remove();
				_book_id="";
				_new_book=true;
				var obj=e.target;
				var toleft=$(obj).offset().left;

				for(var m=0;m<$(".book").children().length;m++){
					var leftx=$($(".book").children()[m]).offset().left;
					if(toleft<leftx+152){
						var last=m;
						break;

					}
				}
				var index=$(obj).attr("bookindex");
					index=parseInt(index);
					index+=1;
				var div='<div bookindex="'+index+'" class="newbook" style="right:0px">';
				
					div+='<div class="newclear" type="links"></div>';
				chrome.bookmarks.getTree(function(books){
					var bookmarks=books[0].children[0].children;
					if(bookmarks.length==0){
							div+='<div class="newlinks" type="links"  ><img class="newlinkico" src="img/false.png"/>'+chrome.i18n.getMessage("emp")+'</div>';
					}else{
						for (var i = m; i < bookmarks.length; i++) {
							
								if(typeof(bookmarks[i].url)=="undefined"){
									div+='<div bookindex="'+index+'" class="newbooks" type="books" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" >'+bookmarks[i].title+'</div>';
								}else{
									div+='<div bookindex="'+index+'" class="newlinks" type="links" bookurl="'+bookmarks[i].url+'" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" ><img class="newlinkico" src="'+Favicon_Api+bookmarks[i].url+'"/>'+bookmarks[i].title+'</div>';
								}
						};
					}
					div+='<div class="newclear" type="links" style="height:4px;"></div>';
					div+='</div>';
					$("body").append(div);
					
				})
			
		}
	})
	$(document).mouseover(function(e){
			if(e.target.id=="more"){
					if(_new_book==false){
						return false;
					}
					_lock=true;
					$(".newbook").remove();
					$(".newbook2").remove();
					_book_id="";
					var obj=e.target;
					var toleft=$(obj).offset().left;

					for(var m=0;m<$(".book").children().length;m++){
						var leftx=$($(".book").children()[m]).offset().left;
						if(toleft<leftx+152){
							var last=m;
							break;

						}
					}
					var index=$(obj).attr("bookindex");
						index=parseInt(index);
						index+=1;
					var div='<div bookindex="'+index+'" class="newbook" style="right:0px">';
					
						div+='<div class="newclear" type="links"></div>';
					chrome.bookmarks.getTree(function(books){
						var bookmarks=books[0].children[0].children;
						if(bookmarks.length==0){
								div+='<div class="newlinks" type="links"  ><img class="newlinkico" src="img/false.png"/>'+chrome.i18n.getMessage("emp")+'</div>';
						}else{
							for (var i =m; i < bookmarks.length; i++) {
								
									if(typeof(bookmarks[i].url)=="undefined"){
										div+='<div bookindex="'+index+'" class="newbooks" type="books" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" >'+bookmarks[i].title+'</div>';
									}else{
										div+='<div bookindex="'+index+'" class="newlinks" type="links" bookurl="'+bookmarks[i].url+'" bookid="'+bookmarks[i].id+'" parentId="'+bookmarks[i].parentId+'" ><img class="newlinkico" src="'+Favicon_Api+bookmarks[i].url+'"/>'+bookmarks[i].title+'</div>';
									}
							};
						}
						div+='<div class="newclear" type="links" style="height:4px;"></div>';
						div+='</div>';
						$("body").append(div);
						
					})
				
			}
		})
	$(document).mousedown(function(e){
		if(e.which==1||e.which==2){
			if(e.target.className=="newlinks"||e.target.className=="newlinkico"){
				if(e.target.className=="newlinkico"){
					var obj=e.target.parentNode;
				}else{
					var obj=e.target;
				}
				
				var url=$(obj).attr("bookurl");
				$(".newbook").remove();
				$(".newbook2").remove();
				if(e.which==1){
					if(url.indexOf("chrome://")==0){
						chrome.tabs.getCurrent(function(tab) {		
								var a=tab.index+1;
								chrome.tabs.create({"index":a,"url":url},function(){
									return false;
								})
							});
					}else{
						window.open(url,_openbookmark);
					}
					
				}
				if(e.which==2){
					if(url.indexOf("chrome://")==0){
						chrome.tabs.getCurrent(function(tab) {		
								var a=tab.index+1;
								chrome.tabs.create({"index":a,"url":url},function(){
									return false;
								})
							});
					}else{
						window.open(url,"_blank");
					}
					
				}
				_new_book=false;
				_lock=false;
				return false;
			}
		}
	})
	
	return false;
}