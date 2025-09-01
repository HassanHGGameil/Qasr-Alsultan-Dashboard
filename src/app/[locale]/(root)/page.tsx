import Heading from "@/components/common/Heading/Heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import { formater } from "@/lib/utils/utils";
import { getTotalRevenue } from "@/lib/Actions/getTotalRevenue";
import { getSalesCount } from "@/lib/Actions/getSalesCount";
import { getStockCount } from "@/lib/Actions/getStockCount";
import { getGraphRevenue } from "@/lib/Actions/getGraphRevenue";
import { getAllUsersCount } from "@/lib/Actions/getAllUsers";
import getCurrentUser from "@/actions/getCurrentUser";
import Overview from "@/components/PagesActionUi/Overview/Overview";
// import Overview from "@/components/PagesActionUi/Overview/Overview";

const DashboardPage = async () => {
  const totalRevenue = await getTotalRevenue();
  const salesCount = await getSalesCount();
  const stockCount = await getStockCount();
  const userCountInApp = await getAllUsersCount();

  const graphRevenue = await getGraphRevenue();

  const currentUser = await getCurrentUser();

  const isManger = currentUser?.role === "OWNER" || currentUser?.role === "MANAGER";

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
          <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium ">
                  Toatl Revenue
                </CardTitle>

                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">
                  {formater.format(Number(totalRevenue))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium ">Sales</CardTitle>

                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">+{salesCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium ">
                  Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">+{stockCount}</div>
              </CardContent>
            </Card>

            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium ">
                  Users In Website
                </CardTitle>

                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">+{userCountInApp}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium ">
                  Users In App
                </CardTitle>

                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">+{userCountInApp}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-4 my-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              {/* <CardTitle className="text-sm font-medium ">Overview</CardTitle> */}
            </CardHeader>

            <CardContent>
              <div className="pl-2">
                <Overview data={graphRevenue} />
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="px-8 text-blue-500">
          You Are Not A Manger To Showing Overview Data
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
