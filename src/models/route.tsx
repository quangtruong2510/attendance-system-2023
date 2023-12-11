export default interface IRoute {
  path: string
  exact: boolean
  component: React.ReactElement
  role: number[]
}
