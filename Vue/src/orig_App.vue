<template>
    <div id="container">
        <DxDropDownBox
            :accept-custom-value="true"
            :open-on-field-click="false"
            v-model:value="selectedFruit"
            v-model:opened="isDropDownBoxOpened"
            :data-source="dataSource"
            label="Fruits"
            labelMode="floating"
            @enter-key="addItem"
        >
            <DxList
                :data-source="dataSource"
                selection-mode="single"
                @selection-changed="changeDropDownBoxValue($event)"
                :allow-item-deleting="true"
                @item-deleting="onItemDeleting($event)"
                @initialized="saveListInstance"
            >
            </DxList>
        </DxDropDownBox>
    </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import DxDropDownBox from "devextreme-vue/drop-down-box";
import DxList from "devextreme-vue/list";

export default {
    components: {
        DxDropDownBox,
        DxList
    },
    data() {
        const fruits = ["Apples", "Oranges", "Lemons", "Pears", "Pineapples"];
        return {
            dataSource: fruits,
            isDropDownBoxOpened: false,
            selectedFruit: '',
            listInstance: null
        }
    },
    methods: {
        changeDropDownBoxValue(e) {
            this.selectedFruit = e.addedItems[0];
            this.isDropDownBoxOpened = false;
        },
        onItemDeleting(e) {
            if (this.dataSource.length === 1) {
                e.cancel = true;
            }
        },
        saveListInstance(e) {
            this.listInstance = e.component;
        },
        addItem() {
            this.dataSource.push(this.selectedFruit);
            this.selectedFruit = '';
            this.listInstance.reload();
        }
    }
}
</script>

<style>
    #container {
        width: 350px;
    }
</style>