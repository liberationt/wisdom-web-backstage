<template>
    <div>
        <div class="navigation">
            <p>
                <span>保险明细报表</span>
            </p>
        </div>
        <div class="mt50">
            <span>甲方名称:</span>
            <Select v-model="model1" placeholder="全部" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="w100 tr displayib">批次号:</span>
            <Input v-model="model2" class="mr20" placeholder="请输入批次号" style="width: 200px"></Input>
            <span class=" tr displayib">推送状态:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option  v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class=" tr displayib">推送时间:</span>
            <DatePicker type="date" @on-change='time1' placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" @on-change='time2' placeholder="结束时间" style="width: 200px"></DatePicker>
            <!-- <div class="mt15">
            <span class=" tr displayib">推送时间:</span>
                <DatePicker type="date"  placeholder="开始时间" style="width: 200px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" placeholder="结束时间" style="width: 200px"></DatePicker>
            </div > -->
            <div class="clearfix mr100 mt20">
                <Button class="right w100" type="primary" @click="exports">导出</Button>
                <Button class="right mr20 w100" type="info" @click="registered">查询</Button>
            </div>
        </div>
        <div class="mt20">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
       <div class="tr mt15">
            <Page :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-sizer show-total></Page>
        </div>
    </div>
</template>
<script>
// import  {utils} from '@/utils'
import utils from '../../utils/utils'
export default {
  data () {
    return {
      model1: '平安普惠',
      cityList: [
        {
          value: '平安普惠',
          label: '平安普惠'
        }
      ],
      model2: '',
      model3: '',
      cityList3: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '1',
          label: '成功'
        },
        {
          value: '2',
          label: '失败'
        }
      ],
      columns1: [
        // {
        //   title: '渠道',
        //   align: 'center',
        //   width: 200,
        //   key: 'channelName'
        // },
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          width: 200,
          key: 'mobile'
				},
				{
          title: '生日',
          align: 'center',
          width: 100,
          key: 'birthday'
        },
        {
          title: '性别',
          align: 'center',
          width: 100,
          key: 'sex'
        },
        {
          title: '渠道名称',
          align: 'center',
          width: 100,
          key: 'channelName'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'city'
        },
        {
          title: '创建时间',
          align: 'center',
          width: 100,
          key: 'dataCreateTime'
        },
        {
          title: '选择赠险产品',
          align: 'center',
          width: 100,
          key: 'insurance'
        },
        {
          title: '来源',
          align: 'center',
          width: 150,
          key: 'origin'
        },
        {
          title: '保单号',
          align: 'center',
          width: 200,
          key: 'policyNo'
        },
        {
          title: '省',
          align: 'center',
          width: 200,
          key: 'province'
				},
        {
          title: '批次号',
          align: 'center',
          width: 200,
          key: 'pushBatchNum'
        }
      ],
      data1: [
      ],
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
    }
  },
  methods: {
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    // 分页
    pageChange (page) {
      this.startRow = page
      this.registered()
    },
    pagesizechange (page) {
      this.endRow = page
      this.registered()
    },
    post(url,list,pushname,num) {
       this.http.post(BASE_URL + url,list).then(data=>{
          console.log(data)
          if(data.code == 'success'){
            if(pushname == 'luohui'){
              this.data1 = data.data.zxLhpinganList
            } else if(pushname == 'kunxuan'){
              this.data1 = data.data.zxKxpinganList
            } else if(num == 1){
							this.total = parseInt(data.data.total)
							this.startRow = Math.ceil(data.data.startRow/this.endRow)
						}
						this.total = parseInt(data.data.total) 

          }
       }).catch(err=>{
         console.log(err)
       })
    },
      // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    registered() {
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      };
      let params = {
        pushBatchNum :this.model2,
        pushStatus : this.model3,
        beginTime : this.value1,
        endTime : this.value2,
        pageNum: this.startRow == 0 ? 1 : this.startRow,
        pageSize: this.endRow,
			}
      let pushname = this.$route.query.pushname
      if(pushname == 'luohui'){
					this.post('/loan/zxLhpingan/getZxLhpinganList',params,pushname,1)
        } else if(pushname == 'kunxuan'){
        	this.post('/loan/zxKxpingan/getZxKxpinganList',params,pushname,1)
        }
    },
    getHttpObj() {
        var httpobj = null;
        try {
            httpobj = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpobj = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e1) {
                httpobj = new XMLHttpRequest();
            }
        }
        return httpobj;
    },
    // 导出
    exports () {
      var xhr = new XMLHttpRequest();
	    if (xhr.withCredentials === undefined){ 
	    	return false
	    };
	    xhr.open("get", BASE_URL+'/loan/zxLhpingan/exportExcel');
	    xhr.setRequestHeader("Authentication", utils.getlocal('token'));
	    xhr.responseType = "blob";
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState !== 4) return;//忽略未完成的调用
	        if (this.status === 200) {
	        	var blob = this.response;
	        	var contentType = this.getResponseHeader('content-type');
	        	var fileName = contentType.split(";")[1].split("=")[1];
	        	fileName = decodeURI(fileName);
	        	let aTag = document.createElement('a');
            // 下载的文件名
            aTag.download = fileName;
            aTag.href = URL.createObjectURL(blob);
            aTag.click();　　
            URL.revokeObjectURL(blob);
	        }
	    }
	    xhr.send(null);




   
      let pushname = 'kunxuan'
      //  this.$route.query.pushname
			if(pushname == 'luohui'){

        // window.open(BASE_URL + '/loan/zxLhpingan/exportExcel?pushBatchNum='+this.model2+'&&pushStatus='+this.model3+'&&beginTime='+this.value1+'&&endTime='+this.value2)
			} else if(pushname == 'kunxuan'){
          // 封装form 表单
          var params = {// 参数
            pushBatchNum:this.model2,
            pushStatus:this.model3,
            beginTime:this.value1,
            endTime:this.value2
          };
          // var form = document.createElement('form');
          // form.id = 'form'
          // form.name = 'form'
          // document.body.appendChild(form);
          // for(var obj in params) {
          // if(params.hasOwnProperty(obj)) {
          // var input = document.createElement('input');
          // input.tpye='hidden';
          // input.name = obj;
          // input.value = params[obj];
          // form.appendChild(input)
          // }
          // }
          // form.method = "GET";//请求方式
          
          
          
          // this.axios({
          //   method: 'get',
          //   url:BASE_URL+'/loan/zxLhpingan/exportExcel',
          //   data:params,
          //   responseType:'blob'
          // })
          // form.action = BASE_URL+'/loan/zxKxpingan/exportExcel';
          // form.submit();
          // document.body.removeChild(form);

        // window.open(BASE_URL + '/loan/zxKxpingan/exportExcel?pushBatchNum='+this.model2+'&&pushStatus='+this.model3+'&&beginTime='+this.value1+'&&endTime='+this.value2)
			}
    },
    
  },
  created() {
    let pushname = this.$route.query.pushname
    let list = {
      pushBatchNum: this.$route.query.id,
    }
		if(pushname == 'luohui'){
			this.post('/loan/zxLhpingan/getZxLhpinganList',list,pushname)
			} else if(pushname == 'kunxuan'){
			this.post('/loan/zxKxpingan/getZxKxpinganList',list,pushname)
		}
  }
}
</script>
<style lang="less" scoped>

</style>
