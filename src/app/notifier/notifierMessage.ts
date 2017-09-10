

export class NotifierMessage {
    constructor (
        public success: boolean,
        public messages: string[]
    ) {}

    public static create (
        success?:boolean,
        messages?:string []
    ) : NotifierMessage {
        return new NotifierMessage(
            success || false,
            messages || []
        )
    }
}

export class ThrobberMessage {
	constructor(
		public sender: string
		, public showThrobber: boolean
	) { }

	public static create(sender?: string, showThrobber?: boolean): ThrobberMessage {
		return new ThrobberMessage(sender || "default", showThrobber || false )
	}
}