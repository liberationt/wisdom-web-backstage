<template>
<Row>
    <Col span="6">
    <div id="memberLeft">
        <div class="memberphoto">
            <img :src="informationlist.headImg" alt="">
            <p>{{informationlist.phoneNumber}}</p>
            <!-- <span class="member_type green1">账户正常</span> -->
            <Button v-if="informationlist.accountStatus==1" type="info" shape="circle">解冻账户</Button>
            <Button v-if="informationlist.accountStatus==0" type="error" shape="circle">账户冻结</Button>
        </div>
        <ul class="member_left_ul">
            <li>
                <span class="w50 tr displayib">昵称:</span>
                <span>{{informationlist.memberName}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">实名:</span>
                <span>{{informationlist.realName}}</span>
                <span>{{informationlist.idCard}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">实名:</span>
                <span v-if="informationlist.realStatus==0" class="member_type red1">未实名</span>
                <span v-if="informationlist.realStatus==1" class="member_type red1">实名</span>
            </li>
            <li>
                <span class="w50 tr displayib">微信:</span>
                <span>{{informationlist.wechatNickName}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">微信:</span>
                <span class="member_type red1">未实名</span>
            </li>
            <li>
                <span class="w50 tr displayib">渠道:</span>
                <span class="">{{informationlist.loanUserChannel}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">邀请人:</span>
                <span class="">{{informationlist.loanInviterPhone}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">已邀请:</span>
                <span class="">{{informationlist.loanInviterCount}}</span>
            </li>
        </ul>
    </div>
    </Col>
    <Col span="18">
    <div id="memberRight">
        <Tabs :animated="false">
            <TabPane label="个人信息">
                <div class="informationlist">
                    <h3>
                        <span>王某某</span>
                        <span>45岁</span>
                        <span>上海</span>
                        <span>310***********0011</span>
                    </h3>
                    <p>
                        <span>贷款意向</span>
                        <span>1万-2万</span>
                        <span>贷款期限</span>
                        <span>24个月</span>
                    </p>
                    <h3>基本信息</h3>
                    <ul class="essinformation">
                        <li>
                            <span>户籍类型</span>
                            <span>本地户籍</span>
                            <span>正确(10次)</span>
                            <span>错误(1次)</span>
                        </li>
                    </ul>
                    <h3>资产信息</h3>
                    <ul class="essinformation">
                        <li>
                            <span>是否有信用卡</span>
                            <span>有</span>
                            <span>正确(10次)</span>
                            <span>错误(1次)</span>
                        </li>
                    </ul>
                </div>
            </TabPane>
            <TabPane label="现金流水">
                <Table stripe :columns="columns1" :data="data1"></Table>
                <div class="tr mt15">
                    <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="订单列表">标签三的内容</TabPane>
            <TabPane label="登录日志">
                <Table stripe :columns="columns2" :data="data2"></Table>
                <div class="tr mt15">
                    <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
        </Tabs>
    </div>
    </Col>
</Row>
</template>
<script>
export default {
  data () {
    return {
      informationlist: [],
      columns1: [
        {
          title: '类型',
          align: 'center',
          key: 'name'
        },
        {
          title: '金额 (元)',
          align: 'center',
          key: 'age'
        },
        {
          title: '操作时间',
          align: 'center',
          key: 'address'
        }
      ],
      data1: [
        {
          name: '提现成功',
          age: -100,
          address: '2016-10-03'
        },
        {
          name: '提现成功',
          age: -100,
          address: '2016-10-03'
        },
        {
          name: '提现成功',
          age: -100,
          address: '2016-10-03'
        },
        {
          name: '提现成功',
          age: -100,
          address: '2016-10-03'
        }
      ],
      columns2: [
        {
          title: '登录时间',
          align: 'center',
          key: 'name'
        },
        {
          title: '登录端口',
          align: 'center',
          key: 'age'
        },
        {
          title: '登录设备',
          align: 'center',
          key: 'address'
        },
        {
          title: '登录状态',
          align: 'center',
          key: 'sign'
        }
      ],
      data2: [
        {
          name: '2018-03-29 15:12:34',
          age: '安卓',
          address: 'MI 5S',
          sign: '账户冻结'
        },
        {
          name: '2018-03-29 15:12:34',
          age: '安卓',
          address: 'MI 5S',
          sign: '账户冻结'
        },
        {
          name: '2018-03-29 15:12:34',
          age: '安卓',
          address: 'MI 5S',
          sign: '账户冻结'
        },
        {
          name: '2018-03-29 15:12:34',
          age: '安卓',
          address: 'MI 5S',
          sign: '账户冻结'
        }
      ]
    }   
  },
  methods: {
      personalinformation () {
        this.http.post(BASE_URL + '/loan/userInfo/queryUserMemberInfo?loanUserCode='+this.$route.query.loanUserCode)
        .then((resp) => {
        if (resp.code == 'success') {
            this.informationlist = resp.data
            // this.cityList = resp.data.searchOptions
            // this.reaName = resp.data.realNameStatusOptions
            // this.account = resp.data.accountStatusOptions
            // this.registerTime = resp.data.userTimeOptions
        } else {
        }
        })
        .catch(() => {
        })
      }

  },
  mounted () {
      this.personalinformation ()

  }

}
</script>
<style lang="less" scoped>
#memberLeft{
    border: 1px solid #E7ECF1;
    .memberphoto{
        text-align: center;
        margin-bottom: 20px;
        img{
        width: 200px;
        margin-top: 20px
        }
        p{
            line-height: 25px;
            margin: 15px 0
        }
    }
    .member_left_ul li{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        padding-left: 20px;
        span{
            margin-left: 10px
        }
    }
    .member_left_ul li:last-child{
        border-bottom: 0
    }
    .member_left_ul li:first-child{
        border-top: 1px solid #E7ECF1
    }
}
#memberRight{
    padding: 0 20px
}
.member_type{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    color: #fff;
    border-radius: 30px;
    text-align: center
}
.informationlist{
    padding: 20px 50px;
    h3{
        font-weight: 700;
        margin-bottom: 5px;
        span{
            margin-right: 10px
        }
    }
    p{
        margin: 10px 0;
        span{
            margin-right: 10px
        }
    }
}
.essinformation{
    margin: 10px 0;
    span{
        margin-right: 20px
    }

}
</style>
