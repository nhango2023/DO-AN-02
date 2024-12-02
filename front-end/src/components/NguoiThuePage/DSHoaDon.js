import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "./DSHoaDon.css"
import { useEffect, useState } from "react";
import { apiLayThongTinHoaDon, apiLayThongTinNhaTroFilter, apiLayThongTinPhongFilter, apiSuaTrangThaiHoaDon } from "../../services/apiServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DSHoaDon = () => {
    const user = useSelector(state => state.user.data);
    const machutro = user.idnguoidung;
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [dsPhong, setDsPhong] = useState([]);
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const [maPhongSelected, setMaPhongSelected] = useState("");
    const [mahd, setMaHd] = useState("");
    const [maTrangThai, setMaTrangThai] = useState("");
    const [dsHoaDon, setDsHoaDon] = useState([]);
    // const LayThongTinNhaTroToFilter = async () => {
    //     let res = await apiLayThongTinNhaTroFilter(machutro);
    //     if (res.errorCode === 0) {
    //         setDsNhaTro(res.data);
    //     }
    // }

    // const LayThongTinPhongToFilter = async () => {

    //     let res = await apiLayThongTinPhongFilter(maNhaTroSelected, machutro);
    //     console.log(res.data);
    //     if (res.errorCode === 0) {
    //         setDsPhong(res.data);
    //     }
    // }

    // const layThongTinHoaDon = async () => {
    //     let res = await apiLayThongTinHoaDon(machutro, mahd, maNhaTroSelected, maPhongSelected, maTrangThai);
    //     console.log(res);
    //     if (res.errorCode == 0) {
    //         setDsHoaDon(res.data);
    //     }
    //     else {
    //         console.log(res.message);
    //     }
    // }

    // useEffect(() => {
    //     LayThongTinNhaTroToFilter();
    // }, [])

    // useEffect(() => {
    //     LayThongTinPhongToFilter();
    // }, [maNhaTroSelected]);

    // useEffect(() => {
    //     layThongTinHoaDon();
    // }, [maNhaTroSelected, maPhongSelected, maTrangThai, mahd]);

    // const handleSuaTrangThaiHoaDon = async (mahoadon, matrangthaihd) => {
    //     let data = {
    //         mahoadon,
    //         matrangthaihd
    //     }
    //     let res = await apiSuaTrangThaiHoaDon(data);
    //     if (res.errorCode == 0) {
    //         toast.success("Thay đổi trạng thái hóa đơn thành công");
    //         layThongTinHoaDon();
    //     }
    //     else {
    //         console.log(res.message);
    //     }
    // }
    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <form class="form-inline h-50 me-5">
                                <input style={{ width: '180px' }}
                                    value={mahd}
                                    onChange={(e) => setMaHd(e.target.value)}
                                    class="form-control "
                                    type="search" placeholder="Tìm theo mã hóa đơn" aria-label="Search" />
                            </form>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Nhà trọ</label>
                                <select id="inputState" class="form-control"
                                    value={maNhaTroSelected}
                                    onChange={(e) => setMaNhaTroSelected(e.target.value)}>
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    {dsNhaTro.map((item, index) => {
                                        return (
                                            <>
                                                <option value={item.manhatro}>{item.tennhatro}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Phòng</label>
                                <select id="inputState" class="form-control"
                                    value={maPhongSelected}
                                    onChange={(e) => setMaPhongSelected(e.target.value)}>
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    {dsPhong.map((item, index) => {
                                        return (
                                            <>
                                                <option value={item.MAPHONG}>{item.MAPHONG}</option>
                                            </>
                                        )
                                    })}

                                </select>
                            </div>
                            <div class="form-group d-flex align-items-center">
                                <label className="w-50" for="inputState">Trạng thái</label>
                                <select id="inputState" class="form-control"
                                    value={maTrangThai}
                                    onChange={(e) => setMaTrangThai(e.target.value)}
                                >
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    <option value="2">Chưa đóng</option>
                                    <option value="1">Đã đóng</option>
                                </select>
                            </div>
                        </div>

                        <div className="">
                            Hóa đơn <IoIosArrowForward /> Danh sách hoá đơn
                        </div>
                    </div>
                </div>
                <div style={{ height: "572px" }} className="row mt-1">
                    {dsHoaDon.map((item, index) => {
                        return (
                            <>
                                <div className="col-3 py-0 px-2">
                                    <div style={{ background: 'white', borderRadius: '8px' }}>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-1 px-3 fw-bold">{item.MAHOADON}</p>
                                            {item.MATRANGTHAIHD == 2 ?
                                                <button onClick={() => { handleSuaTrangThaiHoaDon(item.MAHOADON, item.MATRANGTHAIHD) }}
                                                    type="button" class="btn btn-danger">Chưa đóng</button> :
                                                <button onClick={() => { handleSuaTrangThaiHoaDon(item.MAHOADON, item.MATRANGTHAIHD) }}
                                                    type="button" class="btn btn-success">Đã đóng</button>
                                            }

                                        </div>
                                        <p className="mb-1 px-3">{item.TENNHATRO}</p>
                                        <p className="mb-1 px-3">Phòng: {item.MAPHONG}</p>
                                        <div className="d-flex justify-content-center">
                                            <div className="d-flex justify-content-center">
                                                <button type="button" class="mx-3 btn btn-info">
                                                    <FaRegEdit /></button>
                                                <div class="hover-button-container">
                                                    <button type="button" class="mx-3  btn btn-info">
                                                        <IoIosInformationCircleOutline /></button>
                                                    <span class="hover-text">Chi tiết</span>
                                                </div>
                                                <button type="button" class="mx-3  btn btn-info">
                                                    <MdDeleteOutline /></button>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-2"
                                            style={{ borderTop: "1px solid black" }}>
                                            <div className="px-3"
                                                style={{ borderRight: "1px solid black", flex: '1' }}>
                                                <span className="d-block">Ngày tạo</span>
                                                <span className="d-block">{item.NGAYLAPHOADON}</span>

                                            </div>
                                            <div className="px-3" style={{ flex: '1' }}>
                                                <span className="d-block">Tổng tiền</span>
                                                <span className="d-block">{(+item.TONGTIEN).toLocaleString()} vnd</span>
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
export default DSHoaDon;