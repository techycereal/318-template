import PageTemplate from "./PageTemplate";

export default function AboutUs() {
    const sections = [
        {
            title: "Who We Are",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        3:18 Bible Church is an intimate, family-integrated body of believers dedicated to living out the "one anothers" of the New Testament. We are a community that prioritizes radical hospitality, deep fellowship, and intentional discipleship, walking alongside one another to foster life-long followers of Christ.
                    </p>
                    <p>
                        To guard our close-knit fellowship and intentional shepherding, our leadership is actively prepared to plant new local churches rather than focusing on building a mega-church. This ensures every family is closely cared for with an intentional ratio of one elder per ten families and one deacon per twenty families.
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
                        We believe in the absolute authority of God's Word, which is why we are unwaveringly committed to verse-by-verse expository preaching. We firmly anchor our lives, families, and ministries in historical, biblical truth—standing unapologetically pro-life, pro-marriage, and pro-family.
                    </p>
                    <p>
                        We also believe in absolute structural integrity and financial transparency. To ensure our focus remains entirely on ministry efforts, no more than 25% of our annual income goes toward pastoral compensation. Our elders maintain bi-vocational careers to protect the pulpit from compromise, and our full, detailed financial data is openly accessible to all members.
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
                        We believe that Jesus' sacrificial work on the cross is the greatest treasure in all of life. Everything we do—from how we shepherd our families to how we gather on Sundays—is a joyful, mature response to the incredible grace that has brought us to God.
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
                        Our Sundays look a bit different by design. We are deeply committed to <strong>one single, face-to-face gathering</strong> each Sunday morning to maintain true corporate unity. Because we believe multiple services or public live-streams can split a church identity, our live feed is strictly reserved for our homebound and shut-in members.
                    </p>
                    <p>
                        Furthermore, we practice <strong>family-integrated worship</strong>; we do not isolate children into age-segregated ministries, choosing instead to worship all together as families (though a nursery and cry room are always available for moms with infants). Finally, every single service is paired with a post-gathering fellowship meal, ensuring we break bread and grow closer together every single week.
                    </p>
                </div>
            ),
            video: '/Hallmarks.mp4',
            imgSize: 'aspect-[9/16]',
        }
    ];

    return <PageTemplate heroTitle="About Us" heroImage={'/churchImages/churchInside.webp'} sections={sections} />;
}