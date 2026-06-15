import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: number
  description?: string
  className?: string
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  description,
  className = '',
}: MetricCardProps) {
  return (
    <div className={`card group ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="label-base mb-3">{title}</p>
          <p className="text-3xl font-bold text-vault-text mb-3 break-words">{value}</p>
          {description && (
            <p className="text-xs text-vault-text-tertiary">{description}</p>
          )}
          {change !== undefined && (
            <div className={`text-xs mt-2 font-medium ${
              change >= 0 ? 'text-vault-success' : 'text-vault-danger'
            }`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last period
            </div>
          )}
        </div>
        <div className="p-3 bg-vault-accent/15 rounded group-hover:bg-vault-accent/25 transition-colors flex-shrink-0">
          <Icon size={24} className="text-vault-accent" />
        </div>
      </div>
    </div>
  )
}
