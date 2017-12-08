import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
export function getTuijian(){
	//此方法的作用就是通过jsonp获取网络上的图片轮播数据
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	//Object.assign用来合并成新对象的方法，可以有N个参数，但是第一个是目标对象，就是将来合并出来的哪个
	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:1005032220,
		needNewCode:1
	})
	return jsonp(url,data,options)
}

//获取歌单列表的函数
export function getDistList() {
  // const url = '/api/getDiscList'
  // const data = Object.assign({},commonParams,{
  //   platform:'yqq',
  //   sin:0,
  //   ein:29,
  //   sortId:5,
  //   needNewCode:0,
  //   categoryId:10000000,
  //   rnd:Math.random()
  // })
    // return axios.get(url,{
    //   params:data
    // }).then((res)=>{
    //   return Promise.resolve(res.data)
    // })      这是通过node方式的
  //上面的是Node的跨域代理,现在的是PHP通过跨域代理的方式解决的跨域
  const url = 'http://www.suming9266.top/music.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}
