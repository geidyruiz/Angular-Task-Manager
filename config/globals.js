// set up public array of global variables

module.exports =
{
        'db': 'mongodb+srv://GeidyRuiz:123@clustermanager.1eeyb.mongodb.net/tasks',
        ids: {
                'google': {
                        clientID: '571925223057-7hs9ljmf3ioropddm54e49bbbpsl7s3f.apps.googleusercontent.com',
                        clientSecret: 'ICCm6F2Si3MVd_OVKo-8HSqi',
                        callbackURL: 'http://localhost:3000/google/callback'
                        //callbackURL: 'https://task-manager-the2nd.herokuapp.com/google/callback'
                },
                'facebook': {
                        clientID: '284983652946610',
                        clientSecret: '3dff81e1932f00fe9d6cb0f5e22d89ca',
                        callbackURL: 'http://localhost:3000/facebook/callback'
                        //callbackURL: 'nodemon'
                }
        },
        'apiRoot': 'http://localhost:3000',
        'clientRoot': 'http://localhost:4200'
}
