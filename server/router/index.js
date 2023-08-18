import express from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';
import fileController from '../controllers/file-controller.js';
import {upload} from '../config/multer-config.js'
const router = express.Router();
router.post('/signup',
    body('id').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.signup
);

router.post('/signin', userController.signin);
router.post('/logout', userController.logout);
router.post('/signin/new_token', userController.refresh); // если честно назвал бы роут просто refresh
router.get('/users', authMiddleware, userController.getUsers);


router.post('/file/upload', authMiddleware, upload.single('file'), fileController.upload);
router.get('/file/list',authMiddleware, fileController.list);
router.delete('/file/delete/:id',authMiddleware, fileController.deleteFile);
router.get('/file/:id',authMiddleware, fileController.getFile);
router.get('/file/download/:id',authMiddleware, fileController.downloadFile);
router.put('/file/update/:id',authMiddleware, upload.single('file'), fileController.updateFile);


export default router
