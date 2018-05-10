<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;页面配置</span>
        </p>
      </div>
      <div class="homePage">
          <h1 class="homePage_h1">
              轮播大图 - 首页
              <p class="homePage_button right"><Icon type="android-add"></Icon>添加</p>
          </h1>
          <div class="homePage_img clearfix">
              <span class="homePage_img_img left">
                  <img src="../../image/dkcslogo.jpg" alt="">
              </span>
              <span class="homePage_img_input left">
                  <Select v-model="model1" style="width:100px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
              </span>
               <span class="homePage_img_input left">
                  <Select v-model="model2" style="width:100px">
                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
              </span>
               <span class="homePage_img_input left">
                  <Select v-model="model3" style="width:100px">
                    <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
              </span>
              <div class="homePage_input2 left">
                <p> 
                    <Select v-model="model4" style="width:120px">
                        <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </p>
                <p> 
                    <Select v-model="model5" style="width:120px">
                        <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </p>
              </div>
              <span class="homePage_delete right">
                  <span class="version_icon">
                    <Poptip
                        confirm
                        transfer
                        title="确认删除吗?"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <a href="javascript:;" ><Icon type="trash-b"></Icon>删除</a>
                    </Poptip>
                  </span>
              </span>
          </div>
        <hr>
        <a href="javascript:;" class="homePage_submit">提交保存</a>
        <a href="javascript:;" class="homePage_goback">返回</a>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [
        {
          value: "不跳转",
          label: "不跳转"
        },
        {
          value: "跳转",
          label: "跳转"
        }
      ],
       cityList2: [
        {
          value: "原生页面",
          label: "原生页面"
        },
        {
          value: "h5页面",
          label: "h5页面"
        }
      ],
       cityList3: [
        {
          value: "首页",
          label: "首页"
        },
        {
          value: "贷款列表",
          label: "贷款列表"
        },
        {
          value: "产品详情",
          label: "产品详情"
        },
        {
          value: "实名认证",
          label: "实名认证"
        },
        {
          value: "精准推荐",
          label: "精准推荐"
        },
        {
          value: "我要赚钱",
          label: "我要赚钱"
        },
        {
          value: "赚了花",
          label: "赚了花"
        }
      ],
      cityList4: [
        {
          value: "下架",
          label: "下架"
        },
        {
          value: "上架",
          label: "上架"
        }
      ],
      cityList5: [
        {
          value: "未实名显示",
          label: "未实名显示"
        },
        {
          value: "未实名不显示",
          label: "未实名不显示"
        }
      ],
      model1: "不跳转",
      model2: "原生页面",
      model3: "首页",
      model4: "下架",
      model5: "未实名显示"
    };
  }
};
</script>
<style lang="less" scoped>
.homePage_submit , .homePage_submit{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 15px;
}
.homePage_submit {
    background-color: #3598dc; 
    border-radius: 5px;
    width: 80px;
}
hr {
    margin-top: 25px;
}
.homePage_button {
    width: 80px;
    border-radius: 50px;
    border: 1px solid #ccc;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
}
.homePage_delete {
    display: inline-block;
    border: 1px solid #ccc;
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 30px;
    border-radius: 50px;
    margin-right: 80px;
    margin-top: 40px;
    cursor: pointer;
}
.homePage_input2 {
    margin-left: 100px;
}
.homePage_input2 p{
    margin-bottom: 25px;
}
.homePage_img_input {
    margin-left: 40px;
}
.homePage_img_img {
  display: inline-block;
  width: 200px;
  height: 100px;
}
.homePage_img_img > img {
  width: 100%;
  height: 100%;
}
.homePage {
  margin-bottom: 25px;
  width: 100%;
  border: 1px solid #ccc;
  padding-bottom: 30px;
  padding-left: 20px;
}
.homePage_h1 {
  border-bottom: 1px solid #ccc;
  padding: 10px 0 5px 0;
}
.homePage_img {
  width: 100%;
  padding: 20px 0 20px 15px;
  background-color: #f5f8fd;
  margin-top: 20px;
  border-left: 5px solid #8bb4e7;
}
</style>

