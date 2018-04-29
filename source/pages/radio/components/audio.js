'use strict';
/**
 * 音频播放
 * @method viewAudio
 * @example
 *     <view-audio></view-audio>
 */
Fm.directive('viewAudio', function (
    $filter,
	$timeout,
	$rootScope
) {
	return {
		restrict: 'E',
		replace: true,
		template: '<audio id="audio" ng-src="{{dAudio.media | trusted}}" style="display:none;"></audio>',
		controller: function ($scope, $element, $attrs) {
			var $audio = document.getElementById("audio");

			// 播放器相关的数据信息
			$scope.dAudio = {
				// 音频文件地址
				media: '',
				// false:未播放; true:已播放
				state: false
			};

            angular.forEach(['loadeddata', 'pause', 'play', 'ended', 'timeupdate', 'error'], function (v, k) {
                $audio.addEventListener(v, function (res) {
                    $scope.$apply(function () {
                        $scope.setPlay.init(v, res);
                    });
                });
            });

            $scope.setPlay = {
                init: function (evt, res) {
                    switch (evt) {
                        case 'loadeddata':
                            this.toLoadedData(res);
                        break;
                        case 'pause':
                            this.toPause(res);
                        break;
                        case 'play':
                            this.toPlay(res);
                        break;
                        case 'ended':
                            this.toEnd(res);
                        break;
                        case 'timeupdate':
                            this.toTimeUpdate(res);
                        break;
                        case 'error':
                            this.toError(res);
                        break;
                    }
                },
                toLoadedData: function (res) {

                },
                toPause: function (res) {
                    $scope.dAudio.state = false;
                    $rootScope.setConfig.audio.state = false;
                    $rootScope.$emit('view:mediaAudioState', {
                        state: false
                    });
                },
                toPlay: function (res) {
                    $scope.dAudio.state = true;
                    $rootScope.setConfig.audio = {
                        state: true,
                        media: $scope.dAudio.media
                    };
                    $rootScope.$emit('view:mediaAudio', {
                        state: true
                    });
                },
                toEnd: function (res) {
                    $scope.dAudio.state = false;
                    $rootScope.setConfig.audio.state = false;
                },
                toTimeUpdate: function (res) {
                },
                toError: function (res) {
                }
            };

            $scope.$on('view:mediaAudioPlay', function (evt, res) {
                if (!$audio) return;
                if (!res.media) return;

                if ($scope.dAudio.media && res.media == $scope.dAudio.media) {
                    if ($scope.dAudio.state) {
                        $audio.pause();
                    } else {
                        $audio.play();
                    }
                } else {
                    $scope.dAudio.media = res.media;
                    $timeout(function () {
                        $audio.play();
                    }, 50);
                }
            });

		}
	};
});
