export const verifyUser = (req, res) => {
  return res.status(200).json({ status: "success", user: req.user, message: "User is authenticated" });
};
