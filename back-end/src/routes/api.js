import express from "express";
import apiController from "../controller/apiController";
import { authentication, authorization } from "../middleware/jwt"

const router = express.Router();

const initApiRoutes = (app) => {
    // router.all("*", authentication, authorization);

    // router.get("/category/read", apiController.ReadCategory);
    // router.get("/inventory/read", apiController.ReadInventory);
    // router.get("/product/read", apiController.ReadProduct);
    // router.put("/product/update", apiController.UpdateProduct);
    // router.get("/product/read/detail", apiController.ReadProductDetail);
    // router.post("/product/create", apiController.CreateProduct);
    // router.delete("/product/delete", apiController.DeleteProduct);
    // router.post("/login", apiController.Login);

    router.get("/nhatro/read", apiController.layThongTinNhaTro);
    router.get("/nhatro/read/filter", apiController.layThongTinNhaTroFilter);
    router.get("/phong/read", apiController.layThongTinPhong);
    router.get("/nguoithuephong/read", apiController.layThongTinNguoiThuePhong);
    router.get("/phong/read/filter", apiController.layThongTinPhongToFilter);
    router.get("/phong/read/tienthuephong", apiController.layThongTinDichVuThuePhong);
    router.get("/phong/read/chisocu", apiController.layThongChiSoCu);
    router.post("/hoadon/create", apiController.taoHoaDon);
    router.post("/nguoidung/create", apiController.taoNguoiDung);
    router.post("/nhatro/create", apiController.taoNhaTro);
    router.post("/phong/create", apiController.taoPhong);
    router.post("/phong/themnguoidungvaophong", apiController.themNguoiVaoPhong);
    router.post("/login", apiController.loGin);
    router.get("/logout", apiController.logOut);
    router.get("/hoadon/read", apiController.layThongTinHoaDon);
    router.get("/xacthuc", apiController.xacThucNguoiDung);
    router.put("/hoadon/suatrangthaihoadon", apiController.SuaTrangThaiHoaDon);
    router.get("/laydoanhthu", apiController.LayDoanhThu);
    router.put("/nhatro/sua", apiController.SuaNhaTro);
    router.get("/nhatro/laythongtinnhatrodesua", apiController.layThongTinNhaTroDeSua);
    router.get("/phong/laythongtinphongdesua", apiController.layThongTinPhongDeSua);
    router.get("/dichvuphong/laythongtindichvuphongdesua", apiController.layThongTinDichVuPhongDeSua);
    router.put("/phong/sua", apiController.SuaPhong);
    router.get("/nguoidung/laythongtinnguoidungdesua", apiController.layThongTinNguoiDungDeSua);
    router.put("/nguoidung/sua", apiController.SuaNguoiDung);
    router.delete("/nguoidung/xoa", apiController.XoaNguoiDung);
    router.delete("/hoadon/xoa", apiController.XoaHoaDon);
    router.delete("/phong/xoa", apiController.XoaPhong);
    router.delete("/nhatro/xoa", apiController.XoaNhaTro);

    return app.use("/api/v1/", router);
}

export default initApiRoutes;


// router.all('*', checkUserJwt, checkUserPermission);
// router.post("/register", apiController.register);
// router.post("/login", apiController.login);
// router.post("/logout", apiController.logout);
// router.get("/account", apiController.getUserAccount);

// router.post("/user/create", apiController.createUser);
// router.get("/user/read", apiController.readUser);
// router.put("/user/update", apiController.updateUser);
// router.delete("/user/delete", apiController.deleteUser);

// router.post("/role/create", apiController.createRole);
// router.get("/role/read", apiController.readRole);
// router.put("/role/update", apiController.updateRole);
// router.delete("/role/delete", apiController.deleteRole);

// router.get("/group/read", apiController.readGroup);