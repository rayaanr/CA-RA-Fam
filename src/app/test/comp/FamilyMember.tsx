"use client";

import React, { useEffect, useRef, useState } from "react";
import { FamilyMemberProps, Person } from "./types";

// Simplified renderMember function without the dot
const renderMember = (person: Person, ref: React.RefObject<HTMLDivElement>) => (
    <div
        ref={ref}
        key={person.id}
        className="border-1 border-black p-2 relative w-[150px]"
    >
        <p>
            {person.name} ({person.birthYear})
        </p>
    </div>
);

const FamilyMember: React.FC<FamilyMemberProps> = ({ person, spouse }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const personRef = useRef<HTMLDivElement>(null);
    const spouseRef = useRef<HTMLDivElement>(null);
    const [lineCoords, setLineCoords] = useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
    });

    useEffect(() => {
        // Function to calculate positions has been simplified
        const calculatePosition = (ref: React.RefObject<HTMLDivElement>) => {
            if (ref.current && containerRef.current) {
                const rect = ref.current.getBoundingClientRect();
                const containerRect =
                    containerRef.current.getBoundingClientRect();
                const x = rect.left + rect.width / 2 - containerRect.left;
                const y = rect.top + rect.height / 2 - containerRect.top;
                return { x, y };
            }
            return null;
        };

        const personPosition = calculatePosition(personRef);
        const spousePosition = spouse ? calculatePosition(spouseRef) : null;

        if (personPosition && spousePosition) {
            setLineCoords({
                x1: personPosition.x,
                y1: personPosition.y,
                x2: spousePosition.x,
                y2: spousePosition.y,
            });
        }
    }, [person, spouse]); // Depend on person and spouse to recalculate when they change

    return (
        <div
            ref={containerRef}
            className={`flex ${
                spouse
                    ? "flex-row p-1 gap-5 border-1 border-red-500"
                    : "flex-col"
            } relative`}
        >
            {renderMember(person, personRef)}
            {spouse && renderMember(spouse, spouseRef)}
            {containerRef.current && (
                <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox={`0 0 ${containerRef.current.offsetWidth} ${containerRef.current.offsetHeight}`}
                >
                    <line
                        x1={lineCoords.x1}
                        y1={lineCoords.y1}
                        x2={lineCoords.x2}
                        y2={lineCoords.y2}
                        stroke="black"
                    />
                </svg>
            )}
        </div>
    );
};

export default FamilyMember;
