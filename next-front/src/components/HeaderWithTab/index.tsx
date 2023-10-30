import { useAuthenticate } from "@/context/useAuthenticate";
import { User } from "@/types";
import { Box, Button, Text, baseTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

export interface HeaderWithTabProps {
  isSidebar?: boolean;
  children: ReactNode;
  headerTitle?: string;
}
const HeaderWithTab: React.FC<HeaderWithTabProps> = ({
  children,
  headerTitle,
  isSidebar = false,
}) => {
  const router = useRouter();
  const { user } = useAuthenticate();
  return (
    <>
      <Box
        h={"90px"}
        w={"100%"}
        mb={"20px"}
        bg={"lightblue"}
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        // justifyContent={"center"}
      >
        <Box ml={"20px"} w={"33%"}>
          <Button
            onClick={() => router.push("/Home")}
            bg={"none"}
            _hover={{ bg: "none" }}
          >
            <Text fontSize={"28px"} color={"white"} fontWeight={"500"}>
              StudySample
            </Text>
          </Button>
        </Box>
        <Box w={"34%"} display={"flex"} justifyContent={"center"}>
          {headerTitle?.length && (
            <Text fontWeight={"700"} fontSize={"20px"}>
              {headerTitle}
            </Text>
          )}
        </Box>
        <Box
          w={"33%"}
          alignSelf={"center"}
          display={"flex"}
          justifyContent={"end"}
          mr={"120px"}
        >
          {user?.firstName?.length ? (
            <Box display={"flex"} flexDir={"column"}>
              <Text fontWeight={"600"} color={"black"}>
                ログインユーザー
              </Text>
              <Text fontWeight={"600"} color={"black"}>
                {user.lastName + user.firstName}
              </Text>
              <Text fontWeight={"600"} color={"black"}>
                {user.email}
              </Text>
            </Box>
          ) : (
            <Text>ログインしているユーザーはいません</Text>
          )}
        </Box>
      </Box>
      <Box h={"100vh"} px={"20px"} w={"100%"}>
        {children}
      </Box>
    </>
  );
};

export default HeaderWithTab;
