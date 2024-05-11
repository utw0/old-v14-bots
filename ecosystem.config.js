let sunucu = "Luhux"
module.exports = {
  apps: [
    {
      name: sunucu+"-Mainframe",
      namespace: "Luhux",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Bots/Main"
    },
     {
       name: sunucu+"-Stats",
       namespace: "Luhux",
       script: 'main.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Stats"
     },
     {
       name: sunucu+"-Prosecutor",
       namespace: "Luhux",
       script: 'main.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Prosecutor"
     },
     {
       name: sunucu+"-Guard",
       namespace: "Luhux",
       script: 'main.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Guard"
     },
     {
       name: sunucu+"-GuardTwo",
       namespace: "Luhux",
       script: 'main.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/GuardTwo"
     },
     {
       name: sunucu+"-GuardThree",
       namespace: "Luhux",
       script: 'main.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/GuardThree"
     },
     /*-----------------------------------*/
     {
       name: sunucu+"-WelcomeOne",
       namespace: "Luhux",
       script: 'welcomeOne.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Welcomes"
     },
     {
       name: sunucu+"-WelcomeTwo",
       namespace: "Luhux",
       script: 'welcomeTwo.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Welcomes"
     },
     {
       name: sunucu+"-WelcomeThree",
       namespace: "Luhux",
       script: 'welcomeThree.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Welcomes"
     }
  ]
};