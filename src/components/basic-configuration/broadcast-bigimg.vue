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
            <p class="homePage_button right" @click="homePageAdd"><Icon type="android-add"></Icon>添加</p>
        </h1>
        <div class="homePage_bianli"  v-for="(item,index) in items" >
            <div class="homePage_img clearfix">
                <Upload
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError1"
                    :before-upload="handleUpload"
                    :data="{'uptoken': uptoken}"
                    :show-upload-list="false"                        
                    action=''
                    class="homePage_img_img left">
                    <div >
                      <span class="homePage_img_img left">
                          <img :src="item.banklogo" alt="">
                      </span>
                    </div>
                </Upload>
                
                <span class="homePage_img_input left">
                    <Select v-model="item.model1" style="width:100px">
                      <Option v-for="item in item.cityList" @click.native="homePage1(index,item.value)" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <input type="text" class="homePage_url" v-if="item.homePage_if_input">
                </span>
                <span class="homePage_img_input left"  v-if="item.homePage_if">
                    <Select v-model="item.model2" style="width:100px"  >
                      <Option v-for="item in item.cityList2" @click.native="homePage2(index,item.value)" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </span>
                <span class="homePage_img_input left"  v-if="item.homePage_if1">
                    <Select v-model="item.model3" style="width:100px">
                      <Option v-for="item in item.cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </span>
                <div class="homePage_input2 left">
                  <p>
                      <Select v-model="item.model4" style="width:120px">
                          <Option v-for="item in item.cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                  </p>
                  <p>
                      <Select v-model="item.model5" style="width:120px">
                          <Option v-for="item in item.cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                  </p>
                </div>
                <span class="homePage_delete right"><a href="javascript:;" class="version_icon">保存</a> </span>
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
                <span class="homePage_delete1 right"><InputNumber class="banknumint" :min="0" v-model="item.bankNo"></InputNumber> </span>
            </div>
        </div>
        <hr>
        <div class="homePage_center">
          <!-- <a href="javascript:;" class="homePage_submit">提交保存</a> -->
          <router-link to="./pageConfigguration"><p class="homePage_goback">返回</p></router-link> 
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
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
              value: "已实名隐藏",
              label: "已实名隐藏"
            }
          ],
          model1: "不跳转",
          model2: "原生页面",
          model3: "首页",
          model4: "下架",
          model5: "未实名显示",
          homePage_if_input: false,
          homePage_if: false,
          homePage_if1: false,
          banklogo: require('../../image/moren.png'),
        }
      ]
    };
  },
  components: {},
  methods: {
    ok() {
      this.$Message.info("删除成功！");
    },
    cancel() {
      this.$Message.info("删除失败！");
    },
    homePage1(v,t) {
      console.log(t)
      if (t == "不跳转") {
        this.items[v].homePage_if = false;
        this.items[v].homePage_if1 = false;
        this.items[v].homePage_if_input = false;
      } else if (t == "跳转") {
        this.items[v].homePage_if = true;
        this.items[v].homePage_if1 = true;
        if (t == "h5页面") {
          this.items[v].homePage_if1 = false;
          this.items[v].homePage_if_input = true;
        }
      }
    },
    homePage2(v,t) {
      if (t == "原生页面") {
        this.items[v].homePage_if1 = true;
        this.items[v].homePage_if_input = false;
      } else {
        this.items[v].homePage_if1 = false;
        this.items[v].homePage_if_input = true;
      }
    },
    homePageAdd() {
      this.index++;
      this.items.push( {
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
              value: "已实名隐藏",
              label: "已实名隐藏"
            }
          ],
          model1: "不跳转",
          model2: "原生页面",
          model3: "首页",
          model4: "下架",
          model5: "未实名显示",
          banklogo: require('../../image/moren.png'),
        });
    },
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
    handleUpload(file) {
      console.log(file)
      let splic = file.name.split(".");
      if (
        splic[splic.length - 1] == "png" ||
        splic[splic.length - 1] == "jpg" ||
        splic[splic.length - 1] == "gif" ||
        splic[splic.length - 1] == "jpeg"
      ) {
        let formData = new FormData();
        formData.append("file", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 1000 * 60 * 5
        };
        this.http
          .post(BASE_URL + "/fileUpload", formData, config)
          .then(resp => {
            if (resp.code == "success") {
              // this.formValidate.productlogo = resp.data;
              // this.formValidate.logoUrl1 = resp.data;
            } else {
            }
          })
          .catch(() => {});
        // this.formValidate.productlogo = file.name;
        // return false;
      }
      return false
    },
  }
};
</script>
<style lang="less" scoped>
.homePage_center {
  width: 100%;
  text-align: center;
  
}
.uploadleft {
  width: 58px;
  height:58px;
  position: relative;
  left: 0px;
  top: 0px;
}
.homePage_url {
  position: absolute;
  top: 77px;
  width: 300px;
  height: 36px;
  border: 1px solid #ccc;
  padding-left: 8px;
}
.homePage_submit,
.homePage_goback {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-top: 15px;
  border-radius: 5px;
}
.homePage_goback {
  background-color: #ccc;
  width: 40px;
  margin-left: 20px;
}
.homePage_submit {
  background-color: #3598dc;
  width: 80px;
  color: #fff;
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
  margin-right: 10px;
  margin-top: 40px;
  cursor: pointer;
}
.homePage_delete1{
  display: inline-block;
  height: 30px;
  width: 80px;
  text-align: center;
  line-height: 30px;
  border-radius: 50px;
  margin-right: 10px;
  margin-top: 40px;
}
.homePage_input2 {
  margin-left: 100px;
}
.homePage_input2 p {
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
  position: relative;
}
</style>
