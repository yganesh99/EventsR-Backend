// controllers/userAddressController.js

const UserAddress = require('../models/userAddress');

const addUserAddress = async (req, res) => {
  try {
    const userAddress = new UserAddress(req.body);
    await userAddress.save();
    res.status(201).json(userAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findById(req.params.userAddressId);
    if (!userAddress) {
      return res.status(404).json({ error: 'User Address not found' });
    }
    res.json(userAddress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findByIdAndUpdate(req.params.userAddressId, req.body, { new: true });
    if (!userAddress) {
      return res.status(404).json({ error: 'User Address not found' });
    }
    res.json(userAddress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findByIdAndRemove(req.params.userId);
    if (!userAddress) {
      return res.status(404).json({ error: 'User Address not found' });
    }
    res.json({ message: 'User Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



module.exports = {
  addUserAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress,
};