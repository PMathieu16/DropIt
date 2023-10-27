<script>
	import { draggable, dropzone } from './utils/dnd.js';

	let data = {
		columns: [
			{
				id: 1,
				label: '📫 Todo'
			},
			{
				id: 2,
				label: '✅ Done'
			}
		],
		cards: [
			{
				column: 1,
				id: 'a',
				title: 'Wash Dishes'
			},
			{
				column: 2,
				id: 'b',
				title: 'Code DND Example'
			}
		]
	};
</script>

<ul>
	{#each data.columns as column}
		{@const cards = data.cards.filter((c) => c.column === column.id)}
		<li
			class="column"
			use:dropzone={{
				on_dropzone(card_id) {
					const card = data.cards.find((c) => c.id === card_id);
					card.column = column.id;
					data = data;
				}
			}}
		>
			<h2>{column.label}</h2>
			{#if cards.length > 0}
				<ul class="cards">
					{#each cards as card}
						<li use:draggable={card.id}>
							{card.title}
						</li>
					{/each}
				</ul>
			{:else}
				<p>No Cards...</p>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
	}

	li {
		padding: 1rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: var(--sk-back-5);
	}

	.column {
		min-width: 25ch;
	}

	h2 {
		margin-block-start: 0;
		margin-block-end: 0.5rem;
	}

	.cards {
		flex-direction: column;
	}

	.column:global(.droppable) {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	.column:global(.droppable) * {
		pointer-events: none;
	}
</style>
