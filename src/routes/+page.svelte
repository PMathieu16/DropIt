<script>
	import DndZone from '$lib/dnd-zone.svelte';

	let data = [
		{ id: 1, name: 'First Item', hovered: false },
		{ id: 2, name: 'Second Item', hovered: false },
		{ id: 3, name: 'Third Item', hovered: false }
	];
</script>

<h1>Welcome to your library project</h1>
<DndZone items={data} />
