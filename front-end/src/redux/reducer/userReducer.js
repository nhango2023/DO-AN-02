import { loginAction, logoutAction } from "../action/userAction";

const INITIAL_STATE = {
    data: {
        idnguoidung: '',
        maloainguoidung: '',
        hoten: "",
    },
    xacThuc: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case loginAction:
            return {
                ...state,
                data: {
                    idnguoidung: action?.payload?.idnguoidung,
                    hoten: action?.payload?.hoten,
                    maloainguoidung: action?.payload?.maloainguoidung,
                },
                xacThuc: true
            };
        case logoutAction:
            return {
                ...state,
                data: {
                    idnguoidung: '',
                    hoten: '',
                    maloainguoidung: "",
                },
                xacThuc: false
            };
        default: return state;
    }
};

export default userReducer;