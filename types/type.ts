type User = {
  id: string
  name: string
  age: number | null
}

type DialogMode = 'add' | 'edit' | 'delete'

export type { User, DialogMode }
