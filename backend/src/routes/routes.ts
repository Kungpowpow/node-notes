import { Router } from 'express';
import noteController from './note/note.controller';

const api = Router()
    .use(noteController)

export default Router().use('/api', api);