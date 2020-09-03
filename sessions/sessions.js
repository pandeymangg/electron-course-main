const { app, BrowserWindow, session } = require('electron');

let mainWindow, secWindow;

const createWindow = () => {
    let secSession = session.fromPartition('partition1');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        x: 100,
        y: 100,
        webPreferences: {
            nodeIntegration: true
        }
    })

    secWindow = new BrowserWindow({
        width: 600,
        height: 400,
        x: 200,
        y: 200,
        webPreferences: {
            nodeIntegration: true,
            session: secSession
        }
    })


    let sessionMain = mainWindow.webContents.session;
    let sessionSec = secWindow.webContents.session;

    //  THIS RETURNS TRUE BECAUSE ELECTRON HAS A SESSION IN THE MAIN PROCESS WHICH IS 
    //  PASSED ON TO EVERY BROWSER WINDOW.

    console.log(sessionMain === sessionSec);

    //  THE SESSION WHICH IS SHARED BETWEEN WINDOWS IS THE DEFAULT SESSION: 
    let defaultSession = session.defaultSession;
    console.log(sessionMain === defaultSession);

    mainWindow.loadFile('./index.html');
    secWindow.loadFile('./index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
    
    secWindow.on('closed', () => {
        secWindow = null;
    })


    //  SESSIONS ACCESS: 
    let sessionCopy = mainWindow.webContents.session;

    //console.log(session);

}

app.on('ready', () => {
    createWindow();
})