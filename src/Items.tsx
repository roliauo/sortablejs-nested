import { HolderOutlined } from "@ant-design/icons";

export interface ItemType {
  id: string;
  name: string;
  parentId?: string;
  children: ItemType[];
}

interface Props {
  list: ItemType[];
  classname?: string;
}

export default function Items({ list, classname }: Props) {
  if (!list.length) return <></>;
  return (
    <>
      {list.map((m) => (
        <div key={m.id} className={`${classname} nested`}>
          <HolderOutlined className="handle" />
          {m.name}
          <Items list={m.children} classname={classname} />
        </div>
      ))}
    </>
  );
}
