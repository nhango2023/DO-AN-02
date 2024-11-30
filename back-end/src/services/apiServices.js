import pool from "../configs/DBConnect";
import { createJwt } from "../middleware/jwt"
// import { v4 as uuidv4 } from 'uuid';
require('dotenv');
// import { getDate } from "../utils/function"

const ReadProduct = async (page) => {
    const conn = await pool.getConnection();
    try {
        let limit = 5;
        let offset = (page - 1) * limit;
        let sql = 'select count(*) as totalrow from product';
        const [totalrow, row] = await conn.query(sql);
        const totalRecord = totalrow[0].totalrow;
        const totalPages = Math.ceil(totalRecord / limit);
        sql = `select DISTINCT product.idproduct, 
        product.productname,COUNT(category_product.idproduct) as numbercategory, 
        sum(inventory_product.quanlity) as quanlity from product 
        left join inventory_product on product.idproduct = inventory_product.idproduct 
        left join category_product on product.idproduct = category_product.idproduct
        left join category on category_product.idcategory = category.idcategory
        group by product.idproduct, product.productname
        LIMIT ? OFFSET ?
        `
        let [results] = await conn.query(sql, [limit, offset]);
        for (const item of results) {
            if (item.quanlity === null) {
                item.quanlity = 0;
            }
        }

        return {
            data: {
                data: [...results],
                total: {
                    totalPages,
                    totalRecords: totalRecord
                }
            },
            message: 'Read product successfully',
            errorCode: 0
        }
    }
    catch (e) {
        console.log(e);
        return {
            data: null,
            message: 'Server is error',
            errorCode: -1
        }
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const ReadProductDetail = async (idProduct) => {
    let transformedData;
    const conn = await pool.getConnection();
    try {
        let sql = `select DISTINCT product.productname, inventory.idinventory,inventory.inventoryname, inventory_product.quanlity, inventory.capacity, category.idcategory,category.categoryname 
    from product 
    left join inventory_product on inventory_product.IDproduct=product.IDproduct
    left join inventory on inventory.idinventory = inventory_product.idinventory
    left join category_product on product.IDproduct = category_product.IDproduct
    left join category on category.IDcategory = category_product.IDcategory 
    where product.IDproduct='${idProduct}'`;
        let [results] = await conn.query(sql);
        transformedData = results.reduce((acc, curr) => {
            if (!acc.productname) {
                acc.productname = curr.productname;
            }

            // Add inventory items if not already included
            if (!acc.inventory.some(inv => inv.idinventory === curr.idinventory)) {
                acc.inventory.push({
                    idinventory: curr.idinventory,
                    inventoryname: curr.inventoryname,
                    capacity: curr.capacity,
                    quanlity: curr.quanlity
                });
            }

            // Add category items if not already included
            if (!acc.category.some(cat => cat.idcategory === curr.idcategory)) {
                acc.category.push({
                    idcategory: curr.idcategory,
                    categoryname: curr.categoryname
                });
            }

            return acc;
        }, { productname: '', inventory: [], category: [] });
    }
    catch (e) {
        console.log(e);
    }
    finally {
        pool.releaseConnection(conn);
    }

    return transformedData;
}
const ReadCategory = async () => {
    const conn = await pool.getConnection();
    try {
        let sql = `select * from category`;
        let [results] = await conn.query(sql);
        return results;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const ReadInventory = async () => {
    const conn = await pool.getConnection();
    try {
        let sql = `select inventory.idinventory, inventory.inventoryname, inventory.capacity, SUM(inventory_product.quanlity) as occupying from inventory 
        left join inventory_product on inventory_product.idinventory = inventory.idinventory
        group by inventory.idinventory, inventory.inventoryname, inventory.capacity`;
        let [results] = await conn.query(sql);
        for (const item of results) {
            if (item.occupying === null) {
                item.occupying = 0;
            }
        }
        return results;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        pool.releaseConnection(conn)
    }
}

const UpdateProduct = async (data) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        if (data.changename === true) {
            let sql = `update product set productname = ?
            where idproduct=?`
            await conn.query(sql, [data.productname, data.idproduct]);
        }
        for (const item of data.inventory) {
            if (item.change !== 'NoChange') {
                let sql;
                if (item.change === 'Update') {
                    sql = `update inventory_product 
                    set quanlity=? 
                    where idinventory=? and idproduct = ?
                    `
                    await conn.query(sql, [item.quanlity, item.idinventory, data.idproduct]);
                }
                else if (item.change === 'Insert') {
                    sql = `INSERT INTO inventory_product (idproduct, idinventory, quanlity)
                    VALUES (?, ?, ?)
                    `
                    await conn.query(sql, [data.idproduct, item.idinventory, item.quanlity]);
                } else {
                    sql = `DELETE FROM inventory_product WHERE 
                     idproduct = ? and idinventory=?
                    `
                    await conn.query(sql, [data.idproduct, item.idinventory]);
                }

            }

        }
        for (const item of data.category) {
            if (item.change !== 'NoChange') {
                let sql
                if (item.change === 'Delete') {
                    sql = `DELETE FROM category_product WHERE 
                     idproduct = ? and idcategory=?
                    `
                }
                else {
                    sql = `INSERT INTO category_product (idproduct, idcategory)
                    VALUES (?,?)
                    `
                }
                await conn.query(sql, [data.idproduct, item.idcategory]);
            }

        }
        await conn.commit();
        return {
            data: null,
            message: 'Update successfully',
            errorCode: 0
        }
    }
    catch (e) {
        await conn.rollback();
        console.log(e);
        return {
            data: null,
            message: 'Server is error',
            errorCode: -1
        }
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const CreateProduct = async (data) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        let sql = '';
        sql = `insert into product (idproduct, productname)
        values(?, ?)`
        await conn.query(sql, [data.idproduct, data.productname]);
        for (const item of data.inventory) {
            if (item.quanlity !== 0) {
                sql = `insert into inventory_product (idproduct, idinventory, quanlity)
                        values(?, ?, ?)`;
                await conn.query(sql, [data.idproduct, item.idinventory, item.quanlity]);
            }
        }
        for (const item of data.category) {
            if (item.checked === true) {
                sql = `insert into category_product (idproduct, idcategory)
                        values(?, ?)`;
                await conn.query(sql, [data.idproduct, item.idcategory]);
            }
        }
        await conn.commit();
        return {
            data: null,
            message: 'Create successfully',
            errorCode: 0
        }
    }
    catch (e) {
        await conn.rollback();
        console.log(e);
        return {
            data: null,
            message: 'Server is error',
            errorCode: -1
        }
    }
    finally {
        pool.releaseConnection(conn);
    }
}


const DeleteProduct = async (idProduct) => {
    const conn = await pool.getConnection();
    try {
        let sql = '';
        await conn.beginTransaction();
        sql = 'delete from inventory_product where idproduct=?';
        await conn.query(sql, idProduct);
        sql = 'delete from category_product where idproduct=?';
        await conn.query(sql, idProduct);
        sql = 'delete from product where idproduct=?';
        await conn.query(sql, idProduct);
        await conn.commit();
        return {
            data: null,
            message: 'Delete successfully',
            errorCode: 0
        }
    }
    catch (e) {
        console.log(e);
        return {
            data: null,
            message: 'Server is error',
            errorCode: -1
        }
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const Login = async (data) => {
    const conn = await pool.getConnection();
    try {
        let sql = '';
        sql = `select users.email,users.iduser,users.username, roles.url, groups.groupname from users left JOIN groups on groups.idgroup = users.idgroup
            left join group_role on group_role.idgroup = groups.idgroup
            left join roles ON roles.idrole = group_role.idrole
            where users.email=? and users.password=?`
        let [user] = await conn.query(sql, [data.email, data.password]);
        if (user.length !== 0) {
            let data = {
                iduser: user[0].iduser,
                email: user[0].email,
                username: user[0].username,
                groupname: user[0].groupname,
                roles: []
            }
            if (user[0].url === null) {
                data.roles = null
            } else {
                user.forEach(element => {
                    data.roles.push(element.url);
                });
            }
            let payload = { ...data, expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN_COOKIES };
            let token = createJwt(payload);
            // let refreshToken = uuidv4();
            // let date = getDate();
            // sql = `update users set refreshtoken = ?,  createat=?
            // where iduser = ?`
            // await conn.query(sql, [refreshToken, date, user[0].iduser]);
            return {
                data: {
                    ...data,
                    accessToken: token,

                },
                message: 'Login successfully',
                errorCode: 0
            }
        } else {
            return {
                data: null,
                message: 'Email or password is not correct',
                errorCode: -1
            }
        }

    }
    catch (e) {
        console.log(e);
        return {
            data: null,
            message: 'Server is error',
            errorCode: -1
        }
    }
    finally {
        pool.releaseConnection(conn);
    }
}


module.exports = {
    ReadProduct,
    ReadProductDetail,
    ReadCategory,
    ReadInventory,
    UpdateProduct,
    CreateProduct,
    DeleteProduct,
    Login
}