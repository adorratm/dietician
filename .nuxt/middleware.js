const middleware = {}

middleware['admin'] = require('..\\middleware\\admin.js')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['dietician'] = require('..\\middleware\\dietician.js')
middleware['dietician'] = middleware['dietician'].default || middleware['dietician']

middleware['guest'] = require('..\\middleware\\guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

middleware['loggedin'] = require('..\\middleware\\loggedin.js')
middleware['loggedin'] = middleware['loggedin'].default || middleware['loggedin']

middleware['user'] = require('..\\middleware\\user.js')
middleware['user'] = middleware['user'].default || middleware['user']

export default middleware
