import { Suspense } from 'react';
import Count from '@/webPages/Count/Count';

function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
        </div>
      }
    >
      <Count />
    </Suspense>
  );
}

export default Page;