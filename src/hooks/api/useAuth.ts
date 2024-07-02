import { getMe, login } from "@/services/apiAuth";
import { RootState } from "@/store";
import { setCurrentRoleRender, setMe } from "@/store/slice/lecturer.slice";
import ResponseType from "@/types/axios.type";
import { removeValueInLocalStorage, setValueInLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const lecturerStore = useSelector((state: RootState) => state.lecturerSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    //[LOGIN]
    const handleLogin = () => {
        return useMutation(
            (data: any) => login(data), {
            onSuccess(data: any) {
                enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
                setValueInLocalStorage('accessToken', data.accessToken);
                setValueInLocalStorage('refreshToken', data.refreshToken);
                dispatch(setMe(data.user));
                navigate("/");
            },

            onError(error: any) {
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
            }
        }
        )
    }

    //[GET ME]
    const handleGetMe = () => {
        return useQuery(['get-me'], () => getMe(), {
            onSuccess(data: Pick<ResponseType, 'success' | 'lecturer' | 'message'>) {
                dispatch(setMe(data.lecturer));
                return data.lecturer
            },
        })
    }

    //[LOG OUT]
    const handleLogout = () => {
        removeValueInLocalStorage('accessToken');
        removeValueInLocalStorage('refreshToken');
        enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
        dispatch(setMe({}));
        dispatch(setCurrentRoleRender(''))
        navigate('/auth/login');
    }


    return {
        handleLogin,
        handleGetMe,
        handleLogout,
        lecturerStore
    }
}   