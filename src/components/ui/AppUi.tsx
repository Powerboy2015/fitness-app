import UIHeader from "./UIheader.tsx";
import UIFooter from "./UIFooter.tsx";

interface AppUiProps {
    children: React.ReactElement
}
export default function AppUi({children}: AppUiProps): React.ReactElement {
    return <div id={"UILayer"} className={"w-full h-full flex flex-col text-textcolor"}>
        <UIHeader/>
                {children}
        <UIFooter/>

    </div>
}