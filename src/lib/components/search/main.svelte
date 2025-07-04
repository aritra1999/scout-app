<script lang="ts">
	import SearchInput from '$lib/components/search/input.svelte';
	import { onMount } from 'svelte';

	let { movies } = $props();

	onMount(() => {});
</script>

<SearchInput />
