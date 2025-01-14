import axios from '../config/Axios';

const apiLayThongTinNhaTro = (tentro, machutro) => {
    return axios.get(`/api/v1/nhatro/read?tentro=${tentro}&machutro=${machutro}`);
}

const apiLayThongTinNhaTroFilter = (machutro) => {
    return axios.get(`/api/v1/nhatro/read/filter?machutro=${machutro}`);
}

const apiLayThongTinPhong = (machutro, maphong, manhatro, songuoitrongphong, currentpage) => {

    return axios.get(`/api/v1/phong/read/?machutro=${machutro}&maphong=${maphong}&manhatro=${manhatro}&songuoitrongphong=${songuoitrongphong}&currentpage=${currentpage}`);
}

const apiLayThongTinPhongFilter = (manhatro, machutro) => {
    return axios.get(`/api/v1/phong/read/filter?manhatro=${manhatro}&machutro=${machutro}`);
}

const apiLayThongTinNguoiThuePhong = (machutro, maphong, manhatro, tennguoithuephong, currentpage) => {
    return axios.get(`/api/v1/nguoithuephong/read/?machutro=${machutro}&maphong=${maphong}&manhatro=${manhatro}&tennguoithuephong=${tennguoithuephong}&currentpage=${currentpage}`);
}

const apiLayThongTinPhongTienThuePhong = (manhatro, maphong) => {
    return axios.get(`/api/v1/phong/read/tienthuephong?maphong=${maphong}&manhatro=${manhatro}`);
}

const apiLayThongTinPhongChiSoCu = (manhatro, maphong, ngayghi) => {

    return axios.get(`/api/v1/phong/read/chisocu?maphong=${maphong}&manhatro=${manhatro}&ngayghi=${ngayghi}`);
}

const apiTaoHoaDon = (data) => {
    return axios.post("/api/v1/hoadon/create", { ...data });
}

const apiTaoNhaTro = (data) => {
    return axios.post("/api/v1/nhatro/create", { ...data });
}

const apiTaoPhong = (data) => {
    return axios.post("/api/v1/phong/create", { ...data });
}

const apiTaoNguoiDung = (data) => {
    return axios.post("/api/v1/nguoidung/create", { ...data });
}

const apiThemNguoiDungVaoPhong = (data) => {
    return axios.post("/api/v1/phong/themnguoidungvaophong", { ...data });
}

const apiLayThongTinHoaDon = (machutro, mahoadon, manhatro, maphong, matrangthaihd, ngaylaphd, currentpage) => {

    return axios.get(`/api/v1/hoadon/read?machutro=${machutro}&mahoadon=${mahoadon}&manhatro=${manhatro}&maphong=${maphong}&matrangthaihd=${matrangthaihd}&ngaylaphd=${ngaylaphd}&currentpage=${currentpage}`);
}

const apiLogin = (data) => {
    return axios.post("/api/v1/login", { ...data });
}

const apiXacThuc = () => {
    return axios.get("/api/v1/xacthuc");
}

const apiLogOut = () => {
    return axios.get("/api/v1/logout");
}

const apiSuaTrangThaiHoaDon = (data) => {
    return axios.put("/api/v1/hoadon/suatrangthaihoadon", { ...data });
}

const apiLayDoanhThu = (machutro, manhatro, nam) => {
    return axios.get(`/api/v1/laydoanhthu?machutro=${machutro}&nam=${nam}&manhatro=${manhatro}`);
}
const apiLayThongTin1NhaTro = (manhatro) => {
    return axios.get(`/api/v1/nhatro/laythongtinnhatrodesua?&manhatro=${manhatro}`);
}
const apiSuaNhaTro = (data) => {
    return axios.put("/api/v1/nhatro/sua", { ...data });
}


const apiLayThongTinPhongDeSua = (manhatro, maphong) => {
    return axios.get(`/api/v1/phong/laythongtinphongdesua?manhatro=${manhatro}&maphong=${maphong}`);
}


