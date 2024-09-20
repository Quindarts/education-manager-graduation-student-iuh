import { AssginGroupClassExport } from "@/components/ui/Export/Entity/AssignGroup";
import { GroupStudentClassExportExcel } from "@/components/ui/Export/Entity/GroupStudent";
import { LecturerClassExportExcel } from "@/components/ui/Export/Entity/Lecturer";
import { StudentClassExportExcel } from "@/components/ui/Export/Entity/Student";
import { TopicClassExportExcel } from "@/components/ui/Export/Entity/Topic";
import { useSnackbar } from "notistack";

const useExportExcel = () => {
    const { enqueueSnackbar } = useSnackbar()
    const onExport = (entity: string, fileName: string, sheetName: string, initData: any, headerColumn: any) => {
        const data = initData?.map((v: any) => v === null ? '' : v)
        if (!data) {
            enqueueSnackbar('Không có dữ liệu tải xuống,thử lại', { variant: 'warning' })
        }
        else {
            switch (entity) {
                case 'topic':
                    const TopicExport = new TopicClassExportExcel(
                        fileName,
                        sheetName,
                        headerColumn,
                    )
                    TopicExport.setData(data)
                    TopicExport.customizeSheet()
                    TopicExport.onExport()
                    break;
                case 'lecturer':
                    const LecturerExport = new LecturerClassExportExcel(
                        fileName,
                        sheetName,
                        headerColumn,
                    )
                    LecturerExport.setData(data)
                    LecturerExport.customizeSheet()
                    LecturerExport.onExport()
                    break;
                case 'student':
                    const StudentExport = new StudentClassExportExcel(
                        fileName,
                        sheetName,
                        headerColumn,
                    )
                    StudentExport.setData(data)
                    StudentExport.customizeSheet()
                    StudentExport.onExport()
                    break;
                case 'groupStudent':
                    const GrStudentExport = new GroupStudentClassExportExcel(
                        fileName,
                        sheetName,
                        headerColumn,
                    )


                    GrStudentExport.setData(data)
                    GrStudentExport.customizeSheet()
                    GrStudentExport.onExport()
                    break;
                case 'assignGroup':
                    const GrAssignExport = new AssginGroupClassExport(
                        fileName,
                        sheetName,
                        headerColumn,
                    )
                    // console.log("🚀 ~ onExport ~ data:", data)

                    // const rs = data.map(tv => {
                    //     console.log("🚀 ~ rs ~ tv:", tv['HD TV'])
                    //     const HDTV = tv['HD TV'].reduce((acc, lec, index) => {
                    //         acc[`HD TV ${index + 1}`] = lec;
                    //         return acc;
                    //     }, {})
                    //     return { ...tv, HDTV }
                    // });
                    GrAssignExport.setData(data)
                    GrAssignExport.customizeSheet()
                    GrAssignExport.onExport()
            }
        }
    }
    return {
        onExport,
    }
}
export default useExportExcel