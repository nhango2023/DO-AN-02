import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import {
    apiLayThongTinNhaTroFilter,
    apiTaoPhong
} from "../../../services/apiServices";
import { v4 as uuidv4 } from 'uuid';
import "./ThemHoaDon.css";
import { useSelector } from 'react-redux';
const ThemPhong = (props) => {

    const { show, setShow } = props;
    const user = useSelector(state => state.user.data);
    const machutro = user.idnguoidung;
    const today = '2023-1-1';
    const initPhong = {
        manhatro: '',
        maphong: '',
        mota: '',
        chieudai: '',
        chieurong: '',
        ngaytao: '',
        madv1: '',
        giadv1: '',
        madv2: '',
        giadv2: '',
        madv3: '',
        giadv3: ''

    }

    const [phong, setPhong] = useState(initPhong);
    const [dsNhaTro, setDsNhaTro] = useState([]);


    const dateNow = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;

        return today;
    }

    const LayThongTinNhaTroToFilter = async () => {
        let res = await apiLayThongTinNhaTroFilter(machutro);
        if (res.errorCode === 0) {
            setDsNhaTro(res.data);
        }
    }

    const handleHide = () => {
        setShow(false);
    }

    useEffect(() => {
        if (show === false) {
            setPhong(initPhong);
        }
    }, [show])

    useEffect(() => {
        if (show === true) {
            LayThongTinNhaTroToFilter();
        }
    }, [show])

    const buildDataToSave = () => {
        let temp = _.cloneDeep(phong);
        temp.chieudai = (+temp.chieudai).toFixed(1);
        temp.chieurong = (+temp.chieurong).toFixed(1);
        temp.madv1 = 'DV001';
        temp.madv2 = 'DV002';
        temp.madv3 = 'DV003';
        return temp;
    }
    const handleOnSave = async () => {
        let data = buildDataToSave();
        let res = await apiTaoPhong(data);
        if (res.errorCode === 0) {
            if (res.data === 1) {
                toast.success("Tạo phòng thành công");
                window.location.reload();
            }
            else {
                toast.error("Mã phòng đã tồn tại!!");
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhong({
            ...phong,
            [name]: value
        });
    };

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
                    Thêm phòng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container mt-5">
                    <form >
                        <div className="form-group">
                            <label htmlFor="manhatro">Tên Nhà Trọ</label>
                            <select
                                className="form-control"
                                id="manhatro"
                                name="manhatro"
                                value={phong.manhatro}
                                onChange={handleChange}
                            >
                                <option defaultValue={""} value="">Chọn Nhà Trọ</option>
                                {dsNhaTro.map((item, index) => {
                                    return (<>
                                        <option value={item.manhatro}>{item.tennhatro}</option>
                                    </>)
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="maphong">Số Phòng</label>
                            <input
                                type="number"
                                className="form-control"
                                id="maphong"
                                name="maphong"
                                value={phong.maphong}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mota">Mô Tả</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mota"
                                name="mota"
                                value={phong.mota}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="chieudai">Chiều Dài (m)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="chieudai"
                                name="chieudai"
                                value={phong.chieudai}
                                onChange={handleChange}
                                min={"0"}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="chieurong">Chiều Rộng (m)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="chieurong"
                                name="chieurong"
                                value={phong.chieurong}
                                onChange={handleChange}
                                min={"0"}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="giadv1">Tiền Phòng</label>
                            <input
                                type="number"
                                className="form-control"
                                id="giadv1"
                                name="giadv1"
                                value={(phong.giadv1)}
                                onChange={handleChange}
                                min={"0"}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="giadv2">Tiền Điện</label>
                            <input
                                type="number"
                                className="form-control"
                                id="giadv2"
                                name="giadv2"
                                value={phong.giadv2}
                                onChange={handleChange}
                                min={"0"}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="giadv3">Tiền Nước</label>
                            <input
                                type="number"
                                className="form-control"
                                id="giadv3"
                                name="giadv3"
                                value={phong.giadv3}
                                onChange={handleChange}
                                min={"0"}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ngayvaophong">Ngày tạo</label>
                            <input
                                type="date"
                                className="form-control"
                                id="ngaytao"
                                name="ngaytao"
                                value={phong.ngaytao}
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

export default ThemPhong;