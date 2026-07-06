const questions=[

"How long does implementation take?",

"Can NHT customize ERP?",

"Can dashboards connect Power BI?",

"Do you provide training?"

];

export default function FAQ(){

return(

<section className="py-20">

<div className="max-w-5xl mx-auto">

<h2 className="text-center text-4xl font-bold mb-10">

Frequently Asked Questions

</h2>

{questions.map(item=>(

<div

key={item}

className="border rounded-xl p-5 mb-4"

>

{item}

</div>

))}

</div>

</section>

)

}