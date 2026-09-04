import ScripturePoint from "./ScripturePoint";

export default function ContentBlock({ block }) {
    if (!block) return null;

    switch (block.type) {

        case "paragraph":
            return (
                <p className="text-lg sm:text-xl leading-8 text-slate-700 mb-7">
                    {block.text}
                </p>
            );

        case "heading":
            return (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-12 mb-6">
                    {block.text}
                </h2>
            );

        case "emphasis":
            return (
                <p className="text-xl sm:text-2xl font-bold leading-9 text-slate-900 my-8">
                    {block.text}
                </p>
            );

        case "quote":
            return (
                <blockquote className="my-10 border-l-4 border-[#7bb0e0] pl-6 sm:pl-8">
                    {block.reference && (
                        <p className="text-sm font-bold uppercase tracking-widest text-[#7bb0e0] mb-3">
                            {block.reference}
                        </p>
                    )}

                    <p className="text-xl sm:text-2xl leading-9 text-slate-700 italic">
                        “{block.text}”
                    </p>
                </blockquote>
            );

        case "callout":
            return (
                <div className="my-10 rounded-2xl bg-[#eaf2fa] border border-[#cddfee] p-6 sm:p-8">
                    <p className="text-lg sm:text-xl font-bold leading-8 text-slate-800">
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

        default:
            return null;
    }
}