import "./TongDoanhThu.css";

const TongDoanhThu = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">

                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Khoảng thời gian</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tới hiện tại</option>
                                    <option>Trong năm nay</option>
                                    <option >Quý 1</option>
                                    <option >Quý 2</option>
                                    <option >Quý 3</option>
                                    <option >Quý 4</option>
                                </select>
                            </div>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Nhà trọ</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tổng tất cả</option>
                                    <option >Phú Quý</option>
                                    <option >Phát Đạt</option>
                                    <option >Hồng Phát</option>
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
                            <h4>Doanh số</h4>
                            <div className="chart">
                                <div className="y-axis">
                                    <div>100M</div>
                                    <div>75M</div>
                                    <div>50M</div>
                                    <div>25M</div>
                                    <div>0</div>
                                </div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "60%" }}
                                    title="Doanh thu: 60M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "80%" }}
                                    title="Doanh thu: 80M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "50%" }}
                                    title="Doanh thu: 50M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "90%" }}
                                    title="Doanh thu: 90M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "70%" }}
                                    title="Doanh thu: 70M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "40%" }}
                                    title="Doanh thu: 40M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "85%" }}
                                    title="Doanh thu: 85M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "40%" }}
                                    title="Doanh thu: 40M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "85%" }}
                                    title="Doanh thu: 85M"
                                ></div>
                            </div>
                            <div className="months">
                                <div className="month">Tháng 1</div>
                                <div className="month">Tháng 2</div>
                                <div className="month">Tháng 3</div>
                                <div className="month">Tháng 4</div>
                                <div className="month">Tháng 5</div>
                                <div className="month">Tháng 6</div>
                                <div className="month">Tháng 7</div>
                                <div className="month">Tháng 8</div>
                                <div className="month">Tháng 9</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="chart-container">
                            <h4>Khách thuê phòng</h4>
                            <div className="chart">
                                <div className="y-axis">
                                    <div>100M</div>
                                    <div>75M</div>
                                    <div>50M</div>
                                    <div>25M</div>
                                    <div>0</div>
                                </div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "60%" }}
                                    title="Doanh thu: 60M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "80%" }}
                                    title="Doanh thu: 80M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "50%" }}
                                    title="Doanh thu: 50M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "90%" }}
                                    title="Doanh thu: 90M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "70%" }}
                                    title="Doanh thu: 70M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "40%" }}
                                    title="Doanh thu: 40M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "85%" }}
                                    title="Doanh thu: 85M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "40%" }}
                                    title="Doanh thu: 40M"
                                ></div>
                                <div
                                    className="bar"
                                    style={{ "--final-height": "85%" }}
                                    title="Doanh thu: 85M"
                                ></div>
                            </div>
                            <div className="months">
                                <div className="month">Tháng 1</div>
                                <div className="month">Tháng 2</div>
                                <div className="month">Tháng 3</div>
                                <div className="month">Tháng 4</div>
                                <div className="month">Tháng 5</div>
                                <div className="month">Tháng 6</div>
                                <div className="month">Tháng 7</div>
                                <div className="month">Tháng 8</div>
                                <div className="month">Tháng 9</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TongDoanhThu;