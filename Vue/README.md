# Vue 3 DevExtreme DropDownBox Example

This project demonstrates how to implement a DevExtreme DropDownBox with embedded List using Vue 3, TypeScript, and proper DevExtreme type definitions.

## Setup

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run the linter:
```bash
npm run lint
```

## DevExtreme Implementation

### Key Features

- **DropDownBox with embedded List**: Uses DxDropDownBox with DxList inside the content template
- **Proper TypeScript Types**: Uses MCP-sourced DevExtreme types for event handlers
- **Custom Value Support**: Supports custom values and selection synchronization
- **Item Interactions**: Handles selection changes and item deletion events

### Core Implementation

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { DxDropDownBox } from 'devextreme-vue/drop-down-box'
import { DxList } from 'devextreme-vue/list'
import type { DxDropDownBoxTypes } from 'devextreme-vue/drop-down-box'
import type { DxListTypes } from 'devextreme-vue/list'

// Event handlers with proper MCP-sourced types
const dropDownBoxValueChanged = (e: DxDropDownBoxTypes.ValueChangedEvent) => {
  // Handle value change
}

const listSelectionChanged = (e: DxListTypes.SelectionChangedEvent) => {
  // Handle selection change
}

const listItemDeleting = (e: DxListTypes.ItemDeletingEvent) => {
  // Handle item deletion
}
</script>

<template>
  <DxDropDownBox
    ref="dropDownBoxRef"
    :value="dropDownBoxValue"
    @value-changed="dropDownBoxValueChanged"
  >
    <template #content>
      <DxList
        ref="listRef"
        @selection-changed="listSelectionChanged"
        @item-deleting="listItemDeleting"
      />
    </template>
  </DxDropDownBox>
</template>
```

### DevExtreme Types via MCP

This project uses proper DevExtreme TypeScript types discovered through MCP (Model Context Protocol):

- **DxListTypes.SelectionChangedEvent**: For list selection events
- **DxListTypes.ItemDeletingEvent**: For item deletion events  
- **DxDropDownBoxTypes.ValueChangedEvent**: For dropdown value changes

To find DevExtreme types for Vue components:

1. Use MCP to search DevExtreme Vue documentation
2. Import types from `devextreme-vue/[component-name]`
3. Use the proper event interfaces (e.g., `DxListTypes.SelectionChangedEvent`)

### Component Method Access

Unlike React (useRef) or Angular (@ViewChild), Vue component methods are accessed through template refs:

```typescript
const dropDownBoxRef = ref<any>(null)

// Access component methods
if (dropDownBoxRef.value) {
  dropDownBoxRef.value.close()
}
```

### CSS Styling

DevExtreme CSS is imported globally in App.vue:

```typescript
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
```

## Architecture

- **Components**: DropDownContent.vue contains the main DropDownBox implementation
- **Types**: Shared TypeScript interfaces in src/types.ts
- **Styling**: Scoped CSS with DevExtreme theme integration
- **State Management**: Vue 3 Composition API with reactive refs

This implementation follows Vue 3 best practices while properly integrating DevExtreme components with correct TypeScript typings discovered through MCP documentation search.

## Further help

You can learn more about Vue in the [Vue documentation](https://vuejs.org/guide/introduction.html).
You can learn more about Vite in the [Vite documentation](https://vite.dev/).
You can learn more about DevExtreme Vue components in the [DevExtreme Vue documentation](https://js.devexpress.com/Vue/).

To get more help with DevExtreme, submit a ticket through the [Support Center](https://supportcenter.devexpress.com/ticket/create).
