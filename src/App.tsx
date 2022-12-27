import "./styles.scss";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import DraggableList from "./DraggableList";
import { ItemType } from "./Items";

export default function App() {
  const [list, setList] = useState<ItemType[]>([
    {
      id: "1",
      name: "shrek",
      children: [{ parentId: "1", id: "7", name: "zzz-1", children: [] }]
    },
    { id: "2", name: "fiona", children: [] },
    { id: "3", name: "q", children: [] },
    { id: "4", name: "qqq", children: [] },
    { id: "5", name: "sss", children: [] },
    { id: "6", name: "zzz", children: [] }
  ]);

  function handleUpdateList(newList: ItemType[]) {
    if (JSON.stringify(list) === JSON.stringify(newList)) return;
    // console.log("handleUpdateList", newList);
    setList(newList);
  }

  return (
    <div className="App">
      {/* <ReactSortable
        list={list}
        setList={setList}
        // group="nested"
        animation={200}
        delayOnTouchStart={true}
        delay={2}
        fallbackOnBody
        swapThreshold={0.65}
      >
        {list.map((item) => (
          <div className="item" key={item.id}>
            {item.name}
          </div>
        ))}
      </ReactSortable> */}

      <hr />
      <DraggableList list={list} setList={handleUpdateList} />
    </div>
  );
}
