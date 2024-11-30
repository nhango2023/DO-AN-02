import { IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "./DSHoaDon.css"

const DSHoaDon = () => {
    return (
        <>
            <div className="container">
                <div className="row" style={{ height: '60px', borderBottom: '1px solid black' }}>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <form class="form-inline h-50 me-5">
                                <input style={{ width: '180px' }}
                                    class="form-control "
                                    type="search" placeholder="Tìm theo mã hóa đơn" aria-label="Search" />
                            </form>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Nhà trọ</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tất cả</option>
                                    <option>An Phú</option>
                                    <option >Hồng phát</option>
                                </select>
                            </div>
                            <div class="form-group d-flex align-items-center me-5">
                                <label className="w-50" for="inputState">Phòng</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tất cả</option>
                                    <option>1</option>
                                    <option >2</option>
                                </select>
                            </div>
                            <div class="form-group d-flex align-items-center">
                                <label className="w-50" for="inputState">Trạng thái</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Tất cả</option>
                                    <option >Chưa đóng</option>
                                    <option>Đã đóng</option>
                                </select>
                            </div>
                        </div>

                        <div className="">
                            Hóa đơn <IoIosArrowForward /> Danh sách hoá đơn
                        </div>
                    </div>
                </div>
                <div style={{ height: "572px" }} className="row mt-1">
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-danger">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-success">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-danger">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-success">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-danger">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-success">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-danger">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-success">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-danger">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-success">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-danger">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 px-2">
                        <div style={{ background: 'white', borderRadius: '8px' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 px-3 fw-bold">#AB5435</p>
                                <button type="button" class="btn btn-success">Chưa đóng</button>
                            </div>
                            <p className="mb-1 px-3">Nhà trọ An Phú</p>
                            <p className="mb-1 px-3">Phòng: 1</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <button type="button" class="mx-3 btn btn-info">
                                        <FaRegEdit /></button>
                                    <div class="hover-button-container">
                                        <button type="button" class="mx-3  btn btn-info">
                                            <IoIosInformationCircleOutline /></button>
                                        <span class="hover-text">Chi tiết</span>
                                    </div>
                                    <button type="button" class="mx-3  btn btn-info">
                                        <MdDeleteOutline /></button>
                                </div>
                            </div>
                            <div className="d-flex mt-2"
                                style={{ borderTop: "1px solid black" }}>
                                <div className="px-3"
                                    style={{ borderRight: "1px solid black", flex: '1' }}>
                                    <span className="d-block">Ngày tạo</span>
                                    <span className="d-block">19/12/2024</span>

                                </div>
                                <div className="px-3" style={{ flex: '1' }}>
                                    <span className="d-block">Tổng tiền</span>
                                    <span className="d-block">2.500.000 vnd</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div>
                            <button type="button " class="btn btn-light"><IoIosArrowBack /></button>
                            <button type="button " class="btn btn-light">1</button>
                            <button type="button " class="btn btn-light">2</button>
                            <button type="button " class="btn btn-light">3</button>
                            <button type="button " class="btn btn-light">4</button>
                            <button type="button " class="btn btn-light"><IoIosArrowForward /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DSHoaDon;