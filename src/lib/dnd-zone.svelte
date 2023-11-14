<script>
	import { flip } from 'svelte/animate';

	export let items;

	let itemIdBeingDragged = null;

	const handleDragStart = (event) => {
		itemIdBeingDragged = event.target.id;
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const id = itemIdBeingDragged;
		const target = event.target;
		const targetIndex = items.findIndex((item) => item.id === Number(target.id));
		const draggedIndex = items.findIndex((item) => item.id === Number(id));

		if (targetIndex !== draggedIndex) {
			let newItems = [...items];
			let draggedItem = newItems.splice(draggedIndex, 1)[0];
			newItems.splice(targetIndex, 0, draggedItem);
			items = newItems;
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		const target = event.target;
		const targetIndex = items.findIndex((item) => item.id === Number(target.id));
		const draggedIndex = items.findIndex((item) => item.id === Number(itemIdBeingDragged));

		if (targetIndex !== draggedIndex) {
			let newItems = [...items];
			let draggedItem = newItems.splice(draggedIndex, 1)[0];

			if (isTopHalf(event, target)) {
				newItems.splice(targetIndex, 0, draggedItem);
			} else {
				newItems.splice(targetIndex + 1, 0, draggedItem);
			}

			items = newItems;
		}
	};

	const isTopHalf = (event, target) => {
		const rect = target.getBoundingClientRect();
		const y = event.clientY - rect.top;
		const height = rect.bottom - rect.top;
		return y < height / 2;
	};
</script>

<h1>Items</h1>

<ul>
	{#each items as item (item.id)}
		<li
			draggable="true"
			animate:flip={{}}
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
		display: flex;
		flex-direction: column;
		gap: 8px;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	li {
		background-color: #f1f1f1;
		color: black;
		padding: 8px;
		cursor: move;
		transition: background-color 0.3s ease-in-out;
	}

	li:hover {
		background-color: #ddd;
	}
</style>
