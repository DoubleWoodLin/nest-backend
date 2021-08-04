import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户
   * @author Jarvey Linger
   * @date 2021-08-02
   * @param {any} username:string
   * @returns {any}
   */
  async findOne(username: string): Promise<any | undefined> {
    // const sql = `
    //   SELECT
    //     user_id userId, real_name realName, role
    //   FROM
    //     admin_user
    //   WHERE
    //     account_name = '${username}'
    // `; // 一段平淡无奇的 SQL 查询语句
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
        })
      )[0];
      return user;
    } catch (error) {
      console.log(error);
      return void 0;
    }
  }

  /**
   * 注册功能
   * @author Jarvey Linger
   * @date 2021-08-02
   * @param {any} requestBody:any
   * @returns {any}
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次输入密码不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户名已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const registerSQL = `
    INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
    VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL);
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
