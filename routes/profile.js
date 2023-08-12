import profileController from '../controller/profile.js'
import { Router } from 'express';
import { validateAccess } from '../controller/auth.js';

const router = Router()

router.route('/')
    .get(validateAccess, profileController.getProfileById)

export default router
