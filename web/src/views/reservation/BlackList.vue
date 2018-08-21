<template>
  <div class="container"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading">
    <!-- <div class="main-container"> -->
      <h1 class="top-title">黑名单：</h1>
      <div class="search-content">
        <el-form ref="searchForm"
                 :model="searchForm"
                 :rules="searchRules"
                 label-width="90px"
                 size="medium"
                 class="searchInput">
          <el-row>
            <el-col :span="6">
              <el-form-item label="HIS号"
                            prop="patientHisid">
                <el-input v-model="searchForm.patientHisid"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者姓名"
                            prop="patientName">
                <el-input v-model="searchForm.patientName"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别"
                            label-width="90px"
                            prop="patientGender">
                <el-select v-model="searchForm.patientGender"
                           size="small"
                           placeholder="">
                  <el-option label="女"
                             value="女"></el-option>
                  <el-option label="男"
                             value="男"></el-option>
                  <el-option label="未知"
                             value="未知"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话"
                            prop="patientTel">
                <el-input v-model="searchForm.patientTel"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="search-btn center">
          <el-button type="primary"
                     size="small"
                     @click="search">确认</el-button>
          <el-button type="info"
                     size="small"
                     plain
                     @click="cancelForm('searchForm')">重置</el-button>
        </div>
      </div>

      <div class="info-table"
           style="margin-top:20px;margin-bottom:0">
        <el-table element-loading-text="拼命加载中"
                  tooltip-effect="light"
                  header-row-class-name="header-row-bgColor"
                  :row-class-name="cellRow"
                  highlight-current-row
                  :data="data"
                  border
                  style="width: 100%;"
                  ref="singleTable"
                  @current-change="handleSelectionChange">
          <el-table-column prop="patient_hisid"
                           label="HIS号"
                           width='100'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="Patient_Name"
                           label="患者姓名"
                           width='120'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_gender"
                           label="性别"
                           width="60"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_tel"
                           label="联系电话"
                           width='150'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <!--<el-table-column prop="Black_List_Id" label="唯一标识" width="60" :show-overflow-tooltip='true'>
          </el-table-column>-->
          <el-table-column prop="Black_State"
                           label="加黑状态"
                           width="90"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="Breack_Number"
                           label="爽约次数"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="Black_DateTime"
                           label="加黑时间"
                           width="180"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="empi"
                           label="empi"
                           width="110"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_idcard"
                           label="身份证号"
                           width="180"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="insuranceno"
                           label="社保卡号"
                           width="150"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="medical_card"
                           label="诊疗卡号"
                           width="150"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="180">
            <template slot-scope="scope">
              <el-button size="medium"
                         icon="el-icon-document"
                         type="text"
                         v-has="buttonResource.log"
                         @click="handleReservationLog(scope.$index, scope.row)">详情</el-button>
              <template v-if="scope.row.Black_State!='未加黑'">
                <el-button size="medium"
                           icon="el-icon-delete"
                           type="text"
                           v-has="buttonResource.cancelReservation"
                           @click="handleReservationDelete(scope.$index, scope.row)">解除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange"
                         layout="total, prev, pager, next"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         :total="totalCount">
          </el-pagination>
        </div>
      <!-- </div> -->
    </div>

    <!--查看日志-->
    <el-dialog title="查看日志"
               :visible.sync="dialogLogVisible"
               :close-on-click-modal="false"
               width="80%">
      <div class=""
           v-loading="querylogLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading">
        <p class="info-log">
          <span>患者姓名：{{logForm.patientName}}；</span>
          <span>性别：{{logForm.patientGender}}；</span>
          <span>联系电话：{{logForm.patientTel}}；</span>
        </p>

        <el-table tooltip-effect="light"
                  height="380"
                  max-height="380"
                  header-row-class-name="header-row-bgColor"
                  :row-class-name="cellRow"
                  highlight-current-row
                  :data="logData"
                  border
                  style="width: 100%;"
                  ref="singleTable">
          <el-table-column prop="reservation_id"
                           label="预约标识"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="operate_user_id"
                           label="操作人"
                           width="100"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="operate_dateTime"
                           label="操作时间"
                           width="150"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="operate_Reason"
                           label="操作原因"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="cancel_black"
                           label="取消标识"
                           width="120"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="cancel_Datetime"
                           label="取消时间"
                           width="120"
                           :show-overflow-tooltip='true'>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="medium"
                   @click="dialogLogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--查看日志end-->

  </div>
</template>

<script>
import { buttonResource } from '../../assets/js/reservation-common.js'
import lwCalendar from './calendar.vue'
let myMixin = {
  data: function () {
    return {
      buttonResource
    }
  }
}

