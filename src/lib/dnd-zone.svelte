<script>
	import { flip } from 'svelte/animate';

	export let items;
	let draggedItemId;
	let draggedItem;
	let x, y;
	let overItemId;
	let overItem;
	let isTopHalf;

	const handleMouseUp = (e) => {
		e.preventDefault();
		if (draggedItemId) {
			draggedItem.style.transition = 'transform 0.3s ease-in-out';
			draggedItem.style.transform = `translate(0px, 0px)`;
			draggedItem.style.zIndex = 0;
			draggedItem.style.pointerEvents = 'auto';
			draggedItemId = null;
			setTimeout(() => {
				draggedItem.style.transition = '';
			}, 300);
		}
	};

	const handleMouseMove = ({ clientX, clientY }) => {
		if (draggedItemId) {
			draggedItem.style.transform = `translate(${clientX - x}px, ${clientY - y}px)`;
			draggedItem.style.zIndex = 1000;
			draggedItem.style.pointerEvents = 'none';

			if (overItemId) {
				isTopHalf = clientY - overItem.top < overItem.height / 2;

				let newItems = [...items];
				let draggedItemIndex = newItems.findIndex((item) => item.id === draggedItemId);
				let overItemIndex = newItems.findIndex((item) => item.id === overItemId);

				let draggedItem = newItems.splice(draggedItemIndex, 1)[0];

				if (isTopHalf) {
					newItems.splice(overItemIndex, 0, draggedItem);
				} else {
					newItems.splice(overItemIndex + 1, 0, draggedItem);
				}

				items = newItems;
				draggedItem = document.getElementById(draggedItemId);
				x = draggedItem.clientX;
				y = draggedItem.clientY;
			}
		}
	};

	const handleMouseDown = (e) => {
		e.preventDefault();
		draggedItemId = e.target.id;
		draggedItem = document.getElementById(draggedItemId);
		x = e.clientX;
		y = e.clientY;

		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mousemove', handleMouseMove);
	};

	const handleMouseEnter = (e) => {
		e.preventDefault();
		let id = e.target.id;
		if (draggedItemId && id !== draggedItemId) {
			overItemId = e.target.id;
			overItem = e.target;
		}
	};

	const handleMouseLeave = (e) => {
		e.preventDefault();
		let id = e.target.id;
		if (draggedItemId && id !== draggedItemId) {
			overItemId = null;
			overItem = null;
		}
	};
</script>

<h1>Items</h1>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="list" on:mouseup={handleMouseUp} on:mousemove={handleMouseMove}>
	{#each items as item (item.id)}
		<div
			class="item"
			animate:flip={{}}
			id={item.id}
			on:mousedown={handleMouseDown}
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		>
			{item.name}
		</div>
	{/each}
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		list-style-type: none;
		margin: 0;
		padding: 0;
		max-width: 500px;
		border: red 1px solid;
	}

	.item {
		background-color: #f1f1f1;
		color: black;
		padding: 8px;
		cursor: move;
	}

	.item:hover {
		background-color: #ddd;
	}
</style>
