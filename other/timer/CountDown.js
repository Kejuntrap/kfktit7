/*
 * written by KFCzahha
 *
 *
 *All rights reserved
 *
 *2015 8/31 version 1.0
 *2015 9/1  version 1.1
 *時間が経過してからの計算方法を修正
 *
 *2015 9/1 version 1.2
 *時間経過マイナス表示を修正
 *CSSでフォントサイズを拡張し、見易さ向上
 *
 *
 *
 *
 */

var diff;
var now_time;
var kiji_s;

var g_year;
var g_month;
var g_day;
var g_hour;
var g_minute;
var g_second;
var g_mills;
var time_temp;
var labelObj2;

var res_ms;
var res_sc;
var res_mn;
var res_hr;
var res_dy;

function CountDown()
{
	var calc_btn   =document.getElementById('calc_btn');			//計算ボタン

	var sp_year    =document.getElementById('sp_year');				//年　入力
	var sp_month   =document.getElementById('sp_month');			//月　入力
	var sp_day     =document.getElementById('sp_day');				//日　入力
	var sp_hour    =document.getElementById('sp_hour');				//時　入力
	var sp_minute  =document.getElementById('sp_minute');			//分　入力
	var sp_second  =document.getElementById('sp_second');			//秒　入力
	var sp_mills   =document.getElementById('sp_sills');			//ミリ秒　入力
	
}

function calc()
{
	g_year   =document.asset.year.value;
	g_month  =document.asset.month.value;
	g_day    =document.asset.day.value;
	g_hour   =document.asset.hour.value;
	g_minute =document.asset.minute.value;
	g_second =document.asset.second.value;
	g_mills  =document.asset.millisecond.value;

	var kijitsu= new Date(g_year,g_month-1,g_day,g_hour,g_minute,g_second,g_mills);
	kiji_s=kijitsu.getTime();
	var now_time=new Date();
	diff=kiji_s-now_time;

	var labelObj1 = document.getElementById( "label1" );
	labelObj1.innerHTML ="設定時刻："+ g_year+"年"+g_month+"月"+g_day+"日"+g_hour+"時"+g_minute+"分"+g_second+"秒"+g_mills+"ミリ秒";


	labelObj2 = document.getElementById( "label2" );

	now_get();

}

function renzoku()
{
	now_time=new Date();
	diff=kiji_s-now_time;

	time_temp = g_year+"年"+g_month+"月"+g_day+"日"+g_hour+"時"+g_minute+"分"+g_second+"秒"+g_mills+"ミリ秒";
	
	diff=kiji_s-now_time;
	ms_diff=Math.floor(diff);
	
	res_ms=Math.floor(diff%1000);				//ミリ秒
	res_sc=Math.floor((diff/1000))%60;			//秒
	res_mn=Math.floor((diff/60000))%60;			//分
	res_hr=Math.floor((diff/3600000))%24;		//時間
	res_dy=Math.floor(diff/86400000);			//日

	if(diff>=0)
	{
		labelObj2.innerHTML =""+ time_temp +"まで  "+res_dy+"日  "+res_hr+"時間  "+res_mn+"分 "+res_sc+"."+zeroPadding(res_ms,3)+"秒";
	}
	
	else if(diff<0)
	{
		diff=now_time-kiji_s;
		res_ms=Math.floor(diff%1000);				//ミリ秒
		res_sc=Math.floor((diff/1000))%60;			//秒
		res_mn=Math.floor((diff/60000))%60;			//分
		res_hr=Math.floor((diff/3600000))%24;		//時間
		res_dy=Math.floor(diff/86400000);			//日
		labelObj2.innerHTML =""+ time_temp +"から  "+res_dy+"日  "+res_hr+"時間  "+res_mn+"分  "+res_sc+"."+zeroPadding(res_ms,3)+"秒経過";
	}
}

function now_get()
{
	setInterval(renzoku, 42);
}

function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}

window.onload=CountDown;