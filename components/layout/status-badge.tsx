export enum StatusBadgeType {
    ACTIVE = 'Ativado',
    DISABLED = 'Desativado',
}

export default function StatusBadge({ status }: { status: boolean }) {
    const statusBadgeType = status ? StatusBadgeType.ACTIVE : StatusBadgeType.DISABLED

    const statusClasses = {
        [StatusBadgeType.ACTIVE]: 'bg-green-100 text-green-500 border border-green-500',
        [StatusBadgeType.DISABLED]: 'bg-red-100 text-red-500 border border-red-500',
    }

    return (
        <span className={`w-auto rounded-sm px-2 py-1 text-xs font-semibold ${statusClasses[statusBadgeType]}`}>
            {statusBadgeType}
        </span>
    )
}
