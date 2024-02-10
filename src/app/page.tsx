import dynamic from 'next/dynamic';
import TopNav from "./components/TopNav";

const TreeNoSSR = dynamic(() => import('./utils/Tree'), {
    ssr: false
});

export default function Page() {
    return (
        <main>
            <TopNav />
            <TreeNoSSR />
        </main>
    );
}