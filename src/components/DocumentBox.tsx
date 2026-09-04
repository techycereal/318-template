import ReadingBox from "./ReadingBox";
import ScripturePoint from "./ScripturePoint";
import BigShift from "./BigShift";
import Therefore from "./Therefore";
import Reflection from "./Reflection";
import FamilyWorship from "./FamilyWorship";

export default function DocumentBlock({ block }) {
    if (!block) return null;

    switch (block.type) {

        case "reading":
            return (
                <ReadingBox
                    readings={block.readings}
                />
            );

        case "paragraph":
            return (
                <p className="text-lg sm:text-xl leading-[1.85] text-[#374A5C] mb-7">
                    {block.text}
                </p>
            );

        case "heading":
            return (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#28527A] mt-12 mb-5">
                    {block.text}
                </h2>
            );

        case "emphasis":
            return (
                <p className="text-xl sm:text-2xl font-bold leading-[1.6] text-[#28527A] my-9">
                    {block.text}
                </p>
            );

        case "quote":
            return (
                <blockquote className="my-10 pl-5 sm:pl-7 border-l-4 border-[#78B1DE]">

                    {block.reference && (
                        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#28527A] mb-3">
                            {block.reference}
                        </p>
                    )}

                    <p className="text-lg sm:text-xl leading-8 italic text-[#374A5C]">
                        “{block.text}”
                    </p>

                </blockquote>
            );

        case "callout":
            return (
                <div className="my-10 bg-[#EEF6FC] border border-[#C9DEEF] rounded-xl px-6 py-6">

                    <p className="text-lg sm:text-xl leading-8 font-bold text-[#28527A]">
                        {block.text}
                    </p>

                </div>
            );

        case "scripturePoint":
            return (
                <ScripturePoint
                    reference={block.reference}
                    text={block.text}
                    content={block.content}
                />
            );

        case "bigShift":
            return (
                <BigShift data={block} />
            );

        case "therefore":
            return (
                <Therefore
                    items={block.items}
                />
            );

        case "reflection":
            return (
                <Reflection data={block} />
            );

        case "familyWorship":
            return (
                <FamilyWorship data={block} />
            );

        default:
            console.warn("Unknown devotional block:", block.type);
            return null;
    }
}