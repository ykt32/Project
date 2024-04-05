import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogoutMutation } from "../../store/service/endpoints/auth.endpoint";
import { toast } from "sonner";

const Nav = () => {
  const [logoutFun] = useLogoutMutation();
  const handleLogout = async () => {
    await logoutFun();
    toast.success("Logout Success");
  };
  return (
    <div className="w-full h-20 px-52 mx-auto flex  items-center border-b  bg-white">
      <div className="  flex justify-between items-center w-full">
        <h1 className=" text-xl font-semibold">Welcome</h1>
        <div className="flex justify-center items-center gap-3">
          <button onClick={handleLogout}>Logout</button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Ykt</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Nav;
