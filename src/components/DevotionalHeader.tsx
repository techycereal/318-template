export default function DevotionalHeader({ metadata }: any) {
    return (
        <header className="px-4 pt-10 pb-5 sm:px-10">
            <div className="text-center mb-6">
                <img
                    src="/logo.png"
                    alt="3:18 Bible Church"
                    className="mx-auto w-[130px] h-auto mb-4"
                />

                <span className="
                    text-[11px]
                    font-extrabold
                    uppercase
                    tracking-[3px]
                    text-[#7db0db]
                ">
                    {metadata.date}
                </span>
            </div>

            <span className="
                inline-block
                rounded-full
                bg-[#234973]
                px-4
                py-1.5
                mb-5
                text-[11px]
                font-bold
                uppercase
                tracking-[2px]
                text-white
            ">
                Day {metadata.day}
            </span>

            <h1 className="
                text-[28px]
                sm:text-[34px]
                font-extrabold
                leading-[1.25]
                tracking-[-0.5px]
                text-[#234973]
                mb-6
            ">
                {metadata.title}:
                <br />
                <span className="text-[#7db0db]">
                    {metadata.subtitle}
                </span>
            </h1>
        </header>
    );
}