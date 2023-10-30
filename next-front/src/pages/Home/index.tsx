import React, { useRef, useState } from "react";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import HeaderWithTab from "@/components/HeaderWithTab";
import { User } from "@/types";
import { useAPIGetAllUsers } from "@/hooks/User/useAPIGetAllUsers";
import { useAPIRegisterUser } from "@/hooks/User/useAPIRegisterUser";
import { useRouter } from "next/router";
import { useAuthenticate } from "@/context/useAuthenticate";

const Home: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<User[]>();
  const router = useRouter();

  const { refetch } = useAPIGetAllUsers({
    onSuccess(data) {
      setUsers(data);
    },
  });
  const { user } = useAuthenticate();

  // const handleRegister = () => {
  //   console.log("last: ", lastNameRef.current?.value);
  //   console.log("first: ", firstNameRef.current?.value);
  //   const first = firstNameRef.current?.value;
  //   const last = lastNameRef.current?.value;
  //   if (!last?.length || !first?.length) {
  //     console.log("returned");
  //     return;
  //   }
  //   mutate({ firstName: first, lastName: last });
  //   console.log("successed");
  // };

  return (
    <>
      <HeaderWithTab>
        <Box display={"flex"} flexDir={"row"}>
          <Box w={"50%"}>
            <Box mb={"20px"}>
              <Text fontWeight={"700"}>メニュー</Text>
              <Text>{user?.firstName}</Text>
              <Text>aaaa</Text>
            </Box>
            <Button
              h={"130px"}
              w={"130px"}
              rounded={"20px"}
              bg={"white"}
              borderWidth={1}
              borderColor={"black"}
              onClick={() => router.push("/user/register")}
            >
              ユーザー登録
            </Button>
          </Box>
          {/* <Box display={"flex"} flexDir={"row"}>
            <Box w={"50%"} mt={"20px"}>
            <Box>
              <Text mb={"2px"}>lastName</Text>
              <Input name={"lastName"} ref={lastNameRef} placeholder="田中" />
            </Box>
            <Box>
              <Text mb={"2px"}>firstName</Text>
              <Input name={"firstName"} ref={firstNameRef} placeholder="太郎" />
            </Box>
            <Button mt={"10px"} onClick={handleRegister}>
              登録
            </Button>
          </Box>
          </Box> */}
          <Box w={"50%"} px={"20px"}>
            <Box mb={"20px"}>
              <Text fontWeight={"700"}>ユーザー一覧</Text>
            </Box>
            {users?.map((u, index) => (
              <Box
                key={index}
                display={"flex"}
                alignItems={"center"}
                borderWidth={1}
                borderColor={"green"}
                mb={"6px"}
                h={"40px"}
                rounded={"10px"}
              >
                <Box ml={"20px"} display={"flex"} flexDir={"row"} w={"40%"}>
                  <Text fontWeight={"600"}>名前: </Text>
                  <Text ml={"20px"}>{u.lastName + " " + u.firstName}</Text>
                </Box>
                <Box ml={"20px"} display={"flex"} flexDir={"row"} w={"60%"}>
                  <Text fontWeight={"600"}>メールアドレス: </Text>
                  <Text ml={"20px"}>{u.email}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </HeaderWithTab>
    </>
  );
};

export default Home;
