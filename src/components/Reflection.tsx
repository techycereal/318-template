export default function Reflection({ data }) {
    return (
        <section className="my-16">

            <div className="border-t-2 border-[#78B1DE] pt-7">

                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#78B1DE] mb-2">
                    Take a Moment
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#28527A] mb-8">
                    {data.title || "Personal Reflection"}
                </h2>

                <div className="space-y-5">

                    {data.questions?.map((question, index) => (
                        <div
                            key={index}
                            className="flex gap-4"
                        >

                            <span className="flex-shrink-0 text-sm font-extrabold text-[#78B1DE] pt-1">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <p className="text-base sm:text-lg leading-8 text-[#374A5C]">
                                {question}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}