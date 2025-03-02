import shuffleArray from '../utils/shuffle/shuffleArray'

const names = {
    ko: [
        '칠수',
        '영환',
        '수민',
        '동현',
        '준호',
        '지우',
        '지은',
        '지훈',
        '정우',
        '정현',
        '정훈',
        '하윤',
        '하은',
        '하훈',
        '호준',
    ],
    en: [
        'John',
        'Jane',
        'Mike',
        'Emily',
        'David',
        'Sarah',
        'Robert',
        'Jessica',
        'William',
        'Olivia',
        'James',
        'Sophia',
        'Benjamin',
        'Ava',
        'Joseph',
    ],
    jp: [
        '佐藤',
        '鈴木',
        '高橋',
        '田中',
        '伊藤',
        '渡辺',
        '山本',
        '中村',
        '小林',
        '加藤',
        '吉田',
        '山田',
        '佐々木',
        '山口',
        '松本',
    ],
}

const currentName = (language: string): string[] => {
    if (language !== 'ko' && language !== 'en' && language !== 'jp') {
        return shuffleArray(names.en).slice(0, 3)
    }

    return shuffleArray(names[language]).slice(0, 3)
}

export default currentName
