// components/date/date.js
var util = require('../../utils/util.js');
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		indate: {
			type: String,
			value: ""
		},
		outdate: String,
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		hasEmptyGrid: false,
		cur_year: '',
		cur_month: '',
		clicknum: 0,
		nowY: parseInt(util.datefuc('Y', new Date().getTime() / 1000)),
		nowM: parseInt(util.datefuc('m', new Date().getTime() / 1000)),
		nowD: parseInt(util.datefuc('d', new Date().getTime() / 1000)),
		/*starttime: new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()).getTime(),
		start: {
			daystr: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
			time: new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()).getTime(),
		},
		end: {
			daystr: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1),
		},
		endtime: new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1)).getTime(),*/
		chosemonth: "",
		pre_year: "",
		pre_month: "",
		next_year: "",
		next_month: "",
		indate: "",
		outdate: "",
	},

	/**
	 * 组件的方法列表
	 */
	ready: function() {
		var that = this;
		that.dataInit();
		this.setNowDate();
	},
	methods: {
		dataInit() {
			let active = this.properties.indate;
			this.setData({
				indate: this.properties.indate,
				outdate: this.properties.outdate
			})

		},
		setNowDate: function(e) {
			const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
			let indate = this.data.indate,
				outdate = this.data.outdate,
				starttime, start, endtime, end,cur_year,cur_month,todayIndex;
				
			if(indate) {
				cur_year = parseInt(util.datefuc('Y', new Date(indate).getTime() / 1000)),
				cur_month = parseInt(util.datefuc('m', new Date(indate).getTime() / 1000)),
				todayIndex = parseInt(util.datefuc('d', new Date(indate).getTime() / 1000));
				starttime = new Date(util.datefuc('Y-m-d', new Date(indate).getTime() / 1000)).getTime();
				start = {
					daystr: util.datefuc('Y-m-d', new Date(indate).getTime() / 1000),
					time: starttime,

				}
				endtime = new Date(util.datefuc('Y-m-d', new Date(outdate).getTime() / 1000)).getTime();
				end = {
					daystr: util.datefuc('Y-m-d', new Date(outdate).getTime() / 1000),
					time: endtime,

				}
			} else {
				cur_year = parseInt(util.datefuc('Y', new Date().getTime() / 1000)),
				cur_month = parseInt(util.datefuc('m', new Date().getTime() / 1000)),
				todayIndex = parseInt(util.datefuc('d', new Date().getTime() / 1000));
				starttime = new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()).getTime();
				start = {
					daystr: util.datefuc('Y-m-d', new Date().getTime() / 1000),
					time: new Date(util.datefuc('Y-m-d', new Date().getTime() / 1000)).getTime(),
				};
				end = {
					daystr: util.datefuc('Y-m-d', (new Date().getTime() + 86400000) / 1000),
				};
				endtime = new Date(end.daystr).getTime();

			}
			this.setData({
				starttime: starttime,
				start: start,
				endtime: endtime,
				end: end
			});
			console.log(this.data)
			let pre_month, next_month, pre_year, next_year;
			if(cur_month == 1) {
				pre_month = 12;
				next_month = cur_month + 1;
				pre_year = cur_year - 1;
				next_year = cur_year;
			} else if(cur_month == 12) {
				pre_month = cur_month - 1;
				next_month = 1;
				pre_year = cur_year;
				next_year = cur_year + 1;
			} else {
				pre_month = cur_month - 1;
				next_month = cur_month + 1;
				pre_year = cur_year;
				next_year = cur_year;
			}
			this.setData({
				cur_year: cur_year,
				cur_month: cur_month,
				weeks_ch,
				todayIndex,
				pre_year: pre_year,
				pre_month: pre_month,
				next_year: next_year,
				next_month: next_month,
			});
			this.calculateEmptyGrids(cur_year, cur_month);
			this.calculateDays(cur_year, cur_month);
		},
		dateSelectAction: function(e) {
			let obj = e.currentTarget.dataset.obj,
				clicknum = this.data.clicknum + 1;
			if(obj.status == 0) {
				return false;
			} else if(obj.status == 3) {
				return false;
			}
			if(clicknum > 1) {
				clicknum = 0;
				this.setData({
					starttime: obj.time,
					start: obj,
					endtime: "",
					end: {}

				});
			} else {
				if(obj.time == this.data.start.time) {
					return false;
				}
				this.setData({
					endtime: obj.time,
					end: obj,
				});
			}
			this.setData({
				clicknum: clicknum,
			});

			let start = this.data.start;
			let end = this.data.end;
			if(start.time > end.time) {
				this.setData({
					starttime: end.time,
					start: end,
					endtime: start.time,
					end: start,
				});
			} else {}
			this.calculateDays(this.data.cur_year, this.data.cur_month);
			this.calculateEmptyGrids(this.data.cur_year, this.data.cur_month);

		},
		_close: function(e) {
			this.triggerEvent('myevent', {
				fuc: "close",
				opendate: 0,
				start: this.data.start.daystr,
				end: this.data.end.daystr
			})
		},

		getThisMonthDays(year, month) {
			return new Date(year, month, 0).getDate();
		},
		getFirstDayOfWeek(year, month) {
			return new Date(Date.UTC(year, month - 1, 1)).getDay();
		},
		calculateEmptyGrids(year, month) {
			let that = this.data;
			const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
			const monthdays = this.getThisMonthDays(year, month);
			const premonthdays = this.getThisMonthDays(year, month - 1);
			const max = Math.ceil((firstDayOfWeek + monthdays) / 7) * 7;
			let empytGrids = [],
				nextDays = [];
			for(let i = 1; i <= max - (monthdays + firstDayOfWeek); i++) {
				let startus, nowTime = new Date(that.nowY + "-" + that.nowM + "-" + that.nowD).getTime(),
					fortime = new Date(that.next_year + "-" + that.next_month + "-" + i).getTime();
				if(fortime < nowTime) {
					startus = 0;
				} else {
					startus = 1;
				}
				if(fortime == that.starttime || fortime == that.endtime) {
					startus = 3;
				}
				if(fortime > that.starttime && fortime < that.endtime) {
					startus = 2;
				}
				nextDays.push({
					str: i,
					time: fortime,
					daystr: that.next_year + "-" + that.next_month + "-" + i,
					status: startus, //0不可选，1可选，2选中，3开始结束
				});
			}
			if(firstDayOfWeek > 0) {
				for(let i = 0; i < firstDayOfWeek; i++) {
					let val = premonthdays - i;
					let startus, nowTime = new Date(that.nowY + "-" + that.nowM + "-" + that.nowD).getTime(),
						fortime = new Date(that.pre_year + "-" + that.pre_month + "-" + val).getTime();
					if(fortime < nowTime) {
						startus = 0;
					} else {
						startus = 1;
					}
					if(fortime == that.starttime || fortime == that.endtime) {
						startus = 3;
					}
					if(fortime > that.starttime && fortime < that.endtime) {
						startus = 2;
					}
					empytGrids.push({
						str: val,
						time: fortime,
						daystr: that.pre_year + "-" + that.pre_month + "-" + val,
						status: startus, //0不可选，1可选，2选中，3开始结束
					});
				}
				var _emp = empytGrids.reverse();
				this.setData({
					hasEmptyGrid: true,
					empytGrids: _emp,
					nextDays
				});
			} else {
				this.setData({
					hasEmptyGrid: false,
					empytGrids: [],
					nextDays
				});
			}
		},
		calculateDays(year, month) {
			let days = [];
			const thisMonthDays = this.getThisMonthDays(year, month);
			const nowDay = this.data.nowD;
			const nowYear = this.data.nowY;
			const nowMonth = this.data.nowM;
			const starttime = this.data.starttime;
			const endtime = this.data.endtime;
			for(let i = 1; i <= thisMonthDays; i++) {
				let startus, nowTime = new Date(nowYear + "-" + nowMonth + "-" + nowDay).getTime(),
					fortime = new Date(year + "-" + month + "-" + i).getTime();
				if(fortime < nowTime) {
					startus = 0;
				} else {
					startus = 1;
				}
				if(fortime == starttime || fortime == endtime) {
					startus = 3;
				}
				if(fortime > starttime && fortime < endtime) {
					startus = 2;
				}
				days.push({
					str: i,
					time: fortime,
					daystr: year + "-" + month + "-" + i,
					status: startus, //0不可选，1可选，2选中，3开始结束
				});
			}

			this.setData({
				days
			});
		},
		handleCalendar(e) {
			const handle = e.currentTarget.dataset.handle;
			const cur_year = this.data.cur_year;
			const cur_month = this.data.cur_month;
			let next_year = this.data.next_year,
				next_month = this.data.next_month,
				pre_year = this.data.pre_year,
				pre_month = this.data.pre_month;
			if(handle === 'prev') {
				let newMonth = cur_month - 1;
				let newYear = cur_year;
				if(newMonth < 1) {
					newYear = cur_year - 1;
					newMonth = 12;
					next_year = cur_year;
					next_month = 1;
					pre_year = newYear;
					pre_month = newMonth - 1;
				} else if(newMonth == 1) {
					next_year = newYear;
					next_month = newMonth + 1;
					pre_year = newYear - 1;
					pre_month = 12;
				} else {
					next_year = newYear;
					next_month = newMonth + 1;
					pre_year = newYear;
					pre_month = newMonth - 1;
				}
				this.setData({
					cur_year: newYear,
					cur_month: newMonth,
					next_year: next_year,
					next_month: next_month,
					pre_year: pre_year,
					pre_month: pre_month,
				})
				this.calculateDays(newYear, newMonth);
				this.calculateEmptyGrids(newYear, newMonth);

			} else {
				let newMonth = cur_month + 1;
				let newYear = cur_year;

				if(newMonth > 12) {
					newYear = cur_year + 1;
					newMonth = 1;
					pre_year = newYear;
					pre_month = 12;
					next_year = newYear;
					next_month = newMonth + 1;
				} else if(newMonth == 12) {
					pre_year = newYear;
					pre_month = newMonth - 1;
					next_year = cur_year + 1;
					next_month = 1;
				} else {
					pre_year = newYear;
					pre_month = newMonth - 1;
					next_year = newYear;
					next_month = newMonth + 1;
				}
				this.setData({
					cur_year: newYear,
					cur_month: newMonth,
					next_year: next_year,
					next_month: next_month,
					pre_year: pre_year,
					pre_month: pre_month,
				})
				this.calculateDays(newYear, newMonth);
				this.calculateEmptyGrids(newYear, newMonth);

			}

		}
	},

})