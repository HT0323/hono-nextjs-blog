"use server";

import { redirect } from "next/navigation";
import { hc } from "hono/client";
import { AppType } from "../../api/[...route]/route";

export async function postAction(formData: FormData) {
  const client = hc<AppType>("http://localhost:3000/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await client.api.articles.$post({
    json: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });
  response.ok && redirect("/");
}
