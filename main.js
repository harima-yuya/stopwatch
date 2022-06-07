$(document).ready(function(){

/*===================================================
ボタンをクリックした時の活性化、非活性化
====================================================*/

    $(".start").click(function() {
        $(".start").prop("disabled","false"); 
        $(".reset").prop("disabled","false"); 
      });/*startボタンクリックで非活性化*/
    $(".stop").click(function() {
        $(".start").removeAttr("disabled");
        $(".reset").removeAttr("disabled"); 
      });/*stopボタンクリックでstartボタンを活性化*/
    $(".reset").click(function() {
        $(".start").removeAttr("disabled"); 
      });/*resetボタンクリックでstartボタンを活性化*/

/*===================================================
表示の変化
====================================================*/
   /*t(ミリ秒表記の時間)を00 : 00 : 00 ; 000に直す関数*/

    function changeTime(t) {
    /* h時間m分s秒ms＝(60×60×1000)h＋(60×1000)m+1000m+ms より計算*/
        let hour =parseInt(t/3600000,10);
        let min=parseInt(t/60000,10)-hour*60;
        let sec=parseInt(t/1000,10)-min*60-3600*hour;
        let ms = ("000"+t).slice(-3);

    /*先頭に0をつけて2桁にする関数 */ 
        function tSlice(x){
             return ("00"+`${x}`).slice(-2);
        };
        return tSlice(hour)+" : "+ tSlice(min)+" : "+tSlice(sec)+" ; "+ms
    };

/*現在の日時とtの差を計算して、function changeTime(t)を用いてh時間m分s秒msに直す
計算値をmoniterに表示*/ 

/*00 : 00 : 00 ; 000表記をミリ秒に直す*/
    function msTime(t){
        return Number(t.slice(0,2)*3600000)+Number(t.slice(5,7)*60000)+Number(t.slice(10,12)*1000)+Number(t.slice(15,18))
    }


/*startを押した時間と現在の時間の差から経過時間をmoniterに表示し続ける。*/
    let runTime=0;/*rentimeは停止した時の表示時間*/

    $(".start").click(function(){
        const startTime=new Date();
        const start=setInterval(()=>{
            let nowTime=new Date();
            let difTime= nowTime-startTime;
            $(".moniter").html(changeTime(difTime+runTime))
        },10);
     /*stopを押したら停止。停止した時の表示値をruntimeとして記録*/
        $(".stop").click(function(){
            let passTime=$(".moniter").text();
            runTime=msTime(passTime);
            console.log(runTime);
            clearInterval(start);
        })
     /*resetを押したら表示を0に*/
        $(".reset").click(function(){
            $(".moniter").html("00 : 00 : 00 ; 000")
            runTime=0
        })
    
    })
    
});