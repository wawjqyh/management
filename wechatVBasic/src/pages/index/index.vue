<template>
    <div class="index">
        <div class="baseMes">
            <img class="bg" src="./1_1.jpg">

            <div class="con">
                <div class="now"><span class="month">{{month}}</span> / {{year}}</div>

                <div class="saleMoney">
                    <span>本月销售额</span>
                    <span class="num">￥{{statistics.totalMoney}}</span>
                </div>

                <div class="saleNum">
                    <h3>本月销量</h3>

                    <div class="numItem" v-for="item in statistics.sales">
                        <span>{{item.name}}</span>
                        <span class="num">{{item.num}}</span>
                    </div>
                </div>
            </div>

            <router-link to="/orderAdd" class="orderBtn">开单</router-link>
        </div>

        <div class="orderTitle"><span class="fa fa-file-text-o"></span> 最近订单</div>

        <ul class="list">
            <li v-for="order in orders">
                <router-link :to="'/orderDetail/' + order.order_id">
                    <div class="orderTime">
                        <span>下单时间：{{order.order_date}}</span>
                        <span v-if="order.delivery_state == 0" class="deliveryState">未发货</span>
                    </div>
                    <div class="customerMes">
                        <span class="name">{{order.username}}</span>
                        <span class="phone">{{order.phone}}</span>
                    </div>
                    <div>
                        <span class="deliveryAddress">送货地址：{{order.delivery_address}}</span>
                        <span class="money">合计：￥{{order.total_money}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";

    export default {
        data(){
            let now = new Date();

            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                orders: [],
                statistics: {}
            }
        },

        methods: {
            //获取首页数据
            getData(){
                let self = this;

                axios.get(api.index)
                    .then(res => {
                        if (res.data.code === 1) {
                            self.orders = res.data.data.orders;
                            self.statistics = res.data.data.statistics;
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => {
                        console.log("获取首页数据失败");
                        console.log(err);
                    })
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "../../common/less/common";

    .index {
        padding-bottom: 0.9rem;
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        background-color: #f5f5f5;

        .baseMes {
            position: relative;
            overflow: hidden;
            height: 4rem;
            color: #fff;

            .orderBtn {
                position: absolute;
                width: 2rem;
                height: 0.9rem;
                border-radius: 0.2rem;
                border: 1px solid #fff;
                right: 0.5rem;
                bottom: 0.5rem;
                line-height: 0.9rem;
                text-align: center;
                font-size: 0.4rem;
            }

            .bg {
                position: absolute;
                width: 110%;
                top: -5%;
                left: -5%;
                filter: blur(0.2rem);
            }

            .con {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                box-sizing: border-box;
                padding-left: 0.5rem;
            }

            .now {
                margin-top: 0.3rem;
                font-weight: bold;
            }

            .month {
                font-size: 0.4rem;
                color: #e14c0d;
            }

            .saleMoney {
                margin-top: 0.1rem;
                width: 3.5rem;
            }

            .num {
                float: right;
            }

            .saleNum {
                margin-top: 0.4rem;
                width: 3.5rem;

                h3 {
                    font-weight: normal;
                }
            }

            .numItem {
                padding: 0.1rem 0;
            }
        }

        .orderTitle {
            height: 0.8rem;
            border-bottom: 1px solid #eee;
            line-height: 0.8rem;
            padding-left: 0.3rem;
            background-color: #fff;
        }

        .list {
            li {
                padding: 0.2rem 0.3rem;
                background-color: #fff;
                margin-bottom: 0.2rem;

                a {
                    display: block;
                }
            }

            .orderTime {
                font-size: 0.24rem;
                border-bottom: 1px solid #eee;
                color: #999;
                line-height: 0.5rem;
            }

            .deliveryState {
                float: right;
                color: #f00;
            }

            .customerMes {
                height: 0.7rem;
                line-height: 0.7rem;

                .phone {
                    float: right;
                    font-size: 0.24rem;
                }
            }

            .deliveryAddress {
                font-size: 0.24rem;
                color: #999;
            }

            .money {
                float: right;
                color: #999;
            }
        }
    }
</style>