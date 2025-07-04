export type Reference = {
	document: number;
	position: number;
};

export type InvertedIndex = Record<string, Reference[]>;

const stopWords = new Set([
	'a',
	'an',
	'the',
	'and',
	'or',
	'but',
	'is',
	'are',
	'was',
	'were',
	'this',
	'that',
	'it',
	'its',
	'in',
	'on',
	'at',
	'to',
	'for',
	'with',
	'as',
	'by',
	'of',
	'from'
]);

let invertedIndex: InvertedIndex = {};
export function pushIntoIndex<T>(item: T, keys: (keyof T)[]): void {
	if (!invertedIndex) {
		invertedIndex = {};
	}

	keys.forEach((key) => {
		const value = item[key];
		if (typeof value === 'string') {
			const tokens = tokenize(value);
			tokens.forEach((token) => {
				const reference: Reference = {
					document: item['id'] as number, // Assuming 'id' is the unique identifier
					position: 1 // Position can be adjusted based on your logic
				};
				if (invertedIndex[token]) {
					invertedIndex[token].push(reference);
				} else {
					invertedIndex[token] = [reference];
				}
			});
		}
	});
}

export function calculateTFIDF(
	term: string,
	invertedIndex: InvertedIndex,
	totalDocuments: number
): number {
	let tfidf = 0;
	const termFrequency = calculateTermFrequency(term, invertedIndex);
	const inverseDocumentFrequency = calculateInverseDocumentFrequency(term, invertedIndex);

	if (typeof termFrequency === 'object' && termFrequency !== null) {
		for (const docId in termFrequency) {
			tfidf += termFrequency[Number(docId)] * inverseDocumentFrequency;
		}
	}

	return tfidf / totalDocuments;
}

export function calculateTermFrequency(term: string, invertedIndex: InvertedIndex) {
	const references = invertedIndex[term];
	if (!references) {
		return 0;
	}

	const termFrequency: Record<number, number> = {};
	references.forEach((ref) => {
		if (termFrequency[ref.document]) {
			termFrequency[ref.document]++;
		} else {
			termFrequency[ref.document] = 1;
		}
	});

	return termFrequency;
}

export function calculateInverseDocumentFrequency(
	term: string,
	invertedIndex: InvertedIndex
): number {
	const references = invertedIndex[term];
	if (!references) return 0;

	const documentSet = new Set<number>();
	for (const refs of Object.values(invertedIndex)) {
		for (const ref of refs) {
			documentSet.add(ref.document);
		}
	}
	const totalDocuments = documentSet.size;

	const documentFrequency = new Set(references.map((ref) => ref.document)).size;
	if (documentFrequency === 0) return 0;

	return Math.log(totalDocuments / documentFrequency);
}

export function createInvertedIndex(inputs: string[]): InvertedIndex {
	const invertedIndex: InvertedIndex = {};
	let documentCounter = 1;

	inputs.forEach((input) => {
		let positionCounter = 1;
		const tokens = tokenize(input);

		tokens.forEach((token) => {
			const reference = {
				position: positionCounter++,
				document: documentCounter
			};
			if (invertedIndex[token]) {
				invertedIndex[token].push(reference);
			} else {
				invertedIndex[token] = [reference];
			}
		});
		documentCounter++;
	});

	return invertedIndex;
}

export function tokenize(input: string): string[] {
	const words = input
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, '')
		.split(/\s+/)
		.filter((token) => token.length > 0 && !stopWords.has(token));

	return words
		.map((word) => {
			const substrings: string[] = [];
			for (let i = 0; i < word.length; i++) {
				for (let j = i + 3; j <= word.length; j++) {
					substrings.push(word.substring(i, j));
				}
			}
			return substrings;
		})
		.flat();
}
