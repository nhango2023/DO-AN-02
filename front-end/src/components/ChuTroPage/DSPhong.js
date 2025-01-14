import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { apiLayThongTinNhaTroFilter, apiLayThongTinPhong, apiLayThongTinPhongFilter, apiXoaPhong } from "../../services/apiServices";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import SuaPhong from "./modals/SuaPhong";
import { toast } from "react-toastify";

const DSPhong = () => {
    const user = useSelector(state => state.user.data);
    const machutro = user.idnguoidung;
    const { currentPage, setTotalPage } = useOutletContext();
    const [maPhongSelected, setMaPhongSelected] = useState([]);
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const [dsMaPhong, setDsMaPhong] = useState([]);
    const [dsPhong, setDsPhong] = useState([]);
    const [soNguoiTrongPhong, setSoNguoiTrongPhong] = useState("");
    const layThongTin = async () => {
        const res1 = await apiLayThongTinNhaTroFilter(machutro);
        console.log()
        if (res1.errorCode == 0) {
            setDsNhaTro(res1.data);
        }
    }

    const layDsPhong = async () => {
        const res = await apiLayThongTinPhong(machutro, maPhongSelected,
            maNhaTroSelected, soNguoiTrongPhong, currentPage)

        if (res.errorCode == 0) {
            setDsPhong(res.data);
            setTotalPage(res.totalPages);
        }
    }

    const layThongTinPhongToFilter = async () => {
        const res = await apiLayThongTinPhongFilter(maNhaTroSelected, machutro);

        if (res.errorCode == 0) {
            setDsMaPhong(res.data);
        }
    }

    useEffect(() => {
        layDsPhong();

    }, [currentPage])

    useEffect(() => {
        layThongTin();
    }, [])

    useEffect(() => {
        layDsPhong();
    }, [maPhongSelected, maNhaTroSelected, soNguoiTrongPhong])

    useEffect(() => {
        layThongTinPhongToFilter();
    }, [maNhaTroSelected]);

    const [showSuaPhong, setShowSuaPhong] = useState(false);
    const [manhatro, setMaNhaTro] = useState("");
    const [maphong, setMaPhong] = useState("");
    const handleXoaPhong = async (manhatro, maphong) => {
        let res = await apiXoaPhong(manhatro, maphong);
        if (res.errorCode == 0 && res.data == 1) {
            toast.success(res.message);
            layDsPhong();
        } else {
            toast.error(res.message);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50 px-2" for="inputState">Phòng</label>
                                <select id="inputState" class="form-control"
                                    value={maPhongSelected}
                                    onChange={(e) => setMaPhongSelected(e.target.value)}
                                >
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    {dsMaPhong.map((item, index) => {
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
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="d-block w-25" for="inputState">
                                    Nhà trọ
                                </label>
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
                                <label className="w-50" for="inputState">Trạng thái</label>
                                <select
                                    value={soNguoiTrongPhong}
                                    onChange={(e) => setSoNguoiTrongPhong(e.target.value)}
                                    id="inputState" class="form-control">
                                    <option defaultValue={""} value={""}>Tất cả</option>
                                    <option value={"0"}>Trống</option>
                                    <option value={"1"}>Có người</option>
                                </select>
                            </div>

                            {/* <div class="form-group d-flex align-items-center">
                                <label className="w-50" for="inputState">Hóa đơn</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tất cả</option>
                                    <option>Đã đóng</option>
                                    <option >Chưa đóng</option>

                                </select>
                            </div> */}
                        </div>

                        <div className="">
                            Phòng trọ <IoIosArrowForward /> Danh sách phòng
                        </div>
                    </div>
                </div>
                <div style={{ height: "572px" }} className="row mt-2">
                    {dsPhong.map((item, index) => {

                        return (
                            <>
                                <div className="col-3 py-0 px-2">
                                    <div style={{ background: 'white', borderRadius: '8px' }}>
                                        <p className="mb-1 px-3">Nhà trọ: {item.TENNHATRO}</p>
                                        <p className="mb-1 px-3">Mã phòng: {item.MAPHONG}</p>
                                        <p className="mb-1 px-3">Diện tích: {+item.CHIEUDAI * +item.CHIEURONG}m<sup>2</sup></p>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <button
                                                    onClick={() => { setMaNhaTro(item.MANHATRO); setMaPhong(item.MAPHONG); setShowSuaPhong(true) }}
                                                    type="button" class="mx-3 btn btn-info">
                                                    <FaRegEdit
                                                    /></button>
                                                <button onClick={() => handleXoaPhong(item.MANHATRO, item.MAPHONG)}
                                                    type="button" class="mx-3  btn btn-info">
                                                    <MdDeleteOutline /></button>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-2"
                                            style={{ borderTop: "1px solid black" }}>
                                            <div className="px-3"
                                                style={{ borderRight: "1px solid black", flex: '1' }}>
                                                <span className="d-block">Ngày tạo</span>
                                                <span className="d-block">{item.NGAYTAO}</span>
                                            </div>
                                            <div className="px-3" style={{ flex: '1' }}>
                                                <span className="d-block">Số người</span>
                                                <span className="d-block">{item.SO_NGUOI_TRONG_PHONG}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>

            </div>
            <SuaPhong
                show={showSuaPhong}
                setShow={setShowSuaPhong}
                machutro={machutro}
                manhatro={manhatro}
                maphong={maphong}
                refreshPage={layDsPhong}
            />
        </>
    )
}

export default DSPhong;