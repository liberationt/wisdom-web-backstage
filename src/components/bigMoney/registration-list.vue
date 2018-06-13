<template>
    <div>
        <div class="navigation">
            <p>
                <span>注册列表</span>
            </p>
        </div>
        <div class="titregist">
            <div class="registrations" v-for="(item, index) in numregistrations" :key="index" :class="item.color">
                <div>
                    <p>{{item.totalnum}}</p>
                </div>
                <div>
                    <span>第一步注册人数:<em>{{item.onenum}}</em>人</span><br>
                    <span>第二步注册人数:<em>{{item.twonum}}</em>人</span>
                </div>
            </div>
        </div>
        <div class="mt50">
            <span>供应商:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>step:</span>
            <Select v-model="model2" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>渠道:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <span>注册时间:</span>
            <DatePicker type="date" confirm placeholder="Select date" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" confirm placeholder="Select date" style="width: 200px"></DatePicker>
            <div class="clearfix mr100 mt20">
                <Button class="right" type="primary">导出</Button>
                <Button class="right mr20" type="info">查询</Button>
            </div>
        </div>

        <div class="mt20">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
            </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      model2: '',
      model3: '',
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
      cityList: [
        {
          value: '供应商1',
          label: '供应商1'
        },
        {
          value: '供应商2',
          label: '供应商2'
        },
        {
          value: '供应商3',
          label: '供应商3'
        },
        {
          value: '供应商4',
          label: '供应商4'
        }
      ],
      cityList2: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        }
      ],
      cityList3: [
        {
          value: '渠道1',
          label: '渠道1'
        },
        {
          value: '渠道2',
          label: '渠道2'
        },
        {
          value: '渠道3',
          label: '渠道3'
        },
        {
          value: '渠道4',
          label: '渠道4'
        }
      ],
      columns1: [
        {
          title: 'NO',
          align: 'center',
          width: 100,
          key: 'no'
        },
        {
          title: 'DID',
          align: 'center',
          width: 100,
          key: 'did'
        },
        {
          title: '注册时间',
          align: 'center',
          width: 100,
          key: 'time'
        },
        {
          title: '渠道',
          align: 'center',
          width: 100,
          key: 'channel'
        },
        {
          title: 'step',
          align: 'center',
          width: 100,
          key: 'step'
        },
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'name'
        },
        {
          title: '手机',
          align: 'center',
          width: 100,
          key: 'phone'
        },
        {
          title: '生日',
          align: 'center',
          width: 100,
          key: 'birthday'
        },
        {
          title: '性别',
          align: 'center',
          width: 100,
          key: 'sex'
        },
        {
          title: '年龄',
          align: 'center',
          width: 100,
          key: 'age'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'city'
        },
        {
          title: 'M城市',
          align: 'center',
          width: 100,
          key: 'mcity'
        },
        {
          title: '借贷金额',
          align: 'center',
          width: 100,
          key: 'toloan'
        },
        {
          title: '社保',
          align: 'center',
          width: 100,
          key: 'social'
        },
        {
          title: '公积金',
          align: 'center',
          width: 100,
          key: 'accumulation'
        },
        {
          title: '房',
          align: 'center',
          width: 100,
          key: 'room'
        },
        {
          title: '房贷',
          align: 'center',
          width: 100,
          key: 'roomloan'
        },
        {
          title: '车',
          align: 'center',
          width: 100,
          key: 'car'
        },
        {
          title: '车贷',
          align: 'center',
          width: 100,
          key: 'carloan'
        },
        {
          title: '寿险保单',
          align: 'center',
          width: 100,
          key: 'insurance'
        },
        {
          title: '微粒贷',
          align: 'center',
          width: 100,
          key: 'tiny'
        },
        {
          title: 'IP',
          align: 'center',
          width: 100,
          key: 'ip'
        }
      ],
      data1: [
        {
          no: '1',
          did: '1',
          time: '1',
          channel: '1',
          step: '1',
          name: '1',
          phone: '1',
          birthday: '1',
          city: '1',
          sex: '1',
          age: '1',
          mcity: '1',
          toloan: '1',
          social: '1',
          accumulation: '1',
          roomloan: '1',
          room: '1',
          car: '1',
          carloan: '1',
          insurance: '1',
          tiny: '1',
          ip: '1'
        },
        {
          no: '2',
          did: '2',
          time: '2',
          channel: '2',
          step: '2',
          name: '2',
          phone: '2',
          birthday: '2',
          city: '2',
          sex: '2',
          age: '2',
          mcity: '2',
          toloan: '2',
          social: '2',
          accumulation: '2',
          roomloan: '2',
          room: '2',
          car: '2',
          carloan: '2',
          insurance: '2',
          tiny: '2',
          ip: '2'
        }
      ]
    }
  },
  methods: {
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    }
  }
}
</script>
<style lang="less" scoped>
.titregist{
    overflow: hidden;
    .registrations{
        width: 330px;
        height: 100px;
        float: left;
        margin-right: 20px;
        overflow: hidden;
        color: #fff;
        div:first-child{
            width: 40%;
            float: left;
            line-height: 100px;
            p{
                text-align: center;
                font-size: 16px;
            }
        }
        div:last-child{
            width: 60%;
            float: left;
            text-align: center;
            height: 100%;
            display: table-cell;
            padding-top: 10px;
            // vertical-align: middle;
            span{
                vertical-align: middle;
                display: inline-block;
                line-height: 40px;
                // font-size: 16px
            }
        }
    }
}
.blue1{
     background: -webkit-linear-gradient(left, #49C1B5 , #73C784); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #49C1B5, #73C784); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #49C1B5, #73C784); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #49C1B5 , #73C784); /* 标准的语法（必须放在最后） */
}
.yellow1{
    background: -webkit-linear-gradient(left, #F0723D , #E4C54A); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #F0723D, #E4C54A); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #F0723D, #E4C54A); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #F0723D , #E4C54A); /* 标准的语法（必须放在最后） */
}
.purple1{
    background: -webkit-linear-gradient(left, #6F60E0 , #53D3C7); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #6F60E0, #53D3C7); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6F60E0, #53D3C7); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6F60E0 , #53D3C7); /* 标准的语法（必须放在最后） */
}
</style>
