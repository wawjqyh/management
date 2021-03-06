let baseUrl = "/api";

export default {
    staffList: baseUrl + "/staff",
    jobList: baseUrl + "/staff/job",
    staffAdd: baseUrl + "/staff/add",
    staffDelete: baseUrl + "/staff/delete",
    staffDetail: baseUrl + "/staff/detail",
    staffUpdate: baseUrl + "/staff/update",

    category: baseUrl + "/goods/category",

    goodsList: baseUrl + "/goods",
    goodsAdd: baseUrl + "/goods/insert",
    goodsDelete: baseUrl + "/goods/delete",
    goodsDetail: baseUrl + "/goods/detail",
    goodsUpdate: baseUrl + "/goods/update",

    production: baseUrl + "/production",
    productionAdd: baseUrl + "/production/add",
    productionDelete: baseUrl + "/production/delete",
    productionDetail: baseUrl + "/production/detail",
    productionUpdate: baseUrl + "/production/update",

    order: baseUrl + "/order",
    orderDetail: baseUrl + "/order/detail",

    customerList: baseUrl + "/customer",
    customerDetail: baseUrl + "/customer/detail"
}