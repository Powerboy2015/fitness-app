interface FoodItemProps {
    name: string;
}

export default function FoodItemComponent({ name }: FoodItemProps) {
    return (
        <div className="bg-[#252525] border-[#414141] border rounded-xl px-2 mb-3 flex w-[90%] items-center mx-auto hover:bg-[#252525] active:bg-[#252525] cursor-pointer">
            <div className="pl-3 p-6">
                <div className="flex-1 text-xl text-left cursor-pointer mb-auto">
                    {name}
                </div>
            </div>
        </div>
    );
}