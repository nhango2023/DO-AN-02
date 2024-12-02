import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useState } from 'react';
import { RiUserAddLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { IoArrowRedoOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import "./TrangChiTietPhong.css";

const TrangChiTietPhong = () => {
    const handleOpenGGMap = (address) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, "_blank")
    }
    return (
        <>
            <div className="container border" style={{ position: 'relative' }}>
                <div className="row header"
                    style={{
                        transition: "padding .2s linear",
                        height: "91px", boxShadow: "0px 4px 10px rgba(182, 182, 182, 0.18)",
                        position: "sticky",
                        top: '0',
                        background: 'white',
                        zIndex: '2'
                    }}>
                    <div className="col-1" style={{ lineHeight: '91px' }}>logo</div>
                    <div className="col-3"></div>
                    <div className="col-4">
                        <span><Link to="/" style={{ lineHeight: '91px', fontSize: '14px', fontWeight: 'bold' }}>Trang chủ</Link></span>
                        <span><Link to="/trangquanly" style={{ lineHeight: '91px', fontSize: '14px', fontWeight: 'bold' }} className="p-3">Trang quản lý</Link></span>
                        <span><Link to="/trangquanly" style={{ lineHeight: '91px', fontSize: '14px', fontWeight: 'bold' }}>Liên hệ</Link></span>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <span className="d-inline-block" >
                            <div className="btn-group">
                                <button type="button" className="btn dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <RxAvatar style={{ fontSize: '30px' }} />Tài khoản
                                </button>
                                <div className="dropdown-menu p1-3" >
                                    <div className="p-2 hoverf8f9fa">
                                        <Link
                                            to=""><RiUserAddLine />
                                            <span style={{ marginLeft: '2px' }}>Tạo tài khoản</span>
                                        </Link>
                                    </div>
                                    <div className="p-2 hoverf8f9fa">
                                        <Link
                                            to=""><IoIosLogIn />
                                            <span style={{ marginLeft: '2px' }}>Đăng nhập</span>
                                        </Link></div>

                                </div>
                            </div>
                        </span>
                    </div>

                </div >
                <div className="row">
                    <div className="col-9">
                        <div id="carouselExampleDark" class="carousel carousel-dark slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active" data-bs-interval="10000">
                                    <img style={{ height: '300px' }}
                                        src="https://file4.batdongsan.com.vn/resize/1275x717/2024/06/04/20240604154957-f022_wm.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>First slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </div>
                                </div>
                                <div class="carousel-item" data-bs-interval="2000">
                                    <img src="https://file4.batdongsan.com.vn/resize/200x200/2024/06/04/20240604155012-cbb6_wm.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Second slide label</h5>
                                        <p>Some representative placeholder content for the second slide.</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="https://file4.batdongsan.com.vn/resize/200x200/2024/06/04/20240604154825-c189_wm.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the third slide.</p>
                                    </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div>
                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}
                            >Nhà Trọ Trệt lầu mới xây dựng, máy lạnh đời mới,Đại Học Tây đô,Cái Răng</p>
                            <div className="d-flex align-items-center">
                                <IoLocationOutline className="me-1" />
                                <span>Đường Số 5 KDC Thạnh Mỹ, Phường Lê Bình, Quận Cái Răng, Cần Thơ - </span>
                                <span onClick={() => handleOpenGGMap("Đường Số 5 KDC Thạnh Mỹ, Phường Lê Bình, Quận Cái Răng, Cần Thơ")}
                                    style={{ color: '#1366de', cursor: 'pointer', textDecoration: 'underline' }}>
                                    Xem trên bản đồ</span>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="d-inline-block me-5">
                                    <span style={{ fontSize: '14px', color: '#999' }}
                                        className="d-block">Giá phòng</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}
                                        className="d-block">22 triệu/tháng</span>
                                </div>
                                <div className="d-inline-block me-5">
                                    <span style={{ fontSize: '14px', color: '#999' }}
                                        className="d-block">Điện</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}
                                        className="d-block">3k</span>
                                </div>
                                <div className="d-inline-block me-5">
                                    <span style={{ fontSize: '14px', color: '#999' }}
                                        className="d-block">Nước</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}
                                        className="d-block">10k</span>
                                </div>
                                <div className="d-inline-block me-5">
                                    <span style={{ fontSize: '14px', color: '#999' }}
                                        className="d-block">Diện tích</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}
                                        className="d-block">20m<sup>2</sup></span>
                                </div>
                                <div style={{ width: '250px' }}
                                    className="d-inline-block me-5">
                                    <span style={{ fontSize: '14px', color: '#999' }}
                                        className="d-block">Tiện ích</span>
                                    <span className="custom-span d-inline-block">Máy lạnh</span>
                                    <span className="custom-span d-inline-block">Máy giặt</span>
                                    <span className="custom-span d-inline-block">Tủ lạnh</span>
                                    <span className="custom-span d-inline-block">Ti vi</span>
                                </div>
                            </div>
                            <hr />
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Thông tin mô tả</p>
                            <p>Quản lý 99,99% giỏ hàng cho thuê tại Vinhomes Golden River. Căn hộ được cập nhật liên tục hằng ngày để đáp ứng yêu cầu tìm thuê nhà cho Quý anh chị.
                                Vinhomes Golden River Bason là một trong những khu dân cư đang sống nhất tại TP HCM, đặc biệt đối với những ai sinh sống và làm việc tại Quận 1.
                                Nhiều tiện ích đang dần lấp đầy khu thương mại shophouse, đảm bảo sự phục vụ nhu cầu cá nhân cho cư dân.
                                Để việc tìm thuê nhà của Quý anh chị được dễ dàng, vngleasing cập nhật danh sách các căn hộ cho thuê giá tốt nhất dưới đây:</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'sticky', top: '0', textAlign: 'center', border: "1px solid #F2F2F2", borderRadius: '8px' }}
                                className="border w-75">
                                <div>
                                    <img style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                                        src="https://file4.batdongsan.com.vn/resize/200x200/2023/12/05/20231205083435-8866.jpg" alt="" />
                                </div>
                                <div style={{ fontSize: '16px', color: '#2C2C2C' }}
                                >Nhà trọ Lê Trọng</div>
                                <div className="d-flex align-items-center justify-content-center"
                                    style={{ fontSize: '12px', color: '#505050' }}
                                ><FaUserLarge className="me-1" />Lê Thanh Trọng</div>
                                <div>
                                    <button style={{ background: '#1DBABF' }}
                                        type="button" class="btn">0933 384 *** · Hiện số</button>
                                </div>
                                <div>
                                    <button style={{ border: "solid 1px #ccc" }}
                                        type="button" class="btn my-1">
                                        <SiZalo style={{ fontSize: '30px', marginRight: '3px' }} />
                                        Liên hệ qua Zalo</button>
                                </div>
                                <div>
                                    <button style={{ border: "solid 1px #ccc" }}
                                        type="button" class="btn my-1">
                                        <IoArrowRedoOutline style={{ fontSize: '30px', marginRight: '3px' }} />
                                        Đặt lịch xem phòng
                                    </button>
                                </div>
                            </div>
                            <div style={{ border: "1px solid #F2F2F2", borderRadius: '8px' }}
                                className="d-flex border w-75 mt-2">
                                <div>
                                    <IoWarningOutline style={{ color: 'red', fontSize: '50px' }} />
                                </div>
                                <div>
                                    <p1 style={{ fontSize: '12px', color: '#2C2C2C' }}
                                    >Không nên đặt cọc, giao dịch trước khi xem nhà
                                        và xác minh thông tin của người cho thuê.</p1>
                                    <p1 style={{ fontSize: '12px', color: '#2C2C2C', fontWeight: 'bold' }}
                                        className="d-block">Tìm hiểu thêm <IoIosArrowForward /></p1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TrangChiTietPhong;