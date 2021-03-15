<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="常住地址">
            <el-select v-model="form.region" placeholder="请选择常住地址">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生日">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="信息可见">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="用户喜好">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/网红零食" name="type"></el-checkbox>
                <el-checkbox label="优质穿搭" name="type"></el-checkbox>
                <el-checkbox label="可爱玩偶" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
                <el-radio label="球鞋/手账/盲盒"></el-radio>
                <el-radio label="线下剧本杀/密室逃脱"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped lang="less">
    .el-form{
        margin: 2%;
    }
</style>