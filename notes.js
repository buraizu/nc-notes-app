const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
    
    saveNotes(notes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []  // This code executes because no notes, therefore return empty array
    }
   
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    if(notesToKeep.length === notes.length) {
        console.log(chalk.red.inverse('No note found'))
    } else {
        console.log(chalk.green.inverse('Note removed'))
    }
    saveNotes(notesToKeep)
    
} 

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    note ? console.log(chalk.yellow.bold.inverse(note.title), note.body) : console.log(chalk.red.bold.inverse('error locating note to read')) 
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold.inverse('Your notes...'))
    notes.forEach((note) => console.log(chalk.blue.bold.inverse(note.body)))
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}