import { ChangeEvent, FC } from 'react'
import InnerStage from './Inner/InnerStage'
import i18n from '../locales/i18n'
import OuterStage from './Outer/OuterStage'

const MainStage: FC = () => {
    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value
        i18n.changeLanguage(lang)
    }

    return (
        <div className="flex select-none flex-col pb-96">
            <div className="pt-5 text-center text-3xl">
                Change language / 언어 변경
            </div>
            <select
                name="languages"
                id="language_select"
                onChange={changeLanguage}
                className="p-10 text-4xl"
                defaultValue={i18n.language}
            >
                <option value="en">영어 / English</option>
                <option value="ko">한국어 / Korean</option>
                <option value="jp">日本語 / Japanese</option>
            </select>
            <div className="mb-[200px]">
                <InnerStage />
            </div>
            <div>
                <OuterStage />
            </div>
        </div>
    )
}

export default MainStage
