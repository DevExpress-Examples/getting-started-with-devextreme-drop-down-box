import { Component, ViewChild } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DxListTypes } from 'devextreme-angular/ui/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DxListComponent, { static: false }) list!: DxListComponent;

  fruits: string[] = ['Apples', 'Oranges', 'Lemons', 'Pears', 'Pineapples'];

  dataSource: string[] = this.fruits;

  selectedFruit = '';

  isDropDownBoxOpened = false;

  changeDropDownBoxValue(args: DxListTypes.SelectionChangedEvent): void {
    this.selectedFruit = args.addedItems[0];
    this.isDropDownBoxOpened = false;
  }

  addItem(): void {
    this.dataSource.push(this.selectedFruit);
    this.selectedFruit = '';
    this.list.instance.reload();
  }

  onItemDeleting(e: DxListTypes.ItemDeletingEvent): void {
    if (this.dataSource.length === 1) {
      e.cancel = true;
    }
  }
}
