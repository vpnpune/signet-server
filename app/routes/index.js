import express from 'express';
import userRoutes from './users.route';
import authenticationRoutes from './authenticate.route';
import interceptor from './../authentication-interceptor';
import locationRoutes from './location.route';
import clientRoutes from './client.route';
import areaRoutes from './area.route';
import endpointNotFound from './error-route';
import distributorRoutes from './distributor.route';
import channelcategoryRoutes from './channel-category.route';
const router = express.Router();
router.use('/authenticate', authenticationRoutes);
//router.use(interceptor);

//All routers should be attached after this only
router.use('/users', userRoutes);

router.use('/location', locationRoutes);
router.use('/client', clientRoutes);
// signet specific
router.use('/area', areaRoutes);
router.use('/distributor', distributorRoutes);
router.use('/channelCat', channelcategoryRoutes);

//always at the end
router.use('/*', endpointNotFound);



export default router;