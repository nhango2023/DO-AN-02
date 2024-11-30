import React from 'react';
import ReactDOM from 'react-dom/client';
import "./reset.scss"
import TrangChu from './components/TrangChu';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import TrangChiTietPhong from './components/TrangChiTietPhong.js';
import TrangQuanLy from './components/TrangQuanLy.js';

import DSNhaTro from './components/DSNhaTro.js';
import DSPhongTro from './components/DSPhong.js';
import DSNguoiThue from './components/DSNguoiThuePhong.js';
import DSHoaDon from './components/DSHoaDon.js';
import TongDoanhThu from './components/TongDoanhThu.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<TrangChu />} />
      <Route path='trangchitietphong' element={<TrangChiTietPhong />} />

      <Route path='trangquanly' element={<TrangQuanLy />}>
        <Route index element={<Navigate to="nhatro/dsnhatro" replace />} />
        <Route path='nhatro/dsnhatro' element={<DSNhaTro />} />
        <Route path='phong/dsphong' element={<DSPhongTro />} />
        <Route path='nguoithue/dsnguoithuephong' element={<DSNguoiThue />} />
        <Route path='hoadon/dshoadon' element={<DSHoaDon />} />
        <Route path='baocao/doanhthunhatro' element={<TongDoanhThu />} />
        <Route path='baocao/doanhthuphongtro' element={<TongDoanhThu />} />
      </Route>
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

  </BrowserRouter>
  // </React.StrictMode>
);


