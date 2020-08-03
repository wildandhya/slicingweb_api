const connection = require("../configs/dbMysql");

const historyModel = {
    incomeByYear: () => {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT YEAR(date) AS year, SUM(price) AS "This Year Income" FROM product JOIN history ON product.id = history.menu_id GROUP BY YEAR(date)`;
            connection.query(queryString, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        });
    },
    showHistory: () => {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT history.invoices, history.cashier, DATE_FORMAT(history.date, '%d-%M-%Y') AS date, product.menu, SUM(price) AS amount FROM history JOIN product ON history.menu_id = product.id GROUP BY history.invoices`;
            connection.query(queryString, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        });
    },
    totalOrderByWeek: () => {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT COUNT(invoices) AS 'Order This Week' FROM history 
            WHERE YEARWEEK(date) = YEARWEEK(NOW())
            GROUP BY YEARWEEK(date)`;
            connection.query(queryString, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        });
    },
    todayIncome: () => {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT SUM(price) AS 'Today Incomes' FROM history JOIN product ON history.menu_id = product.id WHERE history.date = DATE(NOW()) GROUP BY history.date`;
            connection.query(queryString, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        });
    },
    revenueByMonth: () => {
        return new Promise((resolve, reject) => {
            const queryString = `SELECT MONTH(date) AS Month, SUM(price-cost) AS Revenue FROM history JOIN product ON history.menu_id = product.id GROUP BY YEAR(date), MONTH(date)`;
            connection.query(queryString, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        });
    },


}

module.exports = historyModel;