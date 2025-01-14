import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.query

      const search = title || description ? { title, description } : null

      const tasks = database.select('tasks', search)

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description, updated_at, completed_at } = req.body

      const newTask = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at,
        completed_at,
      }

      database.insert('tasks', newTask)
      return res.writeHeader(201).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, {
        title,
        description,
        updated_at: new Date(),
      })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.remove('tasks', id)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/complete/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const data = req.body

      database.complete_task('tasks', id, {
        ...data,
        completed_at: new Date(),
      })

      return res.writeHead(204).end(id)
    },
  },
]
