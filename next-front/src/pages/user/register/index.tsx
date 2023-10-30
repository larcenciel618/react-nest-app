import React, { useRef, useState } from "react";
import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import HeaderWithTab from "../../../components/HeaderWithTab";
import { User } from "@/types";
import { useAPIGetAllUsers } from "@/hooks/User/useAPIGetAllUsers";
import { useAPIRegisterUser } from "@/hooks/User/useAPIRegisterUser";
import InputWithLabel from "@/components/InputWithLabel";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const RegisterUser: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const { mutate } = useAPIRegisterUser({
    onSuccess: (data) => {
      toast({
        title: "ユーザーの登録に成功しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/Home");
      console.log("result-in-page: ", data);
    },
  });

  const { values, setValues, validateForm, handleSubmit } = useFormik({
    initialValues: { lastName: "", firstName: "", email: "", password: "" },
    // validationSchema: signUpSchema,
    onSubmit: () => {
      console.log("onSubmit");
      if (
        !values.email.length ||
        !values.firstName.length ||
        !values.lastName.length ||
        !values.password.length
      ) {
        toast({
          title: "不足している項目があります",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      mutate(values);
    },
  });
  return (
    <>
      <HeaderWithTab>
        <Box
          display={"flex"}
          flexDir={"column"}
          w={"100%"}
          mt={"20px"}
          alignItems={"center"}
        >
          <Box w={"50%"}>
            <Text
              fontWeight={"700"}
              fontSize={"24px"}
              color={"darkgray"}
              textAlign={"center"}
              mb={"20px"}
            >
              ユーザー登録
            </Text>
            <Box mb={"10px"}>
              <InputWithLabel
                label={"姓"}
                name={"lastName"}
                placeholder="田中"
                value={values.lastName}
                onChange={(e) => {
                  setValues((v) => ({ ...v, lastName: e.target.value }));
                }}
              />
            </Box>
            <Box mb={"10px"}>
              <InputWithLabel
                name={"firstName"}
                label={"名"}
                placeholder="太郎"
                value={values.firstName}
                onChange={(e) => {
                  setValues((v) => ({ ...v, firstName: e.target.value }));
                }}
              />
            </Box>
            <Box mb={"10px"}>
              <InputWithLabel
                name={"email"}
                label={"メールアドレス"}
                placeholder="example.com"
                value={values.email}
                onChange={(e) => {
                  setValues((v) => ({ ...v, email: e.target.value }));
                }}
              />
            </Box>
            <Box mb={"10px"}>
              <InputWithLabel
                isPassword={true}
                name={"password"}
                label={"パスワード"}
                placeholder="password123"
                value={values.password}
                onChange={(e) => {
                  setValues((v) => ({ ...v, password: e.target.value }));
                }}
              />
            </Box>
            <Button mt={"10px"} onClick={() => handleSubmit()}>
              登録
            </Button>
          </Box>
        </Box>
      </HeaderWithTab>
    </>
  );
};

export default RegisterUser;
