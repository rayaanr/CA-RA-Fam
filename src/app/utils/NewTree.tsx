"use client";

import React, { useEffect, useRef, useState } from "react";
import Xarrow from "react-xarrows";
import { fetchAndProcessFamilyData } from "../utils/getfamilyTreeData";

type relationship = 'parent' | 'spouse';

type FamilyMember = {
    id: string;
    name: string;
    spouse?: string;
    children?: FamilyMember[];
};

interface FamilyMemberProps {
    member: FamilyMember;
}

interface RenderMemberProps {
    name: string;
    id: string;
    spouse?: string;
}


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
