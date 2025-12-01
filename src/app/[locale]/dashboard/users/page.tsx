import { format } from "date-fns";
import prismadb from "@/lib/prismaDB/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import UserColumnType from "@/types/UserColumnType";
import UsersClient from "@/components/AdminActionUi/Users/UsersClient/UsersClient";

const UsersPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>Loading...</p>; // Or handle loading state accordingly
  }

  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc", // Optional: Order by creation date
    },
  });

  const formattedUsers: UserColumnType[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    userPlatform: item.userPlatform,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  const isManager =
    currentUser.role === "OWNER" || currentUser.role === "MANAGER" || currentUser.role === "DEVELOPER";

  return isManager ? (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  ) : (
    <div className="px-8 text-blue-500 py-5">
      You Are Not A Manger To Showing Users Data
    </div>
  );
};

export default UsersPage;
