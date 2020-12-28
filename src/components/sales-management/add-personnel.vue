<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;人员管理&nbsp;</span>
            </p>
        </div>
        <div class='title'>
            添加部门人员
        </div>
        <div class="clearfix contentcss sales-statis">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名:" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入用户名" style="width:240px"></Input>
                </FormItem>
                <FormItem label="真实姓名:" prop="realname">
                    <Input v-model="formValidate.name" placeholder="请输入真实姓名" style="width:240px"></Input>
                </FormItem>
                <FormItem label="角色:" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="坐席编号:" prop="channelCode">
                    <Input v-model="formValidate.channelCode" placeholder="请输入坐席编号" style="width:240px"></Input>
                </FormItem>
                <FormItem label="手机:" prop="phoneNumber">
                    <Input v-model="formValidate.phoneNumber" placeholder="请输入手机号" style="width:240px"></Input>
                </FormItem>
                <FormItem label="账户状态" prop="status">
                    <Select v-model="formValidate.status" placeholder="请选择用户状态" style='width:240px;'>
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style='width:100px'>保存</Button>
                    <Button @click="handleReset()" style="margin-left: 8px;width:100px">返回</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                formValidate: {
                    name:"",
                    realname:'',
                    interest:[],
                    channelCode:'',
                    phoneNumber:'',
                    status:''   
                },
                ruleValidate:{
                    name:[
                        {required: true, message: '请输入用户名', trigger: 'change'},
                        {required: true, message: '用户名称最多20字',max:20,trigger: 'change'}
                    ],
                    realname:[
                        {required: true, message: '请输入真实姓名', trigger: 'change'},
                        {type:'string', message: '用户名称最多4字',pattern:/^[\u4e00-\u9fa5]{2,4}$/,trigger: 'change'}
                    ],
                    interest:[
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],
                    channelCode:[
                        {required: true, message: '请输入坐席编号', trigger: 'change'},
                    ],
                    phoneNumber:[
                        {required: true, message: '请输入手机号', trigger: 'change'},
                    ],
                    status:[
                        {required: true, message: '请选择账户状态', trigger: 'change'},
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
            handleReset(){
                this.$router.push('/departmentManagement')
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