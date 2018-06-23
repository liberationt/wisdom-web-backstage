<template>
    <div>
        <div class="navigation">
            <p>
                <span>推广明细报表</span>
            </p>
        </div>
        <div class="mt50">
            <span>甲方名称:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>步骤:</span>
            <Select v-model="model4" style="width:200px" class="mr20">
                <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>推送状态:</span>
            <Select v-model="model2" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>推送类型:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="mt15">
            <span>推送时间:</span>
              <DatePicker type="date" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            </div>
            <div class="clearfix mr100 mt20">
                <Button class="right w100" type="primary">导出</Button>
                <Button class="right mr20 w100" type="info">查询</Button>
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
      model4: '',
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
      cityList4: [
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
          title: 'UID',
          align: 'center',
          width: 100,
          key: 'did'
        },
        {
          title: '甲方',
          align: 'center',
          width: 100,
          key: 'media'
        },
        {
          title: '推送主体',
          align: 'center',
          width: 100,
          key: 'type'
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
          title: '手机号',
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
        },
        {
          title: '推送时间',
          align: 'center',
          width: 100,
          key: 'pushtime'
        },
        {
          title: '推送时间',
          align: 'center',
          width: 100,
          key: 'pushtype'
        },
        {
          title: '失败原因',
          align: 'center',
          width: 100,
          key: 'errreason'
        }
      ],
      data1: [
        {
          no: '1',
          did: '1',
          media: '1',
          type: '1',
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
          ip: '1',
          pushtime: '1',
          pushtype: '1',
          errreason: '哈哈哈'

        },
        {
          no: '11',
          did: '11',
          media: '11',
          type: '11',
          time: '11',
          channel: '11',
          step: '11',
          name: '11',
          phone: '11',
          birthday: '11',
          city: '11',
          sex: '11',
          age: '11',
          mcity: '11',
          toloan: '11',
          social: '11',
          accumulation: '11',
          roomloan: '11',
          room: '11',
          car: '11',
          carloan: '11',
          insurance: '11',
          tiny: '11',
          ip: '11',
          pushtime: '1',
          pushtype: '1',
          errreason: '哈哈哈'
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

</style>
