import { Heading, Box, Spacer, Text, Flex, Avatar } from "@yamada-ui/react";
import { hc } from "hono/client";
import { AppType } from "../../api/[...route]/route";
import { convertToJST } from "@/app/functions/convertToJst";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const client = hc<AppType>("http://localhost:3000/");
  const response = await client.api.article[":id"].$get({ param: { id: id } });
  const article = await response.json();
  if (!article) {
    notFound();
  }

  return (
    <Flex w="full" gap="md">
      <Spacer />
      <Box w={1200} mt={30} ml={30}>
        <Heading fontSize={25} pt={5}>
          {article?.title}
        </Heading>
        <Box pt={5} alignItems="center" display="flex" h={10}>
          <Avatar src="https://avatars.githubusercontent.com/u/84060430?v=4" />
          <Text>{article?.user.name}</Text>
          <Text pl={7}>{convertToJST(article?.updateAt as string)}</Text>
        </Box>
        <Text borderTop="0.1rem solid gray" mt={35} pt={5}>
          {article?.content}
        </Text>
      </Box>
      <Spacer />
    </Flex>
  );
}
