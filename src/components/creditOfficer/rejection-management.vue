<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;甩单管理</span>
          </p>
        </div>
        <Tabs type="card" :animated="false" :value="value1" @on-click="tabswitch">
        <TabPane label="甩单管理" name="0">
            <div class="clearfix contentcss">
                <div class="left">
                    <ul class="querysty">
                        <li>
                            <Input class="mr20" v-for="item in searchOptions" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px"></Input>
                        </li>
                        <li>
                            <Select v-model="orderCode" placeholder="订单状态" style="width:150px" @on-change="orderChange" class="mr20">
                                <Option v-for="item in orderList" :value="item.value" :key="item.label">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </li>
                        <li>
                            <Select v-model="lockingCode" placeholder="锁定时间" style="width:150px" @on-change="lockingChange" class="mr20">
                                <Option v-for="item in lockingList" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </li>
                        <li>
                            <span>审核时间 :</span>
                            <DatePicker type="date" :options="options3" :value="beginTime1" @on-change="beginTimeChange1" placeholder="开始时间"
                            style="width: 150px"></DatePicker>
                            <span>  -  </span>
                            <DatePicker type="date" :options="options3" :value="endTime1" @on-change="endTimeChange1" placeholder="结束时间"
                            style="width: 150px"></DatePicker>
                        </li>
                        <li>
                        <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                            <span v-if="!loading3">查询</span>
                            <span v-else>查询</span>
                        </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="application_table " class="contentcss mt10">
                <div class="allchiose">
                    <Button type="primary" @click='examine'>一键标记完成</Button>
                </div>
                <Table highlight-row border ref="selection" :columns="columns" :data="data1" @on-selection-change="requires"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow1!=0" :total="total" :current="startRow1" :page-size="endRow1" @on-change="pageChange1" @on-page-size-change="pagesizechange1" show-sizer show-total></Page>
                </div>
            </div>
        </TabPane>
        <TabPane label="甩单留言" name="1">
            <div class="clearfix contentcss">
                <div class="left">
                    <ul class="querysty">
                        <li>
                            <Input v-model="orderNumber" class="mr20" placeholder="请输入订单编号" style="width: 150px"></Input>
                        </li>
                        <li>
                            <Select v-model="messageCode" placeholder="留言状态" style="width:150px" @on-change="messageChange" class="mr20">
                                <Option v-for="item in messageCodeList" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </li>
                        <li>
                            <Select v-model="shieldCode" placeholder="屏蔽状态" style="width:150px" @on-change="shieldChange" class="mr20">
                                <Option v-for="item in shieldCodeList" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </li>
                        <li>
                            <span class="ml20">留言时间 :</span>
                            <DatePicker type="date" :options="options3" :value="beginTime2" @on-change="beginTimeChange2" placeholder="开始时间"
                            style="width: 150px"></DatePicker>
                            <span>  -  </span>
                            <DatePicker type="date" :options="options3" :value="endTime2" @on-change="endTimeChange2" placeholder="结束时间"
                            style="width: 150px"></DatePicker>
                        </li>
                        <li>
                        <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                            <span v-if="!loading3">查询</span>
                            <span v-else>查询</span>
                        </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="application_table " class="contentcss mt10">
                <div class="allchiose">
                    <Button type="primary" @click='examine'>一键标记已读</Button>
                </div>
                <Table highlight-row border ref="selection" :columns="columns2" :data="data2" @on-selection-change="requires"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow1!=0" :total="total" :current="startRow2" :page-size="endRow2" @on-change="pageChange2" @on-page-size-change="pagesizechange2" show-sizer show-total></Page>
                </div>
            </div>
        </TabPane>
        </Tabs>

        <Modal v-model="modal2" :styles="{top: '50px'}" :mask-closable="false" footer-hide>
          <p slot="header" style="text-align:center">
            <span>甩单留言</span>
          </p>
          <ul class="message">
              <li v-for="item in messageList">
                  <div class="message_left">
                    <div class="message_left_top" @click='jump(item.receivingOfficerCode)'>
                        <img :src=item.loanPersonImg alt="" style="width:50px;height:50px;border-radius: 50%">
                        <div>
                            <p>{{item.receivingOfficerName}}</p>
                            <p>{{item.loanCompany}}</p>
                        </div>
                    </div>
                    <p>{{item.wordsContent}}</p>
                  </div>
                  <div class="message_right">
                      <div>
                          <p>
                              <span v-if="item.lockStatus=='1'">已锁定</span>
                              <span v-else></span>
                          </p>
                          <p>
                              <span v-if="item.wordsStatus=='2'">用户不可见</span>
                              <span v-else>用户可见</span>
                          </p>
                          <p>
                              <span v-if="item.readStatus=='0'">未读</span>
                              <span v-if="item.readStatus=='1'">已读</span>
                          </p>
                      </div>
                      <p>{{item.wordsTime}}</p>
                      <div class="button_bottom">
                        <Button type="primary" @click='shield(item.wordsStatus,item.swingWordsCode,item.swingOrderBaseCode)'>
                            <span v-if="item.wordsStatus=='2'">取消屏蔽</span>
                            <span v-else>屏蔽</span>
                        </Button>
                        <Button type="primary" class="ml10" v-if="item.readStatus=='0'" @click='markedread(item.swingWordsCode,item.swingOrderBaseCode)'>标记已读</Button>
                      </div>
                  </div>
              </li>
          </ul>
      </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      modal2: false,
      value1: "",
      orderNumber: "", //订单编号
      name: "", //姓名
      phoneNumber: "", //手机号
      orderCode: "''", //订单状态
      orderList: [], //订单列表
      lockingCode: "''", //锁定时间
      lockingList: [], //锁定列表
      beginTime1: "",
      beginTime2: "",
      dataList: [], //全选数据
      messageList: [], //留言数据
      messageCode: -1, //留言
      messageCodeList: [
        { label: "留言状态", value: -1 },
        { label: "未读", value: 0 },
        { label: "已读", value: 1 }
      ], //留言下拉
      shieldCode:-1,
      shieldCodeList: [
        { label: "屏蔽状态", value: -1 },
        { label: "未屏蔽", value: 0 },
        { label: "已屏蔽", value: 2 }
      ], 
      number: "0",
      searchOptions: [],
      endTime1: "",
      endTime2: "",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      loading3: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "审核时间",
          key: "auditTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "订单编号",
          key: "swingOrderNo",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#2cbaff",
                  cursor:'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push(
                      "/rejectionDetails?swingOrderBaseCode=" +
                        params.row.swingOrderBaseCode
                    );
                  }
                }
              },
              params.row.swingOrderNo
            );
          }
        },
        {
          title: "订单类型",
          key: "swingTitleTypeName",
          align: "center",
          minWidth: 150
        },
        {
          title: "区域",
          key: "",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            let loanCityNameFirst =
              params.row.loanCityNameFirst == ""
                ? "-"
                : params.row.loanCityNameFirst;
            let loanCityNameSecond =
              params.row.loanCityNameSecond == ""
                ? "-"
                : params.row.loanCityNameSecond;
            return h("span", loanCityNameFirst + " " + loanCityNameSecond);
          }
        },
        {
          title: "信贷员姓名",
          key: "loanOfficerName",
          align: "center",
          minWidth: 120
        },
        {
          title: "信贷员手机",
          key: "loanOfficerPhone",
          align: "center",
          minWidth: 150
        },
        {
          title: "接单人数",
          key: "orderReceivingCount",
          align: "center",
          minWidth: 120
        },
        {
          title: "订单状态",
          key: "swingStatusName",
          align: "center",
          minWidth: 120
        },
        {
          title: "锁定时间",
          key: "lockTimeNum",
          align: "center",
          minWidth: 120
        },
        {
          title: "接单金额",
          key: "swingOrderSumAsString",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 200,
          fixed: "right",
          render: (h, params) => {
            let buttonArr = [];
            if (params.row.signSuccessStatus == "1") {
              buttonArr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: "<p>确认要标记完成？</p>",
                          onOk: () => {
                            let reqLists = [];
                            reqLists.push(params.row.swingOrderBaseCode);
                            let data = {
                              swingOrderBaseCode: reqLists
                            };
                            this.http
                              .post(
                                BASE_URL +
                                  "/loan/swingOrderBase/swingOrderBaseFinish",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success("标记完成");
                                  this.queryList(1);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "标记完成"
                )
              );
            }
            if (params.row.signMessageStatus == "1") {
              buttonArr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.messageLists(
                          params.row.swingOrderBaseCode,
                          params.row.swingWordsCode
                        );
                      }
                    }
                  },
                  "查看留言"
                )
              );
            }
            if (params.row.signFailStatus == "1") {
              buttonArr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: "<p>确认要标记完成？</p>",
                          onOk: () => {
                            let reqLists = [];
                            reqLists.push(params.row.swingOrderBaseCode);
                            let data = {
                              swingOrderBaseCode: reqLists
                            };
                            this.http
                              .post(
                                BASE_URL +
                                  "/loan/swingOrderBase/swingOrderBaseOver",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success("废弃完成");
                                  this.queryList(1);
                                } else {
                                  this.$Message.error(data.message);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "废弃"
                )
              );
            }
            return h("div", buttonArr);
          }
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "留言时间",
          key: "wordsTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "订单编号",
          key: "swingOrderNo",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#2cbaff",
                  cursor:'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push(
                      "/rejectionDetails?swingOrderBaseCode=" +
                        params.row.swingOrderBaseCode
                    );
                  }
                }
              },
              params.row.swingOrderNo
            );
          }
        },
        {
          title: "订单类型",
          key: "orderType",
          align: "center",
          minWidth: 150
        },
        {
          title: "订单状态",
          key: "",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let status = params.row.swingStatus;
            if (status == "1") {
              status = "待审核";
            } else if (status == "2") {
              status = "审核通过";
            } else if (status == "3") {
              status = "已锁定";
            } else if (status == "4") {
              status = "已完成";
            } else if (status == "5") {
              status = "已废弃";
            } else if (status == "6") {
              status = "审核失败";
            }
            return h("span", {}, status);
          }
        },
        {
          title: "留言内容",
          key: "wordsContent",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "#2cbaff",
                  width: "50px",
                  margin: "0 auto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  cursor:'pointer'
                },
                on: {
                  click: () => {
                    this.messageLists(
                      params.row.swingOrderBaseCode,
                      params.row.swingWordsCode
                    );
                  }
                }
              },
              params.row.wordsContent
            );
          }
        },
        {
          title: "留言状态",
          key: "wordsStatus",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let status = params.row.wordsStatus;
            let readStatus = params.row.readStatus;
            if (status == "2") {
              status = "已屏蔽";
            } else {
              if (readStatus == "0") {
                status = "未读";
              } else if (readStatus == "1") {
                status = "已读";
              }
            }
            return h("span", {}, status);
          }
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 150,
          fixed: "right",
          render: (h, params) => {
            let status = params.row.wordsStatus;
            let readStatus = params.row.readStatus;
            if (status == "2") {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: "<p>确认取消屏蔽该留言？</p>",
                          onOk: () => {
                            let data = {
                              data: params.row.swingWordsCode
                            };
                            this.http
                              .post(
                                BASE_URL + "/loan/swingWords/unBlackWords",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success("取消屏蔽完成");
                                  this.queryList(1);
                                } else {
                                  this.$Message.error(data.message);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "取消屏蔽"
                )
              ]);
            } else if (status == "0" && readStatus == "0") {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: "<p>确认屏蔽该留言？</p>",
                          onOk: () => {
                            let data = {
                              data: params.row.swingWordsCode
                            };
                            this.http
                              .post(
                                BASE_URL + "/loan/swingWords/blackWords",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success("屏蔽留言完成");
                                  this.queryList(1);
                                } else {
                                  this.$Message.error(data.message);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "屏蔽"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: "<p>确认要标记已读？</p>",
                          onOk: () => {
                            let swingWordsCode = [];
                            swingWordsCode.push(params.row.swingWordsCode);
                            let data = {
                              swingWordsCodes: swingWordsCode
                            };
                            this.http
                              .post(
                                BASE_URL + "/loan/swingWords/batchUpdateByCode",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success("标记已读完成");
                                  this.queryList(1);
                                } else {
                                  this.$Message.error(data.message);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "标记已读"
                )
              ]);
            } else if (status == "0" && readStatus == "1") {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: "<p>确认屏蔽该留言？</p>",
                          onOk: () => {
                            let data = {
                              data: params.row.swingWordsCode
                            };
                            this.http
                              .post(
                                BASE_URL + "/loan/swingWords/blackWords",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success("屏蔽留言完成");
                                  this.queryList(1);
                                } else {
                                  this.$Message.error(data.message);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "屏蔽"
                )
              ]);
            }
          }
        }
      ],
      data1: [],
      data2: [],
      total: 0,
      startRow1: 1,
      endRow1: 20,
      startRow2: 1,
      endRow2: 20,
      loanOfficerCode:''
    };
  },
  methods: {
    //标记已读
    markedread(swingWordsCode, swingOrderBaseCode) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认要标记已读？</p>",
        onOk: () => {
          let data = {
            swingWordsCodes: [swingWordsCode]
          };
          this.http
            .post(BASE_URL + "/loan/swingWords/batchUpdateByCode", data)
            .then(data => {
              if (data.code == "success") {
                this.$Message.success("标记已读完成");
                this.messageLists(swingOrderBaseCode, swingWordsCode);
              } else {
                this.$Message.error(data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel: () => {}
      });
    },
    //标记已读留言列表
    messageLists(swingOrderBaseCode, swingWordsCode) {
      let datas;
      let urls;
      if (this.number == "0") {
        datas = {
          swingOrderBaseCode: swingOrderBaseCode,
          pageSize: 100,
          pageNum: 1
        };
        urls = "/loan/swingOrderBase/getSwingWordsListByCode";
        this.http
        .post(BASE_URL + urls, datas)
        .then(data => {
          if (data.code == "success") {
            this.messageList = data.data.dataList
            this.modal2 = true;
            this.queryList(1)
          }
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        datas = {
          data: swingWordsCode
        };
        urls = "/loan/swingWords/getByCode";
        this.http
        .post(BASE_URL + urls, datas)
        .then(data => {
          if (data.code == "success") {
            let dataLists = []
            dataLists.push(data.data)
            this.messageList = dataLists
            this.modal2 = true;
            this.queryList(1)
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    //订单状态
    shield(num, swingWordsCode, swingOrderBaseCode) {
      if (num == "2") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认取消屏蔽该留言？</p>",
          onOk: () => {
            let data = {
              data: swingWordsCode
            };
            this.http
              .post(BASE_URL + "/loan/swingWords/unBlackWords", data)
              .then(data => {
                if (data.code == "success") {
                  this.$Message.success("取消屏蔽完成");
                  this.messageLists(swingOrderBaseCode, swingWordsCode);                 
                } else {
                  this.$Message.error(data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          },
          onCancel: () => {}
        });
      } else {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认屏蔽该留言？</p>",
          onOk: () => {
            let data = {
              data: swingWordsCode
            };
            this.http
              .post(BASE_URL + "/loan/swingWords/blackWords", data)
              .then(data => {
                if (data.code == "success") {
                  this.$Message.success("屏蔽留言完成");
                  this.messageLists(swingOrderBaseCode, swingWordsCode);
                } else {
                  this.$Message.error(data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          },
          onCancel: () => {}
        });
      }
    },
    orderChange(orderCode) {
      this.orderCode = orderCode;
    },
    lockingChange(lockingCode) {
      this.lockingCode = lockingCode;
    },
    beginTimeChange1(beginTime) {
      this.beginTime1 = beginTime;
      this.beginTime1 += " 00:00:00";
    },
    beginTimeChange2(beginTime) {
      this.beginTime2 = beginTime;
      this.beginTime2 += " 00:00:00";
    },
    //留言状态
    messageChange(status) {
      this.messageCode = status;
    },
    //屏蔽状态
    shieldChange(shieldCode){
      this.shieldCode = shieldCode
    },
    endTimeChange1(endTime) {
      this.endTime1 = endTime;
      this.endTime1 += " 23:59:59";
    },
    endTimeChange2(endTime) {
      this.endTime2 = endTime;
      this.endTime2 += " 23:59:59";
    },
    pageChange1(page) {
      this.startRow1 = page;
      this.queryList(this.startRow1);
    },
    pagesizechange1(page) {
      this.startRow1 = 1;
      this.endRow1 = page;
      this.queryList(1);
    },
    pageChange2(page) {
      this.startRow2 = page;
      this.queryList(this.startRow2);
    },
    pagesizechange2(page) {
      this.startRow2 = 1;
      this.endRow2 = page;
      this.queryList(1);
    },
    //跳转信贷员详情
    jump(loanOfficerCode){
      this.$router.push('/creditInformation?loanOfficerCode='+loanOfficerCode)
    },
    //一键标记已读
    examine(value) {
      if (this.number == "0") {
        if(this.dataList<=0){
          this.$Modal.warning({
          title: "温馨提示",
          content: "<p>请选择要标记完成订单!</p>",
          onOk: () => {},
          onCancel: () => {}
        })
        }else{
          this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要标记完成？</p>",
            onOk: () => {
              let dataList = this.dataList;
              let reqLists = [];
              for (var index in dataList) {
                reqLists.push(dataList[index].swingOrderBaseCode);
              }
              let data = {
                swingOrderBaseCode: reqLists
              };
              this.http
                .post(
                  BASE_URL + "/loan/swingOrderBase/swingOrderBaseFinish",
                  data
                )
                .then(data => {
                  if (data.code == "success") {
                    this.dataList= []
                    this.$Message.success("已批量被标记完成");
                    this.queryList(1);
                  } else {
                    this.$Message.error(data.message);
                  }
                })
                .catch(err => {
                  this.dataList= []
                  console.log(err);
                });
            },
            onCancel: () => {}
          });
        }
      } else {
        if(this.dataList<=0){
          this.$Modal.warning({
          title: "温馨提示",
          content: "<p>请选择要标记已读订单!</p>",
          onOk: () => {},
          onCancel: () => {}
        })
        }else{
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认要标记已读？</p>",
          onOk: () => {
            let dataList = this.dataList;
            let swingWordsCode = [];
            for (var index in dataList) {
              swingWordsCode.push(dataList[index].swingWordsCode);
            }
            let data = {
              swingWordsCodes: swingWordsCode
            };
            this.http
              .post(BASE_URL + "/loan/swingWords/batchUpdateByCode", data)
              .then(data => {
                if (data.code == "success") {
                  this.dataList = []
                  this.$Message.success("已批量标记已读");
                  this.queryList(1);
                } else {
                  this.dataList = []
                  this.$Message.error(data.message);
                }
              })
              .catch(err => {
                this.dataList = []
                console.log(err);
              });
          },
          onCancel: () => {}
        });
      }
      }
    },
    //切换栏
    tabswitch(name) {
      this.number = name;
      this.queryList(1);
    },
    requires(value) {
      this.dataList = value;
    },
    //查询
    queryList(startRow) {
      let date1 = Date.parse(new Date(this.beginTime1)) / 1000;
      let date2 = Date.parse(new Date(this.endTime1)) / 1000;
      let date3 = Date.parse(new Date(this.beginTime2)) / 1000;
      let date4 = Date.parse(new Date(this.endTime2)) / 1000;
      if (date1 > date2 || date3 > date4) {
        this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      this.loading3 = true;
      let array = [];
      this.searchOptions.forEach(element => {
        let obj = new Object();
        obj.label = element.value;
        if (element.code == null) {
          obj.value = "";
        } else {
          obj.value = element.code;
        }
        array.push(obj);
      });
      if (this.number == "0") {
        let data = {
          searchOptions: array,
          beginTime: new Date(this.beginTime1).valueOf(),
          endTime: new Date(this.endTime1).valueOf(),
          pageNum: startRow,
          pageSize: this.endRow1,
          lockTimeStatus: this.lockingCode == "''" ? "" : this.lockingCode,
          swingStatus: this.orderCode == "''" ? "" : this.orderCode
        };
        this.http
          .post(BASE_URL + "/loan/swingOrderBase/querySwingOrderPageList", data)
          .then(data => {
            if (data.code == "success") {
              this.loading3 = false;
              this.data1 = data.data.dataList;
              this.total = data.data.total;
              this.startRow1 =
                Math.ceil(data.data.startRow / this.endRow1) == 0
                  ? 1
                  : Math.ceil(data.data.startRow / this.endRow1);
            } else {
              this.loading3 = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.number == "1") {
        let data = {
          wordsBeginTime: new Date(this.beginTime2).valueOf(),
          wordsEndTime: new Date(this.endTime2).valueOf(),
          pageNum: startRow,
          pageSize: this.endRow2,
          swingOrderNo: this.orderNumber,
          readStatus:this.messageCode == "-1" ? "" : this.messageCode,
          wordsStatus: this.shieldCode=="-1"?"":this.shieldCode,
        };
        this.http
          .post(BASE_URL + "/loan/swingWords/queryPage", data)
          .then(data => {
            if (data.code == "success") {
              this.loading3 = false;
              this.data2 = data.data.dataList;
              // this.data1[0]['_disabled'] = true
              for(var i=0;i<this.data2.length;i++){
                if(this.data2[i].wordsStatus=='2' || this.data2[i].readStatus=='1'){
                  this.data2[i]['_disabled'] = true
                } 
              }
              this.total = data.data.total;
              this.startRow2 =
                Math.ceil(data.data.startRow / this.endRow2) == 0
                  ? 1
                  : Math.ceil(data.data.startRow / this.endRow2);
            } else {
              this.loading3 = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.http
      .post(BASE_URL + "/loan/swingOrderBase/querySwingOrdePageListFilter", {})
      .then(resp => {
        if (resp.code == "success") {
          this.searchOptions = resp.data.searchOptions;
          this.orderList = resp.data.swingStatusOptions;
          this.lockingList = resp.data.swingLockTime;
        } else {
        }
      })
      .catch(() => {});
    this.queryList(1);
  }
};
</script>
<style lang="less" scoped>
.allchiose {
  margin-bottom: 20px;
}
.message li {
  display: flex;
  justify-content: space-between;
  background: #cdcdcd;
  margin-bottom: 3px;
  padding: 10px;
  .message_right {
    text-align: center;
    p {
      margin-bottom: 10px;
    }
    div {
      display: flex;
      p {
        width: 60px;
        color: red;
      }
    }
  }
  .message_left_top {
    display: flex;
    div {
      margin: 0 0 10px 10px;
      p {
        margin-bottom: 10px;
      }
    }
  }
  .button_bottom {
    display: flex;
    justify-content: center;
  }
}
</style>