import express from "express";
const router = express.Router();
import feedbackController from '../controller/feedback.js'

router.route('/')
    .post( feedbackController.create )

export default router
