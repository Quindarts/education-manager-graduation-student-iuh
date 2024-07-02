import { RoleCheck } from '@/types/enum'
type PermissionItem = {
    id: string;
    name: string;
    queryKey: string | any[];
}

const useRole = () => {
    const getListPermission = (role: RoleCheck) => {
        let listPermission: PermissionItem[] = []

        switch (role) {
            case RoleCheck.ADMIN:
                listPermission = [
                    {
                        id: "term",
                        name: "Quản lý Học Kì",
                        queryKey: ['C', 'R', 'U', 'D'],
                    },
                    {
                        id: "lecturer",
                        name: "Quản lý Giảng viên",
                        queryKey: ['C', 'R', 'U', 'D', 'I'],
                    },
                ]
                break;

            case RoleCheck.HEAD_LECTURER:
                listPermission = [
                    {
                        id: "",
                        name: "",
                        queryKey: "",
                    },
                ]
                break;
            case RoleCheck.LECTURER:
                listPermission = [
                    {
                        id: "",
                        name: "",
                        queryKey: "",
                    },
                ]
                break;
        }
    }


    return {
        getListPermission
    }
}

export default useRole