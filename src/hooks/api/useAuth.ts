import { login } from "@/services/apiAuth";
import { RootState } from "@/store";
import { setMe } from "@/store/slice/lecturer.slice";
import { removeValueInLocalStorage, setValueInLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const lecturerStore = useSelector((state: RootState) => state.lecturerSlice);
    const dispatch = useDispatch();

    const handleLogin = () => {
        return useMutation(
            (data: any) => login(data), {
            onSuccess(data: any) {
                enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
                console.log(data.accessToken);
                setValueInLocalStorage('accessToken', data.accessToken);
                dispatch(setMe(data.lecturer));
                navigate("/");
            },
            onError(error: any) {
                console.log("🚀 ~ onError ~ error:", error)
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
            }
        }
        )
    }
    const handleLogout = () => {
        removeValueInLocalStorage('accessToken');
        enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
        dispatch(setMe({}));
        navigate('/auth/login');
    }
    return {
        handleLogin,
        handleLogout,
        lecturerStore
    }
}   