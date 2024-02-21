import { UserService } from "../service/index.js";

export async function resentEmailCtrl(req, res) {
  try {
    const userId = req.body.userId;
    const result = await UserService.resentEmail({ userId });
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not resent verification email to user",
    });
  }
}
