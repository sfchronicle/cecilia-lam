require("./lib/social");
var balanceText = require("./lib/balance-text");
var WaveSurfer = require("./lib/wavesurfer");
require("./lib/popcorn");

$(document).ready(function(){
	var popcorn = Popcorn("#audiotrack");

	//generate popcorn code
	$('.show').each(function(i){
		var start = $(this).attr('data-start');
		var end = $(this).attr('data-end');

		popcorn.code({
			start: start,
			end: end,
			onStart: function(options) {
				beginLine(i);
			},
			onEnd: function(options) {
				endLine();
			}
		});
	});
});


function beginLine(num) {
	var $currentLine = $('.show:eq(' + num + ')');
	$currentLine.addClass('speaking');

}

function endLine() {
	var audio = document.getElementsByTagName('audio');
	$('.show').removeClass('speaking');
}

function cueAudio() {
	var audio = document.getElementsByTagName('audio');
	audio[0].pause();

	$('.show').removeClass('speaking');
	var $firstLine = $('.show:first');
	var cueTime = $firstLine.attr('data-start');

	$firstLine.addClass('speaking');

	audio[0].currentTime = cueTime;
}


var audio = document.getElementById('audiotrack');
var title = document.getElementById('title');
var article = document.getElementById('article');


$(document).ready(function(){
	var wavesurfer = WaveSurfer.create({
	  container: '#waveform',
	  waveColor: '#222222',
	  cursorWidth: 0,
	  interact: false,
	  barWidth:0,
	  barHeight:100,
	  normalize:true,
	  height:100,
	  progressColor: '#b38600'
	});
	wavesurfer.load('./assets/audio/intro-call.mp3');
	audio.play();
	wavesurfer.on('ready', function () {
	  wavesurfer.play();
	  wavesurfer.setMute();
	  document.getElementById('restart').addEventListener('click', function(){
	  	wavesurfer.stop();
	  	wavesurfer.play();
	  });	
	});
});

document.getElementById('mute').addEventListener('click', function(){
  audio.muted = !audio.muted;
  this.classList.toggle('unmute');
  this.classList.toggle('mute');
});

document.getElementById('restart').addEventListener('click', function(){
	audio.pause();
 	audio.currentTime = 0;
  audio.play();
  title.classList.remove('active');
});

audio.addEventListener('ended', function(){
  setTimeout(function() { 
  	console.log(title);
		title.classList.add('active'); }, 1000);
});

$('.skip').on('click', function() {
	console.log(audio.muted);
	if(!audio.muted){
		audio.muted = true;
		document.getElementById('mute').classList.remove('unmute');
		document.getElementById('mute').classList.add('mute')
	}
  $('html, body').stop().animate({
      scrollTop: $('#article').offset().top
  }, 500);
});

balanceText();

$(window).scroll(function() {
  var y = $(document).scrollTop();
  var t = $('#nav-stick').parent().offset().top;
  if (y > t) {
    $('#nav').addClass('sticky');
  } else {
    $('#nav').removeClass('sticky');
  }
});