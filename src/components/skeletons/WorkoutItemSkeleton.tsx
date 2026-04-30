export default function WorkoutItemSkeleton() {
        //   Added overflow hidden to the LI because the div was sticking out.
        return <li className={"w-full flex flex-row bg-components h-16 items-center justify-between gap-4 rounded overflow-hidden"}>
            <div className={"h-full w-8 component-skeleton flex items-center"}></div>
            <span className={"flex-1 component-skeleton rounded-full w-full h-6"}></span>
            <span className={"w-7"}></span>
        </li>
}