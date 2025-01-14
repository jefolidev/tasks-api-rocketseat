import { parse } from 'csv-parse'
import fs from 'fs'
import { csvGetRequisition, csvPostRequisition } from '../http/csv-parse.js'

const dataPath = new URL('../data.csv', import.meta.url)

export function csvParseData() {
  fs.createReadStream(dataPath)
    .pipe(parse({ columns: true }))
    .on('data', async (row) => {
      const taskData = {
        title: row.title,
        description: row.description,
      }

      try {
        const existingTasks = await csvGetRequisition()

        const alreadyExistsTheTask = existingTasks.data.some(
          (data) => data.title === taskData.title
        )

        if (alreadyExistsTheTask) {
          console.log('Uma ou mais task já existe no registro!')
          return
        }

        const response = await csvPostRequisition(taskData)
        return response
      } catch (err) {
        console.log(err)
      }
    })
    .on('end', () => {
      console.log('IMPORTAÇÃO CSV REALIZADA COM SUCESSO!')
    })
    .on('error', (err) => {
      console.error('Houve um erro inesperado na importação:', err.message)
    })
}

csvParseData()
