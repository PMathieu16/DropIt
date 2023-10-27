<script>
	export let items;

	function handleDragStart(event) {
		event.dataTransfer.setData('text/plain', event.target.id);
	}

	function handleDrop(event) {
		event.preventDefault();
		const id = event.dataTransfer.getData('text/plain');
		const target = event.target;
		const targetIndex = items.findIndex((item) => item.id === Number(target.id));
		const draggedIndex = items.findIndex((item) => item.id === Number(id));
		const temp = items[targetIndex];
		items[targetIndex] = items[draggedIndex];
		items[draggedIndex] = temp;
	}

	function handleDragOver(event) {
		event.preventDefault();
		const target = event.target;
		const targetIndex = items.findIndex((item) => item.id === Number(target.id));
		for (let i = 0; i < items.length; i++) {
			if (i === targetIndex) {
				items[i].hovered = true;
			} else {
				items[i].hovered = false;
			}
		}
	}
</script>

<h1>Items</h1>
<ul>
	{#each items as item}
		<li
			draggable="true"
			on:dragstart={handleDragStart}
			on:drop={handleDrop}
			on:dragover={handleDragOver}
			id={item.id}
		>
			{item.name}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	li {
		background-color: #f1f1f1;
		color: black;
		padding: 8px;
		margin-bottom: 8px;
		cursor: move;
		transition: background-color 0.3s ease-in-out;
	}

	li:hover {
		background-color: #ddd;
	}
</style>
