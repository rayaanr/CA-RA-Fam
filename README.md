# Family Tree Visualization with Next.js and React

This guide provides a comprehensive overview of creating a dynamic family tree visualization using Next.js and React. The example leverages several advanced features, including dynamic imports with Next.js for client-side rendering and the `react-xarrows` library for drawing connections between family members.

## Project Setup

First, ensure you have Next.js and React installed in your project. If you haven't done so, create a new Next.js project and navigate to your project directory:

```bash
npx create-next-app@latest
cd your-project-directory
```

Install the necessary dependencies:

```bash
npm install react-xarrows
```

# Defining Types and Data Structure
Start by defining the data types and the structure for our family members. Create a file named types.ts in a global directory:

```typescript
export type relationship = "parent" | "spouse";

export type FamilyMember = {
    id: string;
    name: string;
    spouse?: string;
    children?: FamilyMember[];
};

export interface FamilyMemberProps {
    member: FamilyMember;
}

export interface RenderMemberProps {
    name: string;
    id: string;
    spouse?: string;
}
```

These types will help ensure that our components receive the correct data structure.

# Dynamic Import for Client-Side Rendering
To optimize our application, we'll use Next.js's dynamic import feature for client-side rendering. Create a component Tree in your project and use dynamic import as follows:

```typescript
import dynamic from 'next/dynamic';

const TreeNoSSR = dynamic(() => import('./utils/Tree'), {
    ssr: false
});

export default function Page() {
    return (
        <main>
            <TreeNoSSR />
        </main>
    );
}
```


This setup ensures that the Tree component is only rendered on the client side, improving performance and compatibility.

# Implementing the Family Tree Component
Create a new file for your family tree component. Here, we define a static list familyTree to simulate fetching data from an API or a database:


```typescript
"use client";

import React, { useEffect, useRef, useState } from "react";
import Xarrow from "react-xarrows";
import { FamilyMember, FamilyMemberProps, RenderMemberProps } from "../global/types";
import { fetchAndProcessFamilyData } from "../utils/getfamilyTreeData";


const familyTree: FamilyMember[] = [
    {
        id: "1",
        name: "Parent 1",
        spouse: "Parent 2",
        children: [
            {
                id: "2",
                name: "Child 1",
                spouse: "Child 1 Spouse",
                children: [
                    { id: "3", name: "Grandchild 1" },
                    { id: "4", name: "Grandchild 2" },
                ],
            },
            {
                id: "5",
                name: "Child 2",
                spouse: "Child 2 Spouse",
                children: [
                    { id: "9", name: "Grandchild 5" },
                    { id: "10", name: "Grandchild 6" },
                ],
            },
            {
                id: "6",
                name: "Child 3",
                spouse: "Child 3 Spouse",
                children: [
                    { id: "7", name: "Grandchild 3" },
                    { id: "8", name: "Grandchild 4" },
                ],
            },
        ],
    },
];

// Render individual family member
const RenderMember = ({ name, id, spouse }: RenderMemberProps) => (
    <>
        <div id={`main-${id}`} className="border p-2 w-40">
            {name}
        </div>
        {spouse && (
            <div>
                <div id={`spouse-${id}`} className="border p-2 w-40">
                    {spouse}
                </div>
                <Xarrow
                    start={`main-${id}`}
                    end={`spouse-${id}`}
                    showHead={false}
                    strokeWidth={2}
                />
            </div>
        )}
    </>
);


const FamilyMemberComponent: React.FC<FamilyMemberProps> = ({ member }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentHeight, setParentHeight] = useState(0);

    useEffect(() => {
      if (parentRef.current) {
        setParentHeight(parentRef.current.offsetHeight);
      }
    }, []);

    return (
        <div className="flex flex-col gap-20 items-center justify-center">
            <div ref={parentRef} className="text-center">
                <div className="flex gap-5">
                    <RenderMember {...member} />
                </div>
            </div>
            {member.children && member.children.length > 0 && (
                <div className="flex gap-12 flex-wrap justify-between">
                    {member.children.map((child) => (
                        <div
                            key={child.id}
                            className="flex flex-col items-center"
                        >
                            <Xarrow
                                start={parentRef}
                                end={`main-${child.id}`}
                                startAnchor={{
                                    position: "bottom",
                                    offset: { y: -(parentHeight / 2) },
                                }}
                                endAnchor={"top"}
                                animateDrawing
                                path="grid"
                                strokeWidth={2}
                            />
                            <FamilyMemberComponent member={child} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default async function Tree() {
    const familyData = await fetchAndProcessFamilyData();
    console.log("Family Data:", familyData);

    return (
        <div>
            {familyTree.map((member) => (
                <FamilyMemberComponent key={member.id} member={member} />
            ))}
        </div>
    );
}
```


# Visualizing Connections with react-xarrows
The react-xarrows library is used to draw lines connecting family members, visually representing their relationships. This is integrated within the RenderMember and FamilyMemberComponent components, using the Xarrow component to draw arrows between elements.