import React, { useState, useRef, useCallback } from "react";
import "devextreme/dist/css/dx.light.css";

import { DropDownBox } from "devextreme-react/drop-down-box";
import { List } from "devextreme-react/list";
 
const fruits = ["Apples", "Oranges", "Lemons", "Pears", "Pineapples"];

function App() {
    const [selectedFruit, setSelectedFruit] = useState('');
    const [dataSource, setDataSource] = useState(fruits);
    const dropDownBoxRef = useRef(null);
    const listRef = useRef(null);
    const changeDropDownBoxValue = useCallback((arg) => {
        setSelectedFruit(arg.addedItems[0]);
        dropDownBoxRef.current.instance.close();
    }, []);
    const onValueChanged = useCallback((e) => {
        setSelectedFruit(e.value);
    }, []);
    const addItem = useCallback(() => {
        setDataSource([...dataSource, selectedFruit]);
        setSelectedFruit('');
        listRef.current.instance.reload();
    }, [dataSource, selectedFruit]);
    const onItemDeleting = useCallback((e) => {
        if (dataSource.length === 1) {
            e.cancel = true;
        }
    }, [dataSource]);

    return (
        <div id="container">
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
