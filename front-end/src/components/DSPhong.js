import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { apiLayThongTinNhaTroFilter, apiLayThongTinPhong } from "../services/apiServices";

const DSPhong = () => {
    const machutro = 'ND001';

    const [maPhongToFillTer, setMaPhongToFillTer] = useState("");
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const [dsPhong, setDsPhong] = useState([]);
    const layThongTin = async () => {
        console.log("here")
        const res1 = await apiLayThongTinNhaTroFilter(machutro);

        if (res1.errorCode == 0) {
            setDsNhaTro(res1.data);
        }
    }

    const layDsPhong = async () => {
        const res = await apiLayThongTinPhong(machutro, maPhongToFillTer, maNhaTroSelected);
        if (res.errorCode == 0) {
            setDsPhong(res.data);
        }
    }

    useEffect(() => {
        layThongTin();
    }, [])

    useEffect(() => {
        console.log(maNhaTroSelected + "--");
        layDsPhong();
    }, [maPhongToFillTer, maNhaTroSelected])

    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <form class="form-inline h-50 me-5">
                                <input style={{ width: '180px' }}
                                    value={maPhongToFillTer}
                                    onChange={(event) => setMaPhongToFillTer(event.target.value)}
                                    class="form-control "
                                    type="search" placeholder="Tìm theo mã phòng" aria-label="Search" />
                            </form>
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
                            {/* <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Trạng thái</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tất cả</option>
                                    <option>Trống</option>
                                    <option>Có người</option>
                                </select>
                            </div> */}

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

export default DSPhong;