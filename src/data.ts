import stopWatch from "./assets/stop-watch.svg";
import magnifyingGlass from "./assets/magnifying-glass.svg";
import shield from "./assets/shield.svg";
import lamp from './assets/lamp.svg';
import goal from './assets/dart.svg';
import laptop from './assets/laptop.svg';

export const cardContents = [
    {
        src: stopWatch,
        text: 'Extremely fast \n application processing'
    },
    {
        src: stopWatch,
        text: 'Immediate finding of  \n a company looked for'
    },
    {
        src: magnifyingGlass,
        text: 'Vast database which makes it possible to get a detailed information'
    },
    {
        src: magnifyingGlass,
        text: 'Find all companies on the territory of the Russian Federation'
    },
    {
        src: shield,
        text: 'Protection of private data according to the federal law'
    },
    {
        src: shield,
        text: 'Protection of your money'
    }
]

export const tariffCardContents = [
    {
        tariffTitle: 'Beginner',
        tariffDescription: 'For small research',
        actualPrice: '799 ₽',
        oldPrice: '1200 ₽',
        monthlyRate: 'or 150 ₽/month on a 24 months rate',
        tariffOptions: {
            firstOption: 'Unlimited search history',
            secondOption: 'Safe deal',
            thirdOption: 'A 24/7 support'
        },
        backgroundColor: 'rgba(255, 182, 79, 1)',
        color: '',
        border: '2px solid rgba(255, 182, 79, 1)',
        src: lamp
    },
    {
        tariffTitle: 'Pro',
        tariffDescription: 'For HR and freelancers',
        actualPrice: '1299 ₽',
        oldPrice: '2600 ₽',
        monthlyRate: 'or 279 ₽/month on a 24 months rate',
        tariffOptions: {
            firstOption: 'All features of the Beginner tariff',
            secondOption: 'Search history export',
            thirdOption: 'Priority recommendations'
        },
        backgroundColor: 'rgba(124, 227, 225, 1)',
        color: '',
        src: goal
    },
    {
        tariffTitle: 'Business',
        tariffDescription: 'For corporate clients',
        actualPrice: '2379 ₽',
        oldPrice: '3700 ₽',
        monthlyRate: '',
        tariffOptions: {
            firstOption: 'All features of the Pro tariff',
            secondOption: 'Unlimited searching amount',
            thirdOption: 'Prioritized support'
        },
        backgroundColor: 'rgba(0, 0, 0, 1)',
        color: 'white',
        src: laptop
    }
]

export const checkboxData = [
    {
        russian: 'Maximal fullness',
        english: 'maxFullness',
        status: false,
        id: 0
    },
    {
        russian: 'Mentioned in business context',
        english: 'inBusinessNews',
        status: false,
        id: 1
    },
    {
        russian: 'Main role in the article',
        english: 'onlyMainRole',
        status: false,
        id: 2
    },
    {
        russian: 'Only with risk factors',
        english: 'onlyWithRiskFactors',
        status: false,
        id: 3
    },
    {
        russian: 'Include tech news',
        english: 'excludeTechNews',
        status: true,
        id: 4
    },
    {
        russian: 'Include announcements',
        english: 'excludeAnnouncements',
        status: true,
        id: 5
    },
    {
        russian: 'Include digests',
        english: 'excludeDigests',
        status: true,
        id: 6
    }
]

export const statData = [
    {
        range: '10.09.2021',
        total: 5,
        risks: 2
    },
    {
        range: '11.09.2021',
        total: 6,
        risks: 0
    },
    {
        range: '12.09.2021',
        total: 4,
        risks: 2
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '10.09.2021',
        total: 5,
        risks: 2
    },
    {
        range: '11.09.2021',
        total: 6,
        risks: 0
    },
    {
        range: '12.09.2021',
        total: 4,
        risks: 2
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '12.09.2021',
        total: 4,
        risks: 2
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    }
]