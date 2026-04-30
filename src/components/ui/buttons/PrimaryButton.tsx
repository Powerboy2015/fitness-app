interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

/**
 * Default styling for the Primary button, with animations!
 * @constructor
 */
export default function PrimaryButton({children, onClick, ...props}:PrimaryButtonProps) {
    // Usage of mt-1 (4px) here is for the space the button requires when pressing.
    // By adding mt-1, the 4px that the button is outside the box,
    // We have a clearer overview of what space, in total, the button uses.
    return <button onClick={onClick} className={"w-full relative h-16 mt-1"} {...props}>
        <div className={"w-full h-full absolute -top-1 active:top-0 rounded-xl bg-accent text-textcolor font-semibold text-xl shadow-button active:shadow-none active:bg-accent-pressed hover:bg-accent-hover flex"}>
        {children}
        </div>
    </button>
}