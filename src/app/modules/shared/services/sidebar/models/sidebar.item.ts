import { SidebarItemIconType } from "../enums/sidebar.item.icon.type";

export class SidebarItem {
    name: string
    displayName: string
    description: string
    icon: string
    iconType: SidebarItemIconType
    route: string
    subItems?: SidebarItem[]
}