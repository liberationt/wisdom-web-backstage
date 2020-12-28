<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员V值变动设置</span>
			</p>
		</div>
		<div class="homePage contentcss">
            <h1 class="homePage_h1">积分变动管理</h1>
			<Form     :label-width="100">
          <FormItem  label="会员V值梯度:"  class="clearfix mt15 indentval">
                <div  class="left mr10 mb5 w100b clearfix" v-for="res in businessSocialResList">
                    <Input disabled :number="true" class="left"  type="text" v-model="res.level"  style="width:150px">
                    <span slot="prepend">等级</span>
                    </Input>
                    <Input  :number="true" class="left ml10"  type="text" v-model="res.reduceValue"  style="width:150px">
                    <span slot="prepend">扣减</span>
                    <span slot="append" class="left">V值</span>
                    </Input>
                </div>
            </FormItem>
          <div class="homePage_center tc">
            <Button type="primary" @click="preservation">保存</Button>
            <!-- <router-link to="./administration"> <Button style="margin-left: 8px">返回</Button> </router-link> -->
            
          </div>
        </Form>
		</div>
	</div>
</template>
<script>
    import utils from "../../utils/utils";
	export default {
		data() {
			return {
                businessSocialResList:[],
                gradeList:[]//等级
			};
		},
		methods: {
			// 保存
			preservation () {
                let rag = /^(0|\+?[1-9][0-9]{0,8})$/
                for (let i = 0; i < this.businessSocialResList.length; i++) {
                    if (String(this.businessSocialResList[i].reduceValue) == '') {
                        this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入扣减V值'
                        });
                        return false
                    }
                    if (!rag.test(this.businessSocialResList[i].reduceValue)) {
                        this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入正确的扣减V值'
                        });
                        return false
                    }
                }
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>确认保存？</p>',
                    onOk: () => {
                        let data=this.businessSocialResList
                        this.http.post(BASE_URL+"/loan/vipValue/update",data).then(data=>{
                        if(data.code == 'success'){
                            this.$Message.info('保存成功！');
                        } else {
                            this.$Message.info(data.message);
                        }
                        }).catch(err=>{
                        console.log(err)
                        })
                    },
                    onCancel: () => {
                    }
                })
            },
            // 等级
             socialEstate () {
                this.http.post(BASE_URL+"/loan/vipLevel/query",{}).then(data=>{
                if(data.code == 'success'){
                    this.gradeList = data.data
                    this.inquiry ()
                    
                } else {
                    this.$Message.info(data.message);
                }
                }).catch(err=>{
                    console.log(err)
                })

             },
            // 查询
            inquiry () {
                this.http.post(BASE_URL+"/loan/vipValue/query",{}).then(data=>{
                if(data.code == 'success'){
                    let list = []
                    for (let i = 0; i < data.data.length; i++) {
                        list.push(String(data.data[i].level))
                    }
                    for (let j = 0; j < this.gradeList.length; j++) {
                        if (list.indexOf(String(this.gradeList[j].level))==-1) {
                            let obj = new Object ()
                            obj.level = this.gradeList[j].level
                            obj.reduceValue = ''
                            data.data.push(obj)
                        }
                    }
                    this.businessSocialResList = data.data
                } else {
                    this.$Message.info(data.message);
                }
                }).catch(err=>{
                    console.log(err)
                })
            }
		},
		created(){
            this.socialEstate ()
			
		}
	};
</script>
<style scoped>
	.quill-editor {
		height: 200px;
	}
    .homePage_h1 {
        border-bottom: 1px solid #ccc;
        padding: 10px 0 5px 0;
        margin-bottom: 40px;
    }
    .icon_img {
        width: 40px;
        height: 40px;
    }
    .file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 10px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        margin-top: 5px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
	
</style>