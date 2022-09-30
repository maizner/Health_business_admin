/**
 * @version: 2.1.30
 * @author: Dan Grossman http://www.dangrossman.info/
 * @copyright: Copyright (c) 2012-2017 Dan Grossman. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://www.daterangepicker.com/
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment', 'jquery'], function(moment, jquery) {
            if (!jquery.fn) jquery.fn = {};
            return factory(moment, jquery);
        });
    } else if (typeof module === 'object' && module.exports) {
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
        module.exports = factory(moment, jQuery);
    } else {
        root.daterangepicker = factory(root.moment, root.jQuery);
    }
}(this, function(moment, $) {
    var DateRangePicker = function(element, options, cb) {
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.showCustomRangeLabel = true;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};
        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';
        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';
        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn sm_btn default_btn_1 left-auto order_2';
        this.cancelClass = 'btn sm_btn default_btn_2 right-auto order_1';
        this.locale = {
            direction: 'ltr',
            format: moment.localeData().longDateFormat('L'),
            separator: ' - ',
            applyLabel: '<span class="icon icon-checkupload"></span>',
            cancelLabel: '<span class="icon icon-close"></span>',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };
        this.callback = function() {};
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};
        if (typeof options !== 'object' || options === null)
            options = {};
        options = $.extend(this.element.data(), options);
        if (typeof options.template !== 'string' && !(options.template instanceof $))
            options.template = '<div class="daterangepicker daterangecalendar-design dropdown-menu">' + '<div class="calendar left">' + '<div class="daterangepicker_input">' + '<input class="input-mini form-control" type="text" name="daterangepicker_start" value="" />' + '<i class="icon-calendar internal-calendar-icon"></i>' + '<div class="calendar-time">' + '<div></div>' + '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' + '</div>' + '</div>' + '<div class="calendar-table"></div>' + '</div>' + '<div class="calendar right">' + '<div class="daterangepicker_input">' + '<input class="input-mini form-control" type="text" name="daterangepicker_end" value="" />' + '<i class="icon-calendar internal-calendar-icon"></i>' + '<div class="calendar-time">' + '<div></div>' + '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' + '</div>' + '</div>' + '<div class="calendar-table"></div>' + '</div>' + '<div class="ranges">' + '<div class="range_inputs">' + '<button class="applyBtn" disabled="disabled" type="button"></button> ' + '<button class="cancelBtn" type="button"></button>' + '</div>' + '</div>' + '</div>';
        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);
        if (typeof options.locale === 'object') {
            if (typeof options.locale.direction === 'string')
                this.locale.direction = options.locale.direction;
            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;
            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;
            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
            if (typeof options.locale.monthNames === 'object')
                this.locale.monthNames = options.locale.monthNames.slice();
            if (typeof options.locale.firstDay === 'number')
                this.locale.firstDay = options.locale.firstDay;
            if (typeof options.locale.applyLabel === 'string')
                this.locale.applyLabel = options.locale.applyLabel;
            if (typeof options.locale.cancelLabel === 'string')
                this.locale.cancelLabel = options.locale.cancelLabel;
            if (typeof options.locale.weekLabel === 'string')
                this.locale.weekLabel = options.locale.weekLabel;
            if (typeof options.locale.customRangeLabel === 'string') {
                var elem = document.createElement('textarea');
                elem.innerHTML = options.locale.customRangeLabel;
                var rangeHtml = elem.value;
                this.locale.customRangeLabel = rangeHtml;
            }
        }
        this.container.addClass(this.locale.direction);
        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);
        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);
        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);
        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);
        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);
        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);
        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);
        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();
        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;
        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;
        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;
        if (typeof options.opens === 'string')
            this.opens = options.opens;
        if (typeof options.drops === 'string')
            this.drops = options.drops;
        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;
        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;
        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;
        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');
        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;
        if (typeof options.showCustomRangeLabel === 'boolean')
            this.showCustomRangeLabel = options.showCustomRangeLabel;
        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }
        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;
        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;
        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;
        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;
        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;
        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;
        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;
        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;
        if (typeof options.isCustomDate === 'function')
            this.isCustomDate = options.isCustomDate;
        if (typeof options.alwaysShowCalendars === 'boolean')
            this.alwaysShowCalendars = options.alwaysShowCalendars;
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }
        var start, end, range;
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);
                start = end = null;
                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }
        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {
                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);
                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();
                var maxDate = this.maxDate;
                if (this.dateLimit && maxDate && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();
                if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day')) || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                    continue;
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;
                this.ranges[rangeHtml] = [start, end];
            }
            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li data-range-key="' + range + '">' + range + '</li>';
            }
            if (this.showCustomRangeLabel) {
                list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
            }
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }
        if (typeof cb === 'function') {
            this.callback = cb;
        }
        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }
        if (this.timePicker && this.autoApply)
            this.autoApply = false;
        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }
        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
            if (this.timePicker) {
                this.container.find('.ranges ul').hide();
            } else {
                this.container.find('.ranges').hide();
            }
        }
        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
            this.container.addClass('show-calendar');
        }
        this.container.addClass('opens' + this.opens);
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            this.container.find('.ranges').prependTo(this.container.find('.calendar.left').parent());
        }
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);
        this.container.find('.calendar').on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this)).on('click.daterangepicker', '.next', $.proxy(this.clickNext, this)).on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this)).on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this)).on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this)).on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this)).on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this)).on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this)).on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this)).on('focus.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsFocused, this)).on('blur.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsBlurred, this)).on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this)).on('keydown.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsKeydown, this));
        this.container.find('.ranges').on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this)).on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this)).on('click.daterangepicker', 'li', $.proxy(this.clickRange, this)).on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this)).on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));
        if (this.element.is('input') || this.element.is('button')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
            this.element.on('keydown.daterangepicker', $.proxy(this.toggle, this));
        }
        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }
    };
    DateRangePicker.prototype = {
        constructor: DateRangePicker,
        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);
            if (typeof startDate === 'object')
                this.startDate = moment(startDate);
            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');
            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            if (this.minDate && this.startDate.isBefore(this.minDate)) {
                this.startDate = this.minDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
            if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                this.startDate = this.maxDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
            if (!this.isShowing)
                this.updateElement();
            this.updateMonthsInView();
        },
        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);
            if (typeof endDate === 'object')
                this.endDate = moment(endDate);
            if (!this.timePicker)
                this.endDate = this.endDate.add(1, 'd').startOf('day').subtract(1, 'second');
            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();
            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();
            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);
            this.previousRightTime = this.endDate.clone();
            if (!this.isShowing)
                this.updateElement();
            this.updateMonthsInView();
        },
        isInvalidDate: function() {
            return false;
        },
        isCustomDate: function() {
            return false;
        },
        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },
        updateMonthsInView: function() {
            if (this.endDate) {
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM')) && (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))) {
                    return;
                }
                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
                this.rightCalendar.month = this.maxDate.clone().date(2);
                this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
            }
        },
        updateCalendars: function() {
            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }
            this.renderCalendar('left');
            this.renderCalendar('right');
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;
            this.calculateChosenLabel();
        },
        renderCalendar: function(side) {
            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;
            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;
            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;
            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);
                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }
                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }
            }
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }
            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;
            var arrow = this.locale.direction == 'ltr' ? {
                left: 'chevron-left icon-back',
                right: 'chevron-right icon-go'
            } : {
                left: 'chevron-right icon-go',
                right: 'chevron-left icon-back'
            };
            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th></th>';
            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
            } else {
                html += '<th></th>';
            }
            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");
            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;
                var monthHtml = '<select size="2" class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" : "") + ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" : "") + " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";
                var yearHtml = '<select size="2" class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' + (y === currentYear ? ' selected="selected"' : '') + '>' + y + '</option>';
                }
                yearHtml += '</select>';
                dateHtml = monthHtml + yearHtml;
            }
            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
            } else {
                html += '<th></th>';
            }
            html += '</tr>';
            html += '<tr>';
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';
            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }
            for (var row = 0; row < 6; row++) {
                html += '<tr>';
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';
                else if (this.showISOWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';
                for (var col = 0; col < 7; col++) {
                    var classes = [];
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');
                    var isCustom = this.isCustomDate(calendar[row][col]);
                    if (isCustom !== false) {
                        if (typeof isCustom === 'string')
                            classes.push(isCustom);
                        else
                            Array.prototype.push.apply(classes, isCustom);
                    }
                    var cname = '',
                        disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';
                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';
                }
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';
            this.container.find('.calendar.' + side + ' .calendar-table').html(html);
        },
        renderTimePicker: function(side) {
            if (side == 'right' && !this.endDate) return;
            var html, selected, minDate, maxDate = this.maxDate;
            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);
            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate.clone();
                minDate = this.startDate;
                var timeSelector = this.container.find('.calendar.right .calendar-time div');
                if (timeSelector.html() != '') {
                    selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                    selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                    selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());
                    if (!this.timePicker24Hour) {
                        var ampm = timeSelector.find('.ampmselect option:selected').val();
                        if (ampm === 'PM' && selected.hour() < 12)
                            selected.hour(selected.hour() + 12);
                        if (ampm === 'AM' && selected.hour() === 12)
                            selected.hour(0);
                    }
                }
                if (selected.isBefore(this.startDate))
                    selected = this.startDate.clone();
                if (maxDate && selected.isAfter(maxDate))
                    selected = maxDate.clone();
            }
            html = '<select class="hourselect">';
            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;
            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);
                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;
                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }
            html += '</select> ';
            html += ': <select class="minuteselect">';
            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);
                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;
                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }
            html += '</select> ';
            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';
                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);
                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;
                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }
                html += '</select> ';
            }
            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';
                var am_html = '';
                var pm_html = '';
                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';
                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';
                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }
                html += '</select>';
            }
            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);
        },
        updateFormInputs: function() {
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;
            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }
           

        },
        move: function() {
            var parentOffset = {
                    top: 0,
                    left: 0
                },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }
            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');
            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2 - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },
        show: function(e) {
            if (this.isShowing) return;
            this._outsideClickProxy = $.proxy(function(e) {
                this.outsideClick(e);
            }, this);
            $(document).on('mousedown.daterangepicker', this._outsideClickProxy).on('touchend.daterangepicker', this._outsideClickProxy).on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy).on('focusin.daterangepicker', this._outsideClickProxy);
            $(window).on('resize.daterangepicker', $.proxy(function(e) {
                this.move(e);
            }, this));
            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();
            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },
        hide: function(e) {
            if (!this.isShowing) return;
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);
            this.updateElement();
            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },
        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },
        outsideClick: function(e) {
            var target = $(e.target);
            if (e.type == "focusin" || target.closest(this.element).length || target.closest(this.container).length || target.closest('.calendar-table').length) return;
            this.hide();
            this.element.trigger('outsideClick.daterangepicker', this);
        },
        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },
        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },
        hoverRange: function(e) {
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;
            var label = e.target.getAttribute('data-range-key');
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }
        },
        clickRange: function(e) {
            var label = e.target.getAttribute('data-range-key');
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];
                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }
                if (!this.alwaysShowCalendars)
                    this.hideCalendars();
                this.clickApply();
            }
        },
        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },
        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },
        hoverDate: function(e) {
            if (!$(e.target).hasClass('available')) return;
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
            if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(":focus")) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(":focus")) {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar tbody td').each(function(index, el) {
                    if ($(el).hasClass('week')) return;
                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];
                    if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }
                });
            }
        },
        clickDate: function(e) {
            if (!$(e.target).hasClass('available')) return;
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
            if (this.endDate || date.isBefore(this.startDate, 'day')) {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                this.setEndDate(this.startDate.clone());
            } else {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply) {
                    this.calculateChosenLabel();
                    this.clickApply();
                }
            }
            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }
            this.updateView();
            e.stopPropagation();
        },
        calculateChosenLabel: function() {
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    var format = this.timePickerSeconds ? "YYYY-MM-DD hh:mm:ss" : "YYYY-MM-DD hh:mm";
                    if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                } else {
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                if (this.showCustomRangeLabel) {
                    this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                } else {
                    this.chosenLabel = null;
                }
                this.showCalendars();
            }
        },
        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },
        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },
        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.' + leftOrRight);
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();
            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }
            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }
            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }
            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },
        timeChanged: function(e) {
            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');
            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;
            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }
            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }
            this.updateCalendars();
            this.updateFormInputs();
            this.renderTimePicker('left');
            this.renderTimePicker('right');
        },
        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);
            if (start.isValid() && end.isValid()) {
                if (isRight && end.isBefore(start))
                    start = end.clone();
                var a= this.setStartDate(start);
                var b= this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }
            }
            this.updateView();
        },
        
        formInputsFocused: function(e) {
            this.container.find('input[name="daterangepicker_start"], input[name="daterangepicker_end"]').removeClass('active');
            $(e.target).addClass('active');
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            if (isRight) {
                this.endDate = null;
                this.setStartDate(this.startDate.clone());
                this.updateView();
            }
        },
        formInputsBlurred: function(e) {
            if (!this.endDate) {
                var val = this.container.find('input[name="daterangepicker_end"]').val();
                var end = moment(val, this.locale.format);
                if (end.isValid()) {
                    this.setEndDate(end);
                    this.updateView();
                }
            }
        },
        formInputsKeydown: function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.formInputsChanged(e);
            }
        },
        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;
            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;
            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }
            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }
            if (!start.isValid() || !end.isValid()) return;
            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },
        keydown: function(e) {
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
            if (e.keyCode === 27) {
                e.preventDefault();
                e.stopPropagation();
                this.hide();
            }
        },
        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },
        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }
    };
    $.fn.daterangepicker = function(options, callback) {
        var implementOptions = $.extend(true, {}, $.fn.daterangepicker.defaultOptions, options);
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, implementOptions, callback));
        });
        return this;
    };
    return DateRangePicker;
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvZGF0ZXJhbmdlcGlja2VyL2RhdGVyYW5nZXBpY2tlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB2ZXJzaW9uOiAyLjEuMzBcbiAqIEBhdXRob3I6IERhbiBHcm9zc21hbiBodHRwOi8vd3d3LmRhbmdyb3NzbWFuLmluZm8vXG4gKiBAY29weXJpZ2h0OiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNyBEYW4gR3Jvc3NtYW4uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZTogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqIEB3ZWJzaXRlOiBodHRwOi8vd3d3LmRhdGVyYW5nZXBpY2tlci5jb20vXG4gKi9cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydtb21lbnQnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKG1vbWVudCwganF1ZXJ5KSB7XG4gICAgICAgICAgICBpZiAoIWpxdWVyeS5mbikganF1ZXJ5LmZuID0ge307XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShtb21lbnQsIGpxdWVyeSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgdmFyIGpRdWVyeSA9ICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSA/IHdpbmRvdy5qUXVlcnkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghalF1ZXJ5KSB7XG4gICAgICAgICAgICBqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbiAgICAgICAgICAgIGlmICghalF1ZXJ5LmZuKSBqUXVlcnkuZm4gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9tZW50ID0gKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tb21lbnQgIT0gJ3VuZGVmaW5lZCcpID8gd2luZG93Lm1vbWVudCA6IHJlcXVpcmUoJ21vbWVudCcpO1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkobW9tZW50LCBqUXVlcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuZGF0ZXJhbmdlcGlja2VyID0gZmFjdG9yeShyb290Lm1vbWVudCwgcm9vdC5qUXVlcnkpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24obW9tZW50LCAkKSB7XG4gICAgdmFyIERhdGVSYW5nZVBpY2tlciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHRoaXMucGFyZW50RWwgPSAnYm9keSc7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudCgpLmVuZE9mKCdkYXknKTtcbiAgICAgICAgdGhpcy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWF4RGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRhdGVMaW1pdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF1dG9BcHBseSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpbmdsZURhdGVQaWNrZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93RHJvcGRvd25zID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwgPSB0cnVlO1xuICAgICAgICB0aGlzLnRpbWVQaWNrZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aW1lUGlja2VyMjRIb3VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZVBpY2tlckluY3JlbWVudCA9IDE7XG4gICAgICAgIHRoaXMudGltZVBpY2tlclNlY29uZHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saW5rZWRDYWxlbmRhcnMgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dG9VcGRhdGVJbnB1dCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJhbmdlcyA9IHt9O1xuICAgICAgICB0aGlzLm9wZW5zID0gJ3JpZ2h0JztcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5oYXNDbGFzcygncHVsbC1yaWdodCcpKVxuICAgICAgICAgICAgdGhpcy5vcGVucyA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5kcm9wcyA9ICdkb3duJztcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5oYXNDbGFzcygnZHJvcHVwJykpXG4gICAgICAgICAgICB0aGlzLmRyb3BzID0gJ3VwJztcbiAgICAgICAgdGhpcy5idXR0b25DbGFzc2VzID0gJ2J0biBidG4tc20nO1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3MgPSAnYnRuIHNtX2J0biBkZWZhdWx0X2J0bl8xIGxlZnQtYXV0byBvcmRlcl8yJztcbiAgICAgICAgdGhpcy5jYW5jZWxDbGFzcyA9ICdidG4gc21fYnRuIGRlZmF1bHRfYnRuXzIgcmlnaHQtYXV0byBvcmRlcl8xJztcbiAgICAgICAgdGhpcy5sb2NhbGUgPSB7XG4gICAgICAgICAgICBkaXJlY3Rpb246ICdsdHInLFxuICAgICAgICAgICAgZm9ybWF0OiBtb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdMJyksXG4gICAgICAgICAgICBzZXBhcmF0b3I6ICcgLSAnLFxuICAgICAgICAgICAgYXBwbHlMYWJlbDogJzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWNoZWNrdXBsb2FkXCI+PC9zcGFuPicsXG4gICAgICAgICAgICBjYW5jZWxMYWJlbDogJzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWNsb3NlXCI+PC9zcGFuPicsXG4gICAgICAgICAgICB3ZWVrTGFiZWw6ICdXJyxcbiAgICAgICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICdDdXN0b20gUmFuZ2UnLFxuICAgICAgICAgICAgZGF5c09mV2VlazogbW9tZW50LndlZWtkYXlzTWluKCksXG4gICAgICAgICAgICBtb250aE5hbWVzOiBtb21lbnQubW9udGhzU2hvcnQoKSxcbiAgICAgICAgICAgIGZpcnN0RGF5OiBtb21lbnQubG9jYWxlRGF0YSgpLmZpcnN0RGF5T2ZXZWVrKClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uKCkge307XG4gICAgICAgIHRoaXMuaXNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGVmdENhbGVuZGFyID0ge307XG4gICAgICAgIHRoaXMucmlnaHRDYWxlbmRhciA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh0aGlzLmVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnRlbXBsYXRlICE9PSAnc3RyaW5nJyAmJiAhKG9wdGlvbnMudGVtcGxhdGUgaW5zdGFuY2VvZiAkKSlcbiAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVyYW5nZXBpY2tlciBkYXRlcmFuZ2VjYWxlbmRhci1kZXNpZ24gZHJvcGRvd24tbWVudVwiPicgKyAnPGRpdiBjbGFzcz1cImNhbGVuZGFyIGxlZnRcIj4nICsgJzxkaXYgY2xhc3M9XCJkYXRlcmFuZ2VwaWNrZXJfaW5wdXRcIj4nICsgJzxpbnB1dCBjbGFzcz1cImlucHV0LW1pbmkgZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XCIgdmFsdWU9XCJcIiAvPicgKyAnPGkgY2xhc3M9XCJpY29uLWNhbGVuZGFyIGludGVybmFsLWNhbGVuZGFyLWljb25cIj48L2k+JyArICc8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdGltZVwiPicgKyAnPGRpdj48L2Rpdj4nICsgJzxpIGNsYXNzPVwiZmEgZmEtY2xvY2stbyBnbHlwaGljb24gZ2x5cGhpY29uLXRpbWVcIj48L2k+JyArICc8L2Rpdj4nICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRhYmxlXCI+PC9kaXY+JyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJjYWxlbmRhciByaWdodFwiPicgKyAnPGRpdiBjbGFzcz1cImRhdGVyYW5nZXBpY2tlcl9pbnB1dFwiPicgKyAnPGlucHV0IGNsYXNzPVwiaW5wdXQtbWluaSBmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJkYXRlcmFuZ2VwaWNrZXJfZW5kXCIgdmFsdWU9XCJcIiAvPicgKyAnPGkgY2xhc3M9XCJpY29uLWNhbGVuZGFyIGludGVybmFsLWNhbGVuZGFyLWljb25cIj48L2k+JyArICc8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdGltZVwiPicgKyAnPGRpdj48L2Rpdj4nICsgJzxpIGNsYXNzPVwiZmEgZmEtY2xvY2stbyBnbHlwaGljb24gZ2x5cGhpY29uLXRpbWVcIj48L2k+JyArICc8L2Rpdj4nICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cImNhbGVuZGFyLXRhYmxlXCI+PC9kaXY+JyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJyYW5nZXNcIj4nICsgJzxkaXYgY2xhc3M9XCJyYW5nZV9pbnB1dHNcIj4nICsgJzxidXR0b24gY2xhc3M9XCJhcHBseUJ0blwiIGRpc2FibGVkPVwiZGlzYWJsZWRcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+ICcgKyAnPGJ1dHRvbiBjbGFzcz1cImNhbmNlbEJ0blwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nICsgJzwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nO1xuICAgICAgICB0aGlzLnBhcmVudEVsID0gKG9wdGlvbnMucGFyZW50RWwgJiYgJChvcHRpb25zLnBhcmVudEVsKS5sZW5ndGgpID8gJChvcHRpb25zLnBhcmVudEVsKSA6ICQodGhpcy5wYXJlbnRFbCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gJChvcHRpb25zLnRlbXBsYXRlKS5hcHBlbmRUbyh0aGlzLnBhcmVudEVsKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuZGlyZWN0aW9uID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5kaXJlY3Rpb24gPSBvcHRpb25zLmxvY2FsZS5kaXJlY3Rpb247XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLmZvcm1hdCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZm9ybWF0ID0gb3B0aW9ucy5sb2NhbGUuZm9ybWF0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5zZXBhcmF0b3IgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLnNlcGFyYXRvciA9IG9wdGlvbnMubG9jYWxlLnNlcGFyYXRvcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuZGF5c09mV2VlayA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZGF5c09mV2VlayA9IG9wdGlvbnMubG9jYWxlLmRheXNPZldlZWsuc2xpY2UoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUubW9udGhOYW1lcyA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUubW9udGhOYW1lcyA9IG9wdGlvbnMubG9jYWxlLm1vbnRoTmFtZXMuc2xpY2UoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUuZmlyc3REYXkgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmZpcnN0RGF5ID0gb3B0aW9ucy5sb2NhbGUuZmlyc3REYXk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLmFwcGx5TGFiZWwgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlLmFwcGx5TGFiZWwgPSBvcHRpb25zLmxvY2FsZS5hcHBseUxhYmVsO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZS5jYW5jZWxMYWJlbCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuY2FuY2VsTGFiZWwgPSBvcHRpb25zLmxvY2FsZS5jYW5jZWxMYWJlbDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUud2Vla0xhYmVsID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS53ZWVrTGFiZWwgPSBvcHRpb25zLmxvY2FsZS53ZWVrTGFiZWw7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gb3B0aW9ucy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbDtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2VIdG1sID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsID0gcmFuZ2VIdG1sO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKHRoaXMubG9jYWxlLmRpcmVjdGlvbik7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdGFydERhdGUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBtb21lbnQob3B0aW9ucy5zdGFydERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lbmREYXRlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudChvcHRpb25zLmVuZERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW5EYXRlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IG1vbWVudChvcHRpb25zLm1pbkRhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhEYXRlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSA9IG1vbWVudChvcHRpb25zLm1heERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdGFydERhdGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBtb21lbnQob3B0aW9ucy5zdGFydERhdGUpO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZW5kRGF0ZSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBtb21lbnQob3B0aW9ucy5lbmREYXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1pbkRhdGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgdGhpcy5taW5EYXRlID0gbW9tZW50KG9wdGlvbnMubWluRGF0ZSk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhEYXRlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSA9IG1vbWVudChvcHRpb25zLm1heERhdGUpO1xuICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHRoaXMuc3RhcnREYXRlLmlzQmVmb3JlKHRoaXMubWluRGF0ZSkpXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMuZW5kRGF0ZS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1heERhdGUuY2xvbmUoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmFwcGx5Q2xhc3MgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzID0gb3B0aW9ucy5hcHBseUNsYXNzO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2FuY2VsQ2xhc3MgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy5jYW5jZWxDbGFzcyA9IG9wdGlvbnMuY2FuY2VsQ2xhc3M7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kYXRlTGltaXQgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgdGhpcy5kYXRlTGltaXQgPSBvcHRpb25zLmRhdGVMaW1pdDtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm9wZW5zID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMub3BlbnMgPSBvcHRpb25zLm9wZW5zO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZHJvcHMgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy5kcm9wcyA9IG9wdGlvbnMuZHJvcHM7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaG93V2Vla051bWJlcnMgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuc2hvd1dlZWtOdW1iZXJzID0gb3B0aW9ucy5zaG93V2Vla051bWJlcnM7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zaG93SVNPV2Vla051bWJlcnMgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzID0gb3B0aW9ucy5zaG93SVNPV2Vla051bWJlcnM7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5idXR0b25DbGFzc2VzID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3NlcyA9IG9wdGlvbnMuYnV0dG9uQ2xhc3NlcztcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmJ1dHRvbkNsYXNzZXMgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgdGhpcy5idXR0b25DbGFzc2VzID0gb3B0aW9ucy5idXR0b25DbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNob3dEcm9wZG93bnMgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3ducyA9IG9wdGlvbnMuc2hvd0Ryb3Bkb3ducztcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNob3dDdXN0b21SYW5nZUxhYmVsID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICB0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsID0gb3B0aW9ucy5zaG93Q3VzdG9tUmFuZ2VMYWJlbDtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZURhdGVQaWNrZXIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhpcy5zaW5nbGVEYXRlUGlja2VyID0gb3B0aW9ucy5zaW5nbGVEYXRlUGlja2VyO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcilcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50aW1lUGlja2VyID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICB0aGlzLnRpbWVQaWNrZXIgPSBvcHRpb25zLnRpbWVQaWNrZXI7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50aW1lUGlja2VyU2Vjb25kcyA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgdGhpcy50aW1lUGlja2VyU2Vjb25kcyA9IG9wdGlvbnMudGltZVBpY2tlclNlY29uZHM7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50aW1lUGlja2VySW5jcmVtZW50ID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlckluY3JlbWVudCA9IG9wdGlvbnMudGltZVBpY2tlckluY3JlbWVudDtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnRpbWVQaWNrZXIyNEhvdXIgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlcjI0SG91ciA9IG9wdGlvbnMudGltZVBpY2tlcjI0SG91cjtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1dG9BcHBseSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgdGhpcy5hdXRvQXBwbHkgPSBvcHRpb25zLmF1dG9BcHBseTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1dG9VcGRhdGVJbnB1dCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgdGhpcy5hdXRvVXBkYXRlSW5wdXQgPSBvcHRpb25zLmF1dG9VcGRhdGVJbnB1dDtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxpbmtlZENhbGVuZGFycyA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgdGhpcy5saW5rZWRDYWxlbmRhcnMgPSBvcHRpb25zLmxpbmtlZENhbGVuZGFycztcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmlzSW52YWxpZERhdGUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aGlzLmlzSW52YWxpZERhdGUgPSBvcHRpb25zLmlzSW52YWxpZERhdGU7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5pc0N1c3RvbURhdGUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZSA9IG9wdGlvbnMuaXNDdXN0b21EYXRlO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYWx3YXlzU2hvd0NhbGVuZGFycyA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgdGhpcy5hbHdheXNTaG93Q2FsZW5kYXJzID0gb3B0aW9ucy5hbHdheXNTaG93Q2FsZW5kYXJzO1xuICAgICAgICBpZiAodGhpcy5sb2NhbGUuZmlyc3REYXkgIT0gMCkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5sb2NhbGUuZmlyc3REYXk7XG4gICAgICAgICAgICB3aGlsZSAoaXRlcmF0b3IgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZGF5c09mV2Vlay5wdXNoKHRoaXMubG9jYWxlLmRheXNPZldlZWsuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3ItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnQsIGVuZCwgcmFuZ2U7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdGFydERhdGUgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBvcHRpb25zLmVuZERhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLmVsZW1lbnQpLmlzKCdpbnB1dFt0eXBlPXRleHRdJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzLmVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBzcGxpdCA9IHZhbC5zcGxpdCh0aGlzLmxvY2FsZS5zZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBtb21lbnQoc3BsaXRbMF0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChzcGxpdFsxXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB2YWwgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBtb21lbnQodmFsLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQodmFsLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT09IG51bGwgJiYgZW5kICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yYW5nZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKHJhbmdlIGluIG9wdGlvbnMucmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnJhbmdlc1tyYW5nZV1bMF0gPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudChvcHRpb25zLnJhbmdlc1tyYW5nZV1bMF0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudChvcHRpb25zLnJhbmdlc1tyYW5nZV1bMF0pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yYW5nZXNbcmFuZ2VdWzFdID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KG9wdGlvbnMucmFuZ2VzW3JhbmdlXVsxXSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChvcHRpb25zLnJhbmdlc1tyYW5nZV1bMV0pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgc3RhcnQuaXNCZWZvcmUodGhpcy5taW5EYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLm1pbkRhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlTGltaXQgJiYgbWF4RGF0ZSAmJiBzdGFydC5jbG9uZSgpLmFkZCh0aGlzLmRhdGVMaW1pdCkuaXNBZnRlcihtYXhEYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZSA9IHN0YXJ0LmNsb25lKCkuYWRkKHRoaXMuZGF0ZUxpbWl0KTtcbiAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiBlbmQuaXNBZnRlcihtYXhEYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbWF4RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGlmICgodGhpcy5taW5EYXRlICYmIGVuZC5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsIHRoaXMudGltZXBpY2tlciA/ICdtaW51dGUnIDogJ2RheScpKSB8fCAobWF4RGF0ZSAmJiBzdGFydC5pc0FmdGVyKG1heERhdGUsIHRoaXMudGltZXBpY2tlciA/ICdtaW51dGUnIDogJ2RheScpKSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlSHRtbCA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZXNbcmFuZ2VIdG1sXSA9IFtzdGFydCwgZW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsaXN0ID0gJzx1bD4nO1xuICAgICAgICAgICAgZm9yIChyYW5nZSBpbiB0aGlzLnJhbmdlcykge1xuICAgICAgICAgICAgICAgIGxpc3QgKz0gJzxsaSBkYXRhLXJhbmdlLWtleT1cIicgKyByYW5nZSArICdcIj4nICsgcmFuZ2UgKyAnPC9saT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcbiAgICAgICAgICAgICAgICBsaXN0ICs9ICc8bGkgZGF0YS1yYW5nZS1rZXk9XCInICsgdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCArICdcIj4nICsgdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbCArICc8L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ICs9ICc8L3VsPic7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcucmFuZ2VzJykucHJlcGVuZChsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUuc3RhcnRPZignZGF5Jyk7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLmVuZERhdGUuZW5kT2YoJ2RheScpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmNhbGVuZGFyLXRpbWUnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlciAmJiB0aGlzLmF1dG9BcHBseSlcbiAgICAgICAgICAgIHRoaXMuYXV0b0FwcGx5ID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSAmJiB0eXBlb2Ygb3B0aW9ucy5yYW5nZXMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcucmFuZ2VzJykuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0FwcGx5KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuYXBwbHlCdG4sIC5jYW5jZWxCdG4nKS5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKCdzaW5nbGUnKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5jYWxlbmRhci5sZWZ0JykuYWRkQ2xhc3MoJ3NpbmdsZScpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmNhbGVuZGFyLmxlZnQnKS5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuY2FsZW5kYXIucmlnaHQnKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuZGF0ZXJhbmdlcGlja2VyX2lucHV0IGlucHV0LCAuZGF0ZXJhbmdlcGlja2VyX2lucHV0ID4gaScpLmhpZGUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcucmFuZ2VzIHVsJykuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcucmFuZ2VzJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgodHlwZW9mIG9wdGlvbnMucmFuZ2VzID09PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5zaW5nbGVEYXRlUGlja2VyKSB8fCB0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKCdzaG93LWNhbGVuZGFyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkQ2xhc3MoJ29wZW5zJyArIHRoaXMub3BlbnMpO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMucmFuZ2VzICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLm9wZW5zID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5yYW5nZXMnKS5wcmVwZW5kVG8odGhpcy5jb250YWluZXIuZmluZCgnLmNhbGVuZGFyLmxlZnQnKS5wYXJlbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmFwcGx5QnRuLCAuY2FuY2VsQnRuJykuYWRkQ2xhc3ModGhpcy5idXR0b25DbGFzc2VzKTtcbiAgICAgICAgaWYgKHRoaXMuYXBwbHlDbGFzcy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuYXBwbHlCdG4nKS5hZGRDbGFzcyh0aGlzLmFwcGx5Q2xhc3MpO1xuICAgICAgICBpZiAodGhpcy5jYW5jZWxDbGFzcy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuY2FuY2VsQnRuJykuYWRkQ2xhc3ModGhpcy5jYW5jZWxDbGFzcyk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5hcHBseUJ0bicpLmh0bWwodGhpcy5sb2NhbGUuYXBwbHlMYWJlbCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5jYW5jZWxCdG4nKS5odG1sKHRoaXMubG9jYWxlLmNhbmNlbExhYmVsKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmNhbGVuZGFyJykub24oJ2NsaWNrLmRhdGVyYW5nZXBpY2tlcicsICcucHJldicsICQucHJveHkodGhpcy5jbGlja1ByZXYsIHRoaXMpKS5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJy5uZXh0JywgJC5wcm94eSh0aGlzLmNsaWNrTmV4dCwgdGhpcykpLm9uKCdtb3VzZWRvd24uZGF0ZXJhbmdlcGlja2VyJywgJ3RkLmF2YWlsYWJsZScsICQucHJveHkodGhpcy5jbGlja0RhdGUsIHRoaXMpKS5vbignbW91c2VlbnRlci5kYXRlcmFuZ2VwaWNrZXInLCAndGQuYXZhaWxhYmxlJywgJC5wcm94eSh0aGlzLmhvdmVyRGF0ZSwgdGhpcykpLm9uKCdtb3VzZWxlYXZlLmRhdGVyYW5nZXBpY2tlcicsICd0ZC5hdmFpbGFibGUnLCAkLnByb3h5KHRoaXMudXBkYXRlRm9ybUlucHV0cywgdGhpcykpLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC55ZWFyc2VsZWN0JywgJC5wcm94eSh0aGlzLm1vbnRoT3JZZWFyQ2hhbmdlZCwgdGhpcykpLm9uKCdjaGFuZ2UuZGF0ZXJhbmdlcGlja2VyJywgJ3NlbGVjdC5tb250aHNlbGVjdCcsICQucHJveHkodGhpcy5tb250aE9yWWVhckNoYW5nZWQsIHRoaXMpKS5vbignY2hhbmdlLmRhdGVyYW5nZXBpY2tlcicsICdzZWxlY3QuaG91cnNlbGVjdCxzZWxlY3QubWludXRlc2VsZWN0LHNlbGVjdC5zZWNvbmRzZWxlY3Qsc2VsZWN0LmFtcG1zZWxlY3QnLCAkLnByb3h5KHRoaXMudGltZUNoYW5nZWQsIHRoaXMpKS5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJy5kYXRlcmFuZ2VwaWNrZXJfaW5wdXQgaW5wdXQnLCAkLnByb3h5KHRoaXMuc2hvd0NhbGVuZGFycywgdGhpcykpLm9uKCdmb2N1cy5kYXRlcmFuZ2VwaWNrZXInLCAnLmRhdGVyYW5nZXBpY2tlcl9pbnB1dCBpbnB1dCcsICQucHJveHkodGhpcy5mb3JtSW5wdXRzRm9jdXNlZCwgdGhpcykpLm9uKCdibHVyLmRhdGVyYW5nZXBpY2tlcicsICcuZGF0ZXJhbmdlcGlja2VyX2lucHV0IGlucHV0JywgJC5wcm94eSh0aGlzLmZvcm1JbnB1dHNCbHVycmVkLCB0aGlzKSkub24oJ2NoYW5nZS5kYXRlcmFuZ2VwaWNrZXInLCAnLmRhdGVyYW5nZXBpY2tlcl9pbnB1dCBpbnB1dCcsICQucHJveHkodGhpcy5mb3JtSW5wdXRzQ2hhbmdlZCwgdGhpcykpLm9uKCdrZXlkb3duLmRhdGVyYW5nZXBpY2tlcicsICcuZGF0ZXJhbmdlcGlja2VyX2lucHV0IGlucHV0JywgJC5wcm94eSh0aGlzLmZvcm1JbnB1dHNLZXlkb3duLCB0aGlzKSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5yYW5nZXMnKS5vbignY2xpY2suZGF0ZXJhbmdlcGlja2VyJywgJ2J1dHRvbi5hcHBseUJ0bicsICQucHJveHkodGhpcy5jbGlja0FwcGx5LCB0aGlzKSkub24oJ2NsaWNrLmRhdGVyYW5nZXBpY2tlcicsICdidXR0b24uY2FuY2VsQnRuJywgJC5wcm94eSh0aGlzLmNsaWNrQ2FuY2VsLCB0aGlzKSkub24oJ2NsaWNrLmRhdGVyYW5nZXBpY2tlcicsICdsaScsICQucHJveHkodGhpcy5jbGlja1JhbmdlLCB0aGlzKSkub24oJ21vdXNlZW50ZXIuZGF0ZXJhbmdlcGlja2VyJywgJ2xpJywgJC5wcm94eSh0aGlzLmhvdmVyUmFuZ2UsIHRoaXMpKS5vbignbW91c2VsZWF2ZS5kYXRlcmFuZ2VwaWNrZXInLCAnbGknLCAkLnByb3h5KHRoaXMudXBkYXRlRm9ybUlucHV0cywgdGhpcykpO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmlzKCdpbnB1dCcpIHx8IHRoaXMuZWxlbWVudC5pcygnYnV0dG9uJykpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbih7XG4gICAgICAgICAgICAgICAgJ2NsaWNrLmRhdGVyYW5nZXBpY2tlcic6ICQucHJveHkodGhpcy5zaG93LCB0aGlzKSxcbiAgICAgICAgICAgICAgICAnZm9jdXMuZGF0ZXJhbmdlcGlja2VyJzogJC5wcm94eSh0aGlzLnNob3csIHRoaXMpLFxuICAgICAgICAgICAgICAgICdrZXl1cC5kYXRlcmFuZ2VwaWNrZXInOiAkLnByb3h5KHRoaXMuZWxlbWVudENoYW5nZWQsIHRoaXMpLFxuICAgICAgICAgICAgICAgICdrZXlkb3duLmRhdGVyYW5nZXBpY2tlcic6ICQucHJveHkodGhpcy5rZXlkb3duLCB0aGlzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oJ2NsaWNrLmRhdGVyYW5nZXBpY2tlcicsICQucHJveHkodGhpcy50b2dnbGUsIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbigna2V5ZG93bi5kYXRlcmFuZ2VwaWNrZXInLCAkLnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5pcygnaW5wdXQnKSAmJiAhdGhpcy5zaW5nbGVEYXRlUGlja2VyICYmIHRoaXMuYXV0b1VwZGF0ZUlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmFsKHRoaXMuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpICsgdGhpcy5sb2NhbGUuc2VwYXJhdG9yICsgdGhpcy5lbmREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVsZW1lbnQuaXMoJ2lucHV0JykgJiYgdGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC52YWwodGhpcy5zdGFydERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCkpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRlUmFuZ2VQaWNrZXIucHJvdG90eXBlID0ge1xuICAgICAgICBjb25zdHJ1Y3RvcjogRGF0ZVJhbmdlUGlja2VyLFxuICAgICAgICBzZXRTdGFydERhdGU6IGZ1bmN0aW9uKHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydERhdGUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KHN0YXJ0RGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnREYXRlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudChzdGFydERhdGUpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLm1pbnV0ZShNYXRoLnJvdW5kKHRoaXMuc3RhcnREYXRlLm1pbnV0ZSgpIC8gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSAqIHRoaXMudGltZVBpY2tlckluY3JlbWVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHRoaXMuc3RhcnREYXRlLmlzQmVmb3JlKHRoaXMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoTWF0aC5yb3VuZCh0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLnN0YXJ0RGF0ZS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoTWF0aC5mbG9vcih0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2hvd2luZylcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9udGhzSW5WaWV3KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEVuZERhdGU6IGZ1bmN0aW9uKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kRGF0ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbW9tZW50KGVuZERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVuZERhdGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudChlbmREYXRlKTtcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKVxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZS5hZGQoMSwgJ2QnKS5zdGFydE9mKCdkYXknKS5zdWJ0cmFjdCgxLCAnc2Vjb25kJyk7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudClcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUubWludXRlKE1hdGgucm91bmQodGhpcy5lbmREYXRlLm1pbnV0ZSgpIC8gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSAqIHRoaXMudGltZVBpY2tlckluY3JlbWVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSlcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLmVuZERhdGUuaXNBZnRlcih0aGlzLm1heERhdGUpKVxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUxpbWl0ICYmIHRoaXMuc3RhcnREYXRlLmNsb25lKCkuYWRkKHRoaXMuZGF0ZUxpbWl0KS5pc0JlZm9yZSh0aGlzLmVuZERhdGUpKVxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuYWRkKHRoaXMuZGF0ZUxpbWl0KTtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNSaWdodFRpbWUgPSB0aGlzLmVuZERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Nob3dpbmcpXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xuICAgICAgICB9LFxuICAgICAgICBpc0ludmFsaWREYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDdXN0b21EYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKCdsZWZ0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKCdyaWdodCcpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5yaWdodCAuY2FsZW5kYXItdGltZSBzZWxlY3QnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5yaWdodCAuY2FsZW5kYXItdGltZSBzZWxlY3QnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX2VuZFwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX2VuZFwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb250aHNJblZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm1JbnB1dHMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlTW9udGhzSW5WaWV3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLmxlZnRDYWxlbmRhci5tb250aCAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggJiYgKHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpID09IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpIHx8IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpID09IHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSkgJiYgKHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PSB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSB8fCB0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5kYXRlKDIpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5saW5rZWRDYWxlbmRhcnMgJiYgKHRoaXMuZW5kRGF0ZS5tb250aCgpICE9IHRoaXMuc3RhcnREYXRlLm1vbnRoKCkgfHwgdGhpcy5lbmREYXRlLnllYXIoKSAhPSB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpLmRhdGUoMik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5kYXRlKDIpLmFkZCgxLCAnbW9udGgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSAhPSB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgIT0gdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuZGF0ZSgyKS5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLmxpbmtlZENhbGVuZGFycyAmJiAhdGhpcy5zaW5nbGVEYXRlUGlja2VyICYmIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA+IHRoaXMubWF4RGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpLmRhdGUoMik7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLm1heERhdGUuY2xvbmUoKS5kYXRlKDIpLnN1YnRyYWN0KDEsICdtb250aCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVDYWxlbmRhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgIHZhciBob3VyLCBtaW51dGUsIHNlY29uZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5maW5kKCcubGVmdCAuaG91cnNlbGVjdCcpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLmZpbmQoJy5sZWZ0IC5taW51dGVzZWxlY3QnKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gcGFyc2VJbnQodGhpcy5jb250YWluZXIuZmluZCgnLmxlZnQgLnNlY29uZHNlbGVjdCcpLnZhbCgpLCAxMCkgOiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtcG0gPSB0aGlzLmNvbnRhaW5lci5maW5kKCcubGVmdCAuYW1wbXNlbGVjdCcpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdQTScgJiYgaG91ciA8IDEyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBob3VyID09PSAxMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob3VyID0gcGFyc2VJbnQodGhpcy5jb250YWluZXIuZmluZCgnLnJpZ2h0IC5ob3Vyc2VsZWN0JykudmFsKCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQodGhpcy5jb250YWluZXIuZmluZCgnLnJpZ2h0IC5taW51dGVzZWxlY3QnKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gcGFyc2VJbnQodGhpcy5jb250YWluZXIuZmluZCgnLnJpZ2h0IC5zZWNvbmRzZWxlY3QnKS52YWwoKSwgMTApIDogMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbXBtID0gdGhpcy5jb250YWluZXIuZmluZCgnLnJpZ2h0IC5hbXBtc2VsZWN0JykudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJyAmJiBob3VyIDwgMTIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnQU0nICYmIGhvdXIgPT09IDEyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKCdsZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKCdyaWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLnJhbmdlcyBsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXJDYWxlbmRhcjogZnVuY3Rpb24oc2lkZSkge1xuICAgICAgICAgICAgdmFyIGNhbGVuZGFyID0gc2lkZSA9PSAnbGVmdCcgPyB0aGlzLmxlZnRDYWxlbmRhciA6IHRoaXMucmlnaHRDYWxlbmRhcjtcbiAgICAgICAgICAgIHZhciBtb250aCA9IGNhbGVuZGFyLm1vbnRoLm1vbnRoKCk7XG4gICAgICAgICAgICB2YXIgeWVhciA9IGNhbGVuZGFyLm1vbnRoLnllYXIoKTtcbiAgICAgICAgICAgIHZhciBob3VyID0gY2FsZW5kYXIubW9udGguaG91cigpO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IGNhbGVuZGFyLm1vbnRoLm1pbnV0ZSgpO1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IGNhbGVuZGFyLm1vbnRoLnNlY29uZCgpO1xuICAgICAgICAgICAgdmFyIGRheXNJbk1vbnRoID0gbW9tZW50KFt5ZWFyLCBtb250aF0pLmRheXNJbk1vbnRoKCk7XG4gICAgICAgICAgICB2YXIgZmlyc3REYXkgPSBtb21lbnQoW3llYXIsIG1vbnRoLCAxXSk7XG4gICAgICAgICAgICB2YXIgbGFzdERheSA9IG1vbWVudChbeWVhciwgbW9udGgsIGRheXNJbk1vbnRoXSk7XG4gICAgICAgICAgICB2YXIgbGFzdE1vbnRoID0gbW9tZW50KGZpcnN0RGF5KS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5tb250aCgpO1xuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gbW9tZW50KGZpcnN0RGF5KS5zdWJ0cmFjdCgxLCAnbW9udGgnKS55ZWFyKCk7XG4gICAgICAgICAgICB2YXIgZGF5c0luTGFzdE1vbnRoID0gbW9tZW50KFtsYXN0WWVhciwgbGFzdE1vbnRoXSkuZGF5c0luTW9udGgoKTtcbiAgICAgICAgICAgIHZhciBkYXlPZldlZWsgPSBmaXJzdERheS5kYXkoKTtcbiAgICAgICAgICAgIHZhciBjYWxlbmRhciA9IFtdO1xuICAgICAgICAgICAgY2FsZW5kYXIuZmlyc3REYXkgPSBmaXJzdERheTtcbiAgICAgICAgICAgIGNhbGVuZGFyLmxhc3REYXkgPSBsYXN0RGF5O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYWxlbmRhcltpXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXJ0RGF5ID0gZGF5c0luTGFzdE1vbnRoIC0gZGF5T2ZXZWVrICsgdGhpcy5sb2NhbGUuZmlyc3REYXkgKyAxO1xuICAgICAgICAgICAgaWYgKHN0YXJ0RGF5ID4gZGF5c0luTGFzdE1vbnRoKVxuICAgICAgICAgICAgICAgIHN0YXJ0RGF5IC09IDc7XG4gICAgICAgICAgICBpZiAoZGF5T2ZXZWVrID09IHRoaXMubG9jYWxlLmZpcnN0RGF5KVxuICAgICAgICAgICAgICAgIHN0YXJ0RGF5ID0gZGF5c0luTGFzdE1vbnRoIC0gNjtcbiAgICAgICAgICAgIHZhciBjdXJEYXRlID0gbW9tZW50KFtsYXN0WWVhciwgbGFzdE1vbnRoLCBzdGFydERheSwgMTIsIG1pbnV0ZSwgc2Vjb25kXSk7XG4gICAgICAgICAgICB2YXIgY29sLCByb3c7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY29sID0gMCwgcm93ID0gMDsgaSA8IDQyOyBpKyssIGNvbCsrLCBjdXJEYXRlID0gbW9tZW50KGN1ckRhdGUpLmFkZCgyNCwgJ2hvdXInKSkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCAmJiBjb2wgJSA3ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0gPSBjdXJEYXRlLmNsb25lKCkuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBjdXJEYXRlLmhvdXIoMTIpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgY2FsZW5kYXJbcm93XVtjb2xdLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09IHRoaXMubWluRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlKSAmJiBzaWRlID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0gPSB0aGlzLm1pbkRhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT0gdGhpcy5tYXhEYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmIGNhbGVuZGFyW3Jvd11bY29sXS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkgJiYgc2lkZSA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXSA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaWRlID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLmNhbGVuZGFyID0gY2FsZW5kYXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5jYWxlbmRhciA9IGNhbGVuZGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1pbkRhdGUgPSBzaWRlID09ICdsZWZ0JyA/IHRoaXMubWluRGF0ZSA6IHRoaXMuc3RhcnREYXRlO1xuICAgICAgICAgICAgdmFyIG1heERhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzaWRlID09ICdsZWZ0JyA/IHRoaXMuc3RhcnREYXRlIDogdGhpcy5lbmREYXRlO1xuICAgICAgICAgICAgdmFyIGFycm93ID0gdGhpcy5sb2NhbGUuZGlyZWN0aW9uID09ICdsdHInID8ge1xuICAgICAgICAgICAgICAgIGxlZnQ6ICdjaGV2cm9uLWxlZnQgaWNvbi1iYWNrJyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2NoZXZyb24tcmlnaHQgaWNvbi1nbydcbiAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogJ2NoZXZyb24tcmlnaHQgaWNvbi1nbycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdjaGV2cm9uLWxlZnQgaWNvbi1iYWNrJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPic7XG4gICAgICAgICAgICBodG1sICs9ICc8dGhlYWQ+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4nO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtOdW1iZXJzIHx8IHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzKVxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0aD48L3RoPic7XG4gICAgICAgICAgICBpZiAoKCFtaW5EYXRlIHx8IG1pbkRhdGUuaXNCZWZvcmUoY2FsZW5kYXIuZmlyc3REYXkpKSAmJiAoIXRoaXMubGlua2VkQ2FsZW5kYXJzIHx8IHNpZGUgPT0gJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0aCBjbGFzcz1cInByZXYgYXZhaWxhYmxlXCI+PGkgY2xhc3M9XCJmYSBmYS0nICsgYXJyb3cubGVmdCArICcgZ2x5cGhpY29uIGdseXBoaWNvbi0nICsgYXJyb3cubGVmdCArICdcIj48L2k+PC90aD4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGg+PC90aD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRhdGVIdG1sID0gdGhpcy5sb2NhbGUubW9udGhOYW1lc1tjYWxlbmRhclsxXVsxXS5tb250aCgpXSArIGNhbGVuZGFyWzFdWzFdLmZvcm1hdChcIiBZWVlZXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0Ryb3Bkb3ducykge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TW9udGggPSBjYWxlbmRhclsxXVsxXS5tb250aCgpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WWVhciA9IGNhbGVuZGFyWzFdWzFdLnllYXIoKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF4WWVhciA9IChtYXhEYXRlICYmIG1heERhdGUueWVhcigpKSB8fCAoY3VycmVudFllYXIgKyA1KTtcbiAgICAgICAgICAgICAgICB2YXIgbWluWWVhciA9IChtaW5EYXRlICYmIG1pbkRhdGUueWVhcigpKSB8fCAoY3VycmVudFllYXIgLSA1MCk7XG4gICAgICAgICAgICAgICAgdmFyIGluTWluWWVhciA9IGN1cnJlbnRZZWFyID09IG1pblllYXI7XG4gICAgICAgICAgICAgICAgdmFyIGluTWF4WWVhciA9IGN1cnJlbnRZZWFyID09IG1heFllYXI7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoSHRtbCA9ICc8c2VsZWN0IHNpemU9XCIyXCIgY2xhc3M9XCJtb250aHNlbGVjdFwiPic7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCAxMjsgbSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoIWluTWluWWVhciB8fCBtID49IG1pbkRhdGUubW9udGgoKSkgJiYgKCFpbk1heFllYXIgfHwgbSA8PSBtYXhEYXRlLm1vbnRoKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aEh0bWwgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIG0gKyBcIidcIiArIChtID09PSBjdXJyZW50TW9udGggPyBcIiBzZWxlY3RlZD0nc2VsZWN0ZWQnXCIgOiBcIlwiKSArIFwiPlwiICsgdGhpcy5sb2NhbGUubW9udGhOYW1lc1ttXSArIFwiPC9vcHRpb24+XCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aEh0bWwgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIG0gKyBcIidcIiArIChtID09PSBjdXJyZW50TW9udGggPyBcIiBzZWxlY3RlZD0nc2VsZWN0ZWQnXCIgOiBcIlwiKSArIFwiIGRpc2FibGVkPSdkaXNhYmxlZCc+XCIgKyB0aGlzLmxvY2FsZS5tb250aE5hbWVzW21dICsgXCI8L29wdGlvbj5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb250aEh0bWwgKz0gXCI8L3NlbGVjdD5cIjtcbiAgICAgICAgICAgICAgICB2YXIgeWVhckh0bWwgPSAnPHNlbGVjdCBzaXplPVwiMlwiIGNsYXNzPVwieWVhcnNlbGVjdFwiPic7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IG1pblllYXI7IHkgPD0gbWF4WWVhcjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHllYXJIdG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIHkgKyAnXCInICsgKHkgPT09IGN1cnJlbnRZZWFyID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJycpICsgJz4nICsgeSArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5ZWFySHRtbCArPSAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICBkYXRlSHRtbCA9IG1vbnRoSHRtbCArIHllYXJIdG1sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPHRoIGNvbHNwYW49XCI1XCIgY2xhc3M9XCJtb250aFwiPicgKyBkYXRlSHRtbCArICc8L3RoPic7XG4gICAgICAgICAgICBpZiAoKCFtYXhEYXRlIHx8IG1heERhdGUuaXNBZnRlcihjYWxlbmRhci5sYXN0RGF5KSkgJiYgKCF0aGlzLmxpbmtlZENhbGVuZGFycyB8fCBzaWRlID09ICdyaWdodCcgfHwgdGhpcy5zaW5nbGVEYXRlUGlja2VyKSkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0aCBjbGFzcz1cIm5leHQgYXZhaWxhYmxlXCI+PGkgY2xhc3M9XCJmYSBmYS0nICsgYXJyb3cucmlnaHQgKyAnIGdseXBoaWNvbiBnbHlwaGljb24tJyArIGFycm93LnJpZ2h0ICsgJ1wiPjwvaT48L3RoPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0aD48L3RoPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG4gICAgICAgICAgICBodG1sICs9ICc8dHI+JztcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dXZWVrTnVtYmVycyB8fCB0aGlzLnNob3dJU09XZWVrTnVtYmVycylcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGggY2xhc3M9XCJ3ZWVrXCI+JyArIHRoaXMubG9jYWxlLndlZWtMYWJlbCArICc8L3RoPic7XG4gICAgICAgICAgICAkLmVhY2godGhpcy5sb2NhbGUuZGF5c09mV2VlaywgZnVuY3Rpb24oaW5kZXgsIGRheU9mV2Vlaykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0aD4nICsgZGF5T2ZXZWVrICsgJzwvdGg+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPC90aGVhZD4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRib2R5Pic7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlID09IG51bGwgJiYgdGhpcy5kYXRlTGltaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF4TGltaXQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh0aGlzLmRhdGVMaW1pdCkuZW5kT2YoJ2RheScpO1xuICAgICAgICAgICAgICAgIGlmICghbWF4RGF0ZSB8fCBtYXhMaW1pdC5pc0JlZm9yZShtYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBtYXhEYXRlID0gbWF4TGltaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgNjsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+JztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93V2Vla051bWJlcnMpXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZCBjbGFzcz1cIndlZWtcIj4nICsgY2FsZW5kYXJbcm93XVswXS53ZWVrKCkgKyAnPC90ZD4nO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2hvd0lTT1dlZWtOdW1iZXJzKVxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQgY2xhc3M9XCJ3ZWVrXCI+JyArIGNhbGVuZGFyW3Jvd11bMF0uaXNvV2VlaygpICsgJzwvdGQ+JztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCA3OyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsZW5kYXJbcm93XVtjb2xdLmlzU2FtZShuZXcgRGF0ZSgpLCBcImRheVwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgndG9kYXknKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyW3Jvd11bY29sXS5pc29XZWVrZGF5KCkgPiA1KVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd3ZWVrZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxlbmRhcltyb3ddW2NvbF0ubW9udGgoKSAhPSBjYWxlbmRhclsxXVsxXS5tb250aCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF5JykpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ29mZicsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uaXNBZnRlcihtYXhEYXRlLCAnZGF5JykpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ29mZicsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ludmFsaWREYXRlKGNhbGVuZGFyW3Jvd11bY29sXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ29mZicsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsZW5kYXJbcm93XVtjb2xdLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09IHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnLCAnc3RhcnQtZGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmREYXRlICE9IG51bGwgJiYgY2FsZW5kYXJbcm93XVtjb2xdLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09IHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJywgJ2VuZC1kYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUgIT0gbnVsbCAmJiBjYWxlbmRhcltyb3ddW2NvbF0gPiB0aGlzLnN0YXJ0RGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0gPCB0aGlzLmVuZERhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2luLXJhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0N1c3RvbSA9IHRoaXMuaXNDdXN0b21EYXRlKGNhbGVuZGFyW3Jvd11bY29sXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0N1c3RvbSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXNDdXN0b20gPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChpc0N1c3RvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY2xhc3NlcywgaXNDdXN0b20pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbmFtZSA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbmFtZSArPSBjbGFzc2VzW2ldICsgJyAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzZXNbaV0gPT0gJ2Rpc2FibGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuYW1lICs9ICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQgY2xhc3M9XCInICsgY25hbWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpICsgJ1wiIGRhdGEtdGl0bGU9XCInICsgJ3InICsgcm93ICsgJ2MnICsgY29sICsgJ1wiPicgKyBjYWxlbmRhcltyb3ddW2NvbF0uZGF0ZSgpICsgJzwvdGQ+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90Ym9keT4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPC90YWJsZT4nO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnLmNhbGVuZGFyLicgKyBzaWRlICsgJyAuY2FsZW5kYXItdGFibGUnKS5odG1sKGh0bWwpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXJUaW1lUGlja2VyOiBmdW5jdGlvbihzaWRlKSB7XG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAncmlnaHQnICYmICF0aGlzLmVuZERhdGUpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBodG1sLCBzZWxlY3RlZCwgbWluRGF0ZSwgbWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVMaW1pdCAmJiAoIXRoaXMubWF4RGF0ZSB8fCB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh0aGlzLmRhdGVMaW1pdCkuaXNBZnRlcih0aGlzLm1heERhdGUpKSlcbiAgICAgICAgICAgICAgICBtYXhEYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5hZGQodGhpcy5kYXRlTGltaXQpO1xuICAgICAgICAgICAgaWYgKHNpZGUgPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIG1pbkRhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNpZGUgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5lbmREYXRlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgbWluRGF0ZSA9IHRoaXMuc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lU2VsZWN0b3IgPSB0aGlzLmNvbnRhaW5lci5maW5kKCcuY2FsZW5kYXIucmlnaHQgLmNhbGVuZGFyLXRpbWUgZGl2Jyk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVTZWxlY3Rvci5odG1sKCkgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuaG91cih0aW1lU2VsZWN0b3IuZmluZCgnLmhvdXJzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudmFsKCkgfHwgc2VsZWN0ZWQuaG91cigpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQubWludXRlKHRpbWVTZWxlY3Rvci5maW5kKCcubWludXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpIHx8IHNlbGVjdGVkLm1pbnV0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuc2Vjb25kKHRpbWVTZWxlY3Rvci5maW5kKCcuc2Vjb25kc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpIHx8IHNlbGVjdGVkLnNlY29uZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbXBtID0gdGltZVNlbGVjdG9yLmZpbmQoJy5hbXBtc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdQTScgJiYgc2VsZWN0ZWQuaG91cigpIDwgMTIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuaG91cihzZWxlY3RlZC5ob3VyKCkgKyAxMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJyAmJiBzZWxlY3RlZC5ob3VyKCkgPT09IDEyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmhvdXIoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIHNlbGVjdGVkLmlzQWZ0ZXIobWF4RGF0ZSkpXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gbWF4RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCA9ICc8c2VsZWN0IGNsYXNzPVwiaG91cnNlbGVjdFwiPic7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPyAwIDogMTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPyAyMyA6IDEyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlfaW5fMjQgPSBpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKVxuICAgICAgICAgICAgICAgICAgICBpX2luXzI0ID0gc2VsZWN0ZWQuaG91cigpID49IDEyID8gKGkgPT0gMTIgPyAxMiA6IGkgKyAxMikgOiAoaSA9PSAxMiA/IDAgOiBpKTtcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHNlbGVjdGVkLmNsb25lKCkuaG91cihpX2luXzI0KTtcbiAgICAgICAgICAgICAgICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLm1pbnV0ZSg1OSkuaXNCZWZvcmUobWluRGF0ZSkpXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiB0aW1lLm1pbnV0ZSgwKS5pc0FmdGVyKG1heERhdGUpKVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGlfaW5fMjQgPT0gc2VsZWN0ZWQuaG91cigpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBpICsgJzwvb3B0aW9uPic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGNsYXNzPVwiZGlzYWJsZWRcIj4nICsgaSArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIj4nICsgaSArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0PiAnO1xuICAgICAgICAgICAgaHRtbCArPSAnOiA8c2VsZWN0IGNsYXNzPVwibWludXRlc2VsZWN0XCI+JztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjA7IGkgKz0gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhZGRlZCA9IGkgPCAxMCA/ICcwJyArIGkgOiBpO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gc2VsZWN0ZWQuY2xvbmUoKS5taW51dGUoaSk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKG1pbkRhdGUgJiYgdGltZS5zZWNvbmQoNTkpLmlzQmVmb3JlKG1pbkRhdGUpKVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgdGltZS5zZWNvbmQoMCkuaXNBZnRlcihtYXhEYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5taW51dGUoKSA9PSBpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCI+JyArIHBhZGRlZCArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0PiAnO1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlclNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc6IDxzZWxlY3QgY2xhc3M9XCJzZWNvbmRzZWxlY3RcIj4nO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFkZGVkID0gaSA8IDEwID8gJzAnICsgaSA6IGk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0gc2VsZWN0ZWQuY2xvbmUoKS5zZWNvbmQoaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLmlzQmVmb3JlKG1pbkRhdGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiB0aW1lLmlzQWZ0ZXIobWF4RGF0ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5zZWNvbmQoKSA9PSBpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgcGFkZGVkICsgJzwvb3B0aW9uPic7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiPicgKyBwYWRkZWQgKyAnPC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIj4nICsgcGFkZGVkICsgJzwvb3B0aW9uPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPC9zZWxlY3Q+ICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxzZWxlY3QgY2xhc3M9XCJhbXBtc2VsZWN0XCI+JztcbiAgICAgICAgICAgICAgICB2YXIgYW1faHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIHZhciBwbV9odG1sID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKG1pbkRhdGUgJiYgc2VsZWN0ZWQuY2xvbmUoKS5ob3VyKDEyKS5taW51dGUoMCkuc2Vjb25kKDApLmlzQmVmb3JlKG1pbkRhdGUpKVxuICAgICAgICAgICAgICAgICAgICBhbV9odG1sID0gJyBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiBzZWxlY3RlZC5jbG9uZSgpLmhvdXIoMCkubWludXRlKDApLnNlY29uZCgwKS5pc0FmdGVyKG1heERhdGUpKVxuICAgICAgICAgICAgICAgICAgICBwbV9odG1sID0gJyBkaXNhYmxlZD1cImRpc2FibGVkXCIgY2xhc3M9XCJkaXNhYmxlZFwiJztcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQuaG91cigpID49IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCJBTVwiJyArIGFtX2h0bWwgKyAnPkFNPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cIlBNXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyArIHBtX2h0bWwgKyAnPlBNPC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiQU1cIiBzZWxlY3RlZD1cInNlbGVjdGVkXCInICsgYW1faHRtbCArICc+QU08L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiUE1cIicgKyBwbV9odG1sICsgJz5QTTwvb3B0aW9uPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0Pic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuY2FsZW5kYXIuJyArIHNpZGUgKyAnIC5jYWxlbmRhci10aW1lIGRpdicpLmh0bWwoaHRtbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZUZvcm1JbnB1dHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9ZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XScpLmlzKFwiOmZvY3VzXCIpIHx8IHRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9ZGF0ZXJhbmdlcGlja2VyX2VuZF0nKS5pcyhcIjpmb2N1c1wiKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPWRhdGVyYW5nZXBpY2tlcl9zdGFydF0nKS52YWwodGhpcy5zdGFydERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPWRhdGVyYW5nZXBpY2tlcl9lbmRdJykudmFsKHRoaXMuZW5kRGF0ZS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIgfHwgKHRoaXMuZW5kRGF0ZSAmJiAodGhpcy5zdGFydERhdGUuaXNCZWZvcmUodGhpcy5lbmREYXRlKSB8fCB0aGlzLnN0YXJ0RGF0ZS5pc1NhbWUodGhpcy5lbmREYXRlKSkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnYnV0dG9uLmFwcGx5QnRuJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnYnV0dG9uLmFwcGx5QnRuJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG5cbiAgICAgICAgfSxcbiAgICAgICAgbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclRvcDtcbiAgICAgICAgICAgIHZhciBwYXJlbnRSaWdodEVkZ2UgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnRFbC5pcygnYm9keScpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50T2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50RWwub2Zmc2V0KCkudG9wIC0gdGhpcy5wYXJlbnRFbC5zY3JvbGxUb3AoKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRFbC5vZmZzZXQoKS5sZWZ0IC0gdGhpcy5wYXJlbnRFbC5zY3JvbGxMZWZ0KClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBhcmVudFJpZ2h0RWRnZSA9IHRoaXMucGFyZW50RWxbMF0uY2xpZW50V2lkdGggKyB0aGlzLnBhcmVudEVsLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kcm9wcyA9PSAndXAnKVxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclRvcCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS50b3AgLSB0aGlzLmNvbnRhaW5lci5vdXRlckhlaWdodCgpIC0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCkudG9wICsgdGhpcy5lbGVtZW50Lm91dGVySGVpZ2h0KCkgLSBwYXJlbnRPZmZzZXQudG9wO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJbdGhpcy5kcm9wcyA9PSAndXAnID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKCdkcm9wdXAnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5zID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogcGFyZW50UmlnaHRFZGdlIC0gdGhpcy5lbGVtZW50Lm9mZnNldCgpLmxlZnQgLSB0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIub2Zmc2V0KCkubGVmdCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiA5XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVucyA9PSAnY2VudGVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLmVsZW1lbnQub2Zmc2V0KCkubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0ICsgdGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoKSAvIDIgLSB0aGlzLmNvbnRhaW5lci5vdXRlcldpZHRoKCkgLyAyLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLm9mZnNldCgpLmxlZnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogOVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLmVsZW1lbnQub2Zmc2V0KCkubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLm9mZnNldCgpLmxlZnQgKyB0aGlzLmNvbnRhaW5lci5vdXRlcldpZHRoKCkgPiAkKHdpbmRvdykud2lkdGgoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaG93OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuX291dHNpZGVDbGlja1Byb3h5ID0gJC5wcm94eShmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2soZSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24uZGF0ZXJhbmdlcGlja2VyJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpLm9uKCd0b3VjaGVuZC5kYXRlcmFuZ2VwaWNrZXInLCB0aGlzLl9vdXRzaWRlQ2xpY2tQcm94eSkub24oJ2NsaWNrLmRhdGVyYW5nZXBpY2tlcicsICdbZGF0YS10b2dnbGU9ZHJvcGRvd25dJywgdGhpcy5fb3V0c2lkZUNsaWNrUHJveHkpLm9uKCdmb2N1c2luLmRhdGVyYW5nZXBpY2tlcicsIHRoaXMuX291dHNpZGVDbGlja1Byb3h5KTtcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplLmRhdGVyYW5nZXBpY2tlcicsICQucHJveHkoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZShlKTtcbiAgICAgICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMub2xkU3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMub2xkRW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1JpZ2h0VGltZSA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdzaG93LmRhdGVyYW5nZXBpY2tlcicsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTaG93aW5nKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXRoaXMuZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5vbGRTdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm9sZEVuZERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydERhdGUuaXNTYW1lKHRoaXMub2xkU3RhcnREYXRlKSB8fCAhdGhpcy5lbmREYXRlLmlzU2FtZSh0aGlzLm9sZEVuZERhdGUpKVxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5zdGFydERhdGUsIHRoaXMuZW5kRGF0ZSwgdGhpcy5jaG9zZW5MYWJlbCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZignLmRhdGVyYW5nZXBpY2tlcicpO1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9mZignLmRhdGVyYW5nZXBpY2tlcicpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJ2hpZGUuZGF0ZXJhbmdlcGlja2VyJywgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3V0c2lkZUNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09IFwiZm9jdXNpblwiIHx8IHRhcmdldC5jbG9zZXN0KHRoaXMuZWxlbWVudCkubGVuZ3RoIHx8IHRhcmdldC5jbG9zZXN0KHRoaXMuY29udGFpbmVyKS5sZW5ndGggfHwgdGFyZ2V0LmNsb3Nlc3QoJy5jYWxlbmRhci10YWJsZScpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignb3V0c2lkZUNsaWNrLmRhdGVyYW5nZXBpY2tlcicsIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBzaG93Q2FsZW5kYXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKCdzaG93LWNhbGVuZGFyJyk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdzaG93Q2FsZW5kYXIuZGF0ZXJhbmdlcGlja2VyJywgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpZGVDYWxlbmRhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoJ3Nob3ctY2FsZW5kYXInKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdoaWRlQ2FsZW5kYXIuZGF0ZXJhbmdlcGlja2VyJywgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGhvdmVyUmFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPWRhdGVyYW5nZXBpY2tlcl9zdGFydF0nKS5pcyhcIjpmb2N1c1wiKSB8fCB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPWRhdGVyYW5nZXBpY2tlcl9lbmRdJykuaXMoXCI6Zm9jdXNcIikpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJhbmdlLWtleScpO1xuICAgICAgICAgICAgaWYgKGxhYmVsID09IHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGVzID0gdGhpcy5yYW5nZXNbbGFiZWxdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9ZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XScpLnZhbChkYXRlc1swXS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnaW5wdXRbbmFtZT1kYXRlcmFuZ2VwaWNrZXJfZW5kXScpLnZhbChkYXRlc1sxXS5mb3JtYXQodGhpcy5sb2NhbGUuZm9ybWF0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrUmFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yYW5nZS1rZXknKTtcbiAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgIGlmIChsYWJlbCA9PSB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2FsZW5kYXJzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlcyA9IHRoaXMucmFuZ2VzW2xhYmVsXTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRhdGVzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IGRhdGVzWzFdO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUuZW5kT2YoJ2RheScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQ2FsZW5kYXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrUHJldjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGNhbCA9ICQoZS50YXJnZXQpLnBhcmVudHMoJy5jYWxlbmRhcicpO1xuICAgICAgICAgICAgaWYgKGNhbC5oYXNDbGFzcygnbGVmdCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguc3VidHJhY3QoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGlua2VkQ2FsZW5kYXJzKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguc3VidHJhY3QoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrTmV4dDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGNhbCA9ICQoZS50YXJnZXQpLnBhcmVudHMoJy5jYWxlbmRhcicpO1xuICAgICAgICAgICAgaWYgKGNhbC5oYXNDbGFzcygnbGVmdCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguYWRkKDEsICdtb250aCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGguYWRkKDEsICdtb250aCcpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmtlZENhbGVuZGFycylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguYWRkKDEsICdtb250aCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXJEYXRlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoISQoZS50YXJnZXQpLmhhc0NsYXNzKCdhdmFpbGFibGUnKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRpdGxlID0gJChlLnRhcmdldCkuYXR0cignZGF0YS10aXRsZScpO1xuICAgICAgICAgICAgdmFyIHJvdyA9IHRpdGxlLnN1YnN0cigxLCAxKTtcbiAgICAgICAgICAgIHZhciBjb2wgPSB0aXRsZS5zdWJzdHIoMywgMSk7XG4gICAgICAgICAgICB2YXIgY2FsID0gJChlLnRhcmdldCkucGFyZW50cygnLmNhbGVuZGFyJyk7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGNhbC5oYXNDbGFzcygnbGVmdCcpID8gdGhpcy5sZWZ0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdIDogdGhpcy5yaWdodENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUgJiYgIXRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9ZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XScpLmlzKFwiOmZvY3VzXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmluZCgnaW5wdXRbbmFtZT1kYXRlcmFuZ2VwaWNrZXJfc3RhcnRdJykudmFsKGRhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5lbmREYXRlICYmICF0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPWRhdGVyYW5nZXBpY2tlcl9lbmRdJykuaXMoXCI6Zm9jdXNcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPWRhdGVyYW5nZXBpY2tlcl9lbmRdJykudmFsKGRhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxlZnRDYWxlbmRhciA9IHRoaXMubGVmdENhbGVuZGFyO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q2FsZW5kYXIgPSB0aGlzLnJpZ2h0Q2FsZW5kYXI7XG4gICAgICAgICAgICB2YXIgc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5jYWxlbmRhciB0Ym9keSB0ZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsKS5oYXNDbGFzcygnd2VlaycpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9ICQoZWwpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRpdGxlLnN1YnN0cigxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbCA9IHRpdGxlLnN1YnN0cigzLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbCA9ICQoZWwpLnBhcmVudHMoJy5jYWxlbmRhcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHQgPSBjYWwuaGFzQ2xhc3MoJ2xlZnQnKSA/IGxlZnRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF0gOiByaWdodENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkdC5pc0FmdGVyKHN0YXJ0RGF0ZSkgJiYgZHQuaXNCZWZvcmUoZGF0ZSkpIHx8IGR0LmlzU2FtZShkYXRlLCAnZGF5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZWwpLmFkZENsYXNzKCdpbi1yYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlQ2xhc3MoJ2luLXJhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2tEYXRlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoISQoZS50YXJnZXQpLmhhc0NsYXNzKCdhdmFpbGFibGUnKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRpdGxlID0gJChlLnRhcmdldCkuYXR0cignZGF0YS10aXRsZScpO1xuICAgICAgICAgICAgdmFyIHJvdyA9IHRpdGxlLnN1YnN0cigxLCAxKTtcbiAgICAgICAgICAgIHZhciBjb2wgPSB0aXRsZS5zdWJzdHIoMywgMSk7XG4gICAgICAgICAgICB2YXIgY2FsID0gJChlLnRhcmdldCkucGFyZW50cygnLmNhbGVuZGFyJyk7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGNhbC5oYXNDbGFzcygnbGVmdCcpID8gdGhpcy5sZWZ0Q2FsZW5kYXIuY2FsZW5kYXJbcm93XVtjb2xdIDogdGhpcy5yaWdodENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUgfHwgZGF0ZS5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaG91ciA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLmZpbmQoJy5sZWZ0IC5ob3Vyc2VsZWN0JykudmFsKCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbXBtID0gdGhpcy5jb250YWluZXIuZmluZCgnLmxlZnQgLmFtcG1zZWxlY3QnKS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdBTScgJiYgaG91ciA9PT0gMTIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLmZpbmQoJy5sZWZ0IC5taW51dGVzZWxlY3QnKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vjb25kID0gdGhpcy50aW1lUGlja2VyU2Vjb25kcyA/IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLmZpbmQoJy5sZWZ0IC5zZWNvbmRzZWxlY3QnKS52YWwoKSwgMTApIDogMDtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGUuY2xvbmUoKS5ob3VyKGhvdXIpLm1pbnV0ZShtaW51dGUpLnNlY29uZChzZWNvbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKGRhdGUuY2xvbmUoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVuZERhdGUgJiYgZGF0ZS5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUodGhpcy5zdGFydERhdGUuY2xvbmUoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvdXIgPSBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5maW5kKCcucmlnaHQgLmhvdXJzZWxlY3QnKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtcG0gPSB0aGlzLmNvbnRhaW5lci5maW5kKCcucmlnaHQgLmFtcG1zZWxlY3QnKS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbXBtID09PSAnUE0nICYmIGhvdXIgPCAxMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdBTScgJiYgaG91ciA9PT0gMTIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IHBhcnNlSW50KHRoaXMuY29udGFpbmVyLmZpbmQoJy5yaWdodCAubWludXRlc2VsZWN0JykudmFsKCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyBwYXJzZUludCh0aGlzLmNvbnRhaW5lci5maW5kKCcucmlnaHQgLnNlY29uZHNlbGVjdCcpLnZhbCgpLCAxMCkgOiAwO1xuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZS5jbG9uZSgpLmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZShkYXRlLmNsb25lKCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUNob3NlbkxhYmVsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tBcHBseSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUodGhpcy5zdGFydERhdGUpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FsY3VsYXRlQ2hvc2VuTGFiZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbVJhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIHJhbmdlIGluIHRoaXMucmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy50aW1lUGlja2VyU2Vjb25kcyA/IFwiWVlZWS1NTS1ERCBoaDptbTpzc1wiIDogXCJZWVlZLU1NLUREIGhoOm1tXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KSA9PSB0aGlzLnJhbmdlc1tyYW5nZV1bMF0uZm9ybWF0KGZvcm1hdCkgJiYgdGhpcy5lbmREYXRlLmZvcm1hdChmb3JtYXQpID09IHRoaXMucmFuZ2VzW3JhbmdlXVsxXS5mb3JtYXQoZm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKCcucmFuZ2VzIGxpOmVxKCcgKyBpICsgJyknKS5hZGRDbGFzcygnYWN0aXZlJykuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgPT0gdGhpcy5yYW5nZXNbcmFuZ2VdWzBdLmZvcm1hdCgnWVlZWS1NTS1ERCcpICYmIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PSB0aGlzLnJhbmdlc1tyYW5nZV1bMV0uZm9ybWF0KCdZWVlZLU1NLUREJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVJhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNob3NlbkxhYmVsID0gdGhpcy5jb250YWluZXIuZmluZCgnLnJhbmdlcyBsaTplcSgnICsgaSArICcpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXN0b21SYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dDdXN0b21SYW5nZUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKCcucmFuZ2VzIGxpOmxhc3QnKS5hZGRDbGFzcygnYWN0aXZlJykuaHRtbCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2tBcHBseTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrQ2FuY2VsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMub2xkU3RhcnREYXRlO1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5vbGRFbmREYXRlO1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2FuY2VsLmRhdGVyYW5nZXBpY2tlcicsIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBtb250aE9yWWVhckNoYW5nZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBpc0xlZnQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuY2FsZW5kYXInKS5oYXNDbGFzcygnbGVmdCcpLFxuICAgICAgICAgICAgICAgIGxlZnRPclJpZ2h0ID0gaXNMZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICBjYWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKCcuY2FsZW5kYXIuJyArIGxlZnRPclJpZ2h0KTtcbiAgICAgICAgICAgIHZhciBtb250aCA9IHBhcnNlSW50KGNhbC5maW5kKCcubW9udGhzZWxlY3QnKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIHllYXIgPSBjYWwuZmluZCgnLnllYXJzZWxlY3QnKS52YWwoKTtcbiAgICAgICAgICAgIGlmICghaXNMZWZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHllYXIgPCB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCkgfHwgKHllYXIgPT0gdGhpcy5zdGFydERhdGUueWVhcigpICYmIG1vbnRoIDwgdGhpcy5zdGFydERhdGUubW9udGgoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5tb250aCgpO1xuICAgICAgICAgICAgICAgICAgICB5ZWFyID0gdGhpcy5zdGFydERhdGUueWVhcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoeWVhciA8IHRoaXMubWluRGF0ZS55ZWFyKCkgfHwgKHllYXIgPT0gdGhpcy5taW5EYXRlLnllYXIoKSAmJiBtb250aCA8IHRoaXMubWluRGF0ZS5tb250aCgpKSkge1xuICAgICAgICAgICAgICAgICAgICBtb250aCA9IHRoaXMubWluRGF0ZS5tb250aCgpO1xuICAgICAgICAgICAgICAgICAgICB5ZWFyID0gdGhpcy5taW5EYXRlLnllYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHllYXIgPiB0aGlzLm1heERhdGUueWVhcigpIHx8ICh5ZWFyID09IHRoaXMubWF4RGF0ZS55ZWFyKCkgJiYgbW9udGggPiB0aGlzLm1heERhdGUubW9udGgoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLm1heERhdGUubW9udGgoKTtcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IHRoaXMubWF4RGF0ZS55ZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLm1vbnRoKG1vbnRoKS55ZWFyKHllYXIpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmtlZENhbGVuZGFycylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguY2xvbmUoKS5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5tb250aChtb250aCkueWVhcih5ZWFyKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmNsb25lKCkuc3VidHJhY3QoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbGVuZGFycygpO1xuICAgICAgICB9LFxuICAgICAgICB0aW1lQ2hhbmdlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGNhbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jYWxlbmRhcicpLFxuICAgICAgICAgICAgICAgIGlzTGVmdCA9IGNhbC5oYXNDbGFzcygnbGVmdCcpO1xuICAgICAgICAgICAgdmFyIGhvdXIgPSBwYXJzZUludChjYWwuZmluZCgnLmhvdXJzZWxlY3QnKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IHBhcnNlSW50KGNhbC5maW5kKCcubWludXRlc2VsZWN0JykudmFsKCksIDEwKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gcGFyc2VJbnQoY2FsLmZpbmQoJy5zZWNvbmRzZWxlY3QnKS52YWwoKSwgMTApIDogMDtcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFtcG0gPSBjYWwuZmluZCgnLmFtcG1zZWxlY3QnKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJyAmJiBob3VyIDwgMTIpXG4gICAgICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdBTScgJiYgaG91ciA9PT0gMTIpXG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTGVmdCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgc3RhcnQuaG91cihob3VyKTtcbiAgICAgICAgICAgICAgICBzdGFydC5taW51dGUobWludXRlKTtcbiAgICAgICAgICAgICAgICBzdGFydC5zZWNvbmQoc2Vjb25kKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShzdGFydCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbmREYXRlICYmIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PSBzdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJiB0aGlzLmVuZERhdGUuaXNCZWZvcmUoc3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZShzdGFydC5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmVuZERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBlbmQuaG91cihob3VyKTtcbiAgICAgICAgICAgICAgICBlbmQubWludXRlKG1pbnV0ZSk7XG4gICAgICAgICAgICAgICAgZW5kLnNlY29uZChzZWNvbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZShlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybUlucHV0cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKCdsZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoJ3JpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1JbnB1dHNDaGFuZ2VkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgaXNSaWdodCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jYWxlbmRhcicpLmhhc0NsYXNzKCdyaWdodCcpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbW9tZW50KHRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9XCJkYXRlcmFuZ2VwaWNrZXJfc3RhcnRcIl0nKS52YWwoKSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgIHZhciBlbmQgPSBtb21lbnQodGhpcy5jb250YWluZXIuZmluZCgnaW5wdXRbbmFtZT1cImRhdGVyYW5nZXBpY2tlcl9lbmRcIl0nKS52YWwoKSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcbiAgICAgICAgICAgIGlmIChzdGFydC5pc1ZhbGlkKCkgJiYgZW5kLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JpZ2h0ICYmIGVuZC5pc0JlZm9yZShzdGFydCkpXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgdmFyIGE9IHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2YXIgYj0gdGhpcy5zZXRFbmREYXRlKGVuZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX3N0YXJ0XCJdJykudmFsKHRoaXMuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZXJhbmdlcGlja2VyX2VuZFwiXScpLnZhbCh0aGlzLmVuZERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgZm9ybUlucHV0c0ZvY3VzZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9XCJkYXRlcmFuZ2VwaWNrZXJfc3RhcnRcIl0sIGlucHV0W25hbWU9XCJkYXRlcmFuZ2VwaWNrZXJfZW5kXCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJChlLnRhcmdldCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIGlzUmlnaHQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuY2FsZW5kYXInKS5oYXNDbGFzcygncmlnaHQnKTtcbiAgICAgICAgICAgIGlmIChpc1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybUlucHV0c0JsdXJyZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuY29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9XCJkYXRlcmFuZ2VwaWNrZXJfZW5kXCJdJykudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IG1vbWVudCh2YWwsIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGVuZC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybUlucHV0c0tleWRvd246IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUlucHV0c0NoYW5nZWQoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVsZW1lbnRDaGFuZ2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50LmlzKCdpbnB1dCcpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudC52YWwoKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBkYXRlU3RyaW5nID0gdGhpcy5lbGVtZW50LnZhbCgpLnNwbGl0KHRoaXMubG9jYWxlLnNlcGFyYXRvciksXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBudWxsLFxuICAgICAgICAgICAgICAgIGVuZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZGF0ZVN0cmluZy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudChkYXRlU3RyaW5nWzBdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChkYXRlU3RyaW5nWzFdLCB0aGlzLmxvY2FsZS5mb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCBzdGFydCA9PT0gbnVsbCB8fCBlbmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudCh0aGlzLmVsZW1lbnQudmFsKCksIHRoaXMubG9jYWxlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0YXJ0LmlzVmFsaWQoKSB8fCAhZW5kLmlzVmFsaWQoKSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUoc3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfSxcbiAgICAgICAga2V5ZG93bjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKChlLmtleUNvZGUgPT09IDkpIHx8IChlLmtleUNvZGUgPT09IDEzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50LmlzKCdpbnB1dCcpICYmICF0aGlzLnNpbmdsZURhdGVQaWNrZXIgJiYgdGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudmFsKHRoaXMuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpICsgdGhpcy5sb2NhbGUuc2VwYXJhdG9yICsgdGhpcy5lbmREYXRlLmZvcm1hdCh0aGlzLmxvY2FsZS5mb3JtYXQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWxlbWVudC5pcygnaW5wdXQnKSAmJiB0aGlzLmF1dG9VcGRhdGVJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC52YWwodGhpcy5zdGFydERhdGUuZm9ybWF0KHRoaXMubG9jYWxlLmZvcm1hdCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9mZignLmRhdGVyYW5nZXBpY2tlcicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZURhdGEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgJC5mbi5kYXRlcmFuZ2VwaWNrZXIgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW1wbGVtZW50T3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmZuLmRhdGVyYW5nZXBpY2tlci5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9ICQodGhpcyk7XG4gICAgICAgICAgICBpZiAoZWwuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykpXG4gICAgICAgICAgICAgICAgZWwuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBlbC5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInLCBuZXcgRGF0ZVJhbmdlUGlja2VyKGVsLCBpbXBsZW1lbnRPcHRpb25zLCBjYWxsYmFjaykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRGF0ZVJhbmdlUGlja2VyO1xufSkpOyJdLCJmaWxlIjoidmVuZG9yL2RhdGVyYW5nZXBpY2tlci9kYXRlcmFuZ2VwaWNrZXIuanMifQ==
