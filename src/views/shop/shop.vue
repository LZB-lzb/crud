<template>
  <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 90%;margin:3%" border>
    <el-table-column label="Money" prop="money">
    </el-table-column>
    <el-table-column label="Name" prop="name">
    </el-table-column>
    <el-table-column label="Message" prop="message">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState({
        tableData: state => state.shop.tableData,
      }),
    },
    data() {
      return {
        search: '',
        form: {
          name: '',
          money: '',
          message: ''
        },
      }
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
        this.$store.commit("editshop", index + 1);
        this.$store.state.menu.currentmenu = 5
        this.$router.push('/editshop')
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该餐品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit("delshop", index + 1);
          this.$store.state.menu.currentmenu = 0
          this.$router.push('/')
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.$store.commit("getdata");
    },
  }
</script>
<style scoped>

</style>