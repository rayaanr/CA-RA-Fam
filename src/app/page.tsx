import dynamic from "next/dynamic";
import TopNav from "./components/TopNav";
import FamilyTreeComponent from "./components/FamilyTreeComponent";

// const TreeNoSSR = dynamic(() => import('./utils/Tree'), {
//     ssr: false
// });

const FamilyTreeNoSSR = dynamic(
    () => import("./components/FamilyTreeComponent"),
    {
        ssr: false,
    }
);

export default function Page() {
    return (
        <main>
            <TopNav />
            {/* <TreeNoSSR /> */}
            <div className="w-[2000px]">
                <FamilyTreeNoSSR />
            </div>
        </main>
    );
}
