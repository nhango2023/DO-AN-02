import "./TongDoanhThu.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiLayDoanhThu, apiLayThongTinNhaTroFilter } from "../../services/apiServices";

const TongDoanhThu = () => {
    const user = useSelector(state => state.user.data);
    const machutro = user.idnguoidung;
    const [dsDoanhThu, setDsDoanhThu] = useState([]);
    const [tongDoanhThu, setTongDoanhThu] = useState(0);
    const [namSelected, setNamSelected] = useState("");
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const yearNow = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        return yyyy;
    }
    const layDoanhThu = async () => {
        let res = await apiLayDoanhThu(machutro, maNhaTroSelected, namSelected);
        if (res.errorCode == 0) {
            setDsDoanhThu(res.data);
            let tongdoanhthu = 0;
            res.data.forEach(element => {
                tongdoanhthu = tongdoanhthu + element.TongDoanhThu;
            });
            setTongDoanhThu(tongdoanhthu);
        }
    }

    const layThongTinNhaTroToFilter = async () => {
        let res = await apiLayThongTinNhaTroFilter(machutro);
        if (res.errorCode == 0) {
            setDsNhaTro(res.data);
        }
    }

    useEffect(() => {
        layDoanhThu();
        layThongTinNhaTroToFilter();
    }, [])
    useEffect(() => {
        layDoanhThu();

    }, [namSelected, maNhaTroSelected])

    function formatDoanhThu(value) {
        if (value >= 1000000) {
            return Math.round(value / 1000000); // Round and divide by 1M for numbers >= 1M
        } else if (value >= 100000) {
            return Math.round((value / 100000) * 10) / 10; // Divide by 100K for numbers >= 100K
        } else {
            return value; // Return as-is for smaller values
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">

                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Khoảng thời gian</label>
                                <select id="inputState" class="form-control"
                                    value={namSelected}
                                    onChange={(e) => setNamSelected(e.target.value + "")}
                                >
                                    <option defaultValue={""} value={""}>Tới hiện tại</option>
                                    <option value={yearNow()}>Năm nay</option>
                                    <option value={+yearNow() - 1}>Năm trước</option>
                                </select>
                            </div>
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

                        </div>

                        <div className="">

                        </div>
                    </div>
                </div>
                <div className="row mt-2" style={{ height: '610px' }}>
                    <div className="col-12">
                        <div className="chart-container">
                            <h4>Doanh thu</h4>
                            <div className="chart">
                                <div className="y-axis">
                                    <div>{formatDoanhThu((tongDoanhThu / 5) * 5)}M</div>
                                    <div>{formatDoanhThu((tongDoanhThu / 5) * 4)}M</div>
                                    <div>{formatDoanhThu((tongDoanhThu / 5) * 3)}M</div>
                                    <div>{formatDoanhThu((tongDoanhThu / 5) * 2)}M</div>
                                    <div>{formatDoanhThu((tongDoanhThu / 5) * 1)}M</div>
                                    <div>{0}</div>
                                </div>
                                {dsDoanhThu.map((item, index) => {
                                    return (
                                        <>
                                            <div
                                                className="bar"
                                                style={{
                                                    "--final-height": tongDoanhThu
                                                        ? `${(item.TongDoanhThu / tongDoanhThu) * 100}%`
                                                        : "0%",
                                                }}
                                                title={(+item.TongDoanhThu).toLocaleString()}
                                            >
                                            </div>
                                        </>
                                    )
                                })}


                            </div>
                            <div className="months">
                                {dsDoanhThu.map((item, index) => {
                                    return (
                                        <>
                                            <div className="month">{item.Thang + "/" + item.Nam}</div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TongDoanhThu;