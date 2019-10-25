const Meguro = [
   {
      "Name": "目黒",
      "Route": "目黒線",
      "Latitude": 35.633998,
      "Longitude": 139.715828
   },
   {
      "Name": "不動前",
      "Route": "目黒線",
      "Latitude": 35.625679,
      "Longitude": 139.713406
   },
   {
      "Name": "武蔵小山",
      "Route": "目黒線",
      "Latitude": 35.620507,
      "Longitude": 139.704413
   },
   {
      "Name": "西小山",
      "Route": "目黒線",
      "Latitude": 35.615685,
      "Longitude": 139.698866
   },
   {
      "Name": "洗足",
      "Route": "目黒線",
      "Latitude": 35.61043,
      "Longitude": 139.694367
   },
   {
      "Name": "大岡山",
      "Route": "目黒線",
      "Latitude": 35.607531,
      "Longitude": 139.685637
   },
   {
      "Name": "奥沢",
      "Route": "目黒線",
      "Latitude": 35.59689,
      "Longitude": 139.66732
   },
   {
      "Name": "田園調布",
      "Route": "目黒線",
      "Latitude": 35.603844,
      "Longitude": 139.6723
   },
   {
      "Name": "多摩川",
      "Route": "目黒線",
      "Latitude": 35.589766,
      "Longitude": 139.668835
   },
   {
      "Name": "新丸子",
      "Route": "目黒線",
      "Latitude": 35.580626,
      "Longitude": 139.661919
   },
   {
      "Name": "武蔵小杉",
      "Route": "目黒線",
      "Latitude": 35.575741,
      "Longitude": 139.659664
   },
   {
      "Name": "元住吉",
      "Route": "目黒線",
      "Latitude": 35.56432,
      "Longitude": 139.654046
   },
   {
      "Name": "日吉",
      "Route": "目黒線",
      "Latitude": 35.553064,
      "Longitude": 139.646783
   }
];

const maxdist = 30.0; //見える最大距離 km
const mount = 13;  //山の数
const radius = 6378.1; //km
const mltp = 2;
var lists = [];
const RAD = Math.PI / 180;	// 1°あたりのラジアン

var alpha = 0, beta = 0, gamma = 0;             // ジャイロの値を入れる変数を3個用意

var lati = -1;
var longi = -1;  //現在の緯度経度(deg)


var canvas, ctx;

window.addEventListener("deviceorientation", (dat) => {     //非同期処理。　コンパスの座標を取得
   alpha = dat.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
   beta = dat.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
   gamma = dat.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）


   text = alpha;

});


function main() {    //最初に呼ばれる処理
   navigator.geolocation.watchPosition(getinfo);
}

var getinfo = function getinfo(position) {      //定期的に位置情報をとってくる関数(非同期)

   lists = [];

   var geo_text = "緯度:" + position.coords.latitude;
   geo_text += " 経度:" + position.coords.longitude;
   geo_text += " 高度:" + position.coords.altitude;
   geo_text += " 位置精度:" + position.coords.accuracy;  //誤差　周囲hoge m みたいな感じ


   const now_lat = position.coords.latitude * Math.PI / 180.0;
   const now_lon = position.coords.longitude * Math.PI / 180.0;

   lati = position.coords.latitude;
   longi = position.coords.longitude;


   for (var i = 0; i < mount; i++) {
      const dif_lon = Math.abs(now_lon * 180.0 / Math.PI - Meguro[i].Longitude) * Math.PI / 180.0;
      var res = Math.acos(Math.sin(now_lat) * Math.sin(Meguro[i].Latitude * Math.PI / 180.0) + Math.cos(now_lat) * Math.cos(Meguro[i].Latitude * Math.PI / 180.0) * Math.cos(dif_lon));
      //console.log(radius * res +" "+ Meguro[i].name);
      if (res * radius < maxdist) {
         lists.push(
            JSON.parse("{ \"Name\": \"" + Meguro[i].Name + "\"," +
               "\"Latitude\": " + Meguro[i].Latitude + "," +
               "\"Longitude\": " + Meguro[i].Longitude + "," +
               "\"distance\": " + res * radius + "}")
         );
      }
   }
   //console.log(lists);

}


var k = 0;
var cnvs = function draw() {
   canvas = document.getElementById('sample');
   ctx = canvas.getContext('2d');
   canvas.width = 1080;
   canvas.height = 720;

   ctx.fillStyle = '#000000';
   ctx.strokeStyle = 'black';

   var diff = (alpha - Math.floor(alpha)) * Math.PI / 180;

   var sabun = Math.sin(diff) * 60 / canvas.width;
   var target = Math.ceil(alpha);
   var onedeg = Math.sin(Math.PI / 180) * canvas.width;
   ctx.font = "30px Arial";
   for (var i = -10; i <= 10; i += 2) {
      if (target % 2 == 0) {
         ctx.moveTo(-sabun + i * onedeg + canvas.width / 2, 600);
         ctx.lineTo(-sabun + i * onedeg + canvas.width / 2, 650);
         ctx.fillText((target + i + 360) % 360, -sabun + i * onedeg + canvas.width / 2 - 20, 680, 120);
      }
      else if (target % 2 == 1) {
         ctx.moveTo(-sabun + (i + 1) * onedeg + canvas.width / 2, 600);
         ctx.lineTo(-sabun + (i + 1) * onedeg + canvas.width / 2, 650);
         ctx.fillText((target + (i + 1) + 360) % 360, -sabun + (i + 1) * onedeg + canvas.width / 2 - 20, 680, 120);
      }
   }

   for (var i = 0; i < lists.length; i++) {
      var azim = azimuth(lati, longi, lists[i].latitude, lists[i].longitude);
      //console.log(azim, longi, lati);

      var position = (azim - alpha + 360 - Math.ceil(azim - alpha + 360, 360) * 360) * onedeg;
      ctx.moveTo(canvas.width / 2 + position, 250);
      ctx.lineTo(canvas.width / 2 + position, 500);
      ctx.font = 100 * Math.pow(Math.E, -2 * (lists[i].distance / maxdist)) + "px Arial";
      //console.log(100 * Math.pow(Math.E, -2 * (lists[i].distance / maxdist)));
      ctx.fillText(lists[i].name, canvas.width / 2 + position, 80, 1000);
      //ctx.fillText(lists[i].name, -sabun + i * onedeg, 10, 200);
      ctx.stroke();
      ctx.fill();
   }
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

setInterval(cnvs, 16);     //描写、60FPSにするようにする。　描写とその更新に必要な情報はいまいる位置と、目的地までの距離など　あとは、表示する路線など


// http://www4.airnet.ne.jp/hasikun/webtech/html5api/html5api_01.html