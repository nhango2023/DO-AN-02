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
    const [dataForPieChart, setDaTaForPieChart] = useState([]);
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
            const groupedData = transformedData(res.data);

            setDaTaForPieChart(groupedData);
            let tongdoanhthu = 0;
            res.data.forEach(element => {
                tongdoanhthu = tongdoanhthu + element.TongDoanhThu;
            });
            setTongDoanhThu(tongdoanhthu);
        }
    }

    function transformedData(data) {
        const groupedData = data.reduce((acc, item) => {
            const { Nam, Thang, TongDoanhThu } = item;

            // Find the year in the accumulator or create a new one
            let yearEntry = acc.find(entry => entry.Nam === Nam);
            if (!yearEntry) {
                yearEntry = { Nam, data: [], TongDoanhThu: 0 };
                acc.push(yearEntry);
            }

            // Add the month's data
            yearEntry.data.push({ Thang, TongDoanhThu });

            // Update the total revenue for the year
            yearEntry.TongDoanhThu += TongDoanhThu;

            return acc;
        }, []);

        return groupedData;
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
    const colors = [
        "#76c7c0", // Greenish-blue
        "#4caf50", // Green
        "#ff9800", // Orange
        "#f44336", // Red
        "#9c27b0", // Purple
        "#2196f3", // Blue
        "#ffc107", // Amber
        "#8bc34a", // Light Green
        "#e91e63", // Pink
        "#607d8b", // Blue Gray
        "#795548", // Brown
        "#00bcd4"  // Cyan
    ];
    return (
        <>
            <div className="container-fluid ">
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
                {/* <div className="row mt-2 ">
                    <div className="d-flex justify-content-center">
                        {dataForPieChart.map((item, index) => {
                            return (
                                <>
                                    <div className="d-flex flex-column justify-content-center"
                                        style={{ textAlign: 'center' }}>
                                        <div className="d-flex justify-content-center"
                                            style={{ gap: '60px' }}>
                                            <div class="chart-wrapper">

                                                <div class="chart-container">

                                                    <div className="pie-chart">
                                                        {(() => {
                                                            let degree = 0; // Initialize degree outside the map function for cumulative updates
                                                            return item.data.map((value, index) => {
                                                                const rotation = (360 * value.TongDoanhThu) / item.TongDoanhThu;


                                                                const currentRotation = degree; // Save the current degree for this slice
                                                                degree += rotation; // Update the degree for the next slice

                                                                return (
                                                                    <div
                                                                        key={index} // Add a unique key for each element
                                                                        style={{
                                                                            backgroundColor: `${colors[index]}`,
                                                                            transform: `rotate(${currentRotation}deg)`,
                                                                        }}
                                                                        className="slice"
                                                                    ></div>
                                                                );
                                                            });
                                                        })()}
                                                    </div>


                                                </div>
                                                <div class="legend">
                                                    {item.data.map((value, index) => {
                                                        return (
                                                            <>
                                                                <div key={index}
                                                                    class="legend-item">
                                                                    <div class="legend-color" style={{ backgroundColor: `${colors[index]}` }}></div>
                                                                    <div>Tháng: {value.Thang}---{(+value.TongDoanhThu).toLocaleString()}</div>
                                                                </div>
                                                            </>
                                                        )
                                                    })}


                                                </div>
                                            </div>

                                        </div>
                                        <div class="chart-label">Year: {item.Nam}</div>
                                    </div>
                                </>
                            )
                        })}


                    </div>
                </div> */}
            </div>

        </>
    )
}

export default TongDoanhThu;