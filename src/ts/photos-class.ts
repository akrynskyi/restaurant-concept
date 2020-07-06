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

	updateWord(word: string) {
		this.keyWord = word;
		this.url = `${this.apiUrl}/search/photos/${this.accessKey}&page=${this.pageNum}&per_page=${this.perPage}&query=${this.keyWord}`;
	}

	updateVal(num: number) {
		this.perPage = num;
		this.url = `${this.apiUrl}/search/photos/${this.accessKey}&page=${this.pageNum}&per_page=${this.perPage}&query=${this.keyWord}`;
	}

	updatePage(num: number) {
		this.pageNum = num;
		this.url = `${this.apiUrl}/search/photos/${this.accessKey}&page=${this.pageNum}&per_page=${this.perPage}&query=${this.keyWord}`;
	}

	async request() {
		try {
			const response = await fetch(this.url);
			const data = await response.json();
			return data.results.map((item: Post) => ({ description: item.alt_description, color: item.color, photos: item.urls }));
		} catch (error) {
			return error;
		}
	}
}
