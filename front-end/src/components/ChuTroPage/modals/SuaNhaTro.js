import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiLayThongTin1NhaTro, apiLayThongTinNhaTro } from '../../../services/apiServices';

const SuaHoaDon = (props) => {
    const { show, setShow, manhatro } = props;

    // console.log(machutro + "\t" + manhatro);
    const handleHide = () => {
        setShow(false);
    }

    const handleOnSave = () => {

    }

    const layThongTinNhaTro = async () => {
        const res = await apiLayThongTin1NhaTro(manhatro);
    }
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
                        <h1 className="text-center mb-4">Form Layout</h1>
                        <form>
                            <div className="row">
                                {/* Left Column */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Label 1</label>
                                        <input type="text" className="form-control" id="input1" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Label 2</label>
                                        <input type="text" className="form-control" id="input2" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input3" className="form-label">Label 3</label>
                                        <input type="text" className="form-control" id="input3" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Label 4</label>
                                        <input type="text" className="form-control" id="input4" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Label 5</label>
                                        <input type="text" className="form-control" id="input5" placeholder="Enter text here" />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="input6" className="form-label">Label 6</label>
                                        <input type="text" className="form-control" id="input6" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input7" className="form-label">Label 7</label>
                                        <input type="text" className="form-control" id="input7" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input8" className="form-label">Label 8</label>
                                        <input type="text" className="form-control" id="input8" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input9" className="form-label">Label 9</label>
                                        <input type="text" className="form-control" id="input9" placeholder="Enter text here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input10" className="form-label">Label 10</label>
                                        <input type="text" className="form-control" id="input10" placeholder="Enter text here" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-primary' onClick={() => handleOnSave()}>Save</Button>
                    <Button className='btn btn-warning' onClick={() => handleHide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SuaHoaDon;