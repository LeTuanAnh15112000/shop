import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
// import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      // truyển baseUrl thì nó mới hiểu là truyền lên next server
      // Không chuyền thì nó hiểu là truyền bên server backend
      baseUrl: "",
    }),
  // logoutFromNextServerToServer: (sessionToken: string) =>
  //   http.post<MessageResType>("/auth/logout", {}, {
  //     headers: {
  //       Authorization: `Bearer ${sessionToken}`,
  //     },
  //   }),
  // logoutFromNextClientToNextClient: () =>
  //   http.post<MessageResType>("/api/auth/logout", {}, {
  //     headers: {
  //       baseUrl: "",
  //     },
  //   }),
};

export default authApiRequest;
