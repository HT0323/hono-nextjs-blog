import { Box, Flex, Heading, Link, Spacer, Text } from "@yamada-ui/react";

export default function NotFound() {
  return (
    <Flex w="full" gap="md">
      <Spacer />
      <Box textAlign="center" w={1200} mt={30} ml={30}>
        <Heading>404 - Not Found</Heading>
        <Text mt={10} mb={10}>
          このページはすでに削除されているか、URLが間違っている可能性があります。
        </Text>
        <Link href="/">Topへ戻る</Link>
      </Box>
      <Spacer />
    </Flex>
  );
}
