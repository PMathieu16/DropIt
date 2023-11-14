<script>
	import DndZone from '$lib/dnd-zone.svelte';

	let data = [
		{ id: 1, name: 'First Item'},
		{ id: 2, name: 'Second Item'},
		{ id: 3, name: 'Third Item'}
	];
</script>

<h1>Welcome to your library project</h1>
<DndZone items={data} />
