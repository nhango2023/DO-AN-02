import axios from '../config/Axios';

const apiLayThongTinNhaTro = (tentro, machutro) => {
    return axios.get(`/api/v1/nhatro/read?tentro=${tentro}&machutro=${machutro}`);
}

const apiLayThongTinNhaTroFilter = (machutro) => {
    return axios.get(`/api/v1/nhatro/read/filter?machutro=${machutro}`);
}

const apiLayThongTinPhong = (machutro, maphong, manhatro) => {

    return axios.get(`/api/v1/phong/read/?machutro=${machutro}&maphong=${maphong}&manhatro=${manhatro}`);
}

const apiLayThongTinPhongFilter = (manhatro, machutro) => {
    return axios.get(`/api/v1/phong/read/filter?manhatro=${manhatro}&machutro=${machutro}`);
}

const apiLayThongTinNguoiThuePhong = (machutro, maphong, manhatro, tennguoithuephong) => {
    return axios.get(`/api/v1/nguoithuephong/read/?machutro=${machutro}&maphong=${maphong}&manhatro=${manhatro}&tennguoithuephong=${tennguoithuephong}`);
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

export {
    apiLayThongTinNhaTro,
    apiLayThongTinNhaTroFilter,
    apiLayThongTinPhong,
    apiLayThongTinNguoiThuePhong,
    apiLayThongTinPhongFilter,
    apiLayThongTinPhongTienThuePhong,
    apiLayThongTinPhongChiSoCu,
    apiTaoHoaDon
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