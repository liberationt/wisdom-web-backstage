<template>
	<div>
		<div class="navigation">
			<p>
				<span>语音回调配置管理</span>
			</p>
		</div>
		<div id="application_table " class="contentcss mt10">
			<Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList"></Table>
		</div>
	</div>
</template>
<script>
	import utils from "../../utils/utils";
	export default {
		data() {
			return {
				columnList: [{
						title: '甲方名称',
						key: 'dateTime',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '媒体编号',
						key: 'productName',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '服务器',
						key: 'pageViewuvcount',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '每日推送数量限制',
						key: 'datesubmitUvcount',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '是否指定媒体编号来源',
						key: 'conversionRate',
						minWidth: 150,
						align: 'center'
					},
					{
						title: "操作",
						key: "accountVirtual",
						fixed: 'right',
						minWidth: 100,
						align: "center",
						render: (h, params) => {
							return h("div", [
								h(
									"Button", {
										props: {
											type: "primary",
											size: "small"
										},
										on: {
											click: () => {

											}
										}
									},
									"查看"
								),
							]);
						}
					}

				],
				reportList: []
			};
		},
		methods: {
			// 查询
			queryReportList() {
				this.columnList = this.getColumnList();
				this.http
					.post(BASE_URL + "/netmoney/callbackConfigure/queryList", {})
					.then(data => {
						this.reportList = data.data.dataList;
					});
			},
			getColumnList() {
				let columnList = [
					this.getColumnItem("甲方名称", "partyaName", 150),
					this.getColumnItem("媒体编号", "mediaNumber", 200, (h, params) => {
						return this.reportColumns2Render(
							h,
							params.row.dataList,
							details => {
								return details.mediaNumber;
							}
						);
					}),
					this.getColumnItem(
						"服务器",
						"ip",
						150,
						(h, params) => {
							return this.reportColumns2Render(
								h,
								params.row.dataList,
								details => {
									return details.ip;
								}
							);
						}
					),
					this.getColumnItem(
						"每日推送数量限制",
						"limitDay",
						150,
						(h, params) => {
							return this.reportColumns2Render(
								h,
								params.row.dataList,
								details => {
									return details.limitDay;
								}
							);
						}
					),
					this.getColumnItem("是否指定媒体编号来源", "mediaIpSource", 150, (h, params) => {
						return this.reportColumns2Render(
							h,
							params.row.dataList,
							details => {
								if(details.mediaIpSource == 1) {
									details.mediaIpSource = '指定'
								} else if(details.mediaIpSource == 2) {
									details.mediaIpSource = '随机'
								}
								return details.mediaIpSource;
							}
						);
					}),
					this.getColumnItem("查看", "mediaNumber", 150, (h, params) => {
						return h("div", [
							h(
								"Button", {
									props: {
										type: "primary",
										size: "small"
									},

									on: {
										click: () => {
											this.$router.push({
												path: "./callbackDetails?partyaKey=" + params.row.partyaKey+'&name='+params.row.partyaName
											});
										}
									}
								},
								"查看"
							),
						]);
					}),
				];
				return columnList;
			},
			getColumnItem(title, key, width, render) {
				let obj = {
					title: title,
					key: key,
					minWidth: width,
					align: "center",
					render: render
				};
				if(title == '查看') {
					obj.fixed = 'right'
				}
				return obj
			},
			reportColumns2Render(h, params, showTextCallback) {
				let list = [];
				for(let i = 0; i < params.length; i++) {
					let text = showTextCallback ? showTextCallback(params[i]) : params[i];
					list.push(
						h(
							"span", {
								style: {
									display: "block",
									width: "100%",
									align: "center",
									lineHeight: "40px",
									height: '40px',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									borderBottom: i < params.length - 1 || i < params[i].length - 1 ?
										"1px solid #e9eaec" :
										""
								},
								domProps: {
									title: text
								}
							},
							text
						)
					);
				}
				return h("div", list);
			}
		},
		created() {},
		mounted() {
			this.queryReportList()
		}
	};
</script>
<style lang="less" scoped>

</style>