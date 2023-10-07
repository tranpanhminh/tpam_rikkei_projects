const checkAddServiceForm = async (req, res, next) => {
  const { name, description, price, working_time_id } = req.body;
  try {
    if (!name) {
      return res
        .status(406)
        .json({ message: "Service Name must not be blank" });
    }
    if (!description) {
      return res.status(406).json({ message: "Description must not be blank" });
    }
    if (!price) {
      return res.status(406).json({ message: "Price must not be blank" });
    }
    if (price < 0) {
      return res.status(406).json({ message: "Price must not be < 0" });
    }
    if (!working_time_id) {
      return res
        .status(406)
        .json({ message: "Working Time must not be blank" });
    }
    if (!req.file) {
      return res.status(406).json({ message: "Please upload image" });
    }
    next();
  } catch (error) {
    console.log(error, "ERROR");
  }
};
module.exports = checkAddServiceForm;
