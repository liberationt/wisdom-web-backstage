<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员基本设置</span>
			</p>
		</div>
		<div class="homePage contentcss">
            <h1 class="homePage_h1">会员等级设置</h1>
			<Form     :label-width="100">
          <FormItem label="会员等级梯度："  class="clearfix">
            <Row>
              <Col span="24">
              <div 
              class="mb15 clearfix"
              v-for="(item, index) in addnormals"
              :key="index"
              >
                <Input  type="text" v-model="item.level" class="left ml10 inputnum"  style="width:120px">
                  <span slot="prepend">等级</span>
                </Input>
                <Input :disabled="index==0" type="text" v-model="item.scoreBegin" class="left ml10 inputnum"  style="width:130px">
                  <span slot="prepend">V值</span>
                  <span slot="append" class="left">至</span>
                </Input>
                <Input  type="text" v-model="item.scoreEnd" class="left  "  style="width:80px">
                </Input>
                <img :src="item.iconUrl" alt="" class="left ml10 icon_img">
                <a href="javascript:;"  class="file left">预览
                  <input type="file" @change="fileimg(index)"  accept="image/gif, image/jpeg, image/png, image/jpg" name="img" class="inputfil">
                </a>
                <Button  type="primary" class="left ml10" style="margin-top:3px" v-if="index==0" @click="addnormal" >+</Button>
                <Button  type="primary" class="left ml10" style="margin-top:3px" v-if="index!=0" @click="addnorma2(index)">-</Button>               
              </div>                
              </Col>
            </Row>
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
                index2: 1,
				addnormals: [
                    {
                        level:'',
                        scoreBegin: '0',
                        scoreEnd : '',
                        iconUrl:require('../../image/moren.png')
                    }
                ],
			};
		},
		methods: {
			addnormal () {//加
                this.index2++
                this.addnormals.push({
                    level:'',
                    scoreBegin: '',
                    scoreEnd : '',
                    iconUrl:require('../../image/moren.png')
                })
            },
            addnorma2 (index) {//减
                this.addnormals.splice(index, 1)
            },
            // 上传图片
            fileimg (index) {
                if (document.querySelectorAll('.inputfil')[index].files[0].type == '') {
                    this.addnormals[index].iconUrl = require('../../image/moren.png')
                    this.$Modal.warning({
                    title: '温馨提示',
                    content: '请上传正确格式的图片'
                    });
                    return false
                }
                let formData = new FormData();

                formData.append('file', document.querySelectorAll('.inputfil')[index].files[0])
                let config = {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                    timeout:1000*60*5
                }
                this.http.post(BASE_URL + '/fileUpload', formData, config)
                .then((resp) => {
                if (resp.code == 'success') {
                    this.addnormals[index].iconUrl = resp.data

                } else {
                }
                })
                .catch(() => {
                })
            },
			// 保存
			preservation () {
                let rag = /^(0|\+?[1-9][0-9]{0,5})$/
                for (let i = 0; i < this.addnormals.length; i++) {
                    if (String(this.addnormals[i].level)==''||String(this.addnormals[i].scoreBegin)==''||String(this.addnormals[i].scoreEnd)=='') {
                        this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入等级设置'
                        });
                        return false
                    }
                    if (!rag.test(this.addnormals[i].level)||!rag.test(this.addnormals[i].scoreBegin)||!rag.test(this.addnormals[i].scoreEnd)) {
                        this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入正确的等级设置'
                        });
                        return false
                    }
                    if (this.addnormals[i].iconUrl.indexOf('data:')!=-1) {
                        this.$Modal.warning({
                        title: '温馨提示',
                        content: '请上传会员等级图片'
                        });
                        return false
                    }
                }
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>确认保存？</p>',
                    onOk: () => {
                        let data=this.addnormals
                        this.http.post(BASE_URL+"/loan/vipLevel/update",data).then(data=>{
                        if(data.code == 'success'){
                            this.$Message.info('保存成功！');
                            // this.$router.push('/cardManagement')
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
            // 查询
            inquiry () {
                this.http.post(BASE_URL+"/loan/vipLevel/query",{}).then(data=>{
                if(data.code == 'success'){
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].iconUrl == 'string') {
                            data.data[i].iconUrl = require('../../image/moren.png')
                        }
                    }
                    this.addnormals = data.data
                } else {
                    this.$Message.info(data.message);
                }
                }).catch(err=>{
                    console.log(err)
                })
            }
		},
		created(){
            this.inquiry ()
			
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