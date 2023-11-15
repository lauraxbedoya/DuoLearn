import { MenuItem } from 'primereact/menuitem';

function getMenuItems(
    onLogout: (route: () => void) => void,
): MenuItem[] {
    return [
        { label: 'Aprender', icon: 'pi pi-fw pi-plus' },
        { label: 'Practicar', icon: 'pi pi-fw pi-plus' },
        { label: 'Ligas', icon: 'pi pi-fw pi-plus' },
        { label: 'Desafíos', icon: 'pi pi-fw pi-plus' },
        { label: 'Tienda', icon: 'pi pi-fw pi-plus' },
        { label: 'Perfil', icon: 'pi pi-fw pi-plus' },
        {
            label: 'Más', icon: 'pi pi-fw pi-plus', items: [
                { label: 'Configuración', icon: 'pi pi-fw pi-bookmark' },
                { label: 'Ayuda', icon: 'pi pi-fw pi-bookmark' },
                {
                    label: 'Cerrar Sesión', icon: 'pi pi-fw pi-bookmark',
                    command: () => { onLogout(() => { }) },
                },
            ]
        },
    ];
}

export default getMenuItems;
