import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function EatenTodayList() {
    return (
        <div className="bg-[#1E1E1E] border border-[#414141] rounded-xl p-6 col-span-2 items-center">
            <h2 className="flex border-b-2 border-[#414141] w-full text-center mb-4 font-bold text-lg justify-between">
                <button
                    className="flex left-0 cursor-pointer"
                >
                    <ArrowBackIcon sx={{ fontSize: 32 }} />
                </button>
                Eaten today
                <button
                    className="flex left-0 cursor-pointer"
                >
                    <ArrowForwardIcon sx={{ fontSize: 32 }} />
                </button>
            </h2>
        </div>
    )
}
