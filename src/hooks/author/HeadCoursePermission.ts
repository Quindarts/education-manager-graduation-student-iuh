import { PermissionItem } from "./type";

const HeadCoursePermission: PermissionItem[] = [
    //Term
    {
        id: "term",
        name: "Quản lý Học Kì",
        isHeadCourse: true,
        feature: [
            {
                method: 'C',
                value: 'createTerm',
                name: 'Tạo 1 học kì'
            },
            {
                method: 'R',
                value: 'getAllTerms',
                name: 'Danh sách học kì của toàn khoa'
            },
            {
                method: 'R',
                value: 'getTermById',
                name: 'Chi tiết 1 học kì'
            },
            {
                method: 'U',
                value: 'updateTerm',
                name: 'Cập nhật 1 học kì'
            },
            {
                method: 'U',
                value: 'updateTermByType',
                name: 'Cập nhật giai đoạn học kì'
            },
            {
                method: 'D',
                value: 'deleteTerms',
                name: 'Xóa 1 học kì'
            },
        ]
    },
    //Lecturer
    {
        id: "lecturer",
        name: "Quản lý Giảng viên",
        feature: [
            {
                method: 'C',
                value: 'createLecturer',
                name: 'Thêm 1 giảng viên'
            },
            {
                method: 'R',
                value: 'getAllLecturers',
                name: 'Danh sách giảng viên của toàn khoa'
            },
            {
                method: 'U',
                value: 'updateLecturer',
                name: 'Cập nhật 1 giảng viên'
            },
            {
                method: 'D',
                value: 'deleteLecturer',
                name: 'Xóa 1 giảng viên'
            },
            {
                method: 'C',
                value: 'importLecturers',
                name: 'Nhập danh sách giảng viên từ học kì trước'
            },
            {
                method: 'C',
                value: 'importLecturersFromExcel',
                name: 'Nhập danh sách giảng viên từ excel'
            }
        ]
    },
    //Student
    {
        id: "student",
        name: "Quản lý Sinh viên",
        feature: [
            {
                method: 'C',
                value: 'createStudent',
                name: 'Thêm 1 sinh viên'
            },
            {
                method: 'R',
                value: 'getAllStudents',
                name: 'Danh sách sinh viên của toàn khoa'
            },
            {
                method: 'U',
                value: 'updateStudent',
                name: 'Cập nhật 1 sinh viên'
            },
            {
                method: 'D',
                value: 'deleteStudent',
                name: 'Xóa 1 sinh viên'
            },
            {
                method: 'C',
                value: 'importStudents',
                name: 'Nhập danh sách sinh viên từ học kì trước'
            },
            {
                method: 'C',
                value: 'importStudentsFromExcel',
                name: 'Nhập danh sách sinh viên từ excel'
            }
        ]
    },
    //Major
    {
        id: "major",
        name: "Quản lý Chuyên ngành",
        feature: [
            {
                method: 'R',
                value: 'getAllMajors',
                name: 'Xem danh sách chuyên ngành'
            },
            {
                method: 'C',
                value: 'createMajor',
                name: 'Thêm 1 chuyên ngành'
            },
            {
                method: 'U',
                value: 'updateMajor',
                name: 'Cập nhật 1 chuyên ngành'
            },
            {
                method: 'D',
                value: 'deleteMajor',
                name: 'Xóa 1 chuyên ngành'
            }
        ]
    },
    //Notification
    {
        id: "notification",
        name: "Quản lý Thông báo",
        feature: [
            {
                method: 'R',
                value: 'getAllNotifications',
                name: 'Xem danh sách thông báo'
            },
            {
                method: 'C',
                value: 'createNotification',
                name: 'Thêm 1 thông báo'
            },
            {
                method: 'U',
                value: 'updateNotification',
                name: 'Cập nhật 1 thông báo'
            },
            {
                method: 'D',
                value: 'deleteNotification',
                name: 'Xóa 1 thông báo'
            }
        ]
    }
]

export default HeadCoursePermission