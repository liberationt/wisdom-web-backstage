<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;淘单虚拟数据操作</span>
      </p>
    </div>
    <div class="contentcss">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" >
            <FormItem label="淘单虚拟数据:" prop="channelnum" >
                <Input v-model="formCustom.channelnum" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入淘单虚拟数据" />
            </FormItem>
            <FormItem  class="tc mt50">
                <Button type="primary" class="mr20" @click="handleSubmit('formCustom')">保存</Button>
                <!-- <Button type="primary" @click="preservation">保存设置</Button> -->
            </FormItem> 
          </Form>
    </div>
</div>
    
</template>
<script>
export default {
    data () {
        return {
            loading:true,
            formCustom: {
                channelnum: '',
            },
            ruleCustom: {
                channelnum: { required: true, message: '请输入淘单虚拟数据', trigger: 'blur' }
            }
        }
    },
    methods: {
        // 保存
        handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (!valid) {
                return this.changeLoading()
            } else {
                let list = {
                    data:this.formCustom.channelnum
                }
                this.http.post(BASE_URL + '/loan/chancer/saveChanceModel', list)
                .then((resp) => {
                    if (resp.code == 'success') {
                        this.$Modal.success({
                        title: '提示',
                        content: '<p>保存成功</p>',
                        onOk: () => {
                          this.inquire ()
                        }
                    })
                    
                    } else {

                    }
                })
                .catch(() => {
                })
            }
        })
        },
        changeLoading () {
            this.loading = false
            this.$nextTick(() => {
                this.loading = true
            })
        },
        inquire () {
            this.http.post(BASE_URL + '/loan/chancer/getChanceModel', {})
            .then((resp) => {
                if (resp.code == 'success') {
                    this.formCustom.channelnum = resp.data
                } else {

                }
            })
            .catch(() => {
            })

        }
        
    },
    mounted () {
        this.inquire ()
        
        
    }

    
}
</script>
<style lang="less" scoped>

</style>


