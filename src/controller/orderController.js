const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.addOrder = (req, res) => {
    Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (result) {
            req.body.user = req.user._id;
            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true,
                },
                {
                    type: "packed",
                    isCompleted: false,
                },
                {
                    type: "shipped",
                    isCompleted: false,
                },
                {
                    type: "delivered",
                    isCompleted: false,
                },
            ];
            const order = new Order(req.body);
            order.save((error, order) => {
                if (error) {
                    return res.status(400).json(error)
                }
                if (order) {
                    return res.status(200).json({ order })
                }
            })
        }
    })
};

exports.getOrders = (req, res) => {
    Order.find({ user: req.user._id })
        .select("_id paymentStatus items")
        .populate("items.productId", "_id name pictures")
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json(error)
            }
            if (orders) {
                return res.status(200).json({ orders })
            }
        })
}

exports.updateOrder = (req, res) => {
    Order.updateOne(
      { _id: req.body.orderId, "orderStatus.type": req.body.type },
      {
        $set: {
          "orderStatus.$": [
            { type: req.body.type, date: new Date(), isCompleted: true },
          ],
        },
      }
    ).exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(201).json({ order });
      }
    });
  };