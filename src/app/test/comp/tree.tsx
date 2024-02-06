import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { Card, CardBody } from "@nextui-org/react";

interface TreeCardProps {
    classNames?: {
        mainWrapper?: string;
        card?: string;
    };
}

const CoupleCards: React.FC<TreeCardProps> = ({ classNames }) => (
    <div
        className="couple-card flex justify-center gap-5 w-fit relative"
        // style={{ transform: "translateX(50%)", marginRight: "250px" }}
    >
        <Card className="z-20">
            <CardBody>
                <h1>Husband</h1>
                <p>Card is a container for text</p>
            </CardBody>
        </Card>
        <em className="border-1 border-black rotate-90 w-0.5 z-10 bg-black"></em>
        <Card className="z-20">
            <CardBody>
                <h1>Wife</h1>
                <p>Card is a container for text</p>
            </CardBody>
        </Card>
    </div>
);

const TreeCard: React.FC<TreeCardProps> = ({ classNames }) => (
    <div className="flex justify-center">
        <Card className="w-fit">
            <CardBody>
                <h1>Card</h1>
                <p>Card is a container for text</p>
            </CardBody>
        </Card>
    </div>
);

const ExampleTree = () => (
    <div className="overflow-x-auto w-fit overflow-y-auto min-h-screen flex flex-col justify-center items-center pl-[500px] pr-[500px]">
        <Tree
            lineWidth="3px"
            lineBorderRadius="10px"
            lineHeight="30px"
            label={<></>}
        >
            <TreeNode label={<CoupleCards />}>
                <TreeNode label={<CoupleCards />}>
                    <TreeNode label={<CoupleCards />}>
                        <TreeNode label={<TreeCard />}></TreeNode>
                        <TreeNode label={<TreeCard />}></TreeNode>
                    </TreeNode>
                    <TreeNode label={<TreeCard />}></TreeNode>
                </TreeNode>
                <TreeNode label={<CoupleCards />}>
                    <TreeNode label={<TreeCard />}></TreeNode>
                    <TreeNode label={<CoupleCards />}>
                        <TreeNode label={<TreeCard />}></TreeNode>
                        <TreeNode label={<CoupleCards />}>
                            <TreeNode label={<CoupleCards />}>
                                <TreeNode label={<TreeCard />}></TreeNode>
                                <TreeNode label={<TreeCard />}></TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    <TreeNode label={<CoupleCards />}>
                        <TreeNode label={<CoupleCards />}>
                            <TreeNode label={<TreeCard />}></TreeNode>
                            <TreeNode label={<TreeCard />}></TreeNode>
                        </TreeNode>
                    </TreeNode>
                </TreeNode>
            </TreeNode>
        </Tree>
    </div>
);

export default ExampleTree;
