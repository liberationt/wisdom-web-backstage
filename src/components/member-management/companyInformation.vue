<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;公司信息管理</span>
      </p>
    </div>
    <div class="contentcss">
      <ul class="memberUl">
        <li class="clearfix"> 
          <span class="left memberTitle lh32 displayib">上传公司信息: </span> 
          <span>
            <Input class="left companyname" v-model="value" disabled placeholder="请上传公司信息" style="width: 200px" />
            <Upload
              action=""
              class="upstyle "
              :before-upload="handleUpload"
              :show-upload-list="false"
              :format="['xlsx', 'xls']"
              :on-format-error="handleFormatError1">
              <Button class="uploadButton ml10" style="margin-top:0px" icon="ios-cloud-upload-outline">浏览</Button>
            </Upload>
          </span>

        </li>
      </ul>
      <div>
        <Button  style="margin-left:130px" @click="cancel">取消</Button>
        <Button type="primary" :loading="loading3" class="ml20" @click="upload">上传</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      value:'',
      file:{},
      loading3: false,
    }
  },
  methods: {
    // 上传
    handleUpload(file) {
      //  if(file.size > 22949339){
      //   this.value9 = ""
      //   this.$Message.info("请选择20兆以内的文件")
      //   return false
      // }
      console.log(file)
      let splic = file.name.split('.')
			if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
        this.value = file.name
        this.file = file
          return false
        }
    },
    upload () {
      if (this.value == '') {
        this.$Modal.warning({
              title: '温馨提示',
              content: '请上传公司信息'
          })
          return false
        
      }
      this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认要上传吗?</p>",
          onOk: () => {
            this.loading3 = true;
      let formData = new FormData()
      formData.append('file', this.file)
      let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout:1000*60*5
      }
      this.http.post(BASE_URL + '/loan/businessCompany/uploadFile', formData, config)
				.then((resp) => {
				if (resp.code == 'success') {
          const title = '提示'
          let content = '<p>导入成功</p>'
          this.$Modal.success({
              title: title,
              content: content
          })
          this.value = ''
          this.loading3 = false;
				} else {
          this.$Message.error(resp.message);
          this.loading3 = false;
				}
				})
				.catch(err => {
          this.loading3 = false;
        })

          }
      })
      


    },
    // 上传格式校验
    handleFormatError1(file) {
      this.namelist = ''
      this.$Message.info("文件格式不正确,请上传excel格式文件")
    },
    // 取消
    cancel () {
      this.value = ''
    }
  }
};
</script>
<style lang="less" scoped>
// .ml80 {
//   margin-left: 70px;
// }
.memberUl {
  li {
    margin-bottom: 25px;
    span {
      img {
        width: 45px;
        height: 45px;
        margin-top: -10px;
      }
      .uploadButton {
        margin-top: -3px;
      }
    }
    .ml80 {
      margin-left: 70px;
    }
    .memberTitle{
      display: inline-block;
      margin-right: 10px;
    }
    .member_input {
      margin-left: 200px;
    }
  }
}
</style>
