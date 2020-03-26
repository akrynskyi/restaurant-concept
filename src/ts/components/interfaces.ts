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
	overlay: HTMLElement
	modal: HTMLElement
	form: HTMLElement
}
