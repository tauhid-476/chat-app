import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../../src/lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
    // console.log("getUsersForSidebar");
    //logic --> get all the users except for the one who is logged in
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(201).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

//get messages betweentwo users
export const getMessages = async (req, res) => {
    // console.log("getMessages");
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        //find all the messages where im the sender or the other one is the sender
        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })
        console.log("messages are",messages);
        

        res.status(201).json(messages);

    } catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    // console.log("sendMessage");
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;
        if(!recieverId || !senderId) {
            return res.status(400).json({ error: "RecieverId and senderId are required" });
        }
        console.log(`receiverId is ${recieverId} and senderid is ${senderId}`);
        

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        const recieverSocketId = getRecieverSocketId(recieverId)

        //that is if the reciever is online , then send message only to him
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
            //useChatSTore line 55
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.error("Error in sendmessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}