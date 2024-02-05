"use client";

import React, { Component } from "react";
import FamilyTree from "./mytree";

export default class App extends Component {
    render() {
        return (
            <div style={{ height: "100%" }}>
                <FamilyTree
                    nodes={[
                        {
                            id: 0,
                            name: "Casin",
                            gender: "male",
                            img: "https://cdn.balkan.app/shared/m30/5.jpg",
                        },
                        {
                            id: 1,
                            pids: [2],
                            name: "Anomika",
                            gender: "female",
                            img: "https://cdn.balkan.app/shared/2.jpg",
                        },
                        {
                            id: 2,
                            pids: [1],
                            fid: 0,
                            name: "Rilshad",
                            gender: "male",
                            img: "https://cdn.balkan.app/shared/m30/5.jpg",
                        },
                        {
                            id: 3,
                            mid: 1,
                            fid: 2,
                            name: "Rayaan",
                            gender: "male",
                            img: "https://cdn.balkan.app/shared/m10/2.jpg",
                        },
                        {
                            id: 4,
                            mid: 1,
                            fid: 2,
                            name: "Roshi",
                            gender: "female",
                            img: "https://cdn.balkan.app/shared/m10/1.jpg",
                        },
                        {
                            id: 5,
                            mid: 1,
                            fid: 2,
                            name: "Rasheeka",
                            gender: "female",
                            img: "https://cdn.balkan.app/shared/w10/3.jpg",
                        },
                    ]}
                />
            </div>
        );
    }
}
