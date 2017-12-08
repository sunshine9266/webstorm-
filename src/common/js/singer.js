/**
 * Created by Administrator on 2017/10/22 0022.
 */
export default class Singer{
  //里面有一个constructor方法,这就是构造方法,而this关键字则代表实例对象。
  // 也就是说,ES5的构造函数Person,对应ES6的Person类的构造方法,定义方法,不需要加Function关键字,而且方法之间不能加逗号
  constructor({id,name}){
    this.id = id
    this.name = name
    //模版字符串，用`（反引号）标识，用${}将变量括起来,里面不仅仅可以放变量,还可以是表达式,甚至是函数,如果有回车,也会输出回车
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
  }
}
