import { UserService } from "../service/index.js";

export async function verifyEmailCtrl(req, res) {
  try {
    const userId = req.body.userId;
    const sixDigitCode = req.body.sixDigitCode;
    const result = await UserService.verifyEmail({ userId, sixDigitCode });
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not verify Email",
    });
  }
}
