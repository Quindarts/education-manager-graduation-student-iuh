export type EventType = {
    id?: string;
    name?: string;
    deadline?: string;
    groupName?: string;
    groupStudentIds?: string[];
    link?: string | null;
    comment?: string | null;
    createdAt?: string;
    updatedAt?: string;
    termId?: string;
};
export type EventToRequest = Pick<EventType, 'name' | 'deadline' | 'groupStudentIds' | 'termId'>;