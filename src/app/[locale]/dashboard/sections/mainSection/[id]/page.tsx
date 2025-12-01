import MainSectionForm from "@/components/AdminActionUi/Sections/MainSection/MainSectionForm";
import prismadb from "@/lib/prismaDB/prismadb";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MainSectionPage({ params }: PageProps) {
  // For new brand creation
  if ((await params).id === "new") {
    return (
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <MainSectionForm initialData={null} />
        </div>
      </div>
    );
  }

  const hero = await prismadb.mainSection.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      sectionImages: true,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MainSectionForm initialData={hero} />
      </div>
    </div>
  );
}
