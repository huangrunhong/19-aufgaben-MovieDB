export async function logoutCtrl(req, res) {
  try {
    if (req.verifiedUserClaims.type !== "refresh")
      throw new Error("Token must be type of refresh");
    console.log(req.verifiedUserClaims);
    req.session.refreshToken = null;
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not log out ",
    });
  }
}
