import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export function ErrorState({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{error.message}</span>
        {retry && (
          <Button variant="outline" size="sm" onClick={retry}>
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

export function EmptyState({ message, icon: Icon }: { message: string; icon?: React.ComponentType<{ className?: string }> }) {
  const IconComponent = Icon || AlertCircle;
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <IconComponent className="mb-4 h-12 w-12 text-harbor-muted" />
      <p className="text-harbor-muted">{message}</p>
    </div>
  );
}
