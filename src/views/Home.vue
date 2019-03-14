<template>
  <div class="home">
    <iTable :propTableData="tableData" :col-configs="colConfigs" :loading="loading">
      <!-- <el-table-column slot="thumbnail_pic_s" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.thumbnail_pic_s" alt>
        </template>
      </el-table-column>-->
      <el-table-column slot="operate" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iTable>
  </div>
</template>

<script>
import iTable from "@/components/iTable.vue";
export default {
  name: "home",
  components: {
    iTable
  },
  data() {
    return {
      tableData: [],
      loading: true,
      colConfigs: [
        { slot: "operate" },
        { prop: "account_number", label: "会员名" },
        { prop: "email", label: "邮箱" },
        { prop: "phone", label: "手机号" },
        { prop: "create_time", label: "日期" }
      ]
    };
  },
  methods: {
    async axiosGetProduct() {
      let res = await this.$api.get("/memberInfo/list");
      // console.log("data", res);
      if (res) {
        this.tableData = res;
        this.loading = false;
      }
    }
  },
  created() {
    this.axiosGetProduct();
  }
};
</script>
