"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ProductHeaderProps{
    product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductHeader = ({product} : ProductHeaderProps) => {
    
    const router = useRouter();
    const handleBackClick = () => router.back();

    const {slug} = useParams<{slug: string}>();

    const handleOrdersClick = () => router.push(`/${slug}/orders`);

    return(
        <div className="relative w-full h-[360px]">
        <Button variant="secondary" size="icon" className="absolute left-4 top-4 rounded-full z-50" onClick={handleBackClick}>
                <ChevronLeftIcon />
        </Button>
        <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
        />
        <Button variant="secondary" size="icon" className="absolute right-4 top-4 rounded-full z-50" onClick={handleOrdersClick}>
                <ScrollTextIcon />
        </Button>
       </div>
    )

}

export default ProductHeader;