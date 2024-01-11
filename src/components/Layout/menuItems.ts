import { MenuItem } from "primereact/menuitem";

function getMenuItems(
  onLogout: (route: () => void) => void,
  onRoute: (route: string) => void
): MenuItem[] {
  return [
    {
      label: "Duolearn",
      icon: "pi pi-fw pi-home",
      command: () => {
        onRoute("/");
      },
    },
    {
      label: "Admin",
      icon: "pi pi-fw pi-plus",
      items: [
        {
          label: "Languages",
          command: () => {
            onRoute("/languages");
          },
        },
      ],
    },
    {
      label: "User",
      items: [
        { label: "Aprender", icon: "pi pi-fw pi-plus" },
        { label: "Practicar", icon: "pi pi-fw pi-plus" },
        { label: "Ligas", icon: "pi pi-fw pi-plus" },
        { label: "Desafíos", icon: "pi pi-fw pi-plus" },
        { label: "Tienda", icon: "pi pi-fw pi-plus" },
        { label: "Perfil", icon: "pi pi-fw pi-plus" },
      ],
    },
    {
      label: "Más",
      icon: "pi pi-fw pi-plus",
      items: [
        { label: "Configuración", icon: "pi pi-fw pi-bookmark" },
        { label: "Ayuda", icon: "pi pi-fw pi-bookmark" },
        {
          label: "Cerrar Sesión",
          icon: "pi pi-fw pi-bookmark",
          command: () => {
            onLogout(() => {});
          },
        },
      ],
    },
  ];
}

export default getMenuItems;
