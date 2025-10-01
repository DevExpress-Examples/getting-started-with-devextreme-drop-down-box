<script setup lang="ts">
import { ref, computed } from 'vue';
import { DxDropDownBox } from 'devextreme-vue/drop-down-box';
import { DxList } from 'devextreme-vue/list';
import type { DxDropDownBoxTypes } from 'devextreme-vue/drop-down-box';
import type { DxListTypes } from 'devextreme-vue/list';
import type { Product } from '../types';

const products: Product[] = [
  {
    ID: 1,
    Name: 'HD Video Player',
    Price: 330,
    Current_Inventory: 225,
    Backorder: 0,
    Manufacturing: 10,
    Category: 'Video Players',
    ImageSrc: 'images/products/1.png',
  },
  {
    ID: 2,
    Name: 'SuperHD Video Player',
    Price: 400,
    Current_Inventory: 150,
    Backorder: 0,
    Manufacturing: 25,
    Category: 'Video Players',
    ImageSrc: 'images/products/2.png',
  },
  {
    ID: 3,
    Name: 'SuperPlasma 50',
    Price: 2400,
    Current_Inventory: 0,
    Backorder: 0,
    Manufacturing: 0,
    Category: 'Televisions',
    ImageSrc: 'images/products/3.png',
  },
  {
    ID: 4,
    Name: 'SuperLED 50',
    Price: 1600,
    Current_Inventory: 77,
    Backorder: 0,
    Manufacturing: 55,
    Category: 'Televisions',
    ImageSrc: 'images/products/4.png',
  },
  {
    ID: 5,
    Name: 'SuperLED 42',
    Price: 1450,
    Current_Inventory: 445,
    Backorder: 0,
    Manufacturing: 0,
    Category: 'Televisions',
    ImageSrc: 'images/products/5.png',
  },
];

const dropDownBoxValue = ref<number[]>([]);
const listSelectedItemKeys = ref<number[]>([]);

const dropDownBoxRef = ref<any>(null);
const listRef = ref<any>(null);

const selectedProduct = computed(() => {
  if (dropDownBoxValue.value.length === 0) return null;
  const product = products.find(p => p.ID === dropDownBoxValue.value[0]);
  return product?.Name || null;
});

const syncListSelection = (value: number[]) => {
  listSelectedItemKeys.value = value.slice();
};

const dropDownBoxValueChanged = (e: DxDropDownBoxTypes.ValueChangedEvent) => {
  const newValue = e.value || [];
  dropDownBoxValue.value = newValue;
  syncListSelection(newValue);
};

const listSelectionChanged = (e: DxListTypes.SelectionChangedEvent) => {
  if (e.addedItems?.length) {
    const selectedItem = e.addedItems[0] as Product;
    dropDownBoxValue.value = [selectedItem.ID];

    if (dropDownBoxRef.value) {
      dropDownBoxRef.value.close();
    }
  }
};

const listItemDeleting = (e: DxListTypes.ItemDeletingEvent) => {
  console.log('Item deleting:', e.itemData);
  // Prevent deletion in this demo
  e.cancel = true;
};
</script>

<template>
  <div id="app-container">
    <div id="dropdownbox-demo">
      <div class="dx-fieldset">
        <div class="dx-field">
          <div class="dx-field-label">Product</div>
          <div class="dx-field-value">
            <DxDropDownBox
              ref="dropDownBoxRef"
              :value="dropDownBoxValue"
              value-expr="ID"
              display-expr="Name"
              placeholder="Select a value..."
              :show-clear-button="true"
              :data-source="products"
              @value-changed="dropDownBoxValueChanged"
            >
              <template #content>
                <DxList
                  ref="listRef"
                  :data-source="products"
                  :selected-item-keys="listSelectedItemKeys"
                  key-expr="ID"
                  selection-mode="single"
                  display-expr="Name"
                  @selection-changed="listSelectionChanged"
                  @item-deleting="listItemDeleting"
                />
              </template>
            </DxDropDownBox>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Selected Product</div>
          <div class="dx-field-value">
            <span>{{ selectedProduct || 'None' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app-container {
  width: 900px;
  position: relative;
}

#dropdownbox-demo {
  padding: 20px;
}

.dx-fieldset {
  margin: 20px 0;
}

.dx-field {
  margin: 20px 0;
}

.dx-field-label {
  text-align: left;
  width: 120px;
  display: inline-block;
  vertical-align: top;
  margin-top: 6px;
  font-weight: bold;
}

.dx-field-value {
  display: inline-block;
  width: calc(100% - 140px);
}
</style>
