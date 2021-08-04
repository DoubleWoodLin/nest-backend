// config/db.ts
const productConfig = {
  mysql: {
    port: 3306,
    host: '',
    user: '',
    password: '',
    database: '', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: '', // 密码
  },
};

const localConfig = {
  mysql: {
    port: 3306, // 端口号，默认3306
    host: '', // 主机名，本地写localhost
    user: '', // 用户名
    password: '', // 密码
    database: '', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: '', // 密码
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;
export default config;
