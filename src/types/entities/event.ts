export type EventType = {
    id?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
    groupName?: string;
    groupStudentIds?: string[];
    link?: string | null;
    comment?: string | null;
    createdAt?: string;
    updatedAt?: string;
    termId?: string;
};
export type EventToRequest = Pick<EventType, 'name' | 'startDate' | 'endDate' | 'groupStudentIds' | 'termId'>;