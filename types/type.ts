type User = {
  id?: number | null
  name: string
  age: number | null
}

type DialogMode = 'add' | 'edit' | 'delete'

export type { User, DialogMode }
