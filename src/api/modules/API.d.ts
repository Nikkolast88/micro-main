/* eslint-disable @typescript-eslint/no-unused-vars */
namespace API {
  namespace User {
    export type TLogin = {
      loginName: string;
      authPass: string;
      verify: string;
    };
    export type TVerify = {
      movedX: number;
      rand: string;
    };
  }
}
