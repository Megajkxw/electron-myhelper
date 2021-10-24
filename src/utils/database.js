// import Datastore from 'lowdb'
// import LodashId from 'lodash-id'
// import {JSONFileSync} from 'lowdb'
// import path from 'path'
// import fs from 'fs-extra'
// import { remote, app } from 'electron'
//
// const APP = process.type === 'renderer' ? remote.app : app
// const STORE_PATH = APP.getPath('userData')
//
// if (process.type !== 'renderer') {
//     if (!fs.pathExistsSync(STORE_PATH)) {
//         fs.mkdirpSync(STORE_PATH)
//     }
// }
//
// const adapter = new JSONFileSync(path.join(STORE_PATH, '/data.json'))
//
// const db = Datastore(adapter)
// db._.mixin(LodashId)
//
// if (!db.has('uploaded').value()) {
//     db.set('uploaded', []).write()
// }
//
// if (!db.has('picBed').value()) {
//     db.set('picBed', {
//         current: 'weibo'
//     }).write()
// }
//
// if (!db.has('shortKey').value()) {
//     db.set('shortKey', {
//         upload: 'CommandOrControl+Shift+P'
//     }).write()
// }


import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export default db