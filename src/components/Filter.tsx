interface FilterProps {
  gif: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function Filter({ gif, isSelected, onClick }: FilterProps) {
  return (
    <div className="w-full h-full p-2">
      <button
        className={isSelected ? "outline-1 outline-accent" : "outline-0"}
        onClick={onClick}
      >
        <img className="min-w-15 w-15 h-15 contain-content" src={gif} width={"60"} height={"60"} alt="" />
      </button>
    </div>
  );
}
