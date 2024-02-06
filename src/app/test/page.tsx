'use client'

import React from 'react';
import dynamic from 'next/dynamic';


const ExampleTreeNoSSR = dynamic(() => import('./comp/tree'), {
  ssr: false, // Disable server-side rendering
});

const Page = () => (
  <div>
    <ExampleTreeNoSSR />
  </div>
);

export default Page;
