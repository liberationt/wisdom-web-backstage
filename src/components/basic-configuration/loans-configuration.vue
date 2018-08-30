<template>
      <div>
        <div class="navigation">
            <p>
            <span>管理首页&nbsp;>&nbsp;应用>&nbsp;华赞金服>&nbsp;基础配置>&nbsp;贷款产品配置</span>
          </p>
        </div>
        <div class="conditioncss">       
      <ul class="querysty">
        <li>
          <span>产品名称:</span>
          <Input v-model="value4" placeholder="请输入产品名称" style="width: 150px"></Input>
        </li>
        <li class="ml20">
          <span>状态:</span>
          <Select v-model="model2" size="large" style="width:150px">
            <Option v-for="item in cityList1"  :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="ml20">
          <span>产品分类:</span>
          <Select v-model="model3" size="large" style="width:150px">
            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="ml20">
          <span>排序:</span>
          <Select v-model="model4" size="large" style="width:150px">
            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="ml50">
          <Button type="info" class=" mr20 w90" :loading="loading3" @click="loanlist">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
        </li>
      </ul>
      
      </div>     
      <div class="loans_stages mt10 clearfix contentcss">
        <Button @click="addproducts" type="ghost" shape="circle"><Icon type="plus"></Icon>添加贷款产品</Button>
      <Button type="info" class="  w90 ml20 toupdate" @click="bankupdate">更新排序</Button>
        <ul class="homePage_icon">
          <li v-for="item in dataList">
            <div class="loans_top clearfix">
              <p class="left  ml5" style="color:#999;margin-top:5px">
                  <span>ID:</span>
                  <span>{{item.productCode}}</span>
                </p>
              <p class="loans_img left"><img :src="item.productLogo" alt=""></p>
                <p class="left loans_stage">
                  <span class="loas_happy">{{item.productName}}</span>
                  <br>
                  <span class="loans_lightning">{{item.productSubhead}}</span>
                </p>
                <p class="right loans_id">
                  <img :src="item.displayLabel" alt="" >
                  <!-- <span>ID:231</span> -->
                </p>
              </div>
              <div class="loans_bottom">
                <p class="clearfix haomePage_edit">
                  <InputNumber class="banknumint" :min="0" v-model="item.productOrder"></InputNumber>
                  <span @click="edit_icon_colorB(item.productCode, 1)" v-if="item.state==0" class="edit_icon edit_icon_blue left"><Icon type="arrow-up-a"></Icon></Icon></span>
                  <span @click="edit_icon_colorR(item.productCode, 0)" v-if="item.state==1" class="edit_icon edit_icon_red left"><Icon type="arrow-down-a"></Icon></Icon></Icon></span>
                  <span class="edit_icon right ml5" @click="cardshow(item.productCode)"><Icon type="edit"></Icon></span>
                  <span class="edit_icon right" v-if="item.state==1">
                  <Poptip
                  confirm
                  transfer
                  title="确认删除吗?"
                  @on-ok="deleteOk(item.productCode)">
                    <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
                </span>
              </p>
            </div>
          </li>
        </ul>
        <div class="mt15 w100b tr right" style="">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      value4: '',
      loading3: false,
      total: 0,
      startRow: 1,
      endRow: 10,
      cityList1: [],
      cityList2: [],
      cityList3: [],
      dataList: [],
      model2: '',
      model3: '',
      model4: '',
      edit_icon_blue: true,
      edit_icon_red: false
    }
  },
  methods: {
    pageChange (page) {
      this.startRow = page
      this.loanlist ()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.loanlist ()
    },
    edit_icon_colorB (code, num) {
      this.$Modal.confirm({
          title: '下架',
          content: '<p>确认要下架吗?</p>',
          onOk: () => {
            this.creditshelf (code, num)
          },
          onCancel: () => {              
          }
        })
    },
    edit_icon_colorR (code, num) {
      this.$Modal.confirm({
        title: '上架',
        content: '<p>确认要上架吗?</p>',
        onOk: () => {
          this.creditshelf (code, num)
        },
        onCancel: () => {            
        }
      })
    },
    // 贷款产品上架
    creditshelf (code, num) {
      let list = {
        productCode: code,
        state: num
      }
      this.http.post(BASE_URL + '/loan/product/modifyProductStateByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          if (num == 0) {
            this.$Modal.success({
              title: '上架',
              content: '<p>上架成功</p>'         
            })
            this.loanlist ()
          } else {
              const title = '下架'
              let content = '<p>下架成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.loanlist ()
          }
        } else {
           this.$Message.error(resp.message);
        }
      })
      .catch(() => {
      })
    },
    addproducts () {
      this.$router.push({ path: './addloanproducts' })
    },
    // 查询
    loanlist () {
      let list = {
        productName : this.value4,
        stateOptions: this.model2,
        productOptions:this.model3,
        orderOptions: this.model4,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/product/getProductList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.dataList= resp.data.dataList
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        } else {         
          this.$Message.info(resp.message)
        }
      })
      .catch(() => {
      })

    },
    // 贷款产品删除
    deleteOk (code) {
      let list = {
        productCode: code
      }
      this.http.post(BASE_URL + '/loan/product/deleteProductByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.loanlist ()
        } else {
        }
      })
      .catch(() => {
      })
    },
    cardshow (code) {
      this.$router.push({ path: './addloanproducts?code='+code })
    },
    bankupdate () {
      this.$Modal.confirm({
          title: '更新排序',
          content: '<p>确认要更新排序吗?</p>',
          onOk: () => {
            this.updatelist ()
          },
          onCancel: () => {           
          }
        })     
    },
    updatelist () {
      let list = []
      for (let i = 0; i < this.dataList.length; i++) {
        let obj = new Object ()
        obj.productCode = this.dataList[i].productCode
        obj.productOrder = this.dataList[i].productOrder
        list.push (obj)
      }
      this.http.post(BASE_URL + '/loan/product/batchModifyBanner', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.loanlist ()
        } else {
        }
      })
      .catch(() => {
      })
    }
  },
  mounted () {   
    this.http.post(BASE_URL + '/loan/product/getProductListSearch', {})
      .then((resp) => {
        if (resp.code == 'success') {
          this.cityList1 = resp.data.productState
          this.cityList2 = resp.data.productType
          this.cityList3 = resp.data.productOrder 
        } else {         
          this.$Message.info(resp.message)
        }
      })
      .catch(() => {
      })
      this.loanlist ()
  }

}
</script>
<style lang="postcss" scoped>
.loans_stages ul li {
  width: 300px;
  height: 180px;
  border: 1px solid #ccc;
  float: left;
  margin-right: 20px;
  margin-bottom: 15px;
  background: #f6fafd;
}
.edit_icon_blue {
  background-color: #1bbc9b;
  color: #fff;
}
.edit_icon_red {
  background-color: #e26a6a;
  color: #fff;
}
.edit_icon_blue:hover {
  background-color: #158f76;
}
.haomePage_edit {
  margin-top: 10px;
  text-align: center;
  padding: 0 15px;
}
.homePage_button[data-v-38176e38] {
  height: 35px;
  line-height: 35px;
  width: 100px;
  margin-top: 20px;
}
.loans_img>img {
  width: 80px;
  height: 80px;
  margin-top: 15px;
  margin-left: 8px;
}
.loans_stage {
  color: #666;
  margin-top: 25px;
  margin-left: 25px;
}
.loas_happy {
  font-size: 20px;
}
.loans_lightning {
  font-size: 12px;
}
.loans_id{
  margin-top: 10px;
  margin-right: 8px;
}
.loans_id img{
    width: 30px;
    vertical-align:text-top
  }
  .loans_id span{
    font-size: 12px;
    
  }  

.homePage_icon {
  margin-left: 0px;
  margin-right: 50px;
  overflow: hidden;
  
}
</style>
