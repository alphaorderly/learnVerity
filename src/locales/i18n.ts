import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en/locale.json'
import ko from './ko/locale.json'

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ko: { translation: ko },
    },
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n