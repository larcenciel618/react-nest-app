import React, { ReactNode, useEffect } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import {
  AuthenticateProvider,
  useAuthenticate,
} from "@/context/useAuthenticate";
import { useRouter } from "next/router";
import { useAPIAuthenticate } from "@/hooks/Auth/useAPIAuthenticate";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, authenticate, setUser } = useAuthenticate();
  const { mutate: mutateAuthenticate, isLoading } = useAPIAuthenticate({
    onSuccess: (userData) => {
      if (userData && userData.id) {
        authenticate();
        setUser(userData);
        if (
          router.pathname === "/login" ||
          router.pathname === "/register" ||
          router.pathname === "/register/sendEmail" ||
          router.pathname === "/forgetPassword/sendEmail" ||
          router.pathname === "/forgetPassword/updatePassord" ||
          router.pathname === "/updatePassord" ||
          router.pathname === "/register/checkAuthCode"
        ) {
          router.push("/");
        }
      }
    },
  });

  useEffect(() => {
    mutateAuthenticate();
  }, [mutateAuthenticate]);

  return children as React.ReactElement;
};

function App({ Component, pageProps }: AppProps) {
  const theme = {
    global: {
      "html, body": {
        background: "#f9fafb",
        lineHeight: "100%",
        fontFamily:
          "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif",
      },
    },
    components: {
      Button: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            bg: "none",
          },
        },
      },
      Link: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
          _hover: { textDecoration: "none" },
        },
      },
      Tab: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
      Checkbox: {
        parts: ["control"],
        baseStyle: {
          control: {
            _focus: {
              boxShadow: "none",
            },
            _checked: {
              _disabled: {
                bg: "red.100",
              },
            },
          },
        },
      },
      Modal: {
        variants: {
          addStampVariant: {
            dialog: {
              maxWidth: ["95vw", "80vw", "80vw"],
              minWidth: "70vw",
              bg: "#F2F5FB",
            },
          },
        },
      },
    },
  };
  const customTheme = extendTheme(theme);
  const queryClient = new QueryClient();
  return (
    <AuthenticateProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider theme={customTheme}>
            {/* <Home /> */}
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </AuthenticateProvider>
  );
}

export default App;
