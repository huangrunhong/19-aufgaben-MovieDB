import { UserService } from "../service/index.js";

export async function loginUserCtrl(req, res) {
  try {
    const userInfo = { email: req.body.email, password: req.body.password };

    const result = await UserService.loginUser(userInfo);

    req.session.refreshToken = result.tokens.refreshToken;
    console.log(req.session);

    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not login user",
    });
  }
}
