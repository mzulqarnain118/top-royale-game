type ReportDataType = {
    name?: string,
    value?: number,
    isMoney?: boolean
}[]

export const reportsData: ReportDataType = [
    { name: 'Kills', value: 8 },
    { name: 'Assists', value: 18 },
    { name: 'Deaths', value: 0 },
    { name: 'Money Earned', value: 645, isMoney: true },
    { name: 'Money Spent', value: 500, isMoney: true },
    { name: 'Damage Done', value: 753 },
    { name: 'Damage Taken', value: 210 },
    {},
    { name: 'Shield used', value: 6 },
    { name: 'Super attack used', value: 5 }
];

