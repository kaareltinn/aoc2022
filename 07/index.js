import * as R from '../deps.ts'

const input = Deno
  .readTextFileSync(Deno.args[0])
  .trim()
  .split('\n')

class Node {
  constructor(name, parent, children, size = null) {
    this.name = name,
    this.parent = parent,
    this.children = children
    this.size = size
  }

  getSize() {
    if (this.isFile()) {
      return this.size
    } else {
      return this.children.reduce((acc, child) => acc + child.getSize(), 0)
    }
  }

  isDir() {
    return !this.isFile()
  }

  isFile() {
    return this.children.length === 0
  }

  addChild(node) {
    this.children = [...this.children, node]
  }

  inspect() {
    return `Node(${this.name})`
  }
}

const isCommand = R.startsWith('$')
const parseCommand = cmd => cmd.split(' ')

let currentNode = null
let fs
let allDirs = []

input.forEach((line) => {
  if (isCommand(line)) {
    const cmd = parseCommand(line)

    if (cmd[1] === "cd") {
      if (currentNode) {
        if (cmd[2] === '..') {
          currentNode = currentNode.parent
        } else {
          let newNode = new Node(cmd[2], currentNode, [])
          allDirs = [...allDirs, newNode]
          currentNode.addChild(newNode)
          currentNode = newNode
          fs = currentNode
        }
      } else {
        let root = new Node('/', null, [])
        currentNode = root
        fs = root
        allDirs = [root]
      }
    }
  } else {
    const el = line.split(' ')

    if (el[0] !== 'dir') {
      let newNode = new Node(el[1], currentNode, [], parseInt(el[0], 10))
      currentNode.addChild(newNode)
      fs = currentNode
    }
  }
})

const dirsWithSizes = allDirs.reduce((acc, dir, i) => ({...acc, [`${dir.name} ${i}`]: dir.getSize()}), {})

console.log('Day 7, Part 1: ', Object.values(dirsWithSizes).filter(s => s <= 100000).reduce((a, b) => a + b, 0))

const totalAvailableDiskSpace = 70000000
const unusedSpaceNeeded = 30000000
const unusedSpace = totalAvailableDiskSpace - dirsWithSizes["/ 0"]
const spaceToFree = unusedSpaceNeeded - unusedSpace
const [smallest, ..._rest] = Object.values(dirsWithSizes).filter(s => s >= spaceToFree).sort((a, b) => a - b)

console.log('Day 7, Part 2: ', smallest)
