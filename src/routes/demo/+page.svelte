<script lang="ts">
	import Search from '$lib/components/search/main.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto">
	{#await data.movies}
		<p>Loading...</p>
	{:then movies}
		<div>Data Loaded {movies.length}</div>
		<Search {movies} />
	{:catch error}
		<p class="text-red-500">Error loading data: {error.message}</p>
	{/await}
</div>
