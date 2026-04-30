export default function ExerciseItemSkeleton() {
    return <li className={"w-full h-fit bg-components flex flex-row rounded"}>
        <span className={"fake-img component-skeleton w-24 h-24 rounded-l"}/>
        <div className={"flex-col flex flex-1 py-4 px-2 gap-1"}>
            <span className={"fake-text component-skeleton w-full h-4 rounded-full"}/>
            <span className={"fake-text component-skeleton w-[30%] h-4 rounded-full"}/>
        </div>
        <div className={"h-24 w-8 bg-components-hover rounded-r"}></div>
    </li>
}