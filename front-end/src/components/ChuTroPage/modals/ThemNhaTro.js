import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import { apiTaoNhaTro } from "../../../services/apiServices";
import { v4 as uuidv4 } from 'uuid';
import "./ThemHoaDon.css";

const ThemNhaTro = (props) => {

    const { show, setShow } = props;
    const machutro = 'ND001';
    const initNhaTro = {
        manhatro: "",
        idnguoidung: machutro,
        tennhatro: "",
        diadiem: "",
        ngaytao: '',
        chieudai: "",
        chieurong: "",
        anhdaidien: ''

    }
    const [nhaTro, setNhaTro] = useState(initNhaTro);
    const today = '2023-1-1';
    const dateNow = () => {
        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();

        // today = yyyy+"-"+mm+"-"+dd;

        return today;
    }

    const taoMaNhaTro = () => {
        let maNhaTro = "NTR"
        const uuid = uuidv4(); // Example: '6f9c10f1-0a8e-4c28-b8c2-742c84e89819'
        const customLengthuuid = uuid.replace(/-/g, '').substring(0, 7); // Example: '6f9c10f10a'
        maNhaTro = maNhaTro + customLengthuuid;
        return maNhaTro;
    }

    const handleHide = () => {
        setShow(false);
    }

    useEffect(() => {
        if (show === false) {
            setNhaTro(initNhaTro);
        }
    }, [show])

    const buildDataToSave = () => {
        let temp = _.cloneDeep(nhaTro);
        temp.manhatro = taoMaNhaTro();
        temp.ngaytao = today;
        temp.chieudai = +temp.chieudai;
        temp.chieurong = +temp.chieurong;
        return temp;
    }
    const handleOnSave = async () => {
        let data = buildDataToSave();
        let res = await apiTaoNhaTro(data);
        if (res.errorCode === 0) {
            toast.success("Tạo nhà trọ thành công");
        }
        else {
            toast.error("Server error!!");
        }
    }

    const handleOnChange = (keyword, value) => {
        let temp = _.cloneDeep(nhaTro);
        if (keyword === "tennhatro") {

            temp.tennhatro = value;
            console.log(temp.tennhatro);
        }
        else if (keyword === "diadiem") {
            temp.diadiem = value;
        }
        else if (keyword === "chieudai") {
            temp.chieudai = value;
        }
        else {
            temp.chieurong = value;
        }
        setNhaTro(temp);
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
                    Thêm nhà trọ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container mt-5">

                    <form >
                        <div className="form-group mb-3">
                            <label htmlFor="tenNhaTro">Tên nhà trọ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenNhaTro"
                                name="tenNhaTro"
                                value={nhaTro.tennhatro}
                                onChange={(e) => handleOnChange("tennhatro", e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="diaDiem">Địa điểm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="diaDiem"
                                name="diaDiem"
                                value={nhaTro.diadiem}
                                onChange={(e) => handleOnChange("diadiem", e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="chieuDai">Chiều dài (m)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="chieuDai"
                                name="chieuDai"
                                value={nhaTro.chieudai}
                                onChange={(e) => handleOnChange("chieudai", e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="chieuRong">Chiều rộng (m)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="chieuRong"
                                name="chieuRong"
                                value={nhaTro.chieurong}
                                onChange={(e) => handleOnChange("chieurong", e.target.value)}
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

export default ThemNhaTro;