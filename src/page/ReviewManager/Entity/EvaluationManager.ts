import * as GroupLecturerServices from "@/services/apiGroupLecturer"

export type GroupLecturerServiceKeys = keyof typeof GroupLecturerServices


abstract class EvaluationManager {
    protected type: string;
    constructor(type: string) {
        this.type = type;
    }
    protected abstract apiGetGroupLecturer(apiName: string, params: any): Promise<typeof this.apiGetGroupLecturer>
}
export class EvaluationLecturer extends EvaluationManager {
    constructor(type: string) {
        super(type);
    }
    public async apiGetGroupLecturer(apiName: GroupLecturerServiceKeys, params: any[]) {
        return await GroupLecturerServices[apiName](...params)
    }
}