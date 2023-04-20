//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


   require('dotenv').config() // permite usar las variables de entorno
   server = require('./src/app.js');
   const connectDb = require('./src/db')
   const {appConfig, dbConfig} = require('./config')
   

   async function initApp(app_config, db_config){
     try {
      await connectDb(db_config)
      server.listen(app_config.port, () => console.log(`Server listen on port:  ${app_config.port}`)); // eslint-disable-line no-console
     } catch (e) {
      console.error(e)
      process.exit(0) // si hay un error al pasarle 0 corta el proceso de node
     }
  }

  initApp(appConfig,dbConfig)


