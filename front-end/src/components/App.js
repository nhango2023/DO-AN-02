import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DangKyTaiKhoan from './DangKyTaiKhoan.js';
import Login from './Login.js';
import DSNhaTro from './ChuTroPage/DSNhaTro.js';
import DSPhongTro from './ChuTroPage/DSPhong.js';
import DSNguoiThue from './ChuTroPage/DSNguoiThuePhong.js';
import DSHoaDon from './ChuTroPage/DSHoaDon.js';
import TongDoanhThu from './ChuTroPage/TongDoanhThu.js';
import TrangQuanLyNguoiThue from './NguoiThuePage/TrangQuanLy.js';
import TrangQuanLyChuTro from "./ChuTroPage/TrangQuanLy.js"


const App = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route path='dangkytaikhoan' element={<DangKyTaiKhoan />} />
                <Route path='dangnhap' element={<Login />} />
                <Route path="/chutro/trangquanly" element={<TrangQuanLyChuTro />} >
                    <Route index element={<Navigate to="nhatro/dsnhatro" replace />} />
                    <Route path='nhatro/dsnhatro' element={<DSNhaTro />} />
                    <Route path='phong/dsphong' element={<DSPhongTro />} />
                    <Route path='nguoithue/dsnguoithuephong' element={<DSNguoiThue />} />
                    <Route path='hoadon/dshoadon' element={<DSHoaDon />} />
                    <Route path='baocao/doanhthunhatro' element={<TongDoanhThu />} />
                    <Route path='baocao/doanhthuphongtro' element={<TongDoanhThu />} />
                </Route>
                <Route path="/nguoithuephong/trangquanly" element={<TrangQuanLyNguoiThue />}>

                </Route >

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App;