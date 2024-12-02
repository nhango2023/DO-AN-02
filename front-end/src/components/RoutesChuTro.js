import { Route, Navigate } from "react-router-dom";

import DSNhaTro from './ChuTroPage/DSNhaTro.js';
import DSPhongTro from './ChuTroPage/DSPhong.js';
import DSNguoiThue from './ChuTroPage/DSNguoiThuePhong.js';
import DSHoaDon from './ChuTroPage/DSHoaDon.js';
import TongDoanhThu from './ChuTroPage/TongDoanhThu.js';

const RoutesChuTro = (props) => {

    return (
        <>
            <Route path={props.path} Component={props.component}>
                <Route index element={<Navigate to="nhatro/dsnhatro" replace />} />
                <Route path='nhatro/dsnhatro' element={<DSNhaTro />} />
                <Route path='phong/dsphong' element={<DSPhongTro />} />
                <Route path='nguoithue/dsnguoithuephong' element={<DSNguoiThue />} />
                <Route path='hoadon/dshoadon' element={<DSHoaDon />} />
                <Route path='baocao/doanhthunhatro' element={<TongDoanhThu />} />
                <Route path='baocao/doanhthuphongtro' element={<TongDoanhThu />} />
            </Route>
        </>
    )
}

export default RoutesChuTro;