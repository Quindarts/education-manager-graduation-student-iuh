export interface IErrorCodeInfo {
    key: string;
    message: string;
}
export const ErrorCodeDefine: Record<string, IErrorCodeInfo> = {
    SERVER: {
        key: 'SERVER',
        message: 'Lỗi server!',
    },
    COMMON: {
        key: 'COMMON',
        message: 'Commom!',
    },
    NOT_FOUND: {
        key: 'NOT_FOUND',
        message: 'Không tìm thấy',
    },
    VALIDATE: {
        key: 'VALIDATE',
        message: 'Thông tin không hợp lệ',
    },
    UNAUTHORIZED: {
        key: 'UNAUTHORIZED',
        message: 'Không có quyền truy cập',
    },
    AUTHENTICATION: {
        key: 'AUTHENTICATION',
        message: 'Có quyền truy cập',
    },
    FORBIDDEN: {
        key: 'FORBIDDEN',
        message: '',
    },
    CONFLICT: {
        key: 'CONFLICT',
        message: 'Từ chối',
    },
    // USER
    LECTURER_NOT_FOUND: {
        key: 'LECTURER_NOT_FOUND',
        message: 'Không tìm thấy Giảng viên',
    },
    STUDENT_NOT_FOUND: {
        key: 'STUDENT_NOT_FOUND',
        message: 'Không tìm thấy Sinh viên',
    },
    LECTURER_MISSING_EMAIL: {
        key: 'LECTURER_MISSING_EMAIL',
        message: 'Giảng viên không có email',
    },
    STUDENT_MISSING_EMAIL: {
        key: 'STUDENT_MISSING_EMAIL',
        message: 'Sinh viên không có email',
    },
    IMPORT_LECTURER_MISSING_COLUMN: {
        key: 'IMPORT_LECTURER_MISSING_COLUMN',
        message: 'Thiếu thông tin của Giảng viên',
    },
    IMPORT_STUDENT_MISSING_COLUMN: {
        key: 'IMPORT_STUDENT_MISSING_COLUMN',
        message: 'Thiếu thông tin của Sinh viên',
    },
    DONT_HAVE_PERMISSION_THIS_MAJORS: {
        key: 'DONT_HAVE_PERMISSION_THIS_MAJORS',
        message: 'Không có quyền',
    },
    // USER TERM
    LECTURER_NOT_IN_TERM: {
        key: 'LECTURER_NOT_IN_TERM',
        message: 'Giảng viên không có trong họ kỳ',
    },
    STUDENT_NOT_IN_TERM: {
        key: 'STUDENT_NOT_IN_TERM',
        message: 'Sinh viên không có trong họ kỳ',
    },

    // DAO
    FAIL_CREATE_ENTITY: {
        key: 'FAIL_CREATE_ENTITY',
        message: 'Lỗi tạo, Vui lòng kiểm tra lại',
    },
    FAIL_DELETE_ENTITY: {
        key: 'FAIL_DELETE_ENTITY',
        message: 'Lỗi xóa,Vui lòng kiểm tra lại',
    },
    FAIL_UPDATE_ENTITY: {
        key: 'FAIL_DELETE_ENTITY',
        message: 'Lỗi cập nhật,Vui lòng kiểm tra lại',
    },

    // mail service
    SEND_MAIL_FAIL: {
        key: 'SEND_MAIL_FAIL',
        message: 'Gửi email không thành công',
    },

    // EVALUATION
    EVALUATION_DUPLICATE_NAME: {
        key: 'EVALUATION_DUPLICATE_NAME',
        message: 'Tên tiêu chí đã tồn tại',
    },
    EVALUATION_SUM_GRADE: {
        key: 'EVALUATION_SUM_GRADE',
        message: 'Tổng điểm tiêu chí',
    },

    // GROUP LECTURER
    GROUP_LECTURER_DUPLICATE_NAME: {
        key: 'GROUP_LECTURER_DUPLICATE_NAME',
        message: 'Tên nhóm đã tồn tại',
    },
    LECTURER_NOT_IN_THIS_GROUP: {
        key: 'LECTURER_NOT_IN_THIS_GROUP',
        message: 'Giảng viên không có trong nhóm này',
    },
    LECTURER_DO_NOT_HAVE_ASSIGN: {
        key: 'LECTURER_DO_NOT_HAVE_ASSIGN',
        message: 'Giảng viên khong có nhóm',
    },
    // GROUP
    STUDENT_NOT_IN_THIS_GROUP: {
        key: 'STUDENT_NOT_IN_THIS_GROUP',
        message: 'Sinh viên không có trong nhóm này',
    },
    STUDENT_DONT_HAVE_GROUP: {
        key: 'STUDENT_DONT_HAVE_GROUP',
        message: 'Sinh viên không có nhóm',
    },
    // MAJORS
    MAJORS_DUPLICATE_NAME: {
        key: 'MAJORS_DUPLICATE_NAME',
        message: 'Tên ngành đã tồn tại',
    },
    // MAJORS
    TOPIC_DUPLICATE_NAME: {
        key: 'TOPIC_DUPLICATE_NAME',
        message: 'Tên đề tài đã tồn tại',
    },
    // TERM
    TERM_DUPLICATE_NAME: {
        key: 'TERM_DUPLICATE_NAME',
        message: 'Tên học kỳ đã tồn tại',
    },

    TERM_HAS_NOT_STARTED: {
        key: 'TERM_HAS_NOT_STARTED',
        message: 'Học kỳ chưa bắt đầu',
    },
    TERM_HAS_EXPRIED: {
        key: 'TERM_HAS_EXPRIED',
        message: 'Học kỳ đã hết hạn',
    },
    TERM_SUBMIT_TOPIC_HAS_EXPRIED: {
        key: 'TERM_SUBMIT_TOPIC_HAS_EXPRIED',
        message: 'Chọn đề tài đã hết hạn',
    },
    TERM_CHOOSE_TOPIC_HAS_NOT_STARTED: {
        key: 'TERM_CHOOSE_TOPIC_HAS_NOT_STARTED',
        message: 'Thời gian chọn đề tài chưa bắt đầu',
    },
    TERM_CHOOSE_TOPIC_HAS_EXPRIED: {
        key: 'TERM_CHOOSE_TOPIC_HAS_EXPRIED',
        message: 'Thời gian chọn đề tài đã hết hạn ',
    },
    TERM_DISCUSSION_HAS_NOT_STARTED: {
        key: 'TERM_DISCUSSION_HAS_NOT_STARTED',
        message: 'Thời gian phân công, tạo nhóm hội đồng - Phản Biện chưa bắt đầu',
    },
    TERM_DISCUSSION_HAS_EXPRIED: {
        key: 'TERM_DISCUSSION_HAS_EXPRIED',
        message: 'Thời gian phân công, tạo nhóm hội đồng - Phản Biện đã hết hạn',
    },
    TERM_REPORT_HAS_EXPRIED: {
        key: 'TERM_REPORT_HAS_EXPRIED',
        message: 'Thời gian phân công, tạo nhóm hội đồng - Hội đông đã hết hạn',
    },
    TERM_REPORT_HAS_NOT_STARTED: {
        key: 'TERM_REPORT_HAS_NOT_STARTED',
        message: 'Thời gian phân công, tạo nhóm hội đồng - Hội đông chưa bắt đầu',
    },
    DUPLICATE_EMAIL: {
        key: 'DUPLICATE_EMAIL',
        message: 'Email đã tồn tại',
    },
    STUDENT_ALREADY_EXIST_GROUP: {
        key: 'STUDENT_ALREADY_EXIST_GROUP',
        message: 'Sinh viên đã có nhóm',
    },
    GROUP_ALREADY_EXIST_TOPIC: {
        key: 'GROUP_ALREADY_EXIST_TOPIC',
        message: 'Nhóm đã có đề tài',
    },
    GROUP_MAX_QUALITY: {
        key: 'GROUP_MAX_QUALITY',
        message: 'Đề tài đã đủ số lượng',
    },
    STUDENT_DONT_HAVE_PERMISSIONS: {
        key: 'STUDENT_DONT_HAVE_PERMISSIONS',
        message: 'Bạn không có quyền',
    },
    TERM_SUBMIT_TOPIC_HAS_NOT_STARTED: {
        key: 'TERM_SUBMIT_TOPIC_HAS_NOT_STARTED',
        message: 'Thời gian chọn đề tài chưa đế',
    },
};