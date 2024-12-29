"use client";
import { useEffect, useState } from "react";
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

export default function Home() {
  const [articles, setArticles] =
    useState<
      { title: string; content: string; uploadTime: string; userName: string }[]
    >();

  useEffect(() => {
    const fetchData = async () => {
      const client = hc<AppType>("/");
      const res = await client.api.articles.$get();
      setArticles(await res.json());
    };
    fetchData();
  }, []);

  if (!articles) return <p>Loading...</p>;

  return (
    <>
      <HStack>
        <Spacer />
        <Button mt="50px" mr="50px" colorScheme="primary" variant="solid">
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
          {articles.map((article, index) => (
            <ListItem p={5} borderBottom="0.1rem solid gray" key={index}>
              <Link fontSize={25} lineClamp={1} href="#" pt={5}>
                {article.title}
              </Link>
              <Text lineClamp={3} pt={5}>
                {article.content}
              </Text>
              <Box pt={5} alignItems="center" display="flex" h={10}>
                <Avatar src="https://avatars.githubusercontent.com/u/84060430?v=4" />
                <Text> {article.userName}</Text>
                <Text pl={7}> {article.uploadTime}</Text>
              </Box>
            </ListItem>
          ))}
        </List>
        <Spacer />
      </Flex>
    </>
  );
}
