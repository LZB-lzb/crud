<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜品名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品金额">
            <el-input placeholder="请输入金额" prefix-icon="el-icon-s-goods" v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="信息可见">
            <el-switch v-model="delivery"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
            <el-input v-model="form.message"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addshop">立即添加</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data() {
            return {
                form: {
                    name: '',
                    money: '',
                    message: ''
                },
                delivery: false,
            }
        },
        methods: {
            addshop() {
                if (this.form.name !== '' && this.form.money !== '' && this.form.message !== '') {
                    return this.$confirm("确定要添加该餐品吗？")
                        .then((_) => {
                            this.$store.commit("addshop", this.form);
                            this.form.name = this.form.money = this.form.message = ''
                            this.$message({
                                type: "success",
                                message: "添加成功!",
                            })
                        })
                        .catch((err) => { err })
                } this.$message({
                    message: "请正确输入餐品信息",
                    type: "warning",
                })

            }
        }
    }
</script>

<style scoped lang="less">
    .el-form {
        margin: 2%;
    }
</style>