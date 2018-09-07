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
            <Button type="primary">保存设置</Button>
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
                    key: 'name'
                },
                {
                    title: '',
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
                                verticalAlign: 'middle'
                            }
                        }, '当日激活转化率小于'),
                        h('InputNumber', {
                            props: {
                                min:0,
                                value:params.row.numlots,
                            },
                            on:{
                                input:val=>{
                                    params.row.numlots=val;
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
                                verticalAlign: 'middle'
                            }
                        }, '当日申请转化率小于'),
                        h('InputNumber', {
                            props: {
                                min:0,
                                value:params.row.numlots,
                            },
                            on:{
                                input:val=>{
                                    params.row.numlots=val;
                                }
                            }
                        })
                    ])
                }

                }
            ],
            data1: [
                {
                    name: '华赞'
                }
            ]
        }
    } 
}
</script>
<style lang="less" scoped>

</style>

