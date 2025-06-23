import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import ViewClient from "./ViewClient"; // 👈 client component ko import karo

type Props = {
  id: string;
};

const View = async ({ id }: Props) => {
  const { views: totalViews } = await client.fetch(STARTUP_VIEWS_QUERY, { id });

  return <ViewClient id={id} totalViews={totalViews} />;
};

export default View;
