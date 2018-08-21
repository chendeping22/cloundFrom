// 返回 类似 2017-01-02 格式的字符串
function formatDate (year, month, day) {
  var y = year
  var m = month
  if (m < 10) m = '0' + m
  var d = day
  if (d < 10) d = '0' + d
  return y + '-' + m + '-' + d
}
// 返回 类似 2017/01/02 格式的字符串
function formatDay (year, month, day) {
  var y = year
  var m = month
  if (m < 10) m = '0' + m
  var d = day
  if (d < 10) d = '0' + d
  return y + '/' + m + '/' + d
}

// 返回 类似 2017-01格式的字符串
function formatMonthDay (year, month) {
  var y = year
  var m = month
  if (m < 10) m = '0' + m
  return y + '-' + m
}

// 2017-01-02 格式转换为2017/01/02的字符串z
function createDate (dataString) {
  if (
    dataString &&
    Object.prototype.toString.call(dataString) === '[object String]'
  ) {
    dataString = dataString.replace(/-/g, '/')
  }
  return dataString
}

// 返回 类似 01:02 格式的时段字符串
function formatTime (hours, minutes) {
  var h = hours
  var m = minutes
  if (h < 10) h = '0' + h
  if (m < 10) m = '0' + m
  return h + ':' + m
}

// 判断是否为数组
function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

// 判断是否为对象
function isObject (o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

function isEmptyObject (e) {
  var t
  for (t in e) return !1
  return !0
}

// 深拷贝
function deepcopy (source) {
  if (!source) {
    return source
  }
  let sourceCopy = isArray(source) ? [] : {}
  for (let item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

// 用户基本信息
const userInfos = {
  loginKey: '',
  userid: '',
  institutionId: '',
  username: '',
  institutionName: '',
  patientInfo: {}
}

// 按钮资源权限
const buttonResource = {
  editRerservation: '3',
  cancelReservation: '4',
  rePrint: '5',
  log: '6',
  exportData: '8'
}

function setStorage (key, value) {
  localStorage.setItem(key, value)
}

function getStorage (key) {
  return localStorage.getItem(key)
}

function clearStorage () {
  localStorage.clear()
}

export {
  formatDate,
  isArray,
  isObject,
  isEmptyObject,
  formatTime,
  createDate,
  formatMonthDay,
  formatDay,
  deepcopy,
  userInfos,
  setStorage,
  getStorage,
  clearStorage,
  buttonResource
}
