import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React from 'react'
import { Category, Product } from '../../types/CategoryAndProductData'
import { getCategoryAndProduct } from '../../services/CategoryAndProductService';
import { Modal } from '../../components/modal';
import { CiCirclePlus } from "react-icons/ci";
import { GrSubtractCircle } from "react-icons/gr";
import { Link } from 'react-router-dom';



export function Home() {
 
    const [data, setData] = React.useState<Category[]>([]);
    const categoryRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
    const [activeCategoryId, setActiveCategoryId] = React.useState<number | null>(null);
    const isManualScroll = React.useRef(false);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState<Product | null>(null);


    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getCategoryAndProduct();
            console.log(data)
            setData(data);
        }   

        fetchData();
    }, [])

    React.useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isManualScroll.current) {
                    const id = Number(entry.target.getAttribute('data-id'));
                    setActiveCategoryId(id);
                  }
            })
        },{
            root: null,
            rootMargin: '-20% 0px -50% 0px',
            threshold: 0.3
        }
        );
        const timeout = setTimeout(() => {
            Object.values(categoryRefs.current).forEach((section) => {
                if (section) observer.observe(section);
            });
        }, 100);
        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, [data])

    const scrollToCategory = (id: number) => {
        const section = categoryRefs.current[id]
        if (section) {
            isManualScroll.current = true;
            section.scrollIntoView({behavior: 'smooth', block: 'start'})
            setActiveCategoryId(id);

            setTimeout(() => {
                isManualScroll.current = false;
              }, 1000);
        }
    } 

  return (
    <div className="min-h-screen bg-[#F5F5F5] ">
    <div className="bg-[#E6E6E6] sticky top-0 z-10 ">
        <Swiper
            spaceBetween={16} 
            slidesPerView="auto" 
            className="px-4 py-2 mx-auto max-w-7xl mt-4 "
        >
            {data?.map(({ id, nome }) => (
                <SwiperSlide key={id} style={{ width: '120px' }}>
                <button
                    onClick={() => scrollToCategory(id)}
                    className={`text-base text-center font-semibold font-inter whitespace-nowrap w-full px-3 py-4 rounded uppercase ${activeCategoryId === id ? 'text-[#5C5700] font-extrabold' : ''}`}
                >
                    {nome}
                </button>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>

    <div className='p-4 space-y-8 max-w-7xl mx-auto'>
        {data?.map(({id, nome, products}) => (
            <div
                key={id}
                ref={(el) => {
                    categoryRefs.current[id] = el
                }}
                data-id={id}
                className='scroll-mt-24  min-h-[200px]'
            >

                <h2 className='text-lg font-bold font-inter mb-3'>{nome}</h2>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 font-inter' >

            {products.filter((product) => product.is_listed === 1)
            .map((product) => (
                <div
                    key={product.id}
                className='bg-white rounded shadow p-2 flex justify-between  cursor-pointer'
                onClick={ () => {
                    setShowModal(true);
                    setSelectedProducts(product);
                }
                }
                >


                    <div>

                        <h3 className='font-semibold mt-2 text-[#252525] text-xl '>{product.name}</h3>

                        
                        <p className='text-[#5C5C5C] max-w-[95%] text-base'>{product.description}</p>

                        {parseFloat(product.price_from) > 0 && (
                            <span className='text-xs line-through text-[#006A05]'>{new Intl.NumberFormat("pt-BR",{ style: 'currency', currency:"BRL"}).format(Number(product.price_from))}</span>
                        )}
                        

                        <span className='mt-1 ml-2  text-sm font-bold text-grenn-600'>
                            {new Intl.NumberFormat("pt-BR", { style: 'currency', currency:"BRL"}).format(Number(product.price))}
                        </span>
                    
                    </div>

                    <img src={product.image_url ?? '/sem-imagem.png'} alt={product.name}
                    className='w-[100px] h-[100px] justify-end block object-cover object-center rounded'/>

                </div>
            ))}
            </div>

            </div>
        ))}
    </div>

        {showModal && selectedProducts && (
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <div className='space-y-4 font-inter'>

                <img className='mt-8 w-full h-[200px] object-cover object-center rounded-md' src={selectedProducts.image_url ?? '/sem-imagem.png'} alt={selectedProducts.name} />


                <h1 className='text-4xl text-[#14131A] '>{selectedProducts.name}</h1>
                <p className='text-xl'>{selectedProducts.description}</p>

                <div className='flex gap-2 items-center justify-between'>

                    <div className='flex gap-2'>    

                        {Number(selectedProducts.price_from) > 0 && (
                            <p className='line-through text-base'>{new Intl.NumberFormat("pt-BR", { style: 'currency', currency:"BRL"}).format(Number(selectedProducts.price_from))}</p>
                        )}

                        <span className='text-[#006A05] font-medium text-xl '>{new Intl.NumberFormat("pt-BR", { style: 'currency', currency:"BRL"}).format(Number(selectedProducts.price))}</span>
                        </div>
                         
                    
                    <div className='flex items-center bg-[#EAE8E8] p-2 gap-4 rounded-md font-semibold '>
                        <GrSubtractCircle className='text-2xl' />
                        {0}
                        <CiCirclePlus  className='text-[#C8BC00] text-3xl font-bold' />
                    </div>
                    
                </div>
                        
                    <div className='bg-[#D9D9D9] p-2 rounded-md mt-2'
                    >
                        <span className=''>Observações:</span> <br />
                    </div>

                        <textarea placeholder='Ex: Tirar salada...' rows={5} cols={4} className='bg-[#F8F8F8] w-full border-[#636363] outline-[#636363]border-2 focus:outline-[#636363] p-2'>
                        </textarea>

              </div>

                        <div className='flex flex-col gap-8 items-center'>
                            <Link to="/carrinho" className='text-center p-2 rounded-md shadow-2xl mt-2 bg-black text-white'>Ir para o carrinho</Link>
                        </div>

            </Modal>
        )}
     
    </div>
  )
}
