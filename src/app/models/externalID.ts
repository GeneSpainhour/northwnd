



export class ExternalIDModel {
    constructor(
        public ExternalIDID: number,
        public ConsumerID: number,
        public ExternalID: number,
        public ExternalIDTypeID: number
    ) { }

    public static create(
        externalIdId?: number,
        consumerId?: number,
        externalId?: number,
        externalIdTypeId?: number
    ): ExternalIDModel { 
        return new ExternalIDModel(
            externalIdId > 0 ? externalIdId : 0,
            consumerId > 0 ? consumerId : 0,
            externalId > 0 ? externalId : 0,
            externalIdTypeId > 0 ? externalIdTypeId : 0
        )
    }

    public static items(): ExternalIDModel[]{
        return [
            ExternalIDModel.create(1,1 ,1, 1),
            ExternalIDModel.create(2, 1,2, 1),
            ExternalIDModel.create(3, 1,3, 1),
            ExternalIDModel.create(4, 1,4, 1)
        ]
    }
} 

