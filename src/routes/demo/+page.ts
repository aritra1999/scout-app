export const load = async ({ fetch }) => {
	try {
		const res = await fetch(
			'https://raw.githubusercontent.com/aritra1999/scout-app/refs/heads/master/data/movies.json'
		);
		const movies = await res.json();
		return { movies };
	} catch (error) {
		console.error('Error fetching movies:', error);
		return { movies: [] };
	}
};
