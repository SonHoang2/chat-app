import { IMAGES_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

export const ChatLeftPanel = ({ chatState, user }) => {
    const navigate = useNavigate();
    
    const getLastSeenTime = (timestamp) => {
        if (!timestamp) return "";

        const now = new Date();
        const lastSeen = new Date(timestamp);

        const diffInSeconds = Math.floor((now - lastSeen) / 1000);
        if (diffInSeconds < 60) return `last seen ${diffInSeconds} sec ago`;
        if (diffInSeconds < 3600) return `last seen ${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `last seen ${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `last seen ${Math.floor(diffInSeconds / 86400)} days ago`;
        return `last seen ${Math.floor(diffInSeconds / 604800)} weeks ago`;
    };

    return (
        <div className="rounded-lg p-2 bg-white me-4 w-3/12">
            <h1 className="text-2xl font-bold p-3">Chats</h1>
            <div className="flex my-4 relative m-3">
                <input
                    type="text"
                    className="flex-grow bg-gray-100 ps-10 py-2 rounded-3xl focus:outline-none caret-blue-500 w-full"
                    placeholder="Search"
                />
                <span className="material-symbols-outlined absolute text-gray-400 text-xl h-full ms-3 flex items-center">
                    search
                </span>
            </div>
            <div className="flex flex-col">
                {chatState.conversations.map((conv) => {
                    const otherUser = conv.conversation.convParticipants[0].user;
                    const message = conv.conversation.messages[0];
                    return (
                        <div
                            key={conv.conversationId} className="p-3 flex items-center cursor-pointer hover:bg-gray-100 rounded-md"
                            onClick={() => navigate(`/chat/${conv.conversationId}`)}
                        >
                            <div>
                                <img className="inline-block size-12 rounded-full ring-0" src={`${IMAGES_URL}/${otherUser.avatar}`} alt="" />
                            </div>
                            <div className="flex flex-col ms-2">
                                <span className="text-base font-bold">{otherUser.firstName + " " + otherUser.lastName}</span>
                                <span className="text-sm text-gray-500">
                                    {message ?
                                        message.senderId === user.id ?
                                            "You: " + message.content :
                                            message.content
                                        : "No message yet"
                                    }
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}