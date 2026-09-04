export default function ReadingBox({ readings }: { readings: string[] }) {
    return (
        <div className="
            rounded-xl
            bg-[#f8fafc]
            px-5
            py-4
            mb-8
            text-[15px]
            font-semibold
            text-[#234973]
        ">
            <span className="text-[#7db0db] mr-2">
                ▶
            </span>

            Reading:

            <span className="
                font-normal
                text-[#4a5568]
                ml-2
            ">
                {readings.join(" • ")}
            </span>
        </div>
    );
}