$(() => {
  const fruits = ['Apples', 'Oranges', 'Lemons', 'Pears', 'Pineapples'];
  const dataSource = fruits;
  let list;

  const dropDownBox = $('#drop-down-box').dxDropDownBox({
    acceptCustomValue: true,
    openOnFieldClick: false,
    dataSource,
    label: 'Fruits',
    labelMode: 'floating',
    contentTemplate(e) {
      const $list = $('<div>').dxList({
        dataSource,
        selectionMode: 'single',
        onSelectionChanged(arg) {
          e.component.option('value', arg.addedItems[0]);
          e.component.close();
        },
        allowItemDeleting: true,
        onItemDeleting(itemEvent) {
          if (dataSource.length === 1) {
            itemEvent.cancel = true;
          }
        },
      });
      list = $list.dxList('instance');
      return $list;
    },
    onEnterKey(e) {
      dataSource.push(e.component.option('value'));
      e.component.option('value', '');
      list.reload();
    },
  }).dxDropDownBox('instance');
});
