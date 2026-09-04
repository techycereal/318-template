export default function ScripturePoint({
    reference,
    text,
    content = []
}) {
    return (
        <section className="my-12">

            <div className="border border-[#D9E3EC] rounded-xl overflow-hidden bg-white">

                {/* Scripture label */}
                <div className="px-6 sm:px-8 py-4 bg-[#EEF6FC] border-b border-[#D9E3EC]">

                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#28527A]">
                        {reference}
                    </p>

                </div>

                {/* Scripture */}
                <div className="px-6 sm:px-8 py-7">

                    <p className="text-xl sm:text-2xl leading-9 font-serif italic text-[#28527A]">
                        “{text}”
                    </p>

                </div>

                {/* Supporting points */}
                {content.length > 0 && (
                    <div className="border-t border-[#E7EDF2] px-6 sm:px-8 py-6">

                        <div className="space-y-4">

                            {content.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3"
                                >

                                    <span className="mt-[10px] w-2 h-2 rounded-full bg-[#78B1DE] flex-shrink-0" />

                                    <p className="text-base sm:text-lg leading-7 text-[#374A5C]">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>
                )}

            </div>

        </section>
    );
}