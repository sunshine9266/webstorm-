import originJSONP from 'jsonp';

export default function jsonp(url,data,option){
	//因为这个jsonp的库不支持传递参数，而是让在url后面拼接，但是我们在使用是时候希望url比较纯净，
	//所以定义这个方法。下面是通过异步的方式调用这个jsonp插件。
	url+= (url.indexOf('?')<0?'?':'&')+param(data)
	//	resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
	//	，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，
	//	将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，
	//	并将异步操作报出的错误，作为参数传递出去。
	var promise = new Promise(function(resolve, reject) {	
		originJSONP(url,option,(err,data)=>{
		  if (!err){
		    resolve(data); //把后端返回数据返回出去
		  } else {
		    reject(err);
		  }	
		})
	});
	return promise;
}

function param(data){
	let url = ''
	for(var k in data){
		let value = data[k] != undefined ? data[k] : ''
		url+= `&${k}=${encodeURIComponent(value)}`
	}
//	如果 url存在则把第一个&截取掉,或者没有url返回的就是''
	return url ? url.substr(1): ''
}
