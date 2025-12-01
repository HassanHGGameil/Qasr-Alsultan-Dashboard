import HeroForm from "@/components/AdminActionUi/Sections/HeroSection/HeroForm/HeroForm";
import prismadb from "@/lib/prismaDB/prismadb";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  // For new brand creation
  if ((await params).id === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <HeroForm initialData={null} />
        </div>
      </div>
    );
  }

  const hero = await prismadb.hero.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      heroImages: true,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeroForm initialData={hero} />
      </div>
    </div>
  );
}
