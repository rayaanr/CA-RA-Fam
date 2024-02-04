import React from 'react';
import FamilyGroup from './comp/FamilyGroup';
import membersData from './tree.json';

export default function TestPage() {
    return (
        <div>
        <h1>Fam Tree</h1>
        <FamilyGroup members={membersData.people} />
        </div>
    );
}