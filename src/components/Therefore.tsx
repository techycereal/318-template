export default function Therefore({ items }) {
    return (
        <section className="my-14">

            <div className="mb-7">

                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#78B1DE] mb-2">
                    Therefore
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#28527A]">
                    Because of Christ
                </h2>

            </div>

            <div className="space-y-3">

                {items?.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-start bg-white border border-[#D9E3EC] rounded-xl p-5"
                    >

                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EEF6FC] flex items-center justify-center">

                            <span className="text-sm font-extrabold text-[#28527A]">
                                {index + 1}
                            </span>

                        </div>

                        <p className="text-base sm:text-lg leading-7 font-semibold text-[#28527A] pt-0.5">
                            {item}
                        </p>

                    </div>
                ))}

            </div>

        </section>
    );
}