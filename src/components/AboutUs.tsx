import PageTemplate from "./PageTemplate";

export default function AboutUs() {
    const sections = [
        {
            title: "Who We Are",
            Description: () => (
                <div className="space-y-4">
                    <p className="italic font-semibold text-lg border-l-4 border-slate-500 pl-4 my-2">
                        3:18 Bible Church exists as a fellowship of believers to see and savor Jesus Christ the King, while we serve one another in love, and share His Gospel with the world until He returns for His own.
                    </p>
                    <p>
                        Jesus Christ is the ultimate treasure and focus of our community. 3:18 Bible Church is an intimate, family-integrated body of believers dedicated to living out the "one anothers" of the New Testament. We prioritize radical hospitality, deep fellowship, and intentional discipleship, walking alongside one another to help each person see and savor Him as the greatest, highest treasure in all of life.
                    </p>
                    <p>
                        Because we prioritize intentional discipleship, we provide focused discipleship resources and actively pour into our families so they can see and savor Jesus. To guard our close-knit fellowship, our leadership focuses on cultivation rather than building a mega-church, ensuring that every individual and family is closely known, loved, and shepherded in their walk with Christ.
                    </p>
                </div>
            ),
            image: '/churchImages/churchOutside.webp',
            imgSize: 'aspect-[16/9]',
        },
        {
            title: "What We Believe & Value",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        We believe in the absolute authority of God's Word, which is why we are unwaveringly committed to verse-by-verse expository preaching. Every sermon is designed to display the glory of God's truth so that this local body can clearly see and savor Jesus and be built up in mature faith. Standing on this truth, we remain unapologetically pro-life, pro-marriage, and pro-family.
                    </p>
                </div>
            ),
            image: '/churchImages/bible.webp',
            imgSize: 'aspect-[16/9]',
        },
        {
            title: "Monthly Events",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        We place a massive priority on the family because we believe it is foundational to a healthy, thriving church body. Families are deeply important to us, which is why we intentionally design regular gatherings to pour directly into your home, build up your relationships, and support parents:
                    </p>
                    <ul className="space-y-3 list-disc pl-5">
                        <li>
                            <strong>Family Night:</strong> Once a month, we gather as a complete church family for a really fun night filled with games, a shared meal, deep fellowship, and a chance to build up our community together.
                        </li>
                        <li>
                            <strong>Married Couples' Date Night:</strong> To support and pour into marriages, we host a dedicated monthly date night. Parents can drop their children off at the church to be safely cared for, while the couples receive a focused devotional to go through together and real cash from the church to go out and enjoy quality time investing in their marriage.
                        </li>
                    </ul>
                </div>
            ),
            image: '/churchImages/IMG_4309.jpg',
            imgSize: 'aspect-[16/9]',
        },
        {
            title: "Why 3:18",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        Our name is taken directly from <strong>1 Peter 3:18</strong>: <em>"For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God."</em>
                    </p>
                    <p>
                        We believe that Jesus' sacrificial work on the cross is the ultimate reason we gather. Everything we do—from how we shepherd our families to how we live in community—is a joyful, mature response to this incredible grace that allows us to truly see and savor Jesus every single day.
                    </p>
                </div>
            ),
            video: '/video2.mp4',
            imgSize: 'aspect-[9/16]',
        },
        {
            title: "The Hallmarks of 3:18 Bible Church",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        Our Sundays look a bit different by design. We are deeply committed to <strong>one single, face-to-face gathering</strong> each Sunday morning to maintain true corporate unity, where we can see and savor Jesus together as a whole body. Because multiple services or public live-streams can split a church identity, our live feed is strictly reserved for our homebound and shut-in members.
                    </p>
                    <p>
                        Furthermore, we practice <strong>family-integrated worship</strong>; we do not isolate children into age-segregated ministries, choosing instead to gather all generations together to see and savor Jesus as one family. Finally, every single service is paired with a post-gathering fellowship meal, ensuring we continue to break bread, share life, and savor Jesus in community every single week.
                    </p>
                </div>
            ),
            video: '/Hallmarks.mp4',
            imgSize: 'aspect-[9/16]',
        }
    ];

    return <PageTemplate heroTitle="About Us" heroImage={'/churchImages/churchInside.webp'} sections={sections} />;
}