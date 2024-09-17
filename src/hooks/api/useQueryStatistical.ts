

import React, { useState } from 'react'
import { useTerm } from './useQueryTerm'
import { useMajor } from './useQueryMajor'
import * as StudentServices from "@/services/apiStudent"
import * as TopicServices from "@/services/apiTopic"
import * as GroupStudentServices from "@/services/apiGroupStudent"
import * as LecturerServices from "@/services/apiLecturerTerm"
import * as GroupLecturerServices from "@/services/apiGroupLecturer"

function useStatistical() {
    //[REDUX]
    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const termId = termStore.currentTerm.id
    const majorId = majorStore.currentMajor.id

    //TODO: [HEAD_LECTURER_ROLE]
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

    //TODO: [HEAD_LECTURER_ROLE]

    const [grLecturerCountOfgrLecturer, setgrLecturerCountOfLecturer] = useState(0);
    const [registeredTopicCountOfLecturer, setRegisteredTopicCountOfLecturer] = useState(0);
    const [approvedTopicCountOfLecturer, setApprovedTopicCountOfLecturer] = useState(0);
    const [groupStudentCountOfLecturer, setGroupStudentCountOfLecturer] = useState(0);

    const handleGetCountOfDashBoardLecturerRole = async () => {
        const apiTopic = await TopicServices.getCountOfTopicByLecturer(termId) // register, accepted
        const apiGroupLecturer = await GroupLecturerServices.getCountOfGroupLecturerByLecturer(termId)
        const apiGroupStudent = await GroupStudentServices.getCountOfGroupStudentByLecturer(termId)

        return Promise.all([apiTopic, apiGroupLecturer, apiGroupStudent])
            .then(([topic, grLecturer, grStudent]) => {
                setApprovedTopicCountOfLecturer(topic.countApprovedTopics)
                setRegisteredTopicCountOfLecturer(topic.countRegisteredTopics)
                setgrLecturerCountOfLecturer(grLecturer.count)
                setGroupStudentCountOfLecturer(grStudent.count)
            })
            .catch(error => {
                console.error('Error fetching counts:', error);
            });
    }
    return {
        //? [ROLE HEAD_LECTURER + HEAD_COURSE COUNT]
        studentCount,
        lecturerCount,
        groupStudentCount,
        topicCount,
        //? [ROLE LECTURER COUNT]
        grLecturerCountOfgrLecturer,
        registeredTopicCountOfLecturer,
        approvedTopicCountOfLecturer,
        groupStudentCountOfLecturer,
        //?  [METHOD]
        handleGetCountOfDashboard,
        handleGetCountOfDashBoardLecturerRole
    }
}

export default useStatistical