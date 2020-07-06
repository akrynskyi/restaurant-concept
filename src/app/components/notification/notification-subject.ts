import { Subject, Observer, Message } from '../../../ts/interfaces';

class Notification implements Subject {
	private observers: Observer[] = [];
	private message: string;

	public subscribe(obs: Observer) {
		this.observers.push(obs);
	}

	public unsubscribe(obs: Observer) {
		const index = this.observers.indexOf(obs);
		this.observers.splice(index, 1);
	}

	public notify() {
		this.observers.forEach((observer) => observer.update(this.message));
	}

	public getMessage(obj: Message) {
		const { message } = obj;
		this.message = message;
		this.notify();
	}
}

export const notif = new Notification();
