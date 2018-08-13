<template>
<div>
<div class="navigation">
<p>
<span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置</span>
</p>
</div>
<div class="windgrade">
  <Form  :label-width="125">  
    <FormItem >
      <Row>
        <Col :md="4" :lg="3">
          <FormItem label="验证码有效时间:"></FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <Input v-model="value11" style="width:200px">
              <span slot="append">分钟</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <Input v-model="value11" style="width:200px">
              <span slot="append">分钟</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Input v-model="data1.lowRule.ruleCodeTime" style="width:200px">
              <span slot="append">分钟</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row>
        <Col :md="4" :lg="3">
          <FormItem label="弹二次验证的条件:"></FormItem>
        </Col>
        <Col :md="7" :lg="7" >
          <FormItem class="clearfix">
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">分钟内</span>
            </Input>
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">次</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">分钟内</span>
            </Input>
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">次</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Input v-model="data1.lowRule.ipItemTime" class="left" style="width:100px">
              <span slot="append">分钟内</span>
            </Input>
            <Input v-model="data1.lowRule.ipItemNum" class="left" style="width:100px">
              <span slot="append">次</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row>
        <Col :md="4" :lg="3">
          <FormItem label="二次验证类型:"></FormItem>
        </Col>
        <Col :md="7" :lg="7" >
          <FormItem class="clearfix">
            <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Select v-model="data1.lowRule.itemRiskType" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row>
        <Col :md="4" :lg="3">
          <FormItem label="是否开启加入黑名单:"></FormItem>
        </Col>
        <Col :md="7" :lg="7" >
          <FormItem class="clearfix">
            <Select v-model="model2" style="width:200px">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <Select v-model="model2" style="width:200px">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Select v-model="data1.lowRule.blackFlag" style="width:200px">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row>
        <Col :md="4" :lg="3">
          <FormItem label="风控维度:"></FormItem>
        </Col>
        <Col :md="7" :lg="7" >
          <FormItem class="clearfix">
            <CheckboxGroup v-model="checkbox1" @on-change="checkAllGroupChange1">
              <Checkbox label="手机"></Checkbox>
              <Checkbox label="IP"></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <CheckboxGroup v-model="checkbox2" @on-change="checkAllGroupChange2">
              <Checkbox label="手机"></Checkbox>
              <Checkbox label="IP"></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <CheckboxGroup v-model="checkbox3" @on-change="checkAllGroupChange3">
              <Checkbox label="手机"></Checkbox>
              <Checkbox label="IP"></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row>
        <Col span="3" >
          <FormItem label="手机加入黑名单条件:"></FormItem>
        </Col>
        <Col span="7" >
          <FormItem >
            <div class="credit_recharge" >
              <div
                v-for="(item, index) in addnormals"
                :key="index"
                class="mb15 clearfix"
                v-if="phonecondition1"
                >
                <Input type="text" v-model="item.blackTime" class="left ml10 inputnum"  style="width:95px">
                  <span slot="append" class="left">小时内</span>
                </Input>
                <Input type="text" v-model="item.blackNum" class="left inputnum"  style="width:70px">
                    <span slot="append" class="left">次</span>
                </Input>
                <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
              </div>
              <div v-if="!phonecondition1" style="width:165px;height:30px"></div>
            </div>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem >
            <div class="credit_recharge" >
              <div
                v-for="(item, index) in addnormals"
                :key="index"
                class="mb15 clearfix"
                v-if="phonecondition2"
                >
                <Input type="text" v-model="item.blackTime" class="left ml10 inputnum"  style="width:95px">
                  <span slot="append" class="left">小时内</span>
                </Input>
                <Input type="text" v-model="item.blackNum" class="left inputnum"  style="width:70px">
                    <span slot="append" class="left">次</span>
                </Input>
                <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
              </div>
              <div v-if="!phonecondition2" style="width:165px;height:30px"></div>
            </div>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <div class="credit_recharge"  >
              <div
                v-for="(item, index) in addnormals"
                :key="index"
                class="mb15 clearfix"
                v-if="phonecondition3"
                >
                <Input type="text" v-model="item.blackTime" class="left ml10 inputnum"  style="width:95px">
                  <span slot="append" class="left">小时内</span>
                </Input>
                <Input type="text" v-model="item.blackNum" class="left inputnum"  style="width:70px">
                    <span slot="append" class="left">次</span>
                </Input>
                <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
              </div>
              <div v-if="!phonecondition3" style="width:165px;height:30px"></div>
            </div>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row>
        <Col :md="3" :lg="3">
          <FormItem label="IP加入黑名单条件:"></FormItem>
        </Col>
        <Col :md="7" :lg="7" >
          <FormItem >
            <div class="credit_recharge" >
              <div
                v-for="(item, index) in addnormals"
                :key="index"
                class="mb15 clearfix"
                v-if="condition1"
                >
                <Input type="text" v-model="item.blackTime" class="left ml10 inputnum"  style="width:95px">
                  <span slot="append" class="left">小时内</span>
                </Input>
                <Input type="text" v-model="item.blackNum" class="left inputnum"  style="width:70px">
                    <span slot="append" class="left">次</span>
                </Input>
                <Button type="primary" class="left ml5" v-if="index==0" @click="addnormal">+</Button>
                <Button type="primary" class="left ml5" v-if="index!=0" @click="addnorma2(index)">-</Button>
              </div>
              <div v-if="!condition1" style="width:165px;height:30px"></div>
            </div>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <div class="credit_recharge" >
              <div
                v-for="(item, index) in addnormals"
                :key="index"
                class="mb15 clearfix"
                v-if="condition2"
                >
                <Input type="text" v-model="item.blackTime" class="left ml10 inputnum"  style="width:95px">
                  <span slot="append" class="left">小时内</span>
                </Input>
                <Input type="text" v-model="item.blackNum" class="left inputnum"  style="width:70px">
                    <span slot="append" class="left">次</span>
                </Input>
                <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
              </div>
              <div v-if="!condition2" style="width:165px;height:30px"></div>
            </div>
          </FormItem>
        </Col>
        <Col :md="7" :lg="7">
          <FormItem >
            <div class="credit_recharge" >
              <div
                v-for="(item, index) in addnormals"
                :key="index"
                class="mb15 clearfix"
                v-if="condition3"
                >
                <Input type="text" v-model="item.blackTime" class="left ml10 inputnum"  style="width:95px">
                  <span slot="append" class="left">小时内</span>
                </Input>
                <Input type="text" v-model="item.blackNum" class="left inputnum"  style="width:70px">
                    <span slot="append" class="left">次</span>
                </Input>
                <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
              </div>
              <div v-if="!condition3" style="width:165px;height:30px"></div>
            </div>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row :gutter="16">
        <Col :md="4" :lg="3">
          <FormItem label="密码登录冻结条件:"></FormItem>
        </Col>
        <Col :md="6" :lg="7" >
          <FormItem class="clearfix">
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">分钟内</span>
            </Input>
            <Input v-model="value11" class="left" style="width:75px">
              <span slot="append">次</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">分钟内</span>
            </Input>
            <Input v-model="value11" class="left" style="width:75px">
              <span slot="append">次</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Input v-model="value11" class="left" style="width:100px">
              <span slot="append">分钟内</span>
            </Input>
            <Input v-model="value11" class="left" style="width:75px">
              <span slot="append">次</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <FormItem >
      <Row :gutter="16">
        <Col  :md="4" :lg="3">
          <FormItem label="密码登录解冻条件:"></FormItem>
        </Col>
        <Col :md="6" :lg="7" >
          <FormItem >
            <Input v-model="value11" style="width:200px">
              <span slot="append">分钟后</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Input v-model="value11" style="width:200px">
              <span slot="append">分钟后</span>
            </Input>
          </FormItem>
        </Col>
        <Col :md="6" :lg="7">
          <FormItem >
            <Input v-model="value11" style="width:200px">
              <span slot="append">分钟后</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    
    
    
    
    
    <FormItem class="tc">
        <Button type="primary">提交保存</Button>
        <Button style="margin-left: 8px">返回</Button>
    </FormItem>
  </Form>

</div>
<!-- <p class="mt15 tc">
<Button type="primary">提交保存</Button>&nbsp;&nbsp;&nbsp;&nbsp;
<Button type="ghost">返回</Button>
</p> -->
</div>
</template>
<script>
export default {
  data() {
    return {
      value11: '',
      condition1: false,
      condition2: false,
      condition3: false,
      phonecondition1: true,
      phonecondition2: true,
      phonecondition3: true,
      cityList: [
        {
          value: '1',
          label: '智能无感知验证码'
        },
        {
            value: '2',
            label: '滑动拼图验证码'
        },
        {
            value: '3',
            label: '图中选点验证码'
        },
        {
            value: '4',
            label: '短信上行验证码'
        }
      ],
      model1: '',
      cityList2: [
        {
          value: '1',
          label: '开启'
        },
        {
            value: '0',
            label: '关闭'
        }
      ],
      model2: '',
      checkbox1: ['手机'],
      checkbox2: ['手机'],
      checkbox3: ['手机'],
      addnormals: [
        {
          blackTime: '',//加入黑名单时间
          blackNum: '',//加入黑名单次数
          riskDimensionType: ''//风控维度
        }
      ],
      data1: {
        highRule:{
          ruleCodeTime: '',
          ipItemTime: '',
          ipItemNum: '',
          itemRiskType: '',
          blackFlag: '',
          riskDimensionType: '',//风控维度
          passwdFrozenTime: '',
          passwdFrozenNum: '',
          passwdThawTime: ''
        },
        middleRule:{
          ruleCodeTime: '',
          ipItemTime: '',
          ipItemNum: '',
          itemRiskType: '',
          blackFlag: '',
          riskDimensionType: '',//风控维度
          passwdFrozenTime: '',
          passwdFrozenNum: '',
          passwdThawTime: ''
        },
        lowRule:{
          ruleCodeTime: '',//验证码有效时间
          ipItemTime: '',//弹两次验证时间
          ipItemNum: '',//弹两次验证次数
          itemRiskType: '',//二次验证类型
          blackFlag: '', //是否加入黑名单
          riskDimensionType: '',//风控维度
          passwdFrozenTime: '',//密码登录冻结条件
          passwdFrozenNum: '',//密码登录冻结次数
          passwdThawTime: ''//密码解冻时间
        }
      }

    };
  },
  methods: {
    // 加
    addnormal () {
      this.index2++
      this.addnormals.push({
        value1: '',
        value2: ''
      })
    },
    // 减
    addnorma2 (index) {
       this.addnormals.splice(index, 1)
    },
    checkAllGroupChange1 (data) {
      console.log(data)
      if (data.length == 1) {
        if (data[0]  == '手机') {
          this.condition1 = false
          this.phonecondition1 = true
        } else {
          this.condition1 = true
          this.phonecondition1 = false
        }
      } else if (data.length == 0) {
        this.condition1 = false
        this.phonecondition1 = false
      } else {
        this.condition1 = true
        this.phonecondition1 = true
      }
    },
    checkAllGroupChange2 (data) {
      if (data.length == 1) {
        if (data[0]  == '手机') {
          this.condition2 = false
          this.phonecondition2 = true
        } else {
          this.condition2 = true
          this.phonecondition2 = false
        }
      } else if (data.length == 0) {
        this.condition2 = false
        this.phonecondition2 = false
      } else {
        this.condition2 = true
        this.phonecondition2 = true
      }
    },
    checkAllGroupChange3 (data) {
      if (data.length == 1) {
        if (data[0]  == '手机') {
          this.condition3 = false
          this.phonecondition3 = true
        } else {
          this.condition3 = true
          this.phonecondition3 = false
        }
      } else if (data.length == 0) {
        this.condition3 = false
        this.phonecondition3 = false
      } else {
        this.condition3 = true
        this.phonecondition3 = true
      }
    }
  },
  created() {
    // 获取数据
    this.http.post(BASE_URL + "/rule/RiskRule/getAllRiskRule", {
        pageNum: 1,
        pageSize: 10
      }).then(data => {
        for (let i in data.data) {
          if (i == 'highRule') {
            if (i.phoneRiskRuleItemReqList.length>0) {
              // this.checkbox1
            }
          }
          
        }
        this.data1= data.data
      })
      .catch(err => {
        // console.log(err)
      });
  }
};
</script>
<style lang="less" scoped>
.windgrade {
  border:1px solid #ccc;
  padding:50px 0
}
</style>