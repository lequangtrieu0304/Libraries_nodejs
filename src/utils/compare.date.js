export const compareDate = (date1String, date2String) => {
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);
    
    return date1 > date2 
}