var Lamellenfenster =  [function () {
                var video = document.getElementById("video");
                var checkVideoLoaded = setInterval(checkVideo, 300);
				
				function checkVideo() {
					if(video.readyState == 4){
						clearInterval(checkVideoLoaded);
						setTimeout(function(){
							$('video').removeAttr('poster');
                  			$('.loader_video').removeClass('active');
						},500)
						
					}
				}

                setTimeout(function(){
                	$('video').attr('src', $('video').attr('src_'));
                },750);
            
}];