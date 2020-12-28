<template>
	<div class="contentcss">
		<ul>
			<li class="mt15">
				<span class="w150 displayib tr mr10">昵称:</span>
				<span>{{detailslist.name}}</span>
				<Input v-if="!this.$route.query.displayhid" class=" ml5" v-model="nickname" placeholder="请输入昵称"  style="width: 150px">
                  </Input>
				<Button :disabled="this.$route.query.displayhid" class="ml20" type="primary" @click="invalidList">无效名单</Button>
				<Button :disabled="this.$route.query.displayhid" class="ml20" type="primary" @click="berobbed">拨打</Button>
			</li>
			<li class="mt15">
				<span class="w150 displayib tr mr10">手机号:</span>
				<span>{{detailslist.phoneNumber}}</span>
			</li>
			<li class="mt15">
				<span class="w150 displayib tr mr10">渠道:</span>
				<span>{{detailslist.channel}}</span>
			</li>
			<li class="mt15">
				<span class="w150 displayib tr mr10">年龄:</span>
				<span>{{detailslist.age}}</span>
				<Select v-if="!this.$route.query.displayhid" :filterable='true' class="ml20" v-model="year" @on-change="yearchange"  placeholder="请选择年" style="width:100px;">
					<Option v-for="item in yearlist" :value="item" :key="item">{{ item }}</Option>
				</Select>
				<Select v-if="!this.$route.query.displayhid" class="ml5" v-model="month" @on-change="monthchange" placeholder="请选择月" style="width:100px;">
					<Option v-for="item in monthlist" :value="item" :key="item">{{ item }}</Option>
				</Select>
				<Select v-if="!this.$route.query.displayhid" class="ml5" v-model="day" placeholder="请选择日" style="width:100px;">
					<Option v-for="item in daylist" :value="item" :key="item">{{ item }}</Option>
				</Select>
				<!-- <DatePicker v-if="!this.$route.query.displayhid" type="year" v-model="year" placeholder="请选择" style="width: 200px"></DatePicker> -->
				<!-- <DatePicker  type="date" :options="options3" v-model="age" placeholder="请选择" style="width: 200px"></DatePicker> -->
				<!-- <InputNumber class="ml20" :max="70" :min="18"  style="width: 150px" v-model="age"></InputNumber> -->
			</li>
			<li class="mt15">
				<span class="w150 displayib tr mr10">所在区域:</span>
				<span>{{detailslist.loanCityNameFirst}} {{detailslist.loanCityNameSecond}}</span>
				<Select v-if="!this.$route.query.displayhid" :filterable='true' class="ml20" v-model="model2" @on-change="citys(model2)" placeholder="请选择省" style="width:150px;">
					<Option v-for="item in cityType1" @click.native="province(item.name)" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
				</Select>
				<Select v-if="!this.$route.query.displayhid" :filterable='true' v-model="model3" placeholder="请选择市" style="width:150px;margin-left:10px">
					<Option v-for="item in status1" @click.native="citysclick(item.name)" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
				</Select>
			</li>
			<!-- 贷款金额 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[0].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[0].value" @on-change="radioAlltdChange(loanPeriod[0].value,0)">
					<Radio v-for="res in detailslist.titleList[0].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 贷款期限 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[1].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[1].value" @on-change="radioAlltdChange(loanPeriod[1].value,1)">
					<Radio v-for="res in detailslist.titleList[1].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 职业类型 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[2].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[2].value" @on-change="radioAlltdChange(loanPeriod[2].value,2)">
					<Radio v-for="res in detailslist.titleList[2].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 月收入 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[3].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[3].value" @on-change="radioAlltdChange(loanPeriod[3].value,3)">
					<Radio v-for="res in detailslist.titleList[3].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 工资发放形式 -->
			<li class="mt15" v-if="loanPeriod[2].value == 'employees'">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[4].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[4].value" @on-change="radioAlltdChange(loanPeriod[4].value,4)">
					<Radio v-for="res in detailslist.titleList[4].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 户籍类型 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[5].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[5].value" @on-change="radioAlltdChange(loanPeriod[5].value,5)">
					<Radio v-for="res in detailslist.titleList[5].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有无社保 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[6].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[6].value" @on-change="radioAlltdChange(loanPeriod[6].value,6)">
					<Radio v-for="res in detailslist.titleList[6].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有无公积金 -->
			<li class="mt15" v-if="loanPeriod[6].value=='is_social_security_yes'">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[7].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[7].value" @on-change="radioAlltdChange(loanPeriod[7].value,7)">
					<Radio v-for="res in detailslist.titleList[7].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 名下有房 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[8].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[8].value" @on-change="radioAlltdChange(loanPeriod[8].value,8)">
					<Radio v-for="res in detailslist.titleList[8].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有无房贷 -->
			<li class="mt15" v-if="loanPeriod[8].value=='own_house_yes'">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[9].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[9].value" @on-change="radioAlltdChange(loanPeriod[9].value,9)">
					<Radio v-for="res in detailslist.titleList[9].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 名下有车 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[10].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[10].value" @on-change="radioAlltdChange(loanPeriod[10].value,10)">
					<Radio v-for="res in detailslist.titleList[10].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有无车贷 -->
			<li class="mt15" v-if="loanPeriod[10].value=='own_car_yes'">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[11].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[11].value" @on-change="radioAlltdChange(loanPeriod[11].value,11)">
					<Radio v-for="res in detailslist.titleList[11].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有寿险保单 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[12].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[12].value" @on-change="radioAlltdChange(loanPeriod[12].value,12)">
					<Radio v-for="res in detailslist.titleList[12].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有无信用卡 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[13].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[13].value" @on-change="radioAlltdChange(loanPeriod[13].value,13)">
					<Radio v-for="res in detailslist.titleList[13].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>
			<!-- 有微粒贷 -->
			<li class="mt15">
				<span class="w150 displayib tr mr10">{{detailslist.titleList[14].infoTitleName}}:</span>
				<RadioGroup v-model="loanPeriod[14].value" @on-change="radioAlltdChange(loanPeriod[14].value,14)">
					<Radio v-for="res in detailslist.titleList[14].options" :label="res.infoOptionKey" :disabled="displayhid">{{res.infoOptionName}}</Radio>
				</RadioGroup>
			</li>

			<li class="mt15">
				<span class="w150 displayib tr mr10">备注:</span>
				<Input style="width:300px" :maxlength='50' v-model="remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :disabled="displayhid" placeholder="请输入备注" />
			</li>
			<li class="mt50 tc">
				<Button v-if="!this.$route.query.displayhid" type="primary" @click="submitRevision">提交修改</Button>
				<Button v-if="!this.$route.query.displayhid" class="ml10" type="primary" @click="invalidList">无效名单</Button>
				<Button v-if="!this.$route.query.displayhid" class="ml10" type="primary" @click="conserve">保存</Button>
				<Button v-if="!this.$route.query.displayhid" class="ml10" @click="abrogate">取消</Button>
				<Button v-if="this.$route.query.displayhid" class="ml10" @click="backingout">返回</Button>
			</li>
		</ul>
		<Modal v-model="modal3" width="360">
			<p slot="header" style="color:#3d81f2;text-align:left">
				<Icon type="ios-information-circle"></Icon>
				<span>温馨提示</span>
			</p>
			<div style="text-align:center">
				<p>标注成功</p>
				<!-- <p>是否要忽略?</p> -->
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="tagging(1)">确定</Button>
			</div>
		</Modal>
		<Modal title="温馨提示" v-model="modal4" @on-ok="submitexamine" ok-text="确定" cancel-text="取消" class-name="vertical-center-modal" width="400" :loading="loading" :mask-closable="false">
			<div class="newtype_file mt15 mb15">
				<p style="">
					<Icon type="help-circled" style="font-size:30px;color:#FF9900;vertical-align: middle;margin-right:20px"></Icon>是否确认<span style="color:red">修改用户贷款资料</span>并<span style="color:red">标记为已电审</span>？</p>
			</div>
		</Modal>
		<Modal v-model="modal5" width="360">
			<p slot="header" style="color:#3d81f2;text-align:left">
				<Icon type="ios-information-circle"></Icon>
				<span>温馨提示</span>
			</p>
			<div style="text-align:center">
				<p>修改并标记成功</p>
				<!-- <p>是否要忽略?</p> -->
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="tagging(2)">确定</Button>
			</div>
		</Modal>
		<Modal v-model="modal6" width="360">
			<p slot="header" style="color:#ED4014;text-align:left">
				<Icon type="ios-information-circle"></Icon>
				<span>温馨提示</span>
			</p>
			<div style="text-align:center">
				<p>{{messageq}},无法更新资料信息</p>
				<!-- <p>是否要忽略?</p> -->
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="$router.back(-1)" >确定</Button>
			</div>
		</Modal>
		<Modal
              title="拨打电话"
                v-model="modal7"
                ok-text="确认"
                cancel-text="取消"
                @on-ok="dialing"
                width='300'
                :mask-closable="false"
                class-name="vertical-center-modal">
                <p>确认拨打客户 {{detailslist.name}} 的电话吗?</p>
              </Modal>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				modal3: false,
				modal4: false,
				modal5:false,
				modal6:false,
				modal7:false,
				feteday:'',
				messageq:'',
				nickname:'',//昵称
				detailslist: {
					titleList: [{
						infoTitleName: '',
						options: [{
							infoOptionKey: '',
							infoOptionName: ''
						}]
					}]
				},
				options3: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now();
					}
				},
				age: '', //年龄
				year: '', //年
				month: '', //月
				day: '', //日
				model2: '',
				model3: '',
				loanAdCodeFirst:'',
				loanAdCodeSecond:'',
				loanCityName:'',
				loanSecondName:'',
				status1: [],
				loanPeriod: [{
					value: ''
				}],
				remarks: '',
				infoOptionValuelist: [],
				loanCityNameFirst: '', //省
				loanCityNameSecond: '', //市
				loanCityNameThird: '', //区
				displayhid: this.$route.query.displayhid,
				cityType1: [],
				titleReqList: [],
				yearlist: [
					'1900', '1901', '1902', '1903', '1904', '1905', '1906', '1907', '1908', '1909', '1910',
					'1911', '1912', '1913', '1914', '1915', '1916', '1917', '1918', '1919', '1920',
					'1921', '1922', '1923', '1924', '1925', '1926', '1927', '1928', '1929', '1930',
					'1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938', '1939', '1940',
					'1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949', '1950',
					'1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960',
					'1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
					'1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980',
					'1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990',
					'1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',
					'2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
					'2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020',
					'2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030',
					'2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040',
					'2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050'
				],
				monthlist:[],		
				daylist: [],
				citylist:{}
			}
		},
		methods: {
			//省 
			citys(v) {
				let data = {
					"data": v
				}
				this.httpshi(data)
				// this.model2 = v
			},
			// 市接口
			httpshi(data) {
				let citycodelist = []
				for (const key in this.citylist) {
					if (key.split(',').length>1&&key.split(',')[1] == data.data&&key.split(',').length<3) {
						for (const index in this.citylist[key]) {
							let obj = new Object ()
							obj.adcode = index
							obj.name = this.citylist[key][index]
							citycodelist.push(obj)
						}
					}
				}
				this.status1 = citycodelist
				// this.http.post(BASE_URL + "/loan/hotcity/queryCityAddressList", data).then(data => {
				// 	this.status1 = data.data
				// })
			},
			// 提交修改
			submitRevision() {
				this.http.post(BASE_URL + "/sale/userinfo/LoanUserIsRob", {loanUserCode:this.$route.query.loanUserCode})
				.then(data => {
					if (data.code == 'success') {
						if (this.nickname!='') {
							let han = /^[\u4e00-\u9fa5]{2,10}$/;
							if (!han.test(this.nickname)) {
								this.$Modal.warning({
									title: "提示",
									content: "<p>昵称请输入汉字 (2-10个汉字)</p>"
								});
								return false
							}
						} else {
							this.nickname = this.detailslist.name
						}
						if((this.detailslist.age == null||this.detailslist.age == 0) && (this.year == '' || this.month == '' || this.day == '')) {
					this.$Modal.warning({
						title: "提示",
						content: "<p>请选择年龄</p>"
					});
					return false
				}
				if(this.detailslist.loanCityNameFirst == '' || this.detailslist.loanCityNameSecond == '') {
					if (this.model2==''||this.model3=='') {
						this.$Modal.warning({
							title: "提示",
							content: "<p>请选择城市</p>"
						});
						return false
					}				
				} else {
					if (this.model2!='') {
						if (this.model3=='') {
							this.$Modal.warning({
							title: "提示",
							content: "<p>请选择城市</p>"
						});
						return false
						}						
					}
				}
				let titleReqList = []
				// console.log(this.loanPeriod)
				for(let i = 0; i < this.loanPeriod.length; i++) {
					let obj = new Object()
						let optionKey = []
						optionKey.push(this.loanPeriod[i].value)
						obj.optionKey = optionKey
						obj.titleKey = this.detailslist.titleList[i].infoTitleKey
						titleReqList.push(obj)
					if(this.loanPeriod[i].value != null) {
						
					} else {
						if (i>0) {
							if (this.loanPeriod[i-1].value==null) {
								this.$Modal.warning({
									title: "提示",
									content: "<p>用户信息未完善,请检查!</p>"
								});
								return false
							}
							if (this.loanPeriod[i-1].value!='is_social_security_no'&&this.loanPeriod[i-1].value!='own_house_no'&&this.loanPeriod[i-1].value!='own_car_no') {
							this.$Modal.warning({
								title: "提示",
								content: "<p>用户信息未完善,请检查!</p>"
							});
							return false
						}
						}
					}
				}
				// console.log(titleReqList)
				for (let h = 0; h < titleReqList.length; h++) {
					if (
					titleReqList[h].optionKey[0] == 'civil_servant'|| 
					titleReqList[h].optionKey[0] == 'employer' ||
					titleReqList[h].optionKey[0] == 'merchant' ||
					titleReqList[h].optionKey[0] == 'soho' 
					) {
						titleReqList.splice(h+2,1)
					}
					if (
						titleReqList[h].optionKey[0] == 'is_social_security_no' ||
						titleReqList[h].optionKey[0] == 'own_house_no' ||
						titleReqList[h].optionKey[0] == 'own_car_no'
						) {
						titleReqList.splice(h+1,1)
					}		
				}
				if (this.remarks =='') {
						this.$Modal.warning({
							title: "提示",
							content: "<p>请先输入备注</p>"
						});
						return false
				}
				if(this.loanPeriod[6].value == 'is_social_security_no' && this.loanPeriod[8].value == 'own_house_no' && this.loanPeriod[10].value == 'own_car_no' && this.loanPeriod[12].value == 'guarantee_slip_no' && this.loanPeriod[13].value == 'credit_card_no' && this.loanPeriod[14].value == 'Weilidai_no') {
					this.$Modal.confirm({
						title: '温馨提示',
						content: '<p>当前用户所填资产信息全部为无，无法进入抢单库。是否确认仍要修改?</p>',
						onOk: () => {
							// this.modal4 = true
							// this.titleReqList = titleReqList
							this.http.post(BASE_URL + "/sale/userinfo/LoanUserIsRob", {loanUserCode:this.$route.query.loanUserCode})
							.then(data => {
								if (data.code == 'success') {
									this.markingexamination(titleReqList)
								}else{
									this.messageq = data.message
									this.modal6 = true
								}
							})
							.catch(err => {
								console.log(err);
							});
							
						},
						onCancel: () => {}
					})
				} else {
					this.modal4 = true
					this.titleReqList = titleReqList
				}
					}else{
						this.messageq = data.message
						this.modal6 = true
					}
				})
				.catch(err => {
					console.log(err);
				});
				
			},
			submitexamine() {
				this.http.post(BASE_URL + "/sale/userinfo/LoanUserIsRob", {loanUserCode:this.$route.query.loanUserCode})
				.then(data => {
					if (data.code == 'success') {
						this.markingexamination(this.titleReqList)
					}else{
						this.messageq = data.message
						this.modal6 = true
					}
				})
				.catch(err => {
					console.log(err);
				})	
			},
			markingexamination(arrays) {
				if(this.month < 10 && this.month != '') {
					this.month = '0' + this.month
				}
				if(this.day < 10 && this.day != '') {
					this.day = '0' + this.day
				}
				let birthday
				if(this.year != '' && this.month != '' && this.day != '') {
					birthday = this.year + '-' + this.month + '-' + this.day
				} else {
					birthday = this.feteday
				}
				let loanAdCodeFirst
				let loanAdCodeSecond
				let loanCityNameFirst
				let loanCityNameSecond
				if (this.model2==''&&this.model3=='') {
					loanAdCodeFirst = this.loanAdCodeFirst
					loanAdCodeSecond = this.loanAdCodeSecond
					loanCityNameFirst = this.loanCityName
					loanCityNameSecond = this.loanSecondName
				}else {
					loanAdCodeFirst = this.model2
					loanAdCodeSecond = this.model3
					loanCityNameFirst = this.loanCityNameFirst
					loanCityNameSecond = this.loanCityNameSecond
				}
				let list = {
					saveStatus: 2, //标识
					memberName:this.nickname,//昵称
					birthday: birthday, //年龄
					loanAdCodeFirst: loanAdCodeFirst, //省
					loanAdCodeSecond: loanAdCodeSecond, //市
					loanCityNameFirst: loanCityNameFirst,
					loanCityNameSecond: loanCityNameSecond,
					lastDialRemark: this.remarks, //备注
					loanUserCode: this.$route.query.loanUserCode, //code
					dialRecordCode:this.$route.query.dialRecordCode,
					titleReqList: arrays
				}
				this.http.post(BASE_URL + "/sale/userinfo/updateLoanUserDetail", list).then(data => {
					if(data.code == 'success') {
						this.modal5 = true
					} else {
						if(data.message == '该用户已被抢,无法更新资料信息') {
							this.$Modal.warning({
								title: "提示",
								content: "<p>" + data.message + "</p>",
								onOk: () => {
									window.history.back(-1)
								}
							});
						} else {
							this.$Message.error(data.message)
						}
					}
				}).catch(() => {})
			},

			// 无效名单
			invalidList() {
				let list = {
					loanUserCode: this.$route.query.loanUserCode,
					listStatus: 2,
					saveStatus: 1
				}
				this.$Modal.confirm({
					title: '温馨提示',
					content: '<p>是否标记为该用户为无效名单</p>',
					onOk: () => {
						this.http.post(BASE_URL + "/sale/userinfo/LoanUserIsRob", {loanUserCode:this.$route.query.loanUserCode})
						.then(data => {
							if (data.code == 'success') {
								this.http.post(BASE_URL + "/sale/userinfo/updateLoanUserDetail", list).then(data => {
									if(data.code == 'success') {
										this.modal3 = true

									} else {
										this.$Message.error(data.message)
									}
								}).catch(() => {})
							}else{
								this.messageq = data.message
								this.modal6 = true
							}
						})
						.catch(err => {
							console.log(err);
						})
						
					},
					onCancel: () => {
						// this.$Message.info('删除失败！');
					}
				})

			},
			radioAlltdChange(data, index) {
				// console.log(this.loanPeriod)
				if(data == 'civil_servant') { //公务员
					this.detailslist.titleList[3].infoTitleName = '打卡工资'
					this.loanPeriod[6].value = 'is_social_security_yes'
					this.loanPeriod[7].value = 'is_accumulation_fund_yes'
				} else if(data == 'clock_in') {
					this.loanPeriod[6].value = 'is_social_security_yes'
				} else if(data == 'employees') {
					this.loanPeriod[4].value = 'clock_in'
				}
				if(index == 2 && data != 'civil_servant') {
					this.detailslist.titleList[3].infoTitleName = '月收入'
				}
			},
			// 省
			province(name) {
				this.loanCityNameFirst = name
			},
			citysclick(name) {
				this.loanCityNameSecond = name
			},
			// 返回
			backingout() {
				this.$router.push({
					path: './customerManagement'
				})
			},
			// 保存
			conserve() {
				let titleReqList = []
				for(let i = 0; i < this.loanPeriod.length; i++) {
					if(this.loanPeriod[i].value != null) {
						let obj = new Object()
						let optionKey = []
						optionKey.push(this.loanPeriod[i].value)
						obj.optionKey = optionKey
						obj.titleKey = this.detailslist.titleList[i].infoTitleKey
						titleReqList.push(obj)
					}
				}
				if(this.month < 10 && this.month != '') {
					this.month = '0' + this.month
				}
				if(this.day < 10 && this.day != '') {
					this.day = '0' + this.day
				}
				let birthday
				if(this.year != '' && this.month != '' && this.day != '') {
					birthday = this.year + '-' + this.month + '-' + this.day
				} else {
					birthday = this.feteday
				}
				let loanAdCodeFirst
				let loanAdCodeSecond
				let loanCityNameFirst
				let loanCityNameSecond
				if (this.model2==''&&this.model3=='') {
					loanAdCodeFirst = this.loanAdCodeFirst
					loanAdCodeSecond = this.loanAdCodeSecond
					loanCityNameFirst = this.loanCityName
					loanCityNameSecond = this.loanSecondName
				}else {
					loanAdCodeFirst = this.model2
					loanAdCodeSecond = this.model3
					loanCityNameFirst = this.loanCityNameFirst
					loanCityNameSecond = this.loanCityNameSecond
				}
				if (this.nickname == '') {
					this.nickname = this.detailslist.name

				}
				let list = {
					saveStatus: 1, //标识
					memberName:this.nickname,//昵称
					birthday: birthday, //年龄
					loanAdCodeFirst: loanAdCodeFirst, //省
					loanAdCodeSecond: loanAdCodeSecond, //市
					loanCityNameFirst: loanCityNameFirst,
					loanCityNameSecond: loanCityNameSecond,
					lastDialRemark: this.remarks, //备注
					loanUserCode: this.$route.query.loanUserCode, //code
					dialRecordCode:this.$route.query.dialRecordCode,
					titleReqList: titleReqList
				}
				this.http.post(BASE_URL + "/sale/userinfo/updateLoanUserDetail", list).then(data => {
					if(data.code == 'success') {
						this.$Modal.success({
							title: "提示",
							content: "<p>保存成功</p>",
							onOk: () => {
								window.history.go(-1);
							}
						});

					} else {
						this.$Message.error(data.message)
					}
				}).catch(() => {})
			},
			// 取消
			abrogate() {
				window.history.back(-1)
			},
			// 标注成功
			tagging(n) {
				if (n==1) {
					window.history.go(-1);
				} else {
					if (this.$route.query.num == 1) {
						this.$router.push({
							path: './alreadyMemberlist'
						})
						location.reload()
					}else if (this.$route.query.num == 2) {
						this.$router.push({
							path: './seatMemberlist'
						})
						location.reload()
					}
				}
				
			},
			// 年改变
			yearchange () {
				this.monthlist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
			},
			// 月改变
			monthchange(val) {
				this.daylist = []
				for(let i = 0; i < this.manyDay(this.year, val); i++) {
					this.daylist.push(i + 1)
				}
			},
			// 判断选择月份有多少天
			manyDay(year, month) {
				let d = new Date(year, month, 1, 0, 0, 0);
				let lastDay = new Date(d - 1000);
				return lastDay.getDate();
			},
			// 是否被抢
			berobbed () {
			this.http.post(BASE_URL + "/sale/userinfo/LoanUserIsRob", {loanUserCode:this.$route.query.loanUserCode})
			.then(data => {
				if (data.code == 'success') {
					this.modal7=true
				}else{
					this.$Modal.error({
					title: '温馨提示',
					content: '<p>'+data.message+'</p>'
					})
				}
			})
			.catch(err => {
				console.log(err);
			});

			},
			//拨打电话
			dialing () {
				this.http.post(BASE_URL + "/sale/saleDialRecord/callLoanUser", {loanUserCode:this.$route.query.loanUserCode})
				.then(data => {
					if (data.code == 'success') {
					this.$Message.success(data.message)
					}else{
					this.$Message.error(data.message)
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
		},
		created() {
			this.http.get('../../../static/city.json').then(data => {
				this.cityType1 = data
			})
			this.http.get('../../../static/address_json.json').then(data => {
				this.citylist = data
			})
		},
		mounted() {
			this.http.post(BASE_URL + "/sale/userinfo/getUserDetailByCode", {
				loanUserCode: this.$route.query.loanUserCode
			}).then(data => {
				if(data.code == 'success') {
					this.loanPeriod = []
					this.detailslist = data.data
					this.loanAdCodeFirst = data.data.loanAdCodeFirst
					this.loanAdCodeSecond = data.data.loanAdCodeSecond
					this.loanCityName = data.data.loanCityNameFirst
					this.loanSecondName = data.data.loanCityNameSecond
					this.remarks = data.data.lastDialRemark
					this.feteday = data.data.birthday
					for(let i = 0; i < data.data.titleList.length; i++) {				
						let obj = new Object()
						obj.value = data.data.titleList[i].value						
						this.loanPeriod.push(obj)
						for(let j = 0; j < data.data.titleList[i].options.length; j++) {
							if(data.data.titleList[i].options[j].infoOptionName == '无') {
								this.infoOptionValuelist.push(data.data.titleList[i].options[j].infoOptionKey)
							}

						}
						if (data.data.titleList[i].infoTitleName == '工资发放形式'&&data.data.titleList[i].value == null) {
							this.loanPeriod[4].value = 'clock_in'
						}
					}

					
				} else {
					this.detailslist = []
					this.loanPeriod = []
					this.$Message.error(data.message)
				}
			}).catch(() => {

			})
		}
	}
</script>
<style lang="less" scoped>

</style>