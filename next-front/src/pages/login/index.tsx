import HeaderWithTab from "@/components/HeaderWithTab";
import InputWithLabel from "@/components/InputWithLabel";
import { useAuthenticate } from "@/context/useAuthenticate";
import { LoginRequest, useAPILogin } from "@/hooks/Auth/useAPILogin";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { setUser, authenticate } = useAuthenticate();
  const { mutate: login } = useAPILogin({
    onSuccess: (data) => {
      console.log("userName: ", data.lastName, " ", data.firstName);
      console.log("userToken: ", data.token);
      const userName = data.lastName + " " + data.firstName;
      setUser(data);
      const asyncLocalStorage = {
        setItem: async function (key: string, value: string) {
          return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
          });
        },
        getItem: async function (key: string): Promise<string> {
          return Promise.resolve().then(function () {
            return localStorage.getItem(key) || "";
          });
        },
      };

      // await setLocalStorage();
      asyncLocalStorage
        .setItem("userToken", data.token || "")
        .then(function (): Promise<string> {
          return asyncLocalStorage.getItem("userToken");
        })
        .then(function (value) {
          if (value) {
            router.push("/Home");
          }
        });
      authenticate();
      toast({
        title: `${userName}でログインしています`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (data) => {
      toast({
        title: "ログインに失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const { values, setValues, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" } as LoginRequest,
    onSubmit: () => {
      console.log("onSubmit");
      if (!values.email.length || !values.password.length) {
        console.log("Please input data");
        return;
      }
      login(values);
    },
  });
  return (
    <>
      <HeaderWithTab>
        <Box w={"50%"} alignSelf={"center"} justifyContent={"center"}>
          <InputWithLabel
            value={values.email}
            onChange={(e) => {
              setValues((v) => ({ ...v, email: e.target.value }));
            }}
            label={"email"}
            placeholder={"メールアドレス"}
          />
          <InputWithLabel
            isPassword={true}
            value={values.password}
            onChange={(e) => {
              setValues((v) => ({ ...v, password: e.target.value }));
            }}
            label={"password"}
            placeholder={"パスワード"}
          />
          <Box mt={"20px"}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              ログイン
            </Button>
          </Box>
        </Box>
      </HeaderWithTab>
    </>
  );
};

export default Login;
