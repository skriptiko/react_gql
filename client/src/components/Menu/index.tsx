import * as Antd from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

type MenuItems = Antd.MenuProps["items"];
type MenuOnClick = Antd.MenuProps["onClick"];

export interface MenuProps {
  items: MenuItems;
  onClick: MenuOnClick;
}

function Menu({ items, onClick }: MenuProps): JSX.Element {
  const menu = <Antd.Menu items={items} onClick={onClick} />;

  return (
    <Antd.Dropdown overlay={menu} className={styles.container}>
      <div>
        <Antd.Space>
          <EllipsisOutlined className={styles.ellipsisIcon} />
        </Antd.Space>
      </div>
    </Antd.Dropdown>
  );
}

export default Menu;
