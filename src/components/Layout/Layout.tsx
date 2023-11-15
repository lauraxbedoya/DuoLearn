import { FC } from "react";
import { Outlet } from "react-router-dom";
import { TieredMenu } from 'primereact/tieredmenu';
import getMenuItems from "./menuItems";
import styles from "./layout.module.scss";

interface LayoutProps {
  onLogout: () => void;
}

const Layout: FC<LayoutProps> = (props) => {
  const onLogout = () => { props.onLogout() };

  return (
    <div className={styles.container}>
      <TieredMenu model={getMenuItems(onLogout)} breakpoint="767px" className={styles.tieredmenu} />
      <Outlet />
    </div>
  );
};

export default Layout;
