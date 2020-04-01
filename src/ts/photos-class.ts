import { Post } from './interfaces';

export class Photos {
	apiUrl: string;
	accessKey: string;
	keyWord: string;
	pageNum: number;
	perPage: number;
	url: string;

	constructor(
		options: {
			apiUrl: string,
			accessKey: string,
			keyWord: string,
			pageNum?: number,
			perPage?: number,
		},
	) {
		this.apiUrl = options.apiUrl;
		this.accessKey = options.accessKey;
		this.keyWord = options.keyWord;
		this.pageNum = options.pageNum;
		this.perPage = options.perPage;
		this.url = `${this.apiUrl}/search/photos/${this.accessKey}&page=${this.pageNum}&per_page=${this.perPage}&query=${this.keyWord}`;
	}

	async request() {
		try {
			const response = await fetch(this.url);
			const data = await response.json();
			const items = data.results.map((item: Post) => ({ description: item.alt_description, photos: item.urls }));
			return items;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
}
