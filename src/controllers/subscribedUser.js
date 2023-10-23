import SubscribedUser from "../models/SubscribedUsers.js";

export const getAllSubscribedUser = async (req, res) => {
  try {
    const subscribedUsers = await SubscribedUser.find();
    res.json(subscribedUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getAllSubscribedUserById = async (req, res) => {
  const { ID } = req.params;
  try {
    const subscribedUsers = await SubscribedUser.findById(ID);
  } catch {
    res.status(404).json({ message: error.message });
  }
};


export const addSubscribedUser = async (req, res) => {
  const { email } = req.body;
  try {
    const newSbuscribedUser = new SubscribedUser({ email });
    await newSbuscribedUser.save();
    res.status(200).json(newSbuscribedUser);
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};


export const deleteSubscribedUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSubscribedUser = await SubscribedUser.findByIdAndDelete(id);
    if (!deleteSubscribedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
