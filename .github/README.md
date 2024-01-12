<div align="center">

<img src="https://i.ibb.co/3040tZK/logo.png" alt="" height="128px" />

# DropIt

Drag and drop librairie for svelte application

[![Version npm](https://img.shields.io/npm/v/svelte-dropit)](https://www.npmjs.com/package/svelte-dropit)

</div>

<img src="https://i.ibb.co/bLkK770/dropit.png">

---

## About

DropIt is a study project with the potential to become a serious project.
We are keen to receive feedback on it or ideas for new features.

> [!NOTE]  
> The library is currently under development and functionality is limited.

## Usage

### Installation

To use DropIt in your Svelte application, you need to install it first. You can do this via npm:

```bash
npm install svelte-dropit
```

### Dragging Items

DropIt provides a simple API to enable dragging behavior for DOM nodes. Import the drag function and use it as follows:

```js
import { drag } from 'svelte-dropit';

// Example usage in Svelte component
<script>
    import { drag } from 'svelte-dropit';

    let items = [...]; // Your array of items

    const onDrag = () => {
        // Callback function when dragging occurs
        // You can add your custom logic here
    };
</script>

<ul>
    {#each items as item (item.id)}
        <li use:drag={{ item, onDrag }}>
            <!-- Your item content -->
            <h1>{item.name}</h1>
            <p>{item.description}</p>
        </li>
    {/each}
</ul>
```

### Dropping Items

To handle the drop action, use the drop function:

```js
import { drop } from 'svelte-dropit';

// Example usage in Svelte component
<script>
    import { drop } from 'svelte-dropit';

    const onDrop = (colName, item) => {
        // Callback function when an item is dropped
        // You can update the item's column or perform any other action
        console.log(item, colName);
    };
</script>

<ul use:drop={{ colName: 'yourColName', onDrop }}>
    <!-- Droppable area content -->
</ul>
```

Make sure to replace 'yourColName' with the appropriate column name.

The drop calls the method you pass as a parameter with the following parameters:
- the name of the column
- the drop element

### Demo

Check out our [doc with the demo](https://drop-it-doc.vercel.app/)

## License

[MIT](./LICENSE) © Mathieu Parinet and Jacky Truong
