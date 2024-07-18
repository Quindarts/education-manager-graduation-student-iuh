import { getMe, login } from "@/services/apiAuth";
import { RootState } from "@/store";
import { setCurrentRoleRender, setMe } from "@/store/slice/lecturer.slice";
import ResponseType from "@/types/axios.type";
import { removeValueInLocalStorage, setValueInLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllTerm, setCurrentTerm } from "@/store/slice/term.slice";
import { setAllMajor, setCurrentMajor } from "@/store/slice/major.slice";
import { queryClient } from "@/providers/ReactQueryClientProvider";

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
                dispatch(setMe({ user: data.user, roles: data.roles }));
                dispatch(setCurrentMajor({ majorId: data.user.majorId, majorName: data.user.majorName }))
                navigate("/");
            },
            onError(error: any) {
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        )
    }

    //[GET ME]
    const handleGetMe = () => {
        return useQuery(['get-me'], () => getMe(), {
            onSuccess(data: Pick<ResponseType, 'success' | 'lecturer' | 'message' | 'roles'>) {
                dispatch(setMe({ user: data.lecturer, roles: data.roles }));
                dispatch(setCurrentMajor({ id: data.lecturer.majorId, name: data.lecturer.majorName }))
                navigate("/");
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
        dispatch(setCurrentMajor({}))
        dispatch(setAllMajor([]))
        dispatch(setAllTerm([]));
        dispatch(setCurrentTerm({}));
        dispatch(setCurrentRoleRender(''))
        queryClient.clear()
        navigate('/auth/login');
    }


    return {
        handleLogin,
        handleGetMe,
        handleLogout,
        lecturerStore
    }
}   