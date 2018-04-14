'use strict';

const $q = require("q");
const fs = require('fs');

module.exports = {
	getType (callback) {
		const self = this;
		const dir = process.cwd() +'/source/pages';

        self.getProject(dir).then(arr => {
            arr.forEach((v, k) => {
            	callback({path: v});
            });
        });
	},

	getProject (dir, exclude) {
		return new Promise((resolve, reject) => {
		    let arr = [];

			fs.readdir(dir, (err, files) => {
		        if (err) {
		            reject(err);
		            return;
		        }

		        files.forEach((filename) => {
		            let stats = fs.lstatSync(dir +'/'+ filename);

		            if (stats.isDirectory() && !/\./.test(filename)) {
		                if (exclude && exclude.length > 0) {
		                    let buff = false;

		                    exclude.forEach((v) => {
		                        if (v == filename) buff = true;
		                    });

		                    if (!buff) arr.push(filename);

		                } else {
		                    arr.push(filename);
		                }
		            }
		        });

		        resolve(arr);
		    });
		});
	}
};
