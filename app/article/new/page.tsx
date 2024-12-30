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

export default function Page() {
  const { page } = useLoading();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    page.start();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      postAction(formData);
      page.finish();
    });
  };

  return (
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
  );
}
