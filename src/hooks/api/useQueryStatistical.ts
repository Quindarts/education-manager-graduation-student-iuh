

import React, { useState } from 'react'
import { useTerm } from './useQueryTerm'
import { useMajor } from './useQueryMajor'
import * as StudentServices from "@/services/apiStudent"
import * as TopicServices from "@/services/apiTopic"
import * as GroupStudentServices from "@/services/apiGroupStudent"
import * as LecturerServices from "@/services/apiLecturerTerm"
function useStatistical() {
    //[REDUX]
    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const termId = termStore.currentTerm.id
    const majorId = majorStore.currentMajor.id
    const [studentCount, setStudentCount] = useState(0);
    const [lecturerCount, setLecturerCount] = useState(0);
    const [topicCount, setTopicCount] = useState(0);
    const [groupStudentCount, setGroupStudentCount] = useState(0);
    const handleGetCountOfDashboard = async () => {
        const apiStudent = await StudentServices.getCountOfStudent(termId)
        const apiLecturer = await LecturerServices.getCountOfLecturerTerm(termId)
        const apiTopic = await TopicServices.getCountOfTopic(termId)
        const apiGroupStudent = await GroupStudentServices.getCountOfGroupStudent(termId)
        return Promise.all([apiStudent, apiLecturer, apiTopic, apiGroupStudent])
            .then(([studentCount, lecturerCount, topicCount, groupStudentCount]) => {
                setStudentCount(studentCount.count)
                setLecturerCount(lecturerCount.count)
                setTopicCount(topicCount.count)
                setGroupStudentCount(groupStudentCount.count)
            })
            .catch(error => {
                console.error('Error fetching counts:', error);
            });
    }
    return {
        studentCount,
        lecturerCount,
        groupStudentCount,
        topicCount,
        handleGetCountOfDashboard
    }
}

export default useStatistical