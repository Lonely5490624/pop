function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds();

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function datefuc(format, timestamp, bol) {
	var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
	var ret;
	var pad = function(n, c) {
		if(bol) {
			if((n = n + "").length < c) {
				return new Array(++c - n.length).join("0") + n;
				console.log(new Array(++c - n.length).join("0") + n)
			} else {
				return n;
			}
		} else {
			return n;
		}
		/**/

	};
	var txt_weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	var txt_ordin = {
		1: "st",
		2: "nd",
		3: "rd",
		21: "st",
		22: "nd",
		23: "rd",
		31: "st"
	};
	var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var f = {
		d: function() {
			return pad(f.j(), 2)
		},
		D: function() {
			return f.l().substr(0, 3)
		},
		j: function() {
			return jsdate.getDate()
		},
		l: function() {
			return txt_weekdays[f.w()]
		},
		N: function() {
			return f.w() + 1
		},
		S: function() {
			return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
		},
		w: function() {
			return jsdate.getDay()
		},
		z: function() {
			return(jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
		},
		W: function() {
			var a = f.z(),
				b = 364 + f.L() - a;
			var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
			if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
				return 1;
			} else {
				if(a <= 2 && nd >= 4 && a >= (6 - nd)) {
					nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
					return date("W", Math.round(nd2.getTime() / 1000));
				} else {
					return(1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
				}
			}
		},
		F: function() {
			return txt_months[f.n()]
		},
		m: function() {
			return pad(f.n(), 2)
		},
		M: function() {
			return f.F().substr(0, 3)
		},
		n: function() {
			return jsdate.getMonth() + 1
		},
		t: function() {
			var n;
			if((n = jsdate.getMonth() + 1) == 2) {
				return 28 + f.L();
			} else {
				if(n & 1 && n < 8 || !(n & 1) && n > 7) {
					return 31;
				} else {
					return 30;
				}
			}
		},
		L: function() {
			var y = f.Y();
			return(!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
		},
		Y: function() {
			return jsdate.getFullYear()
		},
		y: function() {
			return(jsdate.getFullYear() + "").slice(2)
		},
		a: function() {
			return jsdate.getHours() > 11 ? "pm" : "am"
		},
		A: function() {
			return f.a().toUpperCase()
		},
		B: function() {
			var off = (jsdate.getTimezoneOffset() + 60) * 60;
			var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
			var beat = Math.floor(theSeconds / 86.4);
			if(beat > 1000) beat -= 1000;
			if(beat < 0) beat += 1000;
			if((String(beat)).length == 1) beat = "00" + beat;
			if((String(beat)).length == 2) beat = "0" + beat;
			return beat;
		},
		g: function() {
			return jsdate.getHours() % 12 || 12
		},
		G: function() {
			return jsdate.getHours()
		},
		h: function() {
			return pad(f.g(), 2)
		},
		H: function() {
			return pad(jsdate.getHours(), 2)
		},
		i: function() {
			return pad(jsdate.getMinutes(), 2)
		},
		s: function() {
			return pad(jsdate.getSeconds(), 2)
		},
		O: function() {
			var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
			if(jsdate.getTimezoneOffset() > 0) t = "-" + t;
			else t = "+" + t;
			return t;
		},
		P: function() {
			var O = f.O();
			return(O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		c: function() {
			return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
		},
		U: function() {
			return Math.round(jsdate.getTime() / 1000)
		}
	};

	return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {

		if(t != s) {
			// escaped  
			ret = s;
		} else if(f[s]) {
			// a date function exists  
			ret = f[s]();
		} else {
			// nothing special  
			ret = s;
		}
		return ret;

	});
};

function compare(start, end) {
	var time = 0
	if(start > end) {
		time = start - end;
	} else {
		time = end - start;
	}
	return Math.floor(time / 86400000)
}

function headway(num, type) {
	var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000,
		timestr;

	if(type) {
		timestr = timeStamp + 86400 * num;

	} else {
		timestr = timeStamp - 86400 * num;
	}
	return timestr;
}
let serverurl = 'http://dev.tangor.cn/api/';

function deleteEmptyProperty(object) {
	for(var i in object) {
		var value = object[i];
		if(typeof value === 'object') {
			console.log(Array.isArray(value))
			if(Array.isArray(value)) {
				if(value.length == 0) {
					delete object[i];
					continue;
				}
			} else {
				this.deleteEmptyProperty(value);
				if(this.isEmpty(value)) {
					delete object[i];
				}
			}

		} else {

			if(value === '' || value === null || value === undefined) {
				delete object[i];
			} else {}
		}
	}
}

function isEmpty(object) {
	for(var name in object) {
		return false;
	}
	return true;
}
/*获取当前页url*/
function getCurrentPageUrl() {
	var pages = getCurrentPages() //获取加载的页面
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var url = currentPage.route //当前页面url
	return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
	var pages = getCurrentPages() //获取加载的页面
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var url = currentPage.route //当前页面url
	var options = currentPage.options //如果要获取url中所带的参数可以查看options

	//拼接url的参数
	var urlWithArgs = url + '?'
	for(var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

	return urlWithArgs
}

function post(opt) {
	deleteEmptyProperty(opt.data)
	console.log(opt.url)
	console.log(opt.data)
	console.log(JSON.stringify(opt.data))
	var Authorization = wx.getStorageSync('access_token');
	wx.request({
		url: serverurl + opt.url,
		method: opt.method || "POST",
		data: opt.data,
		header: {
			"Accept": "application/json",
			"Authorization": Authorization
		},
		success: function(res) {
			console.log(res.data)
			if(res.statusCode == 401) {
				wx.navigateTo({
					url: '/pages/login/login'
				});
				return false;
			} else {
				if(res.data.code == 200) {
					if(opt.success) {
						opt.success(res.data.body);
					}
				} else if(res.data.code == 201002) {
					wx.navigateTo({
						url: '/pages/login/login'
					});
					return false;

				} else {
					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1000
					})
					console.log(res.data.message)
				}
			}

		},
		fail: function() {

		}

	})
}
module.exports = {
	formatTime: formatTime,
	datefuc: datefuc,
	compare: compare,
	headway: headway,
	post: post
}