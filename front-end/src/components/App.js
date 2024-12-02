import TrangChu from './TrangChu';
import { Routes, Route } from 'react-router-dom';
import TrangChiTietPhong from './ChuTroPage/TrangChiTietPhong.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DangKyTaiKhoan from './DangKyTaiKhoan.js';
import Login from './Login.js';
import RoutesChuTro from './RoutesChuTro.js';
import RoutesNguoiThueTro from './RoutesNguoiThueTro.js';
import TrangQuanLyChuTro from "./ChuTroPage/TrangQuanLy.js";
import TrangQuanLyNguoiThueTro from './NguoiThuePage/TrangQuanLy.js';
const App = () => {

    return (
        <>
            <Routes>

                <Route path='/' element={<Login />} />
                <Route path='trangchitietphong' element={<TrangChiTietPhong />} />
                <Route path='dangkytaikhoan' element={<DangKyTaiKhoan />} />
                {/* <Route path='Login' element={<Login />} /> */}

                {/* <RoutesChuTro path="chutro/trangquanly" component={TrangQuanLyChuTro} /> */}
                <RoutesNguoiThueTro path="nguoithuetro/trangquanly" component={TrangQuanLyNguoiThueTro} />


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