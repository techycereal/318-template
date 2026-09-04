export default function FamilyWorship({ data }) {
    return (
        <section className="my-16">

            <div className="bg-white border border-[#D9E3EC] rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="px-6 sm:px-8 py-7 bg-[#EEF6FC] border-b border-[#D9E3EC]">

                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#78B1DE] mb-2">
                        Family Worship
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#28527A]">
                            {data.title || "Family Worship Guide"}
                        </h2>

                        {data.duration && (
                            <span className="text-sm font-semibold text-[#718096]">
                                {data.duration}
                            </span>
                        )}

                    </div>

                </div>

                {/* Steps */}
                <div className="p-6 sm:p-8">

                    <div className="space-y-9">

                        {data.steps?.map((step, index) => (
                            <div
                                key={index}
                                className="flex gap-5"
                            >

                                {/* Number */}
                                <div className="flex-shrink-0">

                                    <div className="w-9 h-9 rounded-full bg-[#28527A] text-white flex items-center justify-center font-bold text-sm">
                                        {step.number || index + 1}
                                    </div>

                                </div>

                                {/* Content */}
                                <div className="flex-1">

                                    <h3 className="text-lg sm:text-xl font-extrabold text-[#28527A] mb-3">
                                        {step.title}
                                    </h3>

                                    {step.content && (
                                        <p className="text-base leading-7 text-[#374A5C]">
                                            {step.content}
                                        </p>
                                    )}

                                    {step.bullets?.length > 0 && (
                                        <ul className="mt-4 space-y-3">

                                            {step.bullets.map((bullet, bulletIndex) => (
                                                <li
                                                    key={bulletIndex}
                                                    className="flex gap-3"
                                                >

                                                    <span className="mt-3 w-1.5 h-1.5 rounded-full bg-[#78B1DE] flex-shrink-0" />

                                                    <span className="text-base leading-7 text-[#374A5C]">
                                                        {bullet}
                                                    </span>

                                                </li>
                                            ))}

                                        </ul>
                                    )}

                                    {step.questions?.length > 0 && (
                                        <div className="mt-4 space-y-2">

                                            {step.questions.map((question, questionIndex) => (
                                                <div
                                                    key={questionIndex}
                                                    className="border-l-2 border-[#78B1DE] pl-4 py-1"
                                                >
                                                    <p className="text-base leading-7 text-[#374A5C]">
                                                        {question}
                                                    </p>
                                                </div>
                                            ))}

                                        </div>
                                    )}

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* Action */}
                {data.action && (
                    <div className="border-t border-[#D9E3EC] px-6 sm:px-8 py-7 bg-[#F7F9FB]">

                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#78B1DE] mb-3">
                            {data.action.title || "Today's Action"}
                        </p>

                        {data.action.scripture && (
                            <p className="text-base font-extrabold text-[#28527A] mb-2">
                                {data.action.scripture}
                            </p>
                        )}

                        <p className="text-base sm:text-lg leading-7 text-[#374A5C]">
                            {data.action.text}
                        </p>

                    </div>
                )}

            </div>

        </section>
    );
}