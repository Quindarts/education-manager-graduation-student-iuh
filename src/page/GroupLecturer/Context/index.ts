import { removeVietnameseTones } from "@/utils/search";
import { ENUM_STATUS_LECTURER } from "@/utils/validations/groupLecturer.validation";
import { checkIndustry } from "@/utils/validations/lecturer.validation";

const getUniqueKeywords = (lecturers: any[]) => {
    return Array.from(new Set(lecturers?.flatMap((lec: any) => lec?.keywords)));
};

const handleTags = (tags: any[], topicsOfGroup: any[]) => {
    const selectedTags = tags?.filter((tag) => tag.selected);
    if (selectedTags.length === 0) return topicsOfGroup;
    const selectedIds = selectedTags?.map((tag) => tag.id);
    return topicsOfGroup.filter((project) => project?.keywords.includes(...selectedIds));
};

const convertToTagList = (data: any) => {
    if (!data) return [];
    return data?.map((d: any) => {
        return {
            id: d,
            name: checkIndustry(d),
            selected: false,
        };
    });
};

const convertLecturerGroup = (data: any[]) => {
    if (!data) {
        return [];
    }
    const newData: any = [];
    data?.map((lecturerTerm: any) => {
        newData.push({ ...lecturerTerm, status: ENUM_STATUS_LECTURER.NO_GROUP });
    });
    return newData;
};

const handleSearch = (keywords: string, lecturers: any[]) => {
    if (keywords.length === 0) {
        return lecturers;
    }
    return lecturers.filter((lec) =>
        removeVietnameseTones(lec.fullName.toLowerCase()).includes(
            removeVietnameseTones(keywords.toLowerCase()),
        ),
    );
};
const mergedArrays = (arr1: any[], arr2: any[]) => {
    if (!arr1 || !arr2) return [];

    const lecturerTerms = [...arr1, ...arr2];
    const result = [];
    lecturerTerms?.forEach((lecturer) => {
        const { lecturerId, keyword, total } = lecturer;
        const existing = result.find((item) => item.lecturerId === lecturerId);
        if (existing) {
            existing.total += total;
            if (keyword && !existing.keywords.includes(keyword)) {
                existing.keywords.push(keyword);
            }
        } else {
            result.push({
                lecturerId,
                username: lecturer.username,
                fullName: lecturer.fullName,
                majorName: lecturer.majorName,
                total: total,
                keywords: keyword ? [keyword] : [],
            });
        }
    });
    return result;
};

export {
    getUniqueKeywords,
    handleTags,
    convertToTagList,
    convertLecturerGroup,
    handleSearch,
    mergedArrays,
}