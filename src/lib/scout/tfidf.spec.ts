import { describe, it, expect, beforeEach } from 'vitest';
import {
	calculateInverseDocumentFrequency,
	calculateTermFrequency,
	createInvertedIndex,
	pruneStopWords,
	tokenize
} from './tfidf';

describe('tfifd', () => {
	const inputs: string[] = [
		'hello, everyone, ',
		'this article is based on an inverted index, ',
		'which is hashmap-like data structure'
	];

	describe('tokenize', () => {
		let input: string;
		let expected: string[];

		beforeEach(() => {
			input = inputs[0];
			expected = [
				'hel',
				'hell',
				'hello',
				'ell',
				'ello',
				'llo',
				'eve',
				'ever',
				'every',
				'everyo',
				'everyon',
				'everyone',
				'ver',
				'very',
				'veryo',
				'veryon',
				'veryone',
				'ery',
				'eryo',
				'eryon',
				'eryone',
				'ryo',
				'ryon',
				'ryone',
				'yon',
				'yone',
				'one'
			];
		});

		it('should remove all special characters', () => {
			const actual = tokenize(input);
			actual.forEach((item) => {
				expect(item).not.contain(',');
			});
		});

		it('should tokenize (break sentences into words) input string', () => {
			const actual = tokenize(input);
			expect(actual).toEqual(expected);
		});
	});

	describe('pruneStopWords', () => {
		let tokens: string[];
		let expected: string[];
		beforeEach(() => {
			tokens = ['hello', 'everyone', 'this', 'is', 'an', 'article'];
			expected = ['hello', 'everyone', 'article'];
		});

		it('should remove stop words from tokens', () => {
			const actual = pruneStopWords(tokens);
			expect(actual).toEqual(expected);
		});
	});

	describe('createInvertedIndex', () => {
		it('shoulde create inverted index with correct references', () => {
			const expected = {
				hel: [{ position: 1, document: 1 }],
				hell: [{ position: 2, document: 1 }],
				hello: [{ position: 3, document: 1 }],
				ell: [{ position: 4, document: 1 }],
				ello: [{ position: 5, document: 1 }],
				llo: [{ position: 6, document: 1 }],
				eve: [{ position: 7, document: 1 }],
				ever: [{ position: 8, document: 1 }],
				every: [{ position: 9, document: 1 }],
				everyo: [{ position: 10, document: 1 }],
				everyon: [{ position: 11, document: 1 }],
				everyone: [{ position: 12, document: 1 }],
				ver: [
					{ position: 13, document: 1 },
					{ position: 35, document: 2 }
				],
				very: [{ position: 14, document: 1 }],
				veryo: [{ position: 15, document: 1 }],
				veryon: [{ position: 16, document: 1 }],
				veryone: [{ position: 17, document: 1 }],
				ery: [{ position: 18, document: 1 }],
				eryo: [{ position: 19, document: 1 }],
				eryon: [{ position: 20, document: 1 }],
				eryone: [{ position: 21, document: 1 }],
				ryo: [{ position: 22, document: 1 }],
				ryon: [{ position: 23, document: 1 }],
				ryone: [{ position: 24, document: 1 }],
				yon: [{ position: 25, document: 1 }],
				yone: [{ position: 26, document: 1 }],
				one: [{ position: 27, document: 1 }],
				thi: [{ position: 1, document: 2 }],
				his: [{ position: 2, document: 2 }],
				art: [{ position: 3, document: 2 }],
				arti: [{ position: 4, document: 2 }],
				artic: [{ position: 5, document: 2 }],
				articl: [{ position: 6, document: 2 }],
				article: [{ position: 7, document: 2 }],
				rti: [{ position: 8, document: 2 }],
				rtic: [{ position: 9, document: 2 }],
				rticl: [{ position: 10, document: 2 }],
				rticle: [{ position: 11, document: 2 }],
				tic: [{ position: 12, document: 2 }],
				ticl: [{ position: 13, document: 2 }],
				ticle: [{ position: 14, document: 2 }],
				icl: [{ position: 15, document: 2 }],
				icle: [{ position: 16, document: 2 }],
				cle: [{ position: 17, document: 2 }],
				bas: [{ position: 18, document: 2 }],
				base: [{ position: 19, document: 2 }],
				based: [{ position: 20, document: 2 }],
				ase: [{ position: 21, document: 2 }],
				ased: [{ position: 22, document: 2 }],
				sed: [{ position: 23, document: 2 }],
				inv: [{ position: 24, document: 2 }],
				inve: [{ position: 25, document: 2 }],
				inver: [{ position: 26, document: 2 }],
				invert: [{ position: 27, document: 2 }],
				inverte: [{ position: 28, document: 2 }],
				inverted: [{ position: 29, document: 2 }],
				nve: [{ position: 30, document: 2 }],
				nver: [{ position: 31, document: 2 }],
				nvert: [{ position: 32, document: 2 }],
				nverte: [{ position: 33, document: 2 }],
				nverted: [{ position: 34, document: 2 }],
				vert: [{ position: 36, document: 2 }],
				verte: [{ position: 37, document: 2 }],
				verted: [{ position: 38, document: 2 }],
				ert: [{ position: 39, document: 2 }],
				erte: [{ position: 40, document: 2 }],
				erted: [{ position: 41, document: 2 }],
				rte: [{ position: 42, document: 2 }],
				rted: [{ position: 43, document: 2 }],
				ted: [{ position: 44, document: 2 }],
				ind: [{ position: 45, document: 2 }],
				inde: [{ position: 46, document: 2 }],
				index: [{ position: 47, document: 2 }],
				nde: [{ position: 48, document: 2 }],
				ndex: [{ position: 49, document: 2 }],
				dex: [{ position: 50, document: 2 }],
				whi: [{ position: 1, document: 3 }],
				whic: [{ position: 2, document: 3 }],
				which: [{ position: 3, document: 3 }],
				hic: [{ position: 4, document: 3 }],
				hich: [{ position: 5, document: 3 }],
				ich: [{ position: 6, document: 3 }],
				has: [{ position: 7, document: 3 }],
				hash: [{ position: 8, document: 3 }],
				hashm: [{ position: 9, document: 3 }],
				hashma: [{ position: 10, document: 3 }],
				hashmap: [{ position: 11, document: 3 }],
				hashmapl: [{ position: 12, document: 3 }],
				hashmapli: [{ position: 13, document: 3 }],
				hashmaplik: [{ position: 14, document: 3 }],
				hashmaplike: [{ position: 15, document: 3 }],
				ash: [{ position: 16, document: 3 }],
				ashm: [{ position: 17, document: 3 }],
				ashma: [{ position: 18, document: 3 }],
				ashmap: [{ position: 19, document: 3 }],
				ashmapl: [{ position: 20, document: 3 }],
				ashmapli: [{ position: 21, document: 3 }],
				ashmaplik: [{ position: 22, document: 3 }],
				ashmaplike: [{ position: 23, document: 3 }],
				shm: [{ position: 24, document: 3 }],
				shma: [{ position: 25, document: 3 }],
				shmap: [{ position: 26, document: 3 }],
				shmapl: [{ position: 27, document: 3 }],
				shmapli: [{ position: 28, document: 3 }],
				shmaplik: [{ position: 29, document: 3 }],
				shmaplike: [{ position: 30, document: 3 }],
				hma: [{ position: 31, document: 3 }],
				hmap: [{ position: 32, document: 3 }],
				hmapl: [{ position: 33, document: 3 }],
				hmapli: [{ position: 34, document: 3 }],
				hmaplik: [{ position: 35, document: 3 }],
				hmaplike: [{ position: 36, document: 3 }],
				map: [{ position: 37, document: 3 }],
				mapl: [{ position: 38, document: 3 }],
				mapli: [{ position: 39, document: 3 }],
				maplik: [{ position: 40, document: 3 }],
				maplike: [{ position: 41, document: 3 }],
				apl: [{ position: 42, document: 3 }],
				apli: [{ position: 43, document: 3 }],
				aplik: [{ position: 44, document: 3 }],
				aplike: [{ position: 45, document: 3 }],
				pli: [{ position: 46, document: 3 }],
				plik: [{ position: 47, document: 3 }],
				plike: [{ position: 48, document: 3 }],
				lik: [{ position: 49, document: 3 }],
				like: [{ position: 50, document: 3 }],
				ike: [{ position: 51, document: 3 }],
				dat: [{ position: 52, document: 3 }],
				data: [{ position: 53, document: 3 }],
				ata: [{ position: 54, document: 3 }],
				str: [{ position: 55, document: 3 }],
				stru: [{ position: 56, document: 3 }],
				struc: [{ position: 57, document: 3 }],
				struct: [{ position: 58, document: 3 }],
				structu: [{ position: 59, document: 3 }],
				structur: [{ position: 60, document: 3 }],
				structure: [{ position: 61, document: 3 }],
				tru: [{ position: 62, document: 3 }],
				truc: [{ position: 63, document: 3 }],
				truct: [{ position: 64, document: 3 }],
				tructu: [{ position: 65, document: 3 }],
				tructur: [{ position: 66, document: 3 }],
				tructure: [{ position: 67, document: 3 }],
				ruc: [{ position: 68, document: 3 }],
				ruct: [{ position: 69, document: 3 }],
				ructu: [{ position: 70, document: 3 }],
				ructur: [{ position: 71, document: 3 }],
				ructure: [{ position: 72, document: 3 }],
				uct: [{ position: 73, document: 3 }],
				uctu: [{ position: 74, document: 3 }],
				uctur: [{ position: 75, document: 3 }],
				ucture: [{ position: 76, document: 3 }],
				ctu: [{ position: 77, document: 3 }],
				ctur: [{ position: 78, document: 3 }],
				cture: [{ position: 79, document: 3 }],
				tur: [{ position: 80, document: 3 }],
				ture: [{ position: 81, document: 3 }],
				ure: [{ position: 82, document: 3 }]
			};
			const actual = createInvertedIndex(inputs);

			expect(actual).toEqual(expected);
		});
	});

	describe('calculateTermFrequency', () => {
		it('should calculate term frequency for a given term', () => {
			const invertedIndex = createInvertedIndex([
				'The cat sat on the mat.',
				'The dog played in the park.',
				'Cats and dogs are great pets.'
			]);
			const term = 'cat';
			const expected = {
				1: 1,
				3: 1
			};
			const actual = calculateTermFrequency(term, invertedIndex);
			expect(actual).toEqual(expected);
		});
	});

	describe('calculateInverseDocumentFrequency', () => {
		it('should calculate inverse document frequency for a given term', async () => {
			const invertedIndex = createInvertedIndex([
				'The cat sat on the mat.',
				'The dog played in the park.',
				'Cats and dogs are great pets.'
			]);
			const term = 'cat';
			const expected = Math.log(3 / 2);
			const actual = await calculateInverseDocumentFrequency(term, invertedIndex);
			expect(actual).toBeCloseTo(expected, 5);
		});
	});
});
