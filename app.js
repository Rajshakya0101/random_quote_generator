(async () => {
    await loadTrianglesPreset(tsParticles);

    await tsParticles.load({
        id: "tsparticles",
        options: {
            preset: "triangles",
        },
    });
})();

'speechSynthesis' in window ? console.log("Web Speech API supported!") : console.log("Web Speech API not supported :-(")


const quote = document.getElementById('quote')
const author = document.getElementById('author')

// const url = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
// const options = {
//     method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '299676854cmshb9fb7457875145ep1c3300jsna4b5564a02ea',
// 		'x-rapidapi-host': 'quotes15.p.rapidapi.com'
// 	}
// };
// // document.getElementById('new-quote').addEventListener("click", getQuote(url))

// async function getQuote (url) {
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         quote.innerHTML = `"${result.content}"`
//         author.innerHTML = `--- by ${result.originator.name}`
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
    
// }


const text_to_speech = () => {
    const quoteText = quote.innerHTML
    const authorText = author.innerHTML
    const combined = quoteText + authorText
    console.log(combined)
    if(quoteText){
        if ("speechSynthesis" in window) {
            const synth = window.speechSynthesis
            const voices = synth.getVoices();
            const msg = new SpeechSynthesisUtterance(combined);
            // const num = Math.floor(Math.random()*20)
            msg.voice = voices[1]
            msg.lang = "en-US"
            msg.rate = 0.7
            synth.speak(msg);
            // demo.addEventListener("click", text_to_speech)
            // demo.disabled = false;
        }
    }
    else{
        swal("Failed to speak!", "Quote not generated yet", {
            buttons: false,
            timer: 1500,
            icon: "error",
            // className: "black-bg"
        });
    }

}

document.getElementById('speaker').addEventListener('click', text_to_speech)

function tweet(){
    // console.log(quote.innerHTML)
    if(quote.innerHTML){
        window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "     " + author.innerHTML, "Tweet Window", "width=600", "height=300")
    }
    else{
        swal("Unable to share!", "Quote not generated yet", {
            buttons: false,
            timer: 1500,
            icon: "error",
            // className: "black-bg"
        });
    }
}

function facebook(){

}

const copyQuote = async () => {
    const quoteText = quote.innerHTML
    const authorText = author.innerHTML
    if(quoteText){
        try {
            await navigator.clipboard.writeText(`${quoteText} ${authorText}`);
            swal("Quote Copied to clipboard", `${quoteText} ${authorText}`, {
                buttons: false,
                timer: 3000,
                icon: "success",
                // className: "black-bg"
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
            swal("Failed to copy quote!", "There was an error copying the quote.", "error");
        }
        // // console.log(combined.select())
        // combined.select();
        // document.execCommand("copy");
        // swal("Quote Copied!", combined, "success");
    }
    else{
        swal("Failed to copy quote!", "Quote not generated yet", {
            buttons: false,
            timer: 1500,
            icon: "warning",
            // className: "black-bg"
        });
    }
}

const generate = () => {
    quote.innerHTML = "Loading..."
    author.innerHTML = "Loading..."
    const input = document.getElementById('category')
    const category = input.value
    if(category != ""){
        const url = 'https://api.api-ninjas.com/v1/quotes?category=' + category ;
        getQuote(url);
    }
    else{
        quote.innerHTML = ""
        author.innerHTML = ""
        swal("Category not selected!", 'Select a category', {
            buttons: false,
            timer: 1500,
            icon: "warning",
            // className: "black-bg"
        });
    }
}
// console.log(category)
const options = {
    method: 'GET',
	headers: {
		'X-Api-Key': 'QKjSlqe4GRCy0lDr8BNjRgLKPHxoZLp02kWuwjUx',
		// 'x-rapidapi-host': 'quotes15.p.rapidapi.com'
	}
};
// document.getElementById('new-quote').addEventListener("click", getQuote(url))

async function getQuote (url) {
    try {
        const response = await fetch(url, options);
        console.log(response);
        const result = await response.json();
        quote.innerHTML = `"${result[0].quote}"`
        author.innerHTML = `... by ${result[0].author}`
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    
}


// getQuote(url);
