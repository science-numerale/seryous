// DBs

import { keys } from "$lib/utils";

export const alphabetsDB = {
	"normal": {
		"normal": "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ?!',.",
		"srevnela": "ꓯꓭↃꓷƎℲ⅁ɥıᒋꓘ⅂WuOꓒÒꓤSꓕꓵ𐌡MX⅄Z ɐqɔpǝɟƃɥıɾʞןɯuodbɹsʇnʌʍxʎz 0Ɩ↊↋Һꞔ9∠86",
	},

	"serif": {
		"normal": "",
		"gras": "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙 𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳 𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
		"italique": "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍 𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
		"gras-italique": "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁 𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛 𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
	},

	"sans-serif": {
		"normal": "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹 𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓 𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫",
		"gras": "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭 𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇 𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
		"italique": "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡 𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
		"gras-italique": "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕 𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯 𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
	},

	"script": {
		"normal": "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵 𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
		"gras": "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩 𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃 𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
	},

	"fraktur": {
		"normal": "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ 𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
		"gras": "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅 𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟 𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
	},

	"capitales": {
		"normal": "ABCDEFGHIJKLMNOPQRSTUVWXYZ ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ ﹖﹗'﹐﹒",
	},
	"monospace": {
		"normal": "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉 𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣 𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿 ？！＇，．",
		"large": "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ ０１２３４５６７８９ ？！＇，．",
	},

	"double": {
		"normal": "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ 𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫 𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡 ❔❕',.",
	},
	"cercle": {
		"normal": "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ ⓪①②③④⑤⑥⑦⑧⑨",
	},
}
let normal = alphabetsDB["normal"]["normal"]

export let modifiersDB = {
	"barré": {
		"court": "b̵a̵r̵r̵é̵ ̵c̵o̵u̵r̵t̵",
		"long": "b̶a̶r̶r̶é̶ ̶l̶o̶n̶g̶",
		"tilde": "b̴a̴r̴r̴é̴ ̴t̴i̴l̴d̴e̴",
		"oblique-court": "d̷o̷u̷b̷l̷e̷ ̷m̷a̷c̷r̷o̷n̷",
		"oblique-long": "d̸o̸u̸b̸l̸e̸ ̸m̸a̸c̸r̸o̸n̸",
		"interdit": "i⃠n⃠t⃠e⃠r⃠d⃠i⃠t⃠",
	},
	"souligné": {
		"ligne-basse": "l̲i̲g̲n̲e̲ ̲b̲a̲s̲s̲e̲",
		"double-macron": "d͟o͟u͟b͟l͟e͟ ͟m͟a͟c͟r͟o͟n͟",
		"double": "s̳o̳u̳l̳i̳g̳n̳é̳ ̳d̳o̳u̳b̳l̳e̳"
	}
}

// Types
//
type KeysOfUnion<T> = T extends T ? keyof T : never;

export type Font = keyof typeof alphabetsDB
export type Variant<F extends Font = Font> = KeysOfUnion<typeof alphabetsDB[F]>
export interface AlphabetPath<F extends Font = Font> {
	font: F,
	variant: Variant<F>,
}

export type ModifierFont = keyof typeof alphabetsDB
export type ModifierVariant<F extends Font = Font> = KeysOfUnion<typeof alphabetsDB[F]>
export interface ModifierPath {
	font: Font,
	variant: Variant<AlphabetPath["font"]>,
}

export interface WritingParams {
	alphabet: AlphabetPath
	modifiers: string[]
	verlan: boolean
}

// Functions

function parseModifier(mod: string) {
	if (mod.startsWith("U+")) {
		let int = parseInt(mod.substring(2), 16)
		if (!isNaN(int)) return String.fromCharCode(int)
		return ""
	}
	return [...new Set(mod.match(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/g) || [])]
}

export default function getVariant(text: string, params: WritingParams) {
	let font = params.alphabet.font
	let variant = params.alphabet.variant
	let modifiers = params.modifiers
	let verlan = params.verlan

	let list = text.split("")
	let sufix = modifiers.map(e => parseModifier(e)).join("")
	if (verlan) list = list.reverse()

	let alphabet = Array.from(normal)

	let variants = alphabetsDB[font]
	if (keys(variants).includes(variant)) {
		alphabet = Array.from(variants[variant as keyof typeof variants])
	}

	list = list.map((char) => {
		let id = normal.indexOf(char);
		let cr = alphabet[id]
		return cr || char
	})


	list = list.map(v => v + sufix)

	return list.join("")
}

export function getDefaultParams(font?: Font): WritingParams {
	return font ? {
		alphabet: {
			font: font,
			variant: "normal",
		},
		modifiers: [],
		verlan: false,
	} : {
		alphabet: {
			font: "normal",
			variant: "normal",
		},
		modifiers: [],
		verlan: false,
	}
}
