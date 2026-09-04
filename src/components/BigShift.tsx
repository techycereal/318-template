export default function BigShift({ data }) {
    return (
        <section className="my-14">

            <div className="relative bg-[#28527A] rounded-2xl px-6 sm:px-9 py-8 sm:py-10 overflow-hidden">

                {/* Decorative blue line */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#78B1DE]" />

                <div className="relative pl-2">

                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B9D9F0] mb-4">
                        {data.title || "Today's Big Shift"}
                    </p>

                    <p className="text-lg sm:text-xl leading-8 font-medium text-white">
                        {data.text}
                    </p>

                </div>

            </div>

        </section>
    );
}