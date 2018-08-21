<template>
  <div class="container"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading">
    <h1 class="top-title">预约登记：</h1>
    <div class="search-content">
      <div class="search-option">
        <el-form ref="infoForm"
                 :model="infoForm"
                 :rules="infoRules"
                 label-width="90px"
                 size="medium">
          <el-collapse v-model="activeNames"
                       class="collapse-line">
            <el-collapse-item name="1">
              <template slot="title">基本信息
                <i class="tips">输入HIS号点击搜索可自动加载HIS已有信息</i>
              </template>
              <div class="form-info">
                <el-row :gutter="4">
                  <el-col :span="6">
                    <el-form-item label="HIS号"
                                  prop="patient.patient_hisid">
                      <el-input size="small"
                                placeholder="请输入HIS号"
                                v-model="infoForm.patient.patient_hisid"
                                class="input-with-select"
                                @blur="hisBlur"
                                @focus="hisFocus"
                                @keyup.enter.native="search">
                        <el-button slot="append"
                                   type="text"
                                   icon="el-icon-search"
                                   class="his-search"
                                   size="mini"
                                   @click="search"></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="病人来源"
                                  prop="patient.study_source">
                      <el-select size="small"
                                 v-model="infoForm.patient.study_source"
                                 placeholder="请选择病人来源">
                        <el-option label=""
                                   value="">
                        </el-option>
                        <template v-for="item in patientSourceData">
                          <template v-if="item.HIDE_RECORD">
                            <el-option :key="item.DICTIONARY_VALUE"
                                       :label="item.DICTIONARY_VALUE"
                                       :value="item.DICTIONARY_VALUE">
                            </el-option>
                          </template>
                        </template>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="姓名"
                                  prop="patient.patient_name">
                      <el-input v-model="infoForm.patient.patient_name"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别"
                                  label-width="90px"
                                  prop="patient.patient_gender">
                      <el-select v-model="infoForm.patient.patient_gender"
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
                </el-row>
                <el-row :gutter="4">
                  <el-col :span="6">
                    <el-col :span="17">
                      <el-form-item label="年龄"
                                    label-width="90px"
                                    prop="patient.patient_age">
                        <el-input v-model="infoForm.patient.patient_age"
                                  size="small"
                                  ref="handleAge"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label-width="0">
                        <el-select v-model="patient_age_type"
                                   placeholder=""
                                   size="small"
                                   ref="handleDate">
                          <el-option label="岁"
                                     value="岁"></el-option>
                          <el-option label="月"
                                     value="月"></el-option>
                          <el-option label="天"
                                     value="天"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系电话"
                                  prop="patient.patient_tel">
                      <el-input v-model="infoForm.patient.patient_tel"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="门诊/住院号"
                                  prop="patient.study_patient_in">
                      <el-input v-model="infoForm.patient.study_patient_in"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="床号"
                                  prop="patient.bed_no">
                      <el-input v-model="infoForm.patient.bed_no"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="4">
                  <el-col :span="6">
                    <el-form-item label="病历号"
                                  prop="patient.medical_recordsno">
                      <el-input v-model="infoForm.patient.medical_recordsno"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="身份证号"
                                  prop="patient.patient_idcard">
                      <el-input v-model="infoForm.patient.patient_idcard"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="病人类型"
                                  prop="patient.patient_class">
                      <el-select v-model="infoForm.patient.patient_class"
                                 placeholder="请选择病人类型"
                                 size="small">
                        <el-option label=""
                                   value="">
                        </el-option>
                        <template v-for="item in patientTypeData">
                          <template v-if="item.HIDE_RECORD">
                            <el-option :key="item.DICTIONARY_VALUE"
                                       :label="item.DICTIONARY_VALUE"
                                       :value="item.DICTIONARY_VALUE">
                            </el-option>
                          </template>
                        </template>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否陪护"
                                  prop="reservation.is_accompany">
                      <el-switch style="display: block"
                                 size="small"
                                 v-model="infoForm.reservation.is_accompany"
                                 active-value="1"
                                 inactive-value="0">
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="4">
                  <el-col :span="6">
                    <el-form-item label="陪检设备"
                                  size="small"
                                  prop="reservation.accompany_equipment">
                      <el-select v-model="infoForm.reservation.accompany_equipment"
                                 placeholder="">
                        <el-option label=""
                                   value="">
                        </el-option>
                        <el-option label="推床"
                                   value="推床"></el-option>
                        <el-option label="轮椅"
                                   value="轮椅"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <el-form-item label="住址"
                                  prop="patient.patient_home_addr">
                      <el-input v-model="infoForm.patient.patient_home_addr"
                                size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item title="其他信息"
                              name="2">
              <div class="form-info">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="临床症状"
                                  prop="requests.clinic_symptom">
                      <el-input type="textarea"
                                :rows="2"
                                resize="none"
                                v-model="infoForm.requests.clinic_symptom"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="临床诊断"
                                  prop="requests.clinic_diagnose">
                      <el-input type="textarea"
                                :rows="2"
                                resize="none"
                                v-model="infoForm.requests.clinic_diagnose"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="检查要求"
                                  prop="requests.exam_reques">
                      <el-input type="textarea"
                                :rows="2"
                                resize="none"
                                v-model="infoForm.requests.exam_reques"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="既往病史"
                                  prop="requests.clinic_history">
                      <el-input type="textarea"
                                :rows="2"
                                resize="none"
                                v-model="infoForm.requests.clinic_history"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form>
        <div class="search-btn center">
          <el-button type="primary"
                     size="small"
                     @click="dialogReservation">手工预约</el-button>
          <el-button
                     size="small"
                    
                     @click="cancelForm('infoForm')">重置</el-button>
        </div>
      </div>
    </div>

    <!--表格-->
    <div class="info-table">
      <el-table element-loading-text="拼命加载中"
                tooltip-effect="light"
                highlight-current-row
                header-row-class-name="header-row-bgColor"
                :row-class-name="cellRow"
                :data="data"
                ref="singleTable"
                @current-change="handleSelectionChange"
                @row-click="handleRowChange"
                border
                style="width: 100%;">
        <el-table-column prop="order_number"
                         label="申请单号"
                         width="120"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="request_item"
                         label="HIS项目 "
                         width="120"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="check_site"
                         label="检查项目"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="clinic_doctor"
                         label="申请医生"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="apply_time"
                         label="申请时间"
                         width='160'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="reserva_state"
                         label="预约状态"
                         width="90"
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
            <span style="margin-left: 4px">{{ scope.row.reserva_state }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fee"
                         label="费用"
                         width="90"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="charge_state"
                         label="收费状态"
                         :formatter="formatter"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="to_institution_name"
                         label="检查医院 "
                         width='150'
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column prop="reservationTime"
                         label="预约时间"
                         width='200'
                         :formatter="reservationTimeFormatter"
                         :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.reserva_state=='已预约'">
              <el-button size="medium"
                         icon="el-icon-edit-outline"
                         type="text"
                         @click="handleReservationUpdate(scope.$index, scope.row)">修改</el-button>
              <el-button size="medium"
                         icon="el-icon-delete"
                         type="text"
                         @click="handleReservationDelete(scope.$index, scope.row)">取消</el-button>
            </template>
            <template v-else-if="scope.row.reserva_state=='已检查'">
            </template>
            <template v-else>
              <el-button size="medium"
                         icon="el-icon-date"
                         type="text"
                         @click="handleReservation(scope.$index, scope.row)">预约</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表格end-->

    <!--手工预约-->
    <el-dialog title="手工预约"
               width='800px'
               :visible.sync="dialogAddVisible"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="80px"
               class="dialogForm"
               size="medium">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="检查医院"
                          prop="institutionId">
              <el-select v-model="ruleForm.institutionId"
                         size="small"
                         filterable
                         placeholder="请选择检查机构"
                         @change="getStudykindData(ruleForm.institutionId)">
                <template v-for="item in institutionData">
                  <template v-if="item.HIDE_RECORD">
                    <el-option :key="item.INSTITUTION_ID"
                               :label="item.INSTITUTION_NAME"
                               :value="item.INSTITUTION_ID"
                               @click.native='getInstitutionName(item.INSTITUTION_NAME)'>
                    </el-option>
                  </template>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查类型"
                          prop="studykindId">
              <!--<el-select v-model="ruleForm.studykindId" size="small" :disabled="studykindId_disabled" filterable placeholder="请选择检查类型" @change="getStudyData(ruleForm.studykindId)">-->
              <el-select v-model="ruleForm.studykindId"
                         size="small"
                         :disabled="studykindId_disabled"
                         filterable
                         placeholder="请选择检查类型">
                <template v-for="item in studyKindData">
                  <template v-if="item.HIDE_RECORD">
                    <el-option :key="item.STUDYKIND_ID"
                               :label="item.STUDYKIND_NAME"
                               :value="item.STUDYKIND_ID"
                               @click.native='getStudyData(item)'>
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
              <el-select v-model="ruleForm.bodypartId"
                         size="small"
                         :disabled="bodypartDictionary_disabled"
                         filterable
                         placeholder="请选择检查项目"
                         :filter-method="filterMethod">
                <template v-for="item in bodyPartData">
                  <!--<template v-if="item.HIDE_RECORD">-->
                  <el-option :key="item.BODYPART_NAME"
                             :label="item.BODYPART_NAME"
                             :value="item.BODYPART_NAME">
                  </el-option>
                  <!--</template>-->
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扫描方式"
                          prop="dictionaryId">
              <el-select v-model="ruleForm.dictionaryId"
                         size="small"
                         :disabled="bodypartDictionary_disabled"
                         filterable
                         clearable
                         placeholder="请选择扫描方式">
                <template v-for="item in dictionaryIdData">
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
              <el-date-picker v-model="ruleForm.last_menstrual"
                              size="small"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                              @change="getComputedData(ruleForm)"
                              :editable="false"
                              :clearable="false"
                              :picker-options="pickerOptions"
                              class="menstrual">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="孕周"
                          prop="pregnancy_days"
                          :class={sexControl:womanData}>
              <el-input v-model="ruleForm.pregnancy_days"
                        size="small"
                        disabled
                        class="pregnant-week"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="date-calendar">
              <lw-calendar @change="selectDate"
                           @pickPre="selectMonthPre"
                           @pickNext="selectMonthNext"
                           :monthDay="monthDayData"
                           :defaultSelect="daySelect"
                           :activeDay="selectDay"></lw-calendar>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="time-box">
              <h1 class="time-title">
                <span id="choseTime">{{ reservationDate }}</span>
                <strong>0/10=已预约号源/总号源</strong>
              </h1>
              <div v-loading="createLoading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   style="height: 250px;overflow:auto">
                <template v-if="registTimeCountData.length==0">
                  <div class="registTimeCountData"> 暂无数据</div>
                </template>
                <template v-for="(item,index) in registTimeCountData">
                  <el-col :key="index"
                          :span="6">
                    <div class="time-item"
                         :class="{active:index==selectActive}"
                         @click="selectRegistTimeCount(item,index)">
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
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   @click="submitAddForm('ruleForm')">确 定</el-button>
        <el-button size="medium"
                   @click="cancelReservationForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
    <!--手工预约end-->

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
          <!--预约人：{{infoForm.patient.patient_name}}；联系电话：{{infoForm.patient.patient_tel}}；检查医院：{{institutionName}}；检查类型：{{studyKindName}}；检查项目：{{ruleForm.bodypartId?ruleForm.bodypartId:'无'}}；扫描方式：{{ruleForm.dictionaryId?ruleForm.dictionaryId:'无'}}；-->
          预约检查时间：{{reservationDate}} {{registCacheTimeCount.beginTime}}-{{registCacheTimeCount.endTime}}
        </p>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   @click="closeMessage">关闭并打印</el-button>
        <el-button @click="dialogUpdateVisible=false"
                   size="medium">继续预约</el-button>
      </div>
    </el-dialog>
    <!--手工预约信息提醒end-->

    <!--修改预约-->
    <el-dialog title="修改预约"
               width='800px'
               :visible.sync="dialogEditVisible"
               :close-on-click-modal="false">
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
                               :value="item.INSTITUTION_ID">
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
              <!--<el-select v-model="updateForm.studykindId" size="small" :disabled="studykindId_disabled" filterable placeholder="请选择检查类型" @change="getStudyUpdateData(updateForm.studykindId)">-->
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
                         :filter-method="updateFilterMethod">
                <template v-for="item in bodyPartUpdateData">
                  <el-option :key="item.BODYPART_NAME"
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
                         clearable
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
                              :picker-options="pickerOptions"
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
                           :monthDay="monthDayUpdateData"
                           :defaultSelect="dayUpdateSelect"
                           :activeDay="selectUpdateDay"></lw-calendar>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="time-box">
              <h1 class="time-title">
                <span id="choseTime">{{ reservationUpdateDate }}</span>
                <strong>0/10=已预约号源/总号源</strong>
              </h1>
              <div v-loading="createLoading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   style="height: 250px; overflow: auto;">
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

    <!--获取预约单的内容，进行打印-->
    <iframe id="myframe"
            style="width: 0; height: 0;">
      <p>你的浏览器不支持iframe,会影响打印预约单的功能。</p>
    </iframe>
    <!--获取预约单的内容，进行打印end-->
  </div>
</template>

<script>
import {
  formatDate,
  formatDay,
  createDate,
  formatMonthDay,
  isArray,
  isObject,
  isEmptyObject,
  formatTime,
  userInfos
} from '../../assets/js/reservation-common.js'
import lwCalendar from './calendar.vue'
export default {
  components: {
    lwCalendar
  },
  data () {
    let currectDate = new Date()
    let checkPhone = (rule, value, callback) => {
      if (!/^\d+$/.test(value)) {
        callback(new Error('手机号码有误，请重填'))
      } else {
        callback()
      }
    }

    let checkAge = (rule, value, callback) => {
      let tmpDate = this.$refs.handleDate
      if (isNaN(value) || value % 1 !== 0) {
        callback(new Error('请输入有效数字值'))
        //        this.infoForm.patient.patient_age = "";
      } else {
        switch (tmpDate.value) {
          case '岁':
            if (value === '' || value < 1 || value > 100) {
              callback(new Error('请输入有效年龄'))
              this.infoForm.patient.patient_age = ''
            } else {
              callback()
            }
            break
          case '月':
            if (value === '' || value < 1 || value > 12) {
              callback(new Error('请输入有效年龄'))
              this.infoForm.patient.patient_age = ''
            } else {
              callback()
            }
            break
          case '天':
            if (value === '' || value < 1 || value > 31) {
              callback(new Error('请输入有效年龄'))
              this.infoForm.patient.patient_age = ''
            } else {
              callback()
            }
            break
        }
      }
    }

    return {
      activeNames: ['1'],
      tableData: [],
      singleSelection: {},
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false,
      createLoading: false,
      updateLoading: false,
      womanData: false,
      dialogAddVisible: false,
      dialogUpdateVisible: false,
      dialogEditVisible: false,
      studyKindData: [],
      studykindId_disabled: true,
      bodypartDictionary_disabled: true,
      patientSourceData: [],
      patientTypeData: [],
      institutionData: [],
      bodyPartData: [],
      bodyPartDataList: [],
      dictionaryIdData: [],
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
      ruleMonthDay: formatMonthDay(
        currectDate.getFullYear(),
        currectDate.getMonth() + 1
      ),
      reservationDate: formatDate(
        currectDate.getFullYear(),
        currectDate.getMonth() + 1,
        currectDate.getDate()
      ),
      reservationUpdateDate: formatDate(
        currectDate.getFullYear(),
        currectDate.getMonth() + 1,
        currectDate.getDate()
      ),
      registTimeCountData: [],
      registTimeCountUpdateData: [],
      registTimeCount: {},
      registCacheTimeCount: {},
      registTimeUpdateCount: {},
      cacheTimeUpdateCount: {},
      reservationTime: '',
      monthDays: [],
      monthUpdateDays: [],
      daySelect: false,
      dayUpdateSelect: false,
      selectDay: currectDate,
      selectUpdateDay: currectDate,
      selectActive: -1,
      selectUpdateActive: -1,
      patient_id: '',
      reservation_id: '',
      reservationIDs: [],
      studyKindName: '',
      institutionName: '',
      hisFlag: 0,
      enterFlag: 0,
      cachePatient_hisid: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      infoForm: {
        patient: {
          patient_id: '', // 病人表唯一标识
          patient_name: '', // 病人姓名
          patient_gender: '女', // 病人性别
          patient_home_addr: '', // 病人住址
          patient_birthday: '', // 出生日期
          patient_tel: '', // 病人电话
          patient_hisid: '', // 病人hisid
          empi: '', // 病人唯一 号
          patient_idcard: '', // 身份证号
          patient_age: '', // 病人年龄
          insuranceno: '', // 社保卡号
          marry_state: '', // 婚姻状态
          patientid: '', // 病人id
          patient_nation: '', // 民族
          medical_recordsno: '', // 病历号
          medical_card: '', // 诊疗卡号
          fetal_num: '', // 胎儿个数
          last_menstrual: '', // 末次月经
          pregnancy_days: '', // 孕周
          prebirth_day: '', // 预产期
          study_source: '', // 病人来源
          bed_no: '', // 床号
          study_patient_in: '', // 住院号/门诊号
          patient_class: '', // 病人类型,急诊、平诊、干诊、vip、军人
          sick_area: '', // 病区名称
          unint_Name: '',
          kind_type: '',
          citizen_CardNumber: ''
        },
        requests: {
          check_site: '', // 检查部位
          itemcode: '', // 项目编码
          study_hisid: '', // 检查hisid
          request_item: '', // 申请单项目
          fee: '', // 检查费用
          fee_kind: '', // 费用类别 自费;医保
          clinic_department: '', // 申请科室
          clinic_doctor: '', // 申请医生
          apply_time: '', // 申请日期
          clinic_doctorcode: '', // 临床医生编码
          modality_type: '', // 设备类型
          clinic_symptom: '', // 临床症状
          clinic_diagnose: '', // 临床诊断
          exam_reques: '', // 检查要求
          clinic_history: '', // 既往病史
          clinic_lis: '', // 检验结果
          scan_type: '', // 扫描类型
          charge_state: '0', // 是否收费 1：已收费 0：未收费
          order_number: '', // 医嘱号
          requestid: '', // 申请单号
          request_acccession_no: '' // 申请单流水号
        },
        reservation: {
          reservationid: '', // 预约编号
          studykind_id: '', // 检查分类标识
          form_institution_id: '', // 检查分类标识
          to_institution_id: '', // 被预约机构标识
          begin_time: '', // 开始时间
          end_time: '', // 结束时间
          reserva_state: '', // 预约状态分：已预约 已登记 已检查 已取消
          modifytype: '', // 修改标识 0：预约 1：修改
          reserva_operator: '', // 预约操作者
          reserve_department: '', // 预约科室
          save_time: '', // 保存时间
          memo: '', // 备注
          study_place: '', // 检查位置
          study_notice: '', // 注意事项
          reserve_mode: '1', // 默认为1，微信为2
          time_interval_count: '1', // 号源个数
          is_accompany: '0', // 是否陪检
          accompany_equipment: '', // 陪检设备
          //          "request_id": '', //申请单标识
          modify_user_id: '' // 修改人
        }
      },
      ruleForm: {
        institutionId: '',
        bodypartId: '',
        studykindId: '',
        dictionaryId: '',
        last_menstrual: '',
        pregnancy_days: ''
      },
      updateForm: {
        institutionId: '',
        bodypartId: '',
        studykindId: '',
        dictionaryId: '',
        reservation_id: '',
        patient_id: '',
        last_menstrual: '',
        pregnancy_days: ''
      },
      infoRules: {
        'patient.patient_name': [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        'patient.patient_age': [
          {
            required: true,
            validator: checkAge,
            trigger: 'blur'
          }
        ],
        'patient.patient_tel': [
          {
            required: true,
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        'patient.patient_gender': [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ],
        'patient.patient_hisid': [],
        'patient.study_source': [],
        'patient.patient_class': [],
        'patient.patient_idcard': [],
        'patient.medical_recordsno': [],
        'patient.study_patient_in': [],
        'patient.bed_no': [],
        'patient.last_menstrual': [],
        'patient.pregnancy_days': [],
        'reservation.is_accompany': [],
        'reservation.accompany_equipment': [],
        'reservation.patient.patient_home_addr': [],
        'requests.clinic_symptom': [],
        'requests.clinic_diagnose': [],
        'requests.exam_reques ': [],
        'requests.clinic_history': []
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
            trigger: ''
          }
        ],
        dictionaryId: [],
        last_menstrual: [],
        pregnancy_days: []
      },
      editorContent: ''
    }
  },
  created () {
    const self = this
    // self.getDictonaryData('病人来源', function (res) {
    //   // 获取病人来源
    //   if (res.data.code === 200) {
    //     self.patientSourceData = res.data.data
    //   }
    // })

    // self.getDictonaryData('病人类型', function (res) {
    //   // 获取病人类型
    //   if (res.data.code === 200) {
    //     self.patientTypeData = res.data.data
    //   }
    // })

    // 临床医生通过下级医院的HIS调用区域预约的URL链接,包含了病人基本信息
    if (
      isObject(userInfos.patientInfo) &&
      !isEmptyObject(userInfos.patientInfo)
    ) {
      var patientInfo = userInfos.patientInfo
      self.infoForm.patient.patient_hisid = patientInfo.patient_hisid
      self.infoForm.patient.study_source = patientInfo.study_source
      self.infoForm.patient.patient_name = patientInfo.patient_name
      self.infoForm.patient.patient_gender = patientInfo.patient_gender
      self.infoForm.patient.study_patient_in = patientInfo.study_patient_in
      self.infoForm.patient.patient_birthday = patientInfo.patient_birthday
      self.infoForm.patient.patient_idcard = patientInfo.patient_idcard
      self.infoForm.patient.marry_state = patientInfo.marry_state
      self.infoForm.patient.patient_home_addr = patientInfo.patient_home_addr
      self.infoForm.patient.patient_nation = patientInfo.patient_nation
      self.infoForm.patient.patient_tel = patientInfo.patient_tel
      self.infoForm.patient.insuranceno = patientInfo.insuranceno
      self.infoForm.patient.sick_area = patientInfo.sick_area
      self.infoForm.patient.last_menstrual = patientInfo.last_menstrual
      self.infoForm.patient.fetal_num = patientInfo.fetal_num
      self.infoForm.patient.patient_class = patientInfo.patientclass
      self.infoForm.patient.pregnancy_days = patientInfo.pregnancy_days
      self.infoForm.patient.prebirth_day = patientInfo.prebirth_day
      self.infoForm.patient.patient_age = self.ageFormatter(
        patientInfo,
        'patient_age',
        self.patient_age_type
      )
      self.infoForm.patient.bed_no = patientInfo.study_patient_bed
      self.infoForm.patient.unint_Name = patientInfo.UnintName
      self.infoForm.patient.kind_type = patientInfo.KindType
      self.infoForm.patient.citizen_CardNumber = patientInfo.CitizenCardNumber
      // console.log(self.infoForm)
    }
  },
  computed: {
    data () {
      return this.tableData
    },
    monthDayData () {
      return this.monthDays
    },
    monthDayUpdateData () {
      return this.monthUpdateDays
    }
  },
  methods: {
    filterMethod (query) {
      if (query !== '') {
        if (this.ruleForm.bodypartId === query) {
          this.bodyPartData = this.bodyPartDataList
          return
        }
        this.bodyPartData = this.bodyPartDataList.filter(item => {
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
        this.bodyPartData = this.bodyPartDataList
      }
    },
    updateFilterMethod (query) {
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
      if (
        self.infoForm.patient.patient_gender === '女' &&
        self.studyKindName === '产前'
      ) {
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
      if (row.reserva_state === '未预约') {
        return 'unState-cell-row'
      } else {
        return ''
      }
    },
    dialogReservation () {
      // 手工预约
      const self = this
      self.$refs['infoForm'].validate(valid => {
        if (valid) {
          self.dialogAddVisible = true

          self.studyKindData = []
          self.institutionData = []
          self.bodyPartData = []
          self.dictionaryIdData = []
          self.reservationIDs = []
          let currectDate = new Date()
          self.reservationDate = formatDate(
            currectDate.getFullYear(),
            currectDate.getMonth() + 1,
            currectDate.getDate()
          )
          self.registTimeCountData = []
          self.registTimeCount = {}
          self.selectActive = -1
          self.ruleForm.institutionId = ''
          self.ruleForm.studykindId = ''
          self.ruleForm.bodypartId = ''
          self.ruleForm.dictionaryId = ''
          self.studyKindName = ''
          self.checkInstitution(self.ruleForm.institutionId)
          self.checkStudyKind(self.ruleForm.studykindId)
          self.monthDays = []
          self.selectDay = currectDate
          self.daySelect = false
          self.getSexData()

          self.getInstitutionData(function (res) {
            if (res.data.code === 200) {
              self.institutionData = res.data.data
            }
          })
        } else {
          return false
        }
      })
    },
    printReservation () {
      // 打印预约单
      const self = this
      let param = {}

      if (self.singleSelection && self.singleSelection.reservation_id) {
        //        param.reservation_id = self.singleSelection.reservation_id
        let reservationIDs = []
        reservationIDs.push(self.singleSelection.reservation_id)
        param.reservation_id = reservationIDs
        self.getTemplateReservation(param)
      } else {
        self.$message({
          showClose: true,
          message: '请预约数据，再打印',
          type: 'warning'
        })
      }
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
            let x = document.getElementById('myframe')
            let y = x.contentWindow || x.contentDocument
            if (y.document) {
              y.document.body.innerHTML = self.editorContent
              y.focus()
              y.print()
            }
          } else {
            self.$message({
              showClose: true,
              message: '' + res.data.message,
              type: 'warning'
            })
          }
        })
        .catch(() => {
          self.loading = false
          self.$message.error('获取打印模板信息失败')
        })
    },
    handleSelectionChange (val) {
      this.singleSelection = val
    },
    handleReservationUpdate (index, row) {
      // 修改预约
      const self = this
      //      console.log(row);
      self.updateForm.institutionId = row.to_institution_id
      self.updateForm.studykindId = row.studykind_id
      self.updateForm.bodypartId = row.check_site
      self.updateForm.dictionaryId = row.scan_type
      self.updateForm.reservation_id = row.reservation_id
      self.updateForm.patient_id = row.patient_id
      self.studyKindName = row.studykind_name
      self.dialogEditVisible = true
      self.getSexData()
      if (self.hisFlag === 1) {
        self.updateForm.last_menstrual = self.infoForm.patient.last_menstrual
        self.updateForm.pregnancy_days = self.infoForm.patient.pregnancy_days
      } else {
        self.updateForm.last_menstrual = row.last_menstrual
        self.updateForm.pregnancy_days = row.pregnancy_days
      }

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
      self.getTimeIntervalUpdateMonthDay()

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
      self.$apis.BodyPart.all(paramBodyPart)
        .then(res => {
          // 获取检查部位
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
      self.$apis.StudyKind.studykindScan(paramDictionary).then(res => {
        // 获取扫描方式
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
                  showClose: true,
                  message: '' + res.data.message,
                  type: 'success'
                })

                if (self.hisFlag === 1) {
                  let param = {}
                  let institutionName = userInfos.institutionName
                  param.HISCode1 = self.infoForm.patient.patient_hisid
                  param.PatientType = self.infoForm.patient.study_source
                  param.HospitalName = institutionName
                  self.loading = true
                  self.getHisData(param)
                } else {
                  let param = {}
                  param.patient_id = self.patient_id
                  self.loading = true
                  self.getData(param)
                }
              } else {
                self.$message({
                  showClose: true,
                  message: '' + res.data.message,
                  type: 'info'
                })
              }
            })
            .catch(function () {
              self.$message.error('取消预约失败')
            })
        })
        .catch(() => {
        })
    },
    handleReservation (index, row) {
      // his预约
      const self = this
      self.$refs['infoForm'].validate(valid => {
        if (valid) {
          self.dialogAddVisible = true
          self.studyKindData = []
          self.institutionData = []
          self.bodyPartData = []
          self.dictionaryIdData = []
          self.reservationIDs = []
          let currectDate = new Date()
          self.reservationDate = formatDate(
            currectDate.getFullYear(),
            currectDate.getMonth() + 1,
            currectDate.getDate()
          )
          self.registTimeCountData = []
          self.registTimeCount = {}
          self.selectActive = -1
          self.ruleForm.institutionId = ''
          self.ruleForm.studykindId = ''
          self.ruleForm.bodypartId = ''
          self.ruleForm.dictionaryId = ''
          self.studyKindName = ''

          self.infoForm.requests.clinic_department = row.clinic_department
          self.infoForm.requests.clinic_doctor = row.clinic_doctor
          self.infoForm.requests.clinic_doctorcode = row.clinic_doctorcode
          self.infoForm.requests.fee = row.fee
          self.infoForm.requests.fee_kind = row.fee_kind
          self.infoForm.requests.charge_state = row.charge_state
          self.infoForm.requests.clinic_symptom = row.clinic_symptom
          self.infoForm.requests.clinic_diagnose = row.clinic_diagnose
          self.infoForm.requests.exam_reques = row.exam_reques
          self.infoForm.requests.modality_type = row.modality_type
          self.infoForm.requests.requestid = row.requestid
          self.infoForm.requests.order_number = row.order_number
          self.infoForm.requests.request_acccession_no =
            row.request_acccession_no
          self.infoForm.requests.request_item = row.request_item
          self.infoForm.requests.apply_time = row.apply_time
          self.infoForm.requests.itemcode = row.itemcode
          self.infoForm.requests.scan_type = row.scan_type
          self.infoForm.requests.clinic_history = row.clinic_history
          self.infoForm.requests.clinic_lis = row.clinic_lis
          self.getSexData()

          self.getInstitutionData(function (res) {
            if (res.data.code === 200) {
              self.institutionData = res.data.data
            }
          })
        } else {
          return false
        }
      })
    },
    getData (param) {
      const self = this
      //      self.loading = true;
      self.$apis.Reservation.query(param)
        .then(res => {
          self.loading = false
          if (res.data.code === 200) {
            self.tableData = res.data.data
            if (res.data.data.length === 0) {
              self.patient_id = ''
            }
          }
        })
        .catch(function () {
          self.loading = false
        })
    },
    handleRowChange (row, event, column) {
      const self = this
      self.infoForm.requests.clinic_symptom = row.clinic_symptom
      self.infoForm.requests.clinic_diagnose = row.clinic_diagnose
      self.infoForm.requests.exam_reques = row.exam_reques
      self.infoForm.requests.clinic_history = row.clinic_history
    },
    search (event) {
      // his搜索查询
      const self = this
      if (self.infoForm.patient.patient_hisid) {
        let param = {}
        let institutionName = userInfos.institutionName
        param.HISCode1 = self.infoForm.patient.patient_hisid
        param.PatientType = self.infoForm.patient.study_source
        param.HospitalName = institutionName
        if (event && event.keyCode === 13) {
          self.enterFlag = 1
        }
        self.loading = true
        self.getHisData(param)
      }
    },
    hisBlur (evevt) {
      if (this.enterFlag === 0) {
        if (this.cachePatient_hisid !== this.infoForm.patient.patient_hisid) {
          this.search()
        }
      } else {
        this.enterFlag = 0
      }
    },
    hisFocus () {
      this.cachePatient_hisid = this.infoForm.patient.patient_hisid
    },
    getHisData (param) {
      const self = this

      let valid = false
      self.tableData = []
      self.patient_id = ''
      self.hisFlag = 0
      if (self.infoForm.patient.patient_hisid === '') {
        self.$refs['infoForm'].validateField('patient.patient_hisid', function () {})
        valid = false
      } else {
        valid = true
      }
      if (!valid) {
        return
      }
      let hisid = self.infoForm.patient.patient_hisid
      self.reset('infoForm')
      self.infoForm.patient.patient_hisid = hisid

      //      self.loading = true;
      self.$apis.Reservation.hisQuery(param)
        .then(res => {
          self.loading = false
          if (res.data.code === 200) {
            if (res.data.data) {
              let reserve = res.data.data.reserve
              let haveReserved = res.data.data.haveReserved
              if (reserve.RequestInfo && reserve.RequestInfo.length > 0) {
                for (let i of reserve.RequestInfo) {
                  self.tableData.push(i)
                }
              }
              if (
                haveReserved.RequestInfo &&
                haveReserved.RequestInfo.length > 0
              ) {
                for (let j of haveReserved.RequestInfo) {
                  self.tableData.push(j)
                }
              }

              if (self.tableData.length > 0) {
                self.hisFlag = 1
              }

              self.infoForm.patient.patient_name = self.hisFormatter(
                reserve.PatientInfo,
                'patient_name'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_name')
                : self.hisFormatter(haveReserved.PatientInfo, 'patient_name')
              self.infoForm.patient.patient_gender = self.hisFormatter(
                reserve.PatientInfo,
                'patient_gender'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_gender')
                : self.hisFormatter(haveReserved.PatientInfo, 'patient_gender')
              self.infoForm.patient.patient_age = self.ageFormatter(
                reserve.PatientInfo,
                'patient_age',
                self.patient_age_type
              )
                ? self.ageFormatter(
                    reserve.PatientInfo,
                    'patient_age',
                    self.patient_age_type
                  )
                : self.ageFormatter(
                    haveReserved.PatientInfo,
                    'patient_age',
                    self.patient_age_type
                  )

              self.infoForm.patient.patient_tel = self.hisFormatter(
                reserve.PatientInfo,
                'patient_tel'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_tel')
                : self.hisFormatter(haveReserved.PatientInfo, 'patient_tel')
              self.infoForm.patient.study_source = self.hisFormatter(
                reserve.PatientInfo,
                'study_source'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'study_source')
                : self.hisFormatter(haveReserved.PatientInfo, 'study_source')
              self.infoForm.patient.study_patient_in = self.hisFormatter(
                reserve.PatientInfo,
                'study_patient_in'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'study_patient_in')
                : self.hisFormatter(
                    haveReserved.PatientInfo,
                    'study_patient_in'
                  )
              self.infoForm.patient.bed_no = self.hisFormatter(
                reserve.PatientInfo,
                'bed_no'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'bed_no')
                : self.hisFormatter(haveReserved.PatientInfo, 'bed_no')
              self.infoForm.patient.last_menstrual = self.hisFormatter(
                reserve.PatientInfo,
                'last_menstrual'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'last_menstrual')
                : self.hisFormatter(haveReserved.PatientInfo, 'last_menstrual')
              self.infoForm.patient.medical_recordsno = self.hisFormatter(
                reserve.PatientInfo,
                'medical_recordsno'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'medical_recordsno')
                : self.hisFormatter(
                    haveReserved.PatientInfo,
                    'medical_recordsno'
                  )
              self.infoForm.patient.patient_idcard = self.hisFormatter(
                reserve.PatientInfo,
                'patient_idcard'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_idcard')
                : self.hisFormatter(haveReserved.PatientInfo, 'patient_idcard')
              self.infoForm.patient.patient_class = self.hisFormatter(
                reserve.PatientInfo,
                'patientClass'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patientClass')
                : self.hisFormatter(haveReserved.PatientInfo, 'patientClass')
              self.infoForm.patient.patient_home_addr = self.hisFormatter(
                reserve.PatientInfo,
                'patient_home_addr'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_home_addr')
                : self.hisFormatter(
                    haveReserved.PatientInfo,
                    'patient_home_addr'
                  )
              self.infoForm.patient.sick_area = self.hisFormatter(
                reserve.PatientInfo,
                'sick_area'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'sick_area')
                : self.hisFormatter(haveReserved.PatientInfo, 'sick_area')

              self.infoForm.patient.insuranceno = self.hisFormatter(
                reserve.PatientInfo,
                'insuranceno'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'insuranceno')
                : self.hisFormatter(haveReserved.PatientInfo, 'insuranceno')
              self.infoForm.patient.patient_birthday = self.hisFormatter(
                reserve.PatientInfo,
                'patient_birthday'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_birthday')
                : self.hisFormatter(
                    haveReserved.PatientInfo,
                    'patient_birthday'
                  )
              self.infoForm.patient.marry_state = self.hisFormatter(
                reserve.PatientInfo,
                'marry_state'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'marry_state')
                : self.hisFormatter(haveReserved.PatientInfo, 'marry_state')
              //            self.infoForm.patient.patient_hisid = self.hisFormatter(reserve.PatientInfo, 'patient_hisid') ? self.hisFormatter(reserve.PatientInfo, 'patient_hisid') : self.hisFormatter(haveReserved.PatientInfo, 'patient_hisid');
              self.infoForm.patient.patient_id = self.hisFormatter(
                reserve.PatientInfo,
                'patient_id'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_id')
                : self.hisFormatter(haveReserved.PatientInfo, 'patient_id')
              //            self.patient_id = self.infoForm.patient.patient_id
              self.infoForm.patient.patientid = self.hisFormatter(
                reserve.PatientInfo,
                'patientid'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patientid')
                : self.hisFormatter(haveReserved.PatientInfo, 'patientid')
              self.infoForm.patient.empi = self.hisFormatter(
                reserve.PatientInfo,
                'empi'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'empi')
                : self.hisFormatter(haveReserved.PatientInfo, 'empi')
              self.infoForm.patient.patient_nation = self.hisFormatter(
                reserve.PatientInfo,
                'patient_nation'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'patient_nation')
                : self.hisFormatter(haveReserved.PatientInfo, 'patient_nation')
              self.infoForm.patient.fetal_num = self.hisFormatter(
                reserve.PatientInfo,
                'fetal_num'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'fetal_num')
                : self.hisFormatter(haveReserved.PatientInfo, 'fetal_num')
              self.infoForm.patient.pregnancy_days = self.hisFormatter(
                reserve.PatientInfo,
                'pregnancy_days'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'pregnancy_days')
                : self.hisFormatter(haveReserved.PatientInfo, 'pregnancy_days')
              self.infoForm.patient.prebirth_day = self.hisFormatter(
                reserve.PatientInfo,
                'prebirth_day'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'prebirth_day')
                : self.hisFormatter(haveReserved.PatientInfo, 'prebirth_day')
              self.infoForm.patient.medical_card = self.hisFormatter(
                reserve.PatientInfo,
                'medical_card'
              )
                ? self.hisFormatter(reserve.PatientInfo, 'medical_card')
                : self.hisFormatter(haveReserved.PatientInfo, 'medical_card')
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
          self.loading = false
        })
    },
    hisFormatter (param, subParam) {
      if (param) {
        if (param[subParam]) {
          return param[subParam]
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    ageFormatter (param, subParam, patientAgeType) {
      if (param) {
        let str = param[subParam]
        if (str) {
          if (/岁/g.test(str)) {
            str = str.replace('岁', '')
            patientAgeType = '岁'
          }
          if (/月/g.test(str)) {
            str = str.replace('月', '')
            patientAgeType = '月'
          }

          if (/天/g.test(str)) {
            str = str.replace('天', '')
            patientAgeType = '天'
          }
          return str
        }
      }
      return ''
    },
    submitAddForm (formName) {
      // 预约确认提交
      const self = this
      self.$refs[formName].validate(valid => {
        if (valid) {
          if (self.selectActive < 0) {
            self.$message({
              showClose: true,
              message: '请选择一个时段号源',
              type: 'warning'
            })
            return
          }

          let params = JSON.parse(JSON.stringify(self.infoForm))
          let fromInstitutionId = userInfos.institutionId
          let username = userInfos.username
          let userid = userInfos.userid

          params.patient.patient_id = self.patient_id
          params.patient.last_menstrual = self.ruleForm.last_menstrual
          params.patient.pregnancy_days = self.ruleForm.pregnancy_days
          params.patient.patient_age =
            self.infoForm.patient.patient_age + self.patient_age_type
          params.requests.scan_type = self.ruleForm.dictionaryId
          params.requests.check_site = self.ruleForm.bodypartId
          params.reservation.reserva_operator = username || ''
          params.reservation.modify_user_id = userid || ''
          params.reservation.studykind_id = self.ruleForm.studykindId
          params.reservation.form_institution_id = fromInstitutionId || ''
          params.reservation.to_institution_id = self.ruleForm.institutionId
          params.reservation.begin_time =
            self.reservationDate + ' ' + self.registTimeCount.beginTime
          params.reservation.end_time =
            self.reservationDate + ' ' + self.registTimeCount.endTime
          //          console.log(params);
          self.createLoading = true
          self.$apis.Reservation.receiver(params)
            .then(res => {
              self.createLoading = false
              if (res.data.code === 201) {
                self.registCacheTimeCount.beginTime =
                  self.registTimeCount.beginTime
                self.registCacheTimeCount.endTime =
                  self.registTimeCount.endTime
                self.reservation_id = res.data.data.reservation_id
                self.reservationIDs.push(self.reservation_id)
                self.patient_id = res.data.data.patient_id
                // 获取号源
                self.getRegistTimeCountData()
                if (self.hisFlag === 1) {
                  let param = {}
                  let institutionName = userInfos.institutionName
                  param.HISCode1 = self.infoForm.patient.patient_hisid
                  param.PatientType = self.infoForm.patient.study_source
                  param.HospitalName = institutionName
                  self.getHisData(param)
                } else {
                  let param = {}
                  param.patient_id = self.patient_id
                  self.getData(param)
                }
                self.dialogUpdateVisible = true
              } else {
                self.$message({
                  showClose: true,
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
    submitUpdateForm (formName) {
      // 修改预约号源
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
          params.modify_user_id = userid || ''
          params.reservation_id = self.updateForm.reservation_id
          params.studykind_id = self.updateForm.studykindId
          params.scan_type = self.updateForm.dictionaryId
          params.check_site = self.updateForm.bodypartId
          params.last_menstrual = self.updateForm.last_menstrual
          params.pregnancy_days = self.updateForm.pregnancy_days
          params.to_institution_id = self.updateForm.institutionId
          params.begin_time =
            self.reservationUpdateDate +
            ' ' +
            self.registTimeUpdateCount.beginTime
          params.end_time =
            self.reservationUpdateDate +
            ' ' +
            self.registTimeUpdateCount.endTime
          //          console.log(params);
          self.createLoading = true
          self.$apis.Reservation.edit(params)
            .then(res => {
              self.createLoading = false
              if (res.data.code === 203) {
                self.$message({
                  message: '' + res.data.message,
                  type: 'success'
                })
                if (self.hisFlag === 1) {
                  let param = {}
                  let institutionName = userInfos.institutionName
                  param.HISCode1 = self.infoForm.patient.patient_hisid
                  param.PatientType = self.infoForm.patient.study_source
                  param.HospitalName = institutionName
                  self.getHisData(param)
                } else {
                  if (self.updateForm.patient_id) {
                    let param = {
                      patient_id: self.updateForm.patient_id
                    }
                    self.getData(param)
                  }
                }
                this.dialogEditVisible = false
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
    selectRegistTimeCount (item, index) {
      // 选择号源
      if (this.selectActive < 0) {
        if (parseInt(item.reservationCount) + 1 <= item.maxCount) {
          item.reservationCount = parseInt(item.reservationCount) + 1
        }
      } else {
        if (
          parseInt(this.registTimeCount.reservationCount) - 1 >= 0 &&
          parseInt(item.reservationCount) + 1 <= item.maxCount
        ) {
          this.registTimeCount.reservationCount =
            parseInt(this.registTimeCount.reservationCount) - 1
          item.reservationCount = parseInt(item.reservationCount) + 1
        }
      }
      this.selectActive = index
      this.registTimeCount = item
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
    getStudykindData (param) {
      // 根据机构获取检查类型
      const self = this
      self.ruleForm.studykindId = ''
      self.ruleForm.bodypartId = ''
      self.ruleForm.dictionaryId = ''
      self.ruleForm.last_menstrual = ''
      self.ruleForm.pregnancy_days = ''
      self.studyKindName = ''
      self.getSexData()
      self.monthDays = []
      self.daySelect = false
      self.checkInstitution(self.ruleForm.institutionId)
      self.checkStudyKind(self.ruleForm.studykindId)
      self.registTimeCountData = []
      self.registTimeCount = {}
      self.selectActive = -1
      self.studyKindData = []
      self.getStudykind(param, function (res) {
        if (res.data.code === 200) {
          for (let item of res.data.data) {
            self.studyKindData.push(item[0])
          }
        }
      })
    },
    getStudykindUpdateData (param) {
      // 修改预约中根据机构获取检查类型
      const self = this
      self.updateForm.studykindId = ''
      self.updateForm.bodypartId = ''
      self.updateForm.dictionaryId = ''
      self.updateForm.last_menstrual = ''
      self.updateForm.pregnancy_days = ''
      self.studyKindName = ''
      self.getSexData()
      self.monthUpdateDays = []
      self.dayUpdateSelect = false
      self.checkInstitution(self.updateForm.institutionId)
      self.checkStudyKind(self.updateForm.studykindId)
      self.registTimeCountUpdateData = []
      self.registTimeUpdateCount = {}
      self.selectUpdateActive = -1
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
    getStudyData (param) {
      // 根据检查类型获取检查部位和扫描方式
      const self = this
      self.ruleForm.bodypartId = ''
      self.ruleForm.dictionaryId = ''
      self.ruleForm.last_menstrual = ''
      self.ruleForm.pregnancy_days = ''
      self.daySelect = true

      self.checkStudyKind(self.ruleForm.studykindId)
      self.getStudyKindName(param.STUDYKIND_NAME)
      let paramBodyPart = {}
      paramBodyPart.institution_id = self.ruleForm.institutionId
      paramBodyPart.hospitalName = self.institutionName
      paramBodyPart.studykindId = self.ruleForm.studykindId
      paramBodyPart.hideRecord = 1
      // 获取检查部位
      self.$apis.BodyPart.all(paramBodyPart).then(res => {
        if (res.data.code === 200) {
          self.bodyPartData = res.data.data
          self.bodyPartDataList = self.bodyPartData.map(function (item) {
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
      paramDictionary.studykindId = self.ruleForm.studykindId
      paramDictionary.hideRecord = 1
      // 获取扫描方式
      self.$apis.StudyKind.studykindScan(paramDictionary).then(res => {
        if (res.data.code === 200) {
          self.dictionaryIdData = res.data.data
        } else {
          self.$messsage({
            showClose: true,
            message: '' + res.data.message,
            type: 'warning'
          })
        }
      })
      .catch(function () {})
      // 获取号源
      self.getRegistTimeCountData()
      // 获取当月有号源的天数
      self.getTimeIntervalMonthDay()
    },
    getStudyUpdateData (param) {
      const self = this
      self.updateForm.bodypartId = ''
      self.updateForm.dictionaryId = ''
      self.updateForm.last_menstrual = ''
      self.updateForm.pregnancy_days = ''
      self.dayUpdateSelect = true
      self.checkStudyKind(self.updateForm.studykindId)
      self.getStudyKindName(param.STUDYKIND_NAME)
      let paramBodyPart = {}
      paramBodyPart.institution_id = self.updateForm.institutionId
      paramBodyPart.hospitalName = self.institutionName
      paramBodyPart.studykindId = self.updateForm.studykindId
      paramBodyPart.hideRecord = 1
      // 获取检查部位
      self.$apis.BodyPart.all(paramBodyPart).then(res => {
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
      .catch(function () {})

      self.getRegistTimeCountUpdateData()
      self.getTimeIntervalUpdateMonthDay()
    },
    selectDate (date) {
      // 选择日期
      const self = this
      if (
        self.ruleForm.institutionId === '' ||
        self.ruleForm.studykindId === ''
      ) {
        self.$refs['ruleForm'].validateField('institutionId', function () {})
        self.$refs['ruleForm'].validateField('studykindId', function () {})
        self.daySelect = false
      } else {
        self.daySelect = true
      }
      if (self.daySelect) {
        if (
          self.ruleMonthDay !==
          formatMonthDay(date.getFullYear(), date.getMonth() + 1)
        ) {
          self.ruleMonthDay = formatMonthDay(
            date.getFullYear(),
            date.getMonth() + 1
          )
          self.getTimeIntervalMonthDay()
        }
        self.ruleMonthDay = formatMonthDay(
          date.getFullYear(),
          date.getMonth() + 1
        )
        self.reservationDate = formatDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
        self.getRegistTimeCountData() // 获取号源
      }
    },
    selectMonthPre (year, month) {
      const self = this
      self.ruleMonthDay = formatMonthDay(year, month)
      self.getTimeIntervalMonthDay()
    },
    selectMonthNext (year, month) {
      const self = this
      self.ruleMonthDay = formatMonthDay(year, month)
      self.getTimeIntervalMonthDay()
    },
    selectUpdateDate (date) {
      // 选择日期
      const self = this
      if (
        self.updateForm.institutionId === '' ||
        self.updateForm.studykindId === ''
      ) {
        self.$refs['updateForm'].validateField('institutionId', function () {})
        self.$refs['updateForm'].validateField('studykindId', function () {})
        self.dayUpdateSelect = false
      } else {
        self.dayUpdateSelect = true
      }

      if (self.dayUpdateSelect) {
        if (
          self.updateMonthDay !==
          formatMonthDay(date.getFullYear(), date.getMonth() + 1)
        ) {
          self.updateMonthDay = formatMonthDay(
            date.getFullYear(),
            date.getMonth() + 1
          )
          self.getTimeIntervalUpdateMonthDay()
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
      const self = this
      self.updateMonthDay = formatMonthDay(year, month)
      self.getTimeIntervalUpdateMonthDay()
    },
    selectUpdateMonthNext (year, month) {
      const self = this
      self.updateMonthDay = formatMonthDay(year, month)
      self.getTimeIntervalUpdateMonthDay()
    },
    getTimeIntervalMonthDay () {
      // 获取一个月有号源的天数
      const self = this
      let valid = false
      if (
        self.ruleForm.institutionId === '' ||
        self.ruleForm.studykindId === ''
      ) {
        self.$refs['ruleForm'].validateField('institutionId', function () {})
        self.$refs['ruleForm'].validateField('studykindId', function () {})
        valid = false
        self.daySelect = false
      } else {
        valid = true
        self.daySelect = true
      }

      if (valid) {
        self.createLoading = true
        self.monthDays = []
        self.$apis.Reservation.getTimeIntervalMonthDay({
          institutionId: self.ruleForm.institutionId,
          studykindId: self.ruleForm.studykindId,
          validMonth: self.ruleMonthDay
        })
          .then(res => {
            self.createLoading = false
            if (res.data.code === 200) {
              let data = res.data.data
              if (isArray(data) && data.length > 0) {
                for (let value of data) {
                  self.monthDays.push(value.validDate)
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
            self.monthDays = []
          })
      } else {
        return false
      }
    },
    getTimeIntervalUpdateMonthDay () {
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
        self.dayUpdateSelect = false
      } else {
        valid = true
        self.dayUpdateSelect = true
      }

      if (valid) {
        self.createLoading = true
        self.monthUpdateDays = []
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
                  self.monthUpdateDays.push(value.validDate)
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
            self.monthUpdateDays = []
          })
      } else {
        return false
      }
    },
    getRegistTimeCountData () {
      // 获取号源
      const self = this
      let valid = false
      if (
        self.ruleForm.institutionId === '' ||
        self.ruleForm.studykindId === ''
      ) {
        self.$refs['ruleForm'].validateField('institutionId', function () {})
        self.$refs['ruleForm'].validateField('studykindId', function () {})
        valid = false
      } else {
        valid = true
      }

      if (valid) {
        let fromInstitutionId = userInfos.institutionId
        self.createLoading = true
        self.registTimeCountData = []
        self.registTimeCount = {}
        self.selectActive = -1
        self.$apis.Reservation.getRegistTimeCount({
          fromInstitutionId: fromInstitutionId || '',
          toInstitutionId: self.ruleForm.institutionId,
          studykindId: self.ruleForm.studykindId,
          validDate: self.reservationDate
        })
          .then(res => {
            self.createLoading = false
            if (res.data.code === 200) {
              if (isArray(res.data.data)) {
                self.registTimeCountData = res.data.data
              }
            }
          })
          .catch(function () {
            self.registTimeCountData = []
            self.createLoading = false
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
      } else {
        valid = true
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
            if (res.data.code === 200) {
              if (isArray(res.data.data)) {
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
    handleClose (done) {
      // 关闭手工预约的弹出框之前修改
      done()
    },
    cancelReservationForm (formName) {
      // 弹出框取消按钮
      const self = this
      self.dialogAddVisible = false
      self.dialogEditVisible = false
    },
    cancelForm (formName) {
      // 重置
      const self = this
      self.patient_id = ''
      self.hisFlag = 0
      self.tableData = []
      self.reset(formName)
    },
    closeMessage () {
      // 打印并关闭
      const self = this
      self.dialogAddVisible = false
      self.dialogUpdateVisible = false

      if (self.reservationIDs.length > 0) {
        let param = {}
        param.reservation_id = self.reservationIDs
        self.getTemplateReservation(param)
      } else {
        this.$message({
          showClose: true,
          message: '请预约该数据，再打印',
          type: 'warning'
        })
      }
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
.his-search>i {
  font-size: 16px;
  font-weight: 600;
}


.el-table .cell-row {
  background: red;
}



</style>