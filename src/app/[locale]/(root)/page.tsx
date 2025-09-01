import Heading from "@/components/common/Heading/Heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";
import { formater } from "@/lib/utils/utils";
import { getTotalRevenue } from "@/lib/Actions/getTotalRevenue";
import { getSalesCount } from "@/lib/Actions/getSalesCount";
import { getStockCount } from "@/lib/Actions/getStockCount";
import { getGraphRevenue } from "@/lib/Actions/getGraphRevenue";
import { getAllUsersCount } from "@/lib/Actions/getAllUsers";
import { getAllUsersFromWebsite } from "@/lib/Actions/getAllUsersFromWebsite";
import { getAllUsersFromApp } from "@/lib/Actions/getUsersFromApp";
import getCurrentUser from "@/actions/getCurrentUser";
import Overview from "@/components/PagesActionUi/Overview/Overview";
import { CiLaptop, CiMobile1 } from "react-icons/ci";
import HeadingTwo from "@/components/common/Heading/HeadingTow";

const DashboardPage = async () => {
  const totalRevenue = await getTotalRevenue();
  const salesCount = await getSalesCount();
  const stockCount = await getStockCount();
  const allUsersCount = await getAllUsersCount();
  const userCountInApp = await getAllUsersFromApp();
  const userCountInWebsite = await getAllUsersFromWebsite();
  const graphRevenue = await getGraphRevenue();
  const currentUser = await getCurrentUser();

  const isManger =
    currentUser?.role === "OWNER" || currentUser?.role === "MANAGER";

  return (
    <section className="container flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Qasr Al-Sultan Overview"
          description="Overview of your store"
        />
      </div>
      <Separator />

      {isManger ? (
        <>
          {/* Financial Overview */}
          <div className="mt-8">
            <HeadingTwo
              title="Financial"
              description="Key financial metrics of your store"
            />
            <Separator className="my-4" />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formater.format(Number(totalRevenue))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{salesCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stockCount}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Users Overview */}
          <div className="mt-12">
            <HeadingTwo
              title="Users"
              description="Track user growth across platforms"
            />
            <Separator className="my-4" />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{allUsersCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Website Users</CardTitle>
                  <CiLaptop className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{userCountInWebsite}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
                  <CiMobile1 className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{userCountInApp}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="mt-12">
            <HeadingTwo
              title="Revenue Trends"
              description="Visual representation of revenue over time"
            />
            <Separator className="my-4" />

            <Card className="col-span-4">
              <CardContent>
                <div className="pl-2">
                  <Overview data={graphRevenue} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="px-8 text-blue-500">
          You are not a manager, so you cannot view overview data.
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
