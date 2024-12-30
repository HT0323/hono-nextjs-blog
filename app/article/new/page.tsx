"use client";

import { useTransition } from "react";
import {
  Box,
  useLoading,
  Button,
  Flex,
  FormControl,
  Input,
  Spacer,
  Textarea,
} from "@yamada-ui/react";
import { postAction } from "./postAction";
import { redirect } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Page() {
  const { page } = useLoading();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    page.start();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await postAction(formData);
      if (result) {
        page.finish();
        toast.success("記事を作成しました。");
        setTimeout(() => {
          redirect("/");
        }, 2000);
      } else {
        toast.error("記事の作成に失敗しました。");
        page.finish();
      }
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Flex w="full" gap="md">
        <Spacer />
        <Box w={1200} mt={30}>
          <form onSubmit={handleSubmit}>
            <FormControl label="Title" required>
              <Input type="text" name="title" mb={5} />
            </FormControl>
            <FormControl label="Content" required>
              <Textarea autosize minRows={10} name="content" mb={5} />
            </FormControl>
            <Button colorScheme="primary" type="submit">
              作成
            </Button>
          </form>
        </Box>
        <Spacer />
      </Flex>
    </>
  );
}
