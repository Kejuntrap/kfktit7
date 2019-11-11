const RAD = Math.PI / 180;	// 1°あたりのラジアン

var alpha = 0, beta = 0, gamma = 0;             // ジャイロの値を入れる変数を3個用意

var lati = -1;
var longi = -1;  //現在の緯度経度(deg)


window.addEventListener("deviceorientation", (dat) => {     //非同期処理。　コンパスの座標を取得
   alpha = dat.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
   beta = dat.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
   gamma = dat.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）

   text = alpha;

}), true;


function main() {    //最初に呼ばれる処理
   navigator.geolocation.watchPosition(getinfo);
}



var getinfo = function getinfo(position) {      //定期的に位置情報をとってくる関数(非同期)

   var geo_text = "緯度:" + position.coords.latitude;
   geo_text += " 経度:" + position.coords.longitude;
   geo_text += "角度" + alpha;


   const now_lat = position.coords.latitude * Math.PI / 180.0;
   const now_lon = position.coords.longitude * Math.PI / 180.0;

   lati = position.coords.latitude;
   longi = position.coords.longitude;
   var cont = document.getElementById("content");
   cont.innerHTML = geo_text;
}


// 2点間の方位角を求める関数
function azimuth(lat1, lon1, lat2, lon2) {
   // 度をラジアンに変換
   lat1 *= RAD;
   lon1 *= RAD;
   lat2 *= RAD;
   lon2 *= RAD;

   var lat_c = (lat1 + lat2) / 2;					// 緯度の中心値
   var dx = radius * 1000 * (lon2 - lon1) * Math.cos(lat_c);
   var dy = radius * 1000 * (lat2 - lat1);

   if (dx == 0 && dy == 0) {
      return 0;	// dx, dyともに0のときは強制的に0とする。
   }
   else {
      return Math.atan2(dy, dx) / RAD;	// 結果は度単位で返す
   }
}

//https://www.logical-arts.jp/wp-content/uploads/distance_and_azimuth.js


window.onload = function () {
   main();
};

//setInterval(cnvs, 16);     //描写、60FPSにするようにする。　描写とその更新に必要な情報はいまいる位置と、目的地までの距離など　あとは、表示する路線など


// http://www4.airnet.ne.jp/hasikun/webtech/html5api/html5api_01.html