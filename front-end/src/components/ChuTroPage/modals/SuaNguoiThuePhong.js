import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiLayThongTinNguoiDungDeSua, apiLayThongTinNhaTro, apiSuaNguoiDung, apiSuaNhaTro } from '../../../services/apiServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SuaNguoiThuePhong = (props) => {
    const { show, setShow, refreshPage, idnguoidung } = props;
    const [edit, setEdit] = useState(false);
    const initNguoiThuePhong = {
        HOTEN: "",
        SODIENTHOAI: "",
        CCCD: ""
    }
    const [nguoiDungCu, setNguoiDungCu] = useState(initNguoiThuePhong);

    const [nguoiDungMoi, setNguoiDungMoi] = useState(initNguoiThuePhong);
    const LayThongTinNguoiDungDeSua = async () => {
        console.log(idnguoidung)
        const res = await apiLayThongTinNguoiDungDeSua(idnguoidung);
        console.log(res.data);
        if (res.errorCode === 0) {
            setNguoiDungCu(res.data);
            setNguoiDungMoi(res.data);
        }

    }
    useEffect(() => {
        if (show == true) {
            LayThongTinNguoiDungDeSua();
        }
    }, [idnguoidung])

    const handleHide = () => {
        setShow(false);
    }
    const buildDataToSave = () => {
        let data = {
            idnguoidung,
            hoten: nguoiDungMoi.HOTEN,
            sodienthoai: nguoiDungMoi.SODIENTHOAI,
            cccd: nguoiDungMoi.CCCD
        }
        return data;
    }
    const handleOnSave = async () => {
        let data = buildDataToSave();
        const res = await apiSuaNguoiDung(data);
        if (res.errorCode == 0) {
            toast.success("Sửa thành công");
        }
        else {
            toast.error("Lỗi");
        }
    }

    useEffect(() => {
        if (show === false) {
            setEdit(false);
        }
    }, [show])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNguoiDungMoi((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sửa người thuê phòng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form >
                            <div className="row">
                                {/* Left Column */}
                                <div className={edit ? "col-md-6" : "col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Họ và tên</label>
                                        <input type="text" className="form-control"
                                            id="input1"
                                            value={nguoiDungCu.HOTEN}
                                            disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Số điện thoại</label>
                                        <input type="text" className="form-control"
                                            id="input1"
                                            value={nguoiDungCu.SODIENTHOAI}
                                            disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">CCCD</label>
                                        <input type="text" className="form-control" id="input2"
                                            value={nguoiDungCu.CCCD}
                                            disabled />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className={edit ? "col-md-6" : "d-none"}>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Họ và tên</label>
                                        <input type="text" className="form-control"
                                            id="input1"
                                            name='HOTEN'
                                            value={nguoiDungMoi.HOTEN}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Số điện thoại</label>
                                        <input type="text" className="form-control"
                                            id="input1"
                                            name='SODIENTHOAI'
                                            value={nguoiDungMoi.SODIENTHOAI}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">CCCD</label>
                                        <input type="text" className="form-control" id="input2"
                                            name='CCCD'
                                            value={nguoiDungMoi.CCCD}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={edit ? 'btn btn-primary' : "d-none"} onClick={() => handleOnSave()}>Save</Button>
                    <Button className={edit ? 'd-none' : 'btn btn-primary'} onClick={() => setEdit(true)}>Chỉnh sửa</Button>
                    <Button className='btn btn-warning' onClick={() => handleHide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SuaNguoiThuePhong;