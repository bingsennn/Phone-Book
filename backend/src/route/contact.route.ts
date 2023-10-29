import { Router } from 'express';
import { 
    createContactController, 
    deleteContactController, 
    editContactController, 
    listContactController, 
    retrieveContactController 
} from '../controller';

const contactRouter = Router();

contactRouter.post("/create", (req, res) => createContactController.executeRest(req, res))
contactRouter.post("/edit/:guid", (req, res) => editContactController.executeRest(req, res))
contactRouter.get("/retrieve/:guid", (req, res) => retrieveContactController.executeRest(req, res))
contactRouter.get("/list", (req, res) => listContactController.executeRest(req, res))
contactRouter.delete("/:guid", (req, res) => deleteContactController.executeRest(req, res))


export default contactRouter;