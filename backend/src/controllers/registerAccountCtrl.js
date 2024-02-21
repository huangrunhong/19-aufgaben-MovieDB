import { UserService } from "../service/index.js";

export async function registerAccountCtrl(req, res) {
  try {
    const userInfo = req.body;
    console.log(userInfo);
    // userInfo.photo_url = `http://localhost:9999/${req.files[0].originalname}`;
    const result = await UserService.registerUser(userInfo);
    // console.log(userInfo);
    res.json({
      success: true,
      result: result,
    });
    console.log("test result", result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Could not register a new Account",
    });
  }
}
