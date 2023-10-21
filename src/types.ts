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
    src: string
}

export type TStatResults = {
    range: string,
    total: number,
    risks: number
}