export default {
  mixins: [myMixin],
  components: {
    lwCalendar
  },
  data () {
    return {
      tableData: [],
      tableLogData: [],
      multipleSelection: [],
      singleSelection: {},
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      currentPageLog: 1,
      pageSizeLog: 10,
      totalCountLog: 0,
      loading: false,
      querylogLoading: false,
      createLoading: false,
      dialogLogVisible: false,
      patient_age_type: '岁',
      searchForm: {
        patientName: '',
        patientGender: '',
        patientTel: '',
        patientHisid: ''
      },
      logForm: {
        patientName: '',
        patientGender: '',
        patientTel: ''
      },
      searchRules: {
        patientName: [],
        patientGender: [],
        patientTel: [],
        patientHisid: []
      }
    }
  },
  created () {
    const self = this
    let param = {}
    param.pageSize = self.pageSize
    param.page = self.currentPage
    // self.loading = true
    // self.getData(param)
  },
  computed: {
    data () {
      const self = this
      return self.tableData
    },
    logData () {
      return this.tableLogData
    }
  },
  methods: {
    cellRow ({ row, index }) {
      if (row.reserva_state === '已取消') {
        return 'unState-cell-row'
      }
      if (row.reserva_state === '已登记') {
        return 'doState-cell-row'
      }
      if (row.reserva_state === '已检查') {
        return 'doneState-cell-row'
      }
      return 'isState-cell-row'
    },
    search () {
      let param = {}
      param.pageSize = this.pageSize
      this.currentPage = 1
      param.page = this.currentPage
      param.patientName = this.searchForm.patientName
      param.patient_tel = this.searchForm.patient_tel
      param.patientGender = this.searchForm.patientGender
      param.patientHisid = this.searchForm.patientHisid
      this.loading = true
      this.getData(param)
    },
    handleReservationLog (index, row) {
      const self = this
      self.dialogLogVisible = true
      self.tableLogData = []
      self.logForm.patientName = row.Patient_Name ? row.Patient_Name : ' '
      self.logForm.patientGender = row.patient_gender
        ? row.patient_gender
        : ' '
      self.logForm.patientTel = row.patient_tel ? row.patient_tel : ' '
      let param = {}
      param.blackListId = row.Black_List_Id
      self.queryReservationLog(param)
    },
    queryReservationLog (param) {
      const self = this
      self.querylogLoading = true
      self.$apis.BlackList.blackListTrackInfo(param)
        .then(res => {
          self.querylogLoading = false
          if (res.data.code === 200) {
            self.tableLogData = res.data.data
          } else {
            self.$message({
              showClose: true,
              message: '' + res.data.message,
              type: 'warning'
            })
          }
        })
        .catch(function () {
          self.querylogLoading = false
        })
    },
    handleReservationDelete (index, row) {
      // 取消预约
      const self = this
      self
        .$confirm('是否解除该黑名单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let params = {}
          params.blackListId = row.Black_List_Id
          self.$apis.BlackList.removeBlack(params)
            .then(res => {
              if (res.data.code === 203) {
                self.$message({
                  message: '' + res.data.message,
                  type: 'success'
                })
                let param = {}
                param.pageSize = self.pageSize
                param.page = self.currentPage
                param.patientName = self.searchForm.patientName
                param.patient_tel = self.searchForm.patient_tel
                param.patientGender = self.searchForm.patientGender
                param.patientHisid = self.searchForm.patientHisid
                self.loading = true
                self.getData(param)
              } else {
                self.$message({
                  message: '' + res.data.message,
                  type: 'info'
                })
              }
            })
            .catch(function () {
              self.$message.error('取消预约失败')
            })
        })
        .catch(() => {})
    },
    handleSelectionChange (val) {
      this.singleSelection = val
    },
    handleCurrentChange (val) {
      // 选择页码
      this.currentPage = val
      let param = {}
      param.pageSize = this.pageSize
      param.page = this.currentPage
      param.patientName = this.searchForm.patientName
      param.patient_tel = this.searchForm.patient_tel
      param.patientGender = this.searchForm.patientGender
      param.patientHisid = this.searchForm.patientHisid
      this.loading = true
      this.getData(param)
    },
    getData (param) {
      const self = this
      self.$apis.BlackList.blackListInfo(param)
        .then(res => {
          self.loading = false
          if (res.data.code === 200) {
            self.tableData = res.data.data.data
            self.totalCount = res.data.data.total
          } else {
            self.tableData = []
            self.totalCount = 0
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
          self.totalCount = 0
        })
    },
    cancelForm (formName) {
      const self = this
      self.tableData = []
      self.currentPage = 1
      self.pageSize = 10
      self.totalCount = 0
      self.reset(formName)
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

<style scoped>

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: #eef1f6;
  border-right: solid 1px #e1e4e8;
}

.el-menu-item.is-active {
  color: #457bc7;
}

.el-menu-item {
  font-size: 14px;
  color: #768394;
}

.el-menu {
  border-right: none;
  background-color: #eef1f6;
}

.info-log {
  font-size: 16px;
  margin-top: -22px;
  color: #48576a;
}

.info-log span {
  margin-right: 8px;
}
</style>