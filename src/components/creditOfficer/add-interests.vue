<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;信贷设置>&nbsp;{{title}}</span>
          </p>
        </div>
        <div class='title'>
            {{title}}
        </div>
        <div class="clearfix contentcss sales-statis">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="权益名称:" prop="interestsname">
                    <Input v-model="formValidate.interestsname" placeholder="请输入权益名称" style="width:240px"></Input>
                </FormItem>
                <FormItem label="副标题:" prop="subheading">
                    <Input v-model="formValidate.subheading" placeholder="请输入副标题" style="width:240px"></Input>
                </FormItem>
                
                <FormItem label="权益类型" prop="intereststype">
                    <Select v-model="formValidate.intereststype" placeholder="请选择权益类型" style='width:240px;'>
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="功能列表" prop="functionlist">
                    <Select v-model="formValidate.functionlist" placeholder="请选择功能列表" style='width:240px;'>
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="权益时间" prop="appointment"> 
                    <DatePicker type="datetime" placeholder="请选择开始时间" :options="options4" :value="beginTime"></DatePicker>
                    <span>-</span>
                    <DatePicker type="datetime" placeholder="请选择结束时间" :options="options4" :value="endTime"></DatePicker>
                </FormItem>
                <FormItem label="权益图标:" prop="equityicon">
                    <Input v-model="formValidate.equityicon" placeholder="请上传权益图标" style="width:240px"></Input>
                    <Button type="primary" style='width:60px'>上传</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style='width:100px'>保存</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px;width:100px">返回</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                title:'添加权益',
                endTime:'',
                beginTime:'',
                options4:{
                    disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                formValidate: {
                    interestsname:"",
                    subheading:'',
                    intereststype:[],
                    functionlist:'',
                    appointment:'',
                    equityicon:''   
                },
                ruleValidate:{
                    interestsname:[
                        {required: true, message: '请输入权益名称', trigger: 'change'},
                        {required: true, message: '用户名称最多5个字',max:5,trigger: 'change'}
                    ],
                    subheading:[
                        {required: true, message: '请输入副标题', trigger: 'change'},
                        {type:'string', message: '用户名称最多12个字',max:12,trigger: 'change'}
                    ],
                    intereststype:[
                        {required: true, message: '请选择权益类型', trigger: 'change'}
                    ],
                    functionlist:[
                        {required: true, message: '请选择功能列表', trigger: 'change'},
                    ],
                    phoneNumber:[
                        {required: true, message: '请输入手机号', trigger: 'change'},
                    ],
                    equityicon:[
                        {required: true, message: '请上传权益图标', trigger: 'change'},
                    ]
                }
            }
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       
                    } else {
                        
                    }
                })
            },
            handleReset(name){
                this.$refs[name].resetFields()
                this.$router.push('/membershipInterests')
                
            }
        },
        mounted(){
            console.log(this.$route.query.add)
        }
    }
</script>
<style lang="less" scoped>
    .title{
        height:60px;line-height:60px;background:#fff;
        font-size: 20px;text-indent: 20px;
    }
</style>