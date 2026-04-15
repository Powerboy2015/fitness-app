import { useTheme } from "../theme/ThemeProvider";

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded bg-components text-textcolor border border-bordercolor"
        >
            {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
        </button>
    );
}