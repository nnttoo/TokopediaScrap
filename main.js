const puppeteer = require('puppeteer');
async function getTokoPedia(){
    const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 926 });
    await page.goto("https://www.tokopedia.com/search?q=bluetooth+headset&source=universe&st=product",{waitUntil: 'networkidle2'});

    console.log("start evaluate javascript")
    /** @type {string[]} */
    var productNames = await page.evaluate(()=>{
        var div = document.querySelectorAll('[data-testid="divProductWrapper"]');
        console.log(div) // console.log inside evaluate, will show on browser console not on node console
        
        var productnames = [] 
        div.forEach(element => { 
            var titleelem = element.querySelector('[data-testid="spnSRPProdName"]');
            if(titleelem != null){
                productnames.push(titleelem.textContent);
            }
        });

        return productnames
    })

    console.log(productNames)
    browser.close()
} 


getTokoPedia();