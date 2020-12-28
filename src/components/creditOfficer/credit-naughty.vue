<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;淘单筛选设置</span>
			</p>
		</div>
		<div class=" contentcss">
			<Tabs type="card" :animated="false" @on-click='tabswitch'>
				<TabPane label="淘单筛选设置" name="name1">
					<Form :label-width="100" class="mt50">
						<FormItem>
							<Row>
								<Col span="24">
								<FormItem v-if="auditing" label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
								<FormItem v-for="item in chanceInfoTitleRes" :label="item.infoTitleName+':'">
									<CheckboxGroup v-model="screen" @on-change="checkAlltdChange">
										<Checkbox :disabled="auditing" v-for="res in item.loanChanceConfigureDetailResList" :label="res.infoOptionKey+'/'+item.infoTitleKey+'/'+res.infoOptionName">{{res.infoOptionName}}</Checkbox>
									</CheckboxGroup>
								</FormItem>
								</Col>
								<Col span="24" class="mt20" v-if="auditing">
								<FormItem label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
								<FormItem v-for="item in updateLoanChanceConfigureRes" :label="item.infoTitleName+':'">
									<CheckboxGroup v-model="screen1">
										<Checkbox :disabled="auditing" v-for="res in item.loanChanceConfigureDetailResList" :label="res.infoOptionKey+'/'+item.infoTitleKey+'/'+res.infoOptionName">{{res.infoOptionName}}</Checkbox>
									</CheckboxGroup>
								</FormItem>

								</Col>
							</Row>
						</FormItem>
						<FormItem class=" mt50 ml100">
							<Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="preservationNaughty">
                <span v-if="!loading3">保存提交审核</span>
              </Button> &nbsp;&nbsp;&nbsp;&nbsp;
							<Button v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine('/loan/chanceTitleAndOption/auditConfigure',1)">
                <span v-if="!loading3">审核</span>
              </Button> &nbsp;&nbsp;&nbsp;&nbsp;
							<Button type="ghost" @click="handleRender4('naughty_edit')">查看操作日志</Button>
						</FormItem>
					</Form>
					<Modal title="审核" v-model="modal9" @on-ok="examineSubmit('formCustomexa')" @on-cancel="handleReset('formCustomexa')" ok-text="保存" cancel-text="取消" class-name="vertical-center-modal" width="500" :loading="loading" :mask-closable="false">
						<div class="newtype_file mt15 mb15">
							<Form ref="formCustomexa" :model="formCustomexa" :rules="ruleCustomexa" :label-width="100" style="padding-left:15px">
								<FormItem label="审核状态:" prop="activeType">
									<Select v-model="formCustomexa.activeType" style="width:160px" @on-change="invitationgive">
										<Option value="pass">审核通过</Option>
										<Option value="reject">审核驳回</Option>
									</Select>
								</FormItem>
								<FormItem label="备注:" prop="remarks" v-if="memos">
									<Input v-model="formCustomexa.remarks" type="textarea" :rows="4" placeholder="请输入备注" />
								</FormItem>
							</Form>
						</div>
					</Modal>
				</TabPane>
				<TabPane label="淘单设置" name="name2">
					<Form  :label-width="150">
            <FormItem>
              <Row>
								<Col span="24">
                <FormItem v-if="amoytwo" label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                <FormItem class="mt15" v-for="(item,index) in loanConfigResList" :label="item.configName+':'">
                  <Row>
                    <Col span="3">
                        <FormItem >
                          <Select :disabled="amoytwo" v-model="item.configStatus" placeholder="请选择" style="width:90px">
                            <Option value="0">关闭</Option>
                            <Option value="1">开启</Option>
                          </Select>
                        </FormItem>
                    </Col>
                    <Col span="3">
                        <FormItem prop="single">
                          <Input :disabled="amoytwo" class=" ml10" v-model="item.configValue" style="width:100px">
                            <span slot="append">天/次</span>
                          </Input>                   
                        </FormItem>
                    </Col>
                    <Col  span="12">
                      <span v-if="index==0" class=" ml10">单个用户淘单次数可以选择关闭、选择周期（天），单位为次</span>
                      <span v-if="index==1" class=" ml10">平台所有用户淘单次数总和可以选择关闭、选择周期（天），单位为次</span>
                    </Col>
                  </Row>							
                </FormItem>								
								</Col>
								<Col span="24" class="mt20" v-if="amoytwo">
                  <FormItem  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                  <FormItem class="mt15" v-for="(item,index) in updateLoanConfigResList" :label="item.configName+':'">
                    <Row>
                      <Col span="3">
                          <FormItem >
                            <Select :disabled="amoytwo" v-model="item.configStatus" placeholder="请选择" style="width:90px">
                              <Option value="0">关闭</Option>
                              <Option value="1">开启</Option>
                            </Select>
                          </FormItem>
                      </Col>
                      <Col span="3">
                          <FormItem prop="single">
                            <Input :disabled="amoytwo" class=" ml10" v-model="item.configValue" style="width:100px">
                              <span slot="append">天/次</span>
                            </Input>                   
                          </FormItem>
                      </Col>
                      <Col  span="12">
                        <span v-if="index==0" class=" ml10">单个用户淘单次数可以选择关闭、选择周期（天），单位为次</span>
                        <span v-if="index==1" class=" ml10">平台所有用户淘单次数总和可以选择关闭、选择周期（天），单位为次</span>
                      </Col>
                    </Row>							
                  </FormItem>
								</Col>
							</Row>
            </FormItem>
            
						<FormItem class=" mt50 ml100">
							<Button v-if="!amoytwo" type="primary" class="w100 examinetype" :loading="loading3" @click="amoyPreservation">
                <span v-if="!loading3">保存提交审核</span>
              </Button> &nbsp;&nbsp;&nbsp;&nbsp;
							<Button v-if="amoytwo" type="primary" class="w100" :loading="loading3" @click="toexamine('/loan/chancer/auditChanceConfig',2)">
                <span v-if="!loading3">审核</span>
              </Button> &nbsp;&nbsp;&nbsp;&nbsp;
							<Button type="ghost" @click="handleRender4('chance_config_edit')">查看操作日志</Button>
						</FormItem>
					</Form>
				</TabPane>
			</Tabs>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				chanceInfoTitleRes: [],
				updateLoanChanceConfigureRes: [],
				screen: [],
				screen1: [],
				loading: true,
				loading3: false,
				auditing: false,
				memos: false,
				modal9: false,
				isJurisdiction: false,
				formCustomexa: {
					activeType: '',
					remarks: ''
				},
				ruleCustomexa: {
					activeType: [{
						required: true,
						message: '请选择审核状态',
						trigger: 'blur'
					}, ],
					remarks: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}, ],
        },
        loanConfigResList :[
          {
            configKey:'',
            configName:'',
            configValue:'',
            configStatus:''
          }
        ],
        updateLoanConfigResList :[
          {
            configKey:'',
            configName:'',
            configValue:'',
            configStatus:''
          }
        ],
        amoytwo:false,
        confirmAudit:''
			};
		},
		created() {},
		methods: {
			// 淘单
			naughtyScreening() {
				this.http.post(BASE_URL + '/loan/chanceTitleAndOption/getQueryList', {})
					.then((resp) => {
						if(resp.code == 'success') {
							if(resp.data.loanChanceConfigureRes.length > 0) {
								this.chanceInfoTitleRes = resp.data.loanChanceConfigureRes
								this.loop(resp.data.loanChanceConfigureRes, this.screen)
							}
							if(resp.data.updateLoanChanceConfigureRes != null) {
								this.loop(resp.data.updateLoanChanceConfigureRes, this.screen1)
								this.auditing = true
								this.updateLoanChanceConfigureRes = resp.data.updateLoanChanceConfigureRes
							} else {
								this.auditing = false
								this.updateLoanChanceConfigureRes = []
							}
						} else {
							this.$Message.error(resp.message);
						}
					})
					.catch(() => {})
			},
			loop(key, list) {
				for(var i = 0; i < key.length; i++) {
					for(var j = 0; j < key[i].loanChanceConfigureDetailResList.length; j++) {
						if(key[i].loanChanceConfigureDetailResList[j].flag == 1) {
							list.push(key[i].loanChanceConfigureDetailResList[j].infoOptionKey + '/' + key[i].infoTitleKey + '/' + key[i].loanChanceConfigureDetailResList[j].infoOptionName)
						}
					}
				}
			},
			//   保存
			preservationNaughty() {
				this.loading3 = true

				this.$Modal.confirm({
					title: "温馨提示",
					content: "<p>确认保存提交审核吗?</p>",
					onOk: () => {
						let list = {}
						let loanChanceConfigureReqList = []
						this.screen.forEach(element => {
							let obj = {}
							let infoTitleKey = element.split('/')[1]
							obj.infoTitleKey = infoTitleKey
							this.chanceInfoTitleRes.forEach(element => {
								if(element.infoTitleKey == infoTitleKey) {
									obj.infoTitleName = element.infoTitleName
								}
							});
							let loanChanceConfigureDetailReqList = []
							let obj2 = {}
							obj2.infoOptionKey = element.split('/')[0]
							obj2.infoTitleKey = infoTitleKey
							obj2.infoOptionName = element.split('/')[2]

							loanChanceConfigureDetailReqList.push(obj2)
							obj.loanChanceConfigureDetailReqList = loanChanceConfigureDetailReqList
							loanChanceConfigureReqList.push(obj)
						});
						list.loanChanceConfigureReqList = loanChanceConfigureReqList
						this.http.post(BASE_URL + '/loan/chanceTitleAndOption/saveConfigure', list)
							.then((resp) => {
								if(resp.code == 'success') {
									this.$Modal.success({
										title: '提示',
										content: '<p>保存成功</p>'
									})

									this.naughtyScreening()
									this.screen = []
									this.screen1 = []
									this.loading3 = false
								} else {
									this.loading3 = false
									this.$Message.error(resp.message);
								}
							})
							.catch(() => {})

					},
					onCancel: () => {
						this.loading3 = false
					}
				})

			},
			// 淘单保存list
			checkAllGroupChange(data) {},
			checkAlltdChange(data) {},
			handleRender4(mode) { //淘单操作日志
				this.$router.push({
					path: './operationLog?operationType='+mode
				})
			},
			changeLoading() {
				this.loading = false
				this.$nextTick(() => {
					this.loading = true
				})
			},
			// 淘单筛选设置审核
			examineSubmit(name) {
				this.$refs[name].validate(valid => {
					if(!valid) {
						return this.changeLoading()
					} else {
						let data = {
							auditStatus: this.formCustomexa.activeType,
							auditRemark: this.formCustomexa.remarks
            }
            let url
            if (this.confirmAudit == '1') {
              url = '/loan/chanceTitleAndOption/auditConfigure'
            } else {
              url = '/loan/chancer/auditChanceConfig'
            }
						this.http.post(BASE_URL + url, data)
							.then(data => {
								if(data.code == 'success') {
									const title = '审核'
									const content = '<p>审核成功</p>'
									this.$Modal.success({
										title: title,
										content: content,
										onOk: () => {
											this.$refs[name].resetFields()
										}
                  })
                  if (this.confirmAudit == '1') {
                    this.screen = []
                    this.screen1 = []
                    this.naughtyScreening()
                  } else {
                    this.scoutQuery ()
                  }
									
								} else {
									this.modal9 = false
									this.$Message.info(data.message)
								}
							})
							.catch((error) => {
								console.log(error)
							})
					}
					// this.changeLoading()
					this.modal9 = false
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields()
				this.memos = false
			},
			invitationgive(v) {
				if(v == 'pass') {
					this.memos = false
				} else {
					this.memos = true
				}
			},
			toexamine(url,num) {
				this.http.post(BASE_URL + "/checkUriPermission", [url]).then(data => {
					if(data.code == 'success') {
						for(const key in data.data) {
							if(data.data[key] == true) {
                if (num == 1) {
                  this.memos = false
                  this.modal9 = true               
                } else {
                  this.memos = false
                  this.modal9 = true
                }
                this.confirmAudit = num					
							} else {
								this.$Message.warning('暂无权限')
							}
						}
					}
				}).catch(err => {});

			},
      // tab切换
      tabswitch (num) {
        if (num == 'name2') {
          this.scoutQuery ()

        }
      },
      // 淘单设置查询
      scoutQuery () {
        this.http.post(BASE_URL + '/loan/chancer/queryChanceConfigList', {})
        .then(data => {
          if(data.code == 'success') {
            for (let i = 0; i < data.data.loanConfigResList.length; i++) {
              data.data.loanConfigResList[i].configStatus = String(data.data.loanConfigResList[i].configStatus)           
            }
            // 审核前
            this.loanConfigResList = data.data.loanConfigResList
            if (data.data.updateLoanConfigResList !=null) {
              for (let i = 0; i < data.data.loanConfigResList.length; i++) {
                data.data.updateLoanConfigResList[i].configStatus = String(data.data.updateLoanConfigResList[i].configStatus)           
              }
              this.updateLoanConfigResList = data.data.updateLoanConfigResList
              this.amoytwo = true
            } else {
              this.amoytwo = false
							this.updateLoanConfigResList = []
            }
          } else {
            this.$Message.info(data.message)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      },
      // 淘单设置保存
      amoyPreservation () {
        let reg = /^(0|[1-9][0-9]*)$/;
        for (let i = 0; i < this.loanConfigResList.length; i++) {
          if (!reg.test(this.loanConfigResList[i].configValue)) {
            this.$Modal.warning({
              title: '提示',
              content: '<p>请输入正确的天数</p>'
            })
            return false
					}
					if (this.loanConfigResList[i].configValue>999999) {
            this.$Modal.warning({
              title: '提示',
              content: '<p>淘单次数限制不得大于999999</p>'
            })
            return false
          }
        }
        this.loading3 = true
				this.$Modal.confirm({
					title: "温馨提示",
					content: "<p>确认保存提交审核吗?</p>",
					onOk: () => {
            for (let i = 0; i < this.loanConfigResList.length; i++) {
              this.loanConfigResList[i].configStatus = Number(this.loanConfigResList[i].configStatus)            
            }
            let list = {
              dataList:this.loanConfigResList
            }
						this.http.post(BASE_URL + '/loan/chancer/saveChanceConfig', list)
							.then((resp) => {
								if(resp.code == 'success') {
									this.$Modal.success({
										title: '提示',
										content: '<p>保存成功</p>'
									})
									this.scoutQuery ()
									this.loading3 = false
								} else {
									this.loading3 = false
									this.$Message.error(resp.message);
								}
							})
							.catch(() => {})

					},
					onCancel: () => {
						this.loading3 = false
					}
				})

      }
		},
		mounted() {
			this.naughtyScreening()
		}
	};
</script>
<style lang="less" scoped>

</style>