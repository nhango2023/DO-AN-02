export const loginAction = "LOGIN";
export const logoutAction = "LOGOUT";

export const saveUserDataRedux = (userdata) => {
    return {
        type: loginAction,
        payload: userdata
    }
}

export const removeUserDataRedux = () => {
    return {
        type: logoutAction,
    }
}