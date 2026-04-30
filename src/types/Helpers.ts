export default async function FakeDelay(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}