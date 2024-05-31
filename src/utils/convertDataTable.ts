import { Term } from "@/dummy/term";


export const convertTermDropdown = (terms: Term[]

) => {
    let newTerms: any[] = []
    terms.map((term: Term) => {
        newTerms.push({ name: term.name, _id: term.id, })
    })
    return newTerms
}
