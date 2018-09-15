<template>
<div>
<div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;渠道报表配置</span>
      </p>
    </div>
    <div class=" conditioncss">
        <Table :columns="columns1" :data="data1" border highlight-row></Table>
        <div class="tc mt50">
            <Button type="primary" @click="savesettings">保存设置</Button>
        </div>
    </div>
</div>   
</template>
<script>
export default {
    data () {
        return {
            columns1: [
                {
                    title: '业务',
                    align: 'center',
                    minWidth: 150,
                    key: 'businessName'
                },
                {
                    title: '范围值配置(%)',
                    align: 'center',
                    minWidth: 500,
                    render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                // width: '100%',
                                padding:'0 5px',
                                height:'32px',
                                lineHeight: '32px',
                                background:'#ccc',
                                color:'#fff',
                                verticalAlign: 'middle'
                            }
                        }, '当日激活转化率小于'),
                        h('InputNumber', {
                            props: {
                                min:0,
                                max:100,
                                value:Number(params.row.activeFact),
                            },
                            on:{                             
                                input:val=>{
                                    if (val == null) {
                                        val = 0
                                    }
                                    this.data1.forEach(element => {
                                        if (element.businessCode == params.row.businessCode) {
                                            element.activeFact=String(val);
                                        }
                                    })                                    
                                }
                            }
                        }),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                // width: '100%',
                                padding:'0 5px',
                                height:'32px',
                                lineHeight: '32px',
                                background:'#ccc',
                                color:'#fff',
                                verticalAlign: 'middle'
                            }
                        }, '或'),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                // width: '100%',
                                padding:'0 8px',
                                height:'32px',
                                lineHeight: '32px',
                                background:'#ccc',
                                color:'#fff',
                                verticalAlign: 'middle'
                            }
                        }, '当日申请转化率小于'),
                        h('InputNumber', {
                            props: {
                                min:0,
                                max:100,
                                value:Number(params.row.applyFact),
                            },
                            on:{
                                input:val=>{
                                    if (val == null) {
                                        val = 0
                                    }
                                    this.data1.forEach(element => {
                                        if (element.businessCode == params.row.businessCode) {
                                            element.applyFact=String(val);
                                        }
                                    })
                                }
                            }
                        })
                    ])
                }

                }
            ],
            data1: []
        }
    },
    mounted () {
       this.http.post(BASE_URL + '/promotion/businessConfig/queryListBatch', {})
      .then((resp) => {
        if (resp.code == 'success') {
          this.data1 = resp.data
        } else {      
        }
      })
      .catch(() => {     
      }) 
    },
    methods: {
        savesettings () {
            let list = []
            this.data1.forEach(element => {
                let obj1 = new Object ()
                obj1.businessConfigCode = element.activeFactCode
                obj1.configValue = element.activeFact
                let obj2 = new Object ()
                obj2.businessConfigCode = element.applyFactCode
                obj2.configValue = element.applyFact
                list.push(obj1,obj2)
            });
            this.http.post(BASE_URL + '/promotion/businessConfig/updateBatchByCodeList', list)
            .then((resp) => {
                if (resp.code == 'success') {
                const title = '配置预警值'
                let content = '<p>保存成功</p>'
                this.$Modal.success({
                    title: title,
                    content: content,
                    onOk: () => {
                        this.$router.push({ path: '/dailyList' })                        
                    }
                })
                } else {      
                }
            })
            .catch(() => {     
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>

