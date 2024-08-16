import { ErrorResponseType, ResponseType } from './../../types/axios.type';
import { LoginResponse } from './../../types/entities/user';
import { forgotPass, getMe, login, logout, updatePassword } from "@/services/apiAuth";
import { RootState } from "@/store";
import { setCurrentRoleRender, setMe, setParamTotalPageLectuerMajor, setParamTotalPageLectuerTerm } from "@/store/slice/lecturer.slice";
import { removeValueInLocalStorage, setValueInLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllTerm, setCurrentTerm } from "@/store/slice/term.slice";
import { setAllMajor, setCurrentMajor } from "@/store/slice/major.slice";
import { queryClient } from "@/providers/ReactQueryClientProvider";
import { IAuth } from "@/types/entities/user";
import { setParamTotalPage } from '@/store/slice/student.slice';

export const useAuth = () => {
    const lecturerStore = useSelector((state: RootState) => state.lecturerSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    //[LOGIN]
    const handleLogin = () => {
        return useMutation(
            (data: IAuth) => login(data), {
            onSuccess(data: LoginResponse) {
                enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
                setValueInLocalStorage('accessToken', data.accessToken);
                setValueInLocalStorage('refreshToken', data.refreshToken);
                dispatch(setMe({ user: data.user, roles: data.roles }));
                dispatch(setCurrentMajor({ majorId: data?.user.majorId, majorName: data?.user.majorName }))
                navigate("/");
            },
            onError(error: ErrorResponseType) {
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
    const handleLogout = async () => {
        const data = await logout()
        if (data) {
            removeValueInLocalStorage('accessToken');
            removeValueInLocalStorage('refreshToken');
            enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
            dispatch(setMe({}));
            dispatch(setCurrentMajor({}))
            dispatch(setAllMajor([]))
            dispatch(setAllTerm([]));
            dispatch(setCurrentTerm({}));
            dispatch(setCurrentRoleRender(''))
            dispatch(setParamTotalPageLectuerMajor(0))
            dispatch(setParamTotalPageLectuerTerm(0))
            dispatch(setParamTotalPage(0))
            
            queryClient.clear()
            navigate('/auth/login');
        }

    }
    const onUpdatePassword = () => {
        return useMutation(
            (data: { password: string, newPassword: string }) => updatePassword(data),
            {
                onSuccess: () => {
                    enqueueSnackbar('Cập nhật mật khẩu thành công', { variant: "success" });
                    navigate('/profile')

                },
                onError: (error: any) => {
                    enqueueSnackbar(error?.message, { variant: "error" });
                }
            }
        )
    }
    const onForgotPassword = () => {
        return useMutation((username: string) => forgotPass(username), {
            onSuccess: () => {
                enqueueSnackbar('Mật khẩu mới đã gửi về email của bạn.', { variant: "success" });
                navigate('/auth/login')
            },
            onError: (error: any) => {
                enqueueSnackbar(error?.message, { variant: "error" });
            }
        })
    }


    return {
        onForgotPassword,
        onUpdatePassword,
        handleLogin,
        handleGetMe,
        handleLogout,
        lecturerStore
    }
}   