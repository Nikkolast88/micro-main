/* eslint-disable @typescript-eslint/no-unused-vars */
namespace DTO {
  namespace User {
    export type TUser = {
      token: string;
      forceUpdPass: string;
    };
    export type TCaptcha = {
      yPosition: number; // 图片验证码的y坐标
      rand: string; // 验证码的随机数
      srcImage: string; // 验证码图片的base64编码
      cutImage: string;
      puzzleYAxis: string;
    };
  }
}
