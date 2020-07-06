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

// create custom event
// const likeEvent = new CustomEvent('like', {
// 	detail: {
// 		liked: true,
// 	},
// });

// DOM_ELEMENTS.productsContainer.addEventListener('like', (e) => {
// 	console.log(e);
// 	pubsub.publish('like', e);
// });
// pubsub.publish('consoleLog', 'Description open');
// DOM_ELEMENTS.productsContainer.dispatchEvent(likeEvent);

// pubsub.subscribe('consoleLog', (data: string) => {
// 	console.log(data);
// });

// // pubsub.unsubscribe('consoleLog');

// pubsub.subscribe('like', (event: Event) => {
// 	console.log(event.detail.liked);
// });
