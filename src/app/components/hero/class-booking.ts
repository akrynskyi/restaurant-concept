export class Booking {
	public uid: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public phoneNumber: string;
	public tableId: string;
	public date: string;
	public time: string;

	constructor() {
		this.uid = null;
	}

	setUserInfo(
		uid: string,
		firstName: string,
		lastName: string,
		email: string,
		phoneNumber: string,
	) {
		this.uid = uid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}

	setDate(date: string) {
		this.date = date;
	}

	setTime(time: string) {
		this.time = time;
	}

	setTableId(tableId: string) {
		this.tableId = tableId;
	}

	reset() {
		this.time = null;
		this.tableId = undefined;
	}
}
