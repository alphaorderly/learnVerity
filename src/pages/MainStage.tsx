import { ChangeEvent, FC } from 'react'
import InnerStage from './Inner/InnerStage'
import i18n from '../locales/i18n'

const MainStage: FC = () => {
    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value
        i18n.changeLanguage(lang)
    }

    return (
        <div className="flex select-none flex-col">
            <select
                name="languages"
                id="language_select"
                onChange={changeLanguage}
                className="p-10 text-4xl"
                defaultValue={i18n.language}
            >
                <option value="en">영어 / English</option>
                <option value="ko">한국어 / Korean</option>
            </select>
            <InnerStage />
        </div>
    )
}

export default MainStage
