

export class ResultModel {
    constructor(
        public success: boolean,        // success or failure
        public msgs: string[],          // messages to display
        public action?: string,         // action just accomplished "Add, Delete, Update"
        public args? : any              // args come in handy when you need to send result values
    ) { }

    public static create(
        success?: boolean,
        msgs?: string[],
        action?: string,
        args?:any
    ): ResultModel {
        return new ResultModel(
            success || true,
            msgs || [],
            action || "",
            args || {}
        )

    }
}