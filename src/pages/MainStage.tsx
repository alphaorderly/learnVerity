import { ChangeEvent, FC } from 'react'
import { Languages } from 'lucide-react'
import InnerStage from './Inner/InnerStage'
import i18n from '../locales/i18n'
import OuterStage from './Outer/OuterStage'
import Github from '../components/Icon/Github'

const MainStage: FC = () => {
    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value
        i18n.changeLanguage(lang)
    }

    return (
        <div className="flex min-w-[1600px] select-none flex-col">
            <div className="flex flex-col items-start gap-10 p-10">
                <div className="mx-auto w-full max-w-4xl px-4 py-8">
                    <div className="rounded-xl bg-white p-6 shadow-lg">
                        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                            <span className="inline-flex items-center gap-2">
                                <Languages className="text-3xl" />
                                Change Language / 언어 변경
                            </span>
                        </h2>
                        <div className="relative">
                            <select
                                name="languages"
                                id="language_select"
                                onChange={changeLanguage}
                                defaultValue={i18n.language}
                                className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="en" className="py-2">
                                    🇺🇸 English / 영어
                                </option>
                                <option value="ko" className="py-2">
                                    🇰🇷 한국어 / Korean
                                </option>
                                <option value="jp" className="py-2">
                                    🇯🇵 日本語 / Japanese
                                </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                <svg
                                    className="size-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[200px]">
                <InnerStage />
            </div>
            <div>
                <OuterStage />
            </div>
            <div className="flex w-full flex-col items-center">
                <Github />
            </div>
        </div>
    )
}

export default MainStage
