import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByStudentId,
} from "../controllers/applicationController";
// import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.post("/", createApplication);
router.get("/", getAllApplications);
router.get("/student/:studentId", getApplicationsByStudentId);
router.get("/:id", getApplicationById);
router.patch("/:id", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
