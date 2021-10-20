/* eslint-disable @typescript-eslint/no-unused-vars */
namespace DTO {
  namespace User {
    export type TUser = {
      token: string;
      forceUpdPass: string;
    };
    export type TCaptcha = {
      yPosition: number;
      rand: string;
      srcImage: string;
      cutImage: string;
      puzzleYAxis: string;
    };
  }
}
