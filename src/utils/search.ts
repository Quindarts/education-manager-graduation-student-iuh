export function removeVietnameseTones(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}
export const handleSearch = (
    data: any[],
    typeSearch: string, //'topicName' | 'fullName'
    keywords: string,
) => {
    console.log("🚀 ~ typeSearch:", typeSearch)
    console.log("🚀 ~ keywords:", keywords)
    if (keywords.length === 0) {
        return data;
    }
    let query = removeVietnameseTones(keywords.toLowerCase());
    return data.filter((gr: any) => {
        let val = removeVietnameseTones(gr[`${typeSearch}`].toLowerCase())
        return val.includes(query)
    });
};
