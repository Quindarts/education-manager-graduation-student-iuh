import { Term } from "@/dummy/term";
import Major from "@/types/entities/major";


export const convertTermDropdown = (terms: Term[]
) => {
    let newTerms: any[] = []
    terms.map((term: Term) => {
        newTerms.push({ name: term.name, _id: term.id, })
    })
    return newTerms
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

export const convertLecturer = (lecturers: any[]
) => {
    if (lecturers === undefined)
        return []
    else
        return lecturers
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
            newEvalutations.push({ id: index, EvalutationId: Evalutation.id, ...Evalutation })
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