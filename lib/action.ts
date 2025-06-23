"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/wirte-client";
import slugify from "slugify";
// import { writeClient } from "@/sanity/lib/write-client"; // make sure path is correct

export const createPitch = async (
  state: unknown,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  // Extract form values (excluding pitch)
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      _type: "startup",
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.id,
      },
      pitch,
      views: 0,             // ← ensure views is initialized
    };

    const result = await writeClient .create(startup);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("createPitch error:", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
