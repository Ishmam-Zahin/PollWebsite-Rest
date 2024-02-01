let data = {}
loadData()
async function loadData(){
    let p = await fetch("http://127.0.0.1:8000/getData/")
    data = await p.json()

    createHomePage()
}

function createHomePage(){
    // console.log(data)
    let cont = document.getElementById("containerForm")
    cont.innerHTML += `
        <form action="/submit/" method="post">
            ${
                function qs(){
                   let  str1 = ""
                    for(let i=0; i<data.info.length; i++){
                        str1 += `
                            <label for="qs_${data.info[i].id}"><h2>${data.info[i].q_text}</h2></label>
                            <select id="qs_${data.info[i].id}" name="${data.info[i].id}">
                            ${
                                function ch(){
                                    let str2 = ""
                                    for(let j=0; j<data.info[i].choices.length; j++){
                                        str2 += `
                                            <option value="${data.info[i].choices[j].id}">${data.info[i].choices[j].c_text}</option>
                                        `
                                    }

                                    return str2
                                }()
                            }
                            </select>
                        `
                    }

                    return str1
                }()
            }
            <br><input type="submit" value="submit">
        </form>   
    `

    createResult()
}

function createResult(){

    // console.log("xxx")
    let cont = document.getElementById("containerResult")
    cont.innerHTML += `
        ${
        function qs(){
            let str1 = ""
            for(let i=0; i<data.info.length; i++){
                str1 += `
                <div class="rQsContainer">
                    <h2>${data.info[i].q_text}</h2>
                    <p>total participants: ${data.info[i].total_participant}</p>
                    <div class="rCsContainer">
                        ${
                    function ch(){
                        let str2 = ""
                        for(let j=0; j<data.info[i].choices.length; j++){
                            str2 += `
                            <div class="outterCircle" data-value="${data.info[i].choices[j].pVote}">
                                <div class="innerCircle">${data.info[i].choices[j].c_text}<br>${data.info[i].choices[j].pVote}%</div>
                            </div>
                            `
                        }
                        return str2
                    }()
                }
                    </div>
                </div>
                `
            }
            return str1
        }()
    }
    `
    startPbar()
}
let count = 0
const elements = document.getElementsByClassName("outterCircle")
let timer
function startPbar(){
    timer = setInterval(animate, 1)
}
function animate(){
    count++
    for(let i=0; i<elements.length; i++){
        if(count <= Number(elements[i].getAttribute('data-value'))){
            elements[i].style.backgroundImage = `conic-gradient(yellow 0deg, yellow ${count*3.6}deg, white 0deg)`
        }
    }
    if(count === 100) clearInterval(timer)
}

