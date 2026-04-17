
interface ItemComponentProps{
    children: React.ReactElement | React.ReactElement[]
}

/**
 * Default styling for the borders and backgrounds around components.
 * @constructor
 */
export default function ComponentContainer({children}:ItemComponentProps) {
    return <>
        <div className="bg-components border-bordercolor border rounded-xl w-full hover:bg-components-hover active:bg-components-hover px-4 py-2 flex flex-col">
            {children}
        </div>
    </>
}