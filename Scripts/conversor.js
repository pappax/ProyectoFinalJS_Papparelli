const divisaEl_one = document.getElementById('divisa-uno');
const divisaEl_two = document.getElementById('divisa-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');



function calcular(){
    const divisa_one = divisaEl_one.value;
    const divisa_two = divisaEl_two.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${divisa_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[divisa_two];
       
       cambioEl.innerText = `1 ${divisa_one} = ${taza} ${divisa_two}`;

       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(5);

    } );
    
}


divisaEl_one.addEventListener('change', calcular);
cantidadEl_one.addEventListener('input', calcular);
divisaEl_two.addEventListener('change', calcular);
cantidadEl_two.addEventListener('input', calcular);

taza.addEventListener('click', () =>{
    const temp = divisaEl_one.value;
    divisaEl_one.value = divisaEl_two.value;
    divisaEl_two.value = temp;
    calcular();
} );


calcular();