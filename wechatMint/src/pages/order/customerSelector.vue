<template>
    <div class="selectCustomer" v-show="visible">
        <div class="searchRow">
            <input type="text" placeholder="搜索" v-model="search">
            <span class="fa fa-search"></span>
        </div>

        <ul class="customerList">
            <li v-for="item in customerList" v-show="checkCustomer(item)">
                <div class="nameRow">
                    <span class="customerName">{{item.username}}</span>
                    <span class="phone">{{item.phone}}</span>
                </div>
                <div class="address">
                    {{item.province}}-{{item.city}}-{{item.district}}
                </div>

                <label>
                    <input type="radio" class="radio" name="customer" v-model="selected" :value="item">
                </label>
            </li>
        </ul>

        <ul class="toolBtn">
            <router-link to="/customer/add" tag="li">新增<br>客户</router-link>
        </ul>

        <a href="javascript:void(0)" class="confirmBtn" @click="confirm">确定</a>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default{
        props: ["visible", "value"],

        data(){
            return {
                search: "",
                selected: {}
            }
        },

        computed: {
            //客户列表
            ...mapState({
                customerList: state => state.customer
            })
        },

        methods: {
            ...mapActions(["getCustomer"]),

            //根据搜索条件过滤
            checkCustomer(item){
                let self = this;
                let reg = new RegExp(self.search, "g");

                return reg.test(item.username) || reg.test(item.phone) || reg.test(item.province) || reg.test(item.city) || reg.test(item.district);
            },

            confirm(){
                this.$emit("update:visible", false);
                this.$emit("input", this.selected);
            }
        },

        mounted(){
            this.getCustomer({});
        }
    }
</script>

<style lang="less">
    .selectCustomer {
        position: fixed;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        left: 0;
        overflow: auto;
        padding: 0.8rem 0;
        z-index: 9999;
        background-color: #fff;

        .searchRow {
            padding: 0.15rem 0.3rem;
            background-color: #31bfcf;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            box-sizing: border-box;

            input {
                display: block;
                border: 1px solid #fff;
                background: none;
                color: #fff;
                width: 100%;
                box-sizing: border-box;
                height: 0.5rem;
                border-radius: 0.3rem;
                padding-left: 0.6rem;
            }

            input::placeholder {
                color: #fff;
            }

            .fa-search {
                color: #fff;
                position: absolute;
                top: 0.26rem;
                left: 0.48rem;
            }
        }

        .customerList {
            padding: 0 0.2rem;

            li {
                border-bottom: 1px solid #eee;
                padding: 0.2rem 1rem 0.1rem 0;
                position: relative;
            }

            .nameRow {
                line-height: 0.4rem;
                font-size: 0.3rem;

                .phone {
                    float: right;
                    font-size: 0.24rem;
                }
            }

            .address {
                color: #999;
                font-size: 0.24rem;
                line-height: 0.5rem;
            }

            label {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            .radio {
                position: absolute;
                width: 0.3rem;
                height: 0.3rem;
                -webkit-appearance: none;
                border: 2px solid #31bfcf;
                border-radius: 50%;
                top: 0.4rem;
                right: 0;
                outline: none;
            }

            .radio:checked {
                background-color: #31bfcf;
            }
        }

        .confirmBtn {
            position: absolute;
            width: 100%;
            height: 0.8rem;
            left: 0;
            bottom: 0;
            background-color: #31bfcf;
            line-height: 0.8rem;
            color: #fff;
            text-align: center;
        }

        .toolBtn {
            position: absolute;
            bottom: 1rem;
            right: 0.3rem;

            li {
                width: 1rem;
                height: 1rem;
                color: #fff;
                margin-bottom: 0.2rem;
                background-color: #31bfcf;
                border-radius: 50%;
                font-size: 0.24rem;
                text-align: center;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                line-height: 0.3rem;
            }
        }
    }
</style>