const api = {
    account: { //账号详情
        saveInfo: "/cloudform-authority/authority/sysUser/update/v1.0",
        submitPassword: "/cloudform-authority/authority/updatePassword/v1.0",
        getUserInfo: "/cloudform-authority/authority/sysUser/searchUserInfo/v1.0",
        getRoles: "/cloudform-authority/authority/dictUtil/queryDictList/v1.0"
    },
    chscList: { //
        getData: "/cloudform-statistics/formStatistics/getCommunityList/v1.0"
    },
    cloudFilm: { //电子胶片
        getType: "/cloudform-cloudfilm/report/getTypes/v1.0",
        getReportList: "/cloudform-cloudfilm/report/getReportList/v1.0",
        getReportToken: "/cloudform-cloudfilm/report/getReportToken/v1.0",
        initQCode: "http://193.112.47.86:82/html/report.html"
    },
    consultation: { //会诊页面
        searchDoctor: "/cloudform-imgconsultation/consultation/searchDoctor/v1.0",
        makeConsultation: "/cloudform-imgconsultation/consultation/makeConsultation/v1.0",
        getPatientInfo: "/cloudform-imgconsultation/consultation/getPatientInfo/v1.0",
        getHospital: "/cloudform-imgconsultation/consultation/getHospital/v1.0",
        getDepartment: "/cloudform-authority/authority/dictUtil/queryConsultationDict/v1.0"
    },
    consultationList: { //会诊列表
        getConsultationList: "/cloudform-imgconsultation/consultation/queryConsultationList/v1.0",
        removeConsultation: "/cloudform-imgconsultation/consultation/recallConsultation/v1.0"
    },
    dataStats: { //数据统计
        // getHospitalBasicData: "/cloudform-statistics/workStatistics/getHospitalBasicData/v2.0"
        //接入机构
        getJoinNumber: '/cloudform-statistics/numberData/getJoinNumber/v2.0',
        // 接入医生
        getDoctorNumber: '/cloudform-statistics/numberData/getDoctorNumber/v2.0',
        //会诊量
        getConsultNumber: '/cloudform-statistics/numberData/getConsultNumber/v2.0',
        //检查量
        getStudyNumber: '/cloudform-statistics/numberData/getStudyNumber/v2.0',
        //医生职称分布
        getDoctorTitleSpread: '/cloudform-statistics/chartData/getDoctorTitleSpread/v2.0',
        //签约医生数量趋势
        getDoctorNumberAndDate: '/cloudform-statistics/chartData/getDoctorNumberAndDate/v2.0',
        //会诊量趋势
        getConsultationNumberAndDate: '/cloudform-statistics/chartData/getConsultationNumberAndDate/v2.0',
        //医生初诊量排名
        getConsultationDoctorAndNumber: '/cloudform-statistics/chartData/getConsultationDoctorAndNumber/v2.0',
        //设备检查量占比
        getStudyTypeAndPersent: '/cloudform-statistics/chartData/getStudyTypeAndPersent/v2.0',
        //设备阳性率占比
        getStudyePositiveAndPersent: '/cloudform-statistics/chartData/getStudyePositiveAndPersent/v2.0',
        //部位检查量比
        getStudyBodyAndPersent: '/cloudform-statistics/chartData/getStudyBodyAndPersent/v2.0',
        //基础医院上传检查数量排名
        getHospitalUploadRank: '/cloudform-statistics/chartData/getHospitalUploadRank/v2.0',
        //按地区医生数量分布
        getDoctorNumberAndArea: '/cloudform-statistics/chartData/getDoctorNumberAndArea/v2.0',
        getStorageNumber: '/cloudform-statistics/numberData/getStorageNumber/v2.0'
    },
    dataStats2: { //数据统计
        getCommunityList: "/cloudform-statistics/formStatistics/getCommunityList/v2.0"
    },
    doctorCreat: { //医生注册
        actionUrl: "http://123.207.247.110:8000/cloudform-authority/authority/sysUser/saveDoctors/v1.0",
        sysUser: "/cloudform-authority/authority/sysUser/save/v1.0",
        getRoles: "/cloudform-authority/authority/dictUtil/queryDictList/v1.0",
        getUserList: "/cloudform-authority/authority/sysUser/queryDoctorList/v1.0",
        modifyDoctorInfo: '/cloudform-authority/authority/sysUser/update/v1.0',
        queryRemarks: "/cloudform-authority/authority/sysUser/queryRemarks/v1.0",
        downModel: "http://123.207.247.110:8000/cloudform-authority/authority/sysUser/downModel/v1.0?hospitalId="
    },
    editReport: { //编辑报告
        issueReport: "/cloudform-imgconsultation/report/finishReport/v1.0",
        saveReport: "/cloudform-imgconsultation/report/saveReport/v1.0",
        getReportInfo: "/cloudform-imgconsultation/report/getNewReport/v1.0"
    },
    expertExamine: { //专家审核
        getExpertList: "/cloudform-authority/authority/sysUser/searchExpert/v1.0",
        rejectOrPassApply: "/cloudform-authority/authority/sysUser/review/v1.0",
        queryHospital: "/cloudform-statistics/formStatistics/getHospitalList/v1.0",
        queryDictList: "/cloudform-authority/authority/dictUtil/queryDictList/v1.0"
    },
    hospitalList: { //医院列表
        queryHospital: "/cloudform-statistics/listData/getHospitalList/v2.0",
        queryDictList: "/cloudform-authority/authority/dictUtil/queryDictList/v1.0"
    },
    index: { //首页
        getEepertList: "/cloudform-authority/authority/sysUser/queryExpert/v1.0"
    },
    login: { //登录页面
        login: "/cloudform-authority/authority/login/v1.0",
        checkVerificationCode: "/cloudform-authority/authority/checkVerificationCode/v1.0",
        register: '/cloudform-authority/authority/sysUser/save/v1.0',
        resetPassword: "/cloudform-authority/authority/resetPassword/v1.0",
        sendVerificationCode: "/cloudform-authority/authority/sendVerificationCode/v1.0"
    },
    map: { //地图页面
        getHospitalData: "/cloudform-statistics/mapData/getMapStatus/v2.0"
    },
    myConsultation: { //我的会诊
        getConsultationList: "/cloudform-imgconsultation/consultation/myConsultationList/v1.0",
        searchList: "/cloudform-imgconsultation/consultation/queryConsultation/v1.0",
        queryDiagnose: "/cloudform-imgconsultation/consultation/queryDiagnosticOpinion/v1.0",
        saveDiagnosticOpinion: "/cloudform-imgconsultation/consultation/saveDiagnosticOpinion/v1.0",
        refuseOrReceiveConsultation: "/cloudform-imgconsultation/consultation/refuseOrReceiveConsultation/v1.0",
        finishConsultation: "/cloudform-imgconsultation/consultation/finishConsultation/v1.0"
    },
    myPatient: { //我的患者
        queryConsultation: "/cloudform-imgconsultation/consultation/queryConsultation/v1.0",
        getPatientList: "/cloudform-imgconsultation/consultation/myPatientList/v1.0",
        checkReason: "/cloudform-imgconsultation/consultation/queryRemarks/v1.0",
        checkDiagnose: "/cloudform-imgconsultation/consultation/queryDiagnosticOpinion/v1.0",
        recallConsultation: "/cloudform-imgconsultation/consultation/cancelConsultation/v1.0"
    },
    patientList: { //临床浏览
        getPatientList: "http://183.240.147.145:7070/study/v1.0/list",
        getDict: "/cloudform-authority/authority/dictUtil/queryDictList/v1.0",
        queryHospital: "/cloudform-statistics/listData/getHospitalList/v2.0"

    },
    report: { //查看报告
        getReportInfo: "/cloudform-imgconsultation/report/getReportInfo/v1.0"
    },
    serverList: { //服务器列表
        queryCloudMachineList: "/cloudform-statistics/server/queryCloudMachineList/v1.0",
        getCloudMachineStatus: "/cloudform-statistics/server/getCloudMachineStatus/v1.0",
        queryFrontMachineList: "/cloudform-statistics/server/queryFrontMachineList/v1.0",
        getFrontMachineStatus: "/cloudform-statistics/server/getFrontMachineStatus/v1.0"
    },
    pacsView: "http://183.240.147.24:83/clinicWebPacsViewPc/index.html#", //阅片路径
    checkReport: "http://183.240.147.24:83/clinicWebPacsViewPc/report.html#", //临床查看报告
    openFullScreen: "http://183.240.147.144:7070/fullScreen/" //打开全屏
};
export default api