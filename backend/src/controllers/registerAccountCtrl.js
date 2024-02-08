import { UserService } from "../service/index.js";

export async function registerAccountCtrl(req, res) {
  try {
    const userInfo = req.body;
    userInfo.photo_url = `http://localhost:9999/${req.files[0].originalname}`;
    const result = await UserService.registerUser(userInfo);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
      message: "Could not register a new Account",
    });
  }
}
