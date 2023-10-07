const checkAddServiceForm = async (req, res, next) => {
  const {
    name,
    description,
    price,
    morning_time,
    afternoon_time,
  } = req.body;
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
    if (!morning_time) {
      return res
        .status(406)
        .json({ message: "Morning Time must not be blank" });
    }
    if (!afternoon_time) {
      return res
        .status(406)
        .json({ message: "Afternoon Time must not be blank" });
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
