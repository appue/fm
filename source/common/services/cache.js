'use strict';
Fm
/**
 * 数据缓存
 * @module services
 * @class $appueCache
 */
.factory('$appueCache', function (
	$cacheFactory
) {
	var myCache = $cacheFactory('cachePool');

	return {
		/**
		 * 获取缓存数据
		 * @method get
		 * @param {[string]} key 缓存对象中的值名称
		 * @example
		 * 	   $appueCache.get();
		 */
		get: function (key) {
			if (!key) return;

			var result = myCache.get('fm_'+ key) || false;

			return result;
		},

		/**
		 * 写入缓存池
		 * @method put
		 * @param {[string]} key 缓存对象中的值名称
		 * @param {[all]} value 所有类型，缓存对象中的值
		 * @example
		 *     $appueCache.put();
		 */
		put: function (key, value) {
			if (!angular.isString(key)) return;

			var result = myCache.put('fm_'+ key, value) || false;

			return result;
		},

		/**
		 * 移除缓存
		 * @method remove
		 * @param {[string]} key 缓存对象中的值的名称,key存在删除改缓存，不存在删除所有缓存
		 * @example
		 *     $appueCache.remove();
		 */
		remove: function (key) {
			if (!angular.isString(key)) return;

			if (key) {
				myCache.remove('fm_'+ key);
			} else {
				myCache.removeAll();
			}
		}
	};
});
