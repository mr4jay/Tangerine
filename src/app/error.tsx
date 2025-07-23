
'use client';

import { useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real application, you would log the error to a reporting service
    console.error(error);
  }, [error]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md text-center bg-card/80 border-destructive/50">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold">
              Oops! Something went wrong.
            </CardTitle>
            <CardDescription>
              An unexpected error occurred. You can try to reload the page or
              contact support if the problem persists.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => reset()} size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
