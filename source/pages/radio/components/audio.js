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
		template: '<audio id="audio" ng-src="{{audio.media | trusted}}" style="display:none;"></audio>',
		controller: function ($scope, $element, $attrs) {
			var audio = document.getElementById("audio");

			// 播放器相关的数据信息
			$rootScope.audio = {
				// 音频文件地址
				media: 'http://short-audio.ajmide.com/audio/201804/27/5ae2f4d203a781524823250',
				// false:未播放; true:已播放
				state: false
			};
		}
	};
});
