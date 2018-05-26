<template>
    <div>
      <div class="navigation">
				<p>
				<span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;贷款产品配置</span>
				</p>
			</div>
			<h1>编辑贷款产品-产品ID:231</h1>
			<Row>
        <Col span="10">
					 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
						 <FormItem label="产品LOGO" prop="iconImg" class="iconImg">
							<span class="left">
								<img src="../../image/application-hzjf.png" alt="">
							</span>
							<Upload action="//jsonplaceholder.typicode.com/posts/" class="upload">
								<Button type="ghost" icon="ios-cloud-upload-outline">上传LOGO</Button>
							</Upload>
						</FormItem>
						<FormItem label="产品名称" prop="product_name">
							<Input v-model="formValidate.product_name" placeholder="请输入产品名称"></Input>
						</FormItem>
						<FormItem label="申请人基数" prop="base">
							<Input v-model="formValidate.base" placeholder="申请人基数"></Input>
						</FormItem>
						<FormItem label="产品搜索页特点" prop="search_page">
							<Input v-model="formValidate.search_page" placeholder="请输入产品搜索页特点"></Input>
						</FormItem>
						<FormItem label="前端显示" prop="front_dispay">
							<Select v-model="formValidate.front_dispay">
								<Option value="beijing">月利率</Option>
								<Option value="shanghai">日利率</Option>
							</Select>
						</FormItem>
						<FormItem label="还款方式" prop="repayment">
							<Select v-model="formValidate.repayment">
								<Option value="beijing">按月还款</Option>
								<Option value="shanghai">随借随还</Option>
							</Select>
						</FormItem>
						<FormItem label="额度类型" prop="quota">
							<Select v-model="formValidate.quota">
								<Option value="beijing">范围</Option>
								<Option value="shanghai">固定</Option>
							</Select>
						</FormItem>
						</FormItem>
						<FormItem label="额度范围" prop="money" class="left">
							<Input v-model="formValidate.money" placeholder="起始金额" style="width:100px;"></Input>
							<span>至</span>
						</FormItem>
						<FormItem prop="end_money">
							<Input v-model="formValidate.end_money" placeholder="结束金额" style="width:100px; margin-left: 8px;"></Input>
							<span>元</span>
						</FormItem>
						<FormItem label="期限类型" prop="term">
							<Select v-model="formValidate.term">
								<Option value="beijing">范围</Option>
								<Option value="shanghai">固定</Option>
							</Select>
						</FormItem>
						<FormItem label="期限范围" prop="start_term" class="left">
							<Input v-model="formValidate.start_term" placeholder="起始期限值" style="width:100px;"></Input>
							<span>至</span>
						</FormItem>
						<FormItem prop="end_term">
							<Input v-model="formValidate.end_term" placeholder="结束期限值" style="width:100px; margin-left: 8px;"></Input>
							<span>月</span>
						</FormItem>
						<FormItem label="申请流程" prop="interest">
							<CheckboxGroup v-model="formValidate.interest">
								<Checkbox label="提交申请"></Checkbox>
								<Checkbox label="身份认证"></Checkbox>
								<Checkbox label="手机认证"></Checkbox>
								<Checkbox label="成功放款"></Checkbox>
							</CheckboxGroup>
						</FormItem>
						<FormItem
							v-for="(item, index) in formDynamic.items"
							v-if="item.status"
							:key="index"
							:label="'申请条件 ' + item.index"
							:prop="'items.' + index + '.value'"
							:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
							<Row>
									<Col span="18">
											<Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
									</Col>
									<Col span="4">
												<Button type="dashed" long @click="handleAdd"><Icon type="plus"></Icon></Button>
									</Col>
									<Col span="4" offset="1">
											<Button type="ghost" @click="handleRemove(index)"><Icon type="minus"></Icon></Button>
									</Col>
									
							</Row>
						</FormItem>
						<!-- <FormItem>
								<Row>
										<Col span="12">
												<Button type="dashed" long @click="handleAdd"><Icon type="plus"></Icon></Button>
										</Col>
								</Row>
						</FormItem> -->
						<FormItem>
							<Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
							<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
						</FormItem>
					</Form>
				</Col>
        <Col span="12">col-12</Col>
    	</Row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        iconImg: "",
        product_name: "",
        base: "",
        search_page: "",
        front_dispay: "",
        repayment: "",
        quota: "",
        money: "",
        end_money: "",
        term: "",
        start_term: "",
        end_term: "",
        interest: [],
        time: ""
      },
      ruleValidate: {
        iconImg: [
          {
            required: true,
            message: "请选择上传图片！",
            trigger: "blur"
          }
        ],
        product_name: [
          {
            required: true,
            message: "请输入上传名称！",
            trigger: "blur"
          }
        ],
        base: [
          {
            required: true,
            message: "请输入申请人基数！",
            trigger: "blur"
          }
        ],
        search_page: [
          {
            required: true,
            message: "请输入产品搜索页特点！",
            trigger: "blur"
          }
        ],
        front_dispay: [
          {
            required: true,
            message: "请选择前端显示",
            trigger: "change"
          }
        ],
        repayment: [
          {
            required: true,
            message: "请选择还款方式",
            trigger: "change"
          }
        ],
        quota: [
          {
            required: true,
            message: "请选择额度类型",
            trigger: "change"
          }
        ],
        term: [
          {
            required: true,
            message: "请选择期限类型",
            trigger: "change"
          }
        ],
        money: [{ required: true, message: "请选择金额", trigger: "change" }],
        end_money: [
          { required: true, message: "请选择金额", trigger: "change" }
        ],
        term: [
          {
            required: true,
            message: "请选择期限类型",
            trigger: "change"
          }
        ],
        start_term: [
          { required: true, message: "请选择期限范围", trigger: "change" }
        ],
        end_term: [
          { required: true, message: "请选择期限范围", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择申请流程",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ]
      },
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    }
  }
};
</script>
<style lang="less" scoped>
h1 {
  color: #666;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding-top: 13px;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.iconImg img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.upload {
  padding-top: 30px;
  margin-left: 10px;
}
.ivu-btn-long {
  width: 35%;
}
</style>
