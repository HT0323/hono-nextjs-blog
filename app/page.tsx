import {
  Heading,
  Link,
  Box,
  Button,
  HStack,
  List,
  ListItem,
  Spacer,
  Text,
  Flex,
  Avatar,
} from "@yamada-ui/react";
import { hc } from "hono/client";
import { AppType } from "./api/[...route]/route";
import { convertToJST } from "./functions/convertToJst";

export default async function Home() {
  const client = hc<AppType>("http://localhost:3000/");
  const response = await client.api.articles.$get();
  const articles = await response.json();

  return (
    <>
      <HStack>
        <Spacer />
        <Button
          mt="50px"
          mr="50px"
          colorScheme="primary"
          variant="solid"
          as={Link}
          href="/article/new"
        >
          新規作成
        </Button>
      </HStack>
      <Flex w="full" gap="md">
        <Spacer />
        <Heading w={1200} ml={30}>
          新着記事
        </Heading>
        <Spacer />
      </Flex>
      <Flex w="full" gap="md">
        <Spacer />
        <List w={1200} mt={30} ml={30}>
          {articles.map((article) => (
            <ListItem p={5} borderBottom="0.1rem solid gray" key={article.id}>
              <Link
                fontSize={25}
                lineClamp={1}
                href={`article/${article.id}`}
                pt={5}
              >
                {article.title}
              </Link>
              <Text lineClamp={3} pt={5}>
                {article.content}
              </Text>
              <Box pt={5} alignItems="center" display="flex" h={10}>
                <Avatar src="https://avatars.githubusercontent.com/u/84060430?v=4" />
                <Text> {article.user.name}</Text>
                <Text pl={7}> {convertToJST(article.updateAt)}</Text>
              </Box>
            </ListItem>
          ))}
        </List>
        <Spacer />
      </Flex>
    </>
  );
}
