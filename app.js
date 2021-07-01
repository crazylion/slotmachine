const SLOTS_PER_REEL = 36;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 450;
const MAX_IMAGE_SIZE=60;

const ssr_card_id = ["ssr/tp1.png","ssr/tp2.png","ssr/tp3.png","ssr/tp4.png"];
const sr_card_id  = ["sr/60.png","sr/59.png","sr/58.png","sr/57.png","sr/50.png"];
const r_card_id   = ["r/49.png","r/14.png","r/28.png","r/29.png","r/01.png","r/15.png","r/17.png","r/16.png","r/06.png","r/12.png","r/13.png","r/07.png","r/39.png","r/11.png","r/05.png","r/04.png","r/38.png","r/35.png","r/21.png","r/09.png","r/08.png","r/20.png","r/34.png","r/22.png","r/36.png","r/37.png","r/23.png","r/27.png","r/32.png","r/26.png","r/30.png","r/24.png","r/25.png","r/31.png","r/19.png","r/56.png","r/43.png","r/55.png","r/54.png","r/51.png","r/53.png","r/46.png"];
const n_card_id   = ["n/48.png","n/03.png","n/02.png","n/10.png","n/33.png","n/18.png","n/42.png","n/41.png","n/40.png","n/44.png","n/45.png","n/47.png"];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getCard(type){
  if(type=="n"){
    return n_card_id[Math.floor(Math.random()*n_card_id.length)];
  }else if(type=="r"){
    return r_card_id[Math.floor(Math.random()*r_card_id.length)];
  }else if(type=="sr"){
    return sr_card_id[Math.floor(Math.random()*sr_card_id.length)];
  }else if( type=="ssr"){
    return ssr_card_id[Math.floor(Math.random()*ssr_card_id.length)];
  }
}

//
//
// 36個裡面配置 ssr 1:/sr: 2: r:5, n: 28 
function createSlots (ring) {
  
  var slotAngle = 360 / SLOTS_PER_REEL;

  var seed = getSeed();
  //generate card array
  var image_array=[];
  for(var i=0;i<28;i++){
    image_array[i]=getCard("n");
  }
  for(var i=28;i<33;i++){
    image_array[i]=getCard("r");
  }
  for(var i=33;i<35;i++){
    image_array[i]=getCard("sr");
  }
  for(var i=35;i<36;i++){
    image_array[i]=getCard("ssr");
  }

//  shuffleArray(image_array);

  for (var i = 0; i < SLOTS_PER_REEL; i ++) {
    var slot = document.createElement('div');
    
    slot.className = 'slot item_'+i;

    // compute and assign the transform for this slot
    var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    slot.style.transform = transform;

    var image_path="cards/";
    var image_id = image_array[i];
    if(image_id<10){
      image_path+=("0"+(image_id));
    }else{
      image_path+=(image_id);
    }
    slot.style.backgroundImage="url("+image_path+")";
    slot.style.backgroundSize="cover";

    // setup the number to show inside the slots
    // the position is randomized to 

    //var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');

    // add the poster to the row
    ring.append(slot);
  }
}

function getSeed() {
  // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
  //return Math.floor(Math.random()*(SLOTS_PER_REEL))%12;
  var arr = [0,1];
  return arr[Math.floor(Math.random()*arr.length)];
	
  return 12;
}


function spin(timer) {
  //var txt = 'seeds: ';
  for(var i = 1; i < 6; i ++) {
   $("#ring"+i+" .choosed").removeClass("choosed");
    var oldSeed = -1;
    /*
    checking that the old seed from the previous iteration is not the same as the current iteration;
    if this happens then the reel will not spin at all
    */
    var oldClass = $('#ring'+i).attr('class');
    if(oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    var seed = getSeed();
    while(oldSeed == seed) {
      seed = getSeed();
    }
      //抽出哪個會中，
      var index = Math.floor(Math.random()*(SLOTS_PER_REEL));
      switch(seed){
        case 0: 
            //交換位置

            var pic1= $("#ring"+i+" .item_11").css("background-image"); 
            var pic2 = $("#ring"+i+" .item_"+index).css("background-image");
            if(pic2.indexOf("ssr") !=-1){
                    if(Math.random() > 0.5){
                      $("#ring"+i+" .item_11").css("background-image",pic2);
                      $("#ring"+i+" .item_"+index).css("background-image",pic1);
                    }
            }else{
              $("#ring"+i+" .item_11").css("background-image",pic2);
              $("#ring"+i+" .item_"+index).css("background-image",pic1);

            }
        break;  //item11
        case 1:
            var pic1= $("#ring"+i+" .item_14").css("background-image"); 
            var pic2 = $("#ring"+i+" .item_"+index).css("background-image");
            if(pic2.indexOf("ssr") !=-1){
                    if(Math.random() > 0.5){
                      $("#ring"+i+" .item_11").css("background-image",pic2);
                      $("#ring"+i+" .item_"+index).css("background-image",pic1);
                    }
            }else{
                $("#ring"+i+" .item_14").css("background-image",pic2);
                $("#ring"+i+" .item_"+index).css("background-image",pic1);
            }

        break;  //item14
      }

    $('#ring'+i)
      .css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
      .attr('class','ring spin-' + seed);
      (function(_i,_seed){
        setTimeout(function(){
            if(_seed ==0){
              $("#ring"+_i+" .item_11").addClass("choosed");
            }else{
              $("#ring"+_i+" .item_14").addClass("choosed");

            }
        },5000);
      }
      )(i,seed);
  }

    setTimeout(function(){
    //搜尋是否抽中ssr 
    var is_ssr = false;
    $(".ring .choosed").each(function(){
            var pic= $(this).css("background-image"); 
            if(pic.indexOf("ssr")!=-1){
                is_ssr=true;
            }
          
    });
    if(is_ssr){

        document.getElementById("spin-result-ssr").play();
    }else{
        document.getElementById("spin-result").play();
    }


    $(".go").attr("disabled",false);

    },5000);
  console.log('=====');
}

$(document).ready(function() {

  // initiate slots 
  createSlots($('#ring1'));
  createSlots($('#ring2'));
  createSlots($('#ring3'));
  createSlots($('#ring4'));
  createSlots($('#ring5'));

  // hook start button
  $('.go').on('click',function(){
    var timer = 2;
    spin(timer);
    document.getElementById("audio-spin").play();
    $(this).attr("disabled",true);
  })

  // hook xray checkbox
  $('#xray').on('click',function(){
    //var isChecked = $('#xray:checked');
    var tilt = 'tiltout';
    
    if($(this).is(':checked')) {
      tilt = 'tiltin';
      $('.slot').addClass('backface-on');
      $('#rotate').css('animation',tilt + ' 2s 1');

      setTimeout(function(){
        $('#rotate').toggleClass('tilted');
      },2000);
    } else {
      tilt = 'tiltout';
      $('#rotate').css({'animation':tilt + ' 2s 1'});

      setTimeout(function(){
        $('#rotate').toggleClass('tilted');
        $('.slot').removeClass('backface-on');
      },1900);
    }
  })

  // hook perspective
  $('#perspective').on('click',function(){
    $('#stage').toggleClass('perspective-on perspective-off');
  })  
 });

//$('#stage').toggleClass('perspective-on perspective-off');
