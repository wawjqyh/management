<template>
    <div class="order">
        <div class="searchRow">
            <span>
                <span>日期：</span>
                <span v-show="dateClass == 'all'">全部</span>
                <span v-show="dateClass == 'someday'">{{postData.startTime}}</span>
                <span v-show="dateClass == 'days'">{{postData.startTime}} — {{postData.endTime}}</span>
            </span>
            <span class="screenBtn" @click="filterBoxState = true"><i class="fa fa-filter"></i> 筛选</span>
        </div>

        <div class="filter" v-show="filterBoxState">
            <div class="row" :class="{active: dateClass == 'all'}" @click="selectAll">全部</div>
            <div class="dataRow1" :class="{active: dateClass == 'someday'}">
                <v-date-picker v-model="pickerDate1" :option="pickerOption1"></v-date-picker>
            </div>
            <div class="dataRow2" :class="{active: dateClass == 'days'}">
                <v-date-picker v-model="pickerDate2" :option="pickerOption2"></v-date-picker>
                <span class="line">-</span>
                <v-date-picker v-model="pickerDate3" :option="pickerOption3"></v-date-picker>
            </div>

            <a href="javascript:void(0)" class="closeFilter" @click="filterBoxState = false">确定</a>
        </div>

        <div class="listCon">
            <v-scroll :canLoad="canLoad" :loading="loading" @loadMore="loadMore">
                <ul class="list">
                    <li v-for="order in orderList">
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
            </v-scroll>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";

    import vDatePicker from "../../components/vue-datepicker.vue";
    import vScroll from "../../components/scroll.vue";

    export default {
        data(){
            let option = {
                type: "day",
                week: ["一", "二", "三", "四", "五", "六", "日"],
                month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                format: "YYYY-MM-DD",
                placeholder: "",
                inputStyle: {},
                buttons: {
                    ok: "确定",
                    cancel: "取消"
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // as true as default
            };
            let option1 = Object.assign({}, option);
            let option2 = Object.assign({}, option);
            let option3 = Object.assign({}, option);

            option1.placeholder = "选择指定日期";
            option2.placeholder = "选择开始日期";
            option3.placeholder = "选择结束日期";

            return {
                canLoad: true,                      //是否可加载数据，防止重复加载
                loading: false,                     //是否正在加载中
                orderList: [],                      //订单列表
                dateClass: "all",                   //已选中的日期类型
                filterDate: [],                     //日期
                filterBoxState: false,              //选择日期弹框状态

                postData: {
                    page: 1,
                    pageSize: 10,
                    startTime: "",
                    endTime: ""
                },

                pickerDate1: "",                    //日期插件配置
                pickerDate2: "",
                pickerDate3: "",
                pickerOption1: option1,
                pickerOption2: option2,
                pickerOption3: option3
            }
        },

        watch: {
            pickerDate1(val){
                let self = this;

                if (val !== "") {
                    self.postData.page = 1;
                    self.pickerDate2 = "";
                    self.pickerDate3 = "";
                    self.dateClass = "someday";
                    self.postData.startTime = val;
                    self.postData.endTime = val;

                    self.loadData();
                }
            },

            pickerDate2(val){
                let self = this;

                if (val !== "") {
                    self.postData.page = 1;
                    self.pickerDate1 = "";
                    self.dateClass = "days";
                    self.postData.startTime = self.pickerDate2;
                    self.postData.endTime = self.pickerDate3;

                    self.loadData();
                }
            },

            pickerDate3(val){
                let self = this;

                if (val !== "") {
                    self.postData.page = 1;
                    self.pickerDate1 = "";
                    self.dateClass = "days";
                    self.postData.startTime = self.pickerDate2;
                    self.postData.endTime = self.pickerDate3;

                    self.loadData();
                }
            }
        },

        components: {
            vScroll,
            vDatePicker
        },

        methods: {
            //筛选日期选择全部
            selectAll(){
                let self = this;
                self.dateClass = "all";
                self.postData.startTime = "";
                self.postData.endTime = "";
                self.pickerDate1 = "";
                self.pickerDate2 = "";
                self.pickerDate3 = "";
                self.postData.page = 1;

                self.loadData();
            },

            loadMore(){
                this.postData.page++;
                this.loadData();
            },

            loadData(){
                let self = this;

                self.loading = true;
                self.canLoad = false;

                axios.post(api.orderList, self.postData)
                    .then(function (res) {
                        self.loading = false;

                        if (res.data.code === 1) {
                            //如果当前页码为1则为第一次加载，覆盖原有的数据。如果为加载更多则追加数据
                            if (self.postData.page === 1) {
                                self.orderList = res.data.data;
                            } else {
                                self.orderList = self.orderList.concat(res.data.data);
                            }

                            if (res.data.data.length >= self.postData.pageSize) {
                                self.canLoad = true;
                            }
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => {
                        self.loading = false;
                        console.log("获取客户列表失败：");
                        console.log(err);
                    });
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    @import "../../common/less/common";

    .order {
        .searchRow {
            padding: 0.15rem 0.3rem;
            background-color: @mainColor;
            box-sizing: border-box;
            height: 0.8rem;
            line-height: 0.5rem;
            color: #fff;
            font-size: 0.24rem;

            .screenBtn {
                position: absolute;
                color: #fff;
                height: 0.8rem;
                line-height: 0.8rem;
                top: 0;
                right: 0;
                text-align: center;
                width: 1.5rem;
                font-size: 0.3rem;
            }
        }

        .filter {
            position: absolute;
            width: 100%;
            top: 0.8rem;
            bottom: 0.9rem;
            background-color: #fff;
            z-index: 10;

            .row {
                height: 0.7rem;
                line-height: 0.7rem;
                text-align: center;
                padding: 0.1rem 0.3rem;
            }

            .dataRow1 {
                height: 0.7rem;
                padding: 0.1rem 0.3rem;

                .cov-vue-date {
                    display: block;
                }

                .cov-datepicker {
                    box-sizing: border-box;
                    background: none;
                    border: 1px solid #eee;
                    height: 0.7rem;
                    border-radius: 0.2rem;
                    text-align: center;
                    display: block;
                    width: 100%;
                }
            }

            .dataRow2 {
                height: 0.7rem;
                padding: 0.1rem 0.3rem;
                display: flex;
                justify-content: space-between;

                .line {
                    line-height: 0.7rem;
                }

                .cov-datepicker {
                    box-sizing: border-box;
                    background: none;
                    border: 1px solid #eee;
                    height: 0.7rem;
                    border-radius: 0.2rem;
                    text-align: center;
                    display: block;
                    width: 3.2rem;
                }
            }

            .active {
                color: #FFB97C;

                .cov-datepicker {
                    border: 1px solid #FFB97C;
                    color: #FFB97C;
                }

                .cov-datepicker::placeholder {
                    color: #FFB97C;
                }
            }

            .closeFilter {
                margin: 0.5rem 0.3rem 0 0.3rem;
                height: 0.9rem;
                display: block;
                background-color: @mainColor;
                color: #fff;
                border-radius: 0.2rem;
                text-align: center;
                line-height: 0.9rem;
            }
        }

        .listCon {
            position: absolute;
            top: 0.8rem;
            bottom: 0.9rem;
            left: 0;
            width: 100%;
            background-color: #f3f3f3;
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
                color: #f00;
            }
        }
    }
</style>