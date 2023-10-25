import {createReadStream, createWriteStream, statSync} from 'node:fs'

const fileToCopyPath = './data/pdfACopier.pdf'
const newFilePAth = './copy-pdf.pdf'

const readStream = createReadStream(fileToCopyPath)
const writeStream = createWriteStream(newFilePAth)

readStream.pipe(writeStream)