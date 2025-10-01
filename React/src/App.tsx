import { useState, useRef, useCallback } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DropDownBox from 'devextreme-react/drop-down-box';
import List from 'devextreme-react/list';
import type { DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import type { ListTypes } from 'devextreme-react/list';

const fruits: string[] = ['Apples', 'Oranges', 'Lemons', 'Pears', 'Pineapples'];

function App(): JSX.Element {
  const [selectedFruit, setSelectedFruit] = useState<string>('');
  const [dataSource, setDataSource] = useState<string[]>(fruits);
  const dropDownBoxRef = useRef<any>(null);
  const listRef = useRef<any>(null);

  const changeDropDownBoxValue = useCallback((arg: ListTypes.SelectionChangedEvent) => {
    setSelectedFruit(arg.addedItems[0]);
    dropDownBoxRef.current.instance().close();
  }, []);

  const onValueChanged = useCallback((e: DropDownBoxTypes.ValueChangedEvent) => {
    setSelectedFruit(e.value);
  }, []);

  const addItem = useCallback(() => {
    setDataSource([...dataSource, selectedFruit]);
    setSelectedFruit('');
    listRef.current.instance().reload();
  }, [dataSource, selectedFruit]);

  const onItemDeleting = useCallback((e: ListTypes.ItemDeletingEvent) => {
    if (dataSource.length === 1) {
      e.cancel = true;
    }
  }, [dataSource]);

  return (
    <div id="app-container">
      <DropDownBox
        value={selectedFruit}
        dataSource={dataSource}
        ref={dropDownBoxRef}
        label="Fruits"
        labelMode="floating"
        onValueChanged={onValueChanged}
        acceptCustomValue={true}
        openOnFieldClick={false}
        onEnterKey={addItem}
      >
        <List
          ref={listRef}
          dataSource={dataSource}
          selectionMode="single"
          onSelectionChanged={changeDropDownBoxValue}
          allowItemDeleting={true}
          onItemDeleting={onItemDeleting}
        />
      </DropDownBox>
    </div>
  );
}

export default App;
