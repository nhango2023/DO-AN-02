import { map } from "lodash";
import pool from "../configs/DBConnect";


const layThongTinNhaTro = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let tentro = req.query.tentro;
        let machutro = req.query.machutro;
        let sql = "CALL sp_GetNhaTroAndPhongCount(?, ?)";
        let [results] = await conn.query(sql, [tentro, machutro]);
        return res.status(200).json({
            data: results[0],
            message: "lay thong tin tro thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongTinNhaTroFilter = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let machutro = req.query.machutro;
        let sql = "select manhatro, tennhatro from nhatro where idnguoidung=?";
        let [results] = await conn.query(sql, [machutro]);
        return res.status(200).json({
            data: results,
            message: "lay thong tin tro cho filter thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongTinPhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let machutro = req.query.machutro;

        let maphong = req.query.maphong == "" ? null : req.query.maphong;
        let manhatro = req.query.manhatro == "" ? null : req.query.manhatro;
        let sql = "CALL sp_GetRoomInfo(?, ?, ?)";

        let [results] = await conn.query(sql, [maphong, manhatro, machutro]);

        return res.status(200).json({
            data: results[0],
            message: "lay thong tin tro cho filter thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongTinNguoiThuePhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let machutro = req.query.machutro;
        let maphong = req.query.maphong == "" ? null : req.query.maphong;
        let manhatro = req.query.manhatro == "" ? null : req.query.manhatro;
        let tennguoithuephong = req.query.tennguoithuephong == "" ? null : req.query.tennguoithuephong;
        let sql = "CALL sp_GetRentersInfor(?, ?, ?, ?)";

        let [results] = await conn.query(sql, [machutro, tennguoithuephong, manhatro, maphong]);

        return res.status(200).json({
            data: results[0],
            message: "lay thong tin tro cho filter thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongTinPhongToFilter = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let manhatro = req.query.manhatro == "" ? null : req.query.manhatro;
        let machutro = req.query.machutro == "" ? null : req.query.machutro;
        let sql = "CAll sp_GetPhongInfoToFilter(?, ?)";
        let [results] = await conn.query(sql, [manhatro, machutro]);
        return res.status(200).json({
            data: results[0],
            message: "lay thong tin tro cho filter thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongTinDichVuThuePhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let maphong = req.query.maphong;
        let manhatro = req.query.manhatro;
        let sql = "CAll sp_LayGiaPhong(?, ?)";
        let [results] = await conn.query(sql, [maphong, manhatro]);
        return res.status(200).json({
            data: results[0],
            message: "lay thong tin tien thue phong thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongChiSoCu = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let maphong = req.query.maphong;
        let manhatro = req.query.manhatro;
        let ngayghi = req.query.ngayghi;

        let sql = "CAll sp_ChiSoCu(?, ?, ?)";
        let [results] = await conn.query(sql, [manhatro, maphong, ngayghi]);
        return res.status(200).json({
            data: results[0],
            message: "lay thong tin chi so cu thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const taoHoaDon = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = req.body;
        let dv1 = data[0];
        let dv2 = data[1];
        let thongTinBoSung = data[2];
        let sql = `CALL sp_CreateInvoiceAndDetails(?, ?, ?, ?, 
        ?, ?, ?, ?,?, ?, ?)`;
        let [results] = await conn.query(sql, [thongTinBoSung.maphong, thongTinBoSung.manhatro,
        thongTinBoSung.mahd, +thongTinBoSung.tongtien, thongTinBoSung.ngayghi,
        dv1.madv, +dv1.chisomoi, +dv1.soluongdasudung,
        dv2.madv, +dv2.chisomoi, +dv2.soluongdasudung,]);
        return res.status(200).json({
            data: "",
            message: "tao hoa don thanh cong",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const taoNguoiDung = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = req.body;
        let sql = `CALL ThemNguoiDung(?,?,?,?,?,?,?,@result)`;
        await conn.query(sql, [data.idnguoidung, data.maloainguoidung, data.matkhau,
        data.hoten, data.sodienthoai, data.anhdaidien, data.taikhoan
        ]);
        let [resultRow] = await conn.query(`SELECT @result AS result`);
        let result = resultRow[0].result;
        return res.status(200).json({
            data: result,
            message: "",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const taoNhaTro = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = req.body;
        let sql = `CALL ThemNhaTro(?,?,?,?,?,?,?,?)`;
        await conn.query(sql, [data.manhatro, data.idnguoidung, data.tennhatro
            , data.diadiem, data.ngaytao, data.chieudai, data.chieurong, data.anhdaidien
        ]);
        return res.status(200).json({
            data: "",
            message: "",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const taoPhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = req.body;
        let sql = `CALL ThemPhong(?,?,?,?,?,?,?,?,?,?,?,?, @result)`;
        await conn.query(sql, [data.manhatro, data.maphong, data.mota,
        data.chieudai, data.chieurong, data.ngaytao, data.madv1, data.giadv1,
        data.madv2, data.giadv2,
        data.madv3, data.giadv3
        ]);
        let [resultRow] = await conn.query(`SELECT @result AS result`);
        let result = resultRow[0].result;

        return res.status(200).json({
            data: result,
            message: "",
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

module.exports = {
    layThongTinNhaTro,
    layThongTinNhaTroFilter,
    layThongTinPhong,
    layThongTinNguoiThuePhong,
    layThongTinPhongToFilter,
    layThongTinDichVuThuePhong,
    layThongChiSoCu,
    taoHoaDon,
    taoNguoiDung,
    taoNhaTro,
    taoPhong,
}

// const ReadProduct = async (req, res) => {
//     try {
//         let page = req.query.page;
//         let data = await apiServices.ReadProduct(page);
//         return res.status(200).json({
//             data: data.data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }


// const ReadCategory = async (req, res) => {
//     try {
//         let data = await apiServices.ReadCategory();
//         return res.status(200).json({
//             data: data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }


// const ReadInventory = async (req, res) => {
//     try {
//         let data = await apiServices.ReadInventory();
//         return res.status(200).json({
//             data: data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// const ReadProductDetail = async (req, res) => {
//     try {
//         let idProduct = req.query.idproduct;
//         let data = await apiServices.ReadProductDetail(idProduct);

//         return res.status(200).json({
//             data: data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }


// const UpdateProduct = async (req, res) => {
//     try {
//         let data = await apiServices.UpdateProduct(req.body);
//         return res.status(200).json({
//             data: data.data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }


// const CreateProduct = async (req, res) => {
//     try {
//         let data = await apiServices.CreateProduct(req.body);
//         return res.status(200).json({
//             data: data.data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// const DeleteProduct = async (req, res) => {
//     try {
//         let idProduct = req.query.idproduct;
//         let data = await apiServices.DeleteProduct(idProduct);
//         return res.status(200).json({
//             data: data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// const Login = async (req, res) => {
//     try {
//         let user = req.body;
//         let data = await apiServices.Login(user);
//         if (data.data !== null) {
//             res.cookie("accessToken", data.data.accessToken, { httpOnly: true, maxAge: process.env.COOKIE_MAXAGE });
//             // res.cookie("refreshToken", data.data.refreshToken, { httpOnly: true });
//         }
//         return res.status(200).json({
//             data: data.data,
//             message: data.message,
//             errorCode: data.errorCode,
//         })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }


// module.exports = {
//     ReadProduct,
//     ReadProductDetail,
//     ReadCategory,
//     ReadInventory,
//     UpdateProduct,
//     CreateProduct,
//     DeleteProduct,
//     Login,
//     layThongTinNhaTro
// }