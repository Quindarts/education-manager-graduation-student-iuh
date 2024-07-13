import { RoleCheck } from '@/types/enum'
type PermissionItem = {
    id: string;
    name: string;
    feature: [
        {
            typeMethod: 'C' | 'R' | 'U' | 'D',
            nameApi: string,
        }
    ]
    majorId: string | 'all';
}

const useRole = () => {
    const getListPermission = (role: RoleCheck, majorId: string) => {
        let listPermission: PermissionItem[] = []

        switch (role) {
            case RoleCheck.ADMIN:
                listPermission = [
                    {
                        id: "term",
                        name: "Quản lý Học Kì",
                        feature: [
                            {
                                typeMethod: 'R',
                                nameApi: 'getAllTerm',
                            },
                        ],
                        majorId: `${majorId}`
                    },

                ]
                break;

            case RoleCheck.HEAD_LECTURER:
                listPermission = [
                    {
                        id: "",
                        name: "",
                        feature: "",
                    },
                ]
                break;
            case RoleCheck.LECTURER:
                listPermission = [
                    {
                        id: "",
                        name: "",
                        feature: "",
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