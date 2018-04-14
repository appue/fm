'use strict';
Fm
/**
 * localStorage存储
 * @module services
 * @class $appueStorage
 */
.factory('$appueStorage', function () {
	var fetchItem = function (key) {
			if (!key) return null;

			var itemStr = localStorage.getItem('fm_'+ key),
				item;

			try {
				item = itemStr;
			} catch (e) {
				console.log('error');
			}

			if (!item) return null;

			return item;
		},
		oday = 24 * 60 * 60 * 1000;

	return {
		/**
		 * 设置本地存储的值
		 * @method push
		 * @param {[string]} key 本地存储的name
		 * @param {[string|object]} data 存储的对象
		 * @param {[number]} expires 过期时间(可选),以天为单位
		 * @example
		 *     $appueStorage.push();
		 */
		push: function (key, data, expires) {
			if (!key || !data) return;

			var item = JSON.parse(fetchItem(key)) || {};

			item.value = data || undefined;
			item.expired = expires ? (Date.now() + oday*expires) : undefined;

			var str = JSON.stringify(item);

			localStorage.setItem('fm_'+key, str);
		},

		/**
		 * 获取本地存储的值
		 * @method pull
		 * @param {[string]} key 本地存储的name
		 * @example
		 *     expried如果存在，则判断是否过期，不存在就是永久值
		 *     $appueStorage.pull();
		 */
		pull: function (key) {
			var item = JSON.parse(fetchItem(key)),
				data;

			if (!item || item.expired && item.expired <= Date.now()) {
				return null;
			} else {
				return item.value;
			}
		},

		/**
		 * 删除本地存储
		 * @method remove
		 * @param {[string]} key 本地存储的name
		 * @param {[string]} rep 值对象: {key: 1} 这里只接受value值为对象的情况
		 * @example
		 *     $appueStorage.remove('key', {name})
		 */
		remove: function (key, rep) {
			if (!key) return;

			var self = this,
				item = JSON.parse(fetchItem(key));

			if (item) {
				if (!rep) {
					localStorage.removeItem('fm_'+ key);
				} else {
					angular.forEach(rep, function (v, k) {
						if (item.value && item.value[k]) {
							item.value[k] = undefined;
							self.push(key, item.value);
						}
					});
				}
			}
		},

		/**
		 * 修改本地存储
		 * @method modify
		 * @param {[string]} key 本地存储的name
		 * @param {[object]} res 需要修改的属性对象: {key: 1} 这里只接受value为对象的情况
		 * @example
		 *     $appueStorage.modify();
		 */
		modify: function (key, res) {
			if (!key) return;

			var self = this,
				item = JSON.parse(fetchItem(key)),
				i;

			if (!item) {
				self.remove(key);
				return;
			}

			if (res) {
				angular.forEach(res, function (v, k) {
					if (item.value[k]) item.value[k] = v;
				});

				self.push(key, item.value);
			}
		}

	};
});
