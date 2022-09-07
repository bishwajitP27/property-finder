import "./index.css";

import SidebarHeader from "./SidebarHeader";
import SidebarMain from "./SidebarMain";

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
      <SidebarHeader />
      <SidebarMain />
    </aside>
  );
}
