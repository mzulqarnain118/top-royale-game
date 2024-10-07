type ReportDataType = {
    name?: string,
    kills?: number,
    assists?: number,
    deaths?: number,
    money?: number,
    isMoney?: boolean
}[]

export const afterActionReports: ReportDataType = [
    { name: 'Kills', kills: 8, assists: 18, deaths: 0, money: 645 },
    { name: 'Assists', kills: 18, assists: 18, deaths: 0, money: 645 },
    { name: 'Deaths', kills: 0, assists: 18, deaths: 0, money: 645 },
    { name: 'Money Earned', kills: 645, assists: 18, deaths: 0, money: 645, isMoney: true },
    { name: 'Money Spent', kills: 500, assists: 18, deaths: 0, money: 645, isMoney: true },
    { name: 'Damage Done', kills: 753, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
    { name: 'Damage Taken', kills: 210, assists: 18, deaths: 0, money: 645 },
];

