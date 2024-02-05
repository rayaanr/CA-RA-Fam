import React, { Component } from "react";
import FamilyTree from "./treeScript/familytree.js";

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.family = new FamilyTree(this.divRef.current, {
            nodes: this.props.nodes,

            mode: "dark",
            template: "hugo",
            nodeMenu: {
                edit: { text: "Edit" },
                details: { text: "Details" },
            },
            nodeBinding: {
                field_0: "name",
                img_0: "img",
                field_1: "born",
            },
        });
    }

    render() {
        return <div id="tree" ref={this.divRef}></div>;
    }
}