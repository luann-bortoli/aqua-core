import { ResourceStatus, ResourceStatusLabel } from '@/src/shared/types/entity'
import s from './StatusCard.module.css'

type Props = {
    status: ResourceStatus
}

export default function StatusCard({ status }: Props) {

    const switchStatusColor = () => {

        if (!status) return

        switch (status)
        {
            case 'ACTIVE':
                return "--success-title"

            case 'INACTIVE':
                return "--error-text"

            case 'DRAFT':
                return "--warning-outline"
        }
    }

    return (
        <>
            <div className={s.statusWrapper}>

                <span
                    style={{ backgroundColor: `var(${switchStatusColor()})` }}
                    className={s.statusBadge}></span>

                <p
                    className={s.statusLabel}
                >
                    {ResourceStatusLabel[status]}
                </p>
            </div>
        </>
    )
}