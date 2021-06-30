const SLOTS_PER_REEL = 36;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 450;
const MAX_IMAGE_SIZE=60;

const ssr_card_id=[1];
const sr_card_id=[];
const r_card_id = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createSlots (ring) {
  
  var slotAngle = 360 / SLOTS_PER_REEL;

  var seed = getSeed();
  //generate card array
  var image_array=[];
  for(var i=0;i<MAX_IMAGE_SIZE;i++){
      image_array[i] = (i+1);
  }

//  shuffleArray(image_array);

  for (var i = 0; i < SLOTS_PER_REEL; i ++) {
    var slot = document.createElement('div');
    
    slot.className = 'slot';

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
    image_path+=".png";
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
  return Math.floor(Math.random()*(SLOTS_PER_REEL))%12;
  //return 1;
}


function spin(timer) {
  //var txt = 'seeds: ';
  for(var i = 1; i < 6; i ++) {
    var oldSeed = -1;
    /*
    checking that the old seed from the previous iteration is not the same as the current iteration;
    if this happens then the reel will not spin at all
    */
    var oldClass = $('#ring'+i).attr('class');
    if(oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
      console.log(oldSeed);
    }
    var seed = getSeed();
    while(oldSeed == seed) {
      seed = getSeed();
    }

    $('#ring'+i)
      .css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
      .attr('class','ring spin-' + seed);
  }

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
$('#stage').toggleClass('perspective-on perspective-off');
