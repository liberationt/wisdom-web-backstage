<template>
<Row>
    <Col span="6">
    <div id="memberLeft">
        <div class="memberphoto">
            <img src="../../image/application-hzjf.png" alt="">
            <p>139****5599</p>
            <span class="member_type green1">账户正常</span>
            <!-- <Button type="info" shape="circle">账户正常</Button> -->
            <!-- <Button type="error" shape="circle">账户冻结</Button> -->
        </div>
        <ul class="member_left_ul">
            <li>
                <span class="w50 tr displayib">余额:</span>
                <strong>0</strong>
                <span>元</span>
            </li>
            <li>
                <span class="w50 tr displayib">昵称:</span>
                <span>哈哈</span>
            </li>
            <li>
                <span class="w50 tr displayib">实名:</span>
                <span>李嬷嬷</span>
                <span>310********0098</span>
            </li>
            <li>
                <span class="w50 tr displayib">实名:</span>
                <span class="member_type red1">未实名</span>

            </li>
            <li>
                <span class="w50 tr displayib">微信:</span>
                <span>飞天侠</span>
            </li>
            <li>
                <span class="w50 tr displayib">微信:</span>
                <span class="member_type red1">未实名</span>
            </li>
            <li>
                <span class="w50 tr displayib">银行卡:</span>
                <span class="member_type red1">未实名</span>
            </li>
            <li>
                <span class="w50 tr displayib">微信:</span>
                <span class="">工商银行</span>
                <span>6544 ****2210</span>
            </li>
            <li>
                <span class="w50 tr displayib">渠道:</span>
                <span class="">官网APP</span>
            </li>
            <li>
                <span class="w50 tr displayib">邀请人:</span>
                <span class="">哈哈</span>
            </li>
        </ul>
    </div>
    </Col>
    <Col span="18">
    <div id="memberRight">
        <Tabs :animated="false">
            <TabPane label="个人信息">标签一的内容</TabPane>
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
</style>
