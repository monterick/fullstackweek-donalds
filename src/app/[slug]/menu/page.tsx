import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";
import RestaurantCategories from "./components/categories";

interface RestaurantMenuPageProps{
    params: Promise<{slug: string}>;
    searchParams: Promise<{consumptionMethod : string}>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({params, searchParams} : RestaurantMenuPageProps) => {   

    const { slug } = await params;
    const restaurant = await db.restaurant.findFirst({where: { slug: slug }, 
        include:{menuCategories: {include : {products: true} }}
    });
    const { consumptionMethod } = await searchParams; 

    if(!isConsumptionMethodValid(consumptionMethod)){
        return notFound();
    }

    if(!restaurant){
        return notFound();
    }

    return(
        <div>
            <div className="relative h-[250px] w-full">
                <RestaurantHeader restaurant={restaurant} />
                <RestaurantCategories restaurant={restaurant} />
            </div>
        </div>
    )    

}

export default RestaurantMenuPage;