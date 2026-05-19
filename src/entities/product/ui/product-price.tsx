import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useUsdPrice } from "../hooks/use-usd-price";

interface Props {
  productId: number;

  priceRub: string;
}

export const ProductPrice = ({
  productId,
  priceRub,
}: Props) => {
  const [opened, setOpened] =
    useState(false);

  const usdPriceQuery =
    useUsdPrice(
      productId,
      opened,
    );

  return (
    <HoverCard
      openDelay={300}
      onOpenChange={setOpened}
    >
      <HoverCardTrigger
        asChild>
        <button className="flex flex-nowrap items-center gap-1 whitespace-nowrap text-base font-normal text-slate-500">
            <span className="whitespace-nowrap">
                BYN {priceRub}
            </span>

            <span className="cursor-pointer text-slate-400">
                *
            </span>
        </button>
      </HoverCardTrigger>

      <HoverCardContent className="w-64">
        {usdPriceQuery.isLoading && (
          <div>
            Loading...
          </div>
        )}

        {usdPriceQuery.isError && (
          <div className="text-sm text-red-500">
            Failed to load USD
            price
          </div>
        )}

        {usdPriceQuery.data && (
          <div className="space-y-2 text-sm">
            <div className="font-medium">
                Цена в долларах США по курсу НБ РБ
            </div>

            <div>
              Цена: $
              {
                usdPriceQuery
                  .data
                  .price_usd
              }
            </div>

            <div>
              Курс :{" "}
              {
                usdPriceQuery
                  .data
                  .usd_rate
              }
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};