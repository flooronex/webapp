"use client";
import { IconShoppingCart } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const BuyStrip = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_BUY_URL && (
        <div className="max-w-7xl mx-auto mt-6 bg-linear-to-r from-transparent via-(--foreground)/30 to-transparent py-4 px-6">
          <div className=" flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <span className="text-(--text-inverted) font-medium text-sm">
                🚀 Love this template?
              </span>
              <span className="text-(--text-inverted)/90 text-sm">
                Get the full source code and start building today!
              </span>
            </div>
            <Button
              variant="secondary"
              className="text-sm px-6 py-1 h-7.5 bg-(--surface-primary) text-(--text-primary) hover:bg-(--surface-hover) font-medium"
              onClick={() =>
                typeof window !== "undefined" &&
                window.open(process.env.NEXT_PUBLIC_BUY_URL, "_blank")
              }
            >
              Buy This Template <IconShoppingCart size={15} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyStrip;
