export interface NavigatorRow {
  title: string
  path: string
  icon?: any
  roles: number[]
}
export default interface NavigatorItemModel {
  groupName: string
  listItem: NavigatorRow[]
  icon: any
}
