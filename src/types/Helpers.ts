export default async function FakeDelay(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const parseNumberInput = (value: string): number | null => {
    if (value.trim() === "") return 0;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
};