

import React from 'react'
import { useTerm } from './useQueryTerm'
import { useMajor } from './useQueryMajor'
import * as StudentServices from "@/services/apiStudent"


function useStatistical() {
    //[REDUX]
    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const termId = termStore.currentTerm.id
    const majorId = majorStore.currentMajor.id

    const handleGetCountOfDashboard = async () => {
        const apiStudent = await StudentServices.getCountOfStudent(termId)
    }
}

export default useStatistical