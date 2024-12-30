import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiLayThongTin1NhaTro, apiLayThongTinDichVuPhongDeSua, apiLayThongTinNhaTro, apiLayThongTinNhaTroFilter, apiLayThongTinPhongDeSua, apiSuaNhaTro, apiSuaPhong } from '../../../services/apiServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SuaPhong = (props) => {
    const { show, setShow, manhatro, refreshPage, machutro, maphong } = props;
    const initPhongCu = {
        CHIEUDAI: "",
        CHIEURONG: "",
        NGAYTAO: "",
        mota: "",
        TENNHATRO: ""
    }

    const [phongCu, setPhongCu] = useState(initPhongCu);
    const [phongMoi, setPhongMoi] = useState(initPhongCu);
    const [dichVuPhongCu, setDichVuPhongCu] = useState([]);
    const [dichVuPhongMoi, setDichVuPhongMoi] = useState([]);
    const [nhaTro, setNhaTro] = useState([]);

    const handleHide = () => {
        setShow(false);
    }
    const buildDataToSave = () => {

        let phong = {
            maphongcu: maphong,
            manhatrocu: manhatro,
            maphongmoi: phongMoi.maphong,
            manhatromoi: phongMoi.manhatro,
            chieudai: phongMoi.CHIEUDAI,
            chieurong: phongMoi.CHIEURONG,
            mota: phongMoi.mota,
            ngaytao: phongMoi.NGAYTAO,
            madv1: dichVuPhongMoi[0].MADICHVU,
            giadv1: dichVuPhongMoi[0].gia,
            madv2: dichVuPhongMoi[1].MADICHVU,
            giadv2: dichVuPhongMoi[1].gia,
            madv3: dichVuPhongMoi[2].MADICHVU,
            giadv3: dichVuPhongMoi[2].gia,
        }
        return phong;
    }
    const handleOnSave = async () => {
        let phong = buildDataToSave();


        let res = await apiSuaPhong(phong);
        if (res.errorCode === 0) {
            if (res.data == 1) {
                toast.success(res.message);
                setShow(false);
            }
            else {
                toast.error(res.message);
            }
        }
        else {
            toast.error(res.message);
        }
        refreshPage();
    }

    const layThongTinNhaTroToFilter = async () => {
        const res = await apiLayThongTinNhaTroFilter(machutro);
        if (res.errorCode === 0) {
            setNhaTro(res.data);
        }
    }

    const layThongTinDichVuPhong = async () => {


        const res = await apiLayThongTinDichVuPhongDeSua(manhatro, maphong);

        if (res.errorCode === 0) {
            setDichVuPhongCu(res.data);
            setDichVuPhongMoi(res.data);
        }
    }

    const layThongTinPhong = async () => {

        const res = await apiLayThongTinPhongDeSua(manhatro, maphong);

        if (res.errorCode === 0) {

            if (res.errorCode === 0) {

                setPhongCu({ ...res.data, maphong, manhatro });
                setPhongMoi({ ...res.data, maphong, manhatro });
            }

        }
    }

    useEffect(() => {
        if (show === true) {
            layThongTinDichVuPhong();
            layThongTinPhong();
            layThongTinNhaTroToFilter();
        }
    }, [maphong])
    useEffect(() => {
        if (show === false) {
            setEdit(false);
        }
    }, [show])
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from input
        setPhongMoi((prevState) => ({
            ...prevState, // Keep previous state
            [name]: value, // Update the specific field
        }));
    };
    const handleChangeDichVuPhong = (e) => {
        const { name, value } = e.target;

        // Remove commas and parse as a number
        const numericValue = value.replace(/,/g, ""); // Remove commas

        if (numericValue === "") {
            // If input is empty, set the value to null or 0
            setDichVuPhongMoi((prev) =>
                prev.map((item) =>
                    item.MADICHVU === name ? { ...item, gia: 0 } : item
                )
            );
        } else if (!isNaN(numericValue)) {
            // Update the corresponding item's value
            setDichVuPhongMoi((prev) =>
                prev.map((item) =>
                    item.MADICHVU === name
                        ? { ...item, gia: parseInt(numericValue, 10) }
                        : item
                )
            );
        }
    };
    const [edit, setEdit] = useState(false);
    const formatNumberWithCommas = (number) => {
        if (isNaN(number)) return "";
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                        Sửa hóa đơn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form >
                            <div className="row">
                                {/* Left Column */}
                                <div className={edit ? "col-md-6" : "col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Tên nhà trọ</label>
                                        <input type="text" className="form-control" id="input1" placeholder={phongCu.TENNHATRO} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Mã phòng</label>
                                        <input type="text" className="form-control" id="input1" placeholder={phongCu.maphong} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Mô tả </label>
                                        <input type="text" className="form-control" id="input2" placeholder={phongCu.mota} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input3" className="form-label">Ngày tạo</label>
                                        <input type="text" className="form-control" id="input3" placeholder={phongCu.NGAYTAO + ""} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Chiều dài</label>
                                        <input type="text" className="form-control" id="input4" placeholder={phongCu.CHIEUDAI} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Chiều rộng</label>
                                        <input type="text" className="form-control" id="input5" placeholder={phongCu.CHIEURONG} disabled />
                                    </div>
                                    {dichVuPhongCu.map((item, index) => {
                                        return (
                                            <>
                                                <div key={`dichvuphongcu-${index}`} className="mb-3">
                                                    <label htmlFor="input3" className="form-label">{item.TENDICHVU}</label>
                                                    <input type="text" className="form-control" id="input3" placeholder={item.gia} disabled />
                                                </div>
                                            </>
                                        )
                                    })}


                                </div>

                                {/* Right Column */}
                                <div className={edit ? "col-md-6" : "d-none"}>
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Tên nhà trọ</label>
                                        <select id="inputState" class="form-control"

                                            onChange={handleChange}
                                            name='manhatro'
                                        >
                                            <option defaultValue={manhatro} value={manhatro}>{phongCu.TENNHATRO}</option>
                                            {nhaTro.map((item, index) => {
                                                return (
                                                    <>
                                                        {item.manhatro !== manhatro && (
                                                            <option value={item.manhatro}>
                                                                {item.tennhatro}
                                                            </option>
                                                        )}

                                                    </>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Mã phòng</label>
                                        <input type="text" className="form-control" id="input2"
                                            name="maphong"
                                            onChange={handleChange}
                                            value={phongMoi.maphong} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Mô tả </label>
                                        <input type="text" className="form-control" id="input2"
                                            name="mota"
                                            onChange={handleChange}
                                            value={phongMoi.mota} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input3" className="form-label">Ngày tạo</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="ngaytao"
                                            name="NGAYTAO"
                                            value={phongMoi.NGAYTAO}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Chiều dài</label>
                                        <input type="text" className="form-control" id="input4"
                                            name="CHIEUDAI"
                                            onChange={handleChange}
                                            value={phongMoi.CHIEUDAI} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Chiều rộng</label>
                                        <input type="text" className="form-control" id="input5"
                                            name="CHIEURONG"
                                            onChange={handleChange}
                                            value={phongMoi.CHIEURONG} />
                                    </div>
                                    {dichVuPhongMoi.map((item, index) => {
                                        return (
                                            <>
                                                <div key={`dichvuphongmoi-${index}`} className="mb-3">
                                                    <label htmlFor="input3" className="form-label">{item.TENDICHVU}</label>
                                                    <input type="text" className="form-control" id="input3"
                                                        name={item.MADICHVU}
                                                        onChange={handleChangeDichVuPhong}
                                                        value={formatNumberWithCommas(item.gia)} />

                                                </div>
                                            </>
                                        )
                                    })}


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

export default SuaPhong;