import { Component, ViewChild } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild(DxListComponent, { static: false }) list: DxListComponent
    fruits = ["Apples", "Oranges", "Lemons", "Pears", "Pineapples"];
    dataSource = this.fruits;
    selectedFruit = '';
    isDropDownBoxOpened = false;
    
    changeDropDownBoxValue (args: { addedItems: string[]; }) {
        this.selectedFruit = args.addedItems[0];
        this.isDropDownBoxOpened = false;
    }
    addItem () {
        this.dataSource.push(this.selectedFruit);
        this.selectedFruit = '';
        this.list.instance.reload();
    }
    onItemDeleting(e: { cancel: boolean; }) {
        if (this.dataSource.length === 1) {
            e.cancel = true;
        }
    }
}

