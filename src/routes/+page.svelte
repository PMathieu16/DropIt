<script>
	// Import necessary modules
	import { drop, drag } from '$lib/dropit/action.js'; // Replace by svelte-dropit;
	import { flip } from 'svelte/animate';
	import { quintInOut } from 'svelte/easing';

	// Define the items array
	let items = [
		{ id: 1, name: 'item 1', description: 'description 1', category: 'Marketing', col: 'col1' },
		{ id: 2, name: 'item 2', description: 'description 2', category: 'Developpement', col: 'col1' },
		{ id: 3, name: 'item 3', description: 'description 3', category: 'Admin', col: 'col1' },
		{ id: 4, name: 'item 4', description: 'description 4', category: 'Other', col: 'col1' }
	];

	// Define computed properties to filter items based on column
	$: itemCol1 = items.filter((item) => item.col === 'col1');
	$: itemCol2 = items.filter((item) => item.col === 'col2');
	$: itemCol3 = items.filter((item) => item.col === 'col3');
	$: itemCol4 = items.filter((item) => item.col === 'col4');
	$: itemCol5 = items.filter((item) => item.col === 'col5');

	/**
	 * Handles the drop event when an item is dropped into a column.
	 * @param {string} colName - The name of the column where the item is dropped.
	 * @param {object} item - The item object being dropped.
	 */
	const onDrop = (colName, item) => {
		if (colName === item.col) return;

		item.col = colName;

		const itemIndex = items.findIndex((i) => i.id === item.id);
		items.splice(itemIndex, 1);

		items = [...items, item];
	};

	/**
	 * Handles the drag event when an item is being dragged.
	 * @param {Event} event - The drag event object.
	 */
	const onDrag = (event) => {
		console.log('drag');
	};
</script>

<div class="container">
	<ul class="col" use:drop={{ colName: 'col1', onDrop }}>
		<div class="col-title">Upcoming</div>
		{#each itemCol1 as item (item.id)}
			<li
				class="li-item"
				use:drag={{ item, onDrag }}
				animate:flip={{ delay: 0, duration: 400, easing: quintInOut }}
			>
				<div class="li-categories">
					<div class="li-category">{item.category}</div>
				</div>
				<h1>{item.name}</h1>
				<p>{item.description}</p>
			</li>
		{/each}
	</ul>

	<ul class="col" use:drop={{ colName: 'col2', onDrop }}>
		<div class="col-title">To do</div>
		{#each itemCol2 as item (item.id)}
			<li
				class="li-item"
				use:drag={{ item, onDrag }}
				animate:flip={{ delay: 0, duration: 400, easing: quintInOut }}
			>
				<div class="li-categories">
					<div class="li-category">{item.category}</div>
				</div>
				<h1>{item.name}</h1>
				<p>{item.description}</p>
			</li>
		{/each}
	</ul>

	<ul class="col" use:drop={{ colName: 'col3', onDrop }}>
		<div class="col-title">In progress</div>
		{#each itemCol3 as item (item.id)}
			<li
				class="li-item"
				use:drag={{ item, onDrag }}
				animate:flip={{ delay: 0, duration: 400, easing: quintInOut }}
			>
				<div class="li-categories">
					<div class="li-category">{item.category}</div>
				</div>
				<h1>{item.name}</h1>
				<p>{item.description}</p>
			</li>
		{/each}
	</ul>

	<ul class="col" use:drop={{ colName: 'col4', onDrop }}>
		<div class="col-title">Blocked</div>
		{#each itemCol4 as item (item.id)}
			<li
				class="li-item"
				use:drag={{ item, onDrag }}
				animate:flip={{ delay: 0, duration: 400, easing: quintInOut }}
			>
				<div class="li-categories">
					<div class="li-category">{item.category}</div>
				</div>
				<h1>{item.name}</h1>
				<p>{item.description}</p>
			</li>
		{/each}
	</ul>

	<ul class="col" use:drop={{ colName: 'col5', onDrop }}>
		<div class="col-title">Done</div>
		{#each itemCol5 as item (item.id)}
			<li class="li-item" use:drag={{ item, onDrag }}>
				<div class="li-categories">
					<div class="li-category">{item.category}</div>
				</div>
				<h1>{item.name}</h1>
				<p>{item.description}</p>
			</li>
		{/each}
	</ul>

	<!-- Add columns if needed -->
</div>

<style>
	.container {
		display: flex;
		overflow-x: auto;
		gap: 1rem;
		padding: 1rem;
		color: white;
	}

	.col {
		width: 350px;
		min-height: 600px;
		flex-shrink: 0;
		padding: 1rem;
		border-radius: 8px;
		background-color: #1e3a8a;
	}

	.col-title {
		background-color: #324e9b;
		font-weight: bold;
		font-size: 1.2rem;
		padding: 0.8rem 1rem;
		margin-bottom: 1rem;
		border-radius: 10px;
	}

	.li-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		list-style: none;
		background-color: #324e9b;
		border-radius: 10px;
		padding: 1rem;
		margin-bottom: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.li-item:hover {
		background-color: #2e488f;
		cursor: grab;
	}

	.li-item * {
		margin: 0;
	}

	.li-categories {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-bottom: 0.5em;
	}

	.li-categories .li-category {
		background-color: #f87171;
		color: black;
		font-weight: 600;
		padding: 0.4em 0.8em;
		border-radius: 8px;
	}

	.li-item h1 {
		font-size: 1.4rem;
		margin-bottom: 0.3em;
	}

	.li-item p {
		font-size: 1.1rem;
	}
</style>
