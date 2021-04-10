<template>
    <div id="edit">
        <el-form ref="form" :model="theshop" label-width="80px">
            <el-form-item label="菜品名称">
                <el-input v-model="theshop.name"></el-input>
            </el-form-item>
            <el-form-item label="菜品金额">
                <el-input placeholder="请输入金额" prefix-icon="el-icon-s-goods" v-model="theshop.money"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input v-model="theshop.message"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="finishedit">立即更新</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        computed: {
            ...mapState({
                theshop: state => state.shop.theshop,
            }),
        },
        data() {
            return {
                delivery: false,
                form: {
                    name: '',
                    money: '',
                    message: ''
                },
            }
        },
        methods: {
            finishedit() {
                if (this.theshop.name !== '' && this.theshop.money !== '' && this.theshop.message !== '') {
                    return this.$confirm("确定要更新该餐品吗？")
                        .then((_) => {
                            this.form = this.$store.state.shop.theshop
                            this.$store.commit("finishedit", this.form)
                            this.$store.state.menu.currentmenu = 1
                            this.$router.push('/shop')
                            this.$message({
                                type: "success",
                                message: "更新成功!",
                            })
                        })
                        .catch((err) => { err })
                } this.$message({
                    message: "请正确输入餐品信息",
                    type: "warning",
                })


            }
        },
    }
</script>

<style scoped lang="less">
    .el-form {
        margin: 2%;
    }
</style>