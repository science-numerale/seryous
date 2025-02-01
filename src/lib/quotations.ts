import { lorem } from "../stories/quotations/lorem"

export interface Date { // celon le calendrier grégorien
	year: number
	month?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
	day?: number // TODO : restreindre ça
	exact: boolean
}

export interface Source {
	title?: string
	author?: string
	date?: Date
}

export interface QuotationInfos {
	quotation: string
	translation: string
	source?: Source
}

export interface QuotationArticle {
	infos: QuotationInfos,
	explanation: string,
}

export async function getArticle(id: string): Promise<QuotationArticle> {
	await new Promise((r)=>setTimeout(r, 1000))
	if (id === "lorem") {
		return lorem
	}

	throw "Not found"
}
