export const navStyles = {
    header: "fixed left-0 right-0 z-50 flex justify-center select-none",

    container: {
        base: "duration-700 ease-in-out transform-gpu transition-[transform,width]",
        scrolled:
            "w-[85%] md:min-w-[auto] md:w-[75%] md:min-w-[700px] lg:w-[40%] lg:min-w-[860px]",
        default: "lg:min-w-[800px] w-[1300px] max-w-full",
    },

    nav: {
        base: "w-full z-50 rounded-full transform-gpu transition-[transform,backdrop-filter,border] duration-500",
        scrolled: [
            "bg-(--surface-secondary-alt-2)/95",
            "backdrop-blur-[10px]",
            "translate-y-5",
            "border",
            "border-(--border-primary)",
        ].join(" "),
        default: "bg-transparent translate-y-2 border border-transparent",
    },

    content: {
        base: "flex items-center justify-between mx-auto max-w-[1370px] transform-gpu transition-[padding] duration-500 ease-in",
        scrolled: "px-6 py-2.5",
        default: "px-6 py-2.5",
    },

    link: "cursor-pointer transition-opacity",
    button: "hover:opacity-70 transition-opacity",
};
