import PageTemplate from "./PageTemplate";

export default function AboutUs() {
    const sections = [
        {
            title: "Who We Are",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        3:18 Bible Church is an intimate, family-integrated body of believers dedicated to living out the "one anothers" of the New Testament. We are a community that prioritizes radical hospitality, deep fellowship, and intentional discipleship, walking alongside one another to help each person see and savor Jesus as the greatest, highest treasure in all of life.
                    </p>
                    <p>
                        To guard our close-knit fellowship and keep our collective focus on seeing and savoring Jesus, our leadership focuses on cultivation rather than building a mega-church. This ensures that every individual and family is closely known, loved, and shepherded in their walk with Christ.
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
                    <p>
                        We also believe in absolute structural integrity to protect the purity of this ministry. To ensure our resources are dedicated to pointing people to Christ, no more than 25% of our annual income goes toward pastoral compensation. Our elders maintain bi-vocational careers to protect the pulpit from compromise, keeping our primary aim entirely focused on helping the church see and savor Jesus.
                    </p>
                </div>
            ),
            image: '/churchImages/bible.webp',
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