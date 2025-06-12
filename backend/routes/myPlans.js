const express = require("express");
const router = express.Router();
const {
  createMyPlan,
  getMyPlans,
  updateMyPlan,
  deleteMyPlan,
  getMyPlanById,
} = require("../controllers/myPlansController");
const { requireAuth } = require("../middleware/requireAuth");

router.use(requireAuth);

router.post("/", createMyPlan);
router.get("/", getMyPlans);
router.get("/:planId", getMyPlanById);
router.put("/:planId", updateMyPlan);
router.delete("/:planId", deleteMyPlan);

module.exports = router;
