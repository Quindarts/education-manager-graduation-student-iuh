import { RoleCheck } from "@/types/enum"
import { useAuth } from "../api/useAuth"
import HeadCoursePermission from "./HeadCoursePermission"
import { PermissionItem } from "./type"
type EntitySource =
    'terms' | 'majors' | "lecturers" | "students" | "evaluations" | "scores" | "groupStudents" | "groupLecturers" | "assigns" | "transcripts" | "topics" | "lecturerTerms"


const useRole = () => {
    const { lecturerStore } = useAuth()
    const roles = lecturerStore.me.roles
    const currentRole = lecturerStore.currentRoleRender

    const getListPermission = (role: string) => {
        var flagPermission: PermissionItem[];
        switch (role) {
            case RoleCheck.HEAD_COURSE:
                flagPermission = HeadCoursePermission
                break;
            default:
                flagPermission = []
                break;
        }
        return flagPermission
    }
    const getDetailPermissionByEntity = (role: string, entity: EntitySource) => {
        const myPermission = getListPermission(role)
        if (myPermission) {
            return myPermission.filter(permission => permission.id === entity)
        } else
            return null
    }
    return {
        getListPermission,
        getDetailPermissionByEntity
    }
}

export default useRole