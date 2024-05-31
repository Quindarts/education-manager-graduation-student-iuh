import { getMe, login } from "@/services/apiAuth";
import { RootState } from "@/store";
import { setMe } from "@/store/slice/lecturer.slice";
import { removeValueInLocalStorage, setValueInLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
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
                setValueInLocalStorage('refreshToken', data.refreshToken);
                dispatch(setMe(data.user));
                navigate("/");
            },
            onError(error: any) {
                console.log("🚀 ~ onError ~ error:", error)
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
            }
        }
        )
    }
    const handleGetMe = () => {
        return useQuery(['get-me'], () => getMe(), {
            onSuccess(data: any) {
                dispatch(setMe(data.lecturer));
            }
        })
    }
    const handleLogout = () => {
        removeValueInLocalStorage('accessToken');
        enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
        dispatch(setMe({}));
        navigate('/auth/login');
    }
    return {
        handleLogin,
        handleGetMe,
        handleLogout,
        lecturerStore
    }
}   