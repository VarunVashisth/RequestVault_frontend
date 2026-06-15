export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-vault-border rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-vault-accent border-r-vault-accent rounded-full animate-spin" />
      </div>
    </div>
  )
}
