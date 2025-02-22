import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import {register, login, logout, refreshAccessToken, changePassword, getUser, editProfile, editImage, getAllUsers, followUnfollowUser, migratePassword} from '../controllers/user.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register').post(
    upload.fields([{
        name : "profileImage",
        maxCount:1
    },{
        name : "coverImage",
        maxCount:1
    }]),
    register)

router.route('/login').post(login)
router.route('/logout').post(verifyJWT, logout)
router.route('/refreshTokens').post(verifyJWT, refreshAccessToken)
router.route('/changePassword').post(verifyJWT, changePassword)
router.route('/getUser/:id').get(verifyJWT, getUser)
router.route('/editProfile').post(verifyJWT, editProfile)
router.route('/migratePswd').get(migratePassword)

router.route('/editImage').post(upload.fields([{
        name : "profileImage",
        maxCount:1
    },{
        name : "coverImage",
        maxCount:1
    }]), verifyJWT, editImage)
    
router.route('/getAllUsers').get(verifyJWT, getAllUsers)
router.route('/:id/followUnfollowUser').put(verifyJWT, followUnfollowUser);

// router.get('/:id', getUser);
// router.put('/:id', authMiddleWare, updateUser);
// router.delete('/:id', authMiddleWare, deleteUser);
// router.put('/:id/unfollow', authMiddleWare, UnFollowUser);

export default router 