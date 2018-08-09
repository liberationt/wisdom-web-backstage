<template>
      <div>
        <h1 class="h1">页面配置</h1>
        <div class="navigation">
            <p>
            <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;贷款产品配置</span>
          </p>
        </div>
      <ul class="querysty">
        <li>
          <span>产品名称:</span>
          <Input v-model="value4" placeholder="请输入产品名称" style="width: 200px"></Input>
        </li>
        <li class="ml20">
          <span>状态:</span>
          <Select v-model="model2" size="large" style="width:100px">
            <Option v-for="item in cityList"  :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="ml20">
          <span>产品分类:</span>
          <Select v-model="model3" size="large" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="ml20">
          <span>排序:</span>
          <Select v-model="model4" size="large" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="ml50">
          <Button type="info" class=" mr20 w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
        </li>
      </ul>   
      <Button type="ghost" shape="circle"><Icon type="plus"></Icon>添加贷款产品</Button>     
      <div class="loans_stages">
        <ul>
          <li>
            <div class="loans_top clearfix">
              <p class="loans_img left"><img src="../../image/dkcslogo.jpg" alt=""></p>
                <p class="left loans_stage">
                  <span class="loas_happy">开心分期</span>
                  <br>
                  <span class="loans_lightning">30000元闪电到账</span>
                </p>
                <p class="right loans_id">ID:231</p>
              </div>
              <div class="loans_bottom">
                <p class="clearfix haomePage_edit">
                  <span @click="edit_icon_colorB" v-if="edit_icon_blue" class="edit_icon edit_icon_blue left"><Icon type="arrow-up-a"></Icon></Icon></span>
                  <span @click="edit_icon_colorR" v-if="edit_icon_red" class="edit_icon edit_icon_red left"><Icon type="arrow-down-a"></Icon></Icon></Icon></span>
                  <span class="edit_icon right" @click="modal1 = true"><Icon type="edit"></Icon></span>
                  <span class="edit_icon right" v-if="edit_delete">
                  <Poptip
                  confirm
                  transfer
                  title="确认删除吗?"
                  @delete-ok="deleteOk"
                  @delete-cancel="deleteCancel">
                    <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      value4: '',
      loading3: false,
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model2: '',
      model3: '',
      model4: '',
      edit_icon_blue: true,
      edit_icon_red: false
    }
  },
  methods: {
    edit_icon_colorB () {
      this.edit_icon_blue = false
      this.edit_icon_red = true
      this.edit_delete = true
    },
    edit_icon_colorR () {
      this.edit_icon_blue = true
      this.edit_icon_red = false
      this.edit_delete = false
    }
  }
}
</script>
<style lang="postcss" scoped>
.loans_stages ul li {
  width: 300px;
  height: 170px;
  border: 1px solid #ccc;
  margin-top: 30px;
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
.homePage_icon {
  margin-left: 0px;
  margin-right: 50px;
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
.loans_id {
  font-size: 12px;
  margin-top: 10px;
  margin-right: 8px;
}
</style>
