import { Lecturer, Student } from "@/types/entities";
import { EventType } from "@/types/entities/event";
import Major from "@/types/entities/major";
import { Term } from "@/types/entities/term";
import { EventContentArg } from "fullcalendar";


export function getTimeDifference(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    return diffInMs;
}


export const convertTermDropdown = (terms?: any[]
) => {
    let newTerms: any[] = [];
    if (terms === null || terms === undefined || terms.length === 0) {
        newTerms.push({ name: "Chưa có học kì", _id: '' })
    }
    else {
        terms.map((term: Term) => {
            newTerms.push({ name: term.name, _id: term.id, })
        })

    }
    return newTerms
}

export const convertMajorDropdown = (majors: Major[]
) => {
    let newMajors: any[] = []
    if (!majors) {
        return []
    }
    majors.map((major: Major) => {
        newMajors.push({ name: major.name, _id: major.id, })
    })
    return newMajors
}

export function convertMajorDropDown(majors: any[]) {
    let newMajors: any = []
    if (majors) {
        majors.map((major: Major) => {
            newMajors.push({
                _id: major.id,
                name: major.name
            })
        })
    }
    return newMajors;
}

export const convertLecturer = (lecturers: Lecturer[]
) => {
    if (lecturers === undefined)
        return []
    else {
        return lecturers.map(
            (lec: Lecturer) => ({ ...lec, firstName: lec.fullName.trim().split(' ').slice(0, -1).join(' '), lastName: lec?.fullName.trim().split(' ').pop() }))
    }

}

export const convertTopicTable = (topic: any[]
) => {
    if (topic === undefined)
        return []
    else {
        let newTopics: any[] = []
        topic.map((topic: any, index: number) => {
            newTopics.push({ id: index, topicId: topic.id, ...topic })
        })
        return newTopics
    }
}



export const convertEvalutationTable = (evalutation: any[]
) => {
    if (evalutation === undefined)
        return []
    else {
        let newEvalutations: any[] = []
        evalutation.map((Evalutation: any, index: number) => {
            newEvalutations.push({ stt: index + 1, id: index, EvalutationId: Evalutation.id, ...Evalutation })
        })
        return newEvalutations
    }
}

export const convertGroupMembersTable = (groupMember: any[]) => {
    if (groupMember === undefined)
        return []
    else {
        let newArr: any[] = []
        groupMember.map((mem: any) => {
            newArr.push({ id: mem.student.id, studentId: mem.student.id, isAdmin: mem.isAdmin, status: mem.status, transcripts: mem.transcripts, ...mem.student })
        })
        return newArr
    }
}
export const convertListGroupStudentScore = (grStudents: any[]) => {
    if (grStudents === undefined)
        return []
    else {
        return grStudents
    }
}
export const convertStudentTable = (students: Student[]) => {
    if (students === undefined) {
        return []
    }
    else
        return students.map((std: Student) => ({ ...std, firstName: std.fullName.trim().split(' ').slice(0, -1).join(' '), lastName: std.fullName.trim().split(' ').pop() }))
}

export const convertGroupLecturerTable = (groupLecturer: any[]) => {
    if (groupLecturer === undefined || groupLecturer === null)
        return []
    else {
        let newArr: any[] = []
        groupLecturer.map((gr: any, index: number) => {
            let i = index + 1;
            newArr.push({ id: gr.groupLecturerId, stt: i, ...gr })
        })
        return newArr
    }
}


export const convertRowEvaluations = (listEvaluations: any) => {
    if (listEvaluations !== undefined && listEvaluations.length < 1) {
        return [];
    } else {
        const newList = listEvaluations?.map(
            (evaluation: { id: string; name: string; scoreMax: number }) => ({
                id: evaluation.id,
                name: evaluation.name,
                scoreMax: evaluation.scoreMax,
            }),
        );
        return newList;
    }
};

export const convertArticleTable = (listArticles: any) => {
    if (listArticles !== undefined && listArticles?.length < 1) {
        return [];
    } else {
        return listArticles;
    }
}
export const convertEventTable = (listEvents: any) => {
    if (listEvents !== undefined && listEvents?.length < 1) {
        return [];
    } else {
        return listEvents?.map((event: EventType) => ({ id: event?.id, eventId: event.id, comment: event.comment, deadline: event.deadline, groupName: event.groupName, groupStudentId: event.groupStudentIds, link: event.link, name: event.name, createdAt: event.createdAt, updatedAt: event.updatedAt }));
    }
}
export const convertEventGrid = (listEvents: any): Partial<EventContentArg[]> => {
    if (listEvents !== undefined && listEvents?.length < 1) {
        return [];
    } else {
        return listEvents?.map((event: EventType) => {
            return {
                timeText: event.deadline, event: {
                    id: event?.id,
                    title: event.name,
                    start: event.deadline,
                    end: event.deadline,
                    allDay: true,
                    extendedProps: {
                        link: event.link,
                        comment: event.comment,
                        groupName: event.groupName,
                        groupStudentId: event.groupStudentIds,
                        createdAt: event.createdAt,
                        updatedAt: event.updatedAt
                    }
                }
            }
        })
    }
}