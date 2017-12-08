// 一些基础的dom处理判断抽调出来放在这儿
export function addClass(el,className) {
  if(hasClass(el,className)){
    return;
  }
  //el.className是设置或者返回元素的class属性
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(' ');
}
export function hasClass(el,className) {
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className)
}
//封装一个获取或者设置属性值的方法
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
