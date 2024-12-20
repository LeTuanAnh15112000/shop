import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  auth: (body: { sessionToken: string, expiresAt: string }) =>
    http.post("/api/auth", body, {
      // truyển baseUrl thì nó mới hiểu là truyền lên next server
      // Không chuyền thì nó hiểu là truyền bên server backend
      baseUrl: "",
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      "/api/auth/logout",
      { force },
      {
        baseUrl: "",
        signal,
      }
    ),
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  slideSessionFormNextClientToNextServer: () =>
    http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {}
      ,
      {
        baseUrl: "",
      }
    ),
};

export default authApiRequest;
