import pool from "../configs/DBConnect";
import bcrypt from "bcryptjs"
import jwk from "jsonwebtoken"
require('dotenv');

const pageSize = 8;

const createJwt = (payload) => {
    let token = null;
    try {
        token = jwk.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN });
    } catch (e) {
        console.log(e);
    }
    return token;
}

const verifyJwt = (token) => {
    let decoded = null;
    try {
        decoded = jwk.verify(token, process.env.JWT_KEY);

    } catch (e) {
        if (e.name == "TokenExpiredError") {
            return "TokenExpired";
        }
        console.log(e);
    }
    return decoded;
}

const xacThucNguoiDung = (req, res) => {
    try {
        let cookie = req.cookies;

        if (cookie && cookie.jwt) {
            let token = cookie.jwt;

            let decodedToken = verifyJwt(token);
            if (decodedToken && decodedToken !== "TokenExpired") {
                req.user = decodedToken;
                return res.status(200).json({
                    errorCode: 0,
                    data: null,
                    message: 'Xác thực thành công'
                })
            }
            else {
                return res.status(401).json({
                    errorCode: -2,
                    data: null,
                    message: 'Session hết hạn hoặc session rỗng'
                })
            }
        }
        else {
            return res.status(401).json({
                errorCode: -2,
                data: null,
                message: 'Session hết hạn hoặc session rỗng'
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            errorCode: -1,
            data: null,
            message: 'Server error'
        })
    }

}


const maHoaMatKhau = (matkhau) => {
    const salt = bcrypt.genSaltSync(10);
    let hashMatKhau = bcrypt.hashSync(matkhau, salt);
    return hashMatKhau;
}

const checkPassWord = (passWord, hashmatkhau) => {
    return bcrypt.compareSync(passWord, hashmatkhau);
}


const layThongTinNhaTro = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const { machutro, tentro, currentpage } = req.query;
        const pageSizeNum = pageSize; // Default to 10 records per page
        const pageNumberNum = parseInt(currentpage) || 1; // Default to page 1
        // Validate input
        const sql = `CALL LayNhaTro(?, ?, ?, ?);`;
        const [results] = await conn.query(sql, [
            machutro,
            tentro || null,
            pageSizeNum,
            pageNumberNum,
        ]);

        // Extract the data and total pages
        const data = results[0]; // Main query result
        const totalPages = data.length > 0 ? data[0].TotalPages : 0;
        return res.status(200).json({
            data: data,
            totalPages: totalPages,
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
        const {
            maphong,
            manhatro,
            machutro,
            songuoitrongphong,
            currentpage,
        } = req.query;
        const sql = `CALL LayPhong(?, ?, ?, ?, ?, ?)`;
        const [results] = await conn.query(sql, [
            maphong || null,
            manhatro || null,
            machutro,
            songuoitrongphong !== "" ? parseInt(songuoitrongphong, 10) : null,
            pageSize,
            parseInt(currentpage, 10),
        ]);

        const data = results[0];
        const totalPages = data.length > 0 ? data[0].TotalPages : 0;

        return res.status(200).json({
            data: data,
            totalPages: totalPages,
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
        const machutro = req.query.machutro;
        const ten = req.query.ten || null;
        const manhatro = req.query.manhatro || null;
        const maphong = req.query.maphong || null;
        const pageNumber = parseInt(req.query.currentpage, 10) || 1;
        const sql = "CALL LayNguoiThuePhong(?, ?, ?, ?, ?, ?)";
        const [results] = await conn.query(sql, [
            machutro,
            ten,
            manhatro,
            maphong,
            pageSize,
            pageNumber,
        ]);

        const data = results[0];
        const totalPages = data.length > 0 ? data[0].TotalPages : 0;

        return res.status(200).json({
            data: data,
            totalPages: totalPages,
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
        data.matkhau = maHoaMatKhau(data.matkhau);

        let sql = `CALL ThemNguoiDung(?,?,?,?,?,?,?,@result, @message)`;
        await conn.query(sql, [data.idnguoidung, data.maloainguoidung, data.matkhau,
        data.hoten, data.sodienthoai, data.anhdaidien, data.taikhoan
        ]);
        let [resultRow] = await conn.query(`SELECT @result AS result, @message AS message`);
        let result = resultRow[0].result;
        let message = resultRow[0].message;
        return res.status(200).json({
            data: result,
            message: message,
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

const themNguoiVaoPhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = req.body;
        data.matkhau = maHoaMatKhau(data.matkhau);
        let sql = `CALL ThemNguoiDungVaoPhong(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @result, @message);`;
        // Call the stored procedure
        await conn.query(sql, [
            data.idnguoidung,
            data.maloainguoidung,
            data.matkhau,
            data.hoten,
            data.sodienthoai,
            data.anhdaidien,
            data.taikhoan,
            data.manhatro,
            data.maphong,
            data.ngayvaophong
        ]);

        // Retrieve the output variables
        let [resultRows] = await conn.query(`SELECT @result AS result, @message AS message`);
        let result = resultRows[0].result;
        let message = resultRows[0].message;

        return res.status(200).json({
            data: result,
            message: message,
            errorCode: 0,
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            data: "",
            message: "Server error",
            errorCode: -1,
        })
    }
    finally {
        pool.releaseConnection(conn);
    }
}

const layThongTinHoaDon = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let machutro = req.query.machutro;
        let mahoadon = req.query.mahoadon === "" ? null : req.query.mahoadon;
        let manhatro = req.query.manhatro === "" ? null : req.query.manhatro;
        let maphong = req.query.maphong === "" ? null : req.query.maphong;
        let matrangthaihd = req.query.matrangthaihd === "" ? null : req.query.matrangthaihd;
        let ngaylaphd = req.query.ngaylaphoadon === "" ? null : req.query.ngaylaphoadon;
        let currentPage = parseInt(req.query.currentpage) || 1; // Current page
        // Rows per page

        let sql = `CALL LayHoaDon(?,?,?,?,?,?,?,?);`;

        let [results] = await conn.query(sql, [
            machutro,
            mahoadon,
            manhatro,
            maphong,
            ngaylaphd,
            matrangthaihd,
            currentPage,
            pageSize,
        ]);

        let data = results[0]; // Paginated data
        let totalRecords = results[1][0].TotalRecords; // Total record count
        let totalPages = Math.ceil(totalRecords / pageSize); // Calculate total pages

        return res.status(200).json({
            data: data,
            totalPages: totalPages,
            message: "Fetched records successfully",
            errorCode: 0,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        });
    } finally {
        pool.releaseConnection(conn);
    }
}


const loGin = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = req.body;
        let sql1 = `SELECT idnguoidung, matkhau FROM nguoidung WHERE taikhoan=?`;
        let [results] = await conn.query(sql1, [data.taikhoan]);
        let taikhoan = results[0];
        if (taikhoan) {
            if (checkPassWord(data.matkhau, taikhoan.matkhau)) {
                let sql2 = "select idnguoidung, maloainguoidung, hoten from nguoidung where idnguoidung=?";
                let [result] = await conn.query(sql2, [taikhoan.idnguoidung]);
                let cookie = createJwt(result[0]);
                res.cookie("jwt", cookie, { httpOnly: true, maxAge: process.env.COOKIE_MAXAGE });
                return res.status(200).json({
                    data: result[0],
                    message: "Đăng nhập thành công",
                    errorCode: 0,
                })
            };
        }

        return res.status(200).json({
            data: "",
            message: "Tài khoản hoặc mật khẩu không chính xác",
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

const logOut = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            data: "",
            message: "Log out thành công",
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

}

const SuaTrangThaiHoaDon = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let mahoadon = req.body.mahoadon;
        let matrangthaihd = req.body.matrangthaihd;
        let sql;
        if (matrangthaihd == "1") {
            sql = `UPDATE hoadon
            SET matrangthaihd = 2
            WHERE mahoadon=?;`;
        }
        else {
            sql = `UPDATE hoadon
            SET matrangthaihd = 1
            WHERE mahoadon=?;`;
        }

        await conn.query(sql, [mahoadon]);

        return res.status(200).json({
            data: "",
            message: "Sửa trạng thái hóa đơn thành công",
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

const LayDoanhThu = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let machutro = req.query.machutro;
        let manhatro = req.query.manhatro == "" ? null : req.query.manhatro;
        let nam = req.query.nam == "" ? null : req.query.nam;
        console.log(machutro, manhatro, nam)
        let sql = `CALL layDoanhThu(?,?,?);`;
        let [result] = await conn.query(sql, [machutro, nam, manhatro]);

        return res.status(200).json({
            data: result[0],
            message: "Lấy doanh thu thành công",
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

const SuaNhaTro = async (req, res) => {
    const conn = await pool.getConnection(); // Kết nối đến cơ sở dữ liệu
    try {
        // Lấy tham số từ query
        // SQL query to call the stored procedure
        const query = `
            CALL UpdateNhaTro(?, ?, ?, ?, ?, ?);
        `;
        let data = req.body;
        // Execute query with the parameters
        await conn.query(query, [data.manhatro, data.tennhatro,
        data.diadiem, data.chieudai, data.chieurong, data.ngaytao]);

        // Return the response with the result
        return res.status(200).json({
            data: [], // Dữ liệu từ stored procedure
            message: "Update thành công",
            errorCode: 0,
        });
    } catch (e) {
        console.error(e); // Ghi lỗi vào console
        // Trả về lỗi cho client
        return res.status(500).json({
            data: [],
            message: "Server error",
            errorCode: -1,
        });
    } finally {
        // Giải phóng kết nối cơ sở dữ liệu
        conn.release();
    }
};

const layThongTinNhaTroDeSua = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let manhatro = req.query.manhatro;
        let sql = "select * from nhatro where manhatro=?";
        let [results] = await conn.query(sql, [manhatro]);
        return res.status(200).json({
            data: results[0],
            message: "lay thong tin 1 tro thanh cong",
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

const layThongTinPhongDeSua = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const { manhatro, maphong } = req.query;

        let sql = "CALL layphongdesua(?, ?)";
        let [results] = await conn.query(sql, [manhatro, maphong]);
        return res.status(200).json({
            data: results[0][0],
            message: "lay thong tin thanh cong",
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

const layThongTinDichVuPhongDeSua = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const { manhatro, maphong } = req.query;
        let sql = "CALL laydichvuphongdesua(?, ?)";
        let [results] = await conn.query(sql, [manhatro, maphong]);
        return res.status(200).json({
            data: results[0],
            message: "lay thong tin thanh cong",
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

const SuaPhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let { maphongcu, manhatrocu, maphongmoi, manhatromoi,
            chieudai, chieurong, mota, ngaytao, madv1, giadv1,
            madv2, giadv2, madv3, giadv3
        } = req.body;
        let sql = `CALL CapNhatPhong(
        ?,         -- p_MaPhongCu
        ?,        -- p_MaNhaTroCu
        ?,         -- p_MaPhongMoi
        ?,        -- p_MaNhaTroMoi
        ?,            -- p_ChiềuDai
        ?,            -- p_ChiềuRong
        ?, -- p_MoTa
        ?,   -- p_NgayTao
        ?,         -- p_Madv1
        ?,         -- p_Giadv1
        ?,         -- p_Madv2
        ?,         -- p_Giadv2
        ?,         -- p_Madv3
        ?          -- p_Giadv3
    );
`;
        let [results] = await conn.query(sql, [
            maphongcu,
            manhatrocu,
            maphongmoi,
            manhatromoi,
            chieudai,
            chieurong,
            mota,
            ngaytao,
            madv1,
            giadv1,
            madv2,
            giadv2,
            madv3,
            giadv3
        ]);

        let message = results[0][0].Message;
        let result = results[0][0].Status;
        return res.status(200).json({
            data: result,
            message: message,
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

const layThongTinNguoiDungDeSua = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const { idnguoidung } = req.query;
        let sql = "CALL LayNguoiDungDeSua(?)";
        let [results] = await conn.query(sql, [idnguoidung]);
        return res.status(200).json({
            data: results[0][0],
            message: "lay thong tin thanh cong",
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

const SuaNguoiDung = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const { idnguoidung, hoten, sodienthoai, cccd } = req.body;
        let sql = "call SuaNguoiDung(?,?,?,?)";
        let [results] = await conn.query(sql, [idnguoidung, hoten, sodienthoai, cccd]);
        return res.status(200).json({
            data: "",
            message: "Sua thanh cong",
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

const XoaNguoiDung = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const idnguoidung = req.query.idnguoidung;
        let sql = "call XoaNguoiDung(?)";
        let [results] = await conn.query(sql, [idnguoidung]);
        let message = results[0][0].Message;
        let result = results[0][0].Status;
        return res.status(200).json({
            data: result,
            message: message,
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

const XoaHoaDon = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const mahoadon = req.query.mahoadon;
        let sql = "call XoaHoaDon(?)";
        let [results] = await conn.query(sql, [mahoadon]);
        let message = results[0][0].Message;
        let result = results[0][0].Result;
        return res.status(200).json({
            data: result,
            message: message,
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

const XoaPhong = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const maphong = req.query.maphong;
        const manhatro = req.query.manhatro;
        let sql = "CALL XoaPhong(?,?);";
        let [results] = await conn.query(sql, [manhatro, maphong]);
        let message = results[0][0].Message;
        let result = results[0][0].Result;
        return res.status(200).json({
            data: result,
            message: message,
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
const XoaNhaTro = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const manhatro = req.query.manhatro;
        let sql = "CALL XoaNhaTro(?);";
        let [results] = await conn.query(sql, [manhatro]);
        let message = results[0][0].Message;
        let result = results[0][0].Result;
        return res.status(200).json({
            data: result,
            message: message,
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
    themNguoiVaoPhong,
    layThongTinHoaDon,
    loGin,
    xacThucNguoiDung,
    logOut,
    SuaTrangThaiHoaDon,
    LayDoanhThu,
    SuaNhaTro,
    layThongTinNhaTroDeSua,
    layThongTinPhongDeSua,
    layThongTinDichVuPhongDeSua,
    SuaPhong,
    layThongTinNguoiDungDeSua,
    SuaNguoiDung,
    XoaNguoiDung,
    XoaHoaDon,
    XoaPhong,
    XoaNhaTro
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