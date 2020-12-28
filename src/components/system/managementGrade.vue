<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;配置风控等级</span>
      </p>
    </div>
    <div class="windgrade contentcss">
      <Form :label-width="135">
        <FormItem>
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="#"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <h3><strong>高</strong></h3>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <h3><strong>中</strong></h3>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem>
                <h3><strong>低</strong></h3>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="风控维度:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem class="clearfix">
                <CheckboxGroup v-model="checkbox1" @on-change="checkAllGroupChange1">
                  <Checkbox label="手机"></Checkbox>
                  <Checkbox label="IP"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <CheckboxGroup v-model="checkbox2" @on-change="checkAllGroupChange2">
                  <Checkbox label="手机"></Checkbox>
                  <Checkbox label="IP"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem>
                <CheckboxGroup v-model="checkbox3" @on-change="checkAllGroupChange3">
                  <Checkbox label="手机"></Checkbox>
                  <Checkbox label="IP"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <!-- <FormItem >
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="验证码有效时间:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem >
                <Input v-model.number="data1.highRule.ruleCodeTime" style="width:200px">
                  <span slot="append">分钟</span>
                </Input>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem >
                <Input v-model.number="data1.middleRule.ruleCodeTime" style="width:200px">
                  <span slot="append">分钟</span>
                </Input>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem >
                <Input v-model.number="data1.lowRule.ruleCodeTime" style="width:200px">
                  <span slot="append">分钟</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem> -->

        <FormItem>
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="手机弹二次验证的条件:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem class="clearfix">
                <div v-if="blacklist1">
                  <Input v-model.number="data1.highRule.phoneItemTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                  </Input>
                  <Input v-model.number="data1.highRule.phoneItemNum" class="left" style="width:100px">
                  <span slot="append">次</span>
                  </Input>
                </div>
                <div v-if="!blacklist1" style="width:200px;height:30px"></div>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <div v-if="blacklist2">
                  <Input v-model.number="data1.middleRule.phoneItemTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                  </Input>
                  <Input v-model.number="data1.middleRule.phoneItemNum" class="left" style="width:100px">
                  <span slot="append">次</span>
                  </Input>
                </div>
                <div v-if="!blacklist2" style="width:200px;height:30px"></div>

              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem>
                <div v-if="blacklist3">
                  <Input v-model.number="data1.lowRule.phoneItemTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                  </Input>
                  <Input v-model.number="data1.lowRule.phoneItemNum" class="left" style="width:100px">
                  <span slot="append">次</span>
                  </Input>
                </div>
                <div v-if="!blacklist3" style="width:200px;height:30px"></div>

              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="IP弹二次验证的条件:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem class="clearfix">
                <div v-if="ipelastic1">
                  <Input v-model.number="data1.highRule.ipItemTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                  </Input>
                  <Input v-model.number="data1.highRule.ipItemNum" class="left" style="width:100px">
                  <span slot="append">次</span>
                  </Input>
                </div>
                <div v-if="!ipelastic1" style="width:200px;height:30px"></div>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <div v-if="ipelastic2">
                  <Input v-model.number="data1.middleRule.ipItemTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                  </Input>
                  <Input v-model.number="data1.middleRule.ipItemNum" class="left" style="width:100px">
                  <span slot="append">次</span>
                  </Input>
                </div>
                <div v-if="!ipelastic2" style="width:200px;height:30px"></div>

              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem>
                <div v-if="ipelastic3">
                  <Input v-model.number="data1.lowRule.ipItemTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                  </Input>
                  <Input v-model.number="data1.lowRule.ipItemNum" class="left" style="width:100px">
                  <span slot="append">次</span>
                  </Input>
                </div>
                <div v-if="!ipelastic3" style="width:200px;height:30px"></div>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="二次验证类型:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem class="clearfix">
                <Select v-model="data1.highRule.itemRiskTypeAsString" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <Select v-model="data1.middleRule.itemRiskTypeAsString" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem>
                <Select v-model="data1.lowRule.itemRiskTypeAsString" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col :md="4" :lg="3">
              <FormItem label="是否开启加入黑名单:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem class="clearfix">
                <Select v-model="data1.highRule.blackFlagAsString" @on-change="blackflagasstring1" style="width:200px">
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <Select v-model="data1.middleRule.blackFlagAsString" @on-change="blackflagasstring2"
                        style="width:200px">
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem>
                <Select v-model="data1.lowRule.blackFlagAsString" @on-change="blackflagasstring3" style="width:200px">
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="3">
              <FormItem label="手机加入黑名单条件:"></FormItem>
            </Col>
            <Col span="7">
              <FormItem>
                <div class="credit_recharge">
                  <div
                    v-for="(item, index) in addnormals1"
                    :key="index"
                    class="mb15 clearfix"
                    v-if="phonecondition1"
                  >
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:95px">
                    <span slot="append" class="left">分钟内</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:70px">
                    <span slot="append" class="left">次</span>
                    </Input>
                    <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal1">+</Button>
                    <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma1(index)">-</Button>
                  </div>
                  <div v-if="!phonecondition1" style="width:165px;height:30px"></div>
                </div>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem>
                <div class="credit_recharge">
                  <div
                    v-for="(item, index) in addnormals2"
                    :key="index"
                    class="mb15 clearfix"
                    v-if="phonecondition2"
                  >
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:95px">
                    <span slot="append" class="left">分钟内</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:70px">
                    <span slot="append" class="left">次</span>
                    </Input>
                    <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal2">+</Button>
                    <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
                  </div>
                  <div v-if="!phonecondition2" style="width:165px;height:30px"></div>
                </div>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <div class="credit_recharge">
                  <div
                    v-for="(item, index) in addnormals3"
                    :key="index"
                    class="mb15 clearfix"
                    v-if="phonecondition3"
                  >
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:95px">
                    <span slot="append" class="left">分钟内</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:70px">
                    <span slot="append" class="left">次</span>
                    </Input>
                    <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal3">+</Button>
                    <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma3(index)">-</Button>
                  </div>
                  <div v-if="!phonecondition3" style="width:165px;height:30px"></div>
                </div>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col :md="3" :lg="3">
              <FormItem label="IP加入黑名单条件:"></FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <div class="credit_recharge">
                  <div
                    v-for="(item, index) in addnormals4"
                    :key="index"
                    class="mb15 clearfix"
                    v-if="condition1"
                  >
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:95px">
                    <span slot="append" class="left">分钟内</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:70px">
                    <span slot="append" class="left">次</span>
                    </Input>
                    <Button type="primary" class="left ml5" v-if="index==0" @click="addnormal4">+</Button>
                    <Button type="primary" class="left ml5" v-if="index!=0" @click="addnorma4(index)">-</Button>
                  </div>
                  <div v-if="!condition1" style="width:165px;height:30px"></div>
                </div>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <div class="credit_recharge">
                  <div
                    v-for="(item, index) in addnormals5"
                    :key="index"
                    class="mb15 clearfix"
                    v-if="condition2"
                  >
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:95px">
                    <span slot="append" class="left">分钟内</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:70px">
                    <span slot="append" class="left">次</span>
                    </Input>
                    <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal5">+</Button>
                    <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma5(index)">-</Button>
                  </div>
                  <div v-if="!condition2" style="width:165px;height:30px"></div>
                </div>
              </FormItem>
            </Col>
            <Col :md="7" :lg="7">
              <FormItem>
                <div class="credit_recharge">
                  <div
                    v-for="(item, index) in addnormals6"
                    :key="index"
                    class="mb15 clearfix"
                    v-if="condition3"
                  >
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:95px">
                    <span slot="append" class="left">分钟内</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:70px">
                    <span slot="append" class="left">次</span>
                    </Input>
                    <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal6">+</Button>
                    <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma6(index)">-</Button>
                  </div>
                  <div v-if="!condition3" style="width:165px;height:30px"></div>
                </div>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <!-- <FormItem >
          <Row :gutter="16">
            <Col :md="4" :lg="3">
              <FormItem label="密码登录冻结条件:"></FormItem>
            </Col>
            <Col :md="6" :lg="7" >
              <FormItem class="clearfix">
                <Input v-model.number="data1.highRule.passwdFrozenTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                </Input>
                <Input v-model.number="data1.highRule.passwdFrozenNum" class="left" style="width:75px">
                  <span slot="append">次</span>
                </Input>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem >
                <Input v-model.number="data1.middleRule.passwdFrozenTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                </Input>
                <Input v-model.number="data1.middleRule.passwdFrozenNum" class="left" style="width:75px">
                  <span slot="append">次</span>
                </Input>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem >
                <Input v-model.number="data1.lowRule.passwdFrozenTime" class="left" style="width:100px">
                  <span slot="append">分钟内</span>
                </Input>
                <Input v-model.number="data1.lowRule.passwdFrozenNum" class="left" style="width:75px">
                  <span slot="append">次</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem> -->

        <!-- <FormItem >
          <Row :gutter="16">
            <Col  :md="4" :lg="3">
              <FormItem label="密码登录解冻条件:"></FormItem>
            </Col>
            <Col :md="6" :lg="7" >
              <FormItem >
                <Input v-model.number="data1.highRule.passwdThawTime" style="width:200px">
                  <span slot="append">分钟后</span>
                </Input>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem >
                <Input v-model.number="data1.middleRule.passwdThawTime" style="width:200px">
                  <span slot="append">分钟后</span>
                </Input>
              </FormItem>
            </Col>
            <Col :md="6" :lg="7">
              <FormItem >
                <Input v-model.number="data1.lowRule.passwdThawTime" style="width:200px">
                  <span slot="append">分钟后</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem> -->


        <FormItem class="tc">
          <Button type="primary" class="mr20" @click="goToLog">查看操作日志</Button>
          <Button type="primary" @click="preservation">提交保存</Button>
          <Button style="margin-left: 8px" @click="backingout">返回</Button>
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
        ipelastic1: false,
        ipelastic2: false,
        ipelastic3: false,
        phonecondition1: true,
        phonecondition2: true,
        phonecondition3: true,
        blacklist1: true,
        blacklist2: true,
        blacklist3: true,
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
        addnormals1: [
          {
            blackTime: null,//加入黑名单时间
            blackNum: null,//加入黑名单次数
            itemCode: null,
            riskDimensionType: 2//风控维度
          }
        ],
        addnormals2: [
          {
            blackTime: null,//加入黑名单时间
            blackNum: null,//加入黑名单次数
            itemCode: null,
            riskDimensionType: 2//风控维度
          }
        ],
        addnormals3: [
          {
            blackTime: null,//加入黑名单时间
            blackNum: null,//加入黑名单次数
            itemCode: null,
            riskDimensionType: 2//风控维度
          }
        ],
        addnormals4: [
          {
            blackTime: null,//加入黑名单时间
            blackNum: null,//加入黑名单次数
            itemCode: null,
            riskDimensionType: 1//风控维度
          }
        ],
        addnormals5: [
          {
            blackTime: null,//加入黑名单时间
            blackNum: null,//加入黑名单次数
            itemCode: null,
            riskDimensionType: 1//风控维度
          }
        ],
        addnormals6: [
          {
            blackTime: null,//加入黑名单时间
            blackNum: null,//加入黑名单次数
            itemCode: null,
            riskDimensionType: 1//风控维度
          }
        ],
        data1: {
          highRule: {
            ruleCodeTime: null,
            ipItemTime: null,
            ipItemNum: null,
            itemRiskTypeAsString: '',
            blackFlagAsString: '',
            riskDimensionType: null,//风控维度
            passwdFrozenTime: null,
            passwdFrozenNum: null,
            phoneItemTime: null,
            phoneItemNum: null,
            riskRuleItemReqList: [],
            ipOrPhone: null,
            ruleCode: '',
            ruleLevel: 3

          },
          middleRule: {
            ruleCodeTime: null,
            ipItemTime: null,
            ipItemNum: null,
            itemRiskTypeAsString: '',
            blackFlagAsString: '',
            riskDimensionType: null,//风控维度
            passwdFrozenTime: null,
            passwdFrozenNum: null,
            phoneItemTime: null,
            phoneItemNum: null,
            riskRuleItemReqList: [],
            ipOrPhone: null,
            ruleCode: '',
            ruleLevel: 2
          },
          lowRule: {
            ruleCodeTime: null,//验证码有效时间
            ipItemTime: null,//弹两次验证时间
            ipItemNum: null,//弹两次验证次数
            itemRiskTypeAsString: '',//二次验证类型
            blackFlagAsString: '', //是否加入黑名单
            riskDimensionType: null,//风控维度
            passwdFrozenTime: null,//密码登录冻结条件
            passwdFrozenNum: null,//密码登录冻结次数
            passwdThawTime: null,//密码解冻时间
            phoneItemTime: null,
            phoneItemNum: null,
            riskRuleItemReqList: [],
            ipOrPhone: null,
            ruleCode: '',
            ruleLevel: 1
          }
        }

      };
    },
    methods: {
      // 加
      addnormal1() {
        this.addnormals1.push({
          blackTime: null,
          blackNum: null,
          itemCode: null,
          riskDimensionType: 2
        })
      },
      // 减
      addnorma1(index) {
        this.addnormals1.splice(index, 1)
      },
      // 加
      addnormal2() {
        this.addnormals2.push({
          blackTime: null,
          blackNum: null,
          itemCode: null,
          riskDimensionType: 2
        })
      },
      // 减
      addnorma2(index) {
        this.addnormals2.splice(index, 1)
      },
      // 加
      addnormal3() {
        this.addnormals3.push({
          blackTime: null,
          blackNum: null,
          itemCode: null,
          riskDimensionType: 2
        })
      },
      // 减
      addnorma3(index) {
        this.addnormals3.splice(index, 1)
      },
      // ip加减
      // 加
      addnormal4() {
        this.addnormals4.push({
          blackTime: null,
          blackNum: null,
          itemCode: null,
          riskDimensionType: 1
        })
      },
      // 减
      addnorma4(index) {
        this.addnormals4.splice(index, 1)
      },
      // 加
      addnormal5() {
        this.addnormals5.push({
          blackTime: null,
          blackNum: null,
          itemCode: null,
          riskDimensionType: 1
        })
      },
      // 减
      addnorma5(index) {
        this.addnormals5.splice(index, 1)
      },
      // 加
      addnormal6() {
        this.addnormals6.push({
          blackTime: null,
          blackNum: null,
          itemCode: null,
          riskDimensionType: 1
        })
      },
      // 减
      addnorma6(index) {
        this.addnormals6.splice(index, 1)
      },
      checkAllGroupChange1(data) {
        if (data.length == 1) {
          if (data[0] == '手机') {
            if (this.data1.highRule.blackFlagAsString != 0) {
              this.condition1 = false
              this.phonecondition1 = true
            }
            this.ipelastic1 = false
            this.blacklist1 = true
          } else {
            if (this.data1.highRule.blackFlagAsString != 0) {
              this.condition1 = true
              this.phonecondition1 = false
            }
            this.ipelastic1 = true
            this.blacklist1 = false
          }
        } else if (data.length == 0) {
          this.condition1 = false
          this.ipelastic1 = false
          this.phonecondition1 = false
          this.blacklist1 = false
        } else {
          if (this.data1.highRule.blackFlagAsString != 0) {
            this.condition1 = true
            this.phonecondition1 = true
          }
          this.ipelastic1 = true
          this.blacklist1 = true
        }
      },
      checkAllGroupChange2(data) {
        if (data.length == 1) {
          if (data[0] == '手机') {
            if (this.data1.middleRule.blackFlagAsString != 0) {
              this.condition2 = false
              this.phonecondition2 = true
            }
            this.ipelastic2 = false
            this.blacklist2 = true
          } else {
            if (this.data1.middleRule.blackFlagAsString != 0) {
              this.condition2 = true
              this.phonecondition2 = false
            }
            this.ipelastic2 = true
            this.blacklist2 = false
          }
        } else if (data.length == 0) {
          this.condition2 = false
          this.ipelastic2 = false
          this.phonecondition2 = false
          this.blacklist2 = false
        } else {
          if (this.data1.middleRule.blackFlagAsString != 0) {
            this.condition2 = true
            this.phonecondition2 = true
          }
          this.ipelastic2 = true
          this.blacklist2 = true
        }
      },
      checkAllGroupChange3(data) {
        if (data.length == 1) {
          if (data[0] == '手机') {
            if (this.data1.lowRule.blackFlagAsString != 0) {
              this.condition3 = false
              this.phonecondition3 = true
            }
            this.ipelastic3 = false
            this.blacklist3 = true
          } else {
            if (this.data1.lowRule.blackFlagAsString != 0) {
              this.condition3 = true
              this.phonecondition3 = false
            }
            this.ipelastic3 = true
            this.blacklist3 = false
          }
        } else if (data.length == 0) {
          this.condition3 = false
          this.ipelastic3 = false
          this.phonecondition3 = false
          this.blacklist3 = false
        } else {
          if (this.data1.lowRule.blackFlagAsString != 0) {
            this.condition3 = true
            this.phonecondition3 = true
          }
          this.ipelastic3 = true
          this.blacklist3 = true
        }
      },
      blackflagasstring1(val) {
        if (val == 1) {
          this.phonecondition1 = true
          this.condition1 = true
        } else {
          this.phonecondition1 = false
          this.condition1 = false
        }
      },
      blackflagasstring2(val) {
        if (val == 1) {
          this.phonecondition2 = true
          this.condition2 = true
        } else {
          this.phonecondition2 = false
          this.condition2 = false
        }
      },
      blackflagasstring3(val) {
        if (val == 1) {
          this.phonecondition3 = true
          this.condition3 = true
        } else {
          this.phonecondition3 = false
          this.condition3 = false
        }
      },
      backingout() {
        window.history.go(-1)
      },
      preservation() {
        let reg = /^\+?[1-9]\d*$/
        if (this.checkbox1.length == 0) {
          const title = '提示';
          const content = '<p>请选择风控维度 (高)</p>';
          this.$Modal.warning({
            title: title,
            content: content
          });
          return false
        }
        if (this.checkbox2.length == 0) {
          const title = '提示';
          const content = '<p>请选择风控维度 (中)</p>';
          this.$Modal.warning({
            title: title,
            content: content
          });
          return false
        }
        if (this.checkbox3.length == 0) {
          const title = '提示';
          const content = '<p>请选择风控维度 (低)</p>';
          this.$Modal.warning({
            title: title,
            content: content
          });
          return false
        }

        if (this.checkbox3.length == 1) {
          for (let i = 0; i < this.addnormals3.length; i++) {
            if (this.data1.lowRule.blackFlagAsString != 0) {
              if (this.checkbox3[0] == '手机') {
                if (!reg.test(this.addnormals3[i].blackTime) || !reg.test(this.addnormals3[i].blackNum)) {
                  const title = '提示';
                  const content = '<p>请补全正确的手机加入黑名单条件 (低)</p>';
                  this.$Modal.warning({
                    title: title,
                    content: content
                  });
                  return false
                }
              }
              if (this.checkbox3[0] == 'IP') {
                if (!reg.test(this.addnormals6[i].blackTime) || !reg.test(this.addnormals6[i].blackNum)) {
                  const title = '提示';
                  const content = '<p>请补全正确的IP加入黑名单条件 (低)</p>';
                  this.$Modal.warning({
                    title: title,
                    content: content
                  });
                  return false
                }
              }
            }
            if (this.checkbox3[0] == '手机') {
              this.data1.lowRule.ipOrPhone = 2
              if (!reg.test(this.data1.lowRule.phoneItemTime) || !reg.test(this.data1.lowRule.phoneItemNum)) {
                const title = '提示';
                const content = '<p>请补全正确的手机弹二次验证的条件 (低)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            if (this.checkbox3[0] == 'IP') {
              this.data1.lowRule.ipOrPhone = 1
              if (!reg.test(this.data1.lowRule.ipItemTime) || !reg.test(this.data1.lowRule.ipItemNum)) {
                const title = '提示';
                const content = '<p>请补全正确的IP弹二次验证的条件 (低)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
          }
        }
        if (this.checkbox3.length == 2) {
          this.data1.lowRule.ipOrPhone = 3
          for (let i = 0; i < this.addnormals3.length; i++) {
            this.addnormals3[i].riskDimensionType = 2
            if (this.data1.lowRule.blackFlagAsString != 0) {
              if (!reg.test(this.addnormals3[i].blackTime) || !reg.test(this.addnormals3[i].blackNum)) {
                const title = '提示';
                const content = '<p>请补全正确的手机加入黑名单条件 (低)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            if (!reg.test(this.data1.lowRule.phoneItemTime) || !reg.test(this.data1.lowRule.phoneItemNum)) {
              const title = '提示';
              const content = '<p>请补全正确的手机弹二次验证的条件 (低)</p>';
              this.$Modal.warning({
                title: title,
                content: content
              });
              return false
            }
          }
          for (let i = 0; i < this.addnormals6.length; i++) {
            this.addnormals6[i].riskDimensionType = 1
            if (!reg.test(this.data1.lowRule.ipItemTime) || !reg.test(this.data1.lowRule.ipItemNum)) {
              const title = '提示';
              const content = '<p>请补全正确的IP弹二次验证的条件 (低)</p>';
              this.$Modal.warning({
                title: title,
                content: content
              });
              return false
            }
            if (this.data1.lowRule.blackFlagAsString != 0) {
              if (!reg.test(this.addnormals6[i].blackTime) || !reg.test(this.addnormals6[i].blackNum)) {
                const title = '提示';
                const content = '<p>请补全正确的IP加入黑名单条件 (低)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
          }
        }

        if (this.checkbox2.length == 1) {
          for (let i = 0; i < this.addnormals2.length; i++) {
            if (this.data1.middleRule.blackFlagAsString != 0) {
              if (this.checkbox2[0] == '手机') {
                if (!reg.test(this.addnormals2[i].blackTime) || !reg.test(this.addnormals2[i].blackNum)) {
                  const title = '提示';
                  const content = '<p>请补全正确的手机加入黑名单条件 (中)</p>';
                  this.$Modal.warning({
                    title: title,
                    content: content
                  });
                  return false
                }
              }
              if (this.checkbox2[0] == 'IP') {
                if (!reg.test(this.addnormals5[i].blackTime) || !reg.test(this.addnormals5[i].blackNum)) {
                  const title = '提示';
                  const content = '<p>请补全正确的IP加入黑名单条件 (中)</p>';
                  this.$Modal.warning({
                    title: title,
                    content: content
                  });
                  return false
                }
              }
            }
            if (this.checkbox2[0] == '手机') {
              this.data1.middleRule.ipOrPhone = 2
              if (!reg.test(this.data1.middleRule.phoneItemTime) || !reg.test(this.data1.middleRule.phoneItemNum)) {
                const title = '提示';
                const content = '<p>请补全正确的手机弹二次验证的条件 (中)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            if (this.checkbox2[0] == 'IP') {
              this.data1.middleRule.ipOrPhone = 1
              if (!reg.test(this.data1.middleRule.ipItemTime) || !reg.test(this.data1.middleRule.ipItemNum)) {
                const title = '提示';
                const content = '<p>请补全正确的IP弹二次验证的条件 (中)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
          }
        }
        if (this.checkbox2.length == 2) {
          this.data1.middleRule.ipOrPhone = 3
          for (let i = 0; i < this.addnormals2.length; i++) {
            this.addnormals2[i].riskDimensionType = 2
            if (this.data1.middleRule.blackFlagAsString != 0) {
              if (!reg.test(this.addnormals2[i].blackTime) || !reg.test(this.addnormals2[i].blackNum)) {
                const title = '提示';
                const content = '<p>请补全正确的手机加入黑名单条件 (中)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            if (!reg.test(this.data1.middleRule.phoneItemTime) || !reg.test(this.data1.middleRule.phoneItemNum)) {
              const title = '提示';
              const content = '<p>请补全正确的手机弹二次验证的条件 (中)</p>';
              this.$Modal.warning({
                title: title,
                content: content
              });
              return false
            }

          }
          for (let i = 0; i < this.addnormals5.length; i++) {
            this.addnormals5[i].riskDimensionType = 1
            if (this.data1.middleRule.blackFlagAsString != 0) {
              if (!reg.test(this.addnormals5[i].blackTime) || !reg.test(this.addnormals5[i].blackNum)) {
                const title = '提示';
                const content = '<p>请补全正确的IP加入黑名单条件 (中)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            if (!reg.test(this.data1.middleRule.ipItemTime) || !reg.test(this.data1.middleRule.ipItemNum)) {
              const title = '提示';
              const content = '<p>请补全正确的IP弹二次验证的条件 (中)</p>';
              this.$Modal.warning({
                title: title,
                content: content
              });
              return false
            }
          }
        }

        if (this.checkbox1.length == 1) {
          for (let i = 0; i < this.addnormals1.length; i++) {
            if (this.data1.highRule.blackFlagAsString != 0) {
              if (this.checkbox1[0] == '手机') {
                if (!reg.test(this.addnormals1[i].blackTime) || !reg.test(this.addnormals1[i].blackNum)) {
                  const title = '提示';
                  const content = '<p>请输入正确的手机加入黑名单条件 (高)</p>';
                  this.$Modal.warning({
                    title: title,
                    content: content
                  });
                  return false
                }
              }
              if (this.checkbox1[0] == 'IP') {
                if (!reg.test(this.addnormals4[i].blackTime) || !reg.test(this.addnormals4[i].blackNum)) {
                  const title = '提示';
                  const content = '<p>请输入正确的IP加入黑名单条件 (高)</p>';
                  this.$Modal.warning({
                    title: title,
                    content: content
                  });
                  return false
                }
              }
            }
            if (this.checkbox1[0] == '手机') {
              this.data1.highRule.ipOrPhone = 2
              if (!reg.test(this.data1.highRule.phoneItemTime) || !reg.test(this.data1.highRule.phoneItemNum)) {
                const title = '提示';
                const content = '<p>请输入正确的手机弹二次验证的条件 (高)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            if (this.checkbox1[0] == 'IP') {
              this.data1.highRule.ipOrPhone = 1
              if (!reg.test(this.data1.highRule.ipItemTime) || !reg.test(this.data1.highRule.ipItemNum)) {
                const title = '提示';
                const content = '<p>请输入正确的IP弹二次验证的条件 (高)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
          }
        }
        if (this.checkbox1.length == 2) {
          this.data1.highRule.ipOrPhone = 3
          for (let i = 0; i < this.addnormals1.length; i++) {
            if (this.data1.highRule.blackFlagAsString != 0) {
              if (!reg.test(this.addnormals1[i].blackTime) || !reg.test(this.addnormals1[i].blackNum)) {
                const title = '提示';
                const content = '<p>请输入正确的手机加入黑名单条件 (高)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }

            if (!reg.test(this.data1.highRule.phoneItemTime) || !reg.test(this.data1.highRule.phoneItemNum)) {
              const title = '提示';
              const content = '<p>请输入正确的手机弹二次验证的条件 (高)</p>';
              this.$Modal.warning({
                title: title,
                content: content
              });
              return false
            }

            this.addnormals1[i].riskDimensionType = 2
          }
          for (let i = 0; i < this.addnormals4.length; i++) {
            if (!reg.test(this.data1.highRule.ipItemTime) || !reg.test(this.data1.highRule.ipItemNum)) {
              const title = '提示';
              const content = '<p>请输入正确的IP弹二次验证的条件 (高)</p>';
              this.$Modal.warning({
                title: title,
                content: content
              });
              return false
            }
            if (this.data1.highRule.blackFlagAsString != 0) {
              if (!reg.test(this.addnormals4[i].blackTime) || !reg.test(this.addnormals4[i].blackNum)) {
                const title = '提示';
                const content = '<p>请输入正确的IP加入黑名单条件 (高)</p>';
                this.$Modal.warning({
                  title: title,
                  content: content
                });
                return false
              }
            }
            this.addnormals4[i].riskDimensionType = 1
          }
        }
        this.data1.highRule.riskRuleItemReqList = this.addnormals1.concat(this.addnormals4)
        this.data1.middleRule.riskRuleItemReqList = this.addnormals2.concat(this.addnormals5)
        this.data1.lowRule.riskRuleItemReqList = this.addnormals3.concat(this.addnormals6)
        let list = []
        for (const key in this.data1) {
          // if (!reg.test(this.data1[key].ruleCodeTime)) {
          //   const title = '提示';
          //   const content = '<p>请输入正确的验证码有效时间</p>';
          //   this.$Modal.warning({
          //     title: title,
          //     content: content
          //   });
          //   return false
          // }
          if (this.data1[key].itemRiskTypeAsString == '') {
            const title = '提示';
            const content = '<p>请选择二次验证类型</p>';
            this.$Modal.warning({
              title: title,
              content: content
            });
            return false
          }
          if (this.data1[key].blackFlagAsString == '') {
            const title = '提示';
            const content = '<p>请选择是否开启加入黑名单</p>';
            this.$Modal.warning({
              title: title,
              content: content
            });
            return false
          }

          // if (!reg.test(this.data1[key].passwdFrozenTime)  || !reg.test(this.data1[key].passwdFrozenNum)) {
          //   const title = '提示';
          //   const content = '<p>请输入正确的密码登录冻结条件</p>';
          //   this.$Modal.warning({
          //     title: title,
          //     content: content
          //   });
          //   return false
          // }

          // if (!reg.test(this.data1[key].passwdThawTime)) {
          //   const title = '提示';
          //   const content = '<p>请输入正确的密码登录解冻时间</p>';
          //   this.$Modal.warning({
          //     title: title,
          //     content: content
          //   });
          //   return false
          // }
          list.push(this.data1[key])
        }
        this.http.post(BASE_URL + '/rule/RiskRule/modifyBatchRiskRuleByCode', list)
          .then((resp) => {
            if (resp.code == 'success') {
              this.$Modal.success({
                title: '提示',
                content: '<p>保存成功</p>',
                onOk: () => {
                  // this.$router.push({ path: './managementSet' })
                }
              })
            } else {

            }
          })
          .catch(() => {

          })
      },
      goToLog() {
        this.$router.push({path: './operationLog?operationType=risk_edit'})
      }
    },
    created() {
      // 获取数据
      this.http.post(BASE_URL + "/rule/RiskRule/getAllRiskRule", {
        pageNum: 1,
        pageSize: 10
      }).then(data => {
        for (var i in data.data) {
          if (i == 'highRule' && data.data[i] != null) {
            this.checkbox1 = []
            if (data.data[i].phoneRiskRuleItemReqList.length > 0) {
              this.checkbox1.push('手机')
              this.phonecondition1 = true
              this.blacklist1 = true
              this.condition1 = false
              this.ipelastic1 = false
              this.addnormals1 = data.data[i].phoneRiskRuleItemReqList
            }
            if (data.data[i].ipRiskRuleItemReqList.length > 0) {
              this.checkbox1.push('IP')
              this.condition1 = true
              this.ipelastic1 = true
              this.phonecondition1 = false
              this.blacklist1 = false
              this.addnormals4 = data.data[i].ipRiskRuleItemReqList
            }
            if (data.data[i].phoneRiskRuleItemReqList.length > 0 && data.data[i].ipRiskRuleItemReqList.length > 0) {
              this.blacklist1 = true
              this.ipelastic1 = true
            }

          }
          if (i == 'middleRule' && data.data[i] != null) {
            this.checkbox2 = []
            if (data.data[i].phoneRiskRuleItemReqList.length > 0) {
              this.checkbox2.push('手机')
              this.phonecondition2 = true
              this.blacklist2 = true
              this.condition2 = false
              this.ipelastic2 = false
              this.addnormals2 = data.data[i].phoneRiskRuleItemReqList
            }
            if (data.data[i].ipRiskRuleItemReqList.length > 0) {
              this.checkbox2.push('IP')
              this.condition2 = true
              this.ipelastic2 = true
              this.phonecondition2 = false
              this.blacklist2 = false
              this.addnormals5 = data.data[i].ipRiskRuleItemReqList
            }
            if (data.data[i].phoneRiskRuleItemReqList.length > 0 && data.data[i].ipRiskRuleItemReqList.length > 0) {
              this.ipelastic2 = true
              this.blacklist2 = true
            }
          }
          if (i == 'lowRule' && data.data[i] != null) {
            this.checkbox3 = []
            if (data.data[i].phoneRiskRuleItemReqList.length > 0) {
              this.checkbox3.push('手机')
              this.phonecondition3 = true
              this.blacklist3 = true
              this.condition3 = false
              this.ipelastic3 = false
              this.addnormals3 = data.data[i].phoneRiskRuleItemReqList
            }
            if (data.data[i].ipRiskRuleItemReqList.length > 0) {
              this.checkbox3.push('IP')
              this.condition3 = true
              this.ipelastic3 = true
              this.phonecondition3 = false
              this.blacklist3 = false
              this.addnormals6 = data.data[i].ipRiskRuleItemReqList
            }
            if (data.data[i].phoneRiskRuleItemReqList.length > 0 && data.data[i].ipRiskRuleItemReqList.length > 0) {
              this.ipelastic3 = true
              this.blacklist3 = true
            }
          }
        }
        if (data.data.highRule == null) {
          data.data.highRule = this.data1.highRule
        }
        if (data.data.middleRule == null) {
          data.data.middleRule = this.data1.middleRule
        }
        if (data.data.lowRule == null) {
          data.data.lowRule = this.data1.lowRule
        }
        this.data1 = data.data

      })
        .catch(err => {
          // console.log(err)
        });
    }
  };
</script>
<style lang="less" scoped>
  .windgrade {
    // border: 1px solid #ccc;
    padding: 50px 0
  }
</style>
