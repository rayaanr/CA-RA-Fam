"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { createFamilyTree, getIndividualByID } from "../utils/data/familyTree";
import { Individual } from "@/app/global/types";
import Xarrow from "react-xarrows";
import UserCard from "./cards/IndividualCard";

interface TreeNode {
    id: string;
    children: TreeNode[];
    spouseID?: string | null;
}

interface FamilyMemberProps {
    individual: TreeNode;
    treeData: Individual[];
    handleDataUpdated: () => void;
}

// Render individual family member
const RenderIndividual = ({
    id,
    treeData,
    handleDataUpdated,
}: {
    id: string;
    treeData: Individual[];
    handleDataUpdated: () => void;
}) => {
    const individual = getIndividualByID(id, treeData);
    if (!individual) return null;

    return (
        <>
            <section id={`main-${individual.id}`} className="w-40">
                <UserCard userID={individual.id} treeData={treeData} handleDataUpdated={handleDataUpdated} />
            </section>
            {individual.spouseID && (
                <section>
                    <div id={`spouse-${individual.spouseID}`} className="w-40">
                        <UserCard
                            userID={individual.spouseID}
                            treeData={treeData}
                            handleDataUpdated={handleDataUpdated}
                        />
                    </div>
                    <Xarrow
                        start={`main-${individual.id}`}
                        end={`spouse-${individual.spouseID}`}
                        showHead={false}
                        strokeWidth={2}
                    />
                </section>
            )}
        </>
    );
};

const FamilyMemberComponent: React.FC<FamilyMemberProps> = ({
    individual,
    treeData,
    handleDataUpdated,
}) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentHeight, setParentHeight] = useState(0);

    useEffect(() => {
        if (parentRef.current) {
            setParentHeight(parentRef.current.offsetHeight);
        }
    }, []);

    return (
        <main className="flex flex-col gap-20 items-center justify-center">
            <section ref={parentRef} className="text-center">
                <div className="flex gap-5">
                    <RenderIndividual id={individual.id} treeData={treeData} 
                    handleDataUpdated={handleDataUpdated} />
                    
                </div>
            </section>
            {individual.children && individual.children.length > 0 && (
                <section className="flex gap-12 flex-wrap justify-between">
                    {individual.children.map((child) => (
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
                            <FamilyMemberComponent
                                individual={child}
                                treeData={treeData}
                                handleDataUpdated={handleDataUpdated}
                            />
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
};

export default function FamilyTreeComponent() {
    const [familyTree, setFamilyTree] = useState<TreeNode[]>([]);
    const [treeData, setTreeData] = useState<Individual[]>([]); // State to hold all individuals
    const [updateCounter, setUpdateCounter] = useState(0);


    useEffect(() => {
        const fetchAllIndividuals = async () => {
            try {
                const res = await axios.get<Individual[]>(
                    "/api/tree/individual"
                );
                setTreeData(res.data);
                const tree = createFamilyTree(res.data);
                setFamilyTree(tree);
                console.log(tree);
            } catch (error) {
                console.error("Failed to fetch individuals:", error);
            }
        };

        fetchAllIndividuals();
    }, [updateCounter]);

    const handleDataUpdated = () => {
        setUpdateCounter((prev) => prev + 1);
    };
    

    return (
        <main>
            {familyTree.map((individual) => (
                <FamilyMemberComponent
                    key={individual.id}
                    individual={individual}
                    treeData={treeData}
                    handleDataUpdated={handleDataUpdated}
                />
            ))}
        </main>
    );
}
