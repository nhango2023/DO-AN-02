import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { apiLayThongTinNhaTro } from "../../services/apiServices";

const DSNhaTro = () => {
    const machutro = 'ND001';
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [tentro, setTenTro] = useState("");
    const layThongTinNhaTro = async () => {
        let res = await apiLayThongTinNhaTro(tentro, machutro);
        if (res.errorCode == 0) {
            setDsNhaTro(res.data);
        }
    }
    useEffect(() => {
        layThongTinNhaTro();
    }, []);

    useEffect(() => {
        layThongTinNhaTro();
    }, [tentro]);

    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="">
                            <form class="form-inline h-50">
                                <input
                                    value={tentro}
                                    onChange={(event) => setTenTro(event.target.value)}
                                    class="form-control mr-sm-2 "
                                    type="search" placeholder="Tìm tên nhà trọ" aria-label="Search" />
                            </form>
                        </div>
                        <div className="">
                            Nhà trọ <IoIosArrowForward /> Danh sách nhà trọ
                        </div>
                    </div>
                </div>
                <div style={{ height: "572px" }}
                    className="row mt-2">
                    {dsNhaTro.map((item, index) => {
                        return (
                            <>
                                <div className="col-3 p-3">
                                    <div style={{ background: 'white', borderRadius: '8px' }}>
                                        <p className="mb-1 px-3">{item.TENNHATRO}</p>
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
                                                <span className="d-block">Số phòng</span>
                                                <span className="d-block">{item.SO_LUONG_PHONG}</span>
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

export default DSNhaTro;