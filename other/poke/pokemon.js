var getheight;
var getweight;
var getbmi;
var data=[];    //読み込んだCSVデータが1行づつ　data[i]でi行目のデータ
var bmis=[];    //CSVデータのBMIの値　i匹目のポケモンのBMIをbmis[i]で取得する感じ
var bang=0;
var names=[];   //ポケモンのデータ
var lines;
var moto="";

function init(){
    var calc = document.getElementById('calc');
    var hegt = document.getElementById('height');
    var wegt = document.getElementById('weight');

}

function Calc(){
    getheight=document.asset.height.value;
    getweight=document.asset.weight.value;
    labelobj=document.getElementById('result');

    if(getheight>0){
        if(getweight>0){
            getbmi=getweight/(getheight*getheight);
            bang=0;
            for(var i=0; i<lines.length-1; i++){
                if(getbmi>=bmis[i]){
                    bang+=1;
                }
                else{
                    break;
                }
            }
            labelobj.innerHTML="あなたのBMIは  "+getbmi.toFixed(3) +"<br /> 体型ポケモンは "+names[bang]+" です。<br />("+names[bang]+"のBMIは"+parseFloat(bmis[bang]).toFixed(3)+")";
            moto="体型ポケモンは"+names[bang]+"でした！ #体型ポケモン";
        }
    }
}

// CSV読み込みエンジン
function loadCSV(targetFile){  // https://joyplot.com/documents/2017/03/01/xmlhttprequest-javascript-csv/
    //alert('うんこ');
    var request = new XMLHttpRequest();
    request.open("get", targetFile, false);
    request.send(null);
    
    var csvdata=request.responseText;
    
    lines=csvdata.split("\n");
    
    for(var i =0; i<lines.length; i++){
        data.push(lines[i]);
        var li=lines[i].split(",");
        bmis[i]=li[5]
        names[i]=li[2]
    }
}

loadCSV("POKEMON.csv");
window.onload=init;