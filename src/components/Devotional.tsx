import React from 'react';
import Header from './Header';

export default function DailyDevotional() {
    const reflectionQuestions = [
        'Where do I most often forget that I was made in the image of God?',
        'What brokenness in my life tempts me to believe that sin has the final word?',
        'How does Psalm 8 help me see human life with greater dignity and purpose?',
        'In what ways do I live as if this world is my final home instead of looking ahead to glory?',
        'How does Jesus restore what sin has marred in me?',
        'What is one practical way I can live today as someone made for God’s glory?',
    ];

    const thereforePoints = [
        'You are not an accident.',
        'You are not disposable.',
        'You are not defined by sin’s ruin.',
        'You are an image-bearer of God.',
        'You were made for His presence.',
        'You were created for glory.',
        'And in Christ, God is bringing His sons and daughters home.',
    ];

    const familyPoints = [
        'God made people in His image.',
        'That means every person has value because every person was made by God.',
        'Adam and Eve were made to know God, love God, and live with God.',
        'Sin broke the world, but God did not give up His plan.',
        'Jesus came to restore what sin ruined and bring God’s people home to glory.',
    ];

    const familyQuestions = [
        'What does it mean that God made people in His image?',
        'Why does every person have value?',
        'What happened when sin entered the world?',
        'How does Jesus fix what sin broke?',
        'What does it mean that we were made for glory?',
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#f3f7fa] py-8 px-3 font-sans text-gray-800 antialiased sm:px-4">

                {/* Main Container */}
                <div className="mx-auto max-w-[600px] overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#234973]/5">

                    {/* Element 1: Header & Logo */}
                    <div className="flex flex-col items-center px-4 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-2">
                        <img
                            src="https://mcusercontent.com/a4dedb21d12754f0d17890afc/images/5d6251df-da2d-2716-7044-c0fdf50dcc5a.png"
                            alt="3:18 Bible Church"
                            className="mb-4 h-auto max-w-[130px]"
                        />
                        <span className="text-[11px] font-extrabold uppercase tracking-[3px] text-[#7db0db]">
                            August 17, 2026
                        </span>
                    </div>

                    {/* Element 2: Hero Title & Scripture Bar */}
                    <div className="px-4 py-3 sm:px-10 sm:py-5">
                        <span className="mb-5 inline-block rounded-full bg-[#234973] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                            Day 1
                        </span>

                        <h1 className="mb-6 text-2xl font-extrabold leading-snug tracking-tight text-[#234973] sm:text-3xl">
                            Made for Glory:<br />
                            <span className="text-[#7db0db]">Remember What You Were Created For</span>
                        </h1>

                        {/* Scripture Bar */}
                        <div className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-[#234973] sm:text-base">
                            <span className="mr-2 text-[#7db0db]">▸</span> Reading:{' '}
                            <span className="font-normal text-slate-600">
                                Psalm 8 &bull; Genesis 1:26–27
                            </span>
                        </div>
                    </div>

                    {/* Element 3: Body Devotional Text */}
                    <div className="space-y-4 px-4 py-3 text-base leading-relaxed text-slate-700 sm:px-10 sm:py-6">
                        <p className="font-medium text-slate-800">You were not made for mediocrity.</p>
                        <p>
                            You were not created to drift through life as if your days have no meaning, your body has no purpose, your work has no value, and your soul has no destination. From the beginning, God made humanity with dignity, purpose, and glory. Genesis tells us that God said:
                        </p>

                        {/* Quote Block */}
                        <div className="my-8 flex border-l-4 border-[#7db0db] py-1 pl-5">
                            <div>
                                <blockquote className="text-[#234973] italic font-bold text-lg sm:text-xl">
                                    “Let us make man in our image, after our likeness.”
                                </blockquote>
                                <span className="mt-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    — Genesis 1:26
                                </span>
                            </div>
                        </div>

                        <p>
                            That means you were made as an image-bearer of God. You were created to reflect Him, represent Him, know Him, worship Him, and live before His face. Psalm 8 says that God made mankind “a little lower than the heavenly beings” and crowned him “with glory and honor.” The sermon reminded us that the Hebrew wording points to the astonishing dignity God gave humanity. We were made just a little lower than God Himself, created to rule and reign under Him and with Him.
                        </p>
                        <p>That is not a small thing.</p>
                        <p>
                            The world often tells us that human life is accidental, disposable, or self-defined. But Scripture says something far greater. You are not an accident. You are not merely a collection of desires, feelings, failures, or circumstances. You were made by God, for God, and in the image of God.
                        </p>
                        <p>
                            <strong className="font-bold text-slate-900">But sin entered the world.</strong>
                        </p>
                        <p>
                            Adam and Eve were made to walk with God in the garden, to live in His presence, and to rule under His loving authority. But when sin came, the image of God in humanity was marred. Not erased, but marred. Distorted. Twisted. The garden was lost. Humanity was cast out from the immediate presence of God. The world became filled with death, brokenness, rebellion, confusion, and suffering.
                        </p>
                        <p>And we feel that brokenness every day.</p>
                        <p>
                            We feel it when our hearts turn inward and say, “me, me, me,” instead of “God, God, God.” We feel it when we chase lesser things and forget eternal things. We feel it when our bodies hurt, relationships fracture, grief weighs heavily, and sin seems stronger than we expected. We feel it when we know we were made for something more, but we cannot seem to get ourselves back to it.
                        </p>
                        <p>
                            But here is the hope:{' '}
                            <strong className="font-bold text-slate-900">
                                the original design was never abandoned.
                            </strong>
                        </p>
                        <p>
                            God did not look at the ruin of sin and walk away. He did not give up on His purpose for humanity. He did not abandon His plan to have sons and daughters living with Him in glory. From the beginning, God was working to restore what sin had marred. The story of redemption is the story of God bringing His people back home.
                        </p>
                        <p>That is why Jesus came.</p>
                        <p>
                            Jesus is the true and perfect human. He is the exact image of God. He is the Son who entered our suffering, tasted death, conquered sin, and is now crowned with glory and honor. In Him, God is restoring what was lost in Adam. In Him, broken image-bearers are being renewed. In Him, sons and daughters are being brought to glory.
                        </p>
                        <p>So when you feel the weight of your own brokenness, remember what you were made for.</p>
                        <p>
                            You were made for more than sin. You were made for more than shame. You were made for more than survival. You were made for more than this present world.
                        </p>

                        <p className="text-lg font-bold text-[#234973]">You were made for God.</p>

                        <p>
                            And if you belong to Christ, glory is not merely something behind you in Eden. Glory is ahead of you in Christ. God is not simply patching up your life for a few better days on earth. He is restoring you, renewing you, and bringing you home to Himself.
                        </p>
                        <p>Look up.</p>
                        <p>
                            The God who made you in His image is actively working to restore what was lost. The garden was lost through sin, but glory is being recovered through Christ. Your story does not end in brokenness. For the believer, glory is the destination.
                        </p>

                        {/* Callout Box */}
                        <div className="my-8 rounded-2xl bg-[#234973] p-6 text-white">
                            <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-widest text-[#7db0db]">
                                Today’s Big Shift
                            </span>
                            <p className="text-base font-medium leading-relaxed sm:text-lg">
                                Do not define yourself first by your brokenness, your failures, your suffering, or your circumstances. Define yourself by God’s design and Christ’s redemption. You were made in the image of God, and if you are in Christ, you are being restored for glory.
                            </p>
                        </div>

                        <p className="text-lg font-bold text-[#234973]">Therefore:</p>

                        <ul className="my-4 space-y-2 text-slate-700">
                            {thereforePoints.map((point, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-3 text-[#7db0db]">&#9632;</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        <p>
                            So today, do not live as if this world is your final home. Do not live as if sin gets the last word. Do not live as if your brokenness is stronger than God’s purpose. Look to Jesus, the perfect image of God, the crowned Son, and remember what you were made for.
                        </p>

                        <p className="text-lg font-extrabold text-[#234973]">Glory is the destination.</p>
                    </div>

                    {/* Element 4: Personal Reflection Card */}
                    <div className="px-4 pb-6 sm:px-10">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-[#234973]">
                                Personal Reflection
                            </h2>
                            <ul className="divide-y divide-slate-200 text-sm leading-relaxed text-slate-600 sm:text-base">
                                {reflectionQuestions.map((question, index) => (
                                    <li key={index} className="flex items-start py-3 first:pt-0 last:pb-0">
                                        <span className="mr-3 font-bold text-[#7db0db]">?</span>
                                        <span>{question}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Element 5: Family Worship Guide Card */}
                    <div className="px-4 pb-10 sm:px-10">
                        <div className="rounded-2xl bg-[#f0f5fa] p-6 sm:p-8">
                            <h2 className="mb-1 text-xl font-extrabold tracking-tight text-[#234973]">
                                Family Worship Guide
                            </h2>
                            <span className="mb-6 block text-xs font-bold uppercase tracking-wider text-[#7db0db]">
                                Time: 10–15 minutes
                            </span>

                            {/* Step 1 */}
                            <div className="mb-4 text-sm text-[#234973] sm:text-base">
                                <span className="mr-2 inline-block rounded bg-[#234973] px-2 py-0.5 text-xs font-bold text-white">
                                    1
                                </span>
                                <strong className="font-bold">Read</strong> &mdash; Read Genesis 1:26–27 together.{' '}
                                <span className="text-xs text-slate-500 sm:text-sm">(Older children: add Psalm 8)</span>
                            </div>

                            {/* Step 2 */}
                            <div className="mb-2 text-sm font-semibold text-slate-800 sm:text-base">
                                <span className="mr-2 inline-block rounded bg-[#234973] px-2 py-0.5 text-xs font-bold text-white">
                                    2
                                </span>
                                <strong className="font-bold">Explain:</strong>
                            </div>
                            <ul className="mb-5 space-y-1 pl-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                                {familyPoints.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">&bull;</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Step 3 (Connect Point) */}
                            <div className="mb-5 rounded-xl border-l-4 border-[#7db0db] bg-white p-4 shadow-sm">
                                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#234973]">
                                    3. Connect Point
                                </span>
                                <p className="text-sm text-slate-700">
                                    “Today we learned: God made us in His image, and Jesus restores what sin has broken.”
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="mb-2 text-sm font-semibold text-slate-800 sm:text-base">
                                <span className="mr-2 inline-block rounded bg-[#234973] px-2 py-0.5 text-xs font-bold text-white">
                                    4
                                </span>
                                <strong className="font-bold">Discuss:</strong>
                            </div>
                            <ul className="mb-6 space-y-1 pl-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                                {familyQuestions.map((question, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">&bull;</span>
                                        <span>{question}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Step 5 */}
                            <div className="mb-6 text-sm text-slate-700 sm:text-base">
                                <span className="mr-2 inline-block rounded bg-[#234973] px-2 py-0.5 text-xs font-bold text-white">
                                    5
                                </span>
                                <strong className="font-bold">Pray:</strong>
                                <p className="mt-2.5 italic text-[#234973]">
                                    “Father, thank You for making us in Your image. Help us remember that we belong to You and were made for Your glory. Thank You for sending Jesus to restore what sin has broken. Help our family live today for You. Amen.”
                                </p>
                            </div>

                            {/* Step 6 */}
                            <div className="border-t border-slate-300 pt-5 text-sm text-slate-700 sm:text-base">
                                <span className="mr-2 inline-block rounded bg-[#7db0db] px-2 py-0.5 text-xs font-bold text-white">
                                    6
                                </span>
                                <strong className="font-bold text-[#234973]">Today’s Action:</strong>
                                <p className="mt-1.5 mb-3 text-slate-600">
                                    Each person name one way they can reflect God today, such as telling the truth, showing kindness, forgiving someone, obeying joyfully, or helping another person.
                                </p>
                                <p className="mb-3 text-slate-600">Then say aloud together:</p>
                                <div className="inline-block rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold italic text-[#234973]">
                                    “God made us for His glory.”
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Footer */}
                <footer className="mx-auto max-w-[600px] mt-6 px-5 text-center text-xs leading-relaxed text-slate-500">
                    <p className="mb-2">
                        You are receiving this daily devotional as a partner of 3:18 Bible Church.
                    </p>
                    <p>
                        &copy; 2026 3:18 Bible Church. All rights reserved.<br />
                        <a href="#unsubscribe" className="font-semibold text-[#234973] underline">
                            Unsubscribe
                        </a>{' '}
                        from this list.
                    </p>
                </footer>
            </div>
        </>
    );
}