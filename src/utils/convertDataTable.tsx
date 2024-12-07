import { Lecturer, Student } from '@/types/entities';
import { EventType } from '@/types/entities/event';
import Major from '@/types/entities/major';
import { Term } from '@/types/entities/term';
import dayjs from 'dayjs';
import { EventContentArg } from 'fullcalendar';

export function getTimeDifference(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = end.getTime() - start.getTime();
  return diffInMs;
}

export const convertTermDropdown = (terms?: any[]) => {
  let newTerms: any[] = [];
  if (terms === null || terms === undefined || terms.length === 0) {
    newTerms.push({ name: 'Chưa có học kì', _id: '' });
  } else {
    terms.map((term: Term) => {
      newTerms.push({ name: term.name, _id: term.id });
    });
  }
  return newTerms;
};

export const convertMajorDropdown = (majors: Major[]) => {
  let newMajors: any[] = [];
  if (!majors) {
    return [];
  }
  majors.map((major: Major) => {
    newMajors.push({ name: major.name, _id: major.id });
  });
  return newMajors;
};

export function convertMajorDropDown(majors: any[]) {
  let newMajors: any = [];
  if (majors) {
    majors.map((major: Major) => {
      newMajors.push({
        _id: major.id,
        name: major.name,
      });
    });
  }
  return newMajors;
}

export const convertLecturer = (lecturers: Lecturer[]) => {
  if (lecturers === undefined) return [];
  else {
    return lecturers.map((lec: Lecturer) => ({
      ...lec,
      firstName: lec.fullName.trim().split(' ').slice(0, -1).join(' '),
      lastName: lec?.fullName.trim().split(' ').pop(),
    }));
  }
};

export const convertTopicTable = (topic: any[]) => {
  if (topic === undefined) return [];
  else {
    let newTopics: any[] = [];
    topic.map((topic: any, index: number) => {
      newTopics.push({ id: index, topicId: topic.id, ...topic });
    });
    return newTopics;
  }
};

export const convertEvalutationTable = (evalutation: any[]) => {
  if (evalutation === undefined) return [];
  else {
    let newEvalutations: any[] = [];
    evalutation.map((Evalutation: any, index: number) => {
      newEvalutations.push({
        stt: index + 1,
        id: index,
        EvalutationId: Evalutation.id,
        ...Evalutation,
      });
    });
    return newEvalutations.sort((a, b) => a.key.localeCompare(b.key));
  }
};

export const convertGroupMembersTable = (groupMember: any[]) => {
  if (groupMember === undefined) return [];
  else {
    let newArr: any[] = [];
    groupMember.map((mem: any) => {
      newArr.push({
        id: mem.studentId,
        studentId: mem.studentId,
        isAdmin: mem.isAdmin,
        status: mem.status,
        ...mem,
      });
    });
    return newArr;
  }
};
export const convertListGroupStudentScore = (grStudents: any[]) => {
  if (grStudents === undefined) return [];
  else {
    return grStudents;
  }
};
export const convertStudentTable = (students: Student[]) => {
  if (students === undefined) {
    return [];
  } else
    return students.map((std: Student) => ({
      ...std,
      firstName: std.fullName.trim().split(' ').slice(0, -1).join(' '),
      lastName: std.fullName.trim().split(' ').pop(),
    }));
};

export const convertGroupLecturerTable = (groupLecturer: any[]) => {
  if (groupLecturer === undefined || groupLecturer === null) return [];
  else {
    let newArr: any[] = [];
    groupLecturer.map((gr: any, index: number) => {
      let i = index + 1;
      newArr.push({ id: gr.groupLecturerId, stt: i, ...gr });
    });
    return newArr;
  }
};

export const convertRowEvaluations = (listEvaluations: any) => {
  if (listEvaluations !== undefined && listEvaluations.length < 1) {
    return [];
  } else {
    const newList = listEvaluations?.map(
      (evaluation: { id: string; name: string; key: string; scoreMax: number }) => ({
        id: evaluation.id,
        name: evaluation.name,
        scoreMax: evaluation.scoreMax,
        key: evaluation.key,
      }),
    );
    return newList.sort((a, b) => a.key.localeCompare(b.key));
  }
};

export const convertArticleTable = (listArticles: any) => {
  if (listArticles !== undefined && listArticles?.length < 1) {
    return [];
  } else {
    return listArticles;
  }
};
export const convertEventTable = (listEvents: any) => {
  if (listEvents !== undefined && listEvents?.length < 1) {
    return [];
  } else {
    return listEvents?.map((event: EventType) => ({
      id: event?.id,
      eventId: event.id,
      comment: event.comment,
      startDate: event.startDate,
      groupName: event.groupName,
      groupStudentId: event.groupStudentIds,
      link: event.link,
      name: event.name,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }));
  }
};

function getRandomColor() {
  const colors = [
    '#1F2937',
    '#0A3B7EFF',
    '#C70707FF',
    '#F18408FF',
    '#111827',
    '#099744FF',
    '#3E4C59',
    '#5A67D8',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
export const convertEventGrid = (listEvents: any): Partial<EventContentArg[]> => {
  if (listEvents !== undefined && listEvents?.length < 1) {
    return [];
  } else {
    return listEvents?.map((event: EventType) => {
      return {
        id: event?.id,
        title: event.name + '_' + `${dayjs(event.startDate).format('DD/MM/YYYY hh:mm A')}`,
        start: event.endDate,
        end: event.endDate,
        allDay: true,
        name: event.name,
        backgroundColor: '#0A3B7EFF',
      };
    });
  }
};
