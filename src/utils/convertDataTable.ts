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

export const convertMajorDropDown = (majors: any[]) => {
    let newMajors: any = []
    majors.map((major: Major) => {
        newMajors.push({
            _id: major.id,
            name: major.name
        })
    })
    return newMajors;
}

export const convertLecturer = (lecturers: any[]
) => {
    if (lecturers === undefined)
        return []
    else
        return lecturers
}
