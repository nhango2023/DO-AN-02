import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {
    apiLayThongTinNhaTroFilter,
    apiLayThongTinPhongChiSoCu,
    apiLayThongTinPhongFilter,
    apiLayThongTinPhongTienThuePhong, apiTaoHoaDon
} from "../../../services/apiServices";
import { v4 as uuidv4 } from 'uuid';
import "./ThemHoaDon.css";
import { useSelector } from 'react-redux';
import { use } from 'react';
import _ from 'lodash';
const ThemHoaDon = (props) => {

    const { show, setShow } = props;
    const user = useSelector(state => state.user.data);
    const machutro = user.idnguoidung;

    // const [maNhaTro, setmaNhaTro] = useState("");
    // const [maPhong, setMaPhong] = useState("");
    const [chiSoCu, setChiSoCu] = useState([]);
    const [dichVuThuePhong, setDichVuThuePhong] = useState({});
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [dsPhong, setDsPhong] = useState([]);
    const [maPhongSelected, setMaPhongSelected] = useState("");
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const [maQr, setmaQr] = useState("");
    const [disableSaveBtn, setDisableSaveBtn] = useState(false);
    const [ngayGhi, setNgayGhi] = useState("");
    const [myBank, setMyBank] = useState({
        bankId: 'vietcombank',
        accountNo: '9337405155',
        accountName: 'NGO QUAN THANH NHA',
        noidungchuyenkhoan: ""
    })
    const initHoaDon = [{
        madv: "",
        chisomoi: "",
        thanhtien: "",
        soluongdasudung: 0
    },
    {
        madv: "",
        chisomoi: "",
        thanhtien: "",
        soluongdasudung: 0
    }
    ]
    const [hoaDon, setHoaDon] = useState(initHoaDon);

    const today = '2024-2-1';
    const dateNow = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;

        return today;
    }
    const handleBuildHoaDon = (index, chisocu, dongia, madv) => {
        let temp = _.cloneDeep(hoaDon);
        if (temp[index].chisomoi < chisocu) {
            toast.error("Chỉ số mới phải lớn hoặc bằng chỉ số cũ");
            return;
        }
        temp[index].madv = madv;
        temp[index].soluongdasudung = (+temp[index].chisomoi - +chisocu).toFixed(1);
        temp[index].thanhtien = (+temp[index].soluongdasudung) * +dongia;

        setHoaDon(temp);
    }

    const handleHide = () => {
        setShow(false);
    }

    const LayThongTinNhaTroToFilter = async () => {

        const res = await apiLayThongTinNhaTroFilter(machutro);

        if (res.errorCode == 0) {
            setDsNhaTro(res.data);
        }
    }

    const LayThongTinPhongToFilter = async () => {

        const res = await apiLayThongTinPhongFilter(maNhaTroSelected, machutro);

        if (res.errorCode == 0) {
            setDsPhong(res.data);
        }
    }

    const LayThongTinTienThuePhong = async () => {
        const res = await apiLayThongTinPhongTienThuePhong(maNhaTroSelected, maPhongSelected);
        if (res.errorCode == 0) {
            setDichVuThuePhong(res.data[0]);
        }
    }
    const LayThongTinChiSoCu = async () => {

        const res = await apiLayThongTinPhongChiSoCu(maNhaTroSelected, maPhongSelected, ngayGhi);
        if (res.errorCode == 0) {
            setChiSoCu(res.data);
        }
    }
    useEffect(() => {
        if (show === true) {
            LayThongTinPhongToFilter();
            LayThongTinNhaTroToFilter();
        }
        if (maNhaTroSelected != "" && maPhongSelected != "" && ngayGhi != "") {
            LayThongTinChiSoCu();
            LayThongTinTienThuePhong();
        } else if (maNhaTroSelected == "" || maPhongSelected == "" || ngayGhi == "") {
            setChiSoCu([]);
            setDichVuThuePhong({});
        }

    }, [maNhaTroSelected, maPhongSelected, show, ngayGhi])
    const handleOnChangeInput = (index, value) => {
        const temp = _.cloneDeep(hoaDon);
        temp[index].chisomoi = value;
        setHoaDon(temp);
    }
    useEffect(() => {
        if (show === false) {
            initThemHoaDon();
        }
    }, [show])

    const handleOnSave = async () => {
        let data = buildDataToSave();

        let res = await apiTaoHoaDon(data);
        if (res.errorCode == 0) {
            toast.success(res.message);
            setShow(false);
        }
        else {
            toast.error(res.message);
        }

        // const linkQr = `https://img.vietqr.io/image/${myBank.bankId}-${myBank.accountNo}-
        // qr_only.png?amount=${data[2].tongtien}&addInfo=
        // ${'thanh toan tien phong ' + data[2].maphong + " " + data[2].ngayghi}
        // &accountName=${myBank.accountName}`
        // setmaQr(linkQr);
        // let temp = _.cloneDeep(myBank);
        // temp.noidungchuyenkhoan = 'thanh toan tien phong ' + data[2].maphong + " " + data[2].ngayghi;
        // setMyBank(temp);
        // window.print();
    }
    const taoMaHoaDon = () => {
        const uuid = uuidv4(); // Example: '6f9c10f1-0a8e-4c28-b8c2-742c84e89819'
        const mahd = uuid.replace(/-/g, '').substring(0, 10); // Example: '6f9c10f10a  
        return mahd;
    }
    const buildDataToSave = () => {
        let mahd = taoMaHoaDon();
        let tongtien = (+hoaDon[0].thanhtien) + (+hoaDon[1].thanhtien) + (+dichVuThuePhong.gia);
        let thongTinBoSung = {
            tongtien: tongtien,
            mahd: mahd,
            manhatro: maNhaTroSelected,
            maphong: maPhongSelected,
            ngayghi: ngayGhi
        }
        let dataToSave = _.cloneDeep(hoaDon);
        dataToSave.push(thongTinBoSung);
        return dataToSave;
    }

    const initThemHoaDon = () => {
        setmaQr("");
        setHoaDon(initHoaDon);
        setMaPhongSelected("");
        setMaNhaTroSelected("");
        setChiSoCu([]);
        setDichVuThuePhong({});
        setNgayGhi("");
    }

    useEffect(() => {
        if (show == false) {
            setHoaDon(initHoaDon);
        }
        else {
            LayThongTinNhaTroToFilter();
        }
    }, [show])

    const handleBtnThemMoi = () => {
        setDisableSaveBtn(false);
        setHoaDon(initHoaDon);
    }
    return (
        <Modal
            show={show}
            onHide={handleHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Lập hóa đơn <sup>Ngày lập lần cuối: {chiSoCu[0]?.NGAYGHI}</sup>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex '>
                    <div class="form-group d-flex align-items-center me-5">
                        <label className="d-block w-75" for="inputState">
                            Nhà trọ
                        </label>
                        <select style={{ width: '115px' }}
                            id="inputState" class="form-control"
                            value={maNhaTroSelected}
                            onChange={(e) => setMaNhaTroSelected(e.target.value)}
                        >
                            <option defaultValue={""} value={""}>
                                Chọn nhà trọ
                            </option>
                            {dsNhaTro.map((item, index) => {
                                return (
                                    <>
                                        <option
                                            value={item.manhatro}>
                                            {item.tennhatro}
                                        </option>
                                    </>
                                )
                            })}

                        </select>
                    </div>

                    <div class="form-group d-flex align-items-center me-5">
                        <label className="d-block w-50 me-2" for="inputState">
                            Phòng
                        </label>
                        <select id="inputState" class="form-control"
                            value={maPhongSelected}
                            onChange={(e) => setMaPhongSelected(e.target.value)}
                        >
                            <option defaultValue={""} value={""}>
                                Chọn phòng
                            </option>
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
                    <div className="form-group">
                        <label htmlFor="ngayvaophong">Ngày lập</label>
                        <input
                            type="date"
                            className="form-control"
                            id="ngaytao"
                            name="ngaytao"
                            value={ngayGhi}
                            onChange={(e) => setNgayGhi(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <table style={{ width: "100%", borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f4f4f4' }}>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Tên dịch vụ</th>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Chỉ số cũ</th>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Chỉ số mới</th>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Số lượng đã sử dụng</th>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Đơn giá</th>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Đơn vị tính</th>
                            <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>

                        {chiSoCu.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>{item.tendichvu}</td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>{item.CHISOCU}</td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>
                                            <input min={"100"} type="text" class="form-control w-75"
                                                placeholder="Chỉ số mới" aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                value={hoaDon[index].chisomoi}
                                                readOnly={show === false}
                                                onChange={(e) => handleOnChangeInput(index, e.target.value)}
                                                onBlur={(e) => handleBuildHoaDon(index, item.CHISOCU, item.gia, item.madichvu)} />
                                        </td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>
                                            {hoaDon[index].soluongdasudung > 0 ?
                                                hoaDon[index].soluongdasudung : 0
                                            }
                                        </td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>{(+item.gia).toLocaleString()}</td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>{item.DONVITINH}</td>

                                        <td style={{ padding: '10px', textAlign: 'center' }}>{(+hoaDon[index].thanhtien).toLocaleString()}</td>
                                    </tr>
                                </>
                            )
                        })}


                        <tr>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{dichVuThuePhong && dichVuThuePhong.tendichvu ? dichVuThuePhong.tendichvu : ""}</td>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
                            <td style={{ padding: '10px' }}>{(+dichVuThuePhong?.gia || 0).toLocaleString()}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>Phòng</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{(+dichVuThuePhong?.gia || 0).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px' }}></td>
                            <td style={{ padding: '10px' }}>Tổng tiền</td>
                            <td style={{ padding: '10px' }}>{(+hoaDon[0].thanhtien + (+hoaDon[1].thanhtien) + (+dichVuThuePhong?.gia || 0)).toLocaleString()} </td>
                        </tr>
                    </tbody>
                </table>
                {disableSaveBtn === false ? "" :
                    <div
                        className='d-flex jutify-content-center align-items-center'>

                        <img className="w-50 h-50" src={maQr} alt="" />
                        <div className='d-inline-block'>
                            <p>Chủ tài khoản: {myBank.accountName}</p>
                            <p>Ngân hàng: {myBank.bankId}</p>
                            <p>Số tài khoản: {myBank.accountNo}</p>
                            <p>Nội dung chuyển khoản: {myBank.noidungchuyenkhoan}</p>
                        </div>
                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button style={{ display: disableSaveBtn ? 'block' : 'none' }} className='btn btn-primary' onClick={() => handleBtnThemMoi()}>Thêm mới</Button>
                <Button disabled={disableSaveBtn} className='btn btn-primary' onClick={() => handleOnSave()}>Save</Button>
                <Button className='btn btn-warning' onClick={() => handleHide()}>Close</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ThemHoaDon;