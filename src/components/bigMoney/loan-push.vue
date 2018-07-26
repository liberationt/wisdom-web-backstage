<template>
    <div>
        <div class="navigation">
            <p>
                <span>贷款推送明细</span>
            </p>
        </div>
        <div class="mt50">
          <ul class="querysty">
            <li>
              <span class="w60 displayib">甲方名称:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.partyaKey" :key="item.partyaKey">{{ item.partyaName }}</Option>
            </Select>
            </li>
            <li>
              <span class="w60 displayib">推送时间:</span>
              <DatePicker type="date" :value='value1' @on-change="time1" placeholder="开始时间" class="" style="width: 190px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" :value='value2' class="mr20" @on-change="time2" placeholder="结束时间" style="width: 190px"></DatePicker>
            </li>
            <!-- <li>
              <span class="w60 displayib">批次号:</span>
            <Input v-model="model5" class="mr20" placeholder="请输入批次号" style="width: 180px"></Input>
            </li> -->
            <li>
              <span class="w60 displayib">推送状态:</span>
            <Select v-model="model2" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </li>
            <li >
              <span class="w60 displayib">推送方式:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </li>
          </ul> 
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right w100" type="primary" @click="exports">导出</Button> -->
                <Button type="primary" class="right w100" :loading="loading2" @click="exports">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button>
                <!-- <Button class="right mr20 w100" type="info" @click="inquire">查询</Button> -->
                <Button type="info" class="right mr20 w100" :loading="loading3" @click="inquire">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>

        <div class="mt20">
            <Table border highlight-row :columns="party1" :data="data1"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      loading2: false,
      loading3: false,
      model1: this.$route.query.code,
      model2: '',
      model3: '',
      model4: '',
      model5: '',
      value1: '',
      value2: '',
      timval1: '',
      timval2: '',
      total: 0,
			startRow: 1,
			endRow: 10,
      numregistrations: [
        {
          onenum: 10,
          twonum: 10,
          color: 'blue1',
          totalnum: '当日注册总人数'
        },
        {
          onenum: 10,
          twonum: 10,
          color: 'yellow1',
          totalnum: '本周注册总人数'
        },
        {
          onenum: 10,
          twonum: 10,
          color: 'purple1',
          totalnum: '本月注册总人数'
        }
      ],
      cityList: [],
      cityList2: [
        {
          value: '0',
          label: '未推送'
        },
        {
          value: '1',
          label: '推送成功'
        },
        {
          value: '2',
          label: '推送失败'
        }
      ],
      cityList3: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '手动'
        },
        {
          value: '1',
          label: '自动'
        }
      ],
      cityList4: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        }
      ],
      party1: [],
      // 车抵贷
     columns1: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },        
        {
          title: '借款产品类型',
          align: 'center',
          render: (h, params) => {
            let borrowType 
            if (params.row.borrowType == '0') {
              borrowType = '车抵贷'
            } else if(params.row.borrowType == '1'){
              borrowType = '房抵贷'
            } else if(params.row.borrowType == '2'){
              borrowType = '秒速贷'
            } else if(params.row.borrowType == '3'){
              borrowType = '微易融'
            } else if(params.row.borrowType == '4'){
              borrowType = '车分期'
            } else if(params.row.borrowType == '5'){
              borrowType = '易起行'
            } else if(params.row.borrowType == '6'){
              borrowType = '车主信用贷'
            } else if(params.row.borrowType == '100'){
              borrowType = '其他'
            }
            return h('div', [
              h('span', {}, borrowType)
            ])
          }
        },
        {
          title: '来源',
          align: 'center',
          render: (h, params) => {
            let origin
            if (params.row.origin == '0') {
              origin = '手动'
            } else if(params.row.origin == '1'){
              origin = '官网'
            } else if(params.row.origin == '2'){
              origin = '微信'
            }
            return h('div', [
              h('span', {}, origin)
            ])
          }
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
            let code 
            // console.log(params.row.code)
            
            if (params.row.code == '1000') {
              code = '成功'
            } else if(params.row.code == '') {
              code = ''
            } else {
              code = '失败'
            }
            return h('div', [
              h('span', {}, code)
            ])
          }
        },
        {
          title: '返回信息',
          align: 'center',
          key: 'message'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],

      // 凡普
      columns2: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '打卡发薪',
          align: 'center',
          render: (h, params) => {
            let salaryGetForm 
            if (params.row.salaryGetForm == '0') {
              salaryGetForm = '否'
            } else if (params.row.salaryGetForm == '1') {
              salaryGetForm = '是'
            }
							return h('div', [
								h('span', {}, salaryGetForm)
							])
						}
        },
        {
          title: '社保',
          align: 'center',
          render: (h, params) => {
            let socialSecurity 
            if (params.row.socialSecurity == '0') {
              socialSecurity = '无'
            } else if (params.row.socialSecurity == '1') {
              socialSecurity = '有'
            }
							return h('div', [
								h('span', {}, socialSecurity)
							])
						}
        },
         {
          title: '公积金',
          align: 'center',
          render: (h, params) => {
            let accumulationFund 
            if (params.row.accumulationFund == '0') {
              accumulationFund = '无'
            } else if (params.row.accumulationFund == '1') {
              accumulationFund = '有'
            }
							return h('div', [
								h('span', {}, accumulationFund)
							])
						}
        },
        {
          title: '渠道',
          align: 'center',
          key: 'channel'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
            let code 
            if (!params.row.code) {
              code = ''
            } else if (params.row.code == '200') {
              code = '成功'
            } else{
              code = '失败'
            }
            return h('div', [
              h('span', {}, code)
            ])
						}
        },
        {
          title: '错误信息',
          align: 'center',
          key: 'errorMessage'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 秒贷
      columns3: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'cellphone'
        },
        {
          title: '城市编码',
          align: 'center',
          key: 'belongCity'
        },
        {
          title: '媒体来源编号',
          align: 'center',
          key: 'sourceId'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
            let code
            if (params.row.code == '-1') {
              code = '成功'
            } else if (params.row.code == '' || params.row.code == null){
              code = ''
            } else {
              code = '失败'
            }
            return h('div', [
              h('span', {}, code)
            ])
          }
        },
        {
          title: '验证结果',
          align: 'center',
          render: (h, params) => {
            let validResult
            if (params.row.validResult == 'success') {
              validResult = '有效数据'
            } else if (params.row.validResult == '') {
              validResult = ''
            } else {
              validResult = '无效数据'
            } 
            return h('div', [
              h('span', {}, validResult)
            ])
          }
        },
        {
          title: '验证失败信息',
          align: 'center',
          key: 'validFailMsg'
        },
        {
          title: '返回信息',
          align: 'center',
          key: 'msg'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        }
      ],
      // 厚本
       columns4: [
        {
          title: '供应商',
          align: 'center',
          key: 'sid'
        },
        {
          title: '渠道',
          align: 'center',
          key: 'cid'
        },
        {
          title: '广告位ID',
          align: 'center',
          key: 'supplierCodeSub'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '城市编码',
          align: 'center',
          key: 'cityCode'
        },
        {
          title: '生日',
          align: 'center',
          key: 'birthday'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
            let returnCode
            if (params.row.returnCode == '0000') {
              returnCode = '成功'
            } else if(params.row.returnCode ==  ''){
              returnCode = ''
            } else {
              returnCode = '失败'
            }
            return h('div', [
              h('span', {}, returnCode)
            ])
						}
        },
        {
          title: '返回信息',
          align: 'center',
          key: 'returnMsg'
        },
         {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 助贷
      columns5: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '贷款来源',
          align: 'center',
          key: 'source'
        },
        {
          title: '媒体名称',
          align: 'center',
          key: 'meiti'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
          const retCode = params.row.retCode
          let pushStatus = ''
          if (!retCode) {
            pushStatus = ''
          } else if (parseInt(retCode) > 7) {
            pushStatus = '推送成功'
          } else if (retCode == '3') {
            pushStatus = '当天重复申请'
          } else if (retCode == '5') {
            pushStatus = '失败'
          } else if (retCode == '6') {
            pushStatus = '恶意IP'
          } else if (retCode == '7') {
            pushStatus = '恶意电话'
          } else {
            pushStatus = '失败'
          }
          return h('div', [
            h('span', {}, pushStatus)
          ])
          }
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        }
      ],
      // 速易贷
      // columns6: [
      //   {
      //     title: '名称',
      //     align: 'center',
      //     key: 'name'
      //   },
      //   {
      //     title: '手机号',
      //     align: 'center',
      //     key: 'phone'
      //   },
      //   {
      //     title: '推送批次号',
      //     align: 'center',
      //     key: 'pushBatchNum'
      //   },
      //   {
      //     title: '贷款金额(万)',
      //     align: 'center',
      //     key: 'loanAmount'
      //   },
      //   {
      //     title: '开始时间',
      //     align: 'center',
      //     key: 'beginTime'
      //   },
      //   {
      //     title: '结束时间',
      //     align: 'center',
      //     key: 'endTime'
      //   },
      //   {
      //     title: '注册时间',
      //     align: 'center',
      //     key: 'registrationTime'
      //   },
      //   {
      //     title: '推送时间',
      //     align: 'center',
      //     key: 'pushTime'
      //   },
      //   {
      //     title: '推送状态',
      //     align: 'center',
      //     render: (h, params) => {
      //       let pushStatus
      //       if (params.row.pushStatus == 0) {
      //         pushStatus = '未推送'
      //       } else if (params.row.pushStatus == 1) {
      //         pushStatus = '推送成功'
      //       } else {
      //         pushStatus = '推送失败'
      //       }
			// 				return h('div', [
			// 					h('span', {}, pushStatus)
			// 				])
			// 			}
      //   }
      // ],
      // 银谷
       columns7: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '渠道编号',
          align: 'center',
          key: 'channelCode'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
            let rspCode
            if (params.row.rspCode == '200') {
              rspCode = '成功'
            } else if (params.row.rspCode == '') {
              rspCode = ''
            } else {
              rspCode = '失败'
            }
            return h('div', [
              h('span', {}, rspCode)
            ])
						}
        },
        {
          title: '返回信息',
          align: 'center',
          key: 'rspMsg'
        },
        {
          title: '展示信息',
          align: 'center',
          key: 'showMsg'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 宜信
      columns8: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '邮箱',
          align: 'center',
          key: 'email'
        },
        {
          title: '性别',
          align: 'center',
          render: (h, params) => {
          let gender
          if (params.row.gender == '0') {
            gender = '男'
          } else if (params.row.gender == '1') {
            gender = '女'
          } else {
            gender = '未知'
          }
          return h('div', [
            h('span', {}, gender)
          ])
          }
        },
        {
          title: '生日',
          align: 'center',
          key: 'birthDate'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },  
        {
          title: '转化结果',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.succ == 'true') {
              succ = '转化成功'
              // console.log('推送成功')
            } else if (params.row.succ == 'false') {
              succ = '转化失败'
            } else {
              succ = ''
              // console.log('推送失败')
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '返回码',
          align: 'center',
           key: 'msg'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        }
      ],
      // 大地
      columns9: [
        {
          title: '姓名',
          align: 'center',
          key: 'customerName'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '城市编码',
          align: 'center',
          key: 'cityId'
        },
        {
          title: '媒体来源编号',
          align: 'center',
          key: 'businessChannel'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '数据状态',
          align: 'center',
          render: (h, params) => {
            let succ
            if (!params.row.databusStatus) {
              succ = ''
            } else if (params.row.databusStatus == '0000') {
              succ = '成功'
            } else {
              succ = '失败'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '错误信息',
          align: 'center',
          key: 'errorMessage'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        }
      ],
      // fangcrm
      columns10: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'telephonenumber'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '借款金额(元)',
          align: 'center',
          key:'loanAmount'
        },
        {
          title: '借款期限(月)',
          align: 'center',
          key:'duration'
        },
        {
          title: '公积金',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.accumulationFund == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '社保',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.socialSecurity == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '寿险',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.lifeInsurance == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '保单',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.policy == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '微粒贷',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.particleLoan == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '信用卡',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.creditCard == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '车',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.car == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '房',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.house == '0') {
              succ = '无'
            } else {
              succ = '有'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '错误信息',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.errMsg == 'success') {
              succ = '成功'
            } else if (params.row.errMsg == '') {
              succ = ''
            } else {
              succ = '失败'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        }
      ],
      // 新一贷
          columns11: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'teleNum'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '页面类型',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.pageType == '1') {
              succ = '小消'
            } else if (params.row.pageType == '2') {
              succ = '新一贷'
            } else if (params.row.pageType == '3') {
              succ = '统一获客'
            } else {
              succ = ''
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '是否直通',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.isDirectForm == 'Y') {
              succ = '直通'
            } else if (params.row.isDirectForm == '') {
              succ = ''
            } else {
              succ = '非直通'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}

        },
        {
          title: '数据来源',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.custSrc == '1') {
              succ = '自有表单'
            } else if (params.row.custSrc == '2') {
              succ = '外部合作伙伴'
            } else if (params.row.custSrc == '3') {
              succ = '第三方数据'
            } else {
              succ = ''
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '媒体来源投放代码',
          align: 'center',
          key: 'mediaSourceId'
        },
        {
          title: '活动名称代码',
          align: 'center',
          key: 'campaignCode'
        },
        {
          title: '职业类型',
          align: 'center',
          render: (h, params) => {
          let profession
            if (params.row.profession == '0') {
              profession = '公司职员'
            } else if (params.row.profession == '2') {
              profession = '私营业主'
            } else if (params.row.profession == '4') {
              profession = '公务员'
            }
            return h('div', [
              h('span', {}, profession)
            ])
          }
        },
        {
          title: '发薪方式',
          align: 'center',
          render: (h, params) => {
          let payoffType
            if (params.row.payoffType == '0') {
              payoffType = '银行转账发薪'
            } else if (params.row.payoffType == '1') {
              payoffType = '通过现金发薪'
            } 
            return h('div', [
              h('span', {}, payoffType)
            ])
          }
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '返回码',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.resultCode == '0') {
              succ = '成功'
            } else if (params.row.resultCode == '') {
              succ = ''
            } else  {
              succ = '失败'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: '错误码',
          align: 'center',
          key: 'errorCode'
        },
        {
          title: '错误信息',
          align: 'center',
          key: 'errorMsg'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
        {
          title: '推送方式',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        }
      ],
      data1: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
        // console.log(page)
				this.startRow = page
				this.inquire()
		},
    pagesizechange(page) {
      // console.log(page)
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    // 时间判断
			time1(value, data) {
				this.value1 = value
			},
			time2(value, data) {
				this.value2 = value
			},
			inquire () {
        // 列表查询
        this.loading3 = true
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
          this.loading3 = false
					this.$Modal.warning({
						title: '注册时间',
						content: '<p>开始时间不得大于结束时间</p>'
					})
					return false
        }
        let params = {
          partyaKey: this.model1,
          beginTime: this.value1,
          endTime: this.value2,
          // pushBatchNum: this.model5,
          pushStatus: this.model2,
          origin: this.model3,
          pageNum: this.startRow,
          pageSize: this.endRow,

        }
        // console.log(params)
				this.http.post(BASE_URL + '/common/partya/getDkBJpuhuiList',params)
					.then((resp) => {
            // console.log(resp) 
						if(resp.code == 'success') {
              // console.log(this.model1)
              if (this.model1 == 'partya-chedidai') {//车抵贷
                this.party1 = this.columns1
                this.data1 = resp.data.dkChedidaiList
              } else if (this.model1 == 'partya-fanpuwang') {//凡普网
                this.party1 = this.columns2
                this.data1 = resp.data.dkFanpuList
              } else if (this.model1 == 'partya-miaodai') {//秒贷
                this.party1 = this.columns3
                this.data1 = resp.data.dkMiaodaiList
              } else if (this.model1 == 'partya-houbenjinrong') {//厚本
                this.party1 = this.columns4
                this.data1 = resp.data.dkHoubenList
              } else if (this.model1 == 'partya-zhudaiwang') {//助贷网
                this.party1 = this.columns5
                this.data1 = resp.data.dkZhudaiList
              } else if (this.model1 == 'partya-yingu') {//银谷
                this.party1 = this.columns7
                this.data1 = resp.data.dkYinguList
              } else if (this.model1 == 'partya-yixin') {//宜信
                this.party1 = this.columns8
                this.data1 = resp.data.dkYinxinList
              } else if (this.model1 == 'partya-dadi') {//大地
                this.party1 = this.columns9
                this.data1 = resp.data.dkDadiList
              } else if (this.model1 == 'partya-fangcrm') {//fangcrm
                this.party1 = this.columns10
                this.data1 = resp.data.dkFangcrmList
              } else if (this.model1 == 'partya-xinyidai') {//新一贷
                this.party1 = this.columns11
                this.data1 = resp.data.dkXinyidaiList
              } else {
                this.party1 = ''
                this.data1 = ''
              }               
              this.total = Number(resp.data.total)
              this.startRow = Math.ceil(resp.data.startRow / this.endRow)
              if(Number(resp.data.total) == 0) {
                  this.startRow = 1
                }
              this.loading3 = false
						} else {
              this.loading3 = false
						}
					})
					.catch(() => {
            this.loading3 = false
          })
      },
      // 导出
      exports () {
        // 封装form 表单
        this.loading2 = true
        let formData = new FormData()
        formData.append("partyaKey",this.model1)
        formData.append("beginTime",this.value1)
        formData.append("endTime",this.value2)
        // formData.append("pushBatchNum",this.model5)
        formData.append("pushStatus",this.model2)
        formData.append("origin",this.model3)
        formData.append("methodType",1)
        let httpUrl = BASE_URL+'/common/partya/exportExcel'
        utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
          if(e == true){
            this.loading2 = false
          }
        })                      
      }     
  },
  mounted () {
      var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
			month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			this.value1 =  currentdate;
			this.value2 = currentdate;
    // 甲方名称
			this.http.post(BASE_URL + '/loan/partya/queryCompanyPartyaList?company=luohui&partyaBusiness=0&sendTypes=2')
				.then((resp) => {
					if(resp.code == 'success') {
            this.cityList = resp.data
            this.model1 = resp.data[0].partyaKey
            this.inquire ()
					} else {

					}
				})
        .catch(() => {})
        // 列表
        
        
  }
}
</script>
<style lang="less" scoped>
</style>
