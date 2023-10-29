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

export type TIssueDateInterval = {
    startDate: string,
    endDate: string
}

type TSearchEntities = {
    type: string,
    inn: number,
    maxFullness: boolean,
    inBusinessNews: boolean
}

type TTargetSearchEntities = {
    targetSearchEntities: TSearchEntities[]
}

type TTargetSearchEntitiesContext = {
    targetSearchEntitiesContext: TTargetSearchEntities,
    onlyMainRole: boolean,
    tonality: "any",
    onlyWithRiskFactors: boolean
}

export type TAttributeFilters = {
    excludeTechNews: boolean,
    excludeAnnouncements: boolean,
    excludeDigests: boolean
}

export type TSearchData = {
    intervalType: string,
    issueDateInterval: TIssueDateInterval,
    searchContext: TTargetSearchEntitiesContext,
    histogramTypes: [totalDocuments: string, riskFactors: string],
    similarMode: "none" | "duplicates",
    limit: number,
    sortType: "issueDate" | "sourceInfluence",
    sortDirectionType: "asc" | "desc",
    attributeFilters: TAttributeFilters,
}

type TTotalDocsResult = {
    date: string,
    value: number
}

export type TTotalDocsResultArray = {
    data: TTotalDocsResult[]
};

type TTotalDocuments = {
    data: TTotalDocsResultArray,
    histogramType: 'totalDocuments'
}

type TRiskFactors = {
    data: TTotalDocsResultArray,
    histogramType: 'riskFactors'
}

export type TSearchResults = TTotalDocuments & TRiskFactors