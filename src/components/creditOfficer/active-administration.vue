<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <Select v-model="model8" placeholder="请选择" style="width:150px;">
              <Option v-for="item in userIsConsumeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="ml10">
            <Select v-model="model8" placeholder="请选择" style="width:150px;">
              <Option v-for="item in userIsConsumeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="clearfix">
            <Button type="info" class=" ml50 left w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
          <li>
            <Button type="success" class=" ml50 left w100">
              <span>添加</span>
            </Button>
          </li>
        </ul>     
      <!-- <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> --> 
      </div>      
      <!-- <Button class=" ml20 w100 " type="info" @click="updatelist">导入</Button> -->    
      <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
    </div>
    
  </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      loading2: false,
      loading3: false,
      userIsConsumeList: [],
      model3: "",
      model8: "",
      filename: "",
      fileerror: "",
      total: 0,
      startRow: 1,
      endRow: 10,
      columns7: [
        {
          title: "活动标题",
          key: "nameNum",
          minWidth: 120,
          align: "center"
        },
        {
          title: "活动类型",
          key: "sitNum",
          minWidth: 120,
          align: "center"
        },
        {
          title: "开始时间",
          key: "phone",
          minWidth: 160,
          align: "center"
        },
        {
          title: "结束时间",
          key: "name",
          minWidth: 160,
          align: "center"
        },
        {
          title: "添加时间",
          key: "registerTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "活动状态",
          key: "loanBaseStatus",
          align: "center",
          minWidth: 110
        },
        {
          title: "创建人",
          key: "loanBaseTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "操作",
          key: "accountVirtual",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      alert('编辑')
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data6: []
    };
  },
  methods: {
    // 分页
    pageChange(page) {
      this.startRow = page;
      this.inquire();
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.inquire();
    },
    // 列表查询
    inquire(num) {
      this.loading3 = true;
      let list = {
        userIsConsume: this.model8,
        pageNum: this.startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/sale/querySaleList", list)
        .then(resp => {
          if (resp.code == "success") {
            this.data6 = resp.data.dataList;
            this.total = resp.data.total;
            this.startRow = Math.ceil(resp.data.startRow / this.endRow);
            this.loading3 = false;
          } else {
            this.loading3 = false;
          }
        })
        .catch(() => {
          this.loading3 = false;
        });
    },
    // 上传格式校验
    handleFormatError2(file) {
      this.namelist = "";
      this.$Message.info("文件格式不正确,请上传excel格式文件");
    }
  },

  created() {
    this.http
      .post(BASE_URL + "/loan/sale/getFilterConfig", {})
      .then(resp => {
        if (resp.code == "success") {
          this.userIsConsumeList = resp.data.userIsConsumeList; //是否消费过
          this.inquire();
        } else {
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
</style>
