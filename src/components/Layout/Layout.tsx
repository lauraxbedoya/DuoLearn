import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { TieredMenu } from 'primereact/tieredmenu';
import getMenuItems from "./menuItems";
import styles from "./layout.module.scss";

interface LayoutProps {
  onLogout: () => void;
}

const Layout: FC<LayoutProps> = (props) => {
  const navigate = useNavigate();
  const onLogout = () => { props.onLogout() };
  const onRoute = (route: string) => navigate(route);

  return (
    <div className={styles.container}>
      <TieredMenu model={getMenuItems(onLogout, onRoute)} breakpoint="767px" className={styles.tieredmenu} />
      <Outlet />
    </div>
  );
};

export default Layout;
