
export const shuffle = (users) => {
    const copyUser = [...users]

    for(let i = copyUser.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1))
        const temp = copyUser[i];
        copyUser[i] = copyUser[j];
        copyUser[j] = temp
    }
    let html = '<ul>'
    copyUser.forEach((user) => {
        html += `<li>${user}</li>`
    })
    html += '</ul><a href="/">Home</a><a href="/shuffle">Shuffle again</a>'

    return html;
}