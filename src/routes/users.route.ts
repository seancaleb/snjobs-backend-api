import {
  applyJobPost,
  bookmarkJobPost,
  deleteJobApplicationById,
  deleteUser,
  getAllJobApplications,
  getBookmarkedJobs,
  getUser,
  getUserDetails,
  updatePassword,
  updateUser,
  uploadAvatar,
} from "@/controllers/users.controller";
import authorizeUser from "@/middleware/authorizeUser";
import validateResource from "@/middleware/validateResource";
import verifyJwt from "@/middleware/verifyJwt";
import {
  applyJobPostSchema,
  deleteJobApplicationSchema,
} from "@/schema/application.schema";
import {
  bookmarkJobPostSchema,
  deleteUserSchema,
  getUserDetailsSchema,
  updatePasswordSchema,
  updateUserSchema,
} from "@/schema/user.schema";
import express from "express";
import upload from "@/middleware/multer";

const router = express.Router();

router.get(
  "/profile/:userId",
  validateResource(getUserDetailsSchema),
  getUserDetails
);

router.use(verifyJwt);

router.get("/profile", getUser);
router.patch("/profile", validateResource(updateUserSchema), updateUser);
router.delete("/profile", validateResource(deleteUserSchema), deleteUser);
router.post("/profile/upload", upload.single("avatar"), uploadAvatar);
router.patch(
  "/update-password",
  validateResource(updatePasswordSchema),
  updatePassword
);

router.use(authorizeUser("user"));

router.post(
  "/jobs/:jobId/apply",
  validateResource(applyJobPostSchema),
  applyJobPost
);
router.get("/applications", getAllJobApplications);
router.delete(
  "/applications/:applicationId",
  validateResource(deleteJobApplicationSchema),
  deleteJobApplicationById
);
router.post(
  "/jobs/:jobId/bookmark",
  validateResource(bookmarkJobPostSchema),
  bookmarkJobPost
);
router.get("/bookmarked-jobs", getBookmarkedJobs);

export default router;
