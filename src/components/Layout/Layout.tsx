import { FC } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  onLogout: () => void;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div>
      <h1>My Menu</h1>
      <button onClick={props.onLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Layout;
