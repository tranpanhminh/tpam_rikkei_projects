const connectMySQL = require("../configs/db.config.js");
const servicesModel = require("../models/services.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class ServicesController {
  // 1. Get All Services
  async getAllServices(req, res) {
    try {
      const listServices = await servicesModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listServices);
      console.log(listServices, "listServices");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Service
  async getDetailService(req, res) {
    try {
      const serviceId = req.params.serviceId;
      const detailService = await servicesModel.findOne({
        where: { id: serviceId },
      });
      if (!detailService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      } else {
        return res.status(200).json(detailService);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Service
  async addService(req, res) {
    const { name, description, price, morning_time, afternoon_time } = req.body;
    try {
      if (!name) {
        return res
          .status(406)
          .json({ message: "Service Name must not be blank" });
      }
      if (!description) {
        return res
          .status(406)
          .json({ message: "Description must not be blank" });
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

      const servicesInfo = {
        name: name,
        description: description,
        price: price,
        morning_time: morning_time,
        afternoon_time: afternoon_time,
      };
      console.log(servicesInfo, "servicesInfo");
      const newService = await servicesModel.create(servicesInfo);
      res.status(200).json({ message: "Service Added", data: servicesInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // // 4. Delete Service
  // async deleteService(req, res) {
  //   try {
  //     const paymentId = req.params.paymentId;
  //     const findPayment = await paymentsModel.findOne({
  //       where: { id: paymentId },
  //     });
  //     if (!findPayment) {
  //       return res.status(404).json({ message: "Payment ID Not Found" });
  //     } else {
  //       const deletePayment = await paymentsModel.destroy({
  //         where: { id: paymentId },
  //       });
  //       return res
  //         .status(200)
  //         .json({ message: "Payment Deleted", dataDeleted: findPayment });
  //     }
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // }

  // // 5. Update Service
  // async updateService(req, res) {
  //   const { cardholder_name, card_number, expiry_date, cvv, balance } =
  //     req.body;
  //   try {
  //     const paymentId = req.params.paymentId;
  //     const findPayment = await paymentsModel.findOne({
  //       where: { id: paymentId },
  //     });

  //     if (!findPayment) {
  //       return res.status(404).json({ message: "Payment ID Not Found" });
  //     }
  //     const dataPayment = findPayment.dataValues;

  //     if (card_number.toString().length !== 16) {
  //       return res
  //         .status(406)
  //         .json({ message: "Card Number length must = 16" });
  //     }

  //     if (cvv.toString().length !== 3) {
  //       return res.status(406).json({ message: "CVV length must = 3" });
  //     }
  //     if (balance < 0) {
  //       return res.status(406).json({ message: "Balance must not be < 0" });
  //     }

  //     const paymentInfo = {
  //       cardholder_name: !cardholder_name
  //         ? dataPayment.cardholder_name
  //         : cardholder_name,
  //       card_number: !card_number ? dataPayment.card_number : card_number,
  //       expiry_date: !expiry_date ? dataPayment.expiry_date : expiry_date,
  //       cvv: !cvv ? dataPayment.cvv : cvv,
  //       balance: !balance ? dataPayment.balance : balance,
  //     };

  //     const updatedPayment = await paymentsModel.update(paymentInfo, {
  //       where: { id: paymentId },
  //     });
  //     return res
  //       .status(200)
  //       .json({ message: "Payment Updated", dateUpdated: paymentInfo });
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // }
}
module.exports = new ServicesController();
