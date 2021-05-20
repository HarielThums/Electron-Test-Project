const { app, BrowserWindow, nativeImage } = require('electron')


// Aplicando o reload na nossa aplicação com electron... ( nodemon para electron )
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
})

// criando uma janela para aplicação 
function createWindow(){

    // passando o icon presente na pasta build
    const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`)

    if (app.dock){
        app.dock.setIcon(icon)
    }
    
    // criando janela no desktop
    const win = new BrowserWindow({
        icon,
        width: 800,
        height: 600,
        webPreferences: {
            // usado para habilitar integração nodejs com frontend
            nodeIntegration: true
        }
    })
    
    // carregando janela com conteudo do index.html
    win.loadFile("index.html")
}

// metodo que vai ser chamado assim que o electron tiver sido inicializado, algumas apis só podem ser usadas após isso
app.whenReady().then(createWindow)

// evento de clicar no x para fechar a aplicação, pode ser usado para encerrar conexões com o database tbm
app.on("window-all-closed", () => {
    if (process.plataform !== "darwin"){
        app.quit()
    }
})

// eventon de clicar no icone, para dar start ao app
app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// ---------------------------------------------------------------------------- //
// A partir daqui os métodos usados pela aplicação devem ser criados/importados
// --------------------------------------------------------------------------- //