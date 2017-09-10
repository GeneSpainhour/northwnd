


export class ExternalIDType {
    constructor(
        public ExternalIdTypeID: number,
        public Name: string
    ) { }

    public static create(
        externalIdTyepId?: number,
        name?: string): ExternalIDType {
        return new ExternalIDType(
            externalIdTyepId > 0 ? externalIdTyepId : 0,
            name || ""
        )
    }
}


