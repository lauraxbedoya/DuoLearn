import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import getMenuItems from "./menuItems";
import styles from "./layout.module.scss";
import { Menu } from "primereact/menu";

interface LayoutProps {
  onLogout: () => void;
}

const Layout: FC<LayoutProps> = (props) => {
  const navigate = useNavigate();
  const onLogout = () => {
    props.onLogout();
  };
  const onRoute = (route: string) => navigate(route);

  return (
    <div className={styles.container}>
      <div className={styles.subContainerMenu}>
        <Menu
          model={getMenuItems(onLogout, onRoute)}
          className={styles.tieredmenu}
        />
        <div className={styles.div}></div>
        {/* <TieredMenu
        model={getMenuItems(onLogout, onRoute)}
        breakpoint="767px"
        className={styles.tieredmenu}
      /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
