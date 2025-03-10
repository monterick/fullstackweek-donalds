import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductIdProps{
    params: Promise<{slug: string, productId: string}>
}

const ProductPage = async ({params}: ProductIdProps) => {

    const {slug, productId} = await params;

    //const restaurant = db.restaurant.findFirst({where: {slug: slug}});

    /*if(!restaurant){
        return notFound();
    }*/

    const product = await db.product.findUnique({where: {id: productId}, include: {restaurant: {
        select: {
            name: true,
            avatarImageUrl: true,
            slug: true
        }
    }}});

    if(!product){
        return notFound();
    }  
    
    if(product.restaurant.slug.toUpperCase() !== slug.toUpperCase()){
        return notFound();
    }

    return(
       <div className="flex h-full flex-col">       
        <ProductHeader product={product} />       
        <ProductDetails product={product} />
       </div>
    )
}

export default ProductPage;