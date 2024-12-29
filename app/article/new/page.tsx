import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Spacer,
  Textarea,
} from "@yamada-ui/react";
import { postAction } from "./postAction";

export default function Page() {
  return (
    <Flex w="full" gap="md">
      <Spacer />
      <Box w={1200} mt={30}>
        <form action={postAction}>
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
