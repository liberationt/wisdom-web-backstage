<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;管理设置&nbsp;>&nbsp; 分销设置</span>
        </p>
      </div>
      <div class="clearfix contentcss sales-statis">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">
          <FormItem label="菜单排序:">
            <div class="flexd">
              <FormItem prop="loan">
                <Input v-model="formValidate.loan" style="width:120px" class="mr20">
                  <span slot="prepend">贷款产品</span>
                </Input>
              </FormItem>
              <FormItem prop="card">
                <Input v-model="formValidate.card" style="width:120px" class="mr20"><span slot="prepend">更多产品</span></Input>
              </FormItem>
              <FormItem prop="selfrun">
                <Input v-model="formValidate.selfrun" style="width:120px"><span slot="prepend">自营贷款</span></Input>
              </FormItem>
            </div>
          </FormItem>
          <FormItem label="开通分销层级:" prop="distribution">
             <CheckboxGroup v-model="formValidate.distribution">
                  <Checkbox v-for="(item,i) in distributionList" :key="i" :label='item.code'>{{item.label}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="有钱花显示开关:">
            <div class="flexd">
              <FormItem prop='richflower'>
                <Select v-model="formValidate.richflower" style='width:140px;' class="mr20" @on-change='richflowerchange'>
                    <Option v-for="(item,i) in richflowerList" :value="item.value" :key="i">{{item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem prop='days' v-if="formValidate.richflower==1">
                <Input v-model="formValidate.days" style="width:180px"><span slot="append">天内不再提示</span></Input>
              </FormItem>
            </div>
          </FormItem>
          <FormItem label='申请记录生成间隔:' prop='recording'>
              <Input v-model="formValidate.recording" style="width:180px"><span slot="append">小时内</span></Input>
          </FormItem>
          <FormItem label='申请记录匹配有效期:' prop='validity'>
              <Input v-model="formValidate.validity" style="width:180px"><span slot="append">天内</span></Input>
          </FormItem>
          <FormItem label='一键推广店铺文案:' prop='tweets'>
              <Input v-model="formValidate.tweets" placeholder="这里是文字内容，营销店铺推广，前台复制的文案中，最后跟上店铺地址的短链接" type="textarea" style="width:240px" :rows="4"></Input>
          </FormItem>
           <FormItem label='现金赠送触发条件:'>
             <div style="display:flex">
                <FormItem prop="cashswitch">
                  <Select v-model="formValidate.cashswitch" style='width:140px;' class="mr20">
                    <Option v-for="(item,i) in cashswitchList" :value="item.value" :key="i">{{item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem prop="switch" v-if="formValidate.cashswitch==1">
                  <Select v-model="formValidate.switch" style='width:140px;' class="mr20">
                    <Option v-for="(item,i) in switchList" :value="item.value" :key="i">{{item.label }}</Option>
                  </Select>
                </FormItem>
              </div>
              <FormItem prop="authentication" style="margin:20px 0;" v-if="formValidate.cashswitch==1">
                <CheckboxGroup v-model="formValidate.authentication">
                  <Checkbox v-for="(item,i) in authenticationList" :key="i" :label='item.value'>{{item.label}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem prop="giftamount" v-if="formValidate.cashswitch==1">
                <Input v-model="formValidate.giftamount" placeholder="请输入赠送金额" style="width:200px"><span slot="append">元</span></Input>
              </FormItem>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')" style='width:100px'>提交保存</Button>
              <Button @click="operate" style='width:100px;margin:0 10px'>操作日志</Button>
          </FormItem>
        </Form>
      </div>
      <Modal
          v-model="JournalList"
          title="操作日志"
          ok-text="关闭"
          :mask-closable = false
          width=800
          @on-ok="Journalok">
          <Table border :columns="columns" :data="data1"></Table>
          <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
		  </div>
	</Modal>
    </div>
</template>
<script>
export default {
    data(){
      return{
        columns:[
          {
            title: "操作时间",
            key: "dataCreateTime",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作人",
            key: "operator",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作内容",
            key: "content",
            align: "center",
            minWidth: 100
          }
        ],
        data1:[],
        JournalList:false,
        total:0,
        startRow:1,
        endRow:10,
        datalist:[],
        distributionList:[],
        richflowerList:[
          {label:'开启',value:'1'},
          {label:'关闭',value:'0'},
        ],
        cashswitchList:[
          {label:'开启',value:'1'},
          {label:'关闭',value:'0'},
        ],
        switchList:[],
        authenticationList:[],
        formValidate: {
            loan:'', //菜单排序
            card:'',
            selfrun:'',
            distribution: [],//分佣模式
            richflower:'', //有钱花显示开关
            days:'', //,
            recording:'',
            validity:'',
            tweets:'',
            cashswitch:'0',
            switch:'0',
            authentication:[],
            giftamount:'5'
        },
        ruleValidate: {
          loan:[
              { required: true,  message: '请输入菜单排序', trigger: 'blur' },
              {pattern: /^[1-3]$/, message: '请输入1-3的整数',trigger: 'blur'}
             
          ],
          card:[
              { required: true,  message: '请输入菜单排序', trigger: 'blur' },
              {pattern: /^[1-3]$/, message: '请输入1-3的整数',trigger: 'blur'}
          ],
          selfrun:[
              { required: true, message: '请输入菜单排序', trigger: 'blur' },
              {pattern: /^[1-3]$/, message: '请输入1-3的整数',trigger: 'blur'}
          ],
          distribution:[
             { required: true, type: 'array', min: 1, message: '请选择开通分销层级', trigger: 'change' },
          ],
          richflower:[
              { required: true,type: 'string',  message: '请选择有钱花显示开关', trigger: 'change' }
          ],
          days:[
              { required: true,type: 'string', message: '请输入天数', trigger: 'blur' },
              {required: true, message: '请输入1-365之间的整数', pattern:  /^([1-9]|[1-9][0-9]|[1-2][0-9][0-9]|[3][0-5][0-9]|(360|361|363|362|364|365))$/,trigger: 'change'}

          ],
          recording:[
              { required: true,type: 'string',  message: '请输入申请记录生成间隔时间', trigger: 'blur' },
              {required: true, message: '请输入1-999之间的整数', pattern: /^([1-9][0-9]{0,2})$/,trigger: 'change'}
          ],
          switch:[
            { required: true,type: 'string',  message: '请选择类型', trigger: 'blur' },
          ],
          validity:[
              { required: true,type: 'string',  message: '请输入申请记录匹配有效期天数', trigger: 'blur' },
              {required: true, message: '请输入1-999之间的整数', pattern: /^([1-9][0-9]{0,2})$/,trigger: 'change'}
          ],
          tweets:[
              { required: true,type: 'string', message: '请输入一键推广店铺文案', trigger: 'blur' },
              { required: true,type: 'string',max:100, message: '一键推广店铺文案最多100字', trigger: 'blur' },
          ],
          giftamount:[
             { required: true,type: 'string', message: '请输入赠送金额', trigger: 'blur' },
             {required: true, message: '赠送金额为1-1000间的整数', pattern: /^([1-9][0-9]{0,2}|1000)$/ , trigger: 'blur'}
          ]
        },
      }
    },
    methods:{
      pageChange(startRow){
        this.startRow = startRow
        this.getdata(startRow)
      },
      pagesizechange(endRow){
        this.endRow = endRow
        this.getdata(1)
      },
      operate(){
        this.JournalList=true
        this.getdata(1)
      },
      getdata(startRow){
        let data={
          pageNum:startRow,
          pageSize:this.endRow
        }
        this.http.post(BASE_URL+'/vshop/vshopLog/queryList',data)
        .then(data=>{
        if(data.code=='success'){
          this.data1 = data.data.dataList
          this.total = data.data.total
        }
        }).catch(err=>{
        console.log(err)
        })
      },
      Journalok(){

      },
      richflowerchange(richflower){
        this.formValidate.richflower = richflower
      },
      handleSubmit (name) {
        this.$refs[name].validate(valid => {
          if (valid) {
           this.$Modal.confirm({
                title: '温馨提示',
                content: '<p>确认修改保存？</p>',
                onOk: () => {
                    if((this.formValidate.loan==this.formValidate.card)||(this.formValidate.loan==this.formValidate.selfrun)||(this.formValidate.card==this.formValidate.selfrun)){
                      this.$Message.error('排列顺序不能相同')
                      return false
                    }
                    this.savedatalist()
                },
                onCancel: () => {
                    // this.$Message.info('删除失败！');
                }
            });
          } 
        })
      },
      //提交保存
      savedatalist(){
        let configValuelist = [
          {"label":"贷款产品","value":"loan","order":this.formValidate.loan},
          {"label":"更多产品","value":"card","order":this.formValidate.card},
          {"label":"自营贷款","value":"self-run","order":this.formValidate.selfrun}
        ]
        let datalist = [
          {
            configCode: "1",
            configKey: "menus_order",
            configName: "菜单排序",
            configStatus: 1,
            configType: "2",
            configValue:JSON.stringify(configValuelist)
          },
          {
            configCode: "2",
            configKey: "open_distribution_level",
            configName: "开通分销层级",
            configStatus: 1,
            configType: "7",
            configValue: JSON.stringify(this.formValidate.distribution),
          },
          {
            configCode: "3",
            configKey: "umoney_show_switch",
            configName: "有钱花显示开关",
            configStatus: this.formValidate.richflower,
            configType: "6",
            configValue: this.formValidate.days==""?0:this.formValidate.days
          },
          {
            configCode: "4",
            configKey: "applay_record_interval_time",
            configName: "申请记录生成间隔",
            configStatus: 1,
            configType: "1",
            configValue: this.formValidate.recording
          },
          {
            configCode: "5",
            configKey: "applay_record_matching_indate",
            configName: "申请记录匹配有效期",
            configStatus: 1,
            configType: "1",
            configValue: this.formValidate.validity
          },
          {
            configCode: "6",
            configKey: "generalize_store_copy_writer",
            configName: "一键推广店铺文案",
            configStatus: 1,
            configType: "2",
            configValue: this.formValidate.tweets
          },
          {
            configCode: "7",
            configKey: "cash_give_condition",
            configName: "现金赠送触发条件",
            configStatus: this.formValidate.cashswitch,
            configType: "2",
            configValue: this.formValidate.switch
          },
          {
            configCode: "8",
            configKey: "cash_give_types",
            configName: "",
            configStatus: 1,
            configType: "2",
            configValue: JSON.stringify(this.formValidate.authentication)
          },
          {
            configCode: "9",
            configKey: "cash_give_value",
            configName: "",
            configStatus: 1,
            configType: "1",
            configValue: this.formValidate.giftamount
          },
          
        ]
        console.log(this.formValidate.authentication)
        this.http.post(BASE_URL+'/vshop/vshopConfig/updateVshopConfigBatch',datalist)
        .then(data=>{
          if(data.code=='success'){
            this.$Message.success('更新成功')
            this.getdatalist()
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getdatalist(){
        this.http.post(BASE_URL+'/vshop/vshopConfig/queryVshopConfigList',{})
        .then(data=>{
          if(data.code=='success'){
            this.distributionList = data.data.configBaseInfoList[0].data
            this.switchList = data.data.configBaseInfoList[1].data
            this.authenticationList = data.data.configBaseInfoList[2].data
            this.datalist = data.data.dataList
            let datalist = data.data.dataList
            for(var i=0;i<datalist.length;i++){
              if(datalist[i].configName=='菜单排序'){
                let configValuelist = JSON.parse(datalist[i].configValue)
                for(var j=0;j<configValuelist.length;j++){
                  if(configValuelist[j].value=='loan'){
                    this.formValidate.loan = String(configValuelist[j].order)
                  }
                  if(configValuelist[j].value=='card'){
                    this.formValidate.card = String(configValuelist[j].order)
                  }
                  if(configValuelist[j].value=='self-run'){
                    this.formValidate.selfrun = String(configValuelist[j].order)
                  }
                }
              };  
              if(datalist[i].configName=='开通分销层级'){
                this.formValidate.distribution = JSON.parse(datalist[i].configValue)
              };
              if(datalist[i].configName=='有钱花显示开关'){
                this.formValidate.richflower = String(datalist[i].configStatus)
                if(datalist[i].configStatus==1){
                  this.formValidate.days=datalist[i].configValue
                }
              };
              if(datalist[i].configName=='申请记录生成间隔'){
                this.formValidate.recording = datalist[i].configValue
              };
              if(datalist[i].configName=='申请记录匹配有效期'){
                this.formValidate.validity = datalist[i].configValue
              };
              if(datalist[i].configName=='一键推广店铺文案'){
                this.formValidate.tweets = datalist[i].configValue
              };
              if(datalist[i].configKey=='cash_give_condition'){
                this.formValidate.cashswitch= String(datalist[i].configStatus)
                this.formValidate.switch = datalist[i].configValue
              }
              if(datalist[i].configKey=='cash_give_types'){
                this.formValidate.authentication = JSON.parse(datalist[i].configValue)
              }
              if(datalist[i].configKey=='cash_give_value'){
                this.formValidate.giftamount = datalist[i].configValue
              }
            }
          }
        })
      }
    },
    mounted(){
      this.getdatalist()
    }
}
</script>
<style lang="less" scoped>
    .flexd{
      display: flex;
    }
</style>