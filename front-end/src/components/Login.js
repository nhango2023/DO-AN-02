import React, { useEffect, useState } from 'react';
import "./DangKyTaiKhoan.css";
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _ from "lodash";
import { apiLogin, apiTaoNguoiDung, apiXacThuc } from '../services/apiServices';
import { useDispatch } from 'react-redux';
import { saveUserDataRedux } from '../redux/action/userAction';
import { useSelector } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.data);
    const xacThuc = useSelector(state => state.user.xacThuc);
    const checkLogin = async () => {
        if (xacThuc === true) {
            let res = await apiXacThuc();
            if (res.errorCode == 0) {
                if (user.maloainguoidung === "LTK002") {
                    navigate("/nguoithuetrong/trangquanly");
                }
                else if (user.maloainguoidung === "LTK001") {
                    navigate("/chutro/trangquanly");
                }
            }
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])
    const [nguoiDung, setNguoiDung] = useState({
        taikhoan: '',
        matkhau: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNguoiDung({
            ...nguoiDung,
            [name]: value,
        });
    };



    const handleOnSave = async () => {
        let res = await apiLogin(nguoiDung);
        if (res.errorCode === 0) {
            if (res.data) {
                toast.success(res.message);

                dispatch(saveUserDataRedux(res.data));
                if (res.data.maloainguoidung === "LTK001") {
                    setTimeout(() => {
                        navigate("/chutro/trangquanly");
                    }, 1000);

                }
                else if (res.data.maloainguoidung === "LTK002") {
                    setTimeout(() => {
                        navigate("/nguoithuephong/trangquanly");
                    }, 1000);

                }
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
                                    <h2 class="text-uppercase text-center mb-5">Đăng nhập</h2>
                                    <form>

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


                                        <div class="d-flex justify-content-center">
                                            <button type="button"
                                                onClick={() => handleOnSave()}
                                                data-mdb-button-init
                                                data-mdb-ripple-init
                                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                                                Login</button>
                                        </div>

                                        <p class="text-center text-muted mt-5 mb-0">Chưa có tài khoản<Link to={"/dangkytaikhoan"}
                                            class="fw-bold text-body"><u> Đăng ký tài khoản</u></Link></p>

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

export default Login;
