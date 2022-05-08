import { resolve, dirname } from 'path'
import { existsSync, mkdirSync, appendFileSync } from 'fs'

type LogType = 'info' | 'log' | 'warn' | 'error'

/**
 * Create a Logger instance to append into a different file.  
 * Set path using `logger.SavePath = "FullPath/FileName.log"`
 */
class Logger {

    /**
     * Set this logger to output or not into the server console.
     */
    public set Silent(isSilent: boolean) { this.silent = isSilent }
    private silent = false

    /**
     * Set the save path to append the logs for this instance.
     */
    public set SavePath(newSavePath: string) {
        this.savePath = newSavePath
        
        try {
            const dirPath = dirname(this.savePath)
            if (!existsSync(dirPath)) mkdirSync(dirPath)
        }
        catch(error) { console.error(`There was an error setting the logger save path:`, error) }
    }
    private savePath: string

    /**
     * Set a custom output format
     * Placeholders:
     * ```
     * {type} => 'info' | 'log' | 'warn' | 'error'  
     * {date} => Current locale date  
     * {time} => Current locale time  
     * {msg}  => Log content  
     * ```
     * @default OutputFormat = '{type} \t {date} {time} \t {msg} \r\n'
     */
    public set OutputFormat(newOutputFormat: string) { this.outputFormat = newOutputFormat }
    private outputFormat: string = '{type} \t {date} {time} \t {msg} \r\n'

    constructor(savePath?: string) {
        this.SavePath = savePath || resolve(__dirname, '../../logs/application.log')
    }

    public info(...args: any[]) {
        if (!this.silent) console.info('INFO:', ...args)
        this.append('info', ...args)
    }

    public log(...args: any[]) {
        if (!this.silent) console.log('LOG:', ...args)
        this.append('log', ...args)
    }

    public warn(...args: any[]) {
        if (!this.silent) console.warn('WARN:', ...args)
        this.append('warn', ...args)
    }

    public error(...args: any[]) {
        if (!this.silent) console.error('ERROR:', ...args)
        this.append('error', ...args)
    }

    private argsToString(args: any[]) {
        let str = ''
        let arr: string[] = []
        
        args.forEach(arg => {
            if (arg instanceof Error) {
                arr.push(arg.message, arg.stack)
            }
            else if (typeof(arg) === 'object') {
                arr.push(JSON.stringify(arg))
            }
            else {
                arr.push(String(arg))
            }
        })

        str = arr.join(' , ')
        return str
    }

    private append(type: LogType, ...args: any) {
        try {
            const now = new Date()
            let formatted = this.outputFormat
            formatted = formatted.replace('{type}', type.toUpperCase())
            formatted = formatted.replace('{date}', now.toLocaleDateString())
            formatted = formatted.replace('{time}', now.toLocaleTimeString())
            formatted = formatted.replace('{msg}', this.argsToString(args))
            appendFileSync(this.savePath, formatted, { encoding: 'utf-8' })
        }
        catch(error) {
            console.error(`There was an error appending to the logger:`, error)
        }
    }

}

/**
 * Singleton instance used for global logging
 */
const AppLogger = new Logger()

export { AppLogger, Logger }
