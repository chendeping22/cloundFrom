<template>
  <div class="calendar">
    <div class="month">
      <ul>
        <li class="arrow left"
            @click="pickPre(currentYear,currentMonth)"
            :class="{ unActive: currentYear == new Date().getFullYear() && currentMonth == new Date().getMonth()+1?unActive=true:unActive=false }">
          <i class="el-icon-arrow-left"></i>
        </li>
        <li class="year-month">
          <span class="choose-year">{{ currentYear }}年</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow right"
            @click="pickNext(currentYear,currentMonth)">
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>
    <ul class="weekdays">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <ul class="days">
      <template v-for="(day,$index) in days">
        <li :key="$index"
            @click="pick(day,$index)"
            v-if="day.getFullYear() < new Date().getFullYear() || (day.getFullYear() == new Date().getFullYear() && day.getMonth() < new Date().getMonth())|| (day.getFullYear() == new Date().getFullYear() && day.getMonth()== new Date().getMonth())&& day.getDate()<new Date().getDate()"
            class="unDate unActive">{{ day.getDate() }}</li>
        <li :key="$index"
            @click="pick(day,$index)"
            v-else-if="day.getMonth()+1 != currentMonth"
            class="other-month"
            :class="classObject(day)">
          <span>{{ day.getDate() }} </span>
        </li>
        <li :key="$index"
            @click="pick(day,$index)"
            v-else-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()"
            :class="classObject(day)">
          <span class="curActive">{{ day.getDate() }} </span>
        </li>
        <li :key="$index"
            @click="pick(day,$index)"
            v-else
            :class="classObject(day)">
          <span>{{ day.getDate() }} </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      isActive: -1,
      unActive: true,
      selectDay: this.activeDay
    }
  },
  props: {
    activeDay: {
      type: Date,
      default: new Date()
    },
    monthDay: {
      type: Array
    },
    defaultSelect: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.initData(null)
  },
  computed: {},
  updated () {
    //  console.log(this.monthDay)
  },
  watch: {
    monthDay: function (val, oldVal) {
      //              console.log(val, oldVal);
    },
    defaultSelect: function (val, oldVal) {},
    activeDay: function (val, oldVal) {
      this.selectDay = this.activeDay
      this.initData(
        this.formatDay(
          this.selectDay.getFullYear(),
          this.selectDay.getMonth() + 1,
          this.selectDay.getDate()
        )
      )
    }
  },
  methods: {
    classObject: function (day) {
      let dayStr = this.formatDay(
        day.getFullYear(),
        day.getMonth() + 1,
        day.getDate()
      )
      let mActive = false
      for (let i = 0; i < this.monthDay.length; i++) {
        if (dayStr === this.monthDay[i]) {
          mActive = true
          break
        }
      }
      return {
        active:
          day.getFullYear() === this.selectDay.getFullYear() &&
          day.getMonth() === this.selectDay.getMonth() &&
          day.getDate() === this.selectDay.getDate(),
        monthActive: mActive
      }
    },
    initData: function (cur) {
      let date
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
      }
      //      console.log(date);
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      //      this.currentWeek = date.getDay(); // 1...6,0
      this.days.length = 0
      let firstStr = this.formatDate(this.currentYear, this.currentMonth, 1)
      let firstDate = new Date(firstStr)
      let firstWeek = firstDate.getDay()

      if (firstWeek === 0) {
        firstWeek = 7
      }

      for (let i = firstWeek; i > 0; i--) {
        let d = new Date(firstDate)
        d.setDate(d.getDate() - i)
        this.days.push(d)
      }

      for (let i = 0; i < 42 - firstWeek; i++) {
        let d = new Date(firstDate)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },
    pick: function (date, index) {
      const self = this

      if (!self.defaultSelect) {
        self.$emit('change', date)
        return
      }

      let d = new Date()
      let dateStr = self.formatDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
      let dStr = self.formatDate(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      )

      //  console.log(Date.parse(dateStr), Date.parse(dStr))
      if (Date.parse(dateStr) < Date.parse(dStr)) {
        return
      }

      if (
        date.getMonth() + 1 !== self.currentMonth &&
        Date.parse(dateStr) >= Date.parse(dStr)
      ) {
        let dayStr = self.formatDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
        self.initData(dayStr)
      }
      self.selectDay = date
      self.$emit('change', date)

      //  console.log(this.selectDay);
      //  alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    },
    pickPre: function (year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      const self = this

      let d = new Date()
      let dateStr = self.formatDate(year, month, 1)
      let dStr = self.formatDate(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      )

      if (Date.parse(dateStr) > Date.parse(dStr)) {
        var preDate = new Date(self.formatDate(year, month, 1))
        preDate.setDate(0)
        self.$emit('pickPre', preDate.getFullYear(), preDate.getMonth() + 1)
        self.initData(
          self.formatDate(preDate.getFullYear(), preDate.getMonth() + 1, 1)
        )
      }
    },
    pickNext: function (year, month) {
      const self = this
      var d = new Date(self.formatDate(year, month, 1))
      d.setDate(35)
      self.$emit('pickNext', d.getFullYear(), d.getMonth() + 1)
      self.initData(self.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    formatDate: function (year, month, day) {
      // 返回 类似 2016/01/02 格式的字符串
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '/' + m + '/' + d
    },
    formatDay: function (year, month, day) {
      // 返回 类似 2016-01-02 格式的字符串
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style scoped>
.calendar {
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;
  color: #737e8b;
  font-size: 14px;
}

ul {
  list-style-type: none;
  box-sizing: border-box;
}

.month {
  line-height: 0px;
  width: 100%;
  background: #fff;
}

.month ul {
  margin: 0;
  padding: 0;
  display: inline-block;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid #bfcbd9;
}

.year-month {
  display: inline;
  line-height: 42px;
  color: #25303d;
  font-size: 14px;
}

.month ul li {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0px;
  line-height: 42px;
}

.choose-month {
  text-align: center;
}

.arrow {
  padding: 0 12px;
}

.left {
  float: left;
}

.right {
  float: right;
}

.arrow:hover {
  color: #457bc7;
  cursor: pointer;
}

.month ul li.unActive:hover {
  cursor: not-allowed;
}

.weekdays {
  margin: 0;
  padding: 0;
  display: block;
  overflow: hidden;
}

.weekdays li {
  display: block;
  width: 14.2%;
  float: left;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 8px;
  line-height: 24px;
}

.days {
  padding: 0;
  margin: 0;
  display: block;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding: 6px;
  font-size: 14px;
  color: #48576a;
  box-sizing: border-box;
  line-height: 24px;
}

.days li span {
  display: block;
}

.days li.other-month,
.days li.unDate {
  padding: 5px;
  color: #bfcbd9;
}

.days li:hover {
  cursor: pointer;
  font-weight: 600;
}

.days li.unDate {
  cursor: not-allowed;
}

.days li.other-month:hover {
  color: #457bc7;
}

.days li.unActive:hover {
  cursor: not-allowed;
}

.days li.monthActive span {
  outline: 1px solid #43a800;
}

.days li.active span {
  background-color: #457bc7;
  outline-color: #457bc7;
  color: #fff;
}

.days li span.curActive {
  outline: 1px solid #457bc7;
}

.days li.active:hover {
  color: #fff;
}
</style>