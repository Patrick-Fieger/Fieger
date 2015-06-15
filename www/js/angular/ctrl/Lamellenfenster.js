var Lamellenfenster =  ['$scope',function ($scope) {
	// var video = document.getElementById("video");
	// var checkVideoLoaded = setInterval(checkVideo, 300);
	
	// function checkVideo() {
	// 	if(video.readyState == 4){
	// 		clearInterval(checkVideoLoaded);
	// 		setTimeout(function(){
	// 			$('video').removeAttr('poster');
	//   			$('.loader_video').removeClass('active');
	// 		},500)
			
	// 	}
	// }
	// 
	
	$scope.custom = {
        video: 'msgk5GNxO98',
        player: null,
        vars: {
    		controls: 0,
    		autoplay: 1,
    		autohide:1,
    		showinfo:0,
    		modestbranding:1
		}
    };



	$scope.$on('youtube.player.ended', function ($event, player) {
    	player.playVideo();
    	setTimeout(function(){
    		player.pauseVideo();
    		$scope.replay = true
    	},100)
  	});

    var automessage;

  	$scope.$on('youtube.player.playing', function ($event, player) {
  		$scope.replay = false;
      
      function turnON() {
          automessage = setInterval(function(){
          if(player.getCurrentTime() <= 3.5 && player.getCurrentTime() >= 3.4){
            player.pauseVideo();
            $scope.replay = true;
            turnOff();
          }
        }, 10);
      }
  
      function turnOff() {
          clearInterval(automessage);
      }
  
      turnON();

  	});

  	$scope.$on('youtube.player.ready', function ($event, player) {
  		$scope.custom.player = player
  	});

  	$scope.playagain = function(){
      $scope.custom.player.seekTo(0);
  		$scope.custom.player.playVideo();
  	}
}];