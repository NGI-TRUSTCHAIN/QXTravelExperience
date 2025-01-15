import ChatList from "@/components/custom/chat/chat-list";
import NavbarLayout from "@/components/custom/navbar-layout";
import { navbarActions } from "@/constants/navbar";

const ChatPage = () => {


  return (
    <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
      <NavbarLayout
        actions={navbarActions}
        navigationLink={true}
      />
      {/* <ChatLayout /> */}
      <ChatList />
    </div>
  );
};

export default ChatPage;