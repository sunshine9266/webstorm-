export default function ajaxJSONP(url, callback){
	    // 创建script标签，设置其属性
	    var script = document.createElement('script');
	    script.setAttribute('src', url + '&callback=' + callback);
	    // 把script标签加入head，此时调用开始
	    document.getElementsByTagName('head')[0].appendChild(script);
    }