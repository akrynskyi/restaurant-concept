// export interface Collection {
// 	[key: string]: HTMLElement
// }

export interface Credential {
	firstname?: string
	lastname?: string
	email: string
	password: string
}

export interface Modal {
	overlay?: HTMLElement
	modal: HTMLElement
	form: HTMLFormElement
}

export interface Message {
	message: string
}

export interface Image {
	regular: string
}

export interface Post {
	alt_description?: string
	urls?: Object
	color: string
	description: string
	photos: Image
}

export interface Product {
	id: string
	likes: number
	image: string
	title: string
	price: number
	portion: number
	description: string
	type: string
	category: string
}

export interface Option {
	value?: number
	key?: string
}

export interface Subject {
	subscribe(o: Observer): void
	unsubscribe(o: Observer): void
	notify(): void
}

export interface Observer {
	behavior: any
	update(p: any): void
}

export interface PublishSubscribe {
	subscribe(eventName: string, handler: Function): void
	unsubscribe(eventName: string, handler?: Function): void
	publish(eventName: string, data: any): void
}

export interface CustomEvent {
	eventName: string
	handler: Function
}
