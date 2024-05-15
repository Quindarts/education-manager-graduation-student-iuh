import axiosConfig from "./axiosConfig"
export
    const getAllStudent: any = async () => {
        return axiosConfig.get("/api/v1/students");
    }

export
    const getStudentById: any = async (id: number) => {
        return axiosConfig.get(`/api/v1/students/${id}`)
    }