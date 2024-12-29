import { Heading, Box, Spacer, Text, Flex, Avatar } from "@yamada-ui/react";
import { hc } from "hono/client";
import { AppType } from "../../api/[...route]/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const client = hc<AppType>("http://localhost:3000/");
  const response = await client.api.article[":id"].$get({ param: { id: id } });
  const article = await response.json();

  return (
    <Flex w="full" gap="md">
      <Spacer />
      <Box w={1200} mt={30} ml={30}>
        <Heading fontSize={25} pt={5}>
          {article.title}
        </Heading>
        <Box pt={5} alignItems="center" display="flex" h={10}>
          <Avatar src="https://avatars.githubusercontent.com/u/84060430?v=4" />
          <Text> 山田太郎</Text>
          <Text pl={7}> 2021/11/10 12:12</Text>
        </Box>
        <Text borderTop="0.1rem solid gray" mt={35} pt={5}>
          OSS（オープンソースソフトウェア）開発に参加することは、技術力向上だけでなく、業界ネットワークを広げる絶好の機会です。例えば、GitHubで気になるプロジェクトをフォークし、小さなバグ修正やドキュメントの改善から始めると、簡単にコミュニティに貢献できます。また、英語力やコードレビューの経験も自然と身につきます。このブログでは、初心者が参加しやすいプロジェクトの見つけ方や、コントリビューションの手順を詳しく解説します。成功事例も交えながら、具体的なステップを紹介します。
        </Text>
      </Box>
      <Spacer />
    </Flex>
  );
}
