import Vue from "vue";
import Router from "vue-router";

import vMain from "../pages/main.vue";

import vIndex from "../pages/index/index.vue";
import vGoods from "../pages/goods/goods.vue";

import vOrder from "../pages/order/order.vue";
import vOrderAdd from "../pages/order/orderAdd.vue";
import vOrderDetail from "../pages/order/orderDetail.vue";
import vOrderEdit from "../pages/order/orderEdit.vue";

import vCustomer from "../pages/customer/customer.vue";
import vCustomerAdd from "../pages/customer/customerAdd.vue";
import vCustomerDetail from "../pages/customer/customerDetail.vue";
import vCustomerEdit from "../pages/customer/customerEdit.vue";

import vReport from "../pages/report/report.vue";

import vDelivery from "../pages/deliveryNote/deliveryNote.vue";
import vDeliveryDetail from "../pages/deliveryNote/deliveryDetail.vue";

import {Indicator} from 'mint-ui';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            component: vMain,
            children: [
                {path: "/", component: vIndex},
                {path: "goods", component: vGoods},
                {path: "order", component: vOrder},
                {path: "customer", component: vCustomer},
                {path: "customer/detail/:customer_id", component: vCustomerDetail},
                {path: "report", component: vReport}
            ]
        },

        {path: "/customer/add", component: vCustomerAdd},
        {path: "/customer/edit/:customer_id", component: vCustomerEdit},

        {path: "/order/add", component: vOrderAdd},
        {path: "/order/detail/:order_id", component: vOrderDetail},
        {path: "/order/edit/:order_id", component: vOrderEdit},

        {path: "/delivery", component: vDelivery},
        {path: "/delivery/detail/:order_id", component: vDeliveryDetail},
    ]
});

//监听路由，跳转时打开loading
router.afterEach(() => {
    Indicator.open();
});

export default router;