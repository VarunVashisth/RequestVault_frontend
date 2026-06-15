import clsx from 'clsx'

interface MethodBadgeProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string
  className?: string
}

export default function MethodBadge({ method = 'GET', className = '' }: MethodBadgeProps) {
  const getMethodColor = (m: string = 'GET') => {
    switch (m?.toUpperCase()) {
      case 'GET':
        return 'bg-vault-accent/12 text-vault-accent border border-vault-accent/20'
      case 'POST':
        return 'bg-vault-success/12 text-vault-success border border-vault-success/20'
      case 'PUT':
        return 'bg-vault-warning/12 text-vault-warning border border-vault-warning/20'
      case 'DELETE':
        return 'bg-vault-danger/12 text-vault-danger border border-vault-danger/20'
      case 'PATCH':
        return 'bg-vault-accent/12 text-vault-accent border border-vault-accent/20'
      default:
        return 'bg-vault-border/50 text-vault-text-secondary border border-vault-border'
    }
  }

  const displayMethod = (method?.toString() || 'GET').toUpperCase().slice(0, 6)

  return (
    <span className={clsx(
      'inline-flex items-center justify-center w-11 h-7 rounded font-mono font-bold text-xs',
      getMethodColor(method?.toString()),
      className
    )}>
      {displayMethod}
    </span>
  )
}
