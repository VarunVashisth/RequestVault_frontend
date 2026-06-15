import clsx from 'clsx'

interface StatusBadgeProps {
  status: number
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return 'bg-vault-success/12 text-vault-success border border-vault-success/20'
    if (code >= 300 && code < 400) return 'bg-vault-accent/12 text-vault-accent border border-vault-accent/20'
    if (code >= 400 && code < 500) return 'bg-vault-warning/12 text-vault-warning border border-vault-warning/20'
    return 'bg-vault-danger/12 text-vault-danger border border-vault-danger/20'
  }

  const getStatusText = (code: number) => {
    if (code >= 200 && code < 300) return 'Success'
    if (code >= 300 && code < 400) return 'Redirect'
    if (code >= 400 && code < 500) return 'Client Error'
    return 'Server Error'
  }

  return (
    <span className={clsx(
      'inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-medium',
      getStatusColor(status),
      className
    )}>
      <span className="font-mono font-bold">{status}</span>
      <span className="hidden sm:inline">{getStatusText(status)}</span>
    </span>
  )
}
