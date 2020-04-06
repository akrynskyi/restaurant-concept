import { PublishSubscribe, CustomEvent } from './interfaces';

class PubSub implements PublishSubscribe {
	private events: CustomEvent[] = [];

	public subscribe(eventName: string, handler: Function): void {
		this.events.push({ eventName, handler });
	}

	public unsubscribe(eventName: string): void {
		this.events = this.events.filter((event) => event.eventName !== eventName);
	}

	public publish(eventName: string, data: any): void {
		this.events.forEach((event) => {
			if (event.eventName === eventName) {
				event.handler(data);
			}
		});
	}
}

export const pubsub = new PubSub();
