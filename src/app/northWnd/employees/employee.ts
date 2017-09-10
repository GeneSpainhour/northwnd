

export class Employee {
	constructor(
		public employeeID: number
		, public lastName: string
		, public firstName: string
		// , public title: string
		// , public titleOfCourtesy: string
		// , public birthDate: string
		// , public hireDate: string
		, public address: string
		, public city: string
		, public region: string
		, public postalCode: string
		// , public country: string
		// , public homePhone: string
		// , public extension: string
		// // , public Photo: number
		// , public notes: string
		, public reportsTo: number
		// , public photoPath: string
		 
	){}

	public static create (
		id?:number
		, lastName?:string
		, firstName?:string
		// , title?:string
		// , titleOfCourtesy? : string
		// , birthDate?: string
		// , hireDate?: string
		, address?: string
		, city? : string
		, region?: string
		, postalCode?: string
		// , country?:string
		// , homePhone?:string
		// , extension?: string
		// , notes?: string
		, reportsTo? :number
		// , photoPath?:string
	): Employee{
		let gamma = new Employee(
			id > 0 ? id : 0
			, lastName ||""
			, firstName || ""
			// , title || ""
			// , titleOfCourtesy ||""
			// , birthDate || ""
			// , hireDate || ""
			, address ||""
			, city || ""
			, region || ""	
			, postalCode ||""
			// , country || ""
			// , homePhone || ""
			// , extension ||""
			// , notes || ""
			, reportsTo  > 0 ? reportsTo : 0
		//	, photoPath ||""
		)

	

		return gamma
	}

	public static get employees(): Employee[] {
		return [
			Employee.create(1, 'Davolio', 'Mary',  '20th Ave. E. Apt. 2A', 'Seattle', 'WA', '98122', 2)
			, Employee.create(2, 'Fuller', 'Andrew',  '908 W. Capital Way', 'Tacoma', 'WA', '98401', null)
			, Employee.create(3, 'Leverling', 'Janet',  '722 Moss Bay Blvd.', 'Kirkland', 'WA', '98033', 2)
			, Employee.create(4, 'Peacock', 'Margaret',  '4110 Old Redmond Rd.', 'Redmond', 'WA', '98052', 2)
			, Employee.create(5, 'Buchanan', 'Steven',  '14 Garrett Hill', 'London', null, 'SW1 8JR', 2)
			, Employee.create(6, 'Suyama', 'Michael',  'Coventry House Miner Rd.', 'London', null, 'EC2 7JR', 5)
			, Employee.create(7, 'King', 'Robert',  'Edgeham Hollow Winchester Way', 'London', null, 'RG1 9SP', 5)
			, Employee.create(8, 'Callahan', 'Laura',  '4726 - 11th Ave. N.E.', 'Seattle', 'WA', '98105', 2)
			, Employee.create(8, 'Dodsworth', 'Anne',  '7 Houndstooth Rd.', 'London', null, 'WG2 7LT', 5)
		]
	}
}
