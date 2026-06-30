import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function TenCommitments() {
    const navigate = useNavigate();

    const commitments = [
        {
            num: "01",
            title: "Expository Preaching",
            text: "3:18 Bible Church is committed to teaching all of God's word, through expository messages, so that this local body will be built up in the faith, a people made mature for the return of their King.",
            extra: "This is paramount to all other endeavors. If nothing but this happens, we still believe Jesus would be honored, families would be strengthened for life's storms, and the watching world would see our King as the greatest, highest treasure in all of life."
        },
        {
            num: "02",
            title: "Intimacy",
            text: "3:18 Bible Church is committed to intimacy...a body of believers that live out the \"one another's\" of the New Testament.",
            extra: "To uphold this commitment, the Lord's Day gathering should not exceed 400. To prevent attendance from exceeding this capacity, the Elders should anticipate and prepare to plant additional local churches."
        },
        {
            num: "03",
            title: "One Face-to-Face Service",
            text: "3:18 Bible Church is committed to one service on Sunday morning, and this service will be on-site and face to face.",
            extra: "Multiple services, including live-stream, can often feel like multiple churches. Instead, we are committed to one gathering where all members attend together, creating a sense of unity and shared experience. In line with this, we will only offer live streaming of our Sunday gathering to our homebound/shut-ins, but not for the public."
        },
        {
            num: "04",
            title: "Family-Integrated Worship",
            text: "3:18 Bible Church is committed to family-integrated worship.",
            extra: "We will not create children's or age-segregated ministries that gather separately during the Lord's Day gathering. 3:18 Bible Church will offer a nursery for infants and a cry room for parents of babies where moms can watch the service while attending to the needs of their young children."
        },
        {
            num: "05",
            title: "Post-Gathering Fellowship Meal",
            text: "3:18 Bible Church is committed to a post-gathering fellowship meal every Sunday.",
            extra: "The Elders and the deacons will be diligent in organizing this important time for members to experience the deep sense of connection and love that is so clearly seen among Christians in the Scriptures."
        },
        {
            num: "06",
            title: "Financial Transparency & Bi-Vocational Leadership",
            text: "3:18 Bible Church is committed to financial transparency, which includes spending no more than 25% of our annual income on our Pastors, and generously spending the rest on ministry efforts.",
            extra: "In an effort to guard against the temptation to compromise difficult truths or please certain people, all elders will carry a second vocation alongside their pastoral duties and will not receive full-time salaries. However, we acknowledge that \"the laborer is worthy of his wages.\" (1 Timothy 5:17-18). Also, all financial data will be available in detail to all members."
        },
        {
            num: "07",
            title: "Intentional Shepherding",
            text: "3:18 Bible Church is committed to having one elder per ten member families and one deacon per twenty member families.",
            extra: "Each member shall be assigned to a specific elder group and deacon group to ensure that adequate pastoral care/shepherding is provided to all."
        },
        {
            num: "08",
            title: "Intentional Discipleship",
            text: "3:18 Bible Church is committed to intentional discipleship opportunities, meetings, pathways, or events.",
            extra: "These elders/deacons shall organize frameworks, groups, etc. to call all men and women to their role in the home, church, and culture, along with fostering a commitment to following Christ more closely each day. Evangelism doesn't have a goal of someone saying a prayer; the goal is life-long followers of Christ."
        },
        {
            num: "09",
            title: "Radical Hospitality",
            text: "3:18 Bible Church is committed to radical hospitality amongst the body of Christ.",
            extra: "The Elders and deacons will promote regular hospitality among the members of the congregation. This will include organizing house-to-house dinners, lunches, coffee meetings, play dates with children, annual marriage events, annual church-wide events, and other activities that foster a stronger bond between the members. These activities shall aim to reflect the level of intimacy amongst Christians emphasized in the Scriptures."
        },
        {
            num: "10",
            title: "Commitment to the Family",
            text: "3:18 Bible Church is committed to the family.",
            extra: "We are pro-life, pro-marriage, pro-parents know-best-for-their-kids. We will fight abortion at every turn in our culture, support foster and/or adoptive parents prayerfully and financially, push back on the surging tide of transgenderism, and promote God's design for marriage from the start of creation, and call Dads to lead their wives and children in an honorable, and sacrificial way."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#7bb0e0] selection:text-white">
            <Header />

            {/* HERO BANNER SECTION */}
            <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-[#1a1a1a] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    {/* Subtle geometric lines or background texture can go here if desired */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <p className="uppercase tracking-[0.3em] text-sm mb-4 text-[#99badd] font-semibold">Leadership Pillars</p>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        The Ten Commitments
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        The Elders at 3:18 Bible Church have made several commitments that are to be known and promoted amongst the church family.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7bb0e0] to-transparent" />
            </section>

            {/* COMMITMENTS GRID SECTION */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {commitments.map((item) => (
                        <div key={item.num} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-sm font-bold tracking-widest text-[#7bb0e0] uppercase">Commitment</span>
                                    <span className="text-4xl font-black font-mono text-gray-100 group-hover:text-[#99badd]/20 transition-colors duration-300">{item.num}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {item.title}
                                </h3>
                                <div className="w-10 h-1 bg-[#99badd] mb-6 rounded-full transition-all duration-300 group-hover:w-20" />

                                <p className="text-gray-800 font-medium leading-relaxed mb-4 text-base">
                                    {item.text}
                                </p>

                                {item.extra && (
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                                        {item.extra}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM ACTION CTA */}
                <div className="mt-20 text-center">
                    <button
                        onClick={() => navigate('/expect')}
                        className="bg-[#99badd] text-white px-10 py-4 rounded-full font-bold hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg shadow-blue-500/5"
                    >
                        See What To Expect on Sundays
                    </button>
                </div>
            </section>

            {/* FOOTER-LIKE INLINE REASSURANCE */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <blockquote className="text-xl md:text-2xl font-serif italic text-gray-600 leading-relaxed">
                        "For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God."
                    </blockquote>
                    <p className="text-[#7bb0e0] font-bold tracking-widest uppercase text-xs mt-4">— 1 Peter 3:18</p>
                </div>
            </section>
            <Footer />
        </div>
    );
}