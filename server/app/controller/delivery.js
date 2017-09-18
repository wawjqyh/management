let sql = require("../util/pool");

let main = {};

main.delivery = async function (ctx, next) {
    try {
        let connection = await sql.pool();

        let deliverySql = `
            SELECT orders.id, order_id, deliver_date, delivery_address, delivery_state, order_date, total_money, customer_id, username, phone 
            FROM orders 
            LEFT JOIN customer ON orders.customer_id = customer.id 
            WHERE delivery_state = 0 
            ORDER BY order_id DESC 
        `;

        let orderSql = `
            SELECT orders.id, order_id, deliver_date, delivery_address, delivery_state, order_date, total_money, customer_id, username, phone 
            FROM orders 
            LEFT JOIN customer ON orders.customer_id = customer.id 
            ORDER BY order_id DESC 
            LIMIT 0,20
        `;

        //操作数据库
        let sqlData = await Promise.all([
            sql.operate(deliverySql, connection),
            sql.operate(orderSql, connection)
        ]);

        connection.release();

        ctx.body = {
            code: 1,
            mes: "success",
            data: {
                onDelivery: sqlData[0],
                record: sqlData[1]
            }
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            code: 0,
            mes: "操作失败"
        }
    }
};

module.exports = main;