import "./TrangQuanLy.css";
import {
    IoIosArrowDown, IoIosArrowForward,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { IoBarChartOutline } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { apiXacThuc } from "../../services/apiServices";

const TrangQuanLy = () => {
    const user = useSelector(state => state.user.data);
    const xacThuc = useSelector(state => state.user.xacThuc);
    const navigate = useNavigate();
    const checkLogin = async () => {
        if (xacThuc === true) {
            let res = await apiXacThuc();
            if (res.errorCode != 0) {
                navigate("dangnhap");
            }
            else {
                if (user.maloainguoidung === "LTK001") {
                    navigate("/chutro/trangquanly");
                }
            }
        }
        else {
            navigate("dangnhap");
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])
    const [openMenuNhaTro, setOpenMenuNhaTro] = useState(false);
    const [openMenuPhong, setOpenMenuPhong] = useState(false);
    const [openMenuNguoiThuePhong, setOpenMenuNguoiThuePhong] = useState(false);
    const [openMenuHoaDon, setOpenMenuHoaDon] = useState(false);
    const [openMenuBaoCao, setOpenMenuBaocao] = useState(false);

    const [showThemHoaDon, setShowThemHoaDon] = useState(false);
    const [showThemNhaTro, setShowThemNhaTro] = useState(false);
    const [showThemPhong, setShowThemPhong] = useState(false);
    const [showThemNguoiDungVaoPhong, setShowThemNguoiDungVaoPhong] = useState(false);
    return (
        <>
            <div className="container-fluid " style={{ height: '100%' }}>
                <div className="row">
                    <div style={{ boxShadow: 'rgba(182, 182, 182, 0.5) 0px 2px 10px' }}
                        className="col-2 border">
                        <div>
                            <img width={"90px"} height={"90px"}
                                src="https://nhatro24h.vn/assets/img/icon-24h/logo-horent_remove_bg.png" alt="" />
                        </div>
                        <div className="hoverdadce0" style={{ padding: "12px" }}>
                            <Link to="/">
                                Trang chủ
                            </Link>
                        </div>
                        <div class="">
                            <div class="card-header" id="headingFour">
                                <div class="mb-0 hoverdadce0">
                                    <button class="btn w-100 d-flex justify-content-between" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour"
                                        aria-expanded="true"
                                        aria-controls="collapseFour"
                                        onClick={() => setOpenMenuHoaDon(!openMenuHoaDon)}
                                    >
                                        <div className="d-flex align-items-center">
                                            <IoReceiptOutline className="me-1" /> Hóa đơn
                                        </div>
                                        <div>
                                            {openMenuHoaDon ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="card-header" id="headingFive">
                                <div class="mb-0 hoverdadce0">
                                    <button class="btn w-100 d-flex justify-content-between" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFive"
                                        aria-expanded="true"
                                        aria-controls="collapseFive"
                                        onClick={() => setOpenMenuBaocao(!openMenuBaoCao)}
                                    >
                                        <div className="d-flex align-items-center">
                                            <IoBarChartOutline className="me-1" /> Báo cáo
                                        </div>
                                        <div>
                                            {openMenuBaoCao ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div id="collapseFive" class="collapse "
                                aria-labelledby="headingFive" data-parent="#accordion">
                                <Link to="baocao/doanhthunhatro" class="card-body hoverdadce0 d-block w-100 ps-5">
                                    Doanh thu nhà trọ
                                </Link>
                                <Link to="baocao/doanhthuphongtro" class="card-body hoverdadce0 d-block w-100 ps-5">
                                    Doanh thu phòng trọ
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div style={{ height: '50px', boxShadow: "rgba(182, 182, 182, 0.5) 0px 2px 10px" }}
                                className="col-12 border d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                    <button
                                        type="button" class="btn btn-primary d-flex align-items-center"
                                        onClick={() => setShowThemNhaTro(true)}>
                                        <CiSquarePlus style={{ fontSize: '24px' }} /> Thêm nhà trọ
                                    </button>
                                    <button type="button" class="btn btn-primary mx-2 d-flex align-items-center"
                                        onClick={() => setShowThemPhong(true)}>
                                        <CiSquarePlus style={{ fontSize: '24px' }} /> Thêm phòng
                                    </button>
                                    <button type="button" class="btn btn-primary d-flex align-items-center"
                                        onClick={() => setShowThemHoaDon(true)}>
                                        <CiSquarePlus style={{ fontSize: '24px' }} /> Lâp hóa đơn
                                    </button>
                                    <button type="button" class="btn btn-primary mx-2 d-flex align-items-center"
                                        onClick={() => setShowThemNguoiDungVaoPhong(true)}>
                                        <CiSquarePlus style={{ fontSize: '24px' }} /> Thêm khách thuê vào phòng
                                    </button>

                                </div>
                                <div class="dropdown">
                                    <button class="btn " type="button" id="dropdownMenuButton"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FaUserCircle style={{ fontSize: '30px' }} />
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: '#F0F4FA' }}
                            className="row">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TrangQuanLy;