(async () => {
    await loadTrianglesPreset(tsParticles);

    await tsParticles.load({
        id: "tsparticles",
        options: {
            preset: "triangles",
        },
    });
})();

const quote = document.getElementById('quote')
const author = document.getElementById('author')

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
        }
    }
    else{
        swal("Failed to speak!", "Quote not generated yet", {
            buttons: false,
            timer: 1500,
            icon: "error",
        });
    }

}

document.getElementById('speaker').addEventListener('click', text_to_speech)

function tweet(){
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
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
            swal("Failed to copy quote!", "There was an error copying the quote.", "error");
        }
    }
    else{
        swal("Failed to copy quote!", "Quote not generated yet", {
            buttons: false,
            timer: 1500,
            icon: "warning",
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
        });
    }
}
// console.log(category)
const options = {
    method: 'GET',
	headers: {
		'X-Api-Key': 'QKjSlqe4GRCy0lDr8BNjRgLKPHxoZLp02kWuwjUx',
	}
};

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
