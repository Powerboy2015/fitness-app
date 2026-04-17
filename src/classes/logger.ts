export default class logger{

    private static createTimeStamp() {
        const time = new Date();
        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }
    public static LogEvent(eventDesc:string,event: any) {
        const time = new Date();
        const timestamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        console.debug(`[DEBUG][${timestamp}][${eventDesc}]`, event);
    }
    public static LogError(eventDesc:string) {
        const timestamp = this.createTimeStamp();
        console.error(`[ERROR][${timestamp}] ${eventDesc}`);
    }


}