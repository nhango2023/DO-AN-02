import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiLayThongTin1NhaTro, apiLayThongTinNhaTro, apiSuaNhaTro } from '../../../services/apiServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SuaHoaDon = (props) => {
    const { show, setShow, manhatro, refreshPage } = props;
    const initNhaTro = {
        TENNHATRO: "",
        DIADIEM: "",
        NGAYTAO: "",
        CHIEUDAI: "",
        CHIEURONG: ""
    }
    const [nhaTro, setNhaTro] = useState(initNhaTro);
    // console.log(machutro + "\t" + manhatro);
    const handleHide = () => {
        setShow(false);
    }
    const buildDataToSave = () => {
        let nhatro = {
            tennhatro: nhaTroToSua.TENNHATRO,
            manhatro: manhatro,
            diadiem: nhaTroToSua.DIADIEM,
            chieudai: +nhaTroToSua.CHIEUDAI,
            chieurong: +nhaTroToSua.CHIEURONG,
            ngaytao: nhaTroToSua.NGAYTAO
        }
        return nhatro;
    }
    const handleOnSave = async () => {
        let nhatro = buildDataToSave();
        let res = await apiSuaNhaTro(nhatro);
        if (res.errorCode === 0) {
            toast.success("Sửa thành công");
            refreshPage();
            setShow(false);
        }
    }

    const layThongTinNhaTro = async () => {
        const res = await apiLayThongTin1NhaTro(manhatro);
        if (res.errorCode === 0) {
            setNhaTro(res.data);
        }
    }

    useEffect(() => {
        if (show === true) {
            layThongTinNhaTro();
        }
    }, [manhatro])
    useEffect(() => {
        if (show === false) {
            setEdit(false);
        }
    }, [show])

    const [nhaTroToSua, setNhaTroToSua] = useState(initNhaTro);
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from input
        setNhaTroToSua((prevState) => ({
            ...prevState, // Keep previous state
            [name]: value, // Update the specific field
        }));
    };
    const [edit, setEdit] = useState(false);
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
                        Sửa hóa đơn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container mt-5">
                        <form>
                            <div className="row">
                                {/* Left Column */}
                                <div className={edit ? "col-md-6" : "col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Tên nhà trọ</label>
                                        <input type="text" className="form-control" id="input1" placeholder={nhaTro.TENNHATRO} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Địa điểm</label>
                                        <input type="text" className="form-control" id="input2" placeholder={nhaTro.DIADIEM} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input3" className="form-label">Ngày tạo</label>
                                        <input type="text" className="form-control" id="input3" placeholder={nhaTro.NGAYTAO + ""} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Chiều dài</label>
                                        <input type="text" className="form-control" id="input4" placeholder={nhaTro.CHIEUDAI} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Chiều rộng</label>
                                        <input type="text" className="form-control" id="input5" placeholder={nhaTro.CHIEURONG} disabled />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className={edit ? "col-md-6" : "d-none"}>
                                    <div className="mb-3">
                                        <label htmlFor="input6" className="form-label">
                                            Tên nhà trọ
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="input6"
                                            name="TENNHATRO"
                                            onChange={handleChange}
                                            value={nhaTroToSua.TENNHATRO}
                                            placeholder="Nhập tên mới nhà trọ"
                                        />
                                    </div>

                                    {/* Input 7 */}
                                    <div className="mb-3">
                                        <label htmlFor="input7" className="form-label">
                                            Địa điểm
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="input7"
                                            name="DIADIEM"
                                            value={nhaTroToSua.DIADIEM}
                                            onChange={handleChange}
                                            placeholder="Nhập một địa điểm khác"
                                        />
                                    </div>

                                    {/* Input 8 */}
                                    <div className="mb-3">
                                        <label htmlFor="input8" className="form-label d-block">
                                            Ngày tạo
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="input9"
                                            name="NGAYTAO"
                                            value={nhaTroToSua.NGAYTAO}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Input 9 */}
                                    <div className="mb-3">
                                        <label htmlFor="input9" className="form-label">
                                            Chiều dài
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="input9"
                                            name="CHIEUDAI"
                                            value={nhaTroToSua.CHIEUDAI}
                                            onChange={handleChange}
                                            placeholder="Nhập vào chiều dài"
                                        />
                                    </div>

                                    {/* Input 10 */}
                                    <div className="mb-3">
                                        <label htmlFor="input10" className="form-label">
                                            Chiều rộng
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="input10"
                                            name="CHIEURONG"
                                            value={nhaTroToSua.CHIEURONG}
                                            onChange={handleChange}
                                            placeholder="Nhập vào chiều rộng"
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

export default SuaHoaDon;