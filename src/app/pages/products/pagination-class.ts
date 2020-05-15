export class Pagination {
	private container: HTMLElement;
	private html: string = '';
	public totalPages: number;
	public currentPage: number;
	private step: number;

	constructor(
		options: {
			totalPages: number,
			currentPage: number,
			step: number,
		},
	) {
		this.totalPages = options.totalPages;
		this.currentPage = options.currentPage;
		this.step = options.step;
	}

	addPages(start: number, end: number) {
		for (let i = start; i < end; i += 1) {
			this.html += `<button class="btn btn--ml btn--pag" value="${i}">${i}</button>`;
		}
	}

	firstPage() {
		this.html += `
		<button class="btn btn--ml btn--pag" value="1">1</button>
		<button class="btn btn--ml btn--pag">...</button>`;
	}

	lastPage() {
		this.html += `
		<button class="btn btn--ml btn--pag">...</button>
		<button class="btn btn--ml btn--pag" value="${this.totalPages}">
			${this.totalPages}
		</button>`;
	}

	// Handlers

	clickHandle(btn: Element) {
		this.currentPage = +btn.innerHTML;
		this.start();
	}

	prevPage() {
		this.currentPage -= 1;
		if (this.currentPage < 1) {
			this.currentPage = 1;
		}
		this.start();
	}

	nextPage() {
		this.currentPage += 1;
		if (this.currentPage > this.totalPages) {
			this.currentPage = this.totalPages;
		}
		this.start();
	}

	bindPage() {
		const buttons = this.container.querySelectorAll('.btn--pag');
		buttons.forEach((btn) => {
			if (+btn.innerHTML === this.currentPage) {
				btn.classList.add('active');
			}
			btn.addEventListener('click', () => {
				this.clickHandle(btn);
			});
		});
	}

	// Create pagination

	start() {
		if (this.totalPages < this.step * 2 + 6) {
			this.addPages(1, this.totalPages + 1);
		} else if (this.currentPage < this.step * 2 + 1) {
			this.addPages(1, this.step * 2 + 4);
			this.lastPage();
		} else if (this.currentPage > this.totalPages - this.step * 2) {
			this.firstPage();
			this.addPages(this.totalPages - this.step * 2 - 2, this.totalPages + 1);
		} else {
			this.firstPage();
			this.addPages(this.currentPage - this.step, this.currentPage + this.step + 1);
			this.lastPage();
		}
		this.finish();
	}

	finish() {
		this.container.innerHTML = this.html;
		this.html = '';
		this.bindPage();
	}

	create(container: HTMLElement) {
		const pagContainer = container;
		const template = [
			`<button class="btn btn--secondary">
				<i class="ico-pr fas fa-chevron-left"></i>
				<span data-page="prev">Prev</span>
			</button>`,
			'<div></div>',
			`<button class="btn btn--secondary btn--ml">
				<span data-page="next">Next</span>
				<i class="ico-pl fas fa-chevron-right"></i>
			</button>`,
		];

		pagContainer.innerHTML = template.join('');
		this.container = container.querySelector('div');
	}

	init(container: HTMLElement) {
		this.create(container);
		this.start();
	}

	remove(container: HTMLElement) {
		if (container.children.length) {
			container.childNodes.forEach((node) => node.remove());
			container.querySelector('div').remove();
		}
	}
}
