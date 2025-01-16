export default async (req, res, next) => {
  try {
    console.log(">>>>>>>>>test");
    return res.send("testing");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
