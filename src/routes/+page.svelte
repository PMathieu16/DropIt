<script>
	import { drop, drag } from '$lib/dropit/action.js';

	let items = [
		{ id: 1, name: 'item 1', description: 'description 1', col: 'col1' },
		{ id: 2, name: 'item 2', description: 'description 2', col: 'col1' },
		{ id: 3, name: 'item 3', description: 'description 3', col: 'col1' },
		{ id: 4, name: 'item 4', description: 'description 4', col: 'col1' }
	];

	let itemCol1 = items.filter((item) => item.col === 'col1');
	let itemCol2 = items.filter((item) => item.col === 'col2');

	const onDrop = (colName, item) => {
		console.log(item, colName);
		item.col = colName;
		items = [...items];
		itemCol1 = items.filter((item) => item.col === 'col1');
		itemCol2 = items.filter((item) => item.col === 'col2');
	};

	const onDrag = (event) => {};
</script>

<h1>Welcome to your library project</h1>

<ul use:drop={{ colName: 'col1', onDrop }}>
	{#each itemCol1 as item (item.id)}
		<li use:drag={{ item, onDrag }}>
			<h1>{item.name}</h1>
			<p>{item.description}</p>
		</li>
	{/each}
</ul>

<ul use:drop={{ colName: 'col2', onDrop }}>
	{#each itemCol2 as item (item.id)}
		<li use:drag={{ item, onDrag }}>
			<h1>{item.name}</h1>
			<p>{item.description}</p>
		</li>
	{/each}
</ul>

<style>
	ul {
		border: 1px solid red;
		min-height: 100px;
	}
</style>
