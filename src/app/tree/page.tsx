"use client";

import React, { Component } from "react";
import FamilyTree from "./mytree";
import familyData from "./familyData.json"; // Import the JSON data

export default class App extends Component {
    render() {
        return (
            <div className="h-full">
                <FamilyTree nodes={familyData} />
            </div>
        );
    }
}
