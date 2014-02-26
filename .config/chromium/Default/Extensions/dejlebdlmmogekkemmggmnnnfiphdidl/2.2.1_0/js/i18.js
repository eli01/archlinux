$(document).ready(function(){
	setlang();
	if(localStorage.usehistory=="0"){
		_thenum=3;
		$("#category1").css({"width":"0px","height":"0px"});
		$("#category1").text("");

	}
})
function getI18nMsg (msgname) {
	try {
		return chrome.i18n.getMessage(msgname);
	} catch(err) {
		return msgname;
	}			
};
function setlang(){
	var n=$('[data-i18n-content]').length;
	for (var i = 0; i < n; i++) {
		var a=$('[data-i18n-content]')[i].getAttribute("data-i18n-content");
		var b=getI18nMsg (a);
		var obj=$('[data-i18n-content]')[i];
		if(obj.className=="input"||obj.className=="input empty"){
			$(obj).val(b);
		}
		if(obj.className=="baidu_sites"){
			$(obj).attr("href",b);
		}else{
			$(obj).text(b);
		}
		
	};
	
}