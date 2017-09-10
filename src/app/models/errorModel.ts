
import { Headers } from '@angular/http'


export class ErrorModel {
	constructor(
		public body: any
		, public ok: boolean
		, public status: number
		, public statusText: string
		, public type: number
		, public url: string
		, public headers: Headers
	) { }

	public static create(
		body?: any
		, ok?: boolean
		, status?: number
		, statusText? : string
		, type?: number
		, url?: string
		, headers?: Headers
	): ErrorModel { 
		return new ErrorModel(
			body || {}
			, ok || false
			, status > 0 ? status : 500
			, statusText || ""
			, type > 0 ? type : 0
			, url || ""
			, headers || null)
	}

	public static fromHttpError(error: any): ErrorModel {
		let returnError = ErrorModel.create()

		if (error) {
			returnError = ErrorModel.errorModelBuilderFactory(error).errorResult
		}

		return returnError 
	}

	private static errorModelBuilderFactory(error: any): IErrorModelBuilder {
		let builder: IErrorModelBuilder = null

		if (error) {
			let type: string = typeof error

			switch (type) {
				case 'object':
					builder = new ObjectErrorModelBuilder(error)
					break
				case 'string':
					builder = new StringErrorModelBuilder(error)
					break
				default:
					builder = new StringErrorModelBuilder(error)
					break
			}
		}

		return builder
	}
}

interface IErrorModelBuilder {
	errorResult : ErrorModel
}

class StringErrorModelBuilder implements IErrorModelBuilder {

	constructor(private error: any) {}

	public get errorResult(): ErrorModel {
		
		return 	ErrorModel.create(null, false, 500, this.error.toString())
	}
}

class ObjectErrorModelBuilder implements IErrorModelBuilder {

	constructor(private error: any) { }

	public get errorResult(): ErrorModel {
		let result: ErrorModel = null
		
		if (this.error) {
			result = this.createResult()
		}
		return result		
	}

	private createResult(): ErrorModel {
		return ErrorModel.create(
			this.error._body || ""
			, <boolean> this.error.ok || false
			, <number> this.error.status || 500
			, <string> this.error.statusText || ""
			, <number> this.error.type 
			, <string> this.error.url
			, <Headers> this.error.headers
		)

	}
}