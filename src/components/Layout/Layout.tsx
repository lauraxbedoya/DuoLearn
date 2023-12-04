import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { TieredMenu } from 'primereact/tieredmenu';
import getMenuItems from "./menuItems";
import styles from "./layout.module.scss";
import { PanelMenu } from "primereact/panelmenu";

interface LayoutProps {
  onLogout: () => void;
}

const Layout: FC<LayoutProps> = (props) => {
  const navigate = useNavigate();
  const onLogout = () => { props.onLogout() };
  const onRoute = (route: string) => navigate(route);

  return (
    <div className={styles.container}>
      <div className={styles.subContainerMenu}>
      <PanelMenu model={getMenuItems(onLogout, onRoute)} className="w-full md:w-25rem" />
      </div>
      {/* <TieredMenu model={getMenuItems(onLogout, onRoute)} breakpoint="767px" className={styles.tieredmenu} /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
