import { useState } from 'react';
import { message, user } from '../../types';
import './styles.css';

type ChatWindowProps = {
    users: user[],
    messages: message[]
    sendMessage: (value: string | undefined) => void;
}

export default function ChatWindow(props: ChatWindowProps) {
    const { users, messages, sendMessage } = props;
    const [unsentMessage, setUnsentMessage] = useState<string>();

    const handleSendMessage = () => {
        sendMessage(unsentMessage);
        setUnsentMessage("");
    }

    return (
        <>
            <div className="users-display-div">
                {users.map((user: user) => {
                    return (
                        <div key={user.userID}>
                            {user.username[0].toLocaleUpperCase()}
                        </div>)
                })}
            </div >
            <div className="chat-div">
                {messages.map((message, i) => {
                    return (
                        <div key={i}>
                            {message.username}
                            {message.content}
                        </div>
                    )
                })}
                <textarea style={{ "width": "70%" }}
                    value={unsentMessage}
                    onChange={e => setUnsentMessage(e.target.value)}
                />
                <input type="submit" value="SEND" onClick={_ => handleSendMessage()} />
            </div>
        </>


    );
}