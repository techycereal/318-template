import { useEffect, useState } from "react";

/* =========================================================
   DEVOTIONAL PAGE
========================================================= */

export function DevotionalPage() {
    const [devotional, setDevotional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDevotional() {
            try {
                const response = await fetch(
                    "https://church-app-back-gwhxbadse8htcabx.centralus-01.azurewebsites.net/api/devotional"
                );

                if (!response.ok) {
                    throw new Error("Failed to load devotional");
                }

                const data = await response.json();
                console.log(data.data)
                setDevotional(data.data.devotional);
            } catch (err) {
                console.error(err);
                setError("Unable to load today's devotional.");
            } finally {
                setLoading(false);
            }
        }

        loadDevotional();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f3f7fa] px-5 py-12">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-6 w-32 rounded bg-slate-200" />
                        <div className="h-12 w-3/4 rounded bg-slate-200" />
                        <div className="h-24 rounded-xl bg-slate-200" />
                        <div className="space-y-4">
                            <div className="h-4 rounded bg-slate-200" />
                            <div className="h-4 rounded bg-slate-200" />
                            <div className="h-4 w-5/6 rounded bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !devotional) {
        return (
            <div className="min-h-screen bg-[#f3f7fa] px-5 py-12">
                <div className="mx-auto max-w-4xl rounded-2xl border border-red-100 bg-white p-8 text-center">
                    <p className="text-lg font-semibold text-red-700">
                        {error || "No devotional available."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f7fa] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
            <article className="mx-auto w-full max-w-4xl">
                {console.log(devotional)}
                <DevotionalHeader metadata={devotional.metadata} />

                <ReadingBox readings={devotional.reading} />

                <main className="space-y-8">
                    {devotional.content?.map((block, index) => (
                        <ContentBlock
                            key={index}
                            block={block}
                        />
                    ))}
                </main>

                {devotional.bigShift && (
                    <BigShift data={devotional.bigShift} />
                )}

                {devotional.therefore && (
                    <Therefore items={devotional.therefore} />
                )}

                {devotional.conclusion && (
                    <section className="mt-10">
                        <p className="text-[17px] leading-[1.85] text-[#2d3748]">
                            {devotional.conclusion.text}
                        </p>
                    </section>
                )}

                {devotional.reflection && (
                    <Reflection data={devotional.reflection} />
                )}

                {devotional.familyWorship && (
                    <FamilyWorship data={devotional.familyWorship} />
                )}

                <footer className="px-2 pb-4 pt-12 text-center">
                    <p className="text-xs font-medium tracking-wide text-slate-400">
                        {devotional.metadata?.church}
                    </p>
                </footer>

            </article>
        </div>
    );
}


/* =========================================================
   HEADER
========================================================= */

export function DevotionalHeader({ metadata }) {
    return (
        <header className="pb-8 pt-4 sm:pb-10 sm:pt-6">

            <div className="mb-7 text-center">

                <img
                    src="/logo.png"
                    alt="3:18 Bible Church"
                    className="mx-auto mb-5 h-auto w-[140px]"
                />
                {console.log(metadata)}
                {metadata.date && (
                    <p className="text-[11px] font-extrabold uppercase tracking-[3px] text-[#7db0db]">
                        {metadata.date}
                    </p>
                )}

            </div>

            {metadata.day && (
                <div className="mb-5">
                    <span className="inline-flex rounded-full bg-[#234973] px-4 py-2 text-[11px] font-bold uppercase tracking-[2px] text-white shadow-sm">
                        Day {metadata.day}
                    </span>
                </div>
            )}

            <h1 className="max-w-3xl text-[34px] font-extrabold leading-[1.2] tracking-[-0.8px] text-[#234973] sm:text-[42px]">
                {metadata.title}
                {metadata.subtitle && (
                    <>
                        <span className="hidden sm:inline">: </span>
                        <br className="sm:hidden" />
                        <span className="block text-[#7db0db] sm:inline">
                            {metadata.subtitle}
                        </span>
                    </>
                )}
            </h1>

        </header>
    );
}


/* =========================================================
   READING BOX
========================================================= */

export function ReadingBox({ readings }) {
    return (
        <section className="mb-10 rounded-xl bg-[#f8fafc] px-5 py-5 ring-1 ring-[#e9eef3] sm:px-6">

            <div className="flex items-start gap-3">

                <span className="mt-[2px] text-sm text-[#7db0db]">
                    ▶
                </span>

                <div>
                    <span className="text-[14px] font-extrabold uppercase tracking-[1px] text-[#234973]">
                        Reading
                    </span>

                    <div className="mt-1 text-[15px] leading-7 text-[#4a5568]">
                        {readings?.map((reading, index) => (
                            <span key={index}>
                                {reading}
                                {index < readings.length - 1 && (
                                    <span className="mx-2 text-[#aab8c5]">
                                        •
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

        </section>
    );
}


/* =========================================================
   CONTENT BLOCK
========================================================= */

export function ContentBlock({ block }) {
    if (!block) return null;

    switch (block.type) {

        case "paragraph":
            return (
                <p className="text-[17px] leading-[1.85] text-[#2d3748]">
                    {block.text}
                </p>
            );


        case "heading":
            return (
                <h2 className="pt-3 text-[23px] font-extrabold leading-tight text-[#234973] sm:text-[26px]">
                    {block.text}
                </h2>
            );


        case "emphasis":
            return (
                <p className="text-[18px] font-bold leading-[1.7] text-[#234973]">
                    {block.text}
                </p>
            );


        case "callout":
            return (
                <div className="border-l-[4px] border-[#7db0db] bg-white/50 px-5 py-4">
                    <p className="text-[17px] font-semibold leading-[1.75] text-[#234973]">
                        {block.text}
                    </p>
                </div>
            );


        case "scripturePoint":
            return (
                <div className="rounded-xl bg-[#f8fafc] px-5 py-5 ring-1 ring-[#e5ebf0] sm:px-6">

                    {block.reference && (
                        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#7db0db]">
                            {block.reference}
                        </p>
                    )}

                    <p className="text-[17px] font-semibold leading-[1.8] text-[#234973]">
                        {block.text}
                    </p>

                </div>
            );


        case "quote":
            return (
                <blockquote className="my-3 border-l-[4px] border-[#7db0db] pl-5 sm:pl-6">

                    <p className="text-[19px] font-medium italic leading-[1.8] text-[#234973]">
                        “{block.text}”
                    </p>

                    {block.reference && (
                        <cite className="mt-3 block text-[12px] font-bold not-italic uppercase tracking-[1.5px] text-slate-400">
                            — {block.reference}
                        </cite>
                    )}

                </blockquote>
            );


        default:
            return (
                <p className="text-[17px] leading-[1.85] text-[#2d3748]">
                    {block.text}
                </p>
            );
    }
}


/* =========================================================
   BIG SHIFT
========================================================= */

export function BigShift({ data }) {
    return (
        <section className="mt-12 rounded-2xl bg-[#234973] px-6 py-7 shadow-sm sm:px-8 sm:py-8">

            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#7db0db]">
                The Big Shift
            </p>

            {data.title && (
                <h2 className="mb-4 text-[25px] font-extrabold leading-tight text-white sm:text-[28px]">
                    {data.title}
                </h2>
            )}

            {data.text && (
                <p className="text-[17px] leading-[1.8] text-white/90">
                    {data.text}
                </p>
            )}

            {data.point && (
                <p className="mt-5 text-[18px] font-bold leading-[1.7] text-white">
                    {data.point}
                </p>
            )}

        </section>
    );
}


/* =========================================================
   THEREFORE
========================================================= */

export function Therefore({ items }) {
    return (
        <section className="mt-12">

            <div className="mb-6 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#dce7ef]" />

                <h2 className="text-[12px] font-extrabold uppercase tracking-[2.5px] text-[#7db0db]">
                    Therefore
                </h2>

                <div className="h-px flex-1 bg-[#dce7ef]" />

            </div>

            <div className="space-y-5">

                {items?.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4"
                    >
                        <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-[3px] bg-[#7db0db]" />

                        <p className="text-[17px] leading-[1.8] text-[#2d3748]">
                            {item}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}


/* =========================================================
   REFLECTION
========================================================= */

export function Reflection({ data }) {
    return (
        <section className="mt-12 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:p-8">

            <div className="mb-6">

                <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#7db0db]">
                    Reflection
                </p>

                {data.title && (
                    <h2 className="text-[25px] font-extrabold leading-tight text-[#234973]">
                        {data.title}
                    </h2>
                )}

            </div>

            <div className="divide-y divide-[#e2e8f0]">

                {data.questions?.map((question, index) => (
                    <div
                        key={index}
                        className="py-5 first:pt-0 last:pb-0"
                    >
                        <div className="flex items-start gap-4">

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#234973] text-xs font-bold text-white">
                                {index + 1}
                            </span>

                            <p className="text-[16px] leading-[1.75] text-[#2d3748]">
                                {question}
                            </p>

                        </div>
                    </div>
                ))}

            </div>

        </section>
    );
}


/* =========================================================
   FAMILY WORSHIP
========================================================= */
/* =========================================================
   FAMILY WORSHIP
========================================================= */

export function FamilyWorship({ data }) {
    return (
        <section className="mt-10 rounded-2xl bg-[#f0f5fa] p-6 sm:p-8">

            {/* Header */}

            <div className="mb-8">

                <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#7db0db]">
                    Family Worship
                </p>

                <div className="flex flex-wrap items-end justify-between gap-3">

                    {data.title && (
                        <h2 className="text-[25px] font-extrabold leading-tight text-[#234973]">
                            {data.title}
                        </h2>
                    )}

                    {data.time && (
                        <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#234973] ring-1 ring-[#dce7ef]">
                            {data.time}
                        </span>
                    )}

                </div>

            </div>


            {/* Family Worship Steps */}

            {data.steps?.length > 0 && (
                <div className="space-y-8">

                    {data.steps.map((step, index) => (

                        <div
                            key={index}
                            className="flex items-start gap-4"
                        >

                            {/* Step Number */}

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#234973] text-sm font-bold text-white">
                                {step.num || index + 1}
                            </span>


                            {/* Step Content */}

                            <div className="min-w-0 flex-1">

                                {/* Step Label */}

                                {step.label && (
                                    <h3
                                        className={`mb-2 text-[17px] font-extrabold ${step.isConnect || step.isAction
                                                ? "text-[#7db0db]"
                                                : "text-[#234973]"
                                            }`}
                                    >
                                        {step.label}
                                    </h3>
                                )}


                                {/* Main Detail */}

                                {step.detail && (
                                    <p
                                        className={`text-[16px] leading-[1.75] ${step.isConnect
                                                ? "font-semibold italic text-[#234973]"
                                                : step.isAction
                                                    ? "font-semibold text-[#234973]"
                                                    : "text-[#2d3748]"
                                            }`}
                                    >
                                        {step.detail}
                                    </p>
                                )}


                                {/* Nested Items */}

                                {step.nestedItems?.length > 0 && (
                                    <div className="mt-3 space-y-3">

                                        {step.nestedItems.map(
                                            (item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-start gap-3"
                                                >

                                                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7db0db]" />

                                                    <p className="text-[16px] leading-[1.75] text-[#2d3748]">
                                                        {item}
                                                    </p>

                                                </div>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </section>
    );
}

