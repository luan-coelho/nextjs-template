import { BaseEntity, User } from "../entities"

export enum RevisionType {
  ADD = "ADD",
  MOD = "MOD",
  DEL = "DEL",
}

export interface Revision<T extends BaseEntity> {
  id: number
  type: RevisionType
  date: Date
  user: User
  entity: T extends BaseEntity ? T : BaseEntity
}

export interface RevisionComparison<T extends BaseEntity> {
  revision: Revision<T>
  fieldChanges: FieldChange[]
}

export interface FieldChange {
  name: string
  label: string
  oldValue: any
  newValue: any
  order: number
  subFieldChanges: FieldChange[]
}
