// @packages
import { useSelector } from "react-redux";
// @scripts
import CreatePost from "../../components/createPostForm";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import "./style.css";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        {user?.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
