import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="p-4 bg-vault-border/30 rounded-lg mb-4">
        <Icon size={32} className="text-vault-text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-vault-text mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-vault-text-secondary mb-4 text-center max-w-xs">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary px-4 py-2 text-sm mt-2"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
