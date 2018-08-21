<template>
  <div class="container"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading">
    <h1 class="top-title">预约申请明细：</h1>
    <div class="search-content">
      <el-form ref="searchForm"
               :model="searchForm"
               :rules="searchRules"
               label-width="90px"
               size="medium"
               class="searchInput">
        <el-row>
          <el-col :span="10">
            <el-form-item label="预约时间"
                          prop="dateRange">
              <el-date-picker v-model="searchForm.dateRange"
                              size="small"
                              type="daterange"
                              unlink-panels
                              :editable="false"
                              :clearable="false"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :picker-options="pickerOptions"
                              style="width:100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="申请医院"
                          prop="from_institution_id">
              <el-select v-model="searchForm.from_institution_id"
                         size="small"
                         filterable
                         placeholder="请选择申请医院"
                         @change="getStudykindData(searchForm.from_institution_id)">
                <el-option label=""
                           value="">
                </el-option>
                <el-option v-for="item in requestInstitutionData"
                           :key="item.INSTITUTION_ID"
                           :label="item.INSTITUTION_NAME"
                           :value="item.INSTITUTION_ID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="检查医院"
                          prop="to_institution_id">
              <el-select v-model="searchForm.to_institution_id"
                         size="small"
                         filterable
                         placeholder="请选择接收医院">
                <el-option label=""
                           value="">
                </el-option>
                <el-option v-for="item in reserveInstitutionData"
                           :key="item.INSTITUTION_ID"
                           :label="item.INSTITUTION_NAME"
                           :value="item.INSTITUTION_ID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检查类型"
                          prop="studykind_id">
              <el-select v-model="searchForm.studykind_id"
                         size="small"
                         placeholder="请选择检查类型"
                         @change="getBodyPartData(searchForm.studykind_id)">
                <el-option label=""
                           value="">
                </el-option>
                <el-option v-for="item in studyKindData"
                           :key="item.STUDYKIND_ID"
                           :label="item.STUDYKIND_NAME"
                           :value="item.STUDYKIND_ID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查项目"
                          prop="check_site">
              <el-select v-model="searchForm.check_site"
                         size="small"
                         filterable
                         placeholder="请选择检查部位"
                         :filter-method="filterMethod">
                <el-option label=""
                           value="">
                </el-option>
                <el-option v-for="item in bodyPartData"
                           :key="item.BODYPART_ID"
                           :label="item.BODYPART_NAME"
                           :value="item.BODYPART_NAME">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="search-btn center">
        <el-button type="primary"
                   size="small"
                   @click="search">确认</el-button>
        <el-button type="primary"
                   size="small"
                   v-has="buttonResource.exportData"
                   @click="exportXLSX">导出数据</el-button>
        <el-button  size="small"
                   @click="cancelForm('searchForm')">重置</el-button>
      </div>
    </div>
    <div class="info-table"
         style="margin-top:20px;margin-bottom:0">
      <el-table ref="multipleTable"
                tooltip-effect="light"
                header-row-class-name="header-row-bgColor"
                row-class-name="cell-row"
                highlight-current-row
                :data="data"
                border
                style="width: 100%;"
                @selection-change="handleSelectionChange">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <!--<el-table-column prop="INSTITUTION_ID" label="机构ID" width="210">
				</el-table-column>-->
        <el-table-column prop="patient_name"
                         label="病人姓名"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="patient_age"
                         label="年龄"
                         width='70'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="patient_gender"
                         label="性别"
                         width='50'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="patient_hisid"
                         label="病人HIS号"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="study_source"
                         label="病人来源"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="receive_institution_name"
                         label="检查医院 "
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="check_site"
                         label="检查项目"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column label="预约时间"
                         width='200'
                         :formatter="reservationTimeFormatter"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="apply_institution_name"
                         label="申请医院"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="clinic_doctor"
                         label="申请医生 "
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="apply_time"
                         label="申请时间"
                         width='180'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <!--<el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">{{ handleHideRecordBtn(scope.$index, scope.row) }}</el-button>
            </template>
          </el-table-column>-->
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange"
                       layout="total, prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatDate,
  createDate,
  isArray,
  formatTime,
  buttonResource, 
  userInfos
} from '../../assets/js/reservation-common.js'
let myMixin = {
  data: function () {
    return {
      buttonResource
    }
  }
}
export default {
  mixins: [myMixin],
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      singleSelection: {},
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false,
      requestInstitutionData: [],
      reserveInstitutionData: [],
      bodyPartData: [],
      list: [],
      studyKindData: [],
      dateRange: [new Date(), new Date()],
      pickerOptions: {
        shortcuts: [
          {
            text: '当天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 2)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      searchForm: {
        begin_time: '',
        end_time: '',
        from_institution_id: '',
        to_institution_id: '',
        studykind_id: '',
        check_site: '',
        dateRange: [new Date(), new Date()]
      },
      searchRules: {
        from_institution_id: [],
        to_institution_id: [],
        studykind_id: [],
        check_site: [],
        dateRange: []
      }
    }
  },
  created () {
    const self = this
    let param = {}
    param.pageSize = self.pageSize
    param.page = self.currentPage
    param.begin_time = formatDate(
      self.searchForm.dateRange[0].getFullYear(),
      self.searchForm.dateRange[0].getMonth() + 1,
      self.searchForm.dateRange[0].getDate()
    )
    param.end_time = formatDate(
      self.searchForm.dateRange[1].getFullYear(),
      self.searchForm.dateRange[1].getMonth() + 1,
      self.searchForm.dateRange[1].getDate()
    )
    param.stat_SP_name = 'stat_StatisticsPatientDetail'
    param.action = 1
    // self.getData(param)
    // self.getStudyData()
    // self.getBodyPartData('')
    // self.getInstitutionData(function (res) {
    //   if (res.data.code === 200) {
    //     self.requestInstitutionData = res.data.data
    //     self.reserveInstitutionData = res.data.data
    //   }
    // })
  },
  computed: {
    data () {
      const self = this
      return self.tableData
    }
  },
  methods: {
    filterMethod (query) {
      if (query !== '') {
        if (this.searchForm.check_site === query) {
          return
        }
        this.bodyPartData = this.list.filter(item => {
          return (
            item.BODYPART_NAME.toLowerCase().indexOf(query.toLowerCase()) >
              -1 ||
            (item.BODYPART_INITIALS &&
              item.BODYPART_INITIALS.toLowerCase().indexOf(
                query.toLowerCase()
              ) > -1)
          )
        })
      } else {
        this.bodyPartData = this.list
      }
    },
    getInstitutionData (callback) {
      // 获取机构类型
      this.$apis.Institution.all({
        hideRecord: 1
      })
        .then(callback)
        .catch(function () {})
    },
    getStudykindData (param) {
      // 根据机构获取检查类型
      const self = this
      self.searchForm.studykind_id = ''
      self.searchForm.check_site = ''
      self.studyKindData = []
      self.bodyPartData = []
      if (param) {
        self.getStudykind(param, function (res) {
          if (res.data.code === 200) {
            for (let item of res.data.data) {
              self.studyKindData.push(item[0])
            }
          }
        })
      } else {
        self.getStudyData()
      }
      self.getBodyPartData('')
    },
    getStudykind (param, callback) {
      this.$apis.Institution.search({
        institutionId: param,
        hideRecord: 1
      })
        .then(callback)
        .catch(function () {})
    },
    getStudyData () {
      // 获取检查类型
      const self = this
      self.$apis.StudyKind.all({
        hideRecord: 1
      }).then(res => {
        if (res.data.code === 200) {
          self.studyKindData = res.data.data
        }
      })
      .catch(function () {})
    },
    getBodyPartData (param) {
      // 根据检查类型获取检查部位
      const self = this
      self.searchForm.check_site = ''
      self.bodyPartData = []
      self.getBodyPart(param, function (res) {
        // 获取检查部位
        if (res.data.code === 200) {
          self.bodyPartData = res.data.data
          self.list = self.bodyPartData.map(function (item) {
            return item
          })
        }
      })
    },
    getBodyPart (param, callback) {
      this.$apis.BodyPart.get({
        studykindId: param,
        hideRecord: 1
      }).then(callback)
        .catch(function () {})
    },
    handleCurrentChange (val) {
      // 选择页码
      this.currentPage = val
      let param = {}
      param.pageSize = this.pageSize
      param.page = this.currentPage
      param.begin_time = formatDate(
        this.searchForm.dateRange[0].getFullYear(),
        this.searchForm.dateRange[0].getMonth() + 1,
        this.searchForm.dateRange[0].getDate()
      )
      param.end_time = formatDate(
        this.searchForm.dateRange[1].getFullYear(),
        this.searchForm.dateRange[1].getMonth() + 1,
        this.searchForm.dateRange[1].getDate()
      )
      param.from_institution_id = this.searchForm.from_institution_id
      param.to_institution_id = this.searchForm.to_institution_id
      param.studykind_id = this.searchForm.studykind_id
      param.check_site = this.searchForm.check_site
      param.stat_SP_name = 'stat_StatisticsPatientDetail'
      param.action = 1
      this.getData(param)
    },
    getData (param) {
      const self = this
      self.loading = true
      self.$apis.getStatistics(param)
        .then(res => {
          self.loading = false
          if (res.data.code === 200) {
            if (isArray(res.data.data.data)) {
              self.tableData = res.data.data.data
              self.totalCount = res.data.data.total
            } else {
              self.tableData = []
            }
          } else {
            self.tableData = []
            self.$message({
              showClose: true,
              message: '' + res.data.message,
              type: 'warning'
            })
          }
        })
        .catch(function () {
          self.loading = false
          self.tableData = []
        })
    },
    exportXLSX () {
      // 导出数据
      let loginKey = userInfos.loginKey
      if (!loginKey) {
        return
      }
      const self = this
      let param = {}
      param.begin_time = formatDate(
        self.searchForm.dateRange[0].getFullYear(),
        self.searchForm.dateRange[0].getMonth() + 1,
        self.searchForm.dateRange[0].getDate()
      )
      param.end_time = formatDate(
        self.searchForm.dateRange[1].getFullYear(),
        self.searchForm.dateRange[1].getMonth() + 1,
        self.searchForm.dateRange[1].getDate()
      )
      param.from_institution_id = self.searchForm.from_institution_id
      param.to_institution_id = self.searchForm.to_institution_id
      param.studykind_id = self.searchForm.studykind_id
      param.check_site = self.searchForm.check_site
      param.stat_SP_name = 'stat_StatisticsPatientDetail'
      param.action = 2
      param.loginKey = loginKey
      let url = self.$apis.statisticsUrl
      let a = document.createElement('a')
      let arr = []
      arr.push(url, '?')
      for (let o in param) {
        arr.push(o, '=', param[o], '&')
      }
      arr.pop()
      a.href = arr.join('')
      a.click()
    },
    search () {
      // 搜索查询
      let param = {}
      this.currentPage = 1
      param.pageSize = this.pageSize
      param.page = this.currentPage
      param.begin_time = formatDate(
        this.searchForm.dateRange[0].getFullYear(),
        this.searchForm.dateRange[0].getMonth() + 1,
        this.searchForm.dateRange[0].getDate()
      )
      param.end_time = formatDate(
        this.searchForm.dateRange[1].getFullYear(),
        this.searchForm.dateRange[1].getMonth() + 1,
        this.searchForm.dateRange[1].getDate()
      )
      param.from_institution_id = this.searchForm.from_institution_id
      param.to_institution_id = this.searchForm.to_institution_id
      param.studykind_id = this.searchForm.studykind_id
      param.check_site = this.searchForm.check_site
      param.stat_SP_name = 'stat_StatisticsPatientDetail'
      param.action = 1
      this.getData(param)
    },
    reservationTimeFormatter (row, column) {
      if (row.begin_time && row.end_time) {
        let beginStr = createDate(row.begin_time)
        let endStr = createDate(row.end_time)
        let b = new Date(beginStr)
        let e = new Date(endStr)
        let beginDate = formatDate(
          b.getFullYear(),
          b.getMonth() + 1,
          b.getDate()
        )
        let beginTime = formatTime(b.getHours(), b.getMinutes())
        let endTime = formatTime(e.getHours(), e.getMinutes())
        let arr = []
        arr.push(beginDate, beginTime, '-', endTime)
        return arr.join(' ')
      } else {
        return ''
      }
    },
    handleSelectionChange (val) {
      this.singleSelection = val
    },
    cancelForm (formName) {
      // 取消编辑机构
      this.tableData = []
      this.currentPage = 1
      this.pageSize = 10
      this.totalCount = 0
      this.reset(formName)
    },
    reset (form) {
      // 重置表单
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style scoped>
@import '../../../static/reservation/css/reservation-common.css';
</style>