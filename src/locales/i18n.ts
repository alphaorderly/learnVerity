import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en/locale.json'
import ko from './ko/locale.json'
import jp from './jp/locale.json'

const savedLanguage = localStorage.getItem('language') || 'ko'

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ko: { translation: ko },
        jp: { translation: jp },
    },
    lng: savedLanguage,
    fallbackLng: 'ko',
    interpolation: {
        escapeValue: false,
    },
})

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng)
})

export default i18n
