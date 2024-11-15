import { Lecturer, Student } from "./entities";
import Major from "./entities/major";
import { Term } from "./entities/term";
import { User } from "./entities/user";
export interface ErrorResponseType {
    error: string,
    message: string,
    success?: boolean,
    status?: number,
}
interface ParamsType {
    limit: number,
    page: number,
    totalPage: number,
}

export interface ResponseType {
    success?: boolean;
    message: string;
    notificationLecturers?: string;
    statistic?: { [key: string]: number | null };
    params?: ParamsType,
    count?: number,
    lecturer: Lecturer,
    status?: number,
    student?: Student,
    topic?: any,
    keywords?: string[],
    term?: Partial<Term>,
    roles?: string | string[] | any,
    user?: User,
    accessToken?: string;
    events?: any;
    event?: any;
    articles?: any;
    refreshToken?: string;
    lecturerTerm?: any,
    groupLecturer?: any,
    evaluation?: any,
    assign?: any,
    achievement?: any,
    groupStudent?: any,
    transcript?: any,
    data?: any,
    lecturers?: any,
    students?: Student[],
    topics?: any,
    terms?: Partial<Term>[],
    lecturerTerms?: any,
    majors?: Major[],
    major?: Major,
    groupLecturers?: any,
    evaluations?: any,
    assigns?: any,
    achievements?: any,
    groupStudents?: any,
    transcripts?: any,
}