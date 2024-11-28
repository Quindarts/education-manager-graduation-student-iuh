import { AssginGroupClassExport } from "@/components/ui/Export/Entity/AssignGroup";
import { AssignLecturerTermClassExport } from "@/components/ui/Export/Entity/AssignLecturerTerm";
import { DemoScoreStudentClassExport } from "@/components/ui/Export/Entity/DemoScoreStudentClassExport";
import { GroupStudentClassExportExcel } from "@/components/ui/Export/Entity/GroupStudent";
import { LecturerClassExportExcel } from "@/components/ui/Export/Entity/Lecturer";
import { StudentClassExportExcel } from "@/components/ui/Export/Entity/Student";
import { TopicClassExportExcel } from "@/components/ui/Export/Entity/Topic";
import { TranscriptExcel } from "@/components/ui/Export/Entity/Transcript";
import { useSnackbar } from "notistack";

const useExportExcel = () => {
    const { enqueueSnackbar } = useSnackbar()
    const onExport = (entity: string, fileName: string, sheetName: string, initData: any, headerColumn: any) => {
        const data = initData?.map((v: any) => v === null ? '' : v)

        if (!data) {
            return enqueueSnackbar('Không có dữ liệu tải xuống,thử lại', { variant: 'warning' })
        }
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
                GrAssignExport.setData(data)
                GrAssignExport.customizeSheet()
                GrAssignExport.onExport()
                break;
            case 'transcript':
                const TranscriptExport = new TranscriptExcel(
                    fileName,
                    sheetName,
                    headerColumn,
                )
                TranscriptExport.setData(data)
                TranscriptExport.customizeSheet()
                TranscriptExport.onExport()
                break;
            case 'demoScoreStudents':
                const DemoScoreExport = new DemoScoreStudentClassExport(
                    fileName,
                    sheetName,
                    headerColumn,
                )
                DemoScoreExport.setData(data)
                DemoScoreExport.customizeSheet()
                DemoScoreExport.onExport()
                break;
            case 'assignLecturerTerm':
                const AssignLecturerTermExport = new AssignLecturerTermClassExport(
                    fileName,
                    sheetName,
                    headerColumn,
                )
                AssignLecturerTermExport.setData(data)
                AssignLecturerTermExport.customizeSheet()
                AssignLecturerTermExport.onExport()
        }
    }
    return {
        onExport,
    }
}
export default useExportExcel