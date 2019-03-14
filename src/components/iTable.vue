<template>
  <div>
    <el-table
      :data="tableData"
      :show-header="showHeader"
      :border="border"
      :max-height="maxHeight"
      v-loading="loading"
      :class="className"
      element-loading-text="正在加载..."
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <div v-for="(colConfig, index) in colConfigs" :key="index">
        <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
        <component v-else-if="colConfig.component" :is="config.component" :col-config="colConfig"></component>
        <el-table-column v-else v-bind="colConfig" align="center" :show-overflow-tooltip="true"></el-table-column>
      </div>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "iTable",
  props: {
    colConfigs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    propTableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: []
    };
  },
  methods: {
    fetchData() {
      this.tableData = this.pageData(this.propTableData)
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    pageData(data) {
      return data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  watch: {
    propTableData: {
      handler(newValue, oldValue) {
        this.total = newValue.length;
        this.tableData = this.pageData(newValue)
      },
      deep: true,
      immediate: true
    }
  },
  created() {}
};
</script>
 
<style scoped>
</style>