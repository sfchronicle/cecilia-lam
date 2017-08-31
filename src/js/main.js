require("./lib/social");
require("./lib/popcorn");

$(document).ready(function(){
	var popcorn = Popcorn("#audiotrack");

	//generate popcorn code
	$('#audio-text p').each(function(i){
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
	audioPlay();
});


		function beginLine(num) {
			var $currentLine = $('#audio-text p:eq(' + num + ')');
			$currentLine.addClass('speaking');

		}

		function endLine() {
			var audio = document.getElementsByTagName('audio');
			$('#audio-text p').removeClass('speaking');
		}

		function cueAudio() {
			var audio = document.getElementsByTagName('audio');
			audio[0].pause();

			$('#audio-text p').removeClass('speaking');
			var $firstLine = $('#audio-text p:first');
			var cueTime = $firstLine.attr('data-start');

			$firstLine.addClass('speaking');

			audio[0].currentTime = cueTime;
		}

		
		var audio = document.getElementById('audiotrack');
		var title = document.getElementById('title');
		var article = document.getElementById('article');

		function audioPlay(){
			var audio = document.getElementById('audiotrack');
			console.log(audio);
			
			var wavesurfer = WaveSurfer.create({
			  container: '#waveform',
			  waveColor: '#222222',
			  cursorWidth: 0,
			  normalize:true,
			  interact: false,
			  barWidth:1,
			  height:100,
			  progressColor: '#b38600'
			});
			wavesurfer.load('./assets/audio/intro-call.mp3');
			audio.play();
			wavesurfer.on('ready', function () {
		    wavesurfer.play();
			});
		}

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
      $('html, body').stop().animate({
          scrollTop: $('#article').offset().top-60
      }, 500);
		});

	



