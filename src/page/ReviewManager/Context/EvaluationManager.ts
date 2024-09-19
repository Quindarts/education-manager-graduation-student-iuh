import * as GroupLecturerServices from "@/services/apiGroupLecturer"
abstract class EvaluationManager {
    protected type: string;
    protected role: string;
    constructor(type: string, role: string) {
        this.type = type;
        this.role = role;
    }
    protected abstract apiGetGroup(apiName: string, params: any): Promise<typeof this.apiGetGroup>
    // protected abstract onZipFile(files: any[], fileName: string): Promise<typeof this.onZipFile>
}
class EvaluationLecturer extends EvaluationManager {
    constructor(type: string, role: string) {
        super(type, role);
    }
    // getGroupLecturerByLecturerId
    public async apiGetGroup(apiName: string, params: any) {
        return GroupLecturerServices[apiName](params)
    }
    
    // public async onZipFile(files: any[], fileName: string) {
    //     return new Promise<String>
    // }
}