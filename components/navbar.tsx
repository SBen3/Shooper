import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { Switcher } from "./switcher";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const Navbar = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className=" bg-white shadow">
      <div className="flex flex-row justify-between max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-12">
          <Switcher items={stores} />
          <MainNav />
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};
