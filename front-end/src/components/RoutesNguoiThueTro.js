import { Route } from "react-router-dom";
import TrangQuanLy from "../components/NguoiThuePage/TrangQuanLy";


const RoutesNguoiThueTro = (props) => {

    return (
        <>
            <Route path={props.path} Component={props.component}>
            </Route >
        </>
    )
}

export default RoutesNguoiThueTro;