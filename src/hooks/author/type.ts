export type FeatureItem = {
    method: 'C' | 'R' | 'U' | 'D';
    name: string,
    value: string;
}
export type PermissionItem = {
    id: string;
    name: string;
    isHeadCourse?: boolean;
    feature: FeatureItem[],
    majorId?: string,
}