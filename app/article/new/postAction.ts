"use server";

import { redirect } from "next/navigation";

export async function postAction(formData: FormData) {
  const rawFormData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  redirect("/");
}
