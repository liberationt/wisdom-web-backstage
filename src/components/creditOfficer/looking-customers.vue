<template>
<div>
    <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;找客户筛选条件设置</span>
        </p>
      </div>
      <div class="contentcss">
          <Row>
            <Col span="6">&nbsp;</Col>
            <Col span="12">
                <ul>
                    <li class="clearfix mt15">
                        <span class="left lh32 displayib w100 tr">状态:</span>
                        <Select  v-model="giveStatus" style="width:200px"  class="left ml5" @on-change="admissionsucc">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li v-if="giveStatus=='1'" class="clearfix mt15" v-for="(item,index) in addnormals">
                        <span class="left lh32 displayib w100 tr">第{{index+1}}档:</span>
                        <Select  v-model="item.listcode" style="width:200px"  class="left ml5" >
                            <Option v-for="item in gearPosition" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                        <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>

                    </li>
                    <li>
                        <div class=" mt50 tc">
                            <Button type="primary" class="w100 examinetype" :loading="loading3" @click="marketingusbmit">
                                <span v-if="!loading3">保存配置</span>
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="ghost" @click="handleRender3">查看操作日志</Button>
                        </div>
                    </li>
                </ul>
            </Col>
            <Col span="6">&nbsp;</Col>
          </Row>
          

      </div>
</div>
    
</template>
<script>
export default {
    data () {
        return {
            giveStatus:'1',
            firstRecharge:false,
            loading3: false,
            gearPositiontype:true,
            index2:1,
            cityList: [
                {
                    value: '1',
                    label: '开启'
                },
                {
                    value: '0',
                    label: '关闭'
                }
            ],
            gearPosition:[],
            geatvaluelist:[],
            // 档位list
            addnormals: [
                {
                    listcode:''
                }
            ],

        }
    },
    methods: {
         // 开启首充充值活动
      admissionsucc (val) {
        if (val == 1) {
          this.firstRecharge = true
        } else {
          this.firstRecharge = false
        }
      },
      // 档位添加
    addnormal () {
        if (this.addnormals.length == (this.gearPosition.length-1)) {
            return false
        }
        this.index2++
        let index
        if (!this.gearPositiontype) {
           index = 0 
        } else {
            index = this.addnormals.length+1
        }
        this.addnormals.push({
          listcode:this.gearPosition[index].value
        })    
      },
      // 档位删除
      addnorma2 (index,num) {
          this.gearPositiontype = false
          this.addnormals.splice(index, 1)
      },
    //   档位查询
      initialization () {
         this.http.post(BASE_URL + '/loan/config/getUserInfoConditions',{})
        .then((resp) => {
          if (resp.code == 'success') {
              for (let i = 0; i < resp.data.statusList.length; i++) {
                if (resp.data.statusList[i].default == true) {
                    this.giveStatus = resp.data.statusList[i].value
                }           
              }
              
              if (resp.data.configList!=null) {
                  this.addnormals = []
                  for (let i = 0; i < resp.data.configList.length; i++) {
                      for (let j = 0; j < resp.data.configList[i].length; j++) {
                        if (resp.data.configList[i][j].default == true) {
                          let obj = new Object ()
                          obj.listcode = resp.data.configList[i][j].value
                          this.addnormals.push(obj)
                      }                         
                      }                                        
                  }
              }else {
                  this.addnormals[0].listcode = resp.data.optionList[1].value
              }
            this.gearPosition = resp.data.optionList
            
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })

      },
      marketingusbmit () {
          this.geatvaluelist = []
          if (this.giveStatus == '1') {
              for (let i = 0; i < this.addnormals.length; i++) {            
              if (this.addnormals[i].listcode == '') {
                  this.$Modal.warning({
                    title: '温馨提示',
                    content: '<p>请选择筛选档位</p>'
                  })
                  return false
              }
              this.geatvaluelist.push(this.addnormals[i].listcode)
              
          }
          }
          
          let list = []
          for (let j = 0; j < this.geatvaluelist.length; j++) {
              if (list.indexOf(this.geatvaluelist[j]) == -1) {
                  list.push(this.geatvaluelist[j])
              }
              
          }
          if (list.length!=this.geatvaluelist.length) {
              this.$Modal.warning({
                    title: '温馨提示',
                    content: '<p>有重复筛选档位，请重新选择</p>'
                  })
                  return false
          }
          let listval = {
              selectList:this.geatvaluelist,
              status:this.giveStatus
          }
          this.http.post(BASE_URL + '/loan/config/saveUserInfoConditions',listval)
        .then((resp) => {
          if (resp.code == 'success') {
            this.$Modal.success({
                    title: '温馨提示',
                    content: '<p>保存成功</p>'
                  })
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })


      },
      handleRender3 () {   //筛选设置日志
        this.$router.push({ path: './operationLog?operationType=user_filter_config_edit' })
      },


    },
    mounted () {
        this.initialization ()
    }
}
</script>
<style lang="less" scoped>

</style>


 