// app/dashboard/count/skus/page.js
import { Suspense } from 'react';
import TagSKUsPage from '@/webPages/Count/Skus';

function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    }>
      <TagSKUsPage />
    </Suspense>
  );
}

export default Page;