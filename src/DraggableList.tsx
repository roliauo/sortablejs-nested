import React, { useCallback, useState } from "react";
import { ReactSortable, Store } from "react-sortablejs";
import { HolderOutlined } from "@ant-design/icons";
import Items, { ItemType } from "./Items";

interface Props {
  // item: any;
  list: ItemType[];
  setList: any;
  group?: { name: string; pull: boolean; put: string[] } | string;
  classname?: string;
}

const config = {
  animation: 200,
  delayOnTouchStart: true,
  delay: 2,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  handle: ".handle"
};

export default function DraggableList({
  list,
  setList,
  group = { name: "root", put: ["nested"], pull: true },
  classname = "item"
}: Props) {
  const [children, setChildren] = useState<ItemType[]>([]);

  function setChildrenList(newChildrenList: ItemType[], parentId: string) {
    if (!newChildrenList) return;

    const changedParent = list.find((f: ItemType) => f.id === parentId);
    if (!changedParent || !newChildrenList.map) return;
    // console.info(
    //   "first-setChildrenList: ",
    //   newChildrenList,
    //   list, // old list
    //   parentId,
    //   changedParent
    // );

    changedParent.children = newChildrenList.map((m) => {
      m.parentId = parentId;
      return m;
    });

    if (newChildrenList.length === 0) {
      // remove from sub-list, parentId is the item's id (changedParent === this item)
      delete changedParent.parentId;
    }

    setChildren(newChildrenList); // to update nested list -> should NOT use setState, using useEffect to dispatch instead

    return list;
  }

  return (
    <ReactSortable list={list} setList={setList} group={group} {...config}>
      {/* display the item & children */}
      {list?.map((m) => (
        <div key={m.id} className="container">
          <div className={classname}>
            <HolderOutlined className="handle" />
            {m.name}
          </div>

          <div className="container nested">
            {/* multi-level nested list */}
            {/* <DraggableList
              list={m.children}
              setList={(newChildrenList: ItemType[]) =>
                setChildrenList(newChildrenList, m.id)
              }
              classname={`${classname} nested`}
              group={{ name: "nested", pull: true, put: ["root", "nested"] }}
            /> */}
            <ReactSortable
              list={m.children}
              setList={(newChildrenList) =>
                setChildrenList(newChildrenList, m.id)
              }
              group={{ name: "nested", pull: true, put: ["root", "nested"] }}
              {...config}
            >
              <Items classname={`${classname} nested`} list={m.children} />
            </ReactSortable>
          </div>
        </div>
      ))}
    </ReactSortable>
  );
}
