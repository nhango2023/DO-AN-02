import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { apiLayThongTinNguoiThuePhong, apiLayThongTinNhaTroFilter, apiLayThongTinPhong, apiLayThongTinPhongFilter } from "../services/apiServices";

const DSNguoiThuePhong = () => {
    const machutro = 'ND001';
    const [tenToFilter, setTenToFilter] = useState("");
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const [maPhongSelected, setMaPhongSelected] = useState("");
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [dsNguoiThuePhong, setDsNguoiThuePhong] = useState([]);
    const [dsPhong, setDsPhong] = useState([]);

    const layThongTinNhaTroToFilter = async () => {
        const res = await apiLayThongTinNhaTroFilter(machutro);

        if (res.errorCode == 0) {
            setDsNhaTro(res.data);
        }
    }

    const layThongTinPhongToFilter = async () => {
        const res = await apiLayThongTinPhongFilter(maNhaTroSelected, machutro);

        if (res.errorCode == 0) {
            setDsPhong(res.data);
        }
    }

    const layDsNguoiThuePhong = async () => {

        const res = await apiLayThongTinNguoiThuePhong(machutro, maPhongSelected,
            maNhaTroSelected, tenToFilter);

        if (res.errorCode == 0) {
            setDsNguoiThuePhong(res.data);
        }
    }

    useEffect(() => {
        layThongTinNhaTroToFilter();
    }, [])

    useEffect(() => {
        layThongTinPhongToFilter();
    }, [maNhaTroSelected])

    useEffect(() => {
        layDsNguoiThuePhong();
    }, [maPhongSelected, maNhaTroSelected, tenToFilter])

    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <form class="form-inline h-50 me-5">
                                <input style={{ width: '180px' }}
                                    value={tenToFilter}
                                    onChange={(event) => setTenToFilter(event.target.value)}
                                    class="form-control "
                                    type="search" placeholder="Tìm theo tên" aria-label="Search" />
                            </form>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Nhà trọ</label>
                                <select id="inputState" class="form-control"
                                    value={maNhaTroSelected}
                                    onChange={(e) => setMaNhaTroSelected(e.target.value)}
                                >
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    {dsNhaTro.map((item, index) => {
                                        return (
                                            <>
                                                <option value={item.manhatro}>
                                                    {item.tennhatro}
                                                </option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50 px-2" for="inputState">Phòng</label>
                                <select id="inputState" class="form-control"
                                    value={maPhongSelected}
                                    onChange={(e) => setMaPhongSelected(e.target.value)}
                                >
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    {dsPhong.map((item, index) => {
                                        return (
                                            <>
                                                <option value={item.MAPHONG}>
                                                    {item.MAPHONG}
                                                </option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="">
                            Người thuê phòng <IoIosArrowForward /> Danh sách người thuê
                        </div>
                    </div>
                </div>
                <div style={{ height: "572px" }} className="row mt-2">
                    {dsNguoiThuePhong.map((item, index) => {
                        return (
                            <>
                                <div className="col-3 py-0 px-2">
                                    <div style={{ background: 'white', borderRadius: '8px' }}>
                                        <p className="mb-1 px-3">{item.HOTEN}</p>
                                        <p className="mb-1 px-3">Phòng: {item.MAPHONG}</p>
                                        <p className="mb-1 px-3">{item.tennhatro}</p>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <button type="button" class="mx-3 btn btn-info">
                                                    <FaRegEdit /></button>
                                                <button type="button" class="mx-3  btn btn-info">
                                                    <MdDeleteOutline /></button>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-2"
                                            style={{ borderTop: "1px solid black" }}>
                                            <div className="px-3"
                                                style={{ borderRight: "1px solid black", flex: '1' }}>
                                                <span className="d-block">Ngày bắt đầu</span>
                                                <span className="d-block">{item.NGAYVAOPHONG}</span>

                                            </div>
                                            <div className="px-3" style={{ flex: '1' }}>
                                                <span className="d-block">Số điện thoại</span>
                                                <span className="d-block">{item.SODIENTHOAI}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}


                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div>
                            <button type="button " class="btn btn-light"><IoIosArrowBack /></button>
                            <button type="button " class="btn btn-light">1</button>
                            <button type="button " class="btn btn-light">2</button>
                            <button type="button " class="btn btn-light">3</button>
                            <button type="button " class="btn btn-light">4</button>
                            <button type="button " class="btn btn-light"><IoIosArrowForward /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DSNguoiThuePhong;