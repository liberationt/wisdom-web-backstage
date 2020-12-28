<template>
    <div>
        <div class="navigation">
            <p>
            <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;用户身价设置-基础身价设置</span>
            </p>
        </div>
        <div class="contentcss">
            <Form label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem label="特类订单1类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="特类订单2类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="特类订单3类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="特类订单4类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="信用单1类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="信用单2类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="信用单3类：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                 <FormItem label="淘单订单：" prop="marketName"  :label-width="140">
                    <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入赞豆" style="width:240px;"><span slot="append">赞豆</span></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存提交审核</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">查看操作日志</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            auditing:false,
            formValidate:{
                marketName:''
            },
            ruleValidate:{
                marketName:[
                    { required: true, message: '请输入赞豆', trigger: 'blur' },
                    { type: 'string', pattern:/^(\d|[1-9]\d|999999)(\.\d{1,2})?$/, message: '请输入1-999999之间的数', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    },
}
</script>