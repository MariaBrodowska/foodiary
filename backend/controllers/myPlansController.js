const MyPlan = require("../models/MyPlan");
const { getUserIdFromToken } = require("../middleware/requireAuth");

const createMyPlan = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const plan = await MyPlan.createPlan(userId, req.body);
    res.status(201).json({ message: "Plan utworzony pomyślnie", plan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyPlans = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { search } = req.query;
    const plans = await MyPlan.getUserPlans(userId, search);
    res.status(200).json({ plans });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMyPlan = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { planId } = req.params;
    const updatedPlan = await MyPlan.updatePlan(planId, userId, req.body);
    res
      .status(200)
      .json({ message: "Plan zaktualizowany pomyślnie", plan: updatedPlan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMyPlan = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { planId } = req.params;
    await MyPlan.deletePlan(planId, userId);
    res.status(200).json({ message: "Plan usunięty pomyślnie" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyPlanById = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { planId } = req.params;
    const plan = await MyPlan.findOne({ _id: planId, userId });
    if (!plan) {
      return res.status(404).json({ error: "Plan nie został znaleziony" });
    }
    res.status(200).json({ plan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMyPlan,
  getMyPlans,
  updateMyPlan,
  deleteMyPlan,
  getMyPlanById,
};
