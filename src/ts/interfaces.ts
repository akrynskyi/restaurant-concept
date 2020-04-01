export interface Collection {
	[key: string]: HTMLElement
}

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
	description: string
	photos: Image
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
