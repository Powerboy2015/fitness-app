import {twMerge} from "flowbite-react/helpers/tailwind-merge";

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
    return <button {...props} onClick={onClick} className={twMerge(["w-full h-16 mt-1 rounded-xl bg-accent text-textcolor font-semibold text-xl shadow-button hover:bg-accent-hover active:shadow-none active:bg-accent-pressed active:translate-y-1 transition-transform",props.className||""])} >
        {children}
    </button>
}