const apiLayThongTinDichVuPhongDeSua = (manhatro, maphong) => {
    return axios.get(`/api/v1/dichvuphong/laythongtindichvuphongdesua?manhatro=${manhatro}&maphong=${maphong}`);
}

const apiSuaPhong = (data) => {
    return axios.put("/api/v1/phong/sua", { ...data });
}

const apiLayThongTinNguoiDungDeSua = (idnguoidung) => {
    return axios.get(`/api/v1/nguoidung/laythongtinnguoidungdesua?idnguoidung=${idnguoidung}`);
}
const apiSuaNguoiDung = (data) => {
    return axios.put("/api/v1/nguoidung/sua", { ...data });
}
const apiXoaNguoiDung = (idnguoidung) => {
    return axios.delete(`/api/v1/nguoidung/xoa?idnguoidung=${idnguoidung}`);
}
const apiXoaHoaDon = (mahoadon) => {
    return axios.delete(`/api/v1/hoadon/xoa?mahoadon=${mahoadon}`);
}
const apiXoaPhong = (manhatro, maphong) => {
    return axios.delete(`/api/v1/phong/xoa?manhatro=${manhatro}&maphong=${maphong}`);
}
const apiXoaNhaTro = (manhatro) => {
    return axios.delete(`/api/v1/nhatro/xoa?manhatro=${manhatro}`);
}
export {
    apiLayThongTinNhaTro,
    apiLayThongTinNhaTroFilter,
    apiLayThongTinPhong,
    apiLayThongTinNguoiThuePhong,
    apiLayThongTinPhongFilter,
    apiLayThongTinPhongTienThuePhong,
    apiLayThongTinPhongChiSoCu,
    apiTaoHoaDon,
    apiTaoNhaTro,
    apiTaoPhong,
    apiTaoNguoiDung,
    apiThemNguoiDungVaoPhong,
    apiLayThongTinHoaDon,
    apiLogin,
    apiXacThuc,
    apiLogOut,
    apiSuaTrangThaiHoaDon,
    apiLayDoanhThu,
    apiLayThongTin1NhaTro,
    apiSuaNhaTro,
    apiLayThongTinPhongDeSua,
    apiLayThongTinDichVuPhongDeSua,
    apiSuaPhong,
    apiLayThongTinNguoiDungDeSua,
    apiSuaNguoiDung,
    apiXoaNguoiDung,
    apiXoaHoaDon,
    apiXoaPhong,
    apiXoaNhaTro
}

// const apiReadProduct = (page) => {
//     return axios.get(`/api/v1/product/read?page=${page}`);
// }

// const apiReadProductDetail = (idProduct) => {
//     return axios.get(`/api/v1/product/read/detail?idproduct=${idProduct}`);
// }

// const apiReadInventory = () => {
//     return axios.get("/api/v1/inventory/read");
// }

// const apiReadCategory = () => {
//     return axios.get("/api/v1/category/read");
// }

// const apiReadInventoryOccupying = () => {
//     return axios.get("/api/v1/inventory/read/occupying");
// }

// const apiUpdateProduct = (data) => {
//     return axios.put("/api/v1/product/update", { ...data });
// }

// const apiCreateProduct = (data) => {
//     return axios.post("/api/v1/product/create", { ...data });
// }

// const apiDeleteProduct = (idproduct) => {
//     return axios.delete(`/api/v1/product/delete?idproduct=${idproduct}`);
// }

// const apiLogin = (data) => {
//     return axios.post("/api/v1/login", { ...data });
// }

// export {
//     apiReadProduct,
//     apiReadProductDetail,
//     apiReadInventory,
//     apiReadCategory,
//     apiReadInventoryOccupying,
//     apiUpdateProduct,
//     apiCreateProduct,
//     apiDeleteProduct,
//     apiLogin
// }