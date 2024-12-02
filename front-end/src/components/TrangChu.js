import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useState } from 'react';
import { RiUserAddLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
import "./TrangChu.css";


const TrangChu = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const priceGap = 100; // Minimum gap between min and max price

    const [minSize, setMinSize] = useState(0);
    const [maxSize, setMaxSize] = useState(100);
    const sizeGap = 0.1; // Minimum gap between min and max price


    const handlePriceRangeChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.className.includes('price-range-min')) {
            if (maxPrice - value >= priceGap) {
                setMinPrice(value);
            } else {
                setMinPrice(maxPrice - priceGap);
            }
        } else {
            if (value - minPrice >= priceGap) {
                setMaxPrice(value);
            } else {
                setMaxPrice(minPrice + priceGap);
            }
        }
    };

    const handleSizeRangeChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.className.includes('size-range-min')) {
            if (maxSize - value >= sizeGap) {
                setMinSize(value);
            } else {
                setMinSize(maxSize - sizeGap);
            }
        } else {
            if (value - minSize >= sizeGap) {
                setMaxSize(value);
            } else {
                setMaxSize(minSize + sizeGap);
            }
        }
    }

    const priceRangeStyle = {
        left: `${(minPrice / 10000) * 100}%`,
        right: `${100 - (maxPrice / 10000) * 100}%`,
    };
    const sizeRangeStyle = {
        left: `${(minSize / 100) * 100}%`,
        right: `${100 - (maxSize / 100) * 100}%`,
    };
    const formatFloatPrice = (input) => {
        // Convert the input number to a string
        const numStr = input.toString();

        // Use regular expression to insert a period before the last three digits
        const formatted = numStr.replace(/(\d)(?=(\d{3})+$)/g, "$1.");

        return formatted;
    };

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
                        <span><Link to="/tranglienhe" style={{ lineHeight: '91px', fontSize: '14px', fontWeight: 'bold' }}>Liên hệ</Link></span>
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
                <div className="row slides">
                    <div id="carouselExampleDark" class="carousel carousel-dark slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <img src="https://file.phongtro.vn/banner_phong_tro_c2d025ee7b.jpg" class="d-block w-100 " style={{ height: "200px" }} alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <img src="https://file.phongtro.vn/banner_phong_tro_c2d025ee7b.jpg" class="d-block w-100 " style={{ height: "200px" }} alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="https://file.phongtro.vn/banner_phong_tro_c2d025ee7b.jpg" class="d-block w-100 " style={{ height: "200px" }} alt="..." />
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
                </div>
                <div className="row mt-3 filter">
                    <div className="col-8">
                        <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Giá
                            </button>
                            <div className="dropdown-menu py-3" style={{ width: "292px" }}>
                                <div className="mb-3">
                                    <div>
                                        <div className="custom-span hover-span d-inline-block me-1">1 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">2 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">3 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">4 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">5 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">6 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">7 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">8 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">9 triệu</div>
                                        <div className="custom-span hover-span d-inline-block me-1">10 triệu</div>
                                    </div>

                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="price-slider-container">
                                    <p className="px-1 mb-4" >Chọn giá cụ thể</p>
                                    <div className="price-input d-flex justify-content-between" style={{ marginTop: "-20px" }}>
                                        <div className="field">
                                            <span className="custom-span"
                                                style={{ fontSize: "14px", fontWeight: "bold" }}>{formatFloatPrice(minPrice)}
                                                <span style={{ color: "#bdbdbd" }}>.000đ</span>
                                            </span>
                                        </div>
                                        <div className="separator">-</div>
                                        <div className="field justify-content-end">
                                            <span className="custom-span"
                                                style={{ fontSize: "14px", fontWeight: "bold" }}>{formatFloatPrice(maxPrice)}
                                                <span style={{ color: "#bdbdbd" }}>.000đ</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="slider" style={{ marginTop: '-22px' }}>
                                        <div className="progress" style={priceRangeStyle}></div>
                                    </div>
                                    <div className="range-input">
                                        <input
                                            type="range"
                                            className="price-range-min"
                                            min="0"
                                            max="10000"
                                            value={minPrice}
                                            step="100"
                                            onChange={handlePriceRangeChange}
                                        />
                                        <input
                                            type="range"
                                            className="range-max"
                                            min="0"
                                            max="10000"
                                            value={maxPrice}
                                            step="100"
                                            onChange={handlePriceRangeChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Diện tích (m<sup>2</sup>)
                            </button>
                            <div className="dropdown-menu py-3" style={{ width: "292px" }}>

                                <div className="mb-3">
                                    <div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                        <div className="custom-span hover-span d-inline-block me-1">15m<sup>2</sup></div>
                                    </div>

                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="price-slider-container">
                                    <p className="px-1 mb-4" >Chọn kích thước cụ thể</p>
                                    <div className="price-input d-flex justify-content-between" style={{ marginTop: "-20px" }}>
                                        <div className="field">
                                            <span className="custom-span"
                                                style={{ fontSize: "14px", fontWeight: "bold" }}>
                                                {minSize}m<sup>2</sup>
                                            </span>
                                        </div>
                                        <div className="separator">-</div>
                                        <div className="field justify-content-end">
                                            <span className="custom-span"
                                                style={{ fontSize: "14px", fontWeight: "bold" }}>
                                                {maxSize}m<sup>2</sup>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="slider" style={{ marginTop: '-22px' }}>
                                        <div className="progress" style={sizeRangeStyle}></div>
                                    </div>
                                    <div className="range-input">
                                        <input
                                            type="range"
                                            className="size-range-min"
                                            min="0"
                                            max="100"
                                            value={minSize}
                                            step="0.1"
                                            onChange={handleSizeRangeChange}
                                        />
                                        <input
                                            type="range"
                                            className="range-max"
                                            min="0"
                                            max="100"
                                            value={maxSize}
                                            step="0.1"
                                            onChange={handleSizeRangeChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Tiện ích
                            </button>
                            <div className="dropdown-menu"
                                style={{ width: "400px" }}>
                                <div>
                                    <div className="custom-span hover-span d-inline-block me-1">Máy lạnh</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Tủ lạnh</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Chỗ đậu xe</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Máy giặt</div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Trạng thái phòng
                            </button>
                            <div className="dropdown-menu"
                                style={{ width: "400px" }}>
                                <div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                    <div className="custom-span hover-span d-inline-block me-1">Còn ở thêm 2 người</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-flex">
                        <span className="flex-1 align-self-center px-1">Tìm theo tên</span>
                        <span className="flex-2 flex-fill">
                            <form className="d-flex">
                                <input className="form-control w-100 flex-1" type="search" placeholder="Search" aria-label="Search" />
                            </form>

                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div style={{ backgroundColor: "#f2f4f7", cursor: 'pointer' }}
                            className="custom-span d-inline-block me-2">Còn ở thêm 2 người
                            <span style={{ marginLeft: '10px', fontSize: "" }}>x</span>
                        </div>
                        <div style={{ backgroundColor: "#f2f4f7" }}
                            className="custom-span d-inline-block me-2">Còn ở thêm 2 người
                            <span style={{ marginLeft: '10px', fontSize: "" }}>x</span>
                        </div>
                        <div style={{ backgroundColor: "#f2f4f7" }}
                            className="custom-span d-inline-block me-2">Còn ở thêm 2 người
                            <span style={{ marginLeft: '10px', fontSize: "" }}>x</span>
                        </div>
                        <div style={{ backgroundColor: "#f2f4f7" }}
                            className="custom-span d-inline-block me-2">Còn ở thêm 2 người
                            <span style={{ marginLeft: '10px', fontSize: "" }}>x</span>
                        </div>
                        <div style={{ backgroundColor: "#f2f4f7" }}
                            className="custom-span d-inline-block me-2">Còn ở thêm 2 người
                            <span style={{ marginLeft: '10px', fontSize: "" }}>x</span>
                        </div>
                        <div style={{ color: "#288ad6", textDecoration: 'underline', cursor: 'pointer' }}
                            className="d-inline-block me-1">Xóa tất cả </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 p-2" style={{}}>
                        <Link to="/trangchitietphong">
                            <div className="border" style={{ margin: '0 auto', width: '266px', borderRadius: "2px" }}>
                                <div style={{}}>
                                    <img style={{ objectFit: 'cover', width: "266px", height: "149px" }}
                                        src="https://file.phongtro.vn/cdn-cgi/image/width=1024,format=auto/https://file.phongtro.vn/2/can_ho_dich_vu_duong_phu_my_binh_thanh_7_aee8384fff.jpg" alt="" />
                                </div>
                                <div className="p-2">
                                    <p style={{
                                        fontSize: "16px", fontWeight: "600",
                                        WebkitLineClamp: "2",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        margin: '0'
                                    }}
                                    >Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ,
                                        Bình Thạnh Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ, Bình Thạnh</p>
                                    <div className="my-1">
                                        <span style={{ fontSize: "16px", color: 'red', marginRight: "148px" }}>6.5 triệu</span>
                                        <span style={{ fontSize: "16px", color: 'red', }}>20 m<sup>2</sup></span>
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        WebkitLineClamp: "1",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        color: "#020817",
                                        margin: '0'
                                    }}
                                    >168 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3 p-2" style={{}}>
                        <Link to="trangchitietphong">
                            <div className="border" style={{ margin: '0 auto', width: '266px', borderRadius: "2px" }}>
                                <div style={{}}>
                                    <img style={{ objectFit: 'cover', width: "266px", height: "149px" }}
                                        src="https://file.phongtro.vn/cdn-cgi/image/width=1024,format=auto/https://file.phongtro.vn/2/can_ho_dich_vu_duong_phu_my_binh_thanh_7_aee8384fff.jpg" alt="" />
                                </div>
                                <div className="p-2">
                                    <p style={{
                                        fontSize: "16px", fontWeight: "600",
                                        WebkitLineClamp: "2",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        margin: '0'
                                    }}
                                    >Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ,
                                        Bình Thạnh Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ, Bình Thạnh</p>
                                    <div className="my-1">
                                        <span style={{ fontSize: "16px", color: 'red', marginRight: "148px" }}>6.5 triệu</span>
                                        <span style={{ fontSize: "16px", color: 'red', }}>20 m<sup>2</sup></span>
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        WebkitLineClamp: "1",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        color: "#020817",
                                        margin: '0'
                                    }}
                                    >168 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3 p-2" style={{}}>
                        <Link to="/trangchitietphong">
                            <div className="border" style={{ margin: '0 auto', width: '266px', borderRadius: "2px" }}>
                                <div style={{}}>
                                    <img style={{ objectFit: 'cover', width: "266px", height: "149px" }}
                                        src="https://file.phongtro.vn/cdn-cgi/image/width=1024,format=auto/https://file.phongtro.vn/2/can_ho_dich_vu_duong_phu_my_binh_thanh_7_aee8384fff.jpg" alt="" />
                                </div>
                                <div className="p-2">
                                    <p style={{
                                        fontSize: "16px", fontWeight: "600",
                                        WebkitLineClamp: "2",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        margin: '0'
                                    }}
                                    >Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ,
                                        Bình Thạnh Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ, Bình Thạnh</p>
                                    <div className="my-1">
                                        <span style={{ fontSize: "16px", color: 'red', marginRight: "148px" }}>6.5 triệu</span>
                                        <span style={{ fontSize: "16px", color: 'red', }}>20 m<sup>2</sup></span>
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        WebkitLineClamp: "1",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        color: "#020817",
                                        margin: '0'
                                    }}
                                    >168 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3 p-2" style={{}}>
                        <Link to="/trangchitietphong">
                            <div className="border" style={{ margin: '0 auto', width: '266px', borderRadius: "2px" }}>
                                <div style={{}}>
                                    <img style={{ objectFit: 'cover', width: "266px", height: "149px" }}
                                        src="https://file.phongtro.vn/cdn-cgi/image/width=1024,format=auto/https://file.phongtro.vn/2/can_ho_dich_vu_duong_phu_my_binh_thanh_7_aee8384fff.jpg" alt="" />
                                </div>
                                <div className="p-2">
                                    <p style={{
                                        fontSize: "16px", fontWeight: "600",
                                        WebkitLineClamp: "2",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        margin: '0'
                                    }}
                                    >Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ,
                                        Bình Thạnh Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ, Bình Thạnh</p>
                                    <div className="my-1">
                                        <span style={{ fontSize: "16px", color: 'red', marginRight: "148px" }}>6.5 triệu</span>
                                        <span style={{ fontSize: "16px", color: 'red', }}>20 m<sup>2</sup></span>
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        WebkitLineClamp: "1",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        color: "#020817",
                                        margin: '0'
                                    }}
                                    >168 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3 p-2" style={{}}>
                        <Link to="/trangchitietphong">
                            <div className="border" style={{ margin: '0 auto', width: '266px', borderRadius: "2px" }}>
                                <div style={{}}>
                                    <img style={{ objectFit: 'cover', width: "266px", height: "149px" }}
                                        src="https://file.phongtro.vn/cdn-cgi/image/width=1024,format=auto/https://file.phongtro.vn/2/can_ho_dich_vu_duong_phu_my_binh_thanh_7_aee8384fff.jpg" alt="" />
                                </div>
                                <div className="p-2">
                                    <p style={{
                                        fontSize: "16px", fontWeight: "600",
                                        WebkitLineClamp: "2",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        margin: '0'
                                    }}
                                    >Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ,
                                        Bình Thạnh Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ, Bình Thạnh</p>
                                    <div className="my-1">
                                        <span style={{ fontSize: "16px", color: 'red', marginRight: "148px" }}>6.5 triệu</span>
                                        <span style={{ fontSize: "16px", color: 'red', }}>20 m<sup>2</sup></span>
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        WebkitLineClamp: "1",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        color: "#020817",
                                        margin: '0'
                                    }}
                                    >168 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3 p-2" style={{}}>
                        <Link to="/trangchitietphong">
                            <div className="border" style={{ margin: '0 auto', width: '266px', borderRadius: "2px" }}>
                                <div style={{}}>
                                    <img style={{ objectFit: 'cover', width: "266px", height: "149px" }}
                                        src="https://file.phongtro.vn/cdn-cgi/image/width=1024,format=auto/https://file.phongtro.vn/2/can_ho_dich_vu_duong_phu_my_binh_thanh_7_aee8384fff.jpg" alt="" />
                                </div>
                                <div className="p-2">
                                    <p style={{
                                        fontSize: "16px", fontWeight: "600",
                                        WebkitLineClamp: "2",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        margin: '0'
                                    }}
                                    >Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ,
                                        Bình Thạnh Cho thuê Căn hộ Dịch vụ Đường Phú Mỹ, Bình Thạnh</p>
                                    <div className="my-1">
                                        <span style={{ fontSize: "16px", color: 'red', marginRight: "148px" }}>6.5 triệu</span>
                                        <span style={{ fontSize: "16px", color: 'red', }}>20 m<sup>2</sup></span>
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        WebkitLineClamp: "1",
                                        overflow: "hidden", display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        color: "#020817",
                                        margin: '0'
                                    }}
                                    >168 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div >
        </>
    )
}

export default TrangChu;