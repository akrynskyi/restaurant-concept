import { Observer } from '../../../ts/interfaces';

export class NotificationObserver implements Observer {
	behavior: Function;

	constructor(behavior: any) {
		this.behavior = behavior;
	}

	public update(data: string) {
		this.behavior(data);
	}
}
