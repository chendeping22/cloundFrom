<template>
  <div class="container"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading">
       <h1 class="top-title">预约查询：</h1>
      <div class="search-content">
        <el-form ref="searchForm"
                 :model="searchForm"
                 :rules="searchRules"
                 label-width="90px"
                 size="medium"
                 class="searchInput">
          <el-row>
            <el-col :span="6">
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
              <el-form-item label="检查类型"
                            prop="studykind_id">
                <el-select v-model="searchForm.studykind_id"
                           size="small"
                           placeholder="请选择">
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
              <el-form-item label="预约状态"
                            prop="reserva_state">
                <el-select v-model="searchForm.reserva_state"
                           size="small"
                           placeholder="请选择">
                  <el-option label=""
                             value="">
                  </el-option>
                  <el-option label="已预约"
                             value="已预约">
                  </el-option>
                  <el-option label="已登记"
                             value="已登记">
                  </el-option>
                  <el-option label="已检查"
                             value="已检查">
                  </el-option>
                  <el-option label="已取消"
                             value="已取消">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="HIS号"
                            prop="patient_hisid">
                <el-input v-model="searchForm.patient_hisid"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="患者姓名"
                            prop="patient_name">
                <el-input v-model="searchForm.patient_name"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话"
                            prop="patient_tel">
                <el-input v-model="searchForm.patient_tel"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="门诊/住院号"
                            prop="study_patient_in">
                <el-input v-model="searchForm.study_patient_in"
                          size="small"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="申请医院"
                            prop="form_institution_id">
                <el-select v-model="searchForm.form_institution_id"
                           size="small"
                           filterable
                           placeholder="请输入申请医院">
                  <el-option label=""
                             value="">
                  </el-option>
                  <template v-for="item in requestInstitutionData">
                    <template v-if="item.HIDE_RECORD">
                      <el-option :key="item.INSTITUTION_ID"
                                 :label="item.INSTITUTION_NAME"
                                 :value="item.INSTITUTION_ID">
                      </el-option>
                    </template>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="检查医院"
                            prop="to_institution_id">
                <el-select v-model="searchForm.to_institution_id"
                           size="small"
                           filterable
                           placeholder="请输入接收医院">
                  <el-option label=""
                             value="">
                  </el-option>
                  <template v-for="item in reserveInstitutionData">
                    <template v-if="item.HIDE_RECORD">
                      <el-option :key="item.INSTITUTION_ID"
                                 :label="item.INSTITUTION_NAME"
                                 :value="item.INSTITUTION_ID">
                      </el-option>
                    </template>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">
              <el-form-item label="检查科室">
                <el-select v-model="searchForm.studykind_id" placeholder="请选择">
                  <el-option v-for="item in reserveDepartmentData" :key="item.DEPARTMENT_ID" :label="item.DEPARTMENT_NAME" :value="item.DEPARTMENT_ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>-->

            <!--<el-col :span="6">
              <el-form-item label="申请科室" prop="clinic_department">
                <el-select v-model="searchForm.clinic_department" size="small" placeholder="请选择">
                  <el-option label="" value="">
                  </el-option>
                  <el-option v-for="item in requestDepartmentData" :key="item.DEPARTMENT_ID" :label="item.DEPARTMENT_NAME" :value="item.DEPARTMENT_ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="6">
              <el-form-item label="申请医生"
                            prop="clinic_doctor">
                <el-input v-model="searchForm.clinic_doctor"
                          size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="search-btn center">
          <el-button type="primary"
                     size="small"
                     @click="search">确认</el-button>
          <el-button 
                     size="small"
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
                  @current-change="handleSelectionChange"
                  @row-click="handleRowChange">
          <el-table-column prop="patient_name"
                           label="患者姓名"
                           width="120"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_gender"
                           label="性别"
                           width="60"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_age"
                           label="年龄"
                           width="70"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="study_source"
                           label="病人来源"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_tel"
                           label="联系电话"
                           width='120'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="study_patient_in"
                           label="门诊/住院号"
                           width="110"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="check_site"
                           label="检查项目"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="studykind_name"
                           label="检查类型"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="to_institution_name"
                           label="检查医院"
                           width='150'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="reservationTime"
                           label="预约时间"
                           width='200'
                           :formatter="reservationTimeFormatter"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="reserva_state"
                           label="预约状态"
                           width='90'
                           :show-overflow-tooltip='true'>
            <template slot-scope="scope">
              <template v-if="scope.row.reserva_state=='已预约'">
                <i class="isState"></i>
              </template>
              <template v-else-if="scope.row.reserva_state=='已取消'">
                <i class="unState"></i>
              </template>
              <template v-else-if="scope.row.reserva_state=='已登记'">
                <i class="doState"></i>
              </template>
              <template v-else-if="scope.row.reserva_state=='已检查'">
                <i class="doneState"></i>
              </template>
              <template v-else>
                <i class="unState"></i>
              </template>
              <span style="margin-left: 8px">{{ scope.row.reserva_state }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fee"
                           label="费用"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="from_institution_name"
                           label="申请医院"
                           width='150'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="clinic_doctor"
                           label="申请医生"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="clinic_department"
                           label="申请科室"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="fee_kind"
                           label="收费状态"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="requestid"
                           label="申请单号"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_home_addr"
                           label="家庭住址"
                           width='200'
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="accompany_equipment"
                           label="陪检设备"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="bed_no"
                           label="床号"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="patient_class"
                           label="病人类型"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="medical_recordsno"
                           label="病历号"
                           width="100"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="260">
            <template slot-scope="scope">
              <template v-if="scope.row.reserva_state=='已预约'">
                <el-button size="medium"
                           icon="el-icon-edit-outline"
                           type="text"
                           v-has="buttonResource.editRerservation"
                           @click="handleReservationUpdate(scope.$index, scope.row)">修改</el-button>
                <el-button size="medium"
                           icon="el-icon-delete"
                           type="text"
                           v-has="buttonResource.cancelReservation"
                           @click="handleReservationDelete(scope.$index, scope.row)">取消</el-button>
                <el-button size="medium"
                           icon="el-icon-printer"
                           type="text"
                           v-has="buttonResource.rePrint"
                           @click="printReservation(scope.$index, scope.row)">重打</el-button>
                <el-button size="medium"
                           icon="el-icon-document"
                           type="text"
                           v-has="buttonResource.log"
                           @click="handleReservationLog(scope.$index, scope.row)">日志</el-button>
              </template>
              <!--<template v-else>
                <el-button size="medium" icon="el-icon-date" type="text" @click="handleReservation(scope.$index, scope.row)">预约</el-button>
              </template>-->
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
      </div>

    <!--修改预约-->
    <el-dialog title="修改预约"
               width='800px'
               :visible.sync="dialogEditVisible"
               :close-on-click-modal="false"
               :lock-scroll="false">
      <div v-loading="createLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading">
        <el-form :model="updateForm"
                 :rules="rules"
                 ref="updateForm"
                 label-width="80px"
                 class="dialogForm"
                 size="medium">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="检查医院"
                            prop="institutionId">
                <el-select v-model="updateForm.institutionId"
                           size="small"
                           filterable
                           placeholder="请选择检查机构"
                           @change="getStudykindUpdateData(updateForm.institutionId)">
                  <template v-for="item in institutionUpdateData">
                    <template v-if="item.HIDE_RECORD">
                      <el-option :key="item.INSTITUTION_ID"
                                 :label="item.INSTITUTION_NAME"
                                 :value="item.INSTITUTION_ID"
                                 @click.native='getInstitutionName(item.INSTITUTION_NAME)'>
                      </el-option>
                    </template>
                    <template v-else>
                      <el-option :key="item.INSTITUTION_ID"
                                 :label="item.INSTITUTION_NAME"
                                 :value="item.INSTITUTION_ID"
                                 :disabled="optionFormatter(item.HIDE_RECORD)"
                                 class="hide">
                      </el-option>
                    </template>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查类型"
                            prop="studykindId">
                <el-select v-model="updateForm.studykindId"
                           size="small"
                           :disabled="studykindId_disabled"
                           filterable
                           placeholder="请选择检查类型">
                  <template v-for="item in studyKindUpdateData">
                    <template v-if="item.HIDE_RECORD">
                      <el-option :key="item.STUDYKIND_ID"
                                 :label="item.STUDYKIND_NAME"
                                 :value="item.STUDYKIND_ID"
                                 @click.native='getStudyUpdateData(item)'>
                      </el-option>
                    </template>
                    <template v-else>
                      <el-option :key="item.STUDYKIND_ID"
                                 :label="item.STUDYKIND_NAME"
                                 :value="item.STUDYKIND_ID"
                                 :disabled="optionFormatter(item.HIDE_RECORD)"
                                 class="hide">
                      </el-option>
                    </template>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="检查项目"
                            prop="bodypartId">
                <el-select v-model="updateForm.bodypartId"
                           size="small"
                           :disabled="bodypartDictionary_disabled"
                           filterable
                           placeholder="请选择检查项目"
                           :filter-method="filterMethod">
                  <template v-for="item in bodyPartUpdateData">
                    <el-option :key="item.BODYPART_ID"
                               :label="item.BODYPART_NAME"
                               :value="item.BODYPART_NAME">
                    </el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扫描方式"
                            prop="dictionaryId">
                <el-select v-model="updateForm.dictionaryId"
                           size="small"
                           :disabled="bodypartDictionary_disabled"
                           filterable
                           placeholder="请选择扫描方式">
                  <template v-for="item in dictionaryIdUpdateData">
                    <el-option :key="item.dictionaryValue"
                               :label="item.dictionaryValue"
                               :value="item.dictionaryValue">
                    </el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="末次月经"
                            prop="last_menstrual"
                            :class={sexControl:womanData}>
                <el-date-picker v-model="updateForm.last_menstrual"
                                size="small"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                @change="getComputedData(updateForm)"
                                :editable="false"
                                :clearable="false"
                                :picker-options="pickerOptionsMenstrual"
                                class="menstrual">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="孕周"
                            prop="pregnancy_days"
                            :class={sexControl:womanData}>
                <el-input v-model="updateForm.pregnancy_days"
                          size="small"
                          disabled
                          class="pregnant-week"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="date-calendar">
                <lw-calendar @change="selectUpdateDate"
                             @pickPre="selectUpdateMonthPre"
                             @pickNext="selectUpdateMonthNext"
                             :monthDay="monthDayData"
                             :defaultSelect="daySelect"
                             :activeDay="selectUpdateDay"></lw-calendar>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="time-box">
                <h1 class="time-title">
                  <span id="choseTime">{{ reservationUpdateDate }}</span>
                  <strong>0/10=已预约号源/总号源</strong>
                </h1>
                <div style="height: 250px; overflow: auto;">
                  <template v-if="registTimeCountUpdateData.length==0">
                    <div class="registTimeCountData"> 暂无数据</div>
                  </template>
                  <template v-for="(item,index) in registTimeCountUpdateData">
                    <el-col :key="index"
                            :span="6">
                      <div class="time-item"
                           :class="{active:index==selectUpdateActive}"
                           @click="selectRegistTimeCountUpdate(item,index)">
                        <p id="timeInterval">{{item.beginTime}}-{{item.endTime}}</p>
                        <span id="numSource">{{item.reservationCount}}/{{item.maxCount}}</span>
                        <i class="select-state"></i>
                      </div>
                    </el-col>
                  </template>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   @click="submitUpdateForm('updateForm')">确 定</el-button>
        <el-button size="medium"
                   @click="cancelReservationForm('updateForm')">取 消</el-button>
      </div>
    </el-dialog>
    <!--修改预约end-->

    <!--手工预约信息提醒-->
    <el-dialog title="信息提醒"
               :visible.sync="dialogUpdateVisible"
               :close-on-click-modal="false"
               width="370px">
      <div class="message-wrap">
        <div class="message-title">
          <i class="el-icon-circle-check-outline"></i>恭喜您预约成功
        </div>
        <p class="message-content">
          <!--预约人：{{updateForm.patient_name}}；联系电话：{{updateForm.patient_tel}}；检查医院：{{institutionName}}；检查类型：{{studyKindName}}；检查项目：{{updateForm.bodypartId?updateForm.bodypartId:'无'}}；扫描方式：{{updateForm.dictionaryId?updateForm.dictionaryId:'无'}}；-->
          预约检查时间：{{reservationUpdateDate}} {{registCacheTimeUpdateCount.beginTime}}-{{registCacheTimeUpdateCount.endTime}}
        </p>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   @click="closeMessage">关闭并打印</el-button>
        <!-- <el-button @click="dialogUpdateVisible=false" size="medium">继续预约</el-button>-->
      </div>
    </el-dialog>
    <!--手工预约信息提醒end-->

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
          <span>患者姓名：{{logForm.patient_name}}；</span>
          <span>年龄：{{logForm.patient_age}}；</span>
          <span>性别：{{logForm.patient_gender}}；</span>
          <span>检查类型：{{logForm.studykind_name}}；</span>
          <span>检查项目：{{logForm.check_site}}</span>
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
          <el-table-column prop="user_name"
                           label="医生名称"
                           width="120"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="log_content"
                           label="日志内容"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="log_type"
                           label="预约状态"
                           width="100"
                           :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="save_time"
                           label="操作时间"
                           width="150"
                           :show-overflow-tooltip='true'>
          </el-table-column>
        </el-table>
        <!--<div class="pagination">
          <el-pagination @current-change="handleCurrentChangeLog" layout="total, prev, pager, next" :current-page="currentPageLog" :page-size="pageSizeLog" :total="totalCountLog">
          </el-pagination>
        </div>-->
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="medium"
                   @click="dialogLogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--查看日志end-->

    <!--打印预约单-->
    <iframe id="myframe"
            style="width: 0; height: 0;">
      <p>你的浏览器不支持iframes。</p>
    </iframe>
    <!--打印预约单end-->
  </div>
</template>

<script>
// import { buttonResource, userInfos } from '../../utils/auth'
import {
  formatDate,
  formatDay,
  createDate,
  formatMonthDay,
  isArray,
  formatTime,
  userInfos,
  buttonResource
} from '../../assets/js/reservation-common.js'
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
    let currectDate = new Date()
    return {
      activeNames: ['1'],
      tableData: [],
      womanData: false,
      tableLogData: [],
      multipleSelection: [],
      singleSelection: {},
      searchWord: '',
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
      dialogUpdateVisible: false,
      dialogEditVisible: false,
      requestInstitutionData: [],
      reserveInstitutionData: [],
      studyKindData: [],
      // reserveDepartmentData: [],
      // requestDepartmentData: [],
      studykindId_disabled: true,
      bodypartDictionary_disabled: true,
      institutionUpdateData: [],
      studyKindUpdateData: [],
      bodyPartUpdateData: [],
      bodyPartUpdateDataList: [],
      dictionaryIdUpdateData: [],
      patient_age_type: '岁',
      updateMonthDay: formatMonthDay(
        currectDate.getFullYear(),
        currectDate.getMonth() + 1
      ),
      reservationUpdateDate: formatDate(
        currectDate.getFullYear(),
        currectDate.getMonth() + 1,
        currectDate.getDate()
      ),
      registTimeCountUpdateData: [],
      monthDay: [],
      selectUpdateDay: currectDate,
      daySelect: false,
      registTimeUpdateCount: {},
      registCacheTimeUpdateCount: {},
      cacheTimeUpdateCount: {},
      reservationTime: '',
      selectUpdateActive: -1,
      patient_id: '',
      reservation_id: '',
      studyKindName: '',
      patient_gender: '',
      institutionName: '',
      pickerOptionsMenstrual: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
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
        patient_name: '',
        patient_tel: '',
        form_institution_id: '',
        to_institution_id: '',
        studykind_id: '',
        reserva_state: '',
        //        clinic_department: '',
        clinic_doctor: '',
        patient_id: '',
        patient_hisid: '',
        study_patient_in: '',
        dateRange: [new Date(), new Date()]
      },
      updateForm: {
        institutionId: '',
        bodypartId: '',
        studykindId: '',
        dictionaryId: '',
        reservation_id: '',
        patient_id: '',
        patient_name: '',
        patient_tel: '',
        last_menstrual: '',
        pregnancy_days: ''
      },
      logForm: {
        patient_name: '',
        patient_gender: '',
        patient_age: '',
        studykind_name: '',
        check_site: ''
      },
      searchRules: {
        patient_name: [],
        patient_tel: [],
        form_institution_id: [],
        to_institution_id: [],
        studykind_id: [],
        reserva_state: [],
        //        clinic_department: [],
        clinic_doctor: [],
        patient_hisid: [],
        study_patient_in: [],
        dateRange: []
      },
      rules: {
        institutionId: [
          {
            required: true,
            message: '请选择机构',
            trigger: 'blur'
          }
        ],
        studykindId: [
          {
            required: true,
            message: '请选择检查类型',
            trigger: 'blur'
          }
        ],
        bodypartId: [
          {
            required: true,
            message: '请选择检查项目',
            trigger: 'blur'
          }
        ],
        dictionaryId: []
      },
      editorContent: ''
    }
  },
  created () {
    const self = this
    let param = {}
    let curDate = new Date()
    param.pageSize = self.pageSize
    param.page = self.currentPage
    param.begin_time = formatDate(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      curDate.getDate()
    )
    param.end_time = formatDate(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      curDate.getDate()
    )
    let fromInstitutionId = userInfos.institutionId
    param.form_institution_id = fromInstitutionId
    // self.loading = true
    // self.getData(param)

    // self.getInstitutionData(function (res) {
    //   if (res.data.code === 200) {
    //     let fromInstitutionId = userInfos.institutionId
    //     self.requestInstitutionData = res.data.data
    //     self.reserveInstitutionData = res.data.data
    //     self.searchForm.form_institution_id = fromInstitutionId
    //   }
    // })

    // self.getStudyData()

    // self.getdepartmentData()
  },
  computed: {
    data () {
      const self = this
      return self.tableData
    },
    logData () {
      return this.tableLogData
    },
    monthDayData () {
      return this.monthDay
    }
  },
  methods: {
    filterMethod (query) {
      console.log(query, this.updateForm.bodypartId)
      if (query !== '') {
        if (this.updateForm.bodypartId === query) {
          this.bodyPartUpdateData = this.bodyPartUpdateDataList
          return
        }
        this.bodyPartUpdateData = this.bodyPartUpdateDataList.filter(item => {
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
        this.bodyPartUpdateData = this.bodyPartUpdateDataList
      }
    },
    getSexData () {
      const self = this
      //              console.log(self.patient_gender,self.studyKindName,self.patient_gender == "女" && self.studyKindName=='产前')
      if (self.patient_gender === '女' && self.studyKindName === '产前') {
        self.womanData = false
      } else {
        self.womanData = true
      }
    },
    getComputedData (form) {
      // 根据末次月经计算孕周
      let today = new Date()
      let current = form.last_menstrual ? form.last_menstrual : today
      let gestationalDate = today.getTime() - new Date(current).getTime()
      let gestationalDay = parseInt(
        parseInt(gestationalDate / 3600000 / 24) % 7
      )
      let gestationalWeek = parseInt(
        parseInt(gestationalDate / 3600000 / 24) / 7
      )
      let pregnancyDays =
        gestationalWeek.toString() + '周' + gestationalDay.toString() + '天'
      form.pregnancy_days = pregnancyDays
    },
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
      param.patient_name = this.searchForm.patient_name
      param.patient_tel = this.searchForm.patient_tel
      param.form_institution_id = this.searchForm.form_institution_id
      param.to_institution_id = this.searchForm.to_institution_id
      param.studykind_id = this.searchForm.studykind_id
      param.reserva_state = this.searchForm.reserva_state
      //      param.clinic_department = this.searchForm.clinic_department;
      param.clinic_doctor = this.searchForm.clinic_doctor
      param.patient_hisid = this.searchForm.patient_hisid
      param.study_patient_in = this.searchForm.study_patient_in
      param.patient_id = this.searchForm.patient_id
      this.loading = true
      this.getData(param)
    },
    printReservation (index, row) {
      // 打印预约单
      const self = this
      let param = {}

      if (row.reservation_id) {
        let reservationIDs = []
        reservationIDs.push(row.reservation_id)
        param.reservation_id = reservationIDs
        self.getTemplateReservation(param)
      } else {
        self.$message({
          showClose: true,
          message: '请预约该数据，再打印',
          type: 'warning'
        })
      }
    },
    handleReservationLog (index, row) {
      const self = this
      self.dialogLogVisible = true
      self.tableLogData = []
      self.logForm.patient_name = row.patient_name ? row.patient_name : ' '
      self.logForm.patient_gender = row.patient_gender
        ? row.patient_gender
        : ' '
      self.logForm.patient_age = row.patient_age ? row.patient_age : ' '
      self.logForm.studykind_name = row.studykind_name
        ? row.studykind_name
        : ' '
      self.logForm.check_site = row.check_site ? row.check_site : ' '
      let param = {}
      param.reservationId = row.reservation_id
      //      param.pageSize = 10
      self.queryReservationLog(param)
    },
    queryReservationLog (param) {
      const self = this
      self.querylogLoading = true
      self.$apis.queryLog(param)
        .then(res => {
          self.querylogLoading = false
          if (res.data.code === 200) {
            self.tableLogData = res.data.data
            //          self.totalCountLog = res.data.data.total
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
    getTemplateReservation (param) {
      const self = this
      self.loading = true
      self.$apis.Reservation.print(param)
        .then(res => {
          self.loading = false
          if (res.data.code === 200) {
            if (res.data.data && res.data.data.printTemplate.length === 0) {
              return
            }

            let printTemplates = res.data.data.printTemplate
            let contentArrs = []
            for (let i = 0; i < printTemplates.length; i++) {
              contentArrs.push('<div style="page-break-after: always;">')
              contentArrs.push(printTemplates[i])
              contentArrs.push('</div>')
            }
            self.editorContent = contentArrs.join('')
            //          console.log(self.editorContent)

            let x = document.getElementById('myframe')
            let y = x.contentWindow || x.contentDocument
            if (y.document) {
              y.document.body.innerHTML = self.editorContent
              y.focus()
              y.print()
            }
          } else {
            self.editorContent = ''
            self.$message({
              showClose: true,
              message: '' + res.data.message,
              type: 'warning'
            })
          }
        })
        .catch(function () {
          self.loading = false
          self.editorContent = ''
          self.$message({
            showClose: true,
            message: '获取预约单模板失败',
            type: 'warning'
          })
        })
    },
    handleReservationUpdate (index, row) {
      // 修改预约
      const self = this
      //      console.log(row);
      self.institutionName = row.to_institution_name
      self.studyKindName = row.studykind_name
      self.patient_gender = row.patient_gender
      self.updateForm.institutionId = row.to_institution_id
      self.updateForm.studykindId = row.studykind_id
      self.updateForm.bodypartId = row.check_site
      self.updateForm.dictionaryId = row.scan_type
      self.updateForm.last_menstrual = row.last_menstrual
      self.updateForm.pregnancy_days = row.pregnancy_days
      self.updateForm.reservation_id = row.reservation_id
      self.updateForm.patient_id = row.patientid
      self.updateForm.patient_name = row.patient_name
      self.updateForm.patient_tel = row.patient_tel
      self.dialogEditVisible = true
      self.getSexData()

      self.checkInstitution(self.updateForm.institutionId)
      self.checkStudyKind(self.updateForm.studykindId)

      self.institutionUpdateData = []
      self.registTimeCountUpdateData = []
      self.studyKindUpdateData = []
      self.bodyPartUpdateData = []
      self.dictionaryIdUpdateData = []
      self.selectUpdateActive = -1
      self.registTimeUpdateCount = {}

      let beginStr = createDate(row.begin_time)
      let endStr = createDate(row.end_time)
      let b = new Date(beginStr)
      let e = new Date(endStr)
      let curDate = new Date()
      self.selectUpdateDay = curDate
      if (
        e.getFullYear() < curDate.getFullYear() ||
        (e.getFullYear() === curDate.getFullYear() &&
          e.getMonth() < curDate.getMonth())
      ) {
        self.updateMonthDay = formatMonthDay(
          curDate.getFullYear(),
          curDate.getMonth() + 1
        )
      } else {
        self.updateMonthDay = formatMonthDay(e.getFullYear(), e.getMonth() + 1)
      }
      self.getTimeIntervalMonthDay() // 获取有号源的日期

      self.cacheTimeUpdateCount.beginTime = formatTime(
        b.getHours(),
        b.getMinutes()
      )
      self.cacheTimeUpdateCount.endTime = formatTime(
        e.getHours(),
        e.getMinutes()
      )
      self.cacheTimeUpdateCount.institutionId = row.to_institution_id
      self.cacheTimeUpdateCount.studykindId = row.studykind_id
      self.cacheTimeUpdateCount.validDate = formatDate(
        e.getFullYear(),
        e.getMonth() + 1,
        e.getDate()
      )

      if (
        Date.parse(endStr) <
        Date.parse(
          formatDay(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            curDate.getDate()
          )
        )
      ) {
        self.reservationUpdateDate = formatDate(
          curDate.getFullYear(),
          curDate.getMonth() + 1,
          curDate.getDate()
        )
      } else {
        self.selectUpdateDay = e
        self.reservationUpdateDate = formatDate(
          e.getFullYear(),
          e.getMonth() + 1,
          e.getDate()
        )
      }
      if (row.studykind_id && row.to_institution_id) {
        let fromInstitutionId = userInfos.institutionId
        self.createLoading = true
        self.$apis.Reservation.getRegistTimeCount({
          fromInstitutionId: fromInstitutionId || '',
          toInstitutionId: row.to_institution_id,
          studykindId: row.studykind_id,
          validDate: self.reservationUpdateDate
        })
          .then(res => {
            self.createLoading = false
            if (res.data.code === 200) {
              if (isArray(res.data.data)) {
                self.registTimeCountUpdateData = res.data.data
                // 如果修改号源时间段没有过期，将对应号源时段设置为"触发"状态
                if (
                  self.cacheTimeUpdateCount.institutionId ===
                    self.updateForm.institutionId &&
                  self.cacheTimeUpdateCount.studykindId ===
                    self.updateForm.studykindId &&
                  self.cacheTimeUpdateCount.validDate ===
                    self.reservationUpdateDate
                ) {
                  for (
                    let i = 0;
                    i < self.registTimeCountUpdateData.length;
                    i++
                  ) {
                    let item = self.registTimeCountUpdateData[i]
                    if (
                      self.cacheTimeUpdateCount.beginTime === item.beginTime &&
                      self.cacheTimeUpdateCount.endTime === item.endTime
                    ) {
                      self.registTimeUpdateCount = item
                      self.selectUpdateActive = i
                      break
                    }
                  }
                }
              } else {
                self.registTimeCountUpdateData = []
              }
            } else {
              self.registTimeCountUpdateData = []
            }
          })
          .catch(function () {
            self.registTimeCountUpdateData = []
            self.createLoading = false
          })
      }

      self.$apis.Institution.all()
        .then(function (res) {
          if (res.data.code === 200) {
            self.institutionUpdateData = res.data.data
          }
          if (self.institutionUpdateData.length === 0) {
            self.updateForm.institutionId = ''
          }
        })
        .catch(function () {
          self.updateForm.institutionId = ''
        })

      self.$apis.Institution.search({
        institutionId: row.to_institution_id
      })
        .then(function (res) {
          if (res.data.code === 200) {
            for (let item of res.data.data) {
              self.studyKindUpdateData.push(item[0])
            }
            if (self.studyKindUpdateData.length === 0) {
              self.updateForm.studykindId = ''
            }
          }
        })
        .catch(function () {
          self.updateForm.studykindId = ''
        })

      let paramBodyPart = {}
      paramBodyPart.institution_id = row.to_institution_id
      paramBodyPart.hospitalName = row.to_institution_name
      paramBodyPart.studykindId = row.studykind_id
      paramBodyPart.hideRecord = 1
      // 获取检查部位
      self.$apis.BodyPart.all(paramBodyPart).then((res) => {
        if (res.data.code === 200) {
          self.bodyPartUpdateData = res.data.data
          self.bodyPartUpdateDataList = self.bodyPartUpdateData.map((item) => {
            return item
          })
        } else {
          self.$messsage({
            showClose: true,
            message: '' + res.data.message,
            type: 'warning'
          })
        }
      })
        .catch(function () {})

      let paramDictionary = {}
      paramDictionary.studykindId = row.studykind_id
      paramDictionary.hideRecord = 1
      // 获取扫描方式
      self.$apis.StudyKind.studykindScan(paramDictionary).then(res => {
        if (res.data.code === 200) {
          self.dictionaryIdUpdateData = res.data.data
        } else {
          self.$messsage({
            showClose: true,
            message: '' + res.data.message,
            type: 'warning'
          })
        }
      })
      .catch(function () {})
    },
    handleReservationDelete (index, row) {
      // 取消预约
      const self = this
      self
        .$confirm('是否取消该预约', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let params = {}
          let userid = userInfos.userid
          params.modify_user_id = userid || ''
          params.reservation_id = row.reservation_id
          params.reserva_state = '已取消'
          self.$apis.Reservation.cancel(params)
            .then(res => {
              if (res.data.code === 203) {
                self.$message({
                  message: '' + res.data.message,
                  type: 'success'
                })
                let param = {}
                self.currentPage = 1
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
                let fromInstitutionId = userInfos.institutionId
                param.form_institution_id = fromInstitutionId
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
    selectRegistTimeCountUpdate (item, index) {
      if (this.selectUpdateActive < 0) {
        if (parseInt(item.reservationCount) + 1 <= item.maxCount) {
          item.reservationCount = parseInt(item.reservationCount) + 1
        }
      } else {
        if (
          parseInt(this.registTimeUpdateCount.reservationCount) - 1 >= 0 &&
          parseInt(item.reservationCount) + 1 <= item.maxCount
        ) {
          this.registTimeUpdateCount.reservationCount =
            parseInt(this.registTimeUpdateCount.reservationCount) - 1
          item.reservationCount = parseInt(item.reservationCount) + 1
        }
      }
      this.selectUpdateActive = index
      this.registTimeUpdateCount = item
    },
    getInstitutionData (callback) {
      // 获取机构类型
      this.$apis.Institution.all({
        hideRecord: 1
      })
        .then(callback)
        .catch(function () {})
    },
    getInstitutionName (name) {
      // 获取机构名称
      this.institutionName = name
    },
    getStudyKindName (name) {
      // 获取检查类型名称
      this.studyKindName = name
      this.getSexData()
    },
    checkInstitution (param) {
      if (param) {
        this.studykindId_disabled = false
      } else {
        this.studykindId_disabled = true
      }
    },
    checkStudyKind (param) {
      if (param === '') {
        this.bodypartDictionary_disabled = true
      } else {
        this.bodypartDictionary_disabled = false
      }
    },
    getStudykindUpdateData (param) {
      // 修改预约中根据机构获取检查类型
      const self = this
      self.updateForm.studykindId = ''
      self.updateForm.bodypartId = ''
      self.updateForm.dictionaryId = ''
      self.updateForm.pregnancy_days = ''
      self.updateForm.last_menstrual = ''
      self.studyKindName = ''
      self.getSexData()
      self.monthDay = []
      self.daySelect = false
      self.checkInstitution(self.updateForm.institutionId)
      self.checkStudyKind(self.updateForm.studykindId)
      self.registTimeCountUpdateData = []
      self.selectUpdateActive = -1
      self.registTimeUpdateCount = {}
      self.studyKindUpdateData = []
      self.getStudykind(param, function (res) {
        if (res.data.code === 200) {
          for (let item of res.data.data) {
            self.studyKindUpdateData.push(item[0])
          }
        }
      })
    },
    getStudykind (param, callback) {
      this.$apis.Institution.search({
        institutionId: param,
        hideRecord: 1
      })
        .then(callback)
        .catch(function () {})
    },
    // getdepartmentData () {
    //   // 获取科室
    //   this.$apis.getDepartmentAll({
    //     hideRecord: 1
    //   })
    //     .then(res => {
    //       if (res.data.code === 200) {
    //         self.requestDepartmentData = res.data.data
    //       }
    //     })
    //     .catch(function () {})
    // },
    getStudyData () {
      // 获取检查类型
      const self = this
      self.$apis.StudyKind.all({
        hideRecord: 1
      }).then(res => {
        if (res.data.code === 200) {
          self.studyKindData = res.data.data
        }
      }).catch(function () {})
    },
    getStudyUpdateData (param) {
      const self = this
      self.updateForm.bodypartId = ''
      self.updateForm.dictionaryId = ''
      self.updateForm.last_menstrual = ''
      self.updateForm.pregnancy_days = ''
      self.daySelect = true
      self.checkStudyKind(self.updateForm.studykindId)
      self.getStudyKindName(param.STUDYKIND_NAME)
      let paramBodyPart = {}
      paramBodyPart.institution_id = self.updateForm.institutionId
      paramBodyPart.hospitalName = self.institutionName
      paramBodyPart.studykindId = self.updateForm.studykindId
      paramBodyPart.hideRecord = 1
      // 获取检查部位
      self.$apis.BodyPart.all(paramBodyPart).then((res) => {
        if (res.data.code === 200) {
          self.bodyPartUpdateData = res.data.data
          self.bodyPartUpdateDataList = self.bodyPartUpdateData.map((item) => {
            return item
          })
        } else {
          self.$messsage({
            showClose: true,
            message: '' + res.data.message,
            type: 'warning'
          })
        }
      })

      let paramDictionary = {}
      paramDictionary.studykindId = self.updateForm.studykindId
      paramDictionary.hideRecord = 1
      // 获取扫描方式
      self.$apis.StudyKind.studykindScan(paramDictionary).then(res => {
        if (res.data.code === 200) {
          self.dictionaryIdUpdateData = res.data.data
        } else {
          self.$messsage({
            showClose: true,
            message: '' + res.data.message,
            type: 'warning'
          })
        }
      })

      self.getTimeIntervalMonthDay()
      self.getRegistTimeCountUpdateData() // 获取号源
    },
    selectUpdateDate (date) {
      const self = this
      if (
        self.updateForm.institutionId === '' ||
        self.updateForm.studykindId === ''
      ) {
        self.$refs['updateForm'].validateField('institutionId', function () {})
        self.$refs['updateForm'].validateField('studykindId', function () {})
        self.daySelect = false
      } else {
        self.daySelect = true
      }
      if (self.daySelect) {
        if (
          self.updateMonthDay !==
          formatMonthDay(date.getFullYear(), date.getMonth() + 1)
        ) {
          self.updateMonthDay = formatMonthDay(
            date.getFullYear(),
            date.getMonth() + 1
          )
          self.getTimeIntervalMonthDay()
        }
        self.updateMonthDay = formatMonthDay(
          date.getFullYear(),
          date.getMonth() + 1
        )
        self.reservationUpdateDate = formatDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
        self.getRegistTimeCountUpdateData() // 获取号源
      }
    },
    selectUpdateMonthPre (year, month) {
      this.updateMonthDay = formatMonthDay(year, month)
      this.getTimeIntervalMonthDay()
    },
    selectUpdateMonthNext (year, month) {
      this.updateMonthDay = formatMonthDay(year, month)
      this.getTimeIntervalMonthDay()
    },
    getTimeIntervalMonthDay () {
      // 获取一个月有号源的天数
      const self = this
      let valid = false
      if (
        self.updateForm.institutionId === '' ||
        self.updateForm.studykindId === ''
      ) {
        self.$refs['updateForm'].validateField('institutionId', function () {})
        self.$refs['updateForm'].validateField('studykindId', function () {})
        valid = false
        self.daySelect = false
      } else {
        valid = true
        self.daySelect = true
      }

      if (valid) {
        self.createLoading = true
        self.monthDay = []
        self.$apis.Reservation.getTimeIntervalMonthDay({
          institutionId: self.updateForm.institutionId,
          studykindId: self.updateForm.studykindId,
          validMonth: self.updateMonthDay
        })
          .then(res => {
            self.createLoading = false
            if (res.data.code === 200) {
              let data = res.data.data
              if (isArray(data) && data.length > 0) {
                for (let value of data) {
                  self.monthDay.push(value.validDate)
                }
              }
            } else {
              self.$message({
                showClose: true,
                message: '' + res.data.message,
                type: 'warning'
              })
            }
          })
          .catch(function () {
            self.createLoading = false
            self.monthDay = []
          })
      } else {
        return false
      }
    },
    getRegistTimeCountUpdateData () {
      // 获取号源
      const self = this
      let valid = false
      if (
        self.updateForm.institutionId === '' ||
        self.updateForm.studykindId === ''
      ) {
        self.$refs['updateForm'].validateField('institutionId', function () {})
        self.$refs['updateForm'].validateField('studykindId', function () {})
        valid = false
        self.daySelect = false
      } else {
        valid = true
        self.daySelect = true
      }

      if (valid) {
        let fromInstitutionId = userInfos.institutionId
        self.createLoading = true
        self.registTimeCountUpdateData = []
        self.selectUpdateActive = -1
        self.registTimeUpdateCount = {}
        self.$apis.Reservation.getRegistTimeCount({
          fromInstitutionId: fromInstitutionId || '',
          toInstitutionId: self.updateForm.institutionId,
          studykindId: self.updateForm.studykindId,
          validDate: self.reservationUpdateDate
        })
          .then(res => {
            self.createLoading = false
            if (res.data.code === 200 && isArray(res.data.data)) {
              self.registTimeCountUpdateData = res.data.data
              if (
                self.cacheTimeUpdateCount.institutionId ===
                  self.updateForm.institutionId &&
                self.cacheTimeUpdateCount.studykindId ===
                  self.updateForm.studykindId &&
                self.cacheTimeUpdateCount.validDate ===
                  self.reservationUpdateDate
              ) {
                for (
                  let i = 0;
                  i < self.registTimeCountUpdateData.length;
                  i++
                ) {
                  let item = self.registTimeCountUpdateData[i]
                  if (
                    self.cacheTimeUpdateCount.beginTime === item.beginTime &&
                    self.cacheTimeUpdateCount.endTime === item.endTime
                  ) {
                    self.registTimeUpdateCount = item
                    self.selectUpdateActive = i
                    break
                  }
                }
              }
            }
          })
          .catch(function () {
            self.registTimeCountUpdateData = []
            self.createLoading = false
          })
      } else {
        return false
      }
    },
    getDictonaryData (param, callback) {
      // 获取病人来源病人类型
      this.$apis.dictionaryAll({
        dictionaryType: param
      })
        .then(callback)
        .catch(function () {})
    },
    handleSelectionChange (val) {
      this.singleSelection = val
    },
    handleRowChange (row, event, column) {
      const self = this
      self.reservation_id = row.reservation_id
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
      param.patient_name = this.searchForm.patient_name
      param.patient_tel = this.searchForm.patient_tel
      param.form_institution_id = this.searchForm.form_institution_id
      param.to_institution_id = this.searchForm.to_institution_id
      param.studykind_id = this.searchForm.studykind_id
      param.reserva_state = this.searchForm.reserva_state
      //      param.clinic_department = this.searchForm.clinic_department;
      param.clinic_doctor = this.searchForm.clinic_doctor
      this.getData(param)
    },
    getData (param) {
      const self = this
      self.$apis.Reservation.query(param)
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
    submitUpdateForm (formName) {
      // 修改机构
      const self = this
      self.$refs[formName].validate(valid => {
        if (valid) {
          if (self.selectUpdateActive < 0) {
            self.$message({
              showClose: true,
              message: '请选择一个时段号源',
              type: 'warning'
            })
            return
          }

          let userid = userInfos.userid
          let params = {}
          params.last_menstrual = self.updateForm.last_menstrual
          params.pregnancy_days = self.updateForm.pregnancy_days
          params.modify_user_id = userid || ''
          params.reservation_id = self.updateForm.reservation_id
          params.studykind_id = self.updateForm.studykindId
          params.scan_type = self.updateForm.dictionaryId
          params.check_site = self.updateForm.bodypartId
          params.to_institution_id = self.updateForm.institutionId
          params.begin_time =
            self.reservationUpdateDate +
            ' ' +
            self.registTimeUpdateCount.beginTime
          params.end_time =
            self.reservationUpdateDate +
            ' ' +
            self.registTimeUpdateCount.endTime

          self.createLoading = true
          self.$apis.Reservation.edit(params)
            .then(res => {
              self.createLoading = false
              if (res.data.code === 203) {
                self.registCacheTimeUpdateCount.beginTime =
                  self.registTimeUpdateCount.beginTime
                self.registCacheTimeUpdateCount.endTime =
                  self.registTimeUpdateCount.endTime

                self.cacheTimeUpdateCount.beginTime =
                  self.registTimeUpdateCount.beginTime
                self.cacheTimeUpdateCount.endTime =
                  self.registTimeUpdateCount.endTime
                self.cacheTimeUpdateCount.institutionId =
                  self.updateForm.institutionId
                self.cacheTimeUpdateCount.studykindId =
                  self.updateForm.studykindId
                self.cacheTimeUpdateCount.validDate =
                  self.reservationUpdateDate

                let param = {}
                self.currentPage = 1
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
                let fromInstitutionId = userInfos.institutionId
                param.form_institution_id = fromInstitutionId
                self.getData(param)
                // 获取号源
                self.getRegistTimeCountUpdateData()
                self.dialogUpdateVisible = true
              } else {
                self.$message({
                  message: '' + res.data.message,
                  type: 'info'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
              self.createLoading = false
              self.$message.error('预约号源失败')
            })
        }
      })
    },
    formatter (row, column) {
      if (row.charge_state === 1) {
        return '已收费'
      } else {
        return '未收费'
      }
    },
    modifytypeFormatter (reservaState) {
      if (reservaState === '已预约') {
        return '已预约'
      } else {
        return '未预约'
      }
    },
    reservationTimeFormatter (row, column) {
      if (row.begin_time && row.end_time) {
        try {
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
        } catch (e) {
          return ''
        }
      } else {
        return ''
      }
    },
    optionFormatter (disabled) {
      // 隐藏"新增"/"编辑"功能中检查类型下拉框中HIDE_RECORD为0
      if (disabled === 1) {
        return false
      } else {
        return true
      }
    },
    hideRecordformatter (hideRedord) {
      if (hideRedord === 1) {
        return 0
      } else {
        return 1
      }
    },
    cancelReservationForm (formName) {
      const self = this
      self.dialogEditVisible = false
      self.patient_id = ''
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
    },
    closeMessage () {
      // 打印并关闭
      const self = this
      self.dialogEditVisible = false
      self.dialogUpdateVisible = false
      let param = {}
      if (self.reservation_id) {
        let reservationIDs = []
        reservationIDs.push(self.reservation_id)
        param.reservation_id = reservationIDs
        self.getTemplateReservation(param)
      } else {
        this.$message({
          showClose: true,
          message: '请预约该数据，再打印',
          type: 'warning'
        })
      }
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

.print {
  width: 100%;
  height: 42px;
  padding-left: 8px;
  line-height: 42px;
  font-size: 14px;
}

.print-icon {
  font-size: 20px;
  padding-right: 6px;
  vertical-align: middle;
}


.searchLog {
  margin-left: -60px;
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