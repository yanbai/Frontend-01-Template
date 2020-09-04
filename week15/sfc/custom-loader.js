// import parseHTML from './html-parser'
const parseHTML = require('./html-parser.js')

module.exports = function(source, map) {
  console.log('loader is running')
  // console.log('this is source', source)
  // console.log(this.resourcePath)
  const tree = parseHTML.parseHTML(source)
  let template
  let script
  console.log(tree.children)
  for (let node of tree.children) {
    if(node.tagName === 'template') {
      template = node
    }
    if (node.tagName === 'script') {
      script = node.children[0].content
    }
  }
  console.log('template \n', template)
  console.log('script \n', script)

  let createCode = ''

  return `
    class Carousel {
      render() {
        ${createCode}
      }
    }
  `
}
