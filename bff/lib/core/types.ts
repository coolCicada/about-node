export interface App {
  extName: string
  appPath: string
  config: any
  on: Function
}

export interface Hook {
  default: Function
}