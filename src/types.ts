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
    login: string,
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

type TIssueDateInterval = {
    startDate: string,
    endDate: string
}

type TSearchEntities = {
    type: string,
    inn: number
}

type TTargetSearchEntities = {
    targetSearchEntities: TSearchEntities[]
}

type TTargetSearchEntitiesContext = {
    targetSearchEntitiesContext: TTargetSearchEntities
}

type TSimilarMode = {
    none: string,
    duplicates: string
}

type TSortType = {
    issueDate: string,
    sourceInfluence: string
}

type TSortDirectionType = {
    asc: string,
    desc: string
}

type TAttributeFilters = {
    excludeTechNews: boolean,
    excludeAnnouncements: boolean,
    excludeDigests: boolean
}

export type TSearchData = {
    intervalType: string,
    issueDateInterval: TIssueDateInterval,
    searchContext: TTargetSearchEntitiesContext,
    histogramTypes: [totalDocuments: string, riskFactors: string],
    similarMode: TSimilarMode,
    limit: number,
    sortType: TSortType,
    sortDirectionType: TSortDirectionType,
    attributeFilters: TAttributeFilters,
    tonality: "any",
    maxFullness: boolean,
    onlyMainRole: true
}