import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import {
    apiLayThongTinNhaTroFilter,
    apiLayThongTinPhongFilter, apiThemNguoiDungVaoPhong
} from "../../../services/apiServices";
import { v4 as uuidv4 } from 'uuid';
import "./ThemHoaDon.css";
import { useSelector } from 'react-redux';
const ThemNguoiDungVaPhong = (props) => {

    const { show, setShow } = props;
    const user = useSelector(state => state.user.data);
    const machutro = user.idnguoidung;
    const [dsNhaTro, setDsNhaTro] = useState([]);
    const [dsPhong, setDsPhong] = useState([]);
    const [maNhaTroSelected, setMaNhaTroSelected] = useState("");
    const initNguoiDung = {
        idnguoidung: '',
        maloainguoidung: '',
        hoten: '',
        sodienthoai: '',
        taikhoan: '',
        matkhau: '',
        nhaplaimatkhau: '',
        anhdaidien: '',
        maphong: '',
        manhatro: '',
        ngayvaophong: ''
    };
    const [nguoiDung, setNguoiDung] = useState(initNguoiDung);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNguoiDung({
            ...nguoiDung,
            [name]: value,
        });
    };

    const checkMatKhau = () => {
        //kt do dai mk

        if (nguoiDung.matkhau !== nguoiDung.nhaplaimatkhau) {
            toast.error("Mật khẩu và mật khẩu nhập lại không khớp!!!");
            return 1;
        }
        return 0;
    }

    const taoMaNguoiDung = () => {
        let maNguoiDung = "USER"
        const uuid = uuidv4(); // Example: '6f9c10f1-0a8e-4c28-b8c2-742c84e89819'
        const customLengthuuid = uuid.replace(/-/g, '').substring(0, 6); // Example: '6f9c10f10a'
        maNguoiDung = maNguoiDung + customLengthuuid;
        return maNguoiDung;
    }

    const buildDataToSave = () => {
        let temp = _.cloneDeep(nguoiDung);
        delete temp["nhaplaimatkhau"];
        temp.maloainguoidung = "LTK002";
        temp.idnguoidung = taoMaNguoiDung();
        temp.taikhoan = taoMaNguoiDung();
        temp.matkhau = "";
        temp.manhatro = maNhaTroSelected;
        return temp;
    }

    const handleOnSave = async () => {

        // if (checkMatKhau() === 1) {
        //     return;
        // }
        let data = buildDataToSave();

        let res = await apiThemNguoiDungVaoPhong(data);
        console.log(data.taikhoan);
        if (res.errorCode === 0) {
            if (res.data === 1) {
                toast.success(res.message);
                setNguoiDung(initNguoiDung);
            }
            else {
                toast.error(res.message);
            }
        }
        else {
            toast.error(res.message);
        }
    }

    const handleHide = () => {
        setShow(false);
    }

    const LayThongTinNhaTroToFilter = async () => {
        let res = await apiLayThongTinNhaTroFilter(machutro);
        if (res.errorCode === 0) {
            setDsNhaTro(res.data);
        }
    }

    const LayThongTinPhongToFilter = async () => {
        let res = await apiLayThongTinPhongFilter(maNhaTroSelected, machutro);
        if (res.errorCode === 0) {
            setDsPhong(res.data);
        }
    }

    useEffect(() => {
        LayThongTinNhaTroToFilter();
    }, [])

    useEffect(() => {
        LayThongTinPhongToFilter();
    }, [maNhaTroSelected]);

    useEffect(() => {
        if (show === false) {
            setNguoiDung(initNguoiDung);
        }
        else {
            LayThongTinPhongToFilter();
        }
    }, [show])

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
                    Thêm người dùng vào phòng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="hoten">Họ và Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                id="hoten"
                                name="hoten"
                                value={nguoiDung.hoten}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sodienthoai">Số Điện Thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sodienthoai"
                                name="sodienthoai"
                                value={nguoiDung.sodienthoai}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group d-none">
                            <label htmlFor="taikhoan">Tài Khoản</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taikhoan"
                                name="taikhoan"
                                value={nguoiDung.taikhoan}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group d-none">
                            <label htmlFor="matkhau">Mật Khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="matkhau"
                                name="matkhau"
                                value={nguoiDung.matkhau}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group d-none">
                            <label htmlFor="nhaplaimatkhau">Nhập Lại Mật Khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="nhaplaimatkhau"
                                name="nhaplaimatkhau"
                                value={nguoiDung.nhaplaimatkhau}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Dropdown for ManhAtro */}
                        <div className="form-group">
                            <label htmlFor="manhatro">Chọn Nhà Trọ</label>
                            <select
                                className="form-control"
                                id="manhatro"
                                name="manhatro"
                                value={maNhaTroSelected}
                                onChange={(e) => setMaNhaTroSelected(e.target.value)}
                                required
                            >

                                {/* Add options for the dropdown, these can come from props or state */}
                                <option defaultValue={""} value="">Chọn nhà trọ</option>
                                {dsNhaTro.map((item, index) => {
                                    return (<>
                                        <option value={item.manhatro}>{item.tennhatro}</option>
                                    </>)
                                })}

                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="maphong">Chọn phòng</label>
                            <select
                                className="form-control"
                                id="maphong"
                                name="maphong"
                                value={nguoiDung.maphong}
                                onChange={handleChange}
                                required
                            >
                                <option defaultValue={""} value="">Chọn phòng</option>
                                {/* Add options for the dropdown, these can come from props or state */}
                                {dsPhong.map((item, index) => {
                                    return (
                                        <>
                                            <option value={item.MAPHONG}>{item.MAPHONG}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>

                        {/* Date Input for NgayVaoPhong */}
                        <div className="form-group">
                            <label htmlFor="ngayvaophong">Ngày Vào Phòng</label>
                            <input
                                type="date"
                                className="form-control"
                                id="ngayvaophong"
                                name="ngayvaophong"
                                value={nguoiDung.ngayvaophong}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </form>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-primary' onClick={() => handleOnSave()}>Save</Button>
                <Button className='btn btn-warning' onClick={() => handleHide()}>Close</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ThemNguoiDungVaPhong;