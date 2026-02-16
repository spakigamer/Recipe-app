
const logout = async (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(401).json({ message: "Session expired. Logged out." });
};

export default logout;
