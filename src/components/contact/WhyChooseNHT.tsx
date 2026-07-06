const features = [

{
title:"Enterprise Experience",
desc:"100+ successful enterprise projects."
},

{
title:"Senior Consultants",
desc:"Experienced ERP & BI experts."
},

{
title:"Customized Solutions",
desc:"Designed around business processes."
},

{
title:"Long-term Support",
desc:"Consulting, implementation and maintenance."
}

];

export default function WhyChooseNHT(){

return(

<section className="py-20 bg-white">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Why Choose NHT

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

{features.map(item=>(

<div

key={item.title}

className="border rounded-2xl p-8 hover:shadow-xl transition"

>

<h3 className="font-bold text-xl">

{item.title}

</h3>

<p className="mt-4 text-slate-500">

{item.desc}

</p>

</div>

))}

</div>

</div>

</section>

)

}