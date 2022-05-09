import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, SyntheticEvent, useState } from "react";
// import { useSWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signup" | "signin" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await auth(mode, { email, password });
    setLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex justify="center" align="center" height="100px">
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh-100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={submitHandler}>
            <Input placeholder="email" type="emial" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button
              type="submit"
              bg="green.500"
              isLoading={loading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
