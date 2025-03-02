import { FC } from 'react'
import { motion } from 'motion/react'
import cn from '../../lib/utils'

interface ToggleSwitchProps {
    /** 토글 스위치의 현재 상태 */
    value: boolean
    /** 토글 상태 변경 핸들러 */
    onChange: (value: boolean) => void
    /** 토글 스위치의 크기 (기본값: 32) */
    size?: number
    /** 활성화 상태일 때의 배경색 (기본값: #37cd11) */
    color?: string
    /** 비활성화 여부 */
    disabled?: boolean
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
    value,
    onChange,
    size = 32,
    color = '#37cd11',
    disabled = false,
}) => {
    // 스위치 패널 스타일
    const panelStyle = {
        width: size * 2,
        height: size,
        borderRadius: size,
        backgroundColor: value ? color : '#e0e0e0',
    }

    // 스위치 버튼 스타일
    const buttonStyle = {
        width: size - 8,
        height: size - 8,
        marginLeft: 4,
        marginRight: 4,
    }

    return (
        <div
            aria-label="switch-panel"
            style={panelStyle}
            className={cn(
                'flex cursor-pointer items-center',
                value ? 'justify-end' : 'justify-start',
                disabled && 'cursor-not-allowed opacity-50'
            )}
            onClick={() => {
                if (disabled) return
                onChange(!value)
            }}
        >
            <motion.div
                layout
                aria-label="switch-button"
                className="rounded-full bg-white p-0.5 shadow-sm"
                transition={{
                    type: 'tween',
                    duration: 0.2,
                }}
                style={buttonStyle}
            />
        </div>
    )
}

export default ToggleSwitch
