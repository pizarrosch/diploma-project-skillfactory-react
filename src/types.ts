export type ImgSource = {
    src: string;
    text: string;
}

export type TTariffOptions = {
    firstOption: string,
    secondOption: string,
    thirdOption: string
}

export type TTariffCard = {
    tariffTitle: string,
    tariffDescription: string,
    actualPrice: string,
    oldPrice: string,
    monthlyRate: string,
    tariffOptions: TTariffOptions
    backgroundColor: string,
    color?: string,
    border?: string,
    src: string
}

export type TStatResults = {
    range: string,
    total: number,
    risks: number
}

export interface IAuthCredentials {
    login: string
    password: string
}

export type TToken = {
    accessToken: string,
    expire: string
}

export type EventFilter = {
    "usedCompanyCount": number,
    "companyLimit": number
}

export type TEventFiltersInfo = {
    eventFiltersInfo: EventFilter
}