const fs = require('fs')

const PATH_ROUTES_INDEX = 'src/routes/index.js'
const PATH_ROUTES = 'src/routes/api'
const PATH_CONTROLLERS = 'src/controllers'
const PATH_SERVICES = 'src/services'
const PATH_REPOSITORIES = 'src/repositories'

const toSnakeCase = (name) => {
  // Remove upper case characters for _
  let formatName = name.replace(/([a-z])([A-Z])/g, '$1_$2')

  // Remove - for _
  formatName = formatName.replace(/-/g, '_').toLowerCase()

  // Remove initial a final _
  formatName = formatName.replace(/^_+|_+$/g, '')

  // Remove accents, swap ñ for n, etc
  const from = 'ãàáäâáèéëêìíïîõòóöôùúüûñç'
  const to = 'aaaaaeeeeeiiiiooooouuuunc'
  for (let i = 0, l = from.length; i < l; i++) {
    formatName = formatName.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  return formatName
}

const toCamelCase = (string) => {
  return string
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase())
}

const toPascalCase = (string) => {
  return string
    .split('_') // Divide el string en palabras usando guiones bajos como separadores
    .filter(word => word.length > 0) // Filtra las palabras vacías
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
    .join('') // Une las palabras sin espacios
}

const editFile = (file, indexEdit, newCode) => {
  return file.slice(0, indexEdit) + '\n' + newCode + file.slice(indexEdit)
}

const findLastIndexCode = (file, regex) => {
  const matches = file.match(regex)
  const lastMatch = matches[matches.length - 1]
  return file.lastIndexOf(lastMatch) + lastMatch.length
}

const editRouteIndex = (file, codeImport, routerUse) => {
  let newFile = file

  // Find the last require
  let regex = /const (?:[\w\s]*=)?\s*(require\('.\/api\/\w+'\))/g
  let lastIndex = findLastIndexCode(newFile, regex)
  newFile = editFile(newFile, lastIndex, codeImport)

  // Find the last router.use
  regex = /router\.use\((['"]).+?\1,\s*.+?\)/g
  lastIndex = findLastIndexCode(newFile, regex)
  newFile = editFile(newFile, lastIndex, routerUse)

  fs.writeFile(PATH_ROUTES_INDEX, newFile, 'utf8', (error) => {
    if (error) {
      console.error('Error al escribir en el archivo:', error)
    }
  })
}

const readRouteIndex = (fileName) => {
  fs.readFile(PATH_ROUTES_INDEX, 'utf8', (error, data) => {
    if (error) {
      console.error('Error al leer el archivo:', error)
      return
    }
    // Format code import route
    const varRouter = `${toCamelCase(fileName)}Router`
    const require = `require('./api/${fileName}')`
    const codeImport = `const ${varRouter} = ${require}`

    // Format code use route
    const routerUse = `router.use('/${fileName.replace('_', '-')}', ${varRouter})`

    editRouteIndex(data, codeImport, routerUse)
  })
}

const createRouteFile = (fileName) => {
  const varController = `${toCamelCase(fileName)}Controller`
  const require = `require('../../controllers/${fileName}')`
  const codeImport = `const ${varController} = ${require}`

  const newFileRoute = "const router = require('express').Router()" + '\n' +
  codeImport + '\n' + '\n' +
  `router.get('/', ${varController}.index)` + '\n' + '\n' +
  'module.exports = router' + '\n'

  fs.writeFile(`${PATH_ROUTES}/${fileName}.js`, newFileRoute, 'utf8', (error) => {
    if (error) {
      console.error('Error al escribir en el archivo:', error)
    }
  })
}

const createControllerFile = (fileName) => {
  const pascalCase = toPascalCase(fileName)
  const classService = `${pascalCase}Service`
  const classController = `${pascalCase}Controller`
  const varController = `${toCamelCase(fileName)}Controller`

  const require = `require('../services/${fileName}_service')`
  const codeImport = `const ${classService} = ${require}`

  const newFileController = "const Controller = require('../decorators/controller')" + '\n' +
  codeImport + '\n' + '\n' +
  `class ${classController} {` + '\n' +
  '  constructor () {' + '\n' +
  `    this.service = new ${classService}()` + '\n' +
  '  }' + '\n' + '\n' +
  '  async index () {' + '\n' +
  '    const data = await this.service.index()' + '\n' +
  `    return [data, 'Get data ${fileName.replace('_', '-')} successfully']` + '\n' +
  '  }' + '\n' +
  '}' + '\n' + '\n' +
  `const ${varController} = new ${classController}()` + '\n' +
  `const controller = new Controller(${varController})` + '\n' + '\n' +
  'module.exports = controller' + '\n'

  fs.writeFile(`${PATH_CONTROLLERS}/${fileName}.js`, newFileController, 'utf8', (error) => {
    if (error) {
      console.error('Error al escribir en el archivo:', error)
    }
  })
}

const createServiceFile = (fileName, withRepository) => {
  const pascalCase = toPascalCase(fileName)
  const classService = `${pascalCase}Service`
  const classRepository = `${pascalCase}Repository`

  const require = `require('../repositories/${fileName}_repository')`
  const codeImport = withRepository ? `const ${classRepository} = ${require}\n` : ''

  const contructor = withRepository
    ? '  constructor () {' + '\n' +
  `    super(new ${classRepository}())` + '\n' +
  `    this.repository = new ${classRepository}()` + '\n' +
  '  }' + '\n' + '\n'
    : ''

  const newFileService = "const Service = require('./service')" + '\n' +
  codeImport + '\n' +
    `class ${classService} extends Service {` + '\n' +
    contructor +
    '  async index () {' + '\n' +
    `    return { msg: 'Data ${classService}' }` + '\n' +
    '  }' + '\n' +
    '}' + '\n' + '\n' +
    `module.exports = ${classService}` + '\n'

  fs.writeFile(`${PATH_SERVICES}/${fileName}_service.js`, newFileService, 'utf8', (error) => {
    if (error) {
      console.error('Error al escribir en el archivo:', error)
    }
  })
}

const createRepositoryFile = (fileName) => {
  const pascalCase = toPascalCase(fileName)
  const classRepository = `${pascalCase}Repository`

  const newFileRepository = `const ${pascalCase} = require('../database/models/${fileName}')` + '\n' +
    "const Repository = require('./repository')" + '\n' + '\n' +
      `class ${classRepository} extends Repository {` + '\n' +
      '  constructor () {' + '\n' +
      '    super()' + '\n' +
      `    this.model = ${pascalCase}` + '\n' +
      '  }' + '\n' +
      '}' + '\n' + '\n' +
      `module.exports = ${classRepository}` + '\n'

  fs.writeFile(`${PATH_REPOSITORIES}/${fileName}_repository.js`, newFileRepository, 'utf8', (error) => {
    if (error) {
      console.error('Error al escribir en el archivo:', error)
    }
  })
}

const main = () => {
  try {
    const routeName = process.argv[2]
    const param = process.argv[3]
    if (!routeName) throw new Error('The route name argument is required')
    if (param && param.toLowerCase() !== 'wr') {
      throw new Error(`
        The param ${param} don't exist. These are the parameters that exist:
          - wr: Generate the route but without repository
      `)
    }

    const fileName = toSnakeCase(routeName)

    readRouteIndex(fileName)
    createRouteFile(fileName)
    createControllerFile(fileName)
    createServiceFile(fileName, param !== 'wr')
    if (param !== 'wr') createRepositoryFile(fileName)

    console.log(`Route created successfully!!! The route's name is ${fileName.replace('_', '-')}`)
  } catch (e) {
    console.error(e)
  }
}

main()
