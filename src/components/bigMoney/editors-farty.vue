<template>
    <div>
      <div class="navigation">
            <p>
                <span>甲方管理</span>
            </p>
        </div>
        <div class="contentcss">
        <Row>
        <Col span="16" offset="4">
        <div class="mt50">
            <ul>
                <li>
                    <span class="">甲方名称:</span>
                    <Select v-model="model1" style="width:200px" placeholder='model1' disabled class="mr20 ml5">
                      <!-- <Option :value="model1">{{model1}}</Option> -->
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="mt15" >
                  <span>暂停推送日期设置:</span>
                  <DatePicker type="date" :value="value3" :options="options3" @on-change="time1" placeholder="开始时间" style="width: 200px"></DatePicker>
                  <span class="spots">
                    已选择
                    <Tag @on-close="handleClose" :name="index" closable class="red" v-if="item != ''&&index<4" v-for="(item, index) in time" :key="index">{{item}}<i >&nbsp;&nbsp;</i></Tag>
                    <Button type="info" @click="modal10 = true">更多</Button>
                  </span>
                </li>
                <li class="mt15">
                    <span >推送方式:</span>
                    <RadioGroup v-model="animal" @on-change="pushmode(animal)"  class="ml5">
                        <Radio  label="手动"></Radio>
                        <Radio label="自动" ></Radio>
                        <!-- <Radio label="自动手动都可以" ></Radio> -->
                    </RadioGroup>
                </li>                             
                <li class="mt15" v-if="manual">
                  <span>注册XX时间段后推送:</span>
                  <Input v-model="cycle" placeholder="请输入推送周期" style="width: 200px"></Input>
                  <RadioGroup v-model="datatime" class="ml5" style="margin-top:-5px">
                        <Radio label="分"></Radio>
                        <Radio label="小时"></Radio>
                        <Radio label="天"></Radio>
                    </RadioGroup>
                </li>              
                <li class="mt15">
                    <span >推送字段:</span>
                </li>
                <li class="mt15">
                    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                </li>
                <li class="mt15">
                   <span class="w150 displayib">重复数据间隔推送天数:</span>
                   <Input v-model="value1" class="ml5 numday" style="width: 200px"></Input>
                   <span>天</span>
                </li>
                <li class="mt15">
                   <span class="w150 displayib">每日推送总条数限制:</span>
                   <Input v-model="value2" class="ml5 numday" style="width: 200px"></Input>
                   <span>条</span>
                </li>
                <li class="mt15">
                    <span >状态:</span>
                    <RadioGroup v-model="enable" class="ml5">
                        <Radio label="启用"></Radio>
                        <Radio label="停用"></Radio>
                    </RadioGroup>
                </li>
                <li class="mt15 tc mb50">
                    <Button class="w100" @click="cancelfh">取消</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button class="w100" type="primary" @click="preservation">保存</Button>
                </li>
            </ul>
        </div>
        </Col>
    </Row>
    </div>
    <Modal
          title="居住城市"
          v-model="modal9"
          @on-ok="upload"
          @on-cancel="cancel"
          ok-text="确定"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="700"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 pl10 citymod">
            <label>{{cityText}}</label>
           <ul>
            <li >
            <CheckboxGroup v-model="social"  @on-change="checkProvinceChange">
              <Checkbox v-for="tion in city" style="display:block" class="mb5"  :label="tion.rowId">
                <span>{{tion.province}}</span>
                <Input v-if="tion.isChecked || tion.dataId != null" :value="tion.limitNum == undefined ? 0 : tion.limitNum" class="limitnum"  style="width: 60px"></Input>
                <Input v-if="!tion.isChecked && tion.dataId == null" class="limitnum"  style="width: 60px;display:none"></Input>
                </br>
                <!-- <CheckboxGroup v-model="social.cityList"> -->
                  <Checkbox v-for="city in tion.cityList" style="display:inline_block" class="mb5"  :label="city.rowId">
                    <span>{{city.city}}</span>
                    <Input v-if="city.isChecked || city.dataId != null" :value="city.limitNum == undefined ? 0 : city.limitNum" class="limitnum"  style="width: 60px"></Input>
                    <Input v-if="!city.isChecked && city.dataId == null" :value="city.limitNum" class="limitnum"  style="width: 60px;display:none"></Input>
                  </Checkbox>
                <!-- </CheckboxGroup> -->
              </Checkbox>
            </CheckboxGroup>
            </li>
        </ul>
          </div>
          </Modal>

          <Modal
        title="已选择:"
        v-model="modal10"
        class-name="vertical-center-modal">
        <p>
          <Tag @on-close="handleClosemod" :name="index" closable class="red" v-if="item != ''" v-for="(item, index) in time2" :key="index">{{item}}<i >&nbsp;&nbsp;</i></Tag>
        </p>
    </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      model1: "",
      animal: "手动",
      enable: "启用",
      value1: "",
      value2: "",
      value3: "",
      modal9: false,
      modal10: false,
      manual: false,
      loading: true,
      value4: "",
      cycle: "",
      code: "",
      datatime: "分",
      cityText: "",
      key: "",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      cityList: [
        {
          value: "",
          label: ""
        }
      ],
      columns4: [
        {
          title: "标签",
          align: "center",
          render: (h, params) => {
            let fieldName = params.row.fieldName;
            let prefix = "";
            if (params.row.hasShow == 1) {
              prefix = "* ";
              fieldName = fieldName;
            } else if (params.row.hasShow == 0) {
              fieldName = fieldName;
            }
            return h("div", [
              h("span", { style: { color: "red" } }, prefix),
              h("span", {}, fieldName)
            ]);
          }
        },
        {
          title: "标签值",
          align: "center",
          render: (h, params) => {
            let configureValues;
            if (params.row.fieldName == "居住城市") {
              let value = params.row.configureValues;
              if (value && value.length > 12) {
                value = value.slice(0, 12) + "...";
              }
              configureValues = [
                value,
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      marginLeft: "15px"
                    },
                    on: {
                      click: () => {
                        this.choosecity(params.row.partyaKey);
                        this.refuse();
                      }
                    }
                  },
                  "选择城市"
                )
              ];
            } else {
              configureValues = params.row.configureValues;
            }
            return h("div", {}, configureValues);
          }
        }
      ],
      data1: [],
      city: [],
      time: [],
      time2: [],
      social: [],
      lastSocial: [],
      locationList: {},
      urbanDistrict: []
    };
  },
  methods: {
    handleClose(event, name) {
      // const index = this.time.indexOf(name+1);
      this.time.splice(name, 1);
    },
    handleClosemod(event, name) {
      this.time2.splice(name, 1);
    },
    // 保存
    preservation() {
      let reg = /^(0|[1-9][0-9]*)$/;
      if (this.animal != "手动") {
        if (
          !reg.test(this.cycle) ||
          Number(this.cycle) > 1440 ||
          Number(this.cycle) < 0 ||
          this.cycle === ""
        ) {
          this.$Modal.warning({
            content: "<p>请输入正确的推送周期(0-1440)</p>"
          });
          return false;
        }
      }
      if (
        0 > Number(this.value1) ||
        Number(this.value1) > 366 ||
        !reg.test(this.value1) ||
        String(this.value1) == ""
      ) {
        this.$Modal.warning({
          content: "<p>请输入正确的推送天数(0-366)</p>"
        });
        return false;
      }
      if (
        0 > Number(this.value2) ||
        Number(this.value2) > 100000 ||
        !reg.test(this.value2) ||
        String(this.value2) == ""
      ) {
        this.$Modal.warning({
          content: "<p>请输入正确的推送天数(0-100000)</p>"
        });
        return false;
      }
      let sendType;
      let status;
      let list = {};
      let datatime;
      if (this.enable == "启用") {
        status = "1";
      } else {
        status = "2";
      }
      let time = "";
      this.time2.forEach((e, i) => {
        if (i == this.time2.length - 1) {
          time += e;
        } else {
          if (e != "") {
            time = time + e + ",";
          }
        }
      });
      if (this.animal == "手动") {
        sendType = "1";
        list = {
          partyaCode: this.code,
          sendType: sendType,
          limitDay: this.value2,
          partyaKey: this.value4,
          repateSendDay: this.value1,
          pausePush: time,
          status: status
        };
      } else if (this.animal == "自动") {
        sendType = "2";
        if (this.datatime == "分") {
          datatime = "1";
        } else if (this.datatime == "小时") {
          datatime = "2";
        } else {
          datatime = "3";
        }
        list = {
          partyaCode: this.code,
          sendType: sendType,
          limitDay: this.value2,
          repateSendDay: this.value1,
          partyaKey: this.value4,
          status: status,
          pausePush: time,
          cycle: this.cycle,
          cycleUnint: datatime
        };
      }
      this.http
        .post(BASE_URL + "/loan/partya/updatePartyaByCode", list)
        .then(resp => {
          if (resp.code == "success") {
            this.$Modal.success({
              title: "甲方管理",
              content: "<p>保存成功</p>",
              onOk: () => {
                this.$router.push({ path: "./partyManagement" });
              },
              onCancel: () => {
                // this.$Message.info('Clicked cancel');
              }
            });
          } else {
          }
        })
        .catch(() => {});
    },
    refuse() {
      this.modal9 = true;
    },
    // 城市
    choosecity(key) {
      this.social = [];
      let list = {
        partyaKey: key
      };
      this.key = key;
      this.http
        .post(BASE_URL + "/loan/pushCity/getPushCityListAll", list)
        .then(resp => {
          if (resp.code == "success") {
            this.locationList = {};
            resp.data.map((p, index) => {
              p.rowId = "province" + index;
              this.locationList[p.rowId] = p;
              p.cityList.map((c, index) => {
                c.rowId = "city" + index + p.rowId;
                this.locationList[c.rowId] = c;
              });
            });
            this.city = this.city.concat(resp.data);
            console.log(this.city);

            // for (let i = 0; i < resp.data.length; i++) {
            //   let obj = new Object();
            //   obj.dataId = resp.data[i].dataId;
            //   obj.city = resp.data[i].province;
            //   obj.cityList = resp.data[i].cityList;
            //   obj.limitNum = resp.data[i].limitNum;
            //   this.city.push(obj);
            //   if (resp.data[i].dataId != null) {
            //     this.social.push(resp.data[i].city);
            //   }
            // }
          } else {
          }
        })
        .catch(() => {});
    },
    // 勾选城市时的函数
    // checkAllGroupChange (data) {
    //   console.log(this.social)
    // },
    cancelfh() {
      this.$router.push({ path: "./partyManagement" });
    },
    // 点击勾选输入框判断
    checkProvinceChange(social) {
      // console.log("checkProvinceChange", social);

      //找出已经取消选择的
      let cancelSelecteds = [];
      this.lastSocial.map(key => {
        if (social.indexOf(key) == -1) {
          cancelSelecteds.push(key);
        }
      });
      //找出新选择的
      let selecteds = [];
      social.map(key => {
        if (this.lastSocial.indexOf(key) == -1) {
          selecteds.push(key);
        }
      });

      let fullSocial = [];
      Object.keys(this.locationList).map(key => {
        selecteds.map(selected => {
          if (selected == key || key.endsWith(selected)) {
            fullSocial.push(key);
          }
        });
      });
      social.map(key => {
        if (fullSocial.indexOf(key) == -1) {
          fullSocial.push(key);
        }
      });
      this.social = fullSocial;
      this.social.map(rowId => {
        this.locationList[rowId].isChecked = true;
      });
      cancelSelecteds.map(rowId => {
        this.locationList[rowId].isChecked = false;
      });

      console.log(fullSocial, this.locationList);
      this.lastSocial = social;
      // if (event.target.parentNode.className.indexOf("ivu-checkbox-checked") > -1) {
      //   event.target.parentNode.parentNode.getElementsByClassName("limitnum")[0].style.display ="none";
      // } else {
      //     event.target.parentNode.parentNode.getElementsByClassName("limitnum")[0].style.display = "inline-block";
      // }
    },
    cancel() {
      this.city = [];
    },
    // 城市保存
    upload() {
      // let limitnum = document.getElementsByClassName('limitnum')
      let checkets = document.getElementsByClassName("ivu-checkbox-checked");
      let reg = /^[0-9]{1,6}$/;
      for (let j = 0; j < checkets.length; j++) {
        if (
          checkets[j].parentNode.getElementsByClassName("ivu-input")[0].value ==
          ""
        ) {
          checkets[j].parentNode.getElementsByClassName(
            "ivu-input"
          )[0].style.borderColor =
            "red";
          const title = "居住城市";
          let content = "<p>请输入推送条数</p>";
          this.$Modal.warning({
            title: title,
            content: content
          });
          this.changeLoading();
          return false;
        } else if (
          !reg.test(
            checkets[j].parentNode.getElementsByClassName("ivu-input")[0].value
          )
        ) {
          checkets[j].parentNode.getElementsByClassName(
            "ivu-input"
          )[0].style.borderColor =
            "red";
          const title = "居住城市";
          let content = "<p>请输入正确的推送条数 (最多只能输入6位数字)</p>";
          this.$Modal.warning({
            title: title,
            content: content
          });
          this.changeLoading();
          return false;
        }
      }
      let obj = {
        list: [],
        provinceList: [],
        partyaKey: this.key
      };
      for (let i = 0; i < checkets.length; i++) {
        const limitNum = checkets[i].parentNode.getElementsByClassName(
          "ivu-input"
        )[0].value;
        const key = checkets[i].parentNode.getElementsByClassName(
          "ivu-checkbox-input"
        )[0].value;
        if (key.startsWith("city")) {
          obj.list.push({
            city: this.locationList[key].city,
            limitNum: limitNum
          });
        } else {
          obj.provinceList.push({
            province: this.locationList[key].province,
            limitNum: limitNum
          });
        }
      }

      //遍历存在值的
      Object.keys(this.locationList).map(key => {
        if (
          (this.social.indexOf(key) == -1 && this, this.locationList[key].limitNum)
        ) {
          if (key.startsWith("city")) {
            obj.list.push(this.locationList[key]);
          } else {
            obj.provinceList.push(this.locationList[key]);
          }
        }
      });

      this.http
        .post(BASE_URL + "/loan/pushCity/addPartyaCitys", obj)
        .then(resp => {
          if (resp.code == "success") {
            const title = "居住城市";
            let content = "<p>保存成功</p>";
            this.$Modal.success({
              title: title,
              content: content,
              onOk: () => {
                this.city = [];
                this.modal9 = false;
                location.reload();
              }
            });
          } else {
          }
        })
        .catch(() => {});
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    pushmode(val) {
      if (val == "自动") {
        this.manual = true;
      } else {
        this.manual = false;
      }
    },
    time1(value, data) {
      if (this.time.length <= 3) {
        let list = [];
        list.push(value);
        for (let i = 0; i < list.length; i++) {
          if (this.time.indexOf(list[i]) == -1) {
            this.time.push(value);
          }
        }
        this.time2 = this.time;
      } else {
        let list = [];
        list.push(value);
        for (let i = 0; i < list.length; i++) {
          if (this.time2.indexOf(list[i]) == -1) {
            this.time2.push(value);
          }
        }
      }
    }
  },
  mounted() {
    this.http
      .post(
        BASE_URL +
          "/loan/partya/getPartyaByCode?partyaCode=" +
          this.$route.query.code
      )
      .then(resp => {
        if (resp.code == "success") {
          this.cityList[0].label = resp.data.partyaName;
          this.cityList[0].value = resp.data.partyaName;
          this.model1 = resp.data.partyaName;
          this.code = resp.data.partyaCode;
          if (resp.data.sendType == "1") {
            this.animal = "手动";
            this.manual = false;
          } else {
            this.animal = "自动";
            this.manual = true;
            this.value3 = resp.data.pausePush;
          }
          if (resp.data.pausePushJson == null) {
            this.time = [];
            this.time2 = [];
          } else {
            if (resp.data.pausePushJson > 4) {
              for (let i = 0; i < 4; i++) {
                this.time.push(resp.data.pausePushJson[i]);
                this.time2.push(resp.data.pausePushJson[i]);
              }
            } else {
              this.time = resp.data.pausePushJson;
              this.time2 = resp.data.pausePushJson;
            }
          }
          this.data1 = resp.data.list;
          this.value1 = resp.data.repateSendDay;
          this.value2 = resp.data.limitDay;
          this.value4 = resp.data.partyaKey;
          if (resp.data.status == "1") {
            this.enable = "启用";
          } else {
            this.enable = "停用";
          }
          this.cycle = resp.data.cycle;
          if (resp.data.cycleUnint == "1") {
            this.datatime = "分";
          } else if (resp.data.cycleUnint == "2") {
            this.datatime = "小时";
          } else {
            this.datatime = "天";
          }
        } else {
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="less" scoped>
.citymod {
  height: 400px;
  overflow-y: scroll;
}
</style>
