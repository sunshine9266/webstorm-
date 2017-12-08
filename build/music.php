<?php
header('Access-Control-Allow-Origin:*');
$ch = curl_init(); //初始化
//设置属性值
curl_setopt ($ch, CURLOPT_URL, "http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?rnd=0.9848369106793313&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=29");

curl_setopt ($ch, CURLOPT_REFERER, "https://y.qq.com/portal/playlist.html");

curl_exec ($ch);

curl_close ($ch);

?>
