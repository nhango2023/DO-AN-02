import "./DangKyTaiKhoan.css";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _ from "lodash";
import { apiTaoNguoiDung } from "../services/apiServices";
import { useState } from "react";

const DangKyTaiKhoan = () => {
    const [nguoiDung, setNguoiDung] = useState({
        hoten: '',
        taikhoan: '',
        matkhau: '',
        nhaplaimatkhau: '',
        maloainguoidung: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setNguoiDung({
            ...nguoiDung,
            [name]: value,
        });
    };

    const checkMatKhau = () => {
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
        temp.maloainguoidung = "LTK001";
        temp.idnguoidung = taoMaNguoiDung();
        console.log(temp)
        return temp;
    }

    const handleOnSave = async () => {

        if (checkMatKhau()) {
            return;
        }
        let data = buildDataToSave();
        let res = await apiTaoNguoiDung(data);
        if (res.errorCode === 0) {
            if (res.data == 1) {
                toast.success(res.message);
            }
            else {
                toast.error(res.message);
            }
        }
        else {
            toast.error(res.message);
        }
    }

    return (
        <section class="vh-100 bg-image"
        >
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style={{ borderRadius: " 15px;" }}>
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-5">Tạo tài khoản</h2>
                                    <form>
                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1cg">Họ và tên</label>
                                            <input type="text" id="hoten"
                                                name='hoten'
                                                value={nguoiDung.hoten}
                                                onChange={handleChange}
                                                class="form-control form-control-lg" />

                                        </div>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3cg">Tài khoản</label>
                                            <input type="text"
                                                name='taikhoan'
                                                value={nguoiDung.taikhoan}
                                                onChange={handleChange}
                                                id="taikhoan" class="form-control form-control-lg" />
                                        </div>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cg">Mật khẩu</label>
                                            <input type="password" id="matkhau"
                                                name='matkhau'
                                                value={nguoiDung.matkhau}
                                                onChange={handleChange}
                                                class="form-control form-control-lg" />

                                        </div>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4cdg">Nhập lại mật khẩu</label>
                                            <input type="password"
                                                name='nhaplaimatkhau'
                                                value={nguoiDung.nhaplaimatkhau}
                                                onChange={handleChange}
                                                id="form3Example4cdg" class="form-control form-control-lg" />

                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button type="button"
                                                onClick={() => handleOnSave()}
                                                data-mdb-button-init
                                                data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>

                                        <p class="text-center text-muted mt-5 mb-0">Đã có tài khoản<Link to={"/dangnhap"}
                                            class="fw-bold text-body"><u> Đăng nhập</u></Link></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </section>
    );
};

export default DangKyTaiKhoan